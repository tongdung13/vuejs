<template>
  <div class="col-md-10 res mb-5 mt-3">
    <select
      name="cars"
      class="inputx mr-3"
      id="cars"
      style="width: 30%; outline: none"
    >
      <option value="">tất cả salon</option>
      <option value="">1</option>
    </select>
    <router-link :to="{ name: 'themLichTrinhDaoTao' }">
      <span class="inputx color-main mr-3">+ Thêm lịch trình</span>
    </router-link>
    <span class="inputx color-main">Xuất báo cáo</span>
    <div class="row mt-3">
      <div class="col-md-9 col-sm-12 col-12">
        <div class="bg p-3" style="border-radius: 16px">
          <div class="row">
            <div>
              <img
                :src="user.avatar"
                alt=""
                style="width: 50px; border-radius: 50%"
              />
            </div>
            <div class="ml-2">
              <span class="font-weight-bold">
                {{ user.name }}
              </span>
              <br />
              <ul>
                <li>
                  <span class="font-weight-bold">
                    {{ user.role }}
                    <img
                      src="../../../../assets/image/dot.png"
                      alt=""
                      class="pl-2 pr-2"
                    />
                  </span>
                </li>
                <li>
                  <span class="color-main">
                    {{ getHumanDate(detailSchedule.created_at) }}
                  </span>
                </li>
              </ul>
            </div>
            <div class="col" style="text-align: right">
              <span class="dropdown" style="float: right; margin-top: -5px">
                <span class="dropbtn">
                  <img
                    src="../../../../assets/image/more-horizontal.png"
                    alt=""
                    style="width: 28px"
                    class=" p-1"
                  />
                </span>
                <div class="dropdown-content">
                  <router-link
                    :to="{
                      name: 'suaLichTrinh',
                      params: { lichTrinhId: detailSchedule.id },
                    }"
                  >
                    <span>Chỉnh sửa</span>
                  </router-link>
                  <a @click="deleteSchedule()" style="cursor: pointer">
                    <span class="text-danger">Xoá</span>
                  </a>
                </div>
              </span>
            </div>
          </div>
          <span class="mt-2">
            <span class="font-weight-bold color-main" style="font-size: 150%">
              {{ detailSchedule.title }} </span
            ><br />
            <div class="font-weight-bold">
              Salon: {{ checkSalonId(+detailSchedule.salon_id) }} <br />
              Địa điểm: {{ detailSchedule.address }} <br />
              Thời gian bắt đầu: {{ formatDate(detailSchedule.time_date) }}
            </div>
            <br />
            <p
              style="font-size: 15px; white-space: pre-wrap; "
              v-for="(item, index) in detailSchedule.content"
              :key="index"
            >
              {{ item.content }}
            </p>
            <div class="row">
              <div
                class="col-3 mt-2"
                v-for="(item, index) in detailSchedule.training_schedule_image"
                :key="index"
              >
                <img :src="item.image" alt="photo" style="width: 100%" />
              </div>
            </div>
          </span>
          <!-- danh sách bình luận -->
          <!-- <div class="mt-3">
            <p>Danh sách bình luận</p>
            <div
              class="w-75 mt-3"
              v-for="(item, index) in detailSchedule.training_schedule_comment"
              :key="index"
            >
              <div class="row hoverimageComment">
                <div class="col-md-3 text-right">
                  <img
                    src="../../../../assets/image/ava.png"
                    alt=""
                    style="width: 25px"
                  />
                  User ID: {{ item.user_id }}
                </div>
                <div class="col-md-9 bg-8 p-3" style="position: relative">
                  {{ item.comment }}
                  <span class="imageComment">
                    <span class="dropdown" style="float: right">
                      <span class="dropbtn">
                        <img
                          src="../../../../assets/image/more-horizontal.png"
                          alt=""
                          style="width: 28px"
                          class="border1 p-1"
                        />
                      </span>
                      <div class="dropdown-content text-right">
                        <div
                          class="hover"
                          style="
                            padding: 5px 15px;
                            width: 150px;
                            cursor: pointer;
                          "
                          data-toggle="modal"
                          data-target="#editComment"
                          @click="editComment(item.id)"
                        >
                          <span @click="cmtId = item.id"
                            >Chỉnh sửa {{ item.id }}</span
                          >
                        </div>
                        <div
                          class="hover"
                          @click="deleteComment(item.id)"
                          style="
                            padding: 5px 15px;
                            width: 150px;
                            cursor: pointer;
                          "
                        >
                          <span>Xoá</span>
                        </div>
                      </div>
                    </span>
                  </span>
                </div>
                <div class="modal fade" id="editComment" role="dialog">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <b class="text-left pl-3 p-2 color-main"
                        >Chỉnh sửa bình luận</b
                      >
                      <div class="modal-body">
                        <textarea
                          name=""
                          id=""
                          rows="4"
                          style="width: 100%"
                          v-model="comment.comment"
                        ></textarea>
                      </div>
                      <div class="modal-footer" style="border: none">
                        <div class="modal-header mr-2" style="border: none">
                          <button class="close" data-dismiss="modal">
                            <button
                              @click="buttonReset"
                              class="modal-title input"
                              style="font-size: 16px"
                              data-dismiss="modal"
                            >
                              Huỷ
                            </button>
                          </button>
                        </div>
                        <button
                          @click="submitEditComment()"
                          class="input creat-status"
                        >
                          Xong
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <!-- =================== -->
          <!-- VIẾT bình luận -->
          <!-- <form @submit.prevent="writeComments">
            <div class="row mt-3">
              <div class="col-md-1 col-sm-1 col-2">
                <img
                  src="../../../../assets/image/ava.png"
                  alt=""
                  style="width: 35px; margin-top: 8px"
                />
              </div>
              <div class="col-md-11 col-sm-11 col-10 mt-2">
                <input
                  type="text"
                  placeholder="viết bình luận..."
                  class="cmt"
                  style="
                    outline: none;
                    padding: 5px 5px 5px 15px;
                    width: 100%;
                    position: relative;
                  "
                  v-model="writeComment.comment"
                />
                <button type="submit" style="border: none">
                  <img
                    src="../../../../assets/image/sent.png"
                    alt=""
                    class="icon"
                  />
                </button>
              </div>
            </div>
          </form> -->
        </div>
      </div>
      <div class="col-md-3 col-sm-12 col-12 margin-top-5">
        <div class="bg p-3" style="border-radius: 16px">
          <h6 class="color-main">THÔNG BÁO</h6>
          <div
            class="p-2"
            v-for="(item, index) in detailSchedule.notification"
            :key="index"
          >
            <div
              class="float-left mr-2 mt-2"
              style="display: flex; align-items: center"
            >
              <img
                :src="item.user_id.avatar"
                alt=""
                style="width: 45px; height: 45px; border-radius: 50%"
              />
            </div>
            <div style="line-height: 17px" class="mt-2">
              <span>{{ item.content }}</span>
              <br />
              <span class="color-main">
                {{ getHumanDate(item.created_at) }}
              </span>
            </div>
          </div>
          <hr />

          <!-- ==== -->
          <h6 class="color-main margin-top-5">NHÂN VIÊN ĐÃ XEM</h6>
          <div
            class="row pl-4 mt-2"
            v-for="(item, index) in detailSchedule.user_seen"
            :key="index"
          >
            <div>
              <img
                :src="item.avatar"
                alt="photo"
                style="width: 45px; height: 45px; border-radius: 50%"
              />
            </div>
            <div class="ml-3"
              style="align-items: center; display: flex"
            >
              <span class="font-weight-bold">{{ item.name }}</span>
            </div>
          </div>
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
  name: "chiTietLichTrinh",
  data() {
    return {
      schedeleId: "",
      detailSchedule: {},
      user: {},
      writeComment: {
        comment: "",
      },
      comment: {
        comment: "",
      },
      listSalonId: {},
      cmtId: "",
    };
  },
  created() {
    this.schedeleId = this.$route.params.scheduleId;
    HTTP.get(`/salon/main/manage/branch/all`).then((res) => {
      this.listSalonId = res.data.data;
      // console.log(this.listSalonId);
    });
  },
  beforeMount() {
    this.detailSchedules();
  },
  methods: {
    // Chi tiết lịch trình
    detailSchedules() {
      HTTP.get(`/salon/main/manage/trainingSchedule/${this.schedeleId}`)
        .then((res) => {
          this.detailSchedule = res.data.data;
          this.user = res.data.data.user_id;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // ==================

    // Xoá lịch trình
    deleteSchedule() {
      this.$swal({
        title: "Xoá lịch trình?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete(
            `/salon/main/manage/trainingSchedule/${this.schedeleId}/delete`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.$swal("Đã xoá!", result.message, "success");
              history.back();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    // ==================

    // Bình luận bài viết
    writeComments() {
      HTTP.post(
        `/salon/main/manage/trainingSchedule/${this.schedeleId}/storeComment`,
        this.writeComment
      ).then((res) => {
        // console.log(this.Salon);
        let result = res.data;
        if (result.status === 1) {
          // this.content = "";
          this.writeComment.comment = "";
          this.detailSchedules();
        }
      });
    },
    // =================

    // Chỉnh sửa bình luận
    editComment(cmtId) {
      let lengCmt = this.detailSchedule.training_schedule_comment.length;
      // console.log(this.detailSchedule.training_schedule_comment[0].comment);
      for (let index = 0; index < lengCmt; index++) {
        if (this.detailSchedule.training_schedule_comment[index].id === cmtId)
          this.comment.comment = this.detailSchedule.training_schedule_comment[
            index
          ].comment;
      }
    },
    submitEditComment() {
      let cmt = JSON.stringify(this.comment);
      HTTP.put(
        `/salon/main/manage/trainingSchedule/${this.cmtId}/${this.schedeleId}/updateComment`,
        cmt
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.detailSchedules();
          this.$swal("", result.message, "success");
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // ===================
    // Xoá bình luận
    deleteComment(index) {
      this.$swal({
        title: "Xoá bình luận?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete(
            `/salon/main/manage/trainingSchedule/${index}/${this.schedeleId}/deleteComment`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.detailSchedules();
            }
          });
        }
      });
    },
    // ====================

    getHumanDate: function(date) {
      return moment(date).fromNow();
    },

    // trả tên salon theo Id
    checkSalonId(salon) {
      var lengSalon = this.listSalonId.length;
      for (let index = 0; index < lengSalon; index++) {
        if (salon === this.listSalonId[index].id)
          return this.listSalonId[index].salon_name;
      }
    },
    // =====================
    formatDate,
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

.cmt {
  border-radius: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 32px;
}

p {
  font-size: 80%;
}

.border-main {
  border: 1px solid #d4476f;
  box-sizing: border-box;
  border-radius: 4px;
}
.modal-dialog {
  top: 20%;
}
span {
  font-size: 14px;
}

.bg {
  background: rgba(255, 255, 255, 0.4);
}
.imageComment {
  position: absolute;
  top: 0;
  right: 5px;
  display: none;
}
.hoverimageComment:hover .imageComment {
  display: block !important;
}
.icon {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 25px;
  margin-top: 6px;
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
  right: 0px;
  background-color: #f9f9f9;
  max-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 14px 16px;
  text-decoration: none;
  display: block;
  min-width: 120px;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
