<template>
  <div class="col-md-10 res mb-5 mt-3">
    <div class="row">
      <div class="col-md-8 col-sm-12 col-12">
        <select
          name="salon_id"
          class="inputx mr-3 res-margin-0"
          style="width: 30%; outline: none"
          v-model="salonId"
          @change="onChange()"
        >
          <option value="">Tất cả salon</option>

          <option v-for="salon in listStore" :key="salon.id" :value="salon.id">
            {{ salon.salon_name }}
          </option>
        </select>
        <router-link :to="{ name: 'themNhanVien' }">
          <span class="inputx hover color-main mr-3">+ Thêm nhân viên</span>
        </router-link>
        <span class="inputx hover color-main">Xuất báo cáo</span>
      </div>
      <!-- <div class="col-md-4 div sm-12 col-12">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng"
          style="
            width: 50%;
            position: relative;
            float: right;
            padding: 4px 10px;
          "
          class="margin-top-5 float-left-0"
        />
        <i
          class="fas fa-search color-main"
          style="position: absolute; top: 9px; right: 55px"
        ></i>
      </div> -->
    </div>
    <div class="mt-4">
      <div class="row">
        <div class="col-md-6 col-sm-12 col-12 pt-2">
          <h5 class="color-main font-weight-bold" style="font-size: 16px">
            QUẢN LÝ CHẤM CÔNG
          </h5>
        </div>
        <div
          class="col-md-6 col-sm-12 col-12 pr-4 float-left-0 margin-top-5"
          style="text-align: right"
        >
          <router-link :to="{ name: 'danhSachNhanVien' }">
            <span
              class="color-main hover bg pl-4 pr-4 p-2 font-weight-bold mr-4"
              >DANH SÁCH TẤT CẢ NHÂN VIÊN</span
            >
          </router-link>
          <!-- <router-link :to="{ name: 'danhSachNhanVien' }">
            <span
              class="color-main hover bg pl-4 pr-4 p-2 font-weight-bold mr-4"
              >BÁO CÁO CHẤM CÔNG</span
            >
          </router-link> -->
        </div>
      </div>
    </div>
    <div
      class="mt-3"
      style="background: rgba(255, 255, 255, 0.4); border-radius: 16px"
    >
      <div class="group-tabs">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" @click="changeTimeDay()">
            <a
              href="#home"
              aria-controls="home"
              role="tab"
              data-toggle="tab"
              class="active pt-2 pb-2"
              style="border-top-left-radius: 16px"
            >
              <span>HÔM NAY</span>
            </a>
          </li>
          <li role="presentation" @click="changeTimeWeek()">
            <a
              href="#profile"
              aria-controls="profile"
              role="tab"
              data-toggle="tab"
              class="pt-2 pb-2"
            >
              <span>THEO TUẦN</span>
            </a>
          </li>
          <li role="presentation" @click="changeTimeMonth()">
            <a
              href="#messages"
              aria-controls="messages"
              role="tab"
              data-toggle="tab"
              class="pt-2 pb-2"
            >
              <span>THEO THÁNG</span>
            </a>
          </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content pr-3">
          <div
            role="tabpanel"
            class="tab-pane active table-responsive"
            style="
              border: none !important;
              background-color: rgba(255, 255, 255, 0.4);
            "
            id="home"
          >
            <!-- one -->

            <loadingData v-if="loading"></loadingData>
            <div v-if="hasData">
              <div v-if="notification.msg != ''" class="mt-3 text-center">
                <b style="font-size: 130%" class="color-main">
                  {{ notification.msg }}</b
                >
              </div>
              <table
                v-else
                class="table table-borderless table-hover text-center"
              >
                <thead>
                  <tr>
                    <th><b>STT</b></th>
                    <th class="text-left">Họ và tên</th>
                    <th>Vị trí</th>
                    <th>Thời gian tới</th>
                    <th>Thời gian về</th>
                    <th>Thời gian làm</th>
                    <th class="text-center">Tình trạng</th>
                  </tr>
                </thead>
                <tbody
                  class="font-weight-bold"
                  v-for="(employee, index) in timeDay"
                  :key="index"
                >
                  <tr>
                    <td>
                      <b>#{{ index + 1 }}</b>
                    </td>
                    <td class="text-left">
                      <router-link
                        :to="{
                          name: 'thongTinNhanVien',
                          params: { nhanVienId: employee.id },
                        }"
                      >
                        <img
                          :src="employee.avatar"
                          alt=""
                          style="width: 35px; height: 35px; border-radius: 50%; object-fit: cover;"
                        />
                        <b class="ml-3 color-main">{{
                          employee.name
                        }}</b></router-link
                      >
                    </td>
                    <td>{{ employee.position }}</td>
                    <td>{{ employee.time_come }}</td>
                    <td>
                      <span v-if="employee.time_out == null">
                        Chưa có dữ liệu về
                      </span>
                      <span v-else>{{ employee.time_out }}</span>
                    </td>
                    <td>
                      <span
                        v-if="
                          employee.time_work < 0 ||
                            employee.time_work == undefined
                        "
                      >
                        Chưa có dữ liệu về
                      </span>
                      <span v-else>
                        {{ employee.time_work.toFixed(2) }} giờ
                      </span>
                    </td>
                    <td style="color: #d70f0f; text-align: center">
                      <span v-if="employee.time_work <= 8">
                        Thiếu giờ
                      </span>
                      <span v-else>Đủ giờ</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            role="tabpanel"
            class="tab-pane"
            id="profile"
            style="
              border: none !important;
              background-color: rgba(255, 255, 255, 0.4);
            "
          >
            <loadingData v-if="loading"></loadingData>
            <div v-if="hasData">
              <div v-if="notification.msg != ''" class="mt-3 text-center">
                <b style="font-size: 130%" class="color-main">
                  {{ notification.msg }}</b
                >
              </div>
              <!-- two -->
              <table v-else class="table table-borderless text-center">
                <thead>
                  <tr>
                    <th><b>STT</b></th>
                    <th class="pl-2 text-left">Họ và tên</th>
                    <th>Vị trí</th>
                    <th>Thứ 2</th>
                    <th>Thứ 3</th>
                    <th>Thứ 4</th>
                    <th>Thứ 5</th>
                    <th>Thứ 6</th>
                    <th>Thứ 7</th>
                    <th>Tổng số công</th>
                  </tr>
                </thead>
                <tbody class="font-weight-bold">
                  <tr v-for="(week, index) in timeWeek" :key="index">
                    <td>
                      <b>#{{ index + 1 }}</b>
                    </td>
                    <td class="pt-1 pl-2 text-left">
                      <img
                        :src="week.avatar"
                        alt=""
                        style="width: 35px; height: 35px; border-radius: 50%; object-fit: cover;"
                      />
                      <b class="color-main ml-2"> {{ week.name }} </b>
                    </td>
                    <td>{{ week.position }}</td>
                    <td>
                      <input
                        type="checkbox"
                        disabled
                        :checked="week.in_week.includes('Monday')"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        disabled
                        :checked="week.in_week.includes('Tuesday')"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        disabled
                        :checked="week.in_week.includes('Wednesday')"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        disabled
                        :checked="week.in_week.includes('Thursday')"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        disabled
                        :checked="week.in_week.includes('Friday')"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        disabled
                        :checked="week.in_week.includes('Saturday')"
                      />
                    </td>
                    <td>{{ toFixe(week.hours) + "/6" }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            role="tabpanel"
            class="tab-pane"
            id="messages"
            style="border: none; background: rgba(255, 255, 255, 0.4)"
          >
            <!-- Théo tháng -->
            <loadingData v-if="loading"></loadingData>
            <div v-if="hasData">
              <div v-if="notification.msg != ''" class="mt-3 text-center">
                <b style="font-size: 130%" class="color-main">
                  {{ notification.msg }}</b
                >
              </div>
              <table v-else class="table table-borderless text-left">
                <thead>
                  <tr class="text-center">
                    <th><b>STT</b></th>
                    <th class="text-left">Họ và tên</th>
                    <th>Vị trí</th>
                    <th>Tên salon</th>
                    <!-- <th>Tuần 1</th>
                    <th>Tuần 2</th>
                    <th>Tuần 3</th>
                    <th>Tuần 4</th>
                    <th>Tuần 5</th> -->
                    <th>Tổng số công</th>
                  </tr>
                </thead>
                <tbody class="font-weight-bold">
                  <tr
                    class="text-center"
                    v-for="(item, index) in timeMonth"
                    :key="index"
                  >
                    <td>
                      <b>#{{ index + 1 }}</b>
                    </td>
                    <td class="text-left">
                      <img
                        :src="item.avatar"
                        alt=""
                        style="width: 35px; height: 35px; border-radius: 50%; object-fit: cover;"
                      />
                      <span class="ml-2">{{ item.name }}</span>
                    </td>
                    <td>{{ item.position }}</td>
                    <td>{{ item.salon }}</td>
                    <!-- <td>3/6</td>
                    <td>1/6</td>
                    <td>2/6</td>
                    <td>6/6</td>
                    <td>3/6</td> -->
                    <td>{{ toFixe(item.hours) + " công" }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
import loadingData from "@/components/loadingData";
export default {
  name: "quanLyChamCong",
  components: {
    loadingData,
  },
  data() {
    return {
      inWeek: [],
      loading: true,
      hasData: false,
      listEmployee: [],
      notification: {
        msg: "",
        status: "",
      },
      listStore: {},
      salonId: "",
      type: "1",
      timeDay: {},
      timeWeek: {},
      timeMonth: {},
      state: 1,
    };
  },
  created() {
    HTTP.get(`/salon/main/manage/employee/all`)
      .then((res) => {
        this.listEmployee = res.data.data;
        // console.log(this.listEmployee);
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  beforeMount() {
    this.timeKeepDay();
    this.getListStore();
  },
  methods: {
    // Theo ngày
    timeKeepDay() {
      HTTP.get(`/salon/main/manage/timekeep/1?salon_id=${this.salonId}`).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            this.loading = false;
            this.hasData = true;
            let data = result.data.data;
            if (data.length > 0) {
              this.timeDay = data;
              console.log(this.timeDay);
            } else this.notification.msg = "Chưa có nhân viên!!!";
          } else {
            this.notification.status = true;
            this.notification.msg = result.message;
          }
        }
      );
    },
    // ===============

    // Theo tuần
    timeKeepWeek() {
      HTTP.get(`/salon/main/manage/timekeep/2?salon_id=${this.salonId}`).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            this.loading = false;
            this.hasData = true;
            let data = result.data.data;
            if (data.length > 0) {
              this.timeWeek = data;
            } else this.notification.msg = "Chưa có nhân viên!!!";
          } else {
            this.notification.status = true;
            this.notification.msg = result.message;
          }
        }
      );
    },
    // ===============

    // Theo tháng
    timeKeepMonth() {
      HTTP.get(`/salon/main/manage/timekeep/3?salon_id=${this.salonId}`).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            this.loading = false;
            this.hasData = true;
            let data = result.data.data;
            if (data.length > 0) {
              this.timeMonth = data;
              console.log(this.timeMonth);
            } else this.notification.msg = "Chưa có nhân viên!!!";
          } else {
            this.notification.status = true;
            this.notification.msg = result.message;
          }
        }
      );
    },
    // ===============

    // Thay đổi theo ngày, tuần, tháng
    changeTimeDay() {
      (this.state = 1), (this.loading = true);
      this.hasData = false;
      this.notification.msg = "";
      this.timeKeepDay();
    },
    changeTimeWeek() {
      (this.state = 2), (this.loading = true);
      this.hasData = false;
      this.notification.msg = "";
      this.timeKeepWeek();
    },
    changeTimeMonth() {
      (this.state = 3), (this.loading = true);
      this.hasData = false;
      this.notification.msg = "";
      this.timeKeepMonth();
    },
    // Lọc theo SalonId
    onChange() {
      this.loading = true;
      this.hasData = false;
      this.notification.msg = "";
      if (this.state == 1) {
        this.changeTimeDay();
      }
      if (this.state == 2) {
        this.changeTimeWeek();
      }
      if (this.state == 3) {
        this.changeTimeMonth();
      }
    },
    // ===============

    // Danh sách Salon
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
      });
    },
    // ====================
    toFixe(value) {
      return parseFloat(value).toFixed(2);
    },
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}

.input,
input {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 5px 10px;
  outline: none;
}

ul li {
  display: inline-block;
}

.bg {
  background: rgba(255, 255, 255, 0.8);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 47px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: left;
}

li a {
  display: block;
  color: #d4476f;
  text-align: center;
  padding: 0.5rem 1em;
  text-decoration: none;
  cursor: pointer;
}

.tab-pane {
  font-size: 14px;
}

li a:hover {
  color: #d4476f;
  text-decoration: none;
}

.active {
  background-color: rgba(212, 71, 111, 0.1);
  border-bottom: 2px solid #d4476f;
}
.table td,
.table th {
  vertical-align: middle !important;
}
</style>
