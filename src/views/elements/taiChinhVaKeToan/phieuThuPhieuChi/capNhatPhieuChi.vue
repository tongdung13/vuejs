<template>
  <div class="col-md-10 res mb-5 mt-3">
    <h5 class="mt-3 font-weight-bold color-main">CẬP NHẬT PHIẾU CHI</h5>
    <!-- Thông tin salon -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <form @submit.prevent="updateReciept">
        <h6>THÔNG TIN PHIẾU CHI</h6>
        <div class="mt-3 pb-2">
          <table class="table table-borderless">
            <tbody class="text-right">
              <tr>
                <td style="width: 15%">
                  <div class="table-input">Chọn tài khoản:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Chọn tài khoản "
                    class="w-100"
                    required
                    v-model="listPayment.fund_id"
                  />
                </td>
                <td style="width: 15%">
                  <div class="table-input">Tỷ giá:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Tỷ giá "
                    class="w-100"
                    required
                    v-model="listPayment.rate"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Tên KH:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Tên khách hàng..."
                    class="w-100"
                    required
                    v-model="listPayment.receiver"
                  />
                </td>
                <td>
                  <div class="table-input">Nội dung:</div>
                </td>
                <td>
                  <input
                    type="text"
                    class="w-100"
                    placeholder="Nội dung..."
                    required
                    v-model="listPayment.content"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Salon:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Salon"
                    class="w-100"
                    required
                    v-model="listPayment.salon_id"
                  />
                </td>
                <td>
                  <div class="table-input">địa chỉ, ban phòng:</div>
                </td>
                <td>
                  <input
                    type="text"
                    class="w-100"
                    placeholder="Nhập địa chỉ, ban phòng..."
                    required
                    v-model="listPayment.business"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Ngân hàng:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Salon"
                    class="w-100"
                    required
                    v-model="listPayment.bank"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Số:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Số tài khoản"
                    class="w-100"
                    required
                    v-model="listPayment.number"
                  />
                </td>
                <td>
                  <div class="table-input">Đối tượng:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Đối tượng"
                    class="w-100"
                    required
                    v-model="listPayment.object"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Số tài khoản:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Số"
                    class="w-100"
                    required
                    v-model="listPayment.account_number"
                  />
                </td>
                <td>
                  <div class="table-input">Số tiền:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Số tiền"
                    class="w-100"
                    required
                    v-model="listPayment.money"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3 text-center pb-3">
          <span @click="historyBack" class="borderx mr-2 color-main"
            >Quay lại</span
          >
          <button type="submit" class="borderx color-main">
            Lưu và hiển thị
          </button>
        </div>
      </form>
    </div>
    <!-- ========================== -->
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "capNhatPhieuChi",
  data() {
    return {
      reciept: {},
      listPayment: [],
      phieuChiId: "",
      errors: [],
      url: "account.avatar",
    };
  },
  created() {
    this.phieuChiId = window.location.href.slice(
      window.location.href.indexOf("/cap-nhat-phieu-chi/") + 20,
      window.location.href.length
    );
  },
  beforeMount() {
    this.listPayments();
  },
  methods: {
    listPayments() {
      HTTP.get(`/salon/main/manage/payments/${this.phieuChiId}`).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.listPayment = result.data;
          //   console.log(this.listReciepts1);
        }
      });
    },
    updateReciept() {
      HTTP.put(
        `/salon/main/manage/payments/${this.phieuChiId}/update`,
        this.listPayment
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          // this.content = "";
          this.$swal("", result.message, "success");
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    historyBack() {
      history.back();
    },
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.table-input {
  padding: 5px 10px;
}
.borderx {
  border: 1px solid #d4476f;
  padding: 5px 25px;
  border-radius: 4px;
  cursor: pointer;
}

.borderx:hover {
  color: white;
  background-color: #d4476f;
}
</style>
