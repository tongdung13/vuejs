<template>
  <div class="col-md-10 res mb-5 mt-3 res-0">
    <div style="font-size: 120%" class="font-weight-bold mt-3 color-main">
      CHI TIẾT TÀI SẢN
    </div>
    <div class="table-responsive mt-3">
      <table class="table table-hover">
        <thead>
          <tr style="height: 100px">
            <td style="width: 15%"><b>Ảnh tài sản:</b></td>
            <td colspan="3">
                  <img
                    :src="image_small"
                    alt="photo"
                    style="width: 150px; height: 150px"
                  />
            </td>
          </tr>
          <tr>
            <td style="width: 15%"><b>Tên tài sản</b></td>
            <td style="width: 35%">{{ detail.name }}</td>
            <td style="width: 15%"><b>Số lượng</b></td>
            <td style="width: 35%">{{ detail.amount }}</td>
          </tr>
          <tr>
            <td style="width: 15%"><b>Tên salon</b></td>
            <td style="width: 35%">{{ detailSalon.salon_name }}</td>
            <td style="width: 15%"><b>Ngày mua</b></td>
            <td>{{ formatDate(detail.buy_at) }}</td>
          </tr>
          <tr>
            <td style="width: 15%"><b>Thời hạn sử dụng</b></td>
            <td>{{ detail.use_time }}</td>
           
            <td style="width: 15%"><b>Giá trị ban đầu</b></td>
            <td>{{ formatPrice(detail.value) }}</td>
            
          </tr>
        </thead>
      </table>
      <div class="mt-4 text-center pb-3">
        <span @click="backPage" class="borderx hover mr-3 color-main"
          >Quay lại</span
        >

        <span
          @click="deleteAsset(detail.id)"
          class="borderx hover mr-3 color-main"
          >Xoá
        </span>
        <router-link
          :to="{
            name: 'capNhatTaiSan',
            params: { assetId: detail.id },
          }"
        >
          <span class="borderx hover mr-3 color-main"
            >Cập nhật tài sản</span
          ></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/main";
import { formatPrice } from "@/main";
import { formatDate } from "@/main";
export default {
  name: "chiTietQuy",
  data() {
    return {
      salon_id: "",
      detail: [],
      detailSalon: [],
      detailStaff: [],
      errors: [],
      image_small: "",
    };
  },
  methods: {
    deleteAsset(assetId) {
      this.$swal({
        title: "Xoá tài sản?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete("/salon/main/manage/asset/" + assetId + "/delete").then(
            (res) => {
              let result = res.data;
              console.log(result);
              if (result.status == 1) {
                this.$swal("", result.message, "success");
                history.back();
              } else {
                this.$swal("", result.message, "error");
              }
            }
          );
        }
      });
    },
    backPage() {
      history.back();
    },
    // =================
    formatDate,
    formatPrice,
  },

  created() {
    let code = window.location.href.slice(
      window.location.href.indexOf("/chi-tiet-tai-san/") + 18,
      window.location.href.length
    );
    HTTP.get(`/salon/main/manage/asset/` + code)
      .then((response) => {
        this.detail = response.data.data;
        this.image_small = this.detail.image.image_small;
        console.log(this.detail);
        this.salon_id = this.detail.salon_id;
        // lấy chi tiết salon
        HTTP.get("/salon/main/manage/branch/" + this.salon_id + "/detail")
          .then((response) => {
            this.detailSalon = response.data.data;
          })
          .catch((e) => {
            this.errors.push(e);
          });
        //---------------------
      })
      .catch((e) => {
        this.errors.push(e);
      });
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
</style>
