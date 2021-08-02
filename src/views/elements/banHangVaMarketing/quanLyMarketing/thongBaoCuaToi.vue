<template>
  <div class="col-md-10 mb-5 res mt-3 font-14">
    <select
      name="cars"
      class="inputx mr-3"
      id="cars"
      style="width: 30%; outline: none"
    >
      <option value="volvo">Tất cả salon</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
    <!-- <router-link
      :to="{
        name: 'themChuongTrinh',
      }"
    >
      <span class="inputx color-main mr-3">+ Thêm chương trình</span>
    </router-link> -->
    <span class="inputx color-main">Xuất báo cáo</span>
    <div class="color-main mt-3">
      <h6>THÔNG BÁO CỦA TÔI</h6>
    </div>
    <div class="row mt-3">
      <div class="col-md-9">
        <div
          class="bg p-3 mt-2"
          style="border-radius: 16px"
          v-for="(item, index) in listNotification"
          :key="index"
        >
          <div class="row">
            <div class="col-md-10">
              <ul>
                <li>
                  <img
                    src="../../../../assets/image/ava.png"
                    alt=""
                    style="width: 40px"
                  />
                </li>
                <li>
                  <span class="font-weight-bold">
                    {{ item.name }}
                    <img
                      src="../../../../assets/image/dot.png"
                      alt=""
                      class="pl-2 pr-2"
                    />
                    {{ item.role }}

                    <img
                      src="../../../../assets/image/dot.png"
                      alt=""
                      class="pl-2 pr-2"
                    />
                  </span>
                </li>
                <li>
                  <span class="color-main">
                    {{ getHumanDate(item.created_at) }}
                  </span>
                </li>
              </ul>
            </div>
            <div class="col-md-2">
              <span class="dropdown" style="float: right; margin-top: -5px">
                <span class="dropbtn">
                  <img
                    src="../../../../assets/image/more-horizontal.png"
                    alt=""
                    style="width: 28px"
                    class="border1 p-1"
                  />
                </span>
                <div class="dropdown-content">
                  <div
                    class="text-right"
                    data-toggle="modal"
                    data-target="#suaBaiDang"
                    @click="detailPost(item.id)"
                  >
                    <span>Chỉnh sửa </span>
                  </div>
                  <router-view></router-view>
                </div>
              </span>
            </div>
            <!-- Chỉnh sửa hoá chất -->
            <div
              class="modal fade"
              id="suaBaiDang"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" style="top: 20%" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Chỉnh sửa bài viết
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div>
                      Tiêu đề:
                      <input type="text" class="w-100" v-model="detailOnePost.title">
                    </div>
                    <div class="mt-3">
                      Mô tả:
                      <textarea style="width: 100%" v-model="detailOnePost.content"></textarea>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Huỷ
                    </button>
                    <button @click="editPosts" class="btn btn-primary">
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- ================= -->
          </div>
          <p class="mt-2">
            <span class="font-weight-bold"
              > {{item.title}}</span
            ><br />
          </p>

          <p>
            {{ item.content }}
          </p>
        </div>
      </div>
      <div class="col-md-3 margin-top-5">
        <div class="bg p-3 mt-2" style="border-radius: 16px">
          <div class="row">
            <div class="col-md-12 col-sm-6 col-6">
              <h6 class="color-main">Đơn hàng</h6>
              <ul>
                <li>
                  <input type="checkbox" v-model="selectAll" @click="select" />
                </li>

                <li>
                  <b>Chọn tất cả</b>
                </li>
              </ul>
              <ul v-for="(i, index) in items" :key="index">
                <li>
                  <input type="checkbox" :value="i.id" v-model="selected" />
                </li>
                <li>
                  <img
                    src="../../../../assets/image/ava.png"
                    alt=""
                    style="width: 30px"
                  />
                </li>
                <li>
                  <b>{{ i.name }}</b>
                </li>
              </ul>
              <hr />
            </div>
            <div class="col-md-12 col-sm-6 col-6">
              <h6 class="color-main">Lịch hẹn</h6>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    v-model="selectAll1"
                    @click="select1"
                  />
                </li>

                <li>
                  <b>Chọn tất cả</b>
                </li>
              </ul>
              <ul v-for="(i, index) in items" :key="index">
                <li>
                  <input type="checkbox" :value="i.id" v-model="selected1" />
                </li>
                <li>
                  <img
                    src="../../../../assets/image/ava.png"
                    alt=""
                    style="width: 30px"
                  />
                </li>
                <li>
                  <b>{{ i.name }}</b>
                </li>
              </ul>
              <hr />
            </div>
          </div>
          <!-- ==== -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatDate } from "@/main";
import moment from "moment";
import vi from "moment/locale/vi";
moment.updateLocale("vi", vi);
export default {
  name: "thongBaoCuaToi",
  data() {
    return {
      notification: {
        message: "",
      },
      items: ["1", "2"],
      listNotification: {},
      detailOnePost: {},
      selected: "",
      selected1: "",
      selectAll: "",
      selectAll1: "",
      id_post: "",
    };
  },
  beforeMount() {
    this.listNotifications();
  },
  methods: {
    getHumanDate: function(date) {
      return moment(date).fromNow();
    },
    listNotifications() {
      HTTP.get("/salon/main/manage/marketing/4").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data.data;
          // console.log(data);
          if (data.length > 0) {
            this.listNotification = data;
            console.log(this.listNotification);
          }
        } else {
          this.notification.message = result.message;
        }
      });
    },
    // Chi tiết 1 bài
    detailPost(value) {
      this.id_post = value;
      HTTP.get(`/salon/main/manage/marketing/4/${value}`).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;
          console.log(data);
          if (data.length > 0) {
            this.detailOnePost = data[0];
          }
        } else {
          this.notification.message = result.message;
        }
      });
    },
    // =================
    // Sửa bài viết
    editPosts() {
      HTTP.put(
        `/salon/main/manage/marketing/4/${this.id_post}/update`,
        this.detailOnePost
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {         
          this.$swal("", result.message, "success");
          this.listNotifications();
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // ============
  },
};
</script>
<style scoped>
ul {
  padding: 0;
}

ul li {
  display: inline;
}

.border-32 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 32px;
}

.border-32:hover,
.border-32 span:hover {
  background: #d4476f;
  color: white;
}

p {
  font-size: 14px;
}

.border-main {
  border: 1px solid #d4476f;
  box-sizing: border-box;
  border-radius: 4px;
}

span {
  font-size: 14px;
}

.bg {
  background: rgba(255, 255, 255, 0.4);
}

.icon {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 25px;
  margin-top: 6px;
}
.bg ul li {
  margin-right: 10px;
}
label {
  display: inline-block;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  color: black;
  border-radius: 0.3rem;
  cursor: pointer;
  padding: 28px;
}
.dropbtn {
  color: white;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: -15px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content div {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content div:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
