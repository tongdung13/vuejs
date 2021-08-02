<template>
  <div class="col-md-10 res mb-5 mt-3 res-0">
    <div style="font-size: 120%" class="font-weight-bold mt-3 color-main">
      CHI TIẾT QUỸ TIỀN MẶT VÀ NGÂN HÀNG
    </div>
    <div class="table-responsive mt-3">
      <table class="table table-hover">
        <thead>
          <tr>
            <td style="width: 15%"><b>Mã quỹ</b></td>
            <td style="width: 35%">{{ detail.code }}</td>
            <td style="width: 15%"><b>Tên quỹ</b></td>
            <td style="width: 35%">{{ detail.code }}</td>
          </tr>

          <tr>
            <td style="width: 15%"><b>Số tài khoản</b></td>
            <td>{{ formatNumberAccount(detail.account_number) }}</td>
            <td style="width: 15%"><b>Tên ngân hàng</b></td>
            <td>{{ detail.bank }}</td>
          </tr>

          <tr>
            <td style="width: 15%"><b>Số tiền</b></td>
            <td>{{ formatPrice(detail.money) }}</td>
            <td style="width: 15%"><b>Đơn vị tiền tệ</b></td>
            <td>{{ detail.unit }}</td>
          </tr>

          <tr>
            <td style="width: 15%"><b>Tài khoản</b></td>
            <td>{{ detail.account }}</td>
            <td style="width: 15%"><b>Tình trạng</b></td>
            <td v-if="detail.active == 1">Đang hoạt động</td>
            <td v-else>Tạm ngừng</td>
          </tr>
          <tr>
            <td style="width: 15%"><b>Tên Salon</b></td>
            <td>{{ detailSalon.salon_name }}</td>
            
          </tr>
        </thead>
      </table>
      <div class="mt-4 text-center pb-3">
        <span @click="backPage" class="borderx hover mr-3 color-main"
          >Quay lại</span
        >
        
        <span
          @click="deleteFund(detail.id)"
          class="borderx hover mr-3 color-main"
          >Xoá quỹ</span
        >
        <router-link
          :to="{
            name: 'capNhatQuy',
            params: { sanPhamId: detail.id },
          }"
        >
          <span class="borderx hover mr-3 color-main"
            >Cập nhật quỹ</span
          ></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/main";
import { formatPrice } from "@/main";
import { formatNumberAccount } from "@/main";
export default {
  name: "chiTietQuy",
  data() {
    return {
      salon_id: "",
      detail: [],
      detailSalon: [],
      detailStaff:[],
      errors: [],
    };
  },
  methods: {
     deleteFund(fundId) {
      this.$swal({
        title: "Xoá quỹ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete('/salon/main/manage/funds/'+fundId+'/delete').then(
            (res) => {
              let result = res.data;
              if (result.status === 1) {
                this.$swal("Đã xoá!", result.message, "success");
                setTimeout(function () {
                  history.back();
                }, 1000);
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
    formatNumberAccount,
    formatPrice,
  },

  created() {
    let code = window.location.href.slice(
      window.location.href.indexOf("/chi-tiet-quy/") + 14,
      window.location.href.length
    );
    HTTP.get(`/salon/main/manage/funds/` + code)
      .then((response) => {
        this.detail = response.data.data[0];
        console.log(this.detail);
        this.salon_id = this.detail.salon_id;
        this.user_id  = this.detail.user_id;
        // lấy chi tiết salon
        HTTP.get("/salon/main/manage/branch/" + this.salon_id + "/detail")
          .then((response) => {
            this.detailSalon = response.data.data;
          })
          .catch((e) => {
            this.errors.push(e);
          });
       

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
