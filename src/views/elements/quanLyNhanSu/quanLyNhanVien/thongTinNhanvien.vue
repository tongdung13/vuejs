<template>
  <div class="col-md-10 res mb-5 mt-3">
    <div v-if="noti.msg != ''">
      <div class="text-center mt-4">
        <b>{{ noti.msg }}</b>
      </div>
    </div>
    <div v-else class="mt-4">
      <div class="row" style="margin-left: 0px">
        <div class="col-md-8">
          <h5 class="color-main font-weight-bold" style="font-size: 16px">
            THÔNG TIN NHÂN VIÊN
          </h5>
        </div>
      </div>
      <div class="row mt-3" style="margin: 0 auto">
        <div class="col-md-3">
          <div
            class="bg"
            style="
              cursor: pointer;
              justify-content: center;
              align-items: center;
              display: flex;
              height: 159px;
            "
          >
            <img
              :src="account.avatar"
              alt=""
              style="width: 130px; height: 130px; border-radius: 50%"
            />
          </div>
        </div>
        <div class="col-md-9 margin-top-5">
          <div class="bg p-3">
            <div class="row">
              <div class="col-6">
                <h6>THÔNG TIN NHÂN VIÊN</h6>
              </div>
              <div class="col-6 text-right">
                <span class="dropdown" style="float: right; margin-top: -5px">
                  <span class="dropbtn">
                    <img
                      src="../../../../assets/image/more-horizontal.png"
                      alt=""
                      style="width: 28px"
                      class="border1 p-1"
                    />
                  </span>
                  <div class="dropdown-content">
                    <span
                      v-if="options.lock == 0"
                      @click="func_lock(account.id)"
                    >
                      Khoá tài khoản
                    </span>
                    <span v-else @click="func_unlock(account.id)">
                      Mở khoá tài khoản
                    </span>
                    <span
                      type="button"
                      data-toggle="modal"
                      data-target="#updatePassEmployee"
                    >
                      Cập nhật mật khẩu
                    </span>
                    <span @click="deleteEmployee(account.id)">
                      Xoá tài khoản
                    </span>
                  </div>
                </span>
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-3 col-sm-3 col-12 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Họ và tên:
              </div>
              <div class="col-md-9 col-sm-9 col-12">
                <div class="bg3" style="font-weight: 700; cursor: pointer">
                  {{ account.name }}
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div
                class="col-md-3 col-sm-3 col-12 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Ngày sinh:
              </div>
              <div class="col-md-4 col-sm-4 col-6">
                <div class="bg3" style="font-weight: 700; cursor: pointer">
                  {{ account.birthday }}
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div
                class="col-md-3 col-sm-3 col-12 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Số điện thoại / email:
              </div>
              <div class="col-md-4 col-sm-3 col-12">
                <div class="bg3" style="font-weight: 700; cursor: pointer">
                  {{ account.phone }}
                </div>
              </div>
              <div class="col-md-5 col-sm-5 col-12 margin-top-5">
                <div class="bg3" style="font-weight: 700; cursor: pointer">
                  {{ account.email }}
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div
                class="col-md-3 col-sm-3 col-12 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Địa chỉ liên hệ:
              </div>
              <div class="col-md-9 col-sm-9 col-12">
                <div class="bg3" style="font-weight: 700; cursor: pointer">
                  {{ account.address }}
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div
                class="col-md-3 col-sm-3 col-12 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Công việc/ Chức vụ:
              </div>
              <div class="col-md col-sm col-12">
                <div class="bg3" style="font-weight: 700; cursor: pointer">
                  {{ options.role }}
                </div>
              </div>
              <div class="col-md col-sm col-12 margin-top-5">
                <div class="bg3" style="font-weight: 700; cursor: pointer">
                  {{ options.position }}
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div
                class="col-md-3 col-sm-3 col-12 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Mức lương:
              </div>
              <div class="col-md col-sm col-12">
                <div
                  class="bg3"
                  style="font-weight: 700; cursor: pointer; width: 47%"
                >
                  {{ formatPrice(options.salary) }}
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div
                class="col-md-3 col-sm-3 col-12 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Ghi chú:
              </div>
              <div class="col-md-9 col-sm-9 col-12">
                <textarea
                  name=""
                  style="width: 100%"
                  rows="4"
                  placeholder="Nhập thông tin cần lưu ý ở đây"
                  v-model="options.note"
                >
                </textarea>
              </div>
            </div>

            <!-- ======= -->
            <div class="mt-4 text-center pb-3">
              <router-link :to="{ name: 'quanLyNhanVien' }">
                <span class="borderx hover mr-3 color-main">Quay lại</span>
              </router-link>
              <router-link
                :to="{
                  name: 'capNhatThongTinNhanVien',
                  params: { capNhatId: account.id },
                }"
              >
                <span class="borderx hover mr-3 color-main"
                  >Cập nhật thông tin</span
                ></router-link
              >
            </div>
            <!-- ============ -->
            <!-- Cập nhật mật khẩu nhân viên-->
            <div
              class="modal fade"
              id="updatePassEmployee"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <b
                      class="modal-title color-main"
                      id="exampleModalLongTitle"
                    >
                      Cập nhật mật khẩu nhân viên
                    </b>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form @submit.prevent="updatePassEmployee(account.id)">
                    <div class="modal-body">
                      <table class="table table-borderless">
                        <tbody>
                          <tr>
                            <td class="text-right" style="width: 40%">
                              Nhập mật khẩu
                            </td>
                            <td class="text-left">
                              <input
                                style="width: 100%; border: 1px solid #d4476f"
                                type="password"
                                autocomplete
                                placeholder="Nhập mật khẩu..."
                                v-model="passEmployee.password"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td class="text-right" style="width: 40%">
                              Xác nhận mật khẩu
                            </td>
                            <td class="text-left">
                              <input
                                style="width: 100%; border: 1px solid #d4476f"
                                type="password"
                                autocomplete
                                placeholder="Xác nhận mật khẩu..."
                                v-model="passEmployee.password_confirmation"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="reset"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Huỷ
                      </button>
                      <button type="submit" class="btn btn-primary">Lưu</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <!-- =========== -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatPrice } from "@/main";
export default {
  name: "thongTinNhanVien",
  data() {
    return {
      employees: [],
      account: [],
      options: [],
      lock: [],
      position: "",
      role: "",
      passEmployee: {},
      noti: {
        status: false,
        msg: "",
      },
    };
  },
  beforeMount() {
    this.listEmployees();
  },
  methods: {
    // Thông tin nhân viên

    listEmployees() {
      let nhanVien = this.$route.params.nhanVienId;
      HTTP.get(`/salon/main/manage/employee/${nhanVien}/detail`)
        .then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.hasData = true;
            this.loading = false;
            this.employees = res.data.data;
            this.account = this.employees.account;
            this.options = this.employees.options;
          } else {
            this.noti.status = true;
            this.noti.msg = result.message;
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // Mở khoá tài khoản nhân viên
    func_lock(lockId) {
      HTTP.get(`/salon/main/manage/employee/${lockId}/lock`)
        .then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.$swal("", result.message, "success");
            this.listEmployees();
          } else {
            this.$swal("", result.message, "error");
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // ========================

    // Khoá tài khoản nhân viên
    func_unlock(un_lockId) {
      HTTP.get(`/salon/main/manage/employee/${un_lockId}/unlock`)
        .then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.$swal("", result.message, "success");
            this.listEmployees();
          } else {
            this.$swal("", result.message, "error");
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // =======================

    // Xoá Nhân Viên
    deleteEmployee(index) {
      this.$swal({
        title: "Xoá nhân viên?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          let employeeId = index;
          HTTP.delete(`/salon/main/manage/employee/${employeeId}/destroy`).then(
            (res) => {
              let result = res.data;
              if (result.status === 1) {
                this.$swal("Đã xoá!", result.message, "success");
                setTimeout(function() {
                  history.back();
                }, 2000);
              } else {
                this.$swal("", result.message, "error");
              }
            }
          );
        }
      });
    },
    // ======================

    // Cập nhật mật khẩu nhân viên
    updatePassEmployee(PassEmployee) {
      HTTP.put(
        `/salon/main/manage/employee/${PassEmployee}/password`,
        this.passEmployee
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
    // ===================

    // ==================

    // Định dạng giá tiền
    formatPrice,
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
  min-height: 34px;
}
.borderx {
  border: 1px solid #d4476f;
  padding: 5px 25px;
  border-radius: 4px;
  cursor: pointer;
}
table td {
  vertical-align: middle;
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

.active {
  background-color: rgba(212, 71, 111, 0.1);
  border-bottom: 2px solid #d4476f;
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

.dropdown-content span {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-content span:hover {
  background-color: #d4476f;
  color: white;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
