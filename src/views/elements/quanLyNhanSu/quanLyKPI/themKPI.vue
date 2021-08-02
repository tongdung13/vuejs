<template>
  <div class="col-md-10 res mb-5 mt-3">
    <h5 class="mt-3 font-weight-bold color-main">THÊM KPI</h5>
    <div class="mt-4 bg-8 pt-3 pb-3 pl-5 pr-5">
      <h6>THÔNG TIN KPI</h6>
      <div class="mt-3 pb-2">
        <table class="table table-borderless">
          <tbody class="text-right">
            <tr>
              <td style="width: 15%">
                <div class="table-input">Chọn salon:</div>
              </td>
              <td>
                <select
                  name="salon_id"
                  class="inputx mr-3 res-margin-0"
                  id="cars"
                  style="width: 100%; outline: none"
                  v-model="addKPI.salon_id"
                >
                  <option value="">--Tất cả salon--</option>

                  <option
                    v-for="salon in listStore"
                    :key="salon.id"
                    :value="salon.id"
                  >
                    {{ salon.salon_name }}
                  </option>
                </select>
              </td>

              <td style="width: 15%">
                <div class="table-input">Chọn bộ phận:</div>
              </td>
              <td>
                <select
                  name="salon_id"
                  class="inputx mr-3 res-margin-0"
                  id="cars"
                  style="width: 100%; outline: none"
                  v-model="addKPI.position"
                >
                  <option value="">--Chọn bộ phận--</option>
                  <option value="3">Bộ phận bán hàng</option>
                  <option value="4">Bộ phận marketing</option>
                  <option value="5">Bộ phận thợ chính</option>
                  <option value="6">Bộ phận thợ phụ</option>
                </select>
              </td>
            </tr>
            <tr>
              <td style="width: 15%">
                <div class="table-input">Kiểu:</div>
              </td>
              <td>
                <select
                  name="salon_id"
                  class="inputx mr-3 res-margin-0"
                  id="cars"
                  style="width: 100%; outline: none"
                  v-model="addKPI.time_type"
                  @change="analisDay"
                >
                  <option value="">--Chọn kiểu--</option>
                  <option value="1">Tuần</option>
                  <option value="2">Tháng</option>
                  <option value="3">Quý</option>
                  <option value="4">Năm</option>
                </select>
              </td>
              <td style="width: 15%">
                <div class="table-input">Số lượt phục vụ:</div>
              </td>
              <td>
                <input
                  type="number"
                  style="width: 100%"
                  placeholder="Phục vụ"
                  v-model="addKPI.serving_quantity"
                />
              </td>
            </tr>
            <tr>
              <td style="width: 15%">
                <div class="table-input">Doanh thu:</div>
              </td>
              <td>
                <input
                  type="number"
                  style="width: 100%"
                  placeholder="Doanh thu"
                  v-model="addKPI.sales"
                />
              </td>
              <td style="width: 15%">
                <div class="table-input">Số lượng KH:</div>
              </td>
              <td>
                <input
                  type="number"
                  style="width: 100%"
                  placeholder="Data khách"
                  v-model="addKPI.customers_numbers"
                />
              </td>
            </tr>
            <tr>
              <td style="width: 15%">
                <div class="table-input">Đơn hàng:</div>
              </td>
              <td>
                <input
                  type="number"
                  style="width: 100%"
                  placeholder="Đơn hàng"
                  v-model="addKPI.orders"
                />
              </td>
              <td style="width: 15%">
                <div class="table-input">Khách hàng mới:</div>
              </td>
              <td>
                <input
                  type="number"
                  style="width: 100%"
                  placeholder="Khách hàng mới"
                  v-model="addKPI.new_customers_numbers"
                />
              </td>
            </tr>
            <tr>
              <td style="width: 15%">
                <div class="table-input">Ngày bắt đầu:</div>
              </td>
              <td>
                <input
                  type="date"
                  style="width: 100%"
                  v-model="addKPI.start_date"
                  @change="analisDay"
                />
              </td>
              <td style="width: 15%">
                <div class="table-input">Ngày kết thúc</div>
              </td>
              <td>
                <input
                  type="text"
                  style="width: 100%"
                  v-model="addKPI.end_date"
                  readonly
                />
              </td>
            </tr>
            <tr>
              <td style="width: 15%">
                <div class="table-input">Thời gian:</div>
              </td>
              <td style="width: 30%">
                <div class="inputx text-left" v-if="addKPI.days > 0">
                  {{ addKPI.days + " ngày" }}
                </div>
                <div class="inputx text-left" v-else style="min-height: 34px;">
                  {{ addKPI.days }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-3 text-center pb-3">
        <span @click="backPage" class="borderx mr-2 color-main">Quay lại</span>
        <span @click="addKPIs" class="borderx color-main">Lưu và hiển thị</span>
      </div>
    </div>
    <!-- ========================== -->

    <!-- ================== -->
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatDate } from "@/main";
export default {
  name: "themKPI",
  data() {
    return {
      listStore: {},
      addKPI: {
        salon_id: "",
        time_type: "",
        start_date: "",
        end_date: "",
        days: "",
        sales: 0,
        serving_quantity: 0,
        customers_numbers: 0,
        new_customers_numbers: 0,
        orders: 0,
        position: "",
      },
    };
  },
  created() {
    HTTP.get("/salon/main/manage/branch/all").then((res) => {
      let result = res.data;
      if (result.status === 1) {
        let data = result.data;

        if (data.length > 0) {
          this.listStore = data;
          console.log(this.listStore);
        }
      } else {
        this.notification.status = true;
        this.notification.message = result.message;
      }
      this.loading = false;
    });
  },
  methods: {
    analisDay() {
      if (this.addKPI.time_type == "") {
        this.addKPI.days = "";
        this.addKPI.start_date = "";
        this.addKPI.end_date = "";
      } else {
        if (this.addKPI.time_type == 1 && this.addKPI.start_date) {
          const date = new Date(this.addKPI.start_date);
          date.setDate(date.getDate() + 7);
          this.addKPI.days = 7;
          this.addKPI.end_date = this.formatDate(date);
        } else if (this.addKPI.time_type == 2 && this.addKPI.start_date) {
          const date = new Date(this.addKPI.start_date);
          let dateD = date.getDate();
          let yearD;
          if (dateD < 10) {
            dateD = "0" + dateD;
          }
          let monthD = date.getMonth() + 1 + 1;
          if (monthD > 12) {
            monthD = monthD - 12;
            yearD = date.getFullYear() + 1;
          } else yearD = date.getFullYear();
          if (monthD < 10) {
            monthD = "0" + monthD;
          }
          this.addKPI.end_date = monthD + "/" + dateD + "/" + yearD;
        } else if (this.addKPI.time_type == 3 && this.addKPI.start_date) {
          const date = new Date(this.addKPI.start_date);
          let dateD = date.getDate();
          let yearD;
          if (dateD < 10) {
            dateD = "0" + dateD;
          }
          let monthD = date.getMonth() + 1 + 3;
          if (monthD > 12) {
            monthD = monthD - 12;
            yearD = date.getFullYear() + 1;
          } else yearD = date.getFullYear();
          if (monthD < 10) {
            monthD = "0" + monthD;
          }
          let ccc = monthD + "/" + dateD + "/" + yearD;
          let xxx = new Date(ccc);
          this.addKPI.end_date = formatDate(xxx);
        } else if (this.addKPI.time_type == 4 && this.addKPI.start_date) {
          const date = new Date(this.addKPI.start_date);
          let dateD = date.getDate();
          if (dateD < 10) {
            dateD = "0" + dateD;
          }
          let monthD = date.getMonth() + 1;
          if (monthD < 10) {
            monthD = "0" + monthD;
          }
          let yearD = date.getFullYear() + 1;
          let xxx = monthD + "/" + dateD + "/" + yearD;
          this.addKPI.end_date = formatDate(xxx);
        }
        if (this.addKPI.start_date) {
          const timeDiff =
            new Date(this.addKPI.end_date) - new Date(this.addKPI.start_date);
          const days = timeDiff / (1000 * 60 * 60 * 24);
          this.addKPI.days = Math.round(days);
        }
      }
    },

    // ====================

    // Thêm KPI
    addKPIs() {
      // this.addKPI.start_date = this.formatDates(this.addKPI.start_date);
      this.addKPI.end_date = this.formatDates(this.addKPI.end_date);
      HTTP.post(`/salon/main/manage/kpi/store`, this.addKPI).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.$swal("", result.message, "success");
          history.back();
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // ================
    formatDates(date) {
      var q = new Date(date);
      var dd = q.getDate();
      if (dd < 10) {
        dd = "0" + dd;
      }
      var mm = q.getMonth() + 1;
      if (mm < 10) {
        mm = "0" + mm;
      }
      var yyyy = q.getFullYear();
      return (date = yyyy + "-" + mm + "-" + dd);
    },
    // =====================
    formatDate,
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
