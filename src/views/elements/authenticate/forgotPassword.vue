<template>
  <div class="container mt-5 ip5">
    <div class="row width-30 width-sm-80" style="margin: 0 auto">
      <div class="col-12 box-form pt-4 pb-4 padding-sm-15">
        <h4 class="text-center mb-3 color-main">QUẢN LÝ SALON</h4>
        <h6 class="text-center mb-3 color-main mt-2 font-weight-bold">
          QUÊN MẬT KHẨU?
        </h6>
        <form class="mt-5 ip5"  @submit.prevent="checkPhone">
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            required
            v-model="data.phone"
          />
          <p
            class="text-center mt-4 color-main"
            style="text-decoration: underline"
          >
            Chúng tôi sẽ gửi mật khẩu mới vào số điện thoại của bạn
          </p>
          <div class="mt-5">
            <!-- <router-link :to="{ name: 'otpForgot' }"> -->
            <button
              type="button"
              data-toggle="modal"
              data-target="#confirm-otp"
              class="button1"
              style="
                background-color: #d4476f;
                color: white;
                margin-top: 15px;
                cursor: pointer;
              "
            >
              Xác nhận
            </button>
            <!-- </router-link> -->

            <!-- Modal confirm-otp -->
            <div
              class="modal fade"
              id="confirm-otp"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-body color-main">
                    Chúng tôi sẽ gửi mã xác nhận OTP vào số điện thoại
                    {{data.phone}}
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
        phone: "",
      },
      message: "",
      success: 0,
    };
  },
  
  methods: {
    onClick() {
      HTTP.post(`/salon/auth/checkPhone`, this.data).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.$swal("", result.message, "success");
          this.data.token = result.data.token;
           sessionStorage.setItem("phone", this.data.phone); 
          sessionStorage.setItem("token", result.data.token); 
          sessionStorage.setItem("getOTP", result.data.code); // test thử lấy otp nhập, sau xoá
          this.$router.push("otp-forgot-password");
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    checkPhone() {},
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
