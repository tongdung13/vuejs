<template>
  <div class="col-md-10 res mb-5 mt-3 res-0">
    <div style="font-size: 120%" class="font-weight-bold mt-3 color-main">
      CẬP NHẬT THẺ
    </div>
    <form @submit.prevent="updateCard">
      <div class="table-responsive mt-3">
        <table class="table table-hover">
          <thead>
            <tr>
              <td style="width: 15%"><b>Số lượng</b></td>
              <td>
                <input type="number" v-model="cards.amount" />
              </td>
              <td style="width: 15%"><b>Chọn màu</b></td>
              <td class="text-left" style="width: 30%">
                <input
                  type="color"
                  class="p-0 text-left"
                  style="border: none"
                  v-model="cards.color"
                />
              </td>
              <td>VIP:</td>
              <td class="text-left">
                <input
                  class="mr-2"
                  type="radio"
                  id="no"
                  name="vip"
                  checked
                  v-model="cards.vip"
                />
                <label for="no" class="mr-4"> Không</label>
                <input
                  class="mr-2"
                  type="radio"
                  id="co"
                  name="vip"
                  v-model="cards.vip"
                />
                <label for="co"> Có</label>
              </td>
            </tr>
          </thead>
        </table>
      </div>
      <hr />
      <div class="mt-3 text-center pb-3">
        <span @click="backPage" class="borderx hover mr-3 color-main"
          >Quay lại</span
        >
        <button type="submit" class="borderx hover color-main">
          Lưu và hiển thị
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { HTTP } from "@/main";
export default {
  name: "capNhatThe",
  data() {
    return {
      cards: {},
    };
  },
  methods: {
    updateCard() {
      let theId = window.location.href.slice(
        window.location.href.indexOf("/cap-nhat-the/") + 14,
        window.location.href.length
      );
      HTTP.put(`/salon/main/manage/card/${theId}/update`, this.cards).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            // this.content = "";
            this.$swal("", result.message, "success");
          } else {
            this.$swal("", result.message, "error");
          }
        }
      );
    },
    backPage() {
      history.back();
    },
    // =================
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}
ul {
  padding: 0;
  margin-top: 7px;
}
ul li a {
  color: black;
}
hr {
  margin-top: 0 !important;
}
table td {
  vertical-align: middle;
}
.navbar {
  padding: 0;
}
._1AsWWl {
  height: 0.1875rem;
  width: 100%;
  background-position-x: -1.875rem;
  background-size: 7.25rem 0.1875rem;
  background-image: repeating-linear-gradient(
    45deg,
    #6fa6d6,
    #6fa6d6 33px,
    transparent 0,
    transparent 41px,
    #f18d9b 0,
    #f18d9b 74px,
    transparent 0,
    transparent 82px
  );
}
.orfer_detail {
  padding: 1.1875rem 1.5rem 1.625rem 0;
}
.nameSalon {
  color: black;
}
.nameSalon:hover {
  color: #d4476f;
}
.borderx {
  border: 1px solid #d4476f;
  padding: 5px 25px;
  border-radius: 4px;
  cursor: pointer;
}
table td {
  vertical-align: middle;
}
input[type="radio"]:after {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}

input[type="radio"]:checked:after {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #d4476f;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
</style>
