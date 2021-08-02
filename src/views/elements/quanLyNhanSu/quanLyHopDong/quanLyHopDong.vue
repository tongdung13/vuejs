<template>
  <div class="col-md-10 res mb-4 mt-3">
    <div class="row">
      <div class="col-md-8 col-sm-12 col-12">
        <select
          class="inputx mr-3"
          v-model="salon_id"
          style="width: 30%; outline: none"
          @change="onChange()"
        >
          <option value="">Tất cả salon</option>

          <option v-for="salon in listStore" :key="salon.id" :value="salon.id">
            {{ salon.salon_name }}
          </option>
        </select>
        <router-link :to="{ name: 'themHopDong' }">
          <span class="inputx hover color-main mr-3">+ Thêm hợp đồng</span>
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
        <div class="col-md">
          <h5 class="color-main font-weight-bold" style="font-size: 16px">
            QUẢN LÝ HỢP ĐỒNG
          </h5>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <div class="row">
        <div class="col-md-2 col-sm-12 col-12">
          <div v-if="msg === ''">
            <div class="row">
              <div
                class="col-md-12 col-sm-6 col-6 mt-1 pr-0"
                v-for="(item, index) in listEmployee"
                :key="index"
              >
                <div
                  @click="changeEmployee(item.id)"
                  class="mt-2 bg row m-0"
                  style="cursor: pointer"
                  :class="{ active: contractID === item.id }"
                >
                  <div style="padding: 5px">
                    <img
                      :src="item.avatar"
                      alt="photo"
                      style="width: 35px; height: 35px; border-radius: 50%; object-fit: cover;"
                    />
                  </div>
                  <div
                    style="display: flex; align-items: center; margin-left: 5px"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
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
          <div v-else>
            <b>{{ msg }}</b>
          </div>
        </div>
        <div class="col-md-7 col-sm-12 col-12 margin-top-5">
          <div class="bg1 p-3">
            <div class="row">
              <div class="col-md-6 col-sm-6 col-6">
                <h6 class="color-main font-weight-bold" style="margin-top: 5px">
                  CHI TIẾT HỢP ĐỒNG
                </h6>
              </div>
              <div class="col-md-6 col-sm-6 col-6 text-right">
                <router-link
                  :to="{
                    name: 'capNhatHopDong',
                    params: { hopDongId: contractID },
                  }"
                >
                  <span class="input mr-2 hover color-main"> Chỉnh sửa </span>
                </router-link>
                <span @click="deleteContract()" class="input hover color-main">
                  Xoá
                </span>
              </div>
            </div>

            <loadingData v-if="loading"></loadingData>
            <div v-if="hasData">
              <div class="mt-3">
                <div class="row">
                  <div class="col-md-3 text-center">
                    <img
                      :src="listContract.avatar"
                      alt="photo"
                      style="width: 130px; height: 130px; border-radius: 50%; object-fit: cover;"
                    />
                    <div class="mt-3 color-main">
                      <b>{{ listContract.name }}</b>
                    </div>
                  </div>
                  <div class="col-md-9">
                    <div class="bg1 pt-3 pl-3 pr-3 pb-0">
                      <h6 class="font-weight-bold">
                        THÔNG TIN CÁ NHÂN - BÊN A
                      </h6>
                      <hr />
                      <table class="table align-middle table-borderless">
                        <tbody>
                          <tr>
                            <th scope="row" style="width: 30%;">Họ và tên</th>
                            <td>{{ listContract.name }}</td>
                          </tr>
                          <tr>
                            <th scope="row">Ngày sinh</th>
                            <td>{{ listContract.birthday }}</td>
                          </tr>
                          <tr>
                            <th scope="row">Số điện thoại</th>
                            <td>{{ listContract.phone }}</td>
                          </tr>
                          <tr>
                            <th scope="row">Địa chỉ</th>
                            <td>{{ listContract.address }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="mt-3 bg1 pt-3 pl-3 pr-3 pb-0">
                      <h6 class="font-weight-bold">
                        THỜI HẠN VÀ TRÁCH NHIỆM CÔNG VIỆC
                      </h6>
                      <hr />
                      <table class="table align-middle table-borderless">
                        <tbody>
                          <tr>
                            <th scope="row" style="width: 30%;">
                              Loại hợp đồng
                            </th>
                            <td>{{ listContract.type_contract }}</td>
                          </tr>
                          <tr>
                            <th scope="row">Thời hạn</th>
                            <td>
                              {{ listContract.timeout }} ({{
                                listContract.start_date
                              }}
                              đến {{ listContract.end_date }})
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Công việc</th>
                            <td>{{ listContract.work }}</td>
                          </tr>
                          <tr>
                            <th scope="row">Thời gian làm việc</th>
                            <td>
                              {{ listContract.worktime }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="mt-3 bg1 pt-3 pl-3 pr-3 pb-0">
                      <h6 class="font-weight-bold">
                        QUYỀN LỢI CỦA NGƯỜI LAO ĐỘNG
                      </h6>
                      <hr />
                      <table class="table align-middle table-borderless">
                        <tbody>
                          <tr>
                            <th scope="row" style="width: 30%;">Mức lương</th>
                            <td>{{ formatPrice(listContract.salary) }}</td>
                          </tr>
                          <tr>
                            <th scope="row">Phụ cấp</th>
                            <td>
                              {{ listContract.allowance }}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Thưởng</th>
                            <td>
                              {{ listContract.reward }}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">bảo hiểm lao động</th>
                            <td>{{ listContract.insurrance }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-12 col-12 text-center margin-top-5 p-0">
          <div class="bg1 p-2">
            <div class="bg">
              <div
                class="color-main font-weight-bold pt-2 pb-2 text-center"
                style="font-size: 14px"
              >
                THỐNG KÊ
              </div>
            </div>
            <div class="menu-right">
              <h5
                style="font-size: 13px"
                class="p-3 mt-2"
                v-for="(item, index) in listAnalis"
                :key="index"
              >
                {{ item.salon_name }}: {{ item.amount }} hợp đồng
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP, formatPrice } from "@/main";
import loadingData from "@/components/loadingData";
export default {
  name: "quanLyHopDong",
  components: {
    loadingData,
  },
  data() {
    return {
      paginate: {
        currentPage: 1,
        totalPage: "",
      },
      loading: true,
      hasData: false,
      listContract: {},
      listEmployee: {},
      contractID: "3",
      listStore: {},
      listAnalis: {},
      salon_id: "",
      msg: "",
    };
  },
  beforeMount() {
    this.listEmployees();
    this.getListStore();
    this.analist();
  },
  methods: {
    onChange() {
      this.loading = true;
      this.hasData = false;
      if (this.salon_id === "") {
        this.listEmployees();
      } else this.listEmployeeSalon();
    },
    changeEmployee(index) {
      this.loading = true;
      this.hasData = false;
      this.contractID = index;
      this.listContracts();
    },
    // danh sách tất cả nhân viên có hợp đồng
    listEmployees() {
      let page = this.paginate.currentPage;
      HTTP.get(`/salon/main/manage/contract/listemployee?page=${page}`)
        .then((response) => {
          let result = response.data;
          this.listEmployee = response.data.data.data;
          this.contractID = this.listEmployee[0].id;
          this.listContracts();
          let paginate = result.data;
          this.paginate.currentPage = paginate.current_page;
          this.paginate.totalPage = paginate.last_page;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // ================================

    // danh sách nhân viên theo salon
    listEmployeeSalon() {
      HTTP.get(`/salon/main/manage/contract/listemployee/${this.salon_id}`)
        .then((response) => {
          this.listEmployee = response.data.data.data;
          this.contractID = this.listEmployee[0].id;
          this.listContracts();
          let lengListEmployee = this.listEmployee.length;
          if (lengListEmployee <= 0) {
            this.msg = "Chưa có nhân viên!!!";
          } else this.msg = "";
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // ==================

    // danh sách thống kê
    analist() {
      HTTP.get(`/salon/main/manage/contract/listsalon`)
        .then((res) => {
          this.listAnalis = res.data.data.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // ==================

    // chi tiết hợp đồng
    listContracts() {
      HTTP.get(`/salon/main/manage/contract/show/${this.contractID}`)
        .then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.loading = false;
            this.hasData = true;
            this.listContract = res.data.data;
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // danh sach cua hang salon
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
    // Xoá hợp đồng
    deleteContract() {
      this.$swal({
        title: "Xoá hợp đồng",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete(
            `/salon/main/manage/contract/delete/${this.contractID}`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.listEmployees();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    changePage(index) {
      this.loading = true;
      this.hasData = false;
      this.paginate.currentPage = index;
      this.listEmployees();
    },
    formatPrice,
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
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 47px;
}

.bg1 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
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
  background-color: #d4476f;
  color: white;
}
.menu-right h5:hover {
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  color: #d4476f;
}
.dropbtn {
  color: white;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.table th, .table td {
  padding: 0.5rem;
}
</style>
