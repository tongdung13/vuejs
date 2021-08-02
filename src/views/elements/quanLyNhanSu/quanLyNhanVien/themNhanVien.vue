<template>
  <div class="col-md-10 res mb-5 mt-3">
    <div class="mt-4">
      <h5 class="color-main font-weight-bold" style="font-size: 16px">
        THÊM NHÂN VIÊN
      </h5>
        <div class="row mt-3" style="margin-left: 0px">
          <div class="col-md-3">
            <div
              class="bg"
              id="preview"
              style="
              cursor: pointer;
              justify-content: center;
              align-items: center;
              display: flex;
              height: 200px;
            "
            >
              <img
                v-if="url"
                :src="url"
                alt=""
                style="width: 180px; height: 180px; border-radius: 50%"
              />
            </div>
            <div>
              <input type="file" id="upload" hidden @change="onFileChange" />
              <label
                class="bg1 mt-3 text-center p-2 color-main w-100"
                style="cursor: pointer"
                for="upload"
              >
                Thêm ảnh
              </label>
            </div>
          </div>
          <div class="col-md-9 margin-top-5">
            <div class="bg p-3">
              <h6>THÔNG TIN NHÂN VIÊN</h6>
              <div class="row">
                <div
                  class="col-md-3 font-weight-bold"
                  style="margin-top: 10px; text-align: right"
                >
                  Họ và tên:
                </div>
                <div class="col-md-9">
                  <input
                    type="text"
                    placeholder="họ và tên"
                    style="width: 100%"
                    v-model="employee.name"
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div
                  class="col-md-3 font-weight-bold"
                  style="margin-top: 10px; text-align: right"
                >
                  Ngày sinh:
                </div>
                <div class="col-md-4">
                  <input
                    type="date"
                    name="bday"
                    min="1940-01-02"
                    style="width: 100%"
                    v-model="employee.birthday"
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div
                  class="col-md-3 font-weight-bold"
                  style="margin-top: 10px; text-align: right"
                >
                  Mật khẩu / Xác nhận mk:
                </div>
                <div class="col-md-4">
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    style="width: 100%"
                    v-model="employee.password"
                    autocomplete="password"
                  />
                </div>
                <div class="col-md-5">
                  <input
                    type="password"
                    placeholder="Xác nhận"
                    style="width: 100%"
                    v-model="employee.password_confirmation"
                    autocomplete="cofirmPass"
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div
                  class="col-md-3 font-weight-bold"
                  style="margin-top: 10px; text-align: right"
                >
                  Số điện thoại / email:
                </div>
                <div class="col-md-4">
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    style="width: 100%"
                    v-model="employee.phone"
                  />
                </div>
                <div class="col-md-5">
                  <input
                    type="email"
                    placeholder="Email"
                    style="width: 100%"
                    v-model="employee.email"
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div
                  class="col-md-3 font-weight-bold"
                  style="margin-top: 10px; text-align: right"
                >
                  Địa chỉ liên hệ:
                </div>
                <div class="col-md-9">
                  <input
                    type="text"
                    placeholder="Địa chỉ"
                    style="width: 100%"
                    v-model="employee.address"
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div
                  class="col-md-3 font-weight-bold"
                  style="margin-top: 10px; text-align: right"
                >
                  Công việc/ Chức vụ:
                </div>
                <div class="col-md">
                  <select
                    name="salon_id"
                    class="mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="employee.role"
                  >
                    <option
                      v-for="(value, name) in listRole"
                      :key="name"
                      :value="name"
                    >
                      {{ value }}
                    </option>
                  </select>
                </div>
                <div class="col-md">
                  <select
                    name="salon_id"
                    class="mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="employee.position"
                  >
                    <option
                      v-for="(value, name) in listPosition"
                      :key="name"
                      :value="name"
                    >
                      {{ value }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row mt-2">
                <div
                  class="col-md-3 font-weight-bold"
                  style="margin-top: 10px; text-align: right"
                >
                  Mức lương / Chi nhánh:
                </div>
                <div class="col-md">
                  <input
                    type="text"
                    placeholder="Mức lương"
                    style="width: 100%"
                    v-model="employee.salary"
                  />
                </div>
                <div class="col-md">
                  <select
                    name="salon_id"
                    class="mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="employee.salon_id"
                  >
                    <option value="">--Chọn salon--</option>

                    <option
                      v-for="salon in listStore"
                      :key="salon.id"
                      :value="salon.id"
                    >
                      {{ salon.salon_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row mt-2">
                <div
                  class="col-md-3 font-weight-bold"
                  style="margin-top: 10px; text-align: right"
                >
                  Ghi chú:
                </div>
                <div class="col-md-9">
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    placeholder="Nhập thông tin cần lưu ý ở đây"
                    style="width: 100%"
                    v-model="employee.note"
                  ></textarea>
                </div>
              </div>
              <div class="mt-3 text-center pb-3">
                <router-link :to="{ name: 'quanLyNhanVien' }">
                  <span class="borderx mr-2 color-main">Quay lại</span>
                </router-link>
                <button
                  type="submit"
                  @click="submitFile()"
                  class="borderx color-main"
                >
                  Lưu và hiển thị
                </button>
              </div>
            </div>
          </div>
          <!-- <div class="col-md-3 margin-top-5">
          <div class="bg p-3">
            <h6 class="text-center">TÀI LIỆU LIÊN QUAN</h6>
            <div
              class="bg3 text-center"
              style="position: relative; color: #bdbdbd; cursor: pointer"
            >
              CV nhân viên
              <img
                src="../../../../assets/image/Vector111.png"
                alt=""
                style="
                  width: 24px;
                  margin-left: 20px;
                  position: absolute;
                  top: 8px;
                  right: 10px;
                "
              />
            </div>
            <div
              class="bg3 text-center mt-2"
              style="position: relative; color: #bdbdbd; cursor: pointer"
            >
              Hợp đồng
              <img
                src="../../../../assets/image/Vector111.png"
                alt=""
                style="
                  width: 24px;
                  margin-left: 20px;
                  position: absolute;
                  top: 8px;
                  right: 10px;
                "
              />
            </div>
            <div
              class="bg3 text-center mt-2"
              style="position: relative; color: #bdbdbd; cursor: pointer"
            >
              Chứng chỉ liên quan
              <img
                src="../../../../assets/image/Vector111.png"
                alt=""
                style="
                  width: 24px;
                  margin-left: 20px;
                  position: absolute;
                  top: 8px;
                  right: 10px;
                "
              />
            </div>
            <div
              class="bg3 text-center mt-2 color-main font-weight-bold"
              style="position: relative; cursor: pointer"
            >
              THÊM TÀI LIỆU
            </div>
          </div>
        </div>-->
        </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "themNhanVien",
  data() {
    return {
      listStore: {},
      listPosition: {},
      listRole: {},
      employee: {
        name: " ",
        phone: "",
        password: "",
        password_confirmation: "",
        email: "",
        address: "",
        birthday: "",
        position: "",
        role: "",
        salary: "",
        note: "",
        salon_id: "",
        avatar: "",
      },
      errors: [],
      url: "",
    };
  },
  created() {
    // Danh sách salon
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
    // =============================

    // Danh sách chức vụ nhân viên
    HTTP.get("/salon/main/manage/employee/position").then((res) => {
      let result = res.data;
      if (result.status === 1) {
        this.listPosition = result.data;
      } else {
        this.notification.status = true;
        this.notification.message = result.message;
      }
    });
    // ==========================

    // Danh sách quyền nhân viên
    HTTP.get("/salon/main/manage/employee/role").then((res) => {
      let result = res.data;
      if (result.status === 1) {
        this.listRole = result.data;
      } else {
        this.notification.status = true;
        this.notification.message = result.message;
      }
    });
    // ===========================
  },
  methods: {
    submitFile() {
      let formData = new FormData();
      formData.append("name", this.employee.name);
      formData.append("phone", this.employee.phone);
      formData.append("password", this.employee.password);
      formData.append(
        "password_confirmation",
        this.employee.password_confirmation
      );
      formData.append("email", this.employee.email);
      formData.append("address", this.employee.address);
      formData.append("birthday", this.employee.birthday);
      formData.append("position", this.employee.position);
      formData.append("note", this.employee.note);
      formData.append("role", this.employee.role);
      formData.append("salary", this.employee.salary);
      formData.append("salon_id", this.employee.salon_id);
      formData.append("avatar", this.employee.avatar);
      HTTP.post(`salon/main/manage/employee/store`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          let result = res.data;
          if (result.status === 1) {
            // this.content = "";
            setTimeout(() => {
              history.back();
            }, 1000);
            this.$swal("", result.message, "success");
          } else {
            this.$swal("", result.message, "error");
          }
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },
    onFileChange(e) {
      this.employee.avatar = e.target.files[0];
      this.url = URL.createObjectURL(this.employee.avatar);
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

select {
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
  padding: 10px 15px;
  outline: none;
  border: none !important;
  padding: 10px !important;
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
input[type="date"] {
  padding: 9px !important;
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
