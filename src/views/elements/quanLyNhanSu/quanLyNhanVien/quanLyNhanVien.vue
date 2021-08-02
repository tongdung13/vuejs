<template>
  <div class="col-md-10 res mb-5 mt-3">
    <select
      name="salon_id"
      class="inputx mr-3 res-margin-0"
      style="width: 30%; outline: none"
      v-model="filter.salon_id"
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
    <div class="mt-4">
      <div class="row" style="margin-left: 0px">
        <div class="col-md-6 col-sm-6 col-6">
          <h5 class="color-main font-weight-bold" style="font-size: 16px">
            DANH SÁCH NHÂN VIÊN
          </h5>
        </div>
        <!-- <div class="col-md-6 col-sm-6 col-6 pr-4" style="text-align: right">
          <span class="color-main bg pl-4 pr-4 p-2 font-weight-bold"
            >BÁO CÁO NHÂN VIÊN</span
          >
        </div> -->
      </div>
      <div class="mt-3" style="margin-left: 0px">
        <div class="w-75 res width-100 margin-top-5" style="margin: 0 auto">
          <div class="bg p-3">
            <div class="mt-2 mb-3">
              <table class="w-75 width-100">
                <tbody>
                  <tr>
                    <td>Theo vị trí:</td>
                    <td>Theo tên:</td>
                    <td>Theo số điện thoại</td>
                    <td>Theo email</td>
                  </tr>
                  <tr>
                    <td>
                      <select
                        class="input mr-3 res-margin-0"
                        style="width: 90%; outline: none; border: none"
                        v-model="filter.position"
                        @change="onChange"
                      >
                        <option value="">Tất cả nhân viên</option>
                        <option value="1">Bộ phận quản lý</option>
                        <option value="2">Bộ phận bán hàng</option>
                        <option value="3">Bộ phận marketing</option>
                        <option value="4">Bộ phận thợ chính</option>
                        <option value="5">Bộ phận thợ phụ</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Tìm kiếm tên"
                        class="margin-top-5 float-left-0"
                        style="
                          width: 90%;
                          padding: 4px 10px;
                        "
                        v-model="filter.name"
                        @change="searchName"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Tìm kiếm sdt"
                        class="margin-top-5 float-left-0"
                        style="
                          width: 90%;
                          padding: 4px 10px;
                        "
                        v-model="filter.phone"
                        @change="searchPhone"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Tìm kiếm email"
                        class="margin-top-5 float-left-0"
                        style="
                          width: 90%;
                          padding: 4px 10px;
                        "
                        v-model="filter.email"
                        @change="searchEmail"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <loadingData v-if="loading"></loadingData>
            <div v-if="hasData" class="table-responsive">
              <div v-if="msg == 'Chưa có nhân viên'" class="text-center">
                <b>{{ msg }}</b>
              </div>
              <div v-else>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Họ và Tên</th>
                      <th>Số điện thoại</th>
                      <th>Email</th>
                      <th class="text-center">Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody v-for="(employee, index) in employees" :key="index">
                    <tr v-if="employee.id != salonOwner">
                      <router-link
                        :to="{
                          name: 'thongTinNhanVien',
                          params: { nhanVienId: employee.id },
                        }"
                      >
                        <td class="color-main">
                          <img
                            :src="employee.link_avatar"
                            alt=""
                            style="width: 35px; height: 35px; border-radius: 50%; object-fit: cover;"
                          />
                          <b class="ml-2">{{ employee.name }}</b>
                        </td>
                      </router-link>
                      <td>{{ employee.phone }}</td>
                      <td>{{ employee.email }}</td>
                      <td class="text-center">
                        <span v-if="employee.lock == 1">Khoá</span>
                        <span v-else>Đang hoạt động</span>
                      </td>
                      <td>
                        <router-link
                          :to="{
                            name: 'thongTinNhanVien',
                            params: { nhanVienId: employee.id },
                          }"
                        >
                          <b class="color-main">Xem chi tiết</b>
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- phân trang -->
              <div v-if="paginate.totalPage == 1"></div>
              <div v-else class="mt-3">
                <ul class="pagination justify-content-end">
                  <li
                    class="page-item"
                    style="cursor: pointer; color: #d4476f !important"
                    :class="{ disabled: paginate.currentPage === 1 }"
                  >
                    <span class="page-link" @click="changePage(1)">Đầu</span>
                  </li>
                  <li class="page-item" style="cursor: pointer">
                    <span
                      class="page-link"
                      style="height: 100%"
                      @click="changePage(paginate.currentPage - 1)"
                      v-if="paginate.currentPage > 1"
                    >
                      <img
                        src="../../../../assets/image/left.png"
                        alt=""
                        style="
                          width: 65%;
                          padding: 3px 0px;
                          display: block;
                          margin: 0px auto;
                          border: none;
                        "
                        class="border1"
                      />
                    </span>
                  </li>

                  <li
                    class="page-item"
                    v-for="(page, index) in paginate.totalPage"
                    :key="index"
                    :class="{ active: paginate.currentPage === page }"
                    style="cursor: pointer"
                  >
                    <span
                      class="page-link"
                      @click="changePage(index + 1)"
                      v-if="
                        index + 1 == paginate.currentPage ||
                          index + 1 == paginate.currentPage + 1 ||
                          index + 1 == paginate.currentPage - 1
                      "
                      >{{ index + 1 }}</span
                    >
                  </li>

                  <li class="page-item" style="cursor: pointer">
                    <span
                      class="page-link"
                      style="height: 100%"
                      @click="changePage(paginate.currentPage + 1)"
                      v-if="paginate.currentPage < paginate.totalPage"
                    >
                      <img
                        src="../../../../assets/image/right.png"
                        alt=""
                        style="
                          width: 65%;
                          padding: 3px 0px;
                          display: block;
                          margin: 0px auto;
                          border: none;
                        "
                      />
                    </span>
                  </li>

                  <li
                    class="page-item"
                    style="cursor: pointer"
                    :class="{
                      disabled: paginate.currentPage == paginate.totalPage,
                    }"
                  >
                    <span
                      class="page-link"
                      @click="changePage(paginate.totalPage)"
                      >Cuối</span
                    >
                  </li>
                </ul>
              </div>
              <!-- ============ -->
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
  name: "danhSachNhanVien",
  components: {
    loadingData,
  },
  data() {
    return {
      loading: true,
      hasData: false,
      employees: [],
      listStore: {},
      lock: [],
      status_lock: 1,
      paginate: {
        currentPage: 1,
        totalPage: 1,
      },
      salonOwner: "",
      filter: {
        salon_id: "",
        name: "",
        phone: "",
        email: "",
        position: "",
      },
      msg: "",
    };
  },
  created() {
    let info = localStorage.getItem("userInfo");
    let objInfo = JSON.parse(info);
    this.salonOwner = objInfo.id;
  },
  beforeMount() {
    this.listEmployee();
    this.getListStore();
  },
  methods: {
    changePage(index) {
      this.paginate.currentPage = index;
      this.listEmployee();
    },
    // Danh sách nhân viên
    listEmployee() {
      let page = this.paginate.currentPage;
      HTTP.get(
        `/salon/main/manage/employee?page=${page}&name=${this.filter.name}&phone=${this.filter.phone}&email=${this.filter.email}&salon_id=${this.filter.salon_id}&position=${this.filter.position}`
      )
        .then((res) => {
          let result = res.data;
          if (result.status === 1) {
            let data = result.data;
            if (data.data.length > 0) {
              this.hasData = true;
              this.loading = false;
              this.employees = data.data;
              if (this.employees[0].id == 2) {
                this.msg = "Chưa có nhân viên";
              }
              this.paginate.currentPage = data.current_page;
              this.paginate.totalPage = data.last_page;
            } else {
              this.hasData = true;
              this.loading = false;
              this.msg = "Chưa có nhân viên";
            }
          } else {
            this.notification.status = true;
            this.notification.message = result.message;
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // =============

    // Lọc theo SalonId
    onChange() {
      this.loading = true;
      this.hasData = false;
      this.msg = "";
      this.listEmployee();
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
    searchName() {
      this.msg = "";
      this.loading = true;
      this.hasData = false;
      this.listEmployee();
    },
    searchPhone() {
      this.msg = "";
      this.loading = true;
      this.hasData = false;
      this.listEmployee();
    },
    searchEmail() {
      this.msg = "";
      this.loading = true;
      this.hasData = false;
      this.listEmployee();
    },
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}

.input {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 5px 10px;
  outline: none;
}

input,
textarea,
.bg3 {
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
  padding: 10px 15px;
  outline: none;
  border: none;
}

ul li {
  display: inline-block;
}

.bg {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}

.bg1 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 47px;
}

.bg2 {
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
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
  font-size: 12px;
}

li a:hover {
  color: #d4476f;
  text-decoration: none;
}
</style>
