<template>
  <div class="col-md-10 res mb-4 mt-3">
    <div class="row">
      <div class="col-md-8 col-sm-12 col-12">
        <select
          name="salon_id"
          class="inputx mr-3 res-margin-0"
          style="width: 30%; outline: none"
          v-model="salon_id"
          @change="changeSalon"
        >
          <option value="">Tất cả salon</option>

          <option v-for="salon in listStore" :key="salon.id" :value="salon.id">
            {{ salon.salon_name }}
          </option>
        </select>
        <!-- <router-link :to="{ name: 'themQuyTrinh' }">
          <span class="inputx hover color-main mr-3">+ Thêm quy trình</span>
        </router-link> -->
        <span class="inputx hover color-main">Xuất báo cáo</span>
      </div>
      <!-- <div class="col-md-4 div sm-12 col-12">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng"
          style="
            width: 75%;
            position: relative;
            float: right;
            padding: 4px 10px;
          "
          class="margin-top-5 float-left-0"
        />
        <i
          class="fa fa-search color-main"
          style="position: absolute; top: 8px; right: 20px"
        ></i>
      </div> -->
    </div>
    <div class="mt-4">
      <div class="row">
        <div class="col-md">
          <h5 class="color-main font-weight-bold" style="font-size: 16px">
            QUY TRÌNH LÀM VIỆC
          </h5>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <div class="row">
        <!-- Danh sách quy trình -->
        <div class="col-md-2 col-sm-12 col-12">
          <div class="row">
            <div class="col-md-12 col-sm-6 col-6 mt-1">
              <!-- danh sách các quy trình -->
              <div
                v-for="(item, index) in WorkingProcess"
                :key="index"
                @click="active = item.id"
                v-bind:class="{ active: active == item.id }"
              >
                <div
                  class="mt-2 bg m-0"
                  @click="changeProcess(item.id)"
                  style="cursor: pointer"
                >
                  <!-- <div style="padding: 5px">
                    <img :src="item.image" alt="photo" style="width: 30px" />
                  </div> -->
                  <div class="p-2 text-center">
                    {{ item.title }}
                  </div>
                </div>
                <!-- </router-link> -->
              </div>
              <!-- ============== -->
            </div>
          </div>
        </div>

        <!-- Quy trình cắt tóc -->
        <div class="col-md-7 margin-top-5">
          <loadingData v-if="loading"></loadingData>
          <div v-else class="bg1 p-3">
            <div class="row">
              <div class="col-md">
                <h5
                  class="color-main font-weight-bold"
                  style="margin-top: 5px; font-size: 15px"
                >
                  QUY TRÌNH
                </h5>
              </div>
            </div>
            <div v-if="msgDetail == ''">
              <div
                class="mt-3"
                v-for="(item, index) in detailProcess"
                :key="index"
              >
                <div class="row">
                  <div class="col-md-2 col-sm-2 col-3 pr-0 text-center">
                    <img
                      :src="item.image"
                      alt="photo"
                      style="width: 100px; height: 100px; border-radius: 16px; object-fit: cover;"
                    />
                  </div>
                  <div class="col-md-8 col-sm-8 col-6">
                    <div class="bg1 pt-3 pl-3 pr-3 pb-0 h-100">
                      <h6 class="font-weight-bold color-main">
                        BƯỚC {{ index + 1 }}: {{ item.title }}
                      </h6>
                      <span>
                        {{ item.description }}
                      </span>
                    </div>
                  </div>
                  <div class="col-md-2 col-sm-2 col-3 pl-0 text-center">
                    <!-- <div
                      style="cursor: pointer"
                      class="bg1 p-1 color-main detail"
                    >
                      Xem video
                    </div> -->
                    <div
                      style="cursor: pointer"
                      class="bg1 p-1 mt-2 color-main detail"
                      data-toggle="modal"
                      data-target="#editStep"
                      @click="editStep(item.id)"
                    >
                      Chỉnh sửa
                    </div>
                    <div
                      style="cursor: pointer"
                      class="bg1 p-1 mt-2 color-main detail"
                      @click="deleteProcess(item.id)"
                    >
                      Xoá bước
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else>
              <div class="bg1 p-3 text-center">
                <b>{{ msgDetail }}</b>
              </div>
            </div>
            <div class="mt-4 text-center">
              <span
                data-toggle="modal"
                data-target="#addStep"
                class="inputx hover color-main"
                @click="addStep.service_id = chiTietId"
                >+ Thêm bước</span
              >
            </div>
          </div>
        </div>
        <!-- Hoá chất sử dụng -->
        <div class="col-md-3 text-center margin-top-5">
          <loadingData v-if="loading"></loadingData>
          <div v-else class="bg1 p-2">
            <div class="bg">
              <div
                class="color-main font-weight-bold pt-2 pb-2 text-center"
                style="font-size: 14px"
              >
                HOÁ CHẤT SỬ DỤNG
              </div>
            </div>
            <div class="row p-1 mt-2" v-if="msgHoaChat == ''">
              <div
                class="col-md-12 col-sm-6 col-6 margin-top-5 mt-2 hoverimageComment"
                v-for="(item, index) in sulphite"
                :key="index"
              >
                <div class="row mt-2">
                  <div class="col-md-3 col-sm-3 col-3">
                    <img
                      :src="item.image"
                      alt="photo"
                      style="width: 35px; border-radius: 4px; object-fit: cover;"
                    />
                  </div>
                  <div
                    class="col-md-9 col-sm-9 col-9 font-weight-bold"
                    style="display: flex; align-items: center"
                  >
                    {{ item.title }}
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
                            data-target="#suaHoaChat"
                            @click="editHoaChat(item.id)"
                          >
                            <span>Chỉnh sửa</span>
                          </div>
                          <div
                            class="hover"
                            @click="deleteHoaChat(item.id)"
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

                    <!-- Chỉnh sửa hoá chất -->
                    <div
                      class="modal fade"
                      id="suaHoaChat"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div
                        class="modal-dialog"
                        style="top: 20%"
                        role="document"
                      >
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              Chỉnh sửa hoá chất
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
                          <div class="modal-body row">
                            <div class="col-4">
                              <span v-if="urlHoaChat">
                                <img
                                  :src="urlHoaChat"
                                  alt=""
                                  style="width: 100px; height: 100px"
                                />
                                <div
                                  class="remove-file"
                                  style="
                                      position: absolute;
                                      top: -18px;
                                      right: 20px;
                                      cursor: pointer;
                                    "
                                  v-on:click="removeFileEdit(index)"
                                >
                                  <img
                                    src="../../../../assets/image/xx.png"
                                    alt=""
                                    style="z-index: 100"
                                  />
                                </div>
                              </span>
                              <span v-else>
                                <input
                                  type="file"
                                  id="fileEdit"
                                  hidden
                                  @change="onFileChangeEditHoaChat"
                                />
                                <label for="fileEdit" class="addImage"
                                  >Thêm ảnh</label
                                >
                              </span>
                            </div>
                            <div class="col-8">
                              <textarea
                                v-model="hoaChat.title"
                                style="width: 100%"
                              ></textarea>
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
                            <button
                              @click="submitSulphite"
                              type="submit"
                              class="btn btn-primary"
                            >
                              Lưu
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- ================= -->
                  </div>
                </div>
              </div>
            </div>
            <div class="p-1 mt-2 text-center" v-else>
              <b>{{ msgHoaChat }}</b>
            </div>
            <!-- Thêm hoá chất -->
            <div class="mt-4 mb-3 text-center">
              <span
                data-toggle="modal"
                data-target="#addHoaChat"
                class="inputx hover color-main"
                @click="themHoaChat"
                >+ Thêm hoá chất</span
              >
            </div>
            <!-- ============ -->
          </div>
        </div>
      </div>
    </div>

    <!-- Thêm bước -->
    <div
      class="modal fade"
      id="addStep"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document" style="top: 20%">
        <form @submit.prevent="addSteps">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Thêm bước</h5>
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
              <div class="row">
                <div class="form-group col-8">
                  <label class="col-form-label">Tên bước:</label>
                  <input
                    type="text"
                    class="form-control"
                    style="outline: none"
                    v-model="addStep.title"
                  />
                </div>
                <div class="col-4">
                  <span v-if="url">
                    <img
                      :src="url"
                      alt=""
                      style="width: 100px; height: 100px"
                    />
                    <div
                      class="remove-file"
                      style="
                        position: absolute;
                        top: -18px;
                        right: 40px;
                        cursor: pointer;
                      "
                      v-on:click="removeFile(index)"
                    >
                      <img
                        src="../../../../assets/image/xx.png"
                        alt=""
                        style="z-index: 100"
                      />
                    </div>
                  </span>
                  <span v-else>
                    <input
                      type="file"
                      id="file1"
                      hidden
                      @change="onFileChange"
                    />
                    <label for="file1" class="addImage">Thêm ảnh</label>
                  </span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-form-label">Mô tả:</label>
                <textarea
                  class="form-control"
                  rows="5"
                  v-model="addStep.description"
                ></textarea>
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
              <button type="submit" @click="submitFile" class="btn btn-primary">
                Lưu
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- =================== -->

    <!-- sửa bước -->
    <div
      class="modal fade"
      id="editStep"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document" style="top: 20%">
        <form @submit.prevent="editStep">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Sửa bước</h5>
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
              <div class="row">
                <div class="form-group col-8">
                  <label class="col-form-label">Tên bước:</label>
                  <input
                    type="text"
                    class="form-control"
                    style="outline: none"
                    v-model="suaBuoc.title"
                  />
                </div>
                <div class="col-4">
                  <span v-if="urlEdit">
                    <img
                      :src="urlEdit"
                      alt=""
                      style="width: 100px; height: 100px"
                    />
                    <div
                      class="remove-file"
                      style="
                        position: absolute;
                        top: -18px;
                        right: 40px;
                        cursor: pointer;
                      "
                      v-on:click="removeFileStepEdit(index)"
                    >
                      <img
                        src="../../../../assets/image/xx.png"
                        alt=""
                        style="z-index: 100"
                      />
                    </div>
                  </span>
                  <span v-else>
                    <input
                      type="file"
                      id="fileEdit1x"
                      hidden
                      @change="onFileChangeEdit"
                    />
                    <label for="fileEdit1x" class="addImage">Thêm ảnh</label>
                  </span>
                </div>
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Mô tả:</label>
                <textarea
                  class="form-control"
                  rows="5"
                  id="message-text"
                  v-model="suaBuoc.description"
                ></textarea>
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
              <button
                type="submit"
                @click="submitSuaBuoc"
                class="btn btn-primary"
              >
                Lưu
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- =================== -->

    <!-- Thêm hoá chất -->
    <div
      class="modal fade"
      id="addHoaChat"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document" style="top: 20%">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Thêm hoá chất</h5>
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
            <div class="row">
              <div class="form-group col-8">
                <label class="col-form-label">Tên hoá chất:</label>
                <input
                  type="text"
                  class="form-control"
                  style="outline: none"
                  v-model="addHoaChat.title"
                />
              </div>
              <div class="col-4">
                <span v-if="urlHoaChat">
                  <img
                    :src="urlHoaChat"
                    alt=""
                    style="width: 100px; height: 100px"
                  />
                  <div
                    class="remove-file"
                    style="
                      position: absolute;
                      top: -18px;
                      right: 40px;
                      cursor: pointer;
                    "
                    v-on:click="xoaAnhHoaChat(index)"
                  >
                    X
                  </div>
                </span>
                <span v-else>
                  <input type="file" id="file2" hidden @change="anhHoaChat" />
                  <label for="file2" class="addImage">Thêm ảnh</label>
                </span>
              </div>
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
            <button
              type="submit"
              @click="submitHoaChat"
              class="btn btn-primary"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- =================== -->
  </div>
</template>

<script>
import { HTTP } from "@/main";
import loadingData from "@/components/loadingData";
export default {
  name: "quyTrinhLamViec",
  components: {
    loadingData,
  },
  data() {
    return {
      loading: true,
      hasData: false,
      listStore: {},
      salon_id: "",
      active: "1",
      chiTietId: "",
      WorkingProcess: {},
      detailProcess: {},
      sulphite: {},
      addStep: {
        title: "",
        description: "",
        service_id: "",
        image: "",
      },
      addHoaChat: {
        service_id: "",
        title: "",
        image: "",
      },
      url: "",
      urlHoaChat: "",
      msgDetail: "",
      msgHoaChat: "",
      hoaChat: {
        title: "",
        description: "",
      },
      idHoaChat: "",
      suaBuoc: {
        title: "",
        description: "",
      },
      updateSuaBuoc: {},
      idSuaBuoc: "",
      urlEdit: "",
      editStepImage: "",
      editHoaChatImage: "",
    };
  },
  beforeMount() {
    this.listWorkingProcess();
    this.getListStore();
  },
  methods: {
    // danh sách các quy trình
    listWorkingProcess() {
      HTTP.get(
        `/salon/main/manage/working_process/listservicebysalon?salon_id=${this.salon_id}`
      )
        .then((res) => {
          this.WorkingProcess = res.data.data.data;
          // console.log(this.WorkingProcess);
          this.chiTietId = this.WorkingProcess[0].id;
          this.detailWorkingProcess();
          this.detailSulphite();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // =====================
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
        this.loading = false;
      });
    },
    // ====================
    // Thay đổi salon
    changeSalon() {
      this.loading = true;
      this.listWorkingProcess();
    },
    // =====================

    // Thay đổi quy trình
    changeProcess(index) {
      this.loading = true;
      this.chiTietId = index;
      this.detailWorkingProcess();
      this.detailSulphite();
    },
    // =====================

    // chi tiết các bước quy trình
    detailWorkingProcess() {
      HTTP.get(
        `/salon/main/manage/working_process/showworkingprocess/${this.chiTietId}`
      )
        .then((res) => {
          let result = res.data;
          // console.log(result);
          if (result.status === 1) {
            this.loading = false;
            this.msgDetail = "";
            this.detailProcess = res.data.data.data;
          } else {
            this.msgDetail = "chưa có các bước!!!";
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // =====================
    // chỉnh sửa bước trong quy trình
    editStep(value) {
      HTTP.get(`/salon/main/manage/working_process/detail-step/${value}`).then(
        (res) => {
          let result = res.data;
          // console.log(result);
          if (result.status === 1) {
            this.suaBuoc = result.data;
            this.urlEdit = this.suaBuoc.image;
            this.idSuaBuoc = this.suaBuoc.id;
          }
        }
      );
    },
    onFileChangeEdit(e) {
      this.editStepImage = e.target.files[0];
      this.urlEdit = URL.createObjectURL(this.editStepImage);
    },
    removeFileStepEdit() {
      this.urlEdit = "";
      this.editStepImage = null;
    },
    submitSuaBuoc() {
      let formData = new FormData();
      formData.append("title", this.suaBuoc.title);
      formData.append("description", this.suaBuoc.description);
      if (this.editStepImage != "") {
        formData.append("image", this.editStepImage);
      }
      HTTP.post(
        `/salon/main/manage/working_process/updateworkingprocess/${this.idSuaBuoc}`,
        formData
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.$swal("", result.message, "success");
          this.detailWorkingProcess();
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // ============================

    // ==============PHẦN HOÁ CHẤT=================
    // danh sách hoá chất
    detailSulphite() {
      HTTP.get(
        `/salon/main/manage/working_process/showsulphite/${this.chiTietId}`
      )
        .then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.msgHoaChat = "";
            this.sulphite = res.data.data;
          } else {
            this.msgHoaChat = "chưa có hoá chất!!!";
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // =================
    // Thêm hoá chất
    themHoaChat() {
      this.addHoaChat.service_id = this.chiTietId;
      this.addHoaChat.title = "";
      this.urlHoaChat = "";
    },
    anhHoaChat(e) {
      this.addHoaChat.image = e.target.files[0];
      this.urlHoaChat = URL.createObjectURL(this.addHoaChat.image);
    },
    xoaAnhHoaChat() {
      this.urlHoaChat = "";
    },
    submitHoaChat() {
      let formData = new FormData();

      formData.append("title", this.addHoaChat.title);
      formData.append("image", this.addHoaChat.image);
      formData.append("service_id", this.addHoaChat.service_id);
      HTTP.post(`/salon/main/manage/working_process/addsulphite`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          // this.content = "";
          this.$swal("", result.message, "success");
          this.detailSulphite();
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // =============

    // Sửa hoá chất
    editHoaChat(value) {
      this.idHoaChat = value;
      HTTP.get(
        `/salon/main/manage/working_process/detail-sulphite/${value}`
      ).then((res) => {
        let result = res.data;
        // console.log(result);
        if (result.status === 1) {
          this.hoaChat = result.data;
          this.urlHoaChat = this.hoaChat.image;
        }
      });
    },

    onFileChangeEditHoaChat(e) {
      this.editHoaChatImage = e.target.files[0];
      this.urlHoaChat = URL.createObjectURL(this.editHoaChatImage);
    },
    removeFileEdit() {
      this.urlHoaChat = "";
      this.editHoaChatImage = null;
    },
    submitSulphite() {
      let formData = new FormData();
      formData.append("title", this.hoaChat.title);
      formData.append("description", this.hoaChat.description);
      if (this.editHoaChatImage != "") {
        formData.append("image", this.editHoaChatImage);
      }
      HTTP.post(
        `/salon/main/manage/working_process/updatesulphite/${this.idHoaChat}`,
        formData
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.hoaChat.title = "";
          this.hoaChat.description = "";
          this.hoaChat.image = "";
          this.urlHoaChat = "";
          this.$swal("", result.message, "success");
          this.detailSulphite();
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // ===============

    // Xoá hoá chất
    deleteHoaChat(index) {
      this.$swal({
        title: "Xoá hoá chất?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete(
            `/salon/main/manage/working_process/deletesulphite/${index}`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.$swal("Đã xoá!", result.message, "success");
              this.detailSulphite();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    // =============
    // =======hết phần hoá chất=================

    // thêm bước
    onFileChange(e) {
      this.addStep.image = e.target.files[0];
      this.url = URL.createObjectURL(this.addStep.image);
    },
    removeFile() {
      this.url = "";
    },
    submitFile() {
      let formData = new FormData();

      formData.append("title", this.addStep.title);
      formData.append("description", this.addStep.description);
      formData.append("service_id", this.addStep.service_id);
      formData.append("image", this.addStep.image);
      HTTP.post(
        `/salon/main/manage/working_process/addworkingprocess`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.addStep.title = "";
          this.addStep.description = "";
          this.addStep.image = "";
          this.url = "";
          this.$swal("", result.message, "success");
          this.detailWorkingProcess();
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // ====================

    // Xoá Bước
    deleteProcess(index) {
      this.$swal({
        title: "Xoá bước?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          let conversationId = index;
          HTTP.delete(
            `/salon/main/manage/working_process/deleteworkingprocess/${index}`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.$swal("Đã xoá!", result.message, "success");
              this.detailWorkingProcess();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    // ==================
  },
};
</script>

<style scoped>
* {
  font-size: 14px;
}
.input,
input {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 5px 10px;
  outline: none;
}
.addImage {
  padding: 30px;
  font-size: 14px;
  border-radius: 16px;
  text-align: center;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

ul li {
  display: inline-block;
}

.bg {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 47px;
  color: #d4476f;
}

.bg1 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}

.detail:hover {
  background-color: #d4476f;
  color: white;
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

li a {
  display: block;
  color: #d4476f;
  text-align: center;
  padding: 0.5rem 1em;
  text-decoration: none;
  cursor: pointer;
}

.tab-pane {
  font-size: 14px;
}

li a:hover {
  color: #d4476f;
  text-decoration: none;
}

.menu-right h5:hover {
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  color: #d4476f;
}
.bg table td {
  vertical-align: middle;
  padding: 5px 10px;
}
.active .bg {
  background: #d4476f !important;
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
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.imageComment {
  position: absolute;
  top: -3px;
  right: 5px;
  display: none;
}
.hoverimageComment:hover .imageComment {
  display: block !important;
}
</style>
