<template>
  <div class="col-md-10 mb-5 res mt-3">
    <div class="mt-4">
      <div class="row" style="margin-left: 0px">
        <div class="col-md-8 col-sm-5 col-5">
          <h5 class="color-main font-weight-bold" style="font-size: 16px">
            THÊM KHÁCH HÀNG
          </h5>
        </div>
      </div>
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
            <h4 style="font-size: 120%">THÔNG TIN KHÁCH HÀNG</h4>
            <div class="row">
              <div
                class="col-md-3 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Họ và tên / Ngày sinh:
              </div>
              <div class="col-md-5">
                <input
                  type="text"
                  placeholder="họ và tên"
                  style="width: 100%"
                  v-model="customer.name"
                />
              </div>
              <div class="col-md-4">
                <input
                  type="date"
                  name="bday"
                  min="1940-01-02"
                  style="width: 100%; padding: 9px !important;"
                  v-model="customer.birthday"
                />
              </div>
            </div>
            <div class="row mt-3">
              <div
                class="col-md-3 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Email / SĐT:
              </div>
              <div class="col-md-5">
                <input
                  type="email"
                  placeholder="Email"
                  style="width: 100%"
                  v-model="customer.email"
                />
              </div>
              <div class="col-md-4">
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  style="width: 100%"
                  v-model="customer.phone"
                />
              </div>
            </div>
            <div class="row mt-3">
              <div
                class="col-md-3 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Mật khẩu / Xác nhận:
              </div>
              <div class="col-md-5">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  style="width: 100%"
                  v-model="customer.password"
                />
              </div>
              <div class="col-md-4">
                <input
                  type="password"
                  placeholder="Xác nhận mạt khẩu"
                  style="width: 100%"
                  v-model="customer.password_confirmation"
                />
              </div>
            </div>
            <div class="row mt-3">
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
                  v-model="customer.address"
                />
              </div>
            </div>
            <div class="row mt-3">
              <div
                class="col-md-3 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Loại KH / Giới tính:
              </div>
              <div class="col-md-5">
                <select class="bg4 p-2" style="width: 100%; outline: none" v-model="customer.type">
                  <option value="">--Chọn loại khách hàng--</option>

                  <option value="1">Khách hàng thường</option>
                  <option value="2">Khách hàng tần suất</option>
                  <option value="3">Khách hàng doanh số</option>
                  <option value="4">Khách hàng vip</option>
                </select>
              </div>
              <div class="col-md-4">
                <select class="bg4 p-2" style="width: 100%; outline: none" v-model="customer.sex">
                  <option value="">--Chọn giới tính--</option>

                  <option value="1">Nam</option>
                  <option value="2">Nữ</option>
                </select>
              </div>
              <!-- <div class="col-md">
                <input type="text" placeholder="Chức vụ" style="width: 100%" />
              </div> -->
            </div>
            <div class="row mt-3">
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
                  rows="4"
                  placeholder="Nhập thông tin cần lưu ý ở đây"
                  style="width: 100%"
                ></textarea>
              </div>
            </div>
            <div class="mt-5 text-center pb-3">
              <span class="borderx mr-2 color-main" @click="backPage">
                Quay lại
              </span>
              <span class="borderx color-main" @click="addCustomer">Lưu và hiển thị</span>
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
                <input type="file" id="cvNhanVien" hidden />
                <label for="cvNhanVien">
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
                </label>
              </div>
              <div
                class="bg3 text-center mt-2"
                style="position: relative; color: #bdbdbd; cursor: pointer"
              >
                Hợp đồng
                <input type="file" id="hopDong" hidden />
                <label for="hopDong">
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
                </label>
              </div>
              <div
                class="bg3 text-center mt-2"
                style="position: relative; color: #bdbdbd; cursor: pointer"
              >
                Chứng chỉ liên quan
                <input type="file" id="chungChi" hidden />
                <label for="chungChi">
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
                </label>
              </div>
              <div
                class="bg3 text-center mt-2 color-main font-weight-bold"
                style="position: relative; cursor: pointer"
              >
                THÊM TÀI LIỆU
              </div>
            </div>
          </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "themKhachHang",
  data() {
    return {
      url: "",
      customer: {
        name: "",
        phone: "",
        email: "",
        address: "",
        birthday: "",
        sex: "",
        type:"",
        password: "",
        password_confirmation: "",
        avatar: "",
      },
    };
  },
  methods: {
    addCustomer() {
      if (this.url == "") {
        this.$swal("", "Vui lòng thêm hình ảnh!", "warning");
      } else {
        let formData = new FormData();
        formData.append("name", this.customer.name);
        formData.append("phone", this.customer.phone);
        formData.append("email", this.customer.email);
        formData.append("sex", this.customer.sex);
        formData.append("type", this.customer.type);
        formData.append("birthday", this.customer.birthday);
        formData.append("password", this.customer.password);
        formData.append(
          "password_confirmation",
          this.customer.password_confirmation
        );
        formData.append("address", this.customer.address);
        formData.append("avatar", this.customer.avatar);
        HTTP.post(`/salon/main/manage/managerCustomer/store`, formData).then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.$swal("", result.message, "success");
            setTimeout(function() {
              history.back();
            }, 1000);
          } else {
            this.$swal("", result.message, "error");
          }
        });
      }
    },
    onFileChange(e) {
      this.customer.avatar = e.target.files[0];
      this.url = URL.createObjectURL(this.customer.avatar);
    },
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
.bg3,
.bg4 {
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

.borderx:hover {
  color: white;
  background-color: #d4476f;
}
.color-main {
  color: #d4476f;
}
.bg3:hover {
  background: #d4476f;
  color: white;
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
.bg1:hover {
  background: #d4476f;
  color: white;
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
@media only screen and (max-width: 768px) {
  .borderx {
    padding: 5px 15px;
  }
}
</style>
