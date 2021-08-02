<template>
  <div class="col-md-10 mb-5 mt-3">
    <div class="mt-4">
      <div class="row" style="margin-left: 0px">
        <div class="col-md-8">
          <h5 class="color-main font-weight-bold" style="font-size: 16px">
            HỒ SƠ CỦA BẠN
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
            <loadingData v-if="loading"></loadingData>
            <img
              v-if="hasData"
              :src="account.avatar"
              alt=""
              style="width: 130px; height: 130px; border-radius: 50%"
            />
          </div>
        </div>
        <div class="col-md-9 margin-top-5">
          <loadingData v-if="loading"></loadingData>
          <div v-if="hasData" class="bg p-3">
            <h6 class="font-weight-bold color-main" style="font-size: 120%">THÔNG TIN CỦA BẠN</h6>
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
            <div class="row mt-3">
              <div
                class="col-md-3 col-sm-3 col-12 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Ngày sinh:
              </div>
              <div class="col-md-4 col-sm-4 col-6">
                <div class="bg3" style="font-weight: 700; cursor: pointer">
                  {{ formatDate(account.birthday) }}
                </div>
              </div>
            </div>
            <div class="row mt-3">
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
            <div class="row mt-3">
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
            <div class="row mt-3">
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
            <!-- <div class="row mt-3">
              <div
                class="col-md-3 col-sm-3 col-12 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Ghi chú:
              </div>
              <div class="col-md-9 col-sm-9 col-12">
                <textarea
                  name=""
                  id=""
                  style="width: 100%"
                  rows="6"
                  placeholder="Nhập thông tin cần lưu ý ở đây"
                  v-model="options.note"
                >
                </textarea>
              </div>
            </div> -->
            <div class="mt-4 text-center pb-3">
              <span
                class="borderx mr-3 hover color-main"
                data-toggle="modal"
                data-target="#changePass"
                >Đổi mật khẩu</span
              >
              <router-link to="/cap-nhat-thong-tin">
                <span class="borderx mr-3 hover color-main"
                  >Cập nhật thông tin</span
                ></router-link
              >
              <!-- đổi mật khẩu -->
              <div
                class="modal fade"
                id="changePass"
                tabindex="-1"
                role="dialog"
                aria-labelledby="changePass"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <b
                        class="modal-title color-main"
                        id="exampleModalLongTitle"
                      >
                        Đổi mật khẩu
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
                    <form @submit.prevent="changePass">
                      <div class="modal-body">
                        <table class="table table-borderless">
                          <tbody>
                            <tr>
                              <td class="text-right" style="width: 40%">
                                Nhập mật khẩu cũ
                              </td>
                              <td class="text-left">
                                <input
                                  style="width: 100%; border: 1px solid #d4476f"
                                  type="password"
                                  id="matKhauCu"
                                  placeholder="Nhập mật khẩu cũ..."
                                  v-model="pass.current_password"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td class="text-right" style="width: 40%">
                                Nhập mật khẩu mới
                              </td>
                              <td class="text-left">
                                <input
                                  style="width: 100%; border: 1px solid #d4476f"
                                  type="password"
                                  placeholder="Nhập mật khẩu mới..."
                                  v-model="pass.password"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td class="text-right" style="width: 40%">
                                Nhập lại mật khẩu mới
                              </td>
                              <td class="text-left">
                                <input
                                  style="width: 100%; border: 1px solid #d4476f"
                                  type="password"
                                  placeholder="Nhập lại mật khẩu mới.."
                                  v-model="pass.password_confirmation"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Huỷ
                        </button>
                        <button type="submit" class="btn btn-primary">
                          Lưu
                        </button>
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
  </div>
</template>
<script>
import { HTTP } from "@/main";
import loadingData from "@/components/loadingData";
import { formatDate } from "@/main";
export default {
  name: "hoSoCuaBan",
  components: {
    loadingData,
  },
  data() {
    return {
      loading: true,
      hasData: false,
      posts: [],
      account: [],
      options: [],
      errors: [],
      pass: {},
    };
  },
  created() {
    HTTP.get(`/salon/main/profile`)
      .then((response) => {
        // console.log(response.data);
        let result = response.data;
        // console.log(result);
        if (result.status === 1) {
          this.hasData = true;
          this.loading = false;
          // this.posts = response.data.data.data;
          this.posts = result.data;
          // console.log(this.posts);
          this.account = this.posts.account;
          this.options = this.posts.options;
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  methods: {
    // Đổi mật khẩu
    changePass() {
      HTTP.post(`/salon/main/profile/updatePassword`, this.pass).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          // this.content = "";
          this.$swal("", result.message, "success");
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // ==================
    formatDate,
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
.modal-body table td {
  vertical-align: middle;
}
.borderx:hover {
  color: white;
  background-color: #d4476f;
}

.color-main {
  color: #d4476f;
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
</style>
