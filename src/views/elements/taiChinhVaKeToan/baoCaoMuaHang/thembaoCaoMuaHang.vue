<template>
  <div class="col-md-10 mb-5 mt-3">
    <h5 class="mt-3 font-weight-bold color-main">THÊM BÁO CÁO MUA HÀNG</h5>
    <!-- Thông tin salon -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <form @submit.prevent="addReportBill">
        <h6>THÊM BÁO CÁO MUA HÀNG</h6>
        <div class="mt-3 pb-2">
          <table class="table table-borderless">
            <tbody class="text-right">
              <tr>
                <td style="width: 15%">
                  <div class="table-input">Đơn vị bán hàng:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Đơn vị... "
                    class="w-100"
                    required
                    v-model="reportBill.seller"
                  />
                </td>
                <td>
                  <div class="table-input">Địa chỉ:</div>
                </td>
                <td>
                  <input
                    type="text"
                    class="w-100"
                    placeholder="Địa chỉ..."
                    required
                    v-model="reportBill.address"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Mã số thuế:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Mã số thuế..."
                    class="w-100"
                    required
                    v-model="reportBill.tax_code"
                  />
                </td>
                <td>
                  <div class="table-input">Người giao hàng:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Người giao hàng..."
                    class="w-100"
                    required
                    v-model="reportBill.shipper"
                  />
                </td>
              </tr>
              <tr>
                <td style="width: 15%">
                  <div class="table-input">Sản phẩm:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Tên sản phẩm..."
                    class="w-100"
                    required
                    v-model="reportBill.producer"
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <div class="table-input">Nghiệp vụ:</div>
                </td>
                <td>
                  <input
                    type="text"
                    class="w-100"
                    placeholder="Nnghiệp vụ..."
                    required
                    v-model="reportBill.business"
                  />
                </td>

                <td>
                  <div class="table-input">Số tờ hoá đơn:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Số hoá đơn..."
                    class="w-100"
                    required
                    v-model="reportBill.number"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Ngày nhận hoá đơn:</div>
                </td>
                <td>
                  <input
                    type="date"
                    placeholder="Ngày..."
                    class="w-100"
                    required
                    v-model="reportBill.bill_date"
                  />
                </td>
                 <td>
                  <div class="table-input">Ngày nhập hoá đơn:</div>
                </td>
                <td>
                  <input
                    type="date"
                    placeholder="Ngày..."
                    class="w-100"
                    required
                    v-model="reportBill.input_date"
                  />
                </td>
              </tr>
              <tr>
                 <td>
                  <div class="table-input">Ngày thanh toán:</div>
                </td>
                <td>
                  <input
                    type="date"
                    class="w-100"
                    required
                    v-model="reportBill.payment_date"
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <div class="table-input">Salon:</div>
                </td>
                <td>
                  <select v-model="reportBill.salon_id" class="input w-100" @change="changeStore()">
                    <option value="">--Chọn Salon--</option>
                    <option
                      v-for="(salon, index) in listSalon"
                      :key="index"
                      :value="salon.id"
                    >
                      {{ salon.salon_name }}
                    </option>
                  </select>
                </td>

                <td>
                  <div class="table-input">Quỹ tài khoản:</div>
                </td>
                <td>
                  <select v-model="fund" v-if="reportBill.salon_id" class="input w-100" >
                    <option value="">--- Chọn tài khoản ---</option>
                    <option
                      v-for="fund in listFunds"
                      :key="fund.id"
                      :value="fund"
                    >
                      {{ fund.account_number }} - {{ fund.bank }}
                    </option>
                  </select>
                  <div v-else class="inputx text-left">
                    --- Chọn tài khoản ---
                  </div>
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
  name: "themBaoCaoMuaHang",
  data() {
    return {
      reportBill: {
        fund_id: "",
        salon_id: ""
      },
      errors: [],
      listSalon: {},
      listFunds: [],
      fund: {},
    };
  },
  created() {
    HTTP.get(`/salon/main/manage/branch/all`).then((res) => {
      this.listSalon = res.data.data;
      // console.log(this.listSalonId);
    });
  },
  methods: {
    changeStore(){
      this.listFund();
    },
     listFund() {
      HTTP.get("/salon/main/manage/form/" + this.reportBill.salon_id + "/funds")
        .then((res) => {
          var result = res.data;
          if (result.status === 1) {
            this.listFunds = result.data;
            // console.log(this.listFunds);
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    addReportBill() {
       this.reportBill.fund_id = this.fund.id;

      console.log(this.reportBill);
      HTTP.post(`/salon/main/manage/billGoods/store`, this.reportBill).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            this.$swal("", result.message, "success");
          } else {
            this.$swal("", result.message, "error");
          }
        }
      );
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
