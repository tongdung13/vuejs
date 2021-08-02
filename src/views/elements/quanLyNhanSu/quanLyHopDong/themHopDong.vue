<template>
  <div class="col-md-10 res mb-5 mt-3">
    <!-- <router-link to="/donOffline">
      <span class="inputx color-main mr-3">+ Đơn ofline</span>
    </router-link>
    <router-link to="/xuatBaoCao">
      <span class="inputx color-main">Xuất báo cáo</span>
    </router-link> -->
    <h5 class="mt-3 font-weight-bold color-main">THÊM HỢP ĐỒNG</h5>

    <!-- Thong tin bán hàng -->
    <div class="mt-4 bg-8 pt-3 pb-3 pl-5 pr-5">
      <h6>THÔNG TIN HỢP ĐỒNG</h6>
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
                  class="inputx mr-3 res-margin-0 w-100"
                  style="outline: none"
                  v-model="submitData.salon_id"
                  @change="onChange()"
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
              <td style="width: 15%">
                <div class="table-input">Chọn nhân viên:</div>
              </td>
              <td>
                <div v-if="submitData.salon_id">
                  <select
                    class="inputx mr-3"
                    v-model="submitData.user_id"
                    style="width: 100%; outline: none"
                  >
                    <option value="">--Chọn nhân viên--</option>

                    <option
                      v-for="employee in listEmployee"
                      :key="employee.id"
                      :value="employee.id"
                    >
                      {{ employee.name }}
                    </option>
                  </select>
                </div>
                <div v-else>
                  <input
                  type="text"
                  class="w-100"
                  placeholder="Vui lòng chọn salon"
                  readonly
                />
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%">
                <div class="table-input">Loại hợp đồng:</div>
              </td>
              <td style="width: 30%">
                <select
                  class="inputx mr-3"
                  v-model="submitData.type_contract"
                  style="width: 100%; outline: none"
                >
                  <option value="">--Chọn loại hợp đồng--</option>

                  <option
                    v-for="hopDong in listHopDong"
                    :key="hopDong.name"
                    :value="hopDong.name"
                  >
                    {{ hopDong.name }}
                  </option>
                </select>
              </td>
              <td>
                <div class="table-input">Công việc:</div>
              </td>
              <td style="width: 30%">
                <select
                  class="inputx mr-3"
                  v-model="submitData.work"
                  style="width: 100%; outline: none"
                >
                  <option value="">--Chọn công việc--</option>

                  <option value="1">Bộ phận quản lý</option>
                  <option value="2">Bộ phận bán hàng</option>
                  <option value="3">Bộ phận marketing</option>
                  <option value="4">Bộ phận thợ chính</option>
                  <option value="5">Bộ phận thợ phụ</option>
                </select>
              </td>
            </tr>
            <tr>
              <td style="width: 15%">
                <div class="table-input">Ngày bắt đầu:</div>
              </td>
              <td style="width: 30%">
                <input
                  type="date"
                  v-model="submitData.start_date"
                  class="w-100"
                  @change="analisDay"
                />
              </td>

              <td style="width: 15%">
                <div class="table-input">Ngày kết thúc:</div>
              </td>
              <td style="width: 30%">
                <input
                  type="date"
                  v-model="submitData.end_date"
                  class="w-100"
                  @change="analisDay"
                />
              </td>
            </tr>
            <tr>
              <td style="width: 15%">
                <div class="table-input">Thời hạn HĐ:</div>
              </td>
              <td style="width: 30%">
                <div class="inputx text-left" v-if="submitData.timeout > 0">
                  {{ submitData.timeout + " ngày" }}
                </div>
                <div class="inputx text-left" v-else style="min-height: 34px;">
                  {{ submitData.timeout }}
                </div>
              </td>
              <td style="width: 15%">
                <div class="table-input">Thời gian làm việc:</div>
              </td>
              <td>
                <input
                  type="text"
                  class="w-100"
                  placeholder="Thời gian làm việc..."
                  v-model="submitData.worktime"
                />
              </td>
            </tr>
            <tr>
              <td>
                <div class="table-input">Mức lương:</div>
              </td>
              <td style="width: 30%">
                <input
                  type="number"
                  class="w-100"
                  placeholder="Mức lương..."
                  v-model="submitData.salary"
                />
              </td>
              <td style="width: 15%">
                <div class="table-input">Phụ cấp:</div>
              </td>
              <td>
                <input
                  type="number"
                  class="w-100"
                  placeholder="Phụ cấp..."
                  v-model="submitData.allowance"
                />
              </td>
            </tr>
            <tr>
              <td>
                <div class="table-input">Thưởng:</div>
              </td>
              <td style="width: 30%">
                <input
                  type="text"
                  class="w-100"
                  placeholder="Thưởng..."
                  v-model="submitData.reward"
                />
              </td>
              <td style="width: 15%">
                <div class="table-input">Bảo hiểm lao động:</div>
              </td>
              <td>
                <select
                  class="inputx mr-3"
                  v-model="submitData.insurrance"
                  style="width: 100%; outline: none"
                >
                  <option value="">--Chọn bảo hiểm--</option>

                  <option>Bảo hiểm y tế</option>
                  <option>Bảo hiểm thất nghệp</option>
                  <option>Bảo hiểm xã hội</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-3 text-center pb-3">
        <span @click="backPage" class="borderx mr-2 color-main">Quay lại</span>
        <span @click="addCards" class="borderx color-main"
          >Lưu và hiển thị</span
        >
      </div>
    </div>
    <!-- ================== -->
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "themHopDong",
  data() {
    return {
      listEmployee: {},
      listHopDong: [
        { id: 1, name: "Hợp đồng thử việc" },
        { id: 2, name: "Hợp đồng có thời hạn" },
        { id: 3, name: "Hợp đồng vô thời hạn" },
      ],
      submitData: {
        salon_id: "",
        user_id: "",
        type_contract: "",
        start_date: "",
        end_date: "",
        timeout: "",
        work: "",
        worktime: "",
        salary: "",
        allowance: "",
        reward: "",
        insurrance: "",
      },
      listStore: [],
    };
  },
  beforeMount() {
    this.getListStore();
  },
  methods: {
    analisDay() {
      if (this.submitData.start_date != "" && this.submitData.end_date != "") {
        const startDate = this.submitData.start_date;
        const endDate = this.submitData.end_date;
        const timeDiff = new Date(endDate) - new Date(startDate);
        if (timeDiff < 0) {
          this.submitData.timeout = "Ngày bắt đầu phải sau ngày kết thúc";
        } else this.submitData.timeout = timeDiff / (1000 * 60 * 60 * 24);
      }
    },
    // danh sách NV chưa có hợp đồng
    listEmployees() {
      HTTP.get(
        `/salon/main/manage/contract/listusernocontract?salon_id=${this.submitData.salon_id}`
      )
        .then((response) => {
          this.listEmployee = response.data.data.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // =============================
    // Thêm hợp đồng
    addCards() {
      HTTP.post(`/salon/main/manage/contract/store`, this.submitData).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            this.$swal("", result.message, "success");
            setTimeout(() => {
              history.back();
            }, 1000);
          } else {
            this.$swal("", result.message, "error");
          }
        }
      );
    },
    // ================// Danh sách Salon
    getListStore() {
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
    // ====================
    // Lọc theo salon_id
    onChange() {
      this.listEmployees();
    },
    // ===================
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
