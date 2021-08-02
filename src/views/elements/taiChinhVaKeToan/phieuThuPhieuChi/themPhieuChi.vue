<template>
  <div class="col-md-10 res mb-5 mt-3">
    <h5 class="mt-3 font-weight-bold color-main">THÊM PHIẾU CHI</h5>
    <!-- Thông tin salon -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <form @submit.prevent="addPayment">
        <h6>THÔNG TIN PHIẾU CHI</h6>
        <div class="mt-3 pb-2">
          <table class="table table-borderless">
            <tbody class="text-right">
              <tr>
                <td>Tên Salon</td>
                <td style="width: 35%">
                  <select
                    class="inputx mr-3 res-margin-0"
                    id="cars salon"
                    style="width: 100%; outline: none"
                    required
                    v-model="payment.salon_id"
                    @change="changeStore()"
                  >
                    <option value="">--- Chọn salon ---</option>
                    <option
                      v-for="item in listStore"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.salon_name }}
                    </option>
                  </select>
                </td>
                <td style="width: 15%">
                  <div class="table-input">Tài khoản:</div>
                </td>
                <td>
                  <select
                    class="inputx mr-3 res-margin-0"
                    id="cars salon"
                    style="width: 100%; outline: none"
                    required
                    v-model="fund"
                    v-if="payment.salon_id"
                  >
                    <option value="">--- Chọn tài khoản ---</option>
                    <option
                      v-for="item in listFunds"
                      :key="item.id"
                      :value="item"
                    >
                      {{ item["account_number"] }} - {{ item["bank"] }}
                    </option>
                  </select>
                  <div v-else class="inputx text-left">
                    --- Chọn tài khoản ---
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Người nhận:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Người nhận tiền,..."
                    class="w-100"
                    required
                    v-model="payment.receiver"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Đối tượng:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Khách hàng, nhân viên,..."
                    class="w-100"
                    required
                    v-model="payment.object"
                  />
                </td>
                <td>
                  <div class="table-input">Tên KH:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Tên khách hàng..."
                    class="w-100"
                    required
                    v-model="payment.payer"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Mô tả:</div>
                </td>
                <td>
                  <input
                    type="text"
                    class="w-100"
                    placeholder="Mô tả..."
                    required
                    v-model="payment.content"
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
                    v-model="payment.business"
                  />
                </td>
              </tr>
              <tr>
                <!-- <td>
                  <div class="table-input">Số tài khoản:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Số"
                    class="w-100"
                    required
                    v-model="payment.business"
                  />
                </td> -->
                <td>
                  <div class="table-input">Đơn vị:</div>
                </td>
                <td>
                  <input
                    type="text"
                    readonly
                    class="w-100"
                    required
                    placeholder="VNĐ, USD, ..."
                    :value="fund.unit"
                  />
                </td>

                <td>
                  <div class="table-input">Tỷ giá:</div>
                </td>
                <td>
                  <input
                    type="text"
                    class="w-100"
                    required
                    placeholder="Tỷ giá..."
                    v-model="payment.rate"
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <div class="table-input">Số tiền:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Số tiền"
                    class="w-100"
                    required
                    v-model="payment.money"
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
  name: "themPhieuChi",
  data() {
    return {
      payment: {
        salon_id: "",
        fund_id: "",
      },
      listStore: {},
      errors: [],
      url: "account.avatar",
      listFunds: [],
      fund: [],
    };
  },
  beforeMount() {
    this.getListStore();
  },
  methods: {
    getListStore() {
      HTTP.get("/salon/main/manage/branch/all").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listStore = data;
            // console.log(this.listStore);
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },
    changeStore() {
      this.listFund();
    },
    listFund() {
      this.loading = true;
      this.hasData = false;
      HTTP.get("/salon/main/manage/form/" + this.payment.salon_id + "/funds")
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
    addPayment() {
      this.payment.fund_id = this.fund.id;
      HTTP.post(`/salon/main/manage/payments/store`, this.payment).then(
        (res) => {
          let result = res.data;
          console.log(this.payment);
          if (result.status === 1) {
            // this.content = ""
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
