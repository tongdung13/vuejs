<template>
  <div class="container mt-5 ip5">
    <div class="row width-30 width-sm-80" style="margin: 0 auto">
      <div class="col-12 box-form pt-4 pb-4 padding-sm-15">
        <h4 class="text-center mb-3 color-main">QUẢN LÝ SALON</h4>
        <h5 class="text-center mb-3 color-main mt-2">ĐĂNG NHẬP</h5>
        <form
          class="mt-5 ip5"
          action="#"
          method="post"
          @submit.prevent="doLogin"
        >
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            v-model="formData.phone"
            autocomplete="username"
          />
          <!-- <input
            class="mt-3"
            type="password"
            name="password"
            placeholder="Mật khẩu"
            v-model="formData.password"
          /> -->
          <div style="position: relative">
            <input
              placeholder="Mật khẩu"
              :type="show ? 'text' : 'password'"
              v-model="formData.password"
              autocomplete="current-password"
            />
            <div style="position: absolute; right: 8px; top: 5px">
              <span @click="show = !show" style="cursor: pointer">
                <i v-if="show" class="fa fa-eye"></i>
                <i v-else class="fa fa-eye-slash"></i>
              </span>
            </div>
          </div>
          <!-- <small class="errorMessage" v-if="password.error"
            >Password field is required.</small
          > -->
          <p class="text-center mt-4" style="text-decoration: underline">
            <router-link
              :to="{
                name: 'forgotPassword',
              }"
              style="color: #d4476f"
            >
              Quên mật khẩu?
            </router-link>
          </p>
          <div class="mt-2">
            <router-link
              :to="{
                name: 'register',
              }"
            >
              <div class="button1">Đăng ký</div>
            </router-link>
            <button
              type="submit"
              class="button1"
              style="
                background-color: #d4476f;
                color: white;
                margin-top: 15px;
                cursor: pointer;
              "
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import jQuery from "jquery";

export default {
  name: "login",
  data() {
    return {
      show: false,
      formData: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    doLogin() {
      let err = "";
      let phone = this.formData.phone;
      let password = this.formData.password;
      let re_phone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      let re_password = /^\S+$/;
      if (phone === "") {
        err = "Vui lòng nhập số điện thoại";
      } else if (!re_phone.test(phone)) {
        err = "Số điện thoại không đúng định dạng";
      } else if (password === "") {
        err = "Vui lòng nhập mật khẩu";
      } else if (!re_password.test(password)) {
        err = "Mật khẩu không chứa dấu khoảng trắng";
      } else if (password.length < 3 || password.length > 30) {
        err = "Mật khẩu nằm trong khoảng từ 3-12 kí tự";
      }
      if (err === "") {
        jQuery("button").attr("disabled", true);
        this.$store.dispatch("doLogin", { phone, password }).then((res) => {
          let result = res.data;
          if (result.status === 1) {
            window.location.href = "/";
          } else {
            this.$swal("", result.message, "error");
            jQuery("button").attr("disabled", false);
          }
        });
      } else {
        this.$swal("", err, "error");
      }
    },
  },
};
</script>
<style scoped>
input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}
</style>
