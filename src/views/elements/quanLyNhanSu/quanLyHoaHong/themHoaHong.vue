<template>
  <div class="col-md-10 res mb-5 mt-3">
    <h5 class="mt-3 font-weight-bold color-main">THÊM HOA HỒNG</h5>
    <!-- Thông tin người nhận -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <form @submit.prevent="addCommission">
        <h6>THÔNG TIN HOA HỒNG</h6>
        <div class="mt-3 pb-2">
          <table class="table table-borderless">
            <tbody class="text-right">
              <tr>
                <td>
                  <div class="table-input">Danh sách salon:</div>
                </td>
                <td>
                  <select
                    name="salon_id"
                    class="inputx mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="commissions.salon_id"
                    @click="onChangeSalon(commissions.salon_id)"
                  >
                    <option value="">Tất cả salon</option>

                    <option
                      v-for="salon in listStore"
                      :key="salon.id"
                      :value="salon.id"
                    >
                      {{ salon.salon_name }}
                    </option>
                  </select>
                </td>
              </tr>
            </tbody>

            <tbody class="text-right">
              <tr>
                <td>
                  <div class="table-input">Loại hoa hồng:</div>
                </td>
                <td>
                  <select
                    v-if="commissions.salon_id"
                    name="salon_id"
                    class="inputx mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="commissions.kind_of_rose"
                  >
                    <option value="1">Hoa hồng theo dịch vụ</option>
                    <option value="2">Hoa hồng theo sản phẩm</option>
                    <option value="3">Hoa hồng theo mốc chỉ tiêu</option>
                  </select>
                  <div v-else class="inputx text-left">--Chọn salon--</div>
                </td>

               <td v-if="commissions.kind_of_rose == ''">
                  <div class="table-input">Mã dịch vụ:</div>
                </td>
                <td v-if="commissions.kind_of_rose == ''">
                   <div class="inputx text-left">--Chọn loại hoa hồng--</div>
                </td>

                <td v-if="commissions.kind_of_rose == 1">
                  <div class="table-input">Mã dịch vụ:</div>
                </td>
                <td v-if="commissions.kind_of_rose == 1">
                  <select
                    name="salon_id"
                    class="inputx mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="commissions.service_id"
                  >
                    <option value="">--Chọn dịch vụ--</option>
                    <option
                      v-for="(service, index) in commissionServiceSalon"
                      :key="index"
                      :value="service.id"
                    >
                      {{ service.title }}
                    </option>
                  </select>
                </td>
                <td v-if="commissions.kind_of_rose == 2">
                  <div class="table-input">Mã sản phẩm:</div>
                </td>
                <td v-if="commissions.kind_of_rose == 2">
                  <select
                    name="salon_id"
                    class="inputx mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="commissions.product_id"
                  >
                    <option value="">--Chọn sản phẩm--</option>
                    <option
                      v-for="(product, index) in commissionProductSalon"
                      :key="index"
                      :value="product.id"
                    >
                      {{ product.name }}
                    </option>
                  </select>
                </td>
                <td v-if="commissions.kind_of_rose == 3">
                  <div class="table-input">Mã mốc chỉ tiêu:</div>
                </td>
                <td v-if="commissions.kind_of_rose == 3">
                  <select
                    name="salon_id"
                    class="inputx mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="commissions.salon_kpi_id"
                  >
                    <option
                      v-for="(kpi, index) in commissionKpiSalon"
                      :key="index"
                      :value="kpi.id"
                    >
                      {{ kpi.name }}
                    </option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>
                  <div class="table-input">Bộ phận bán hàng:</div>
                </td>
                <td>
                  <div class="right-inner-addon input-container">
                    <span>%</span>

                    <input
                      type="number"
                      class="w-100"
                      placeholder="Nhập hoa hồng..."
                      v-model="commissions.sales_commission"
                    />
                  </div>
                </td>
                <td>
                  <div class="table-input">Bộ phận marketing:</div>
                </td>
                <td>
                  <div class="right-inner-addon input-container">
                    <span>%</span>

                    <input
                      type="number"
                      class="w-100"
                      placeholder="Nhập hoa hồng..."
                      v-model="commissions.commission_marketing"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Bộ phận thợ chính:</div>
                </td>
                <td>
                  <div class="right-inner-addon input-container">
                    <span>%</span>

                    <input
                      type="number"
                      class="w-100"
                      placeholder="Nhập hoa hồng..."
                      v-model="commissions.commission_main"
                    />
                  </div>
                </td>
                <td>
                  <div class="table-input">Bộ phận thợ phụ:</div>
                </td>
                <td>
                  <div class="right-inner-addon input-container">
                    <span>%</span>

                    <input
                      type="number"
                      class="w-100"
                      placeholder="Nhập hoa hồng..."
                      v-model="commissions.commission_extra"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3 text-center pb-3">
          <span @click="backPage" class="borderx mr-2 color-main"
            >Quay lại</span
          >
          <button type="submit" class="borderx color-main">
            <span>Lưu và hiển thị</span>
          </button>
        </div>
      </form>
    </div>
    <!-- ========================== -->

    <!-- ================== -->
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "themHoaHong",
  data() {
    return {
      salon: "",
      listStore: {},
      listEmployee: {},
      commissions: {
        kind_of_rose: "",
        salon_id: "",
        user_id: "",
        service_id: "",
        salon_kpi_id: "",
        product_id: "",
        sales_commission: "",
        commission_marketing: "",
        commission_main: "",
        commission_extra: "",
      },
      listEmployeeSalon: {},
      commissionProductSalon: {},
      commissionServiceSalon: {},
      commissionKpiSalon: {},
    };
  },
  created() {
    this.listDetail();
    HTTP.get("/salon/main/manage/branch/all").then((res) => {
      let result = res.data;
      if (result.status === 1) {
        let data = result.data;

        if (data.length > 0) {
          this.listStore = data;
        }
      } else {
        this.notification.status = true;
        this.notification.message = result.message;
      }
      this.loading = false;
    });
  },
  methods: {
    // thêm hoa hồng
    addCommission() {
      HTTP.post(`/salon/main/manage/roses/create`, this.commissions).then(
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
    // ================

    // danh sách chi tiết
    listDetail() {
      if (this.salon) {
        HTTP.get(`/salon/main/manage/form/${this.salon}/commission`).then(
          (res) => {
            let result = res.data;
            if (result.status === 1) {
              let data = result.data;
              this.listEmployeeSalon = data.employees;
              this.commissionProductSalon = data.products;
              this.commissionServiceSalon = data.services;
              this.commissionKpiSalon = data.salon_kpis;
            }
          }
        );
      }
    },
    // ===================

    // danh sách nhân viên
    listEmployees() {
      if (this.salon) {
        HTTP.get(`/salon/main/manage/employee?salon_id=${this.salon}`).then(
          (res) => {
            let result = res.data;
            if (result.status === 1) {
              let data = result.data.data;
              if (data.length > 0) {
                this.listEmployee = data;
              }
            } else {
              this.notification.status = true;
              this.notification.message = result.message;
            }
            this.loading = false;
          }
        );
      }
    },
    // ===================

    // Thay đổi salon
    onChangeSalon(value) {
      this.salon = value;
      this.listEmployees();
      this.listDetail();
    },
    // ==============
    // ================
    backPage() {
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

label {
  padding: 25px 15px;
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

ul {
  padding: 5px 15px;
}

li {
  padding: 5px 15px;
  list-style: none;
}

.card-header {
  padding: 5px;
  border-bottom: none;
  background: rgba(255, 255, 255, 0.56);
}

.card-body {
  padding: 0;
}

.card {
  border: none;
}
@media only screen and (max-width: 768px) {
  .borderx {
    padding: 5px 15px;
  }
}
</style>
