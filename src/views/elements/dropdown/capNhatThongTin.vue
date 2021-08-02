<template>
  <div class="col-md-10 mb-5 mt-3">
    <div class="mt-4">
      <div class="row" style="margin-left: 0px">
        <div class="col-md-8">
          <h5 class="color-main font-weight-bold" style="font-size: 16px">
            CẬP NHẬT THÔNG TIN
          </h5>
        </div>
      </div>

      <form @submit.prevent="changeProfile">
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
              <h6>CẬP NHẬT THÔNG TIN</h6>
              <div class="row">
                <div
                  class="col-md-3 col-sm-3 col-12 font-weight-bold"
                  style="margin-top: 10px; text-align: right"
                >
                  Họ và tên:
                </div>
                <div class="col-md-9 col-sm-9 col-12">
                  <div style="font-weight: 700; cursor: pointer">
                    <input
                      type="text"
                      style="width: 100%"
                      v-model="account.name"
                    />
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
                  <div style="update font-weight: 700; cursor: pointer">
                    <input
                      type="date"
                      style="width: 100%; padding: 10px 15px !important"
                      v-model="account.birthday"
                    />
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div
                  class="col-md-3 col-sm-3 col-12 font-weight-bold"
                  style="margin-top: 10px; text-align: right"
                >
                  Email:
                </div>
                <div class="col-md-5 col-sm-5 col-12 margin-top-5">
                  <div style="font-weight: 700; cursor: pointer">
                    <input
                      type="email"
                      style="width: 100%"
                      v-model="account.email"
                      required
                    />
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
                  <div style="font-weight: 700; cursor: pointer">
                    <input
                      type="text"
                      style="width: 100%"
                      v-model="account.address"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-4 text-center pb-3">
                <router-link :to="{ name: 'hoSoCuaBan' }">
                  <span class="borderx mr-3 color-main">
                    Quay lại
                  </span></router-link
                >
                <button
                  type="submit"
                  @click="submitFile()"
                  class="borderx color-main"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "capNhatThongTin",
  data() {
    return {
      posts: [],
      account: [],
      options: [],
      errors: [],
      url: "",
      file: "",
      isChangeAvatar: "",
      avatar: "",
    };
  },
  created() {
    HTTP.get(`/salon/main/profile`)
      .then((response) => {
        // this.posts = response.data.data.data;
        this.posts = response.data.data;
        this.account = this.posts.account;
        this.options = this.posts.options;
        this.url = this.account.avatar;
        // console.log(this.account);
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  methods: {
    changeProfile() {
      HTTP.post(`/salon/main/profile/update`, this.account).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          // this.content = "";
          let info = localStorage.getItem("userInfo");
          let objInfo = JSON.parse(info);
          objInfo.name = this.account.name;
          objInfo.avatar = this.url;
          localStorage.setItem("userInfo", JSON.stringify(objInfo));
          this.$swal("", result.message, "success");
          setTimeout(() => {
            history.back();
          }, 1000);
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    onFileChange(e) {
      this.avatar = e.target.files[0];
      this.url = URL.createObjectURL(this.avatar);
    },

    // Cập nhật ảnh đại diện
    submitFile() {
      let formData = new FormData();
      formData.append("avatar", this.avatar);
      HTTP.post(`/salon/main/profile/updateAvatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function() {})
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
.bg1 label {
  margin: 0;
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

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>
