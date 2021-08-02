<template>
  <div class="col-md-10 res mb-5 mt-3">
    <div class="mt-4">
      <div class="row" style="margin-left: 0px">
        <div class="col-md-8">
          <h5 class="color-main font-weight-bold" style="font-size: 16px">
            CẬP NHẬT THÔNG TIN NHÂN VIÊN
          </h5>
        </div>
      </div>
      <div class="row mt-3" style="margin: 0 auto">
        <div class="col-md-3">
          <div
            class="bg"
            id="preview"
            style="
                cursor: pointer;
                justify-content: center;
                align-items: center;
                display: flex;
                height: 159px;
              "
          >
            <img
              v-if="url"
              :src="url"
              alt=""
              style="width: 130px; height: 130px; border-radius: 50%"
            />
          </div>
          <div>
            <input type="file" id="upload" hidden @change="onFileChange" />
            <label
              class="bg1 mt-3 text-center p-2 color-main w-100"
              style="cursor: pointer"
              for="upload"
              >Thay đổi ảnh</label
            >
          </div>
        </div>
        <div class="col-md-9 margin-top-5">
          <div class="bg p-3">
            <h6>THÔNG TIN NHÂN VIÊN</h6>
            <div class="row">
              <div
                class="col-md-3 col-sm-3 col-12 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Họ và tên:
              </div>
              <div class="col-md-9 col-sm-9 col-12">
                <input
                  type="text"
                  style="width: 100%"
                  v-model="detailEmployee.account.name"
                />
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
                <input
                  type="date"
                  style="width: 100%; padding: 10px 15px !important"
                  v-model="detailEmployee.account.birthday"
                />
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
                <input
                  type="text"
                  style="width: 100%"
                  v-model="detailEmployee.account.phone"
                />
              </div>
              <div class="col-md-5 col-sm-5 col-12 margin-top-5">
                <input
                  type="text"
                  style="width: 100%"
                  v-model="detailEmployee.account.email"
                />
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
                <input
                  type="text"
                  style="width: 100%"
                  v-model="detailEmployee.account.address"
                />
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
              <div class="col-md col-sm col-12 margin-top-5">
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
                class="col-md-3 col-sm-3 col-12 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Mức lương:
              </div>
              <div class="col-md col-sm col-12">
                <input
                  type="text"
                  style="width: 100%"
                  v-model="detailEmployee.option.salary"
                />
              </div>
              <div class="col-md col-sm col-12 margin-top-5">
                <select
                  name="salon_id"
                  class="mr-3 res-margin-0"
                  style="width: 100%; outline: none"
                  v-model="employee.salon_id"
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
                  v-model="detailEmployee.option.note"
                >
                </textarea>
              </div>
            </div>

            <!-- ======= -->
            <div class="mt-4 text-center pb-3">
              <router-link
                :to="{
                  name: 'thongTinNhanVien',
                  params: { nhanVienId: nhanVienId },
                }"
              >
                <span class="borderx hover mr-3 color-main">Quay lại</span>
              </router-link>
              <button
                type="submit"
                @click="submitFile()"
                class="borderx hover mr-3 color-main"
              >
                Lưu
              </button>
            </div>
            <!-- ============ -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "capNhatThongTinNhanVien",
  data() {
    return {
      listStore: {},
      listPosition: {},
      listRole: {},
      nhanVienId: "",
      detailEmployee: { account: {}, option: {} },
      employee: {
        position: "",
        role: "",
        salon_id: "",
      },
      url: "",
      avatar: "",
    };
  },
  created() {
    this.nhanVienId = this.$route.params.capNhatId;

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
  beforeMount() {
    this.detailEmployees();
  },
  methods: {
    onFileChange(e) {
      this.avatar = e.target.files[0];
      this.url = URL.createObjectURL(this.avatar);
    },
    // Chi tiết nhân viên
    detailEmployees() {
      HTTP.get(`/salon/main/manage/employee/${this.nhanVienId}/detail`).then(
        (res) => {
          let result = res.data;
          this.detail = result.data;
          this.detailEmployee.account = this.detail.account;
          this.detailEmployee.option = this.detail.options;
          this.employee.role = this.detail.options.role_id;
          this.employee.position = this.detail.options.position_id;
          this.url = this.detail.account.avatar;
        }
      );
    },
    // ==================
    submitFile() {
      let formData = new FormData();
      formData.append("name", this.detailEmployee.account.name);
      formData.append("phone", this.detailEmployee.account.phone);
      formData.append("email", this.detailEmployee.account.email);
      formData.append("address", this.detailEmployee.account.address);
      formData.append("birthday", this.detailEmployee.account.birthday);
      formData.append("position", this.employee.position);
      formData.append("role", this.employee.role);
      formData.append("salary", this.detailEmployee.option.salary);
      formData.append("note", this.detailEmployee.option.note);
      formData.append("salon_id", this.employee.salon_id);
      formData.append("avatar", this.avatar);
      HTTP.post(
        `/salon/main/manage/employee/${this.nhanVienId}/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.$swal("", result.message, "success");
            setTimeout(() => {
              history.back();
            }, 1000);
          } else {
            this.$swal("", result.message, "error");
          }
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
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
.borderx {
  border: 1px solid #d4476f;
  padding: 5px 25px;
  border-radius: 4px;
  cursor: pointer;
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
select {
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
  padding: 10px 15px;
  outline: none;
  border: none !important;
  padding: 10px !important;
}
</style>
