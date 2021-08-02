<template>
  <div class="col-md-10 mb-5 res mt-3">
    <select
      name="cars"
      class="inputx mr-3"
      id="cars"
      style="width: 30%; outline: none"
    >
      <option value="">tất cả salon</option>
      <option value="">1</option>
    </select>
    <span
      class="inputx hover color-main mr-3"
      style="cursor: pointer"
      data-toggle="modal"
      data-target="#myModal21"
    >
      Thêm thông báo
    </span>
    <!-- Thêm thông báo -->
    <div class="modal fade" id="myModal21" role="dialog">
      <div class="modal-dialog" style="top: 15%">
        <div class="modal-content">
          <div class="modal-body">
            <select
              name="salon_id"
              class="inputx mr-3 res-margin-0"
              style="width: 100%; outline: none"
              v-model="submitfile.salon_id"
            >
              <option value="">--Chọn salon--</option>

              <option
                v-for="salon in listStore"
                :key="salon.id"
                :value="salon.id"
              >
                {{ salon.salon_name }}
              </option>
            </select>
            <textarea
              rows="10"
              class="mt-3"
              style="width: 100%"
              placeholder="Thêm thông báo..."
              v-model="submitfile.content"
            ></textarea>
            <div class="text-left">
              <div class="row mt-3">
                <div
                  class="col-md-4 col-sm-4 col-6 mt-2"
                  id="preview"
                  v-for="(item, index) in preview_list"
                  :key="index"
                >
                  <img :src="item" class="img-fluid" />
                  <div
                    class="remove-file"
                    style=" position: absolute;top: -12px;right: 9px;cursor: pointer;"
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
                  <img src="../../../assets/image/picture.png" alt="" />
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
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-header mr-2">
              <button class="close" data-dismiss="modal">
                <button class="modal-title input" style="font-size: 16px">
                  Huỷ bỏ
                </button>
              </button>
            </div>
            <button
              @click="addNoti"
              class="input creat-status"
              data-dismiss="modal"
            >
              Đăng bài
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- ============== -->
    <div class="row mt-3">
      <div class="col-md-9 col-sm-12 col-12">
        <loadingData v-if="loading"></loadingData>
        <div v-else>
          <div
            v-if="msg != ''"
            class="text-center font-weight-bold mt-3"
            style="font-size: 120%"
          >
            {{ msg }}
          </div>
          <div v-else class="bg p-3" style="border-radius: 16px;">
            <div class="row p-2">
              <div class="mr-2">
                <img
                  :src="detailNoti.avatar"
                  alt=""
                  style="width: 40px; height: 40px; border-radius: 50%"
                />
              </div>
              <div>
                <span class="font-weight-bold">{{ detailNoti.name }}</span
                ><br />
                <ul class="m-0">
                  <li>
                    <span class="font-weight-bold">
                      {{ detailNoti.role }}
                      &#8226;
                    </span>
                  </li>
                  <li>
                    <span class="color-main">
                      {{ getHumanDate(detailNoti.created_at) }}
                    </span>
                  </li>
                </ul>
              </div>
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
                    <a>
                      <span data-toggle="modal" data-target="#editNoti">
                        Chỉnh sửa
                      </span>
                    </a>

                    <a @click="deleteNoti(detailNoti.id)" class="text-danger">
                      Xoá
                    </a>
                  </div>
                  <!-- sửa thông báo -->
                  <div class="modal fade" id="editNoti" role="dialog">
                    <div class="modal-dialog" style="top: 15%">
                      <div class="modal-content">
                        <div class="modal-body">
                          <textarea
                            rows="10"
                            class="mt-3"
                            style="width: 100%"
                            placeholder="Thêm thông báo..."
                            v-model="update.content"
                          ></textarea>
                        </div>
                        <div class="modal-footer">
                          <div class="modal-header mr-2">
                            <button class="close" data-dismiss="modal">
                              <button
                                class="modal-title input"
                                style="font-size: 16px"
                              >
                                Huỷ bỏ
                              </button>
                            </button>
                          </div>
                          <button
                            @click="updateNoti"
                            class="input creat-status"
                            data-dismiss="modal"
                          >
                            Đăng bài
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- ============== -->
                </span>
              </div>
            </div>
            <span class="mt-2">
              <span class="font-weight-bold">
                Chào mừng bạn đến với ThienAnCo.ltd!
              </span>
              <br />
              <p>{{ detailNoti.content }}</p>
              <!-- <div class="row">
                <div class="col-3" v-for="(image, index) in item.list_image" :key="index">
                  <img :src="image" alt="photo">
                </div>
              </div> -->
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-12 col-12 margin-top-5">
        <div class="bg p-3" style="border-radius: 16px">
          <h6 class="color-main font-weight-bold">THÔNG BÁO</h6>
          <div v-if="msg != ''" class="text-center font-weight-bold mt-3">
            {{ msg }}
          </div>
          <div
            v-else
            class="mt-2"
            v-for="(item, index) in listNoti"
            :key="index"
          >
            <div
              @click="changeNoti(item.id)"
              class="p-2"
              style="cursor: pointer;"
              :class="{ bgxx: id_noti == item.id }"
            >
              <div class="float-left mr-2">
                <img
                  :src="item.avatar"
                  alt=""
                  style="width: 45px; height: 45px; border-radius: 50%"
                />
              </div>
              <div style="line-height: 18px">
                <span class="font-weight-bold">{{ item.name }}</span>
                <span>
                  đã đăng một <b>{{ item.type_noti }}</b>
                </span>
                <span> vào salon của bạn</span>
                <br />
                <div class="color-main text-right" style="font-size: 12px">
                  {{ getHumanDate(item.created_at) }}
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
import moment from "moment";
import loadingData from "@/components/loadingData";
import vi from "moment/locale/vi";
moment.updateLocale("vi", vi);
export default {
  name: "thongBaoNhanVien",
  components: {
    loadingData,
  },
  data() {
    return {
      active: "",
      listNoti: [],
      detailNoti: {},
      loading: true,
      hasData: false,
      update: {
        salon_id: "",
        content: "",
      },
      listStore: {},
      id_noti: "",
      msg: "",
      submitfile: {
        salon_id: "",
        content: "",
      },
      preview_list: [],
      image_list: [],
    };
  },
  beforeMount() {
    this.listFullNoti();
    this.getListStore();
  },
  methods: {
    getHumanDate: function(date) {
      return moment(date).fromNow();
    },
    // danh sách
    listFullNoti() {
      HTTP.get(`/salon/main/manage/notification`).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;
          if (data.data.length > 0) {
            this.listNoti = data.data;
            this.id_noti = this.listNoti[0].id;
            this.detailNotis();
          } else this.msg = "Chưa có thông báo!!!";
        }
        this.loading = false;
      });
    },
    // ===============
    // Chi tiết thông báo
    detailNotis() {
      if (this.id_noti > 0) {
        this.msg = "";
        HTTP.get(`/salon/main/manage/notification/${this.id_noti}`).then(
          (res) => {
            let result = res.data;
            if (result.status === 1) {
              this.hasData = true;
              this.loading = false;
              let data = result.data;
              this.detailNoti = data;
              this.update.salon_id = this.detailNoti.salon_id;
              this.update.content = this.detailNoti.content;
            }
          }
        );
      } else this.msg = "Chọn thông báo để hiển thị";
    },
    // ===================

    // Thay đổi thông báo
    changeNoti(value) {
      this.loading = true;
      this.id_noti = value;
      this.msg = "";
      this.detailNotis();
    },
    // ==================

    // Thêm thông báo
    addNoti() {
      HTTP.post(`/salon/main/manage/notification/store`, this.submitfile).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            this.$swal("", result.message, "success");
            this.listFullNoti();
          } else {
            this.$swal("", result.message, "error");
          }
        }
      );
    },
    // ================

    // cập nhật thông báo
    updateNoti() {
      HTTP.put(
        `/salon/main/manage/notification/${this.id_noti}/update`,
        this.update
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.$swal("", result.message, "success");
          this.detailNotis();
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // ================

    // Danh sách Salon
    getListStore() {
      HTTP.get("/salon/main/manage/branch/all").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listStore = data;
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
      });
    },
    // ====================

    // Xoá thông báo
    deleteNoti(index) {
      this.$swal({
        title: "Xoá thông báo?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xoá!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete(`/salon/main/manage/notification/${index}/delete`).then(
            (res) => {
              this.loading = true;
              let result = res.data;
              if (result.status === 1) {
                this.$swal("Đã xoá!", result.message, "success");
                this.loading = true;
                this.listFullNoti();
              } else {
                this.$swal("", result.message, "error");
              }
            }
          );
        }
      });
    },
    // ==================
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
  cursor: pointer;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.bgxx {
  background: rgba(206, 206, 206, 0.6);
  /* shape */
  cursor: pointer;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
.modal-header {
  border-bottom: none;
}
.modal-header .close {
  padding: 0;
}
</style>
