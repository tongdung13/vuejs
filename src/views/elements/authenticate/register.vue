<template>
  <div class="container mt-5 ip5">
    <div class="row width-30 width-sm-80" style="margin: 0 auto">
      <div class="col-12 box-form pt-4 pb-4 padding-sm-15">
        <h4 class="text-center mb-3 color-main">ĐĂNG KÝ</h4>
        <h5 class="text-center mb-3 color-main mt-2">THÔNG TIN CHỦ SALON</h5>
        <form
          class="mt-5 ip5"
          action="#"
          method="post"
          @submit.prevent="register"
        >
          <div class="row">
            <div class="col-md-7">
              <input
                type="text"
                class="mt-2"
                name="name"
                placeholder="Họ và tên"
                v-model="data.owner_name"
                required
              />
              <input
                type="text"
                class="mt-2"
                name="phone"
                placeholder="Số điện thoại"
                v-model="data.owner_phone"
                required
              />
              <input
                type="text"
                class="mt-2"
                name="email"
                placeholder="Email"
                v-model="data.owner_email"
                required
              />
              <input
                type="text"
                class="mt-2"
                name="address"
                placeholder="Địa chỉ"
                v-model="data.owner_address"
                required
              />
            </div>
            <div
              class="col-md-5 mt-2"
              style="
                align-items: center;
                justify-content: center;
                display: flex;
              "
            >
              <img
                src="../../../assets/image/Group.png"
                alt=""
                style="width: 160px"
              />
            </div>
          </div>
          <div class="mt-3 text-center">
            <!-- <router-link :to="{ name: 'register-2' }"> -->
            <button type="submit" class="mt-2 res-button">
              <span>Tiếp theo</span>
            </button>
            <!-- </router-link> -->
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import { HTTP } from "@/main";
// import jQuery from "jquery";
export default {
  name: "register",
  data() {
    return {
      title: "Form Register",
      data: {
        owner_name: "",
        owner_phone: "",
        owner_address: "",
        owner_email: "",
        salon_name: "",
        salon_hotline: "",
        salon_email: "",
        salon_address: "",
      },
      info: {},
      message: "",
      success: 0,
    };
  },
  created() {
    if ((sessionStorage.getItem("infoRegis"))) {
      this.data = JSON.parse(sessionStorage.getItem("infoRegis"));
    }
  },
  methods: {
    register() {
      sessionStorage.setItem("infoRegis", JSON.stringify(this.data));
      this.$router.push("dang-ky-2");
    },
  },
};
</script>
