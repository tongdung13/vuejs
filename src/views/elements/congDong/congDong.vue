<template>
  <div class="col-md-10 mb-5 res mt-3">
    <div class="row mt-3">
      <div class="col-md-9 col-sm-12 col-12">
        <div class="bg p-3" style="border-radius: 16px; height: 100%">
          <!-- Danh sách bài viết -->
          <div class="row">
            <div class="col-md-6 col-sm-6 col-6">
              <b class="color-main" style="font-size: 18px; font-weight-bold">
                Danh sách bài viết
              </b>
            </div>
            <!-- ===Tạo bài viết==-->
            <!-- <input placeholder="name" v-model="post.content" /> -->
            <div class="col-md-6 col-sm-6 col-6 text-right">
              <span
                @click="undisButton"
                data-toggle="modal"
                data-target="#createdStatus"
                class="creat-status bg-8 p-1 pl-4 pr-4 bg"
                style="font-size: 18px; font-weight-bold"
              >
                Tạo bài viết
              </span>
              <div class="modal fade" id="createdStatus" role="dialog">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <b class="text-left pl-3 p-2 color-main">Tạo bài viết</b>
                    <div class="modal-body">
                      <textarea
                        name=""
                        id=""
                        rows="5"
                        v-model="content"
                        style="width: 100%"
                      ></textarea>
                      <div class="text-left">
                        <div class="row mt-3">
                          <div
                            v-if="preview_list.length <= 0"
                            class="col-md-2 col-sm-2 col-4"
                          ></div>
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
                              <img src="../../../assets/image/xx.png" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row pt-2 mt-3">
                        <div class="col text-center">
                          <label for="my-file" style="cursor: pointer">
                            <img
                              src="../../../assets/image/picture.png"
                              alt=""
                            />
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            multiple="multiple"
                            ref="files"
                            @change="previewMultiImage"
                            class="form-control-file"
                            id="my-file"
                            hidden
                          />
                        </div>
                        <!-- <div class="col text-center add-item">
                          <img src="../../../assets/image/icon1.png" alt="" />
                        </div>
                        <div class="col text-center add-item">
                          <img
                            src="../../../assets/image/location.png"
                            alt=""
                          />
                        </div> -->
                      </div>
                    </div>
                    <div class="modal-footer">
                      <div class="modal-header mr-2">
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
                        @click="createPost"
                        :disabled="disabled == true"
                        class="input creat-status"
                      >
                        Đăng bài
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- =========================== -->

          <!-- Bài viết -->
          <loadingData v-if="loading"></loadingData>
          <div v-if="hasData">
            <div
              class="mt-3"
              v-for="(item, index) in listCommunity"
              :key="index"
            >
              <div class="row" style="display: flex; align-items: center">
                <div class="mr-3 ml-2">
                  <img
                    :src="item.avatar"
                    alt=""
                    style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover;"
                  />
                </div>
                <div>
                  <span class="font-weight-bold">{{ item.author }}</span
                  ><br />
                  <ul class="mb-0">
                    <li>
                      <span class="font-weight-bold">
                        {{ checkSalonId(item.salon_id) }}
                      </span>
                    </li>
                    <li>
                      <span class="color-main">
                        {{ getHumanDate(item.created_at) }}
                      </span>
                    </li>
                  </ul>
                </div>

                <!-- Tuỳ chọn bài viết -->
                <div class="col" style="text-align: right">
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
                      <router-link
                        :to="{
                          name: 'chiTietBaiDang',
                          params: { baiDangId: item.id },
                        }"
                      >
                        <span>Chi tiết bài viết {{ item.id }}</span>
                      </router-link>
                      <div @click="deleteConversation(item.id)">
                        <span> Xoá bài viết </span>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
              <!-- ================= -->

              <!-- chi tiết nội dung -->
              <div class="mt-2">
                <p style="white-space: pre-wrap;" class="text-3">
                  {{ item.content }}
                </p>
                <div class="row">
                  <div
                    class="col-md-4 col-sm-6 col-12 mt-2"
                    v-for="(image, index) in item.listImage"
                    :key="index"
                  >
                    <router-link
                      :to="{
                        name: 'chiTietBaiDang',
                        params: { baiDangId: item.id },
                      }"
                    >
                      <img
                        :class="{ hidden: index >= 3 }"
                        :src="image.src"
                        alt="photo"
                        style="width: 100%; height: 100%; object-fit: cover;"
                      />
                    </router-link>
                  </div>
                </div>
              </div>
              <!-- =============== -->

              <!-- like và comment -->
              <div class="mt-3">
                <div class="text-right float-right">
                  <span>{{ item.total_comment }} bình luận</span>
                </div>
                <div class="text-left">
                  <img
                    src="../../../assets/image/liked.png"
                    alt=""
                    style="width: 20px"
                  />
                  <span v-if="item.liked === true" class="ml-2">{{
                    item.total_like + 1
                  }}</span>
                  <span v-else class="ml-2">{{ item.total_like }}</span>
                </div>
                <hr />
                <div class="mt-0">
                  <div>
                    <router-link
                      :to="{
                        name: 'chiTietBaiDang',
                        params: { baiDangId: item.id },
                      }"
                    >
                      <div class="text-right" style="cursor: pointer">
                        <img src="../../../assets/image/coment.png" alt="" />
                        <span class="ml-1"> bình luận</span>
                      </div>
                    </router-link>
                  </div>

                  <!-- Chi tiết bình luận -->
                  <div class="mt-2">
                    <router-view></router-view>
                  </div>
                  <!-- ============= -->
                </div>
              </div>
              <!-- =============== -->

              <div class="border-bottom1 mt-2"></div>
            </div>
            <!-- ======================== -->
            <!-- phân trang -->
            <div v-if="paginate.totalPage == 1"></div>
            <div v-else class="mt-3">
              <ul class="pagination justify-content-end">
                <li
                  class="page-item"
                  style="cursor: pointer"
                  :class="{ disabled: paginate.currentPage === 1 }"
                >
                  <span
                    class="page-link"
                    @click="changePage(paginate.currentPage - 1)"
                    >Trước</span
                  >
                </li>

                <li
                  class="page-item"
                  v-for="(page, index) in paginate.totalPage"
                  :key="index"
                  :class="{ active: paginate.currentPage === page }"
                  style="cursor: pointer"
                >
                  <span class="page-link" @click="changePage(index + 1)">{{
                    index + 1
                  }}</span>
                </li>

                <li
                  class="page-item"
                  style="cursor: pointer"
                  :class="{
                    disabled: paginate.currentPage === paginate.totalPage,
                  }"
                >
                  <span
                    class="page-link"
                    @click="changePage(paginate.currentPage + 1)"
                    >Sau</span
                  >
                </li>
              </ul>
            </div>
          </div>
          <!-- ============ -->
        </div>
      </div>
      <!-- ============================= -->

      <!-- Thông báo -->
      <div class="col-md-3 col-sm-12 col-12 margin-top-5">
        <div class="bg p-3" style="border-radius: 16px">
          <h6 class="color-main">THÔNG BÁO</h6>
          <div class="row p-2">
            <div
              class="col-md-3 col-sm-3 col-3 p-0"
              style="display: flex; align-items: center"
            >
              <img
                src="../../../assets/image/ava.png"
                alt=""
                class="pl-2"
                style="width: 45px"
              />
            </div>
            <div class="col-md-9 col-sm-9 col-9 p-0" style="line-height: 15px">
              <span class="font-weight-bold">Boss</span>
              <span> đã đăng một quy định mới vào </span>
              <span class="font-weight-bold">salon của bạn</span>
              <br />
              <span class="color-main">4 giờ trước</span>
            </div>
          </div>
        </div>
      </div>
      <!-- ================== -->
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
import loadingData from "@/components/loadingData";
import { formatDate } from "@/main";
import moment from "moment";
import vi from "moment/locale/vi";
moment.updateLocale("vi", vi);
export default {
  name: "congDong",
  components: {
    loadingData,
  },
  data() {
    return {
      loading: true,
      hasData: false,
      liked: true,
      disabled: false,
      isHidden: "none",
      post: {},
      editPost: {
        content: "",
        status: "",
      },
      listCommunity: {},
      isLike: false,
      paginate: {
        currentPage: 1,
        totalPage: 1,
      },
      listSalonId: {},
      content: "",
      listImages: [],
      preview_list: [],
      image_list: [],
    };
  },
  created() {
    HTTP.get(`/salon/main/manage/branch/all`).then((res) => {
      this.listSalonId = res.data.data;
    });
  },
  beforeMount() {
    this.listConversation();
  },
  methods: {
    getHumanDate: function(date) {
      return moment(date).fromNow();
    },
    changePage(index) {
      this.paginate.currentPage = index;
      this.listConversation();
    },
    // trả tên salon theo Id
    checkSalonId(salon) {
      var lengSalon = this.listSalonId.length;
      for (let index = 0; index < lengSalon; index++) {
        if (salon === this.listSalonId[index].id)
          return this.listSalonId[index].salon_name;
      }
    },
    // Danh sách bài đăng
    listConversation() {
      let page = this.paginate.currentPage;
      HTTP.get(`/salon/main/manage/conversation?page=` + page).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;
          if (data.data.length > 0) {
            this.hasData = true;
            this.listCommunity = data.data;
            this.paginate.currentPage = data.current_page;
            this.paginate.totalPage = data.last_page;
          } else {
            this.msg = "Chưa có đánh giá";
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },
    // ==================

    // Chi tiết bài đăng

    // ==================

    // Tạo bài đăng
    createPost() {
      let formData = new FormData();

      formData.append("content", this.content);
      for (var i = 0; i < this.image_list.length; i++) {
        let file = this.image_list[i];

        formData.append("listImage[" + i + "]", file);
      }
      HTTP.post(`/salon/main/manage/conversation/store`, formData).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            this.disabled = true;
            this.content = "";
            this.preview_list = [];
            this.$swal("", result.message, "success");
            this.listConversation();
          } else {
            this.$swal("", result.message, "error");
          }
        }
      );
    },
    // =====================

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
            this.loading = true;
            let result = res.data;
            if (result.status === 1) {
              this.$swal("Đã xoá!", result.message, "success");
              this.loading = true;
              this.listConversation();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    // ==================

    // Like bài viết
    pushLike(index, like) {
      if (index === true) {
        index = false;
        like += 1;
        return index, like;
      } else {
        index = true;
        return index, like;
      }
    },
    // =============

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
    // =============
    buttonReset() {
      (this.preview_list = []), (this.post.content = "");
    },

    // click 1 lần
    disButton() {
      this.disabled = true;
    },
    undisButton() {
      this.disabled = false;
    },
    // ===============
    // Định dạng ngày
    formatDate,
    // ==============
  },
};
</script>
<style scoped>
.hidden {
  display: none;
}
ul {
  padding: 0;
}

ul li {
  display: inline;
}
.activeClass {
  display: none;
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
.text-3 {
  display: block;
    display: -webkit-box;
    line-height: 25px; 
    max-height: 75px; 
    -webkit-line-clamp: 3;
    visibility: visible; 
    text-overflow: ellipsis;
    overflow:hidden;
    
  -webkit-box-orient: vertical;
}
</style>
