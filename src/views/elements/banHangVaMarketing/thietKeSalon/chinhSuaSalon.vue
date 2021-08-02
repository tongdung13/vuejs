<template>
  <div class="col-md-10 res mb-5 mt-3">
    <h5 class="mt-3 font-weight-bold color-main">CẬP NHẬT SALON</h5>
    <!-- Thông tin salon -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <form @submit.prevent="updateSalon">
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
                <!-- <td style="width: 15%">
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
                </td> -->
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
                    v-model="posts.salon_name"
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
                    v-model="posts.salon_address"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Hotline:</div>
                </td>
                <td>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="0386632727"
                    class="w-100"
                    required
                    v-model="posts.salon_hotline"
                  />
                </td>
                <td>
                  <div class="table-input">Email:</div>
                </td>
                <td>
                  <input
                    type="email"
                    class="w-100"
                    placeholder="Nhập email..."
                    required
                    v-model="posts.salon_email"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3 text-center pb-3">
          <router-link
            :to="{ name: 'chiTietThietKeSalon', params: { salonId: posts.id } }"
          >
            <span class="borderx mr-2 color-main">Quay lại</span>
          </router-link>
          <button type="submit" class="borderx color-main">
            Lưu và hiển thị
          </button>
        </div>
      </form>
    </div>
    <!-- ========================== -->
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "chinhSuaSalon",
  data() {
    return {
      Salon: {
        salon_name: "",
        salon_hotline: "",
        salon_email: "",
        salon_address: "",
        salon_image: "",
        salon_cover_image: "",
      },
      errors: [],
      posts: [],
      posts1: [],
      url: "",
      file: "",
    };
  },
  created() {
    let brandID = window.location.href.slice(
      window.location.href.indexOf("/sua-salon/") + 11,
      window.location.href.length
    );
    HTTP.get(`/salon/main/manage/branch/${brandID}/detail`)

      .then((response) => {
        this.posts = response.data.data;
        this.url = this.posts.salon_cover_image;
        // console.log(this.posts);
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  methods: {
    updateSalon() {
      let updateID = window.location.href.slice(
        window.location.href.indexOf("/sua-salon/") + 11,
        window.location.href.length
      );
      let formData = new FormData();
      formData.append("salon_name", this.posts.salon_name);
      formData.append("salon_hotline", this.posts.salon_hotline);
      formData.append("salon_email", this.posts.salon_email);
      formData.append("salon_address", this.posts.salon_address);
      formData.append("salon_cover_image", this.file);
      HTTP.post(`/salon/main/manage/branch/${updateID}/update`, formData).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            // this.content = "";
            this.$swal("", result.message, "success");
          } else {
            this.$swal("", result.message, "error");
          }
        }
      );
    },

    removeImage() {
      this.url = "";
    },
    onFileChange(e) {
      this.file = e.target.files[0];
      this.url = URL.createObjectURL(this.file);
    },
    backHistory() {
      setTimeout(function () {
        history.back();
      }, 1000);
    },
    onFileChange(e) {
      this.file = e.target.files[0];
      this.url = URL.createObjectURL(this.file);
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
</style>
