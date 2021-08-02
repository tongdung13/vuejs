<template>
  <div class="container mt-5 ip5">
    <div class="row width-30 width-sm-80" style="margin: 0 auto">
      <div class="col-12 box-form pt-4 pb-4 padding-sm-15">
        <h4 class="text-center mb-3 color-main">QUẢN LÝ SALON</h4>
        <h6 class="text-center mb-3 color-main mt-2 font-weight-bold">
          TẠO MẬT KHẨU MỚI
        </h6>
        <form class="mt-5 ip5"  @submit.prevent="updatePass">
          <input
            type="password"
            name="password"
            placeholder="Nhập mật khẩu mới"
            required
            v-model="data.password"
          />
          <input
            class="mt-3"
            type="password"
            name="password"
            placeholder="Nhập lại mật khẩu mới"
            required
            v-model="data.password_confirmation"
          />

          <div class="mt-5">
            <!-- <router-link :to="{ name: 'login' }"> -->
              <button
                class="button1"
                style="
                  background-color: #d4476f;
                  color: white;
                  margin-top: 15px;
                  cursor: pointer;
                "
              >
                Vào đăng nhập
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
       password: "",
       password_confirmation: "",
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
      this.data.verification_code = sessionStorage.getItem("otp");
     
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.message = "Đã gửi! Vui lòng nhập lại mã OTP.";
        // console.log(this.message);
      }
    },
 
    updatePass() {
    
     console.log(this.data);
      HTTP.post(`/salon/auth/updatePassword`, this.data).then((res) => {
        
        let result = res.data;
        if (result.status === 1) {
          this.$swal("", result.message, "success");
          sessionStorage.removeItem('otp');
          sessionStorage.removeItem('phone');
          sessionStorage.removeItem('token');
          this.$router.push("dang-nhap");
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

