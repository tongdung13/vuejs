<template>
  <div class="container mt-5 ip5">
    <div class="row width-30 width-sm-80" style="margin: 0 auto">
      <div class="col-12 box-form pt-4 pb-4 padding-sm-15">
        <h4 class="text-center mb-3 color-main">NHẬP MÃ OTP</h4>
        <h6 class="text-center mb-3 text-danger mt-2">
          {{message}}
        </h6>
        <form class="mt-5 ip5" @submit.prevent="checkOtp">
          <div class="otp row mt-4" style="width: 80%; margin: 0 auto">
            <div class="col-md-2 col-4">
              <div class="form-group">
                <input
                  type="text"
                  class="text-center otp"
                  @keyup="onKeyUp"
                  v-model="otp.st1"
                  required
                  maxlength="1"
                />
              </div>
            </div>
            <div class="col-md-2 col-4">
              <div class="form-group">
                <input
                  type="text"
                  class="text-center otp"
                  @keyup="onKeyUp"
                  v-model="otp.st2"
                  required
                  maxlength="1"
                />
              </div>
            </div>
            <div class="col-md-2 col-4">
              <div class="form-group">
                <input
                  type="text"
                  class="text-center otp"
                  @keyup="onKeyUp"
                  v-model="otp.st3"
                  required
                  maxlength="1"
                />
              </div>
            </div>
            <div class="col-md-2 col-4">
              <div class="form-group">
                <input
                  type="text"
                  class="text-center otp"
                  @keyup="onKeyUp"
                  v-model="otp.st4"
                  required
                  maxlength="1"
                />
              </div>
            </div>
            <div class="col-md-2 col-4">
              <div class="form-group">
                <input
                  type="text"
                  class="text-center otp"
                  @keyup="onKeyUp"
                  v-model="otp.st5"
                  required
                  maxlength="1"
                />
              </div>
            </div>
            <div class="col-md-2 col-4">
              <div class="form-group">
                <input
                  type="text"
                  class="text-center otp"
                  @keyup="onKeyUp"
                  v-model="otp.st6"
                  required
                  maxlength="1"
                />
              </div>
            </div>
          </div>
          <div class="text-center">
            <h6 class="text-dark">
              <p v-if="countDown > 0">{{ "Mã sẽ gửi lại sau " + countDown }}</p>

              <div v-else>
                <p>
                  Nếu bạn chưa nhận được mã OTP thì:
                  <a href="#" class="" @click="again()">Gửi lại</a>
                </p>
              </div>
            </h6>
            <span id="countdown" class="text-dark"></span>
          </div>
          <div class="mt-3 text-center">
            <!-- <router-link :to="{ name: 'newPassword' }"> -->
              <button class="mt-2 ml-3 res-button">
                <span>Xác nhận</span>
              </button>
            <!-- </router-link> -->
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";

export default {
  name: "otp",
  data() {
    return {
      countDown: 10,
      message: "",
      otp: {
        st1: "",
        st2: "",
        st3: "",
        st4: "",
        st5: "",
        st6: "",
      },
      data: {
       phone: "",
       token :"",
       verification_code: "",
      },
      number: "",
    };
  },
  beforeMount() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.data.phone = sessionStorage.getItem("phone");
      this.data.token =  sessionStorage.getItem("token");
     
     
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        
        // console.log(this.message);
      }
    },
    again() {
      this.countDown = 10;
      this.countDownTimer();
       console.log(this.data.phone);
       HTTP.post(`/salon/auth/checkPhone`, this.data).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.message = "Đã gửi! Vui lòng nhập lại mã OTP.";
          this.$swal("", result.message, "success");
          this.data.token = result.data.token;
          sessionStorage.setItem("token", result.data.token); 
          sessionStorage.setItem("getOTP", result.data.code); // test thử lấy otp nhập, sau xoá
          // this.$router.push("otp-forgot-password");
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    checkOtp() {
      this.data.verification_code =
        this.otp.st1 +
        this.otp.st2 +
        this.otp.st3 +
        this.otp.st4 +
        this.otp.st5 +
        this.otp.st6;

     console.log(this.data.verification_code);
      HTTP.post(`/salon/auth/checkOPT`, this.data).then((res) => {
        
        let result = res.data;
        if (result.status === 1) {
          sessionStorage.setItem("otp", this.data.verification_code);
          this.$swal("", result.message, "success");
          this.$router.push("new-password");
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
  
  },
  created() {
    this.countDownTimer();
  },
};
</script>
