<template>
  <div class="container mt-5 ip5">
    <div class="row width-30 width-sm-80" style="margin: 0 auto">
      <div class="col-12 box-form pt-4 pb-4 padding-sm-15">
        <h4 class="text-center mb-3 color-main">NHẬP MÃ OTP</h4>
        <!-- <h6 class="text-center mb-3 text-danger mt-2">
          Mã OTP sai, vui lòng nhập lại hoặc yêu cầu gửi lại
        </h6> -->
        <form class="mt-5 ip5" @submit.prevent="checkOtp">
          <div class="otp row mt-4" style="width: 80%; margin: 0 auto">
            <div class="col-md-2 col-4">
              <div class="form-group">
                <input
                  type="text"
                  class="text-center otp"
                  @keyup="onKeyUp(1)"
                  ref="otp1"
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
                  @keyup="onKeyUp(2)"
                  ref="otp2"
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
                  @keyup="onKeyUp(3)"
                  ref="otp3"
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
                  @keyup="onKeyUp(4)"
                  ref="otp4"
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
                  @keyup="onKeyUp(5)"
                  ref="otp5"
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
                  @keyup="onKeyUp(6)"
                  ref="otp6"
                  v-model="otp.st6"
                  required
                  maxlength="1"
                />
              </div>
            </div>
          </div>
          <div class="text-center">
            <h6 class="text-dark">
              <p v-if="countDown > 0">
                {{ "Mã sẽ gửi lại sau: " + countDown + " giây" }}
              </p>

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
            <!-- <router-link :to="{ name: 'register-success' }"> -->

            <button type="submit" class="mt-2 ml-3 res-button">
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
      countDown: 2,
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
      number: "",
    };
  },
  created() {
    this.countDownTimer();
  },
  beforeMount() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      var infoRegis = JSON.parse(sessionStorage.getItem("infoRegis"));
      this.data.owner_name = infoRegis.owner_name;
      this.data.owner_phone = infoRegis.owner_phone;
      this.data.owner_address = infoRegis.owner_address;
      this.data.owner_email = infoRegis.owner_email;
      this.data.salon_name = infoRegis.salon_name;
      this.data.salon_hotline = infoRegis.salon_hotline;
      this.data.salon_email = infoRegis.salon_email;
      this.data.salon_address = infoRegis.salon_address;
      this.data.token = infoRegis.token;
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.message = "Đã gửi!!";
      }
    },
    again() {
      this.countDown = 10;
      this.countDownTimer();
      HTTP.post(`/salon/auth/register`, this.data).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.$swal("Vui lòng kiểm tra điện thoại", result.message, "success");
          this.data.token = result.data.token;
          sessionStorage.setItem("infoRegis", JSON.stringify(this.data));
          sessionStorage.setItem("otp", result.data.code); // test thử lấy otp nhập, sau xoá
          this.$router.push("otp");
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    onKeyUp(index) {
      if (index == 1) {
        this.$refs.otp2.focus();
      } else if (index == 2) {
        this.$refs.otp3.focus();
      } else if (index == 3) {
        this.$refs.otp4.focus();
      } else if (index == 4) {
        this.$refs.otp5.focus();
      } else if (index == 5) {
        this.$refs.otp6.focus();
      }
    },
    checkOtp() {
      this.data.verification_code =
        this.otp.st1 +
        this.otp.st2 +
        this.otp.st3 +
        this.otp.st4 +
        this.otp.st5 +
        this.otp.st6;

      console.log(this.data);
      HTTP.post(`/salon/auth/registerConfirm`, this.data).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.$swal("", result.message, "success");
          this.$router.push("dang-nhap");
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
  },
};
</script>
