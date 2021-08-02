<template>
  <div class="col-md-10 mb-5 res mt-3">
    <div v-if="noti.msg != ''">
      <div class="text-center mt-4">
        <b>{{ noti.msg }}</b>
      </div>
    </div>
    <div v-else class="w-75" style="margin: 0 auto">
      <div class="mt-3">
        <div class="bg p-3" style="border-radius: 16px; height: 100%">
          <span style="font-size: 18px; font-weight-bold"
            >Chi tiết bài viết</span
          >
          <!-- Bài viết -->
          <div class="mt-3">
            <div class="row" style="display: flex; align-items: center">
              <div class="ml-2">
                <img
                  :src="listDetailCommunityAccount.avatar"
                  alt=""
                  style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;"
                />
              </div>
              <div class="ml-2 col">
                <span class="font-weight-bold">
                  {{ listDetailCommunityAccount.name }} </span
                ><br />
                <ul class="mb-0">
                  <li>
                    <span class="font-weight-bold">
                      {{ checkSalonId(listDetailCommunity.salon_id) }}
                    </span>
                  </li>
                  <li>
                    <span class="color-main"
                      >{{ getHumanDate(listDetailCommunity.created_at) }}
                    </span>
                  </li>
                </ul>
              </div>

              <!-- Tuỳ chọn bài viết -->
              <div class="col-md-2 col-sm-2 col-2" style="text-align: right">
                <span class="dropdown" style="float: right; margin-top: -5px">
                  <span class="dropbtn">
                    <img
                      src="../../../assets/image/more-horizontal.png"
                      alt=""
                      style="width: 28px"
                      class="border1 p-1"
                    />
                  </span>
                  <div class="dropdown-content">
                    <div data-toggle="modal" data-target="#editConversation">
                      <span>Chỉnh sửa bài viết</span>
                    </div>
                    <div @click="deleteConversation(listDetailCommunity.id)">
                      <span>Xoá bài viết</span>
                    </div>
                  </div>
                  <div class="modal fade" id="editConversation" role="dialog">
                    <div class="modal-dialog  modal-lg">
                      <form @submit.prevent="editConvers">
                        <div class="modal-content">
                          <b class="text-left pl-3 p-2 color-main"
                            >Chỉnh sửa bài viết</b
                          >
                          <div class="modal-body">
                            <textarea
                              name=""
                              id=""
                              rows="5"
                              v-model="editConver.content"
                              style="width: 100%"
                            ></textarea>
                            <div class="mt-3">
                              <div class="row mt-3">
                                <div
                                  v-if="preview_list.length <= 0"
                                  class="col-md-2 col-sm-2 col-4"
                                >
                                  <!-- <span>ha</span> -->
                                </div>
                                <div
                                  v-else
                                  class="col-md-4 col-sm-4 col-6 mt-2"
                                  id="preview"
                                  v-for="(item, index) in preview_list"
                                  :key="index"
                                >
                                  <img :src="item" class="img-fluid" />
                                  <div
                                    class="remove-file"
                                    style="
                                      position: absolute;
                                      top: -12px;
                                      right: 9px;
                                      cursor: pointer;
                                    "
                                    v-on:click="removeFile(index)"
                                  >
                                    <img
                                      src="../../../assets/image/xx.png"
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row pt-2">
                              <div class="col text-center">
                                <input
                                  type="file"
                                  id="picture"
                                  multiple
                                  hidden
                                  @change="previewMultiImage"
                                />
                                <label for="picture" class="add-item">
                                  <img
                                    src="../../../assets/image/picture.png"
                                    alt=""
                                  />
                                </label>
                              </div>
                              <div class="col text-center add-item">
                                <img
                                  src="../../../assets/image/icon1.png"
                                  alt=""
                                />
                              </div>
                              <div class="col text-center add-item">
                                <img
                                  src="../../../assets/image/location.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <div class="modal-header mr-2">
                              <button class="close" data-dismiss="modal">
                                <button
                                  class="modal-title input"
                                  style="font-size: 16px"
                                  data-dismiss="modal"
                                >
                                  Huỷ bỏ
                                </button>
                              </button>
                            </div>
                            <button
                              type="submit"
                              @click="submitImage"
                              class="input creat-status"
                            >
                              Xong
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </span>
              </div>
            </div>
            <!-- ================= -->

            <!-- chi tiết nội dung -->
            <div class="mt-2">
              <p style="white-space: pre-wrap;">
                {{ listDetailCommunity.content }}
              </p>
              <div class="text-center">
                <vue-picture-swipe :items="listImages"></vue-picture-swipe>
              </div>
            </div>
            <!-- =============== -->

            <!-- like và comment -->
            <div class="mt-3">
              <div class="text-right float-right">
                <span>{{ listDetailCommunity.total_comment }} bình luận</span>
              </div>
              <div class="text-left">
                <img
                  src="../../../assets/image/liked.png"
                  alt=""
                  style="width: 20px"
                />
                <span v-if="listDetailCommunity.liked === true" class="ml-2">{{
                  listDetailCommunity.total_like + 1
                }}</span>
                <span v-else class="ml-2">{{
                  listDetailCommunity.total_like
                }}</span>
              </div>
              <hr />
              <div class="mt-0">
                <div>
                  <div class="text-right" style="cursor: pointer">
                    <img src="../../../assets/image/coment.png" alt="" />
                    <span class="ml-1"> bình luận</span>
                  </div>
                </div>
                <!-- <div>
                  <span
                    @click="
                      listDetailCommunity.liked = !listDetailCommunity.liked
                    "
                    style="cursor: pointer"
                  >
                    <span v-if="listDetailCommunity.liked">
                      <img
                        src="../../../assets/image/liked1.png"
                        alt=""
                        style="width: 14px"
                      />
                      <span class="ml-2 text-primary"><b>Thích</b></span>
                    </span>
                    <span v-else>
                      <img
                        src="../../../assets/image/like.png"
                        alt=""
                        style="width: 14px"
                      />
                      <span class="ml-2"><b>Thích</b></span>
                    </span>
                  </span>
                </div> -->

                <!-- Chi tiết bình luận -->
                <div class="mt-2">
                  <div class="p-2" style="border-top: 5px solid white">
                    <!-- Danh sách bình luận -->
                    <div
                      class="row mt-2"
                      v-for="(comment, index) in listComment"
                      :key="index"
                    >
                      <div class="col-md-1 pr-0 text-right">
                        <img
                          :src="comment.account.avatar"
                          alt=""
                          style="width: 45px; height: 45px; border-radius: 50%"
                        />
                      </div>
                      <div class="col-md-11">
                        <div class="bg-8 p-2">
                          <span>
                            <b> {{ comment.account.name }} </b> -
                            <span style="font-size: 90%">
                              {{ getHumanDate(comment.created_at) }}
                            </span></span
                          >
                          <br />
                          {{ comment.comment }}
                          <hr />
                          <div class="comment">
                            <!-- <span>Thích</span> -->
                            <!-- <span class="ml-3"> Trả lời</span> -->
                            <span
                              @click="removeComment(comment.id)"
                            >
                              Xoá
                            </span>
                          </div>
                        </div>
                        <!-- trả lời bình luận -->
                        <div
                          class="mt-1"
                          v-for="(replie, index) in comment.replies"
                          :key="index"
                        >
                          <div class="row mt-2">
                            <div class="col-md-1 pr-0 text-right">
                              <img
                                alt="photo"
                                :src="replie.account.avatar"
                                style="
                                  width: 45px;
                                  height: 45px;
                                  border-radius: 50%;
                                "
                              />
                            </div>
                            <div class="col-md-11">
                              <div class="bg-8 p-2">
                                <span>
                                  <b> {{ replie.account.name }} </b> -
                                  <span style="font-size: 90%">
                                    {{ getHumanDate(replie.created_at) }}
                                  </span>
                                </span>
                                <br />
                                {{ replie.comment }}
                                <hr />
                                <div class="comment">
                                  <span>Thích</span>
                                  <span class="ml-3"> Trả lời</span>
                                  <span
                                    @click="removeComment(replie.id)"
                                    class="ml-3"
                                  >
                                    Xoá
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- ================= -->
                      </div>
                    </div>
                    <!-- ============== -->

                    <!-- Viết bình luận -->
                    <div class="row mt-2">
                      <div class="col-md-1 pr-0 text-right">
                        <img
                          :src="user.avatar"
                          alt="photo"
                          style="width: 45px; height: 45px; border-radius: 50%"
                        />
                      </div>
                      <div class="col-md-11">
                        <form @submit.prevent="writeComments">
                          <div class="bg-8 p-2">
                            <span class="font-weight-bold">
                              {{ user.name }}
                            </span>
                            <br />
                            <input
                              type="text"
                              placeholder="Viết bình luận..."
                              class="w-100 mt-2"
                              v-model="writeComment.comment"
                            />
                            <button
                              type="submit"
                              class="float-right"
                              style="border: none"
                            >
                              <img
                                src="../../../assets/image/sent.png"
                                alt=""
                                style="
                                  position: absolute;
                                  top: 48px;
                                  right: 34px;
                                "
                              />
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <!-- =============== -->
                  </div>
                </div>
                <!-- ============= -->
              </div>
            </div>
            <!-- =============== -->

            <div class="border-bottom1 mt-2"></div>
          </div>
          <!-- ======================== -->
        </div>
      </div>
      <!-- ============================= -->
    </div>
  </div>
</template>
<script>
import VuePictureSwipe from "vue-picture-swipe";
import { HTTP } from "@/main";
import { formatDate } from "@/main";
import moment from "moment";
import vi from "moment/locale/vi";
moment.updateLocale("vi", vi);
export default {
  components: {
    "vue-picture-swipe": VuePictureSwipe,
  },
  name: "congDong",
  data() {
    return {
      preview_list: [],
      image_list: [],
      liked: true,
      detailId: "",
      isHidden: "none",
      post: {},
      editPost: {
        content: "",
        status: "",
      },
      listDetailCommunity: [],
      listDetailCommunityAccount: [],
      listComment: [],
      listCommentReplies: [],
      writeComment: {
        comment: "",
      },
      editConver: {
        content: "",
      },
      listSalonId: {},
      listDetailCommunityImage: {},
      listImages: [{}],
      user: [],
      noti: {
        msg: "",
      },
    };
  },
  beforeMount() {
    this.listConversation();
    this.listConversationCommnet();
  },
  created() {
    const account = localStorage.getItem("userInfo");
    this.user = JSON.parse(account);
    this.detailId = window.location.href.slice(
      window.location.href.indexOf("/chi-tiet-bai-dang/") + 19,
      window.location.href.length
    );
    HTTP.get(`/salon/main/manage/branch/all`).then((res) => {
      this.listSalonId = res.data.data;
      // console.log(this.listSalonId);
    });
  },
  methods: {
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
    // Chi tiết bài đăng
    listConversation() {
      HTTP.get(`/salon/main/manage/conversation/${this.detailId}/detail`).then(
        (res) => {
          let result = res.data;
          // console.log(result);
          if (result.status === 1) {
            let data = result.data;
            this.listDetailCommunity = data;
            this.listImages = this.listDetailCommunity.listImage;
            for (let index = 0; index < this.listImages.length; index++) {
              this.listImages[index].w = 1920;
              this.listImages[index].h = 1080;
            }

            this.editConver.content = this.listDetailCommunity.content;
            this.listDetailCommunityAccount = data.account;
            this.listDetailCommunityImage = data.listImage;
          } else {
            this.noti.msg = result.message;
          }
        }
      );
    },
    // ==================

    // Chỉnh sửa bài viết
    editConvers() {
      let postId = this.$route.params.baiDangId;
      HTTP.post(
        `/salon/main/manage/conversation/${postId}/update`,
        this.editConver
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          // this.content = "";
          this.$swal("", result.message, "success");
          this.listConversation();
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // ==================

    // Bình luận bài viết
    writeComments() {
      let commentId = this.$route.params.baiDangId;
      HTTP.post(
        `/salon/main/manage/conversation/${commentId}/do_comment`,
        this.writeComment
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.writeComment.comment = "";
          this.listConversationCommnet();
          this.listConversation();
        }
      });
    },
    // =================

    // Xoá Bài đăng
    deleteConversation(index) {
      this.$swal({
        title: "Xoá bài viết?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          let conversationId = index;
          HTTP.delete(
            `/salon/main/manage/conversation/${conversationId}/delete`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.$swal("Đã xoá!", result.message, "success");
              setTimeout(function() {
                history.back();
              }, 500);
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    // ==================

    // Danh sách bình luận
    listConversationCommnet() {
      HTTP.get(
        `/salon/main/manage/conversation/${this.detailId}/comment?page=1`
      ).then((res) => {
        let result = res.data;
        // console.log(result);
        if (result.status === 1) {
          let data = result.data;
          this.listComment = data.comments;
          //   console.log(this.listComment);
        }
      });
    },
    // ===================

    // Xoá bình luận
    removeComment(index) {
      this.$swal({
        title: "Xoá bình luận?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          let conversationId = this.$route.params.baiDangId;
          let commentId = index;
          HTTP.delete(
            `/salon/main/manage/conversation/${conversationId}/remove_comment?comment_id=${commentId}`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.listConversationCommnet();
              this.listConversation();
            }
          });
        }
      });
    },
    // =============
    submitImage() {
      let id = this.$route.params.baiDangId;
      let formData = new FormData();
      for (var i = 0; i < this.image_list.length; i++) {
        let file = this.image_list[i];

        formData.append("listImage[" + i + "]", file);
      }
      HTTP.post(`/salon/main/manage/conversation/${id}/image`, formData).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            this.listConversation();
          }
        }
      );
    },

    // Đăng ảnh lên bài viết
    previewMultiImage: function(event) {
      var input = event.target;
      var count = input.files.length + this.preview_list.length;
      var index = 0;
      if (count <= 6) {
        if (input.files) {
          while (count--) {
            var reader = new FileReader();
            reader.onload = (e) => {
              this.preview_list.push(e.target.result);
            };
            this.image_list.push(input.files[index]);
            reader.readAsDataURL(input.files[index]);
            index++;
          }
        }
      } else alert("Tối đa 6 ảnh");
    },
    removeFile(key) {
      this.preview_list.splice(key, 1);
      this.image_list.splice(key, 1);
    },
    // Định dạng ngày
    formatDate,
    // ==============
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
.comment span {
  cursor: pointer;
}
.cmt {
  border-radius: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
}
hr {
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}
.creat-status:hover {
  background: #d4476f;
  color: white;
  cursor: pointer;
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
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content div {
  color: black;
  cursor: pointer;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}
.dropdown-content div:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.modal-header {
  padding: 0;
  border-bottom: none;
}
.add-item {
  cursor: pointer;
}
.border-bottom1 {
  border-bottom: 6px solid #dee2e6;
  border-radius: 20px;
}
.modal-content {
  margin-top: 25%;
}
</style>
