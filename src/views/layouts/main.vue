<template>
  <div id="wrapper">
    <navbar />
    <div class="row m-0">
      <sidebar />
      <router-view></router-view>
    </div>
    <!-- <div class="chat" data-toggle="modal" data-target="#myChat">
      <img src="../../assets/image/chat.png" alt="" />
    </div> -->
    <div class="modal fade" id="myChat" role="dialog">
      <chatBox />
    </div>
    <ScrollTopArrow></ScrollTopArrow>
  </div>
</template>

<script>
import navbar from "./navbar.vue";
import sidebar from "./sidebar.vue";
import chatBox from "../../components/chatBox.vue";
import ScrollTopArrow from "../../components/ScrollTopArrow";

export default {
  name: "pageMain",
  components: {
    navbar,
    sidebar,
    chatBox,
    ScrollTopArrow,
  },
};
</script>

<style>
* {
  font-family: Nunito;
}
.page-item.active .page-link {
  color: #fff;
  background-color: #d4476f;
  border-color: #d4476f;
}
.page-link {
  color: #d4476f;
}
.page-link:hover {
  color: #d4476f;
}
#wrapper {
  background-image: url("../../assets/image/q-011.png");
  background-color: black;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.router-link-active,
.router-link-exact-active {
  background: rgba(212, 71, 111, 0.2);
}

.color-main {
  color: #d4476f;
}

a:hover {
  text-decoration: none;
}

textarea {
  border: 1px solid #d4476f;
  border-radius: 8px;
  outline: none;
  padding: 0.5rem;
}

.chat {
  z-index: 10;
  /* width: 90px; */
  border-radius: 50%;
  background-color: #d4476f;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  line-height: 35px;
  text-align: center;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
  position: fixed;
  bottom: 60px;
  right: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.inputx {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 5px 10px;
  outline: none;
  font-size: 14px;
}

.input,
input {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 5px 10px;
  outline: none;
}

input[type="date"] {
  padding: 3px ;
}
input[type="checkbox"]:after {
  width: 15px;
  height: 15px;
  /* border-radius: 15px; */
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  border: 2px solid white;
}

input[type="checkbox"]:checked:after {
  width: 15px;
  height: 15px;
  /* border-radius: 15px; */
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #d4476f;
  content: "";
  display: inline-block;
  /* visibility: visible; */
  border: 2px solid white;
}
input:checked ~ .checkmark {
  background-color: #d4476f;
}
.hover {
  cursor: pointer;
}
.hover:hover {
  background-color: #d4476f !important;
  color: white;
}
select {
  padding: 4px !important;
}

.bg-8 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.bg-16 {
  background: #ffffff;
  /* shape */

  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}
.cursor {
  cursor: pointer;
}
img {
  object-fit: cover;
}

.right-inner-addon {
  position: relative;
}
.right-inner-addon input {
  padding-right: 42px !important;
}
.right-inner-addon span {
  position: absolute;
  right: 0px;
  padding: 7px 12px;
  pointer-events: none;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
@font-face {
  font-family: "Nunito";
  src: url(../css/font/Nunito-Regular.ttf);
}
@media only screen and (max-width: 768px) {
  * {
    font-size: 10px !important;
  }
  .size_2 {
    font-size: 10px !important;
  }
  .res-0 {
    padding: 0 !important;
  }

  .hidden {
    display: none;
  }

  .width-50 {
    width: 50% !important;
  }
  .width-100 {
    width: 100% !important;
  }

  .margin-top-5 {
    margin-top: 5px;
  }

  .margin-right-5 {
    margin-right: 5px;
  }

  .width-28 {
    width: 28%;
  }

  .float-left-0 {
    float: left !important;
  }
  .inputx {
    padding: 2px 5px;
  }
  select {
    padding: 1px !important;
  }
  .borderx {
    padding: 3px 5px !important;
  }
  .padding-5 {
    padding: 5px !important;
  }
}

@media only screen and (max-width: 925px) {
  .bg5 {
    overflow: scroll;
  }
  .res {
    padding: 1rem !important;
  }
}
</style>
