<template>
  <div class="col-md-10 res mb-5 mt-3">
    <h5 class="mt-3 font-weight-bold color-main">THÊM SALON</h5>
    <!-- Thông tin salon -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <h6>THÔNG TIN SALON</h6>
      <div class="mt-3 pb-2">
        <table class="table table-borderless">
          <tbody class="text-right">
            <tr>
              <td style="width: 15%">
                <div class="table-input">Ảnh bìa:</div>
              </td>
              <td style="width: 35%">
                <div v-if="url == ''" class="text-center">
                  <input
                    type="file"
                    id="upload"
                    hidden
                    @change="onFileChange"
                  />
                  <label
                    class="bg1 mt-3 text-center p-2 pl-4 pr-4 color-main"
                    style="cursor: pointer"
                    for="upload"
                    >Thêm ảnh</label
                  >
                </div>
                <div
                  v-else
                  class="bg"
                  id="preview"
                  style="
                    cursor: pointer;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    position: relative;
                  "
                >
                  <img :src="url" alt="" style="width: 200px" />
                  <img
                    src="../../../../assets/image/xx.png"
                    alt=""
                    style="position: absolute; right: 46px; top: -5px"
                    @click="removeImage()"
                  />
                </div>
              </td>
              <td style="width: 15%">
                <div class="table-input">Ảnh đại diện:</div>
              </td>
              <td style="width: 35%">
                <div v-if="url1 == ''" class="text-center">
                  <input
                    type="file"
                    id="upload1"
                    hidden
                    @change="onFileChange1"
                  />
                  <label
                    class="bg1 mt-3 text-center p-2 pl-4 pr-4 color-main"
                    style="cursor: pointer"
                    for="upload1"
                    >Thêm ảnh</label
                  >
                </div>
                <div
                  v-else
                  class="bg"
                  id="preview"
                  style="
                    cursor: pointer;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    position: relative;
                  "
                >
                  <img :src="url1" alt="" style="width: 200px" />
                  <img
                    src="../../../../assets/image/xx.png"
                    alt=""
                    style="position: absolute; right: 46px; top: -5px"
                    @click="removeImage1()"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%">
                <div class="table-input">Tên salon:</div>
              </td>
              <td colspan="3" style="width: 85%">
                <input
                  type="text"
                  placeholder="Tên Salon "
                  class="w-100"
                  required
                  v-model="salon.salon_name"
                />
              </td>
            </tr>
            <tr>
              <td style="width: 15%">
                <div class="table-input">Địa chỉ:</div>
              </td>
              <td colspan="3" style="width: 85%">
                <input
                  type="text"
                  placeholder="Địa chỉ "
                  class="w-100"
                  required
                  v-model="salon.salon_address"
                />
              </td>
            </tr>
            <tr>
              <td style="width: 15%">
                <div class="table-input">Hotline:</div>
              </td>
              <td style="width: 35%">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="0386632727"
                  class="w-100"
                  required
                  v-model="salon.salon_hotline"
                />
              </td>
              <td style="width: 15%">
                <div class="table-input">Email:</div>
              </td>
              <td style="width: 35%">
                <input
                  type="email"
                  class="w-100"
                  placeholder="Nhập email..."
                  required
                  v-model="salon.salon_email"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-3 text-center pb-3">
        <router-link :to="{ name: 'danhSachThietKeSalon' }">
          <span class="borderx mr-2 color-main">Quay lại</span>
        </router-link>
        <button type="submit" @click="addSalon" class="borderx color-main">
          Lưu và hiển thị
        </button>
      </div>
    </div>
    <!-- ========================== -->
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "themSalon",
  data() {
    return {
      salon: {},
      errors: [],
      url: "",
      url1: "",
    };
  },
  methods: {
    addSalon() {
      if (this.url == "" || this.url1 == "") {
        this.$swal("", "Vui lòng thêm hình ảnh!", "warning");
      } else {
        let formData = new FormData();
        formData.append("salon_name", this.salon.salon_name);
        formData.append("salon_hotline", this.salon.salon_hotline);
        formData.append("salon_email", this.salon.salon_email);
        formData.append("salon_address", this.salon.salon_address);
        formData.append("salon_image", this.file1);
        formData.append("salon_cover_image", this.file);
        HTTP.post(`/salon/main/manage/branch/store`, formData).then((res) => {
          let result = res.data;
          if (result.status === 1) {
            // this.content = "";
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
    removeImage() {
      this.url = "";
    },
    onFileChange(e) {
      this.file = e.target.files[0];
      this.url = URL.createObjectURL(this.file);
    },
    removeImage1() {
      this.url1 = "";
    },
    onFileChange1(e) {
      this.file1 = e.target.files[0];
      this.url1 = URL.createObjectURL(this.file1);
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
.bg1 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 47px;
}
</style>
