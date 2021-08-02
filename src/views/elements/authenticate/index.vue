<template>
  <div
    class="background"
    v-bind:style="{ backgroundImage: 'url(' + image + ')' }"
  >
    <div class="menu row">
      <div
        class="col-md-4 col-sm-12 col-12"
        style="margin-top: 15px; padding-left: 20px"
      >
        <h3>
          <a href="/" style="font-weight: 600; color: white">QUẢN LÝ SALON</a>
        </h3>
      </div>
      <div class="col-md-8 col-sm-12 col-12">
        <ul>
          <li class="menu-top">
            <router-link :to="{ name: 'support' }"> Hỗ trợ </router-link>
          </li>
          <li class="menu-top">
            <router-link
              :to="{
                name: 'register',
              }"
            >
              Đăng ký
            </router-link>
          </li>
          <li class="menu-top">
            <router-link
              :to="{
                name: 'login',
              }"
            >
              Đăng nhập
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { HTTP } from "@/main";
export default {
  name: "index",
  data() {
    return {
      image: {},
    };
  },
  created() {
    HTTP.get(`/common/image`).then((res) => {
      this.image = res.data.data.web.image;
      // console.log(this.image);
    });
  },
};
</script>

<style>
body {
  background-image: url(../../../assets/image/bgw.png);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  /* height: 100%; */
  overflow-x: hidden;
}

.card {
  border: none !important;
}

.icon {
  position: absolute;
  right: -10px;
  top: 58%;
}

.text {
  font-size: 16px;
  line-height: 22px;
  color: #4f4f4f;
}

a:hover {
  text-decoration: none;
}

.color-main {
  color: #d4476f;
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

li span {
  display: block;
  color: #d4476f;
  text-align: center;
  padding: 0 1em;
  text-decoration: none;
  cursor: pointer;
}
.menu ul li {
  list-style: none;
  color: white;
  display: inline-block;
  margin-top: 15px;
  margin-right: 20px;
}

.menu ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.menu-top {
  float: right;
  border: 2px solid #d4476f;
  padding: 2px 20px;
  border-radius: 30px;
}

.input,
input {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
  /* border-radius: 8px; */
  padding: 3px 10px;
  outline: none;
}

::placeholder {
  color: #d4476f;
}

.card-body span {
  font-size: 12px;
  cursor: pointer;
}

.input {
  border: 1px solid #d4476f !important;
  box-sizing: border-box;
  border-radius: 8px;
  outline: none;
  padding: 5px 10px;
}

table th,
td {
  font-size: 12px;
}

.active {
  background-color: rgba(212, 71, 111, 0.1);
  border-bottom: 2px solid #d4476f;
}

.active1 {
  background-color: rgba(212, 71, 111, 0.1);
  border-right: 2px solid #d4476f;
  border-top-left-radius: 16px;
  padding: 0.6rem;
}

.active1 span {
  color: #d4476f;
}

.card-body h6:hover {
  background-color: rgba(212, 71, 111, 0.1);
}

.card-body {
  padding: 0 !important;
}

h6 {
  margin-bottom: 0;
}

.chat {
  width: 125px;
  height: 48px;
  border-radius: 8px;
  background-color: #d4476f;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  line-height: 48px;
  text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  position: fixed;
  bottom: 0;
  right: 0;
  cursor: pointer;
}

.border-main {
  border: 1px solid #d4476f;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.56);
}

#myDIV {
  background-color: rgba(255, 255, 255, 0.4);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.background,
body {
  /* background-image: url(../../../assets/image/bg.png); */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.menu ul li {
  list-style: none;
  color: white;
  display: inline-block;
  margin-top: 15px;
  margin-right: 50px;
}

.menu ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.menu-top {
  border: 2px solid #d4476f;
  /* padding: 0.4em 1.9em; */
  border-radius: 30px;
}

.box-form {
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.9);
}

.button1 {
  border: 1px solid #d4476f;
  outline: none;
  height: 40px;
  color: #d4476f;
  font-size: 18px;
  border-radius: 20px;
  width: 100%;
  line-height: 40px;
  text-align: center;
}

input[type="text"],
input[type="submit"],
input[type="password"] {
  border: none;
  border-bottom: 1px solid #d4476f;
  background: transparent;
  outline: none;
  height: 40px;
  color: #d4476f;
  width: 100%;
}

a:hover {
  text-decoration: none;
}

.form input {
  margin-top: 15px;
}

input[type="submit"] {
  border: 1px solid #d4476f;
  outline: none;
  height: 40px;
  color: #d4476f;
  font-size: 18px;
  border-radius: 20px;
  outline: none;
}

.box-form input[type="submit"] {
  border-radius: 32px;
  /* width: 170px; */
  /* font-weight: bold; */
  color: white;
  height: 35px;
  background-color: #d4476f;
  margin-left: 50%;
  transform: translate(-50%, 0%);
  border: none;
  outline: none;
}

.design {
  border: 2px solid #d4476f;
  padding: 10px 80px 10px 80px;
  background-color: #d4476f;
  color: white;
  border-radius: 30px;
  text-align: center;
  opacity: 0.4;
  left: 35%;
  width: 30%;
  display: block;
  margin: 0 auto;
  position: absolute;
  bottom: 2%;
}

.otp input {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #d4476f;
  background: none;
}

.confirm {
  border: 2px solid #d4476f;
  background-color: #d4476f;
  color: white;
  border-radius: 30px;
  margin-top: 60px;
  text-align: center;
  left: 35%;
  width: 30%;
  /* position: absolute; */
  display: block;
  margin: 0 auto;
  margin-top: 30px;
  padding-bottom: 30px;
}

.color-main {
  color: #d4476f;
}

::placeholder {
  color: #d4476f;
}

.w-60 {
  width: 60%;
}

.res-button {
  padding: 5px 20px;
  border: 1px solid #d4476f;
  border-radius: 32px;
  cursor: pointer;
}
.res-button:hover {
  background: #d4476f;
  color: white;
}
@media screen and (max-width: 321px) {
  .menu-top {
    padding: 0.2em 0.5em;
    font-size: 14px;
  }

  .ip5 {
    margin-top: 20px !important;
    margin-bottom: 20px;
  }

  .design {
    padding: 2px;
  }

  .text-ip5 {
    font-size: 12px !important;
  }
}

@media screen and (max-width: 768px) {
  .design {
    width: 80% !important;
    left: 10%;
    position: inherit;
    margin-top: 15px;
  }

  .width-sm-80 {
    width: 80% !important;
  }

  .padding-sm-15 {
    padding: 15px;
  }

  .menu-top {
    padding: 0.2em 0.8em;
  }
  .menu ul li {
    margin-right: 20px;
  }
  .margin-bottom-10 {
    margin-bottom: 10px;
  }
}

@media screen and (min-width: 1023px) {
  .width-30 {
    width: 60%;
  }
}
</style>
