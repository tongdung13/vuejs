<template>
  <div class="container mt-5 ip5">
    <div class="row width-30 width-sm-80" style="margin: 0 auto">
      <div class="col-12 box-form pt-4 pb-4 padding-sm-15">
        <h4 class="text-center mb-3 color-main">ĐĂNG KÝ</h4>
        <h5 class="text-center mb-3 color-main mt-2">THÔNG TIN SALON CHÍNH</h5>
        <form class="mt-5 ip5" @submit.prevent="register">
          <div class="row">
            <div class="col-md-7">
              <input
                type="text"
                class="mt-2"
                name="name"
                placeholder="Tên salon"
                v-model="data.salon_name"
                required
              />
              <input
                type="text"
                class="mt-2"
                name="phone"
                placeholder="Hotline salon"
                v-model="data.salon_hotline"
                required
              />
              <input
                type="text"
                class="mt-2"
                name="email"
                placeholder="Email"
                v-model="data.salon_email"
                required
              />
              <input
                type="text"
                class="mt-2"
                name="address"
                placeholder="Địa chỉ"
                v-model="data.salon_address"
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
          <p class="mt-3">
            Chúng tôi sẽ gửi thông tin đăng nhập qua số điện thoại cá nhân của
            chủ shop, bạn có thể truy cập và dùng thử
          </p>
          <div class="mt-3 text-center">
            <router-link :to="{ name: 'register' }">
              <button class="mt-2 mr-3 res-button">
                <span>Quay lại</span>
              </button>
            </router-link>
            <span
              class="mt-2 ml-3 res-button"
              data-toggle="modal"
              data-target="#confirm-otp-register"
            >
              <span>Tiếp theo</span>
            </span>

            <!-- Modal confirm-otp -->
            <div
              class="modal fade"
              id="confirm-otp-register"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-body color-main">
                    Chúng tôi sẽ gửi mã xác nhận OTP vào số điện thoại
                    {{ data.owner_phone }}
                  </div>
                  <div class="row">
                    <div class="col-6 text-center pr-0" data-dismiss="modal">
                      <div class="bg-otp-left p-2" style="cursor: pointer">
                        <span style="color: white">Từ chối</span>
                      </div>
                    </div>
                    <div class="col-6 text-center pl-0" data-dismiss="modal">
                      <!-- <router-link :to="{ name: 'otp' }"> -->
                      <div>
                        <button
                          class="bg-otp-right p-2 w-100 text-white"
                          @click="onClick()"
                        >
                          <span class="mt-2 res-button"> Đồng ý</span>
                        </button>
                      </div>
                      <!-- </router-link> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- =========== -->
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/main";
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
        token: "",
        verification_code: "",
      },
      message: "",
      success: 0,
      click: 0,
    };
  },
  beforeMount() {
    this.getInfo();
  },
  methods: {
    onClick() {
      HTTP.post(`/salon/auth/register`, this.data).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.$swal("", result.message, "success");
          this.data.token = result.data.token;
          sessionStorage.setItem("infoRegis", JSON.stringify(this.data));
          sessionStorage.setItem("otp", result.data.code); // test thử lấy otp nhập, sau xoá
          this.$router.push("otp");
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    getInfo() {
      var infoRegis = JSON.parse(sessionStorage.getItem("infoRegis"));
      this.data.owner_name = infoRegis.owner_name;
      this.data.owner_phone = infoRegis.owner_phone;
      this.data.owner_address = infoRegis.owner_address;
      this.data.owner_email = infoRegis.owner_email;
    },
    register() {},
  },
};
</script>
<style scoped>
a {
  color: white;
}
.modal-content {
  border-radius: 16px;
}
.modal-dialog {
  top: 30%;
}
.bg-otp-right {
  background: #d4476f;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  border-radius: 0px 0px 16px 0px;
}
.bg-otp-left {
  background: #d4476f;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  border-radius: 0px 0px 0px 16px;
}
</style>
