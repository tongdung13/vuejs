<template>
  <div class="sticky">
    <div class="row m-0 p-0 pt-1 pb-1">
      <div
        class="col-md-3 col-sm-5 col-5 m-0"
        style="display: flex; align-items: center; padding-left: 20px"
      >
        <img src="../../assets/image/logomain.png" alt="" style="width: 35px" />
        <span style="font-size: 100%" class="font-weight-bold ml-2">
          Quản Lý Salon
        </span>
      </div>
      <div class="col-md-9 col-sm-7 col-7">
        <div class="row" style="float: right; margin-right: 20px">
          <div data-toggle="modal" data-target="#myModal3">
            <span style="position: relative">
              <img
                src="../../assets/image/Icon.png"
                alt=""
                style="width: 18px; margin-top: 9px; cursor: pointer"
                class="mr-4"
              />
              <span v-if="total <= 99" class="quantity-notify">
                {{ total }}
              </span>
              <span v-else class="quantity-notify">99+</span>
            </span>
          </div>
          <div id="demo1" class="collapse">
            <notify />
          </div>
          <span class="dropdown">
            <span
              class="row dropdown-toggle"
              data-toggle="dropdown"
              style="position: relative"
            >
              <span class="mr-2 ml-2" style="line-height: 17px">
                <span class="color-main">
                  <span style="font-size: 100%">{{ currentUser.name }}</span>
                  <!-- <span style="font-size: 100%">{{ user.name }}</span> -->
                  <br />
                  <span
                    style="font-size: 75% !important; color: black !important"
                  >
                    {{ currentUser.followers }} lượt theo dõi
                  </span>
                </span>
              </span>
              <span style="margin-right: 5px">
                <img
                  :src="currentUser.avatar"
                  :alt="currentUser.name"
                  class="mr-1"
                  style="width: 35px; height: 35px; border-radius: 50%"
                />
                <!-- <img
                  :src="user.avatar"
                  :alt="user.name"
                  class="mr-1"
                  style="width: 35px; border-radius: 50%"
                /> -->
              </span>
            </span>
            <div class="dropdown-menu p-0">
              <router-link
                :to="{
                  name: 'hoSoCuaBan',
                }"
                class="hover color-main"
              >
                <span style="font-size: 80%">Thông tin cá nhân</span>
              </router-link>
              <router-link
                :to="{
                  name: 'phanCapQuyen',
                }"
                class="hover color-main"
              >
                <span style="font-size: 80%">Phân cấp quyền</span>
              </router-link>
              <a class="hover color-main" href="javascript:" @click="doLogout">
                <span style="font-size: 80%">Đăng xuất</span>
              </a>
            </div>
          </span>
          <div class="modal fade" id="myModal3" role="dialog">
            <div class="modal-dialog" style="position: fixed; right: 0px;">
              <div class="modal-content">
                <div class="modal-body">
                  <notify />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/main";
import notify from "./notify";
export default {
  components: {
    notify,
  },
  name: "navbar",
  data() {
    return {
      currentUser: {},
      total: 0,
    };
  },
  created() {
    HTTP.get(`/salon/main/manage/notification/all`).then((res) => {
      let result = res.data;
      if (result.status === 1) {
        this.total = res.data.data.total_not_seen;
      }
    });
  },
  beforeMount() {
    this.getCurrentUser();
  },
  methods: {
    getCurrentUser() {
      const account = localStorage.getItem("userInfo");
      this.currentUser = JSON.parse(account);
      // console.log(this.currentUser);
    },
    doLogout() {
      this.$store.dispatch("doLogout").then(() => {
        window.location.href = "/auth";
      });
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: left;
}
.modal-content {
  border: none;
  background: none;
}
li span {
  display: block;
  color: #d4476f;
  text-align: center;
  padding: 0 1em;
  text-decoration: none;
  cursor: pointer;
}
.quantity-notify {
  position: absolute;
  top: -1px;
  left: 10px;
  font-size: 10px;
  background: var;
  background: #d4476f;
  border-radius: 50%;
  padding: 3px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}
.dropbtn {
  color: white;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: -15px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 10000;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 10000;
  background: rgba(255, 255, 255, 0.95);
}
.dropdown-toggle::after {
  position: absolute;
  right: -10px;
  top: 44%;
}
.dropdown-menu a {
  display: block;
  text-align: right;
  padding: 5px 15px;
}
.dropdown-menu {
  top: 3px !important;
  left: -7px !important;
}
</style>
