<template>
  <div class="col-md-10 mb-5 res mt-3">
    <select
      name="salon_id"
      class="inputx mr-3 res-margin-0"
      id="cars"
      style="width: 30%; outline: none"
      v-model="salon_id"
      @change="onChange()"
    >
      <!-- <option value="">Tất cả salon</option> -->

      <option v-for="salon in listStore" :key="salon.id" :value="salon.id">
        {{ salon.salon_name }}
      </option>
    </select>
    <!-- <router-link :to="{ name: 'themDichVu' }">
      <span class="inputx hover color-main">Thêm dịch vụ</span>
    </router-link> -->
    <div
      class="mt-3 pb-3"
      style="background: rgba(255, 255, 255, 0.4); border-radius: 16px"
    >
      <div>
        <div>
          <div class="group-tabs">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation">
                <a
                  @click="statusAll"
                  href="#home"
                  aria-controls="home"
                  role="tab"
                  data-toggle="tab"
                  class="active"
                  style="border-top-left-radius: 16px"
                >
                  <span>Tất cả</span>
                </a>
              </li>
              <li role="presentation">
                <a role="tab" data-toggle="tab" @click="statusService">
                  <span>Sẵn sàng phục vụ</span>
                </a>
              </li>
              <li role="presentation">
                <a
                  @click="statusStop"
                  href="#messages"
                  aria-controls="messages"
                  role="tab"
                  data-toggle="tab"
                >
                  <span>Đã tạm dừng</span>
                </a>
              </li>
            </ul>

            <!-- Tab panes -->
            <div class="mt-3 pl-3 pr-3">
              <div
                style="
                  border: none !important;
                  color: black !important;
                "
              >
                <div class="mt-3">
                  <div class="mt-3 mb-2">
                    <span
                      class="color-main font-weight-bold"
                      style="font-size: 125%"
                    >
                      DANH SÁCH DỊCH VỤ
                    </span>
                    <!-- <span
                      class="input text-white"
                      style="float: right; background: #d4476f; cursor: pointer"
                      data-toggle="modal"
                      data-target="#registerService"
                    >
                      Đăng ký thêm dịch vụ
                    </span> -->
                    <router-link
                      v-if="salon_id"
                      :to="{
                        name: 'themDichVu',
                        params: { addServiceId: salon_id },
                      }"
                    >
                      <span
                        class="borderx  hover"
                        style="float: right; cursor: pointer"
                      >
                        Thêm dịch vụ
                      </span>
                    </router-link>

                    <!-- Đăng ký thêm dịch vụ -->
                    <!-- <div class="modal fade" id="registerService" role="dialog">
                      <div class="modal-dialog" style="top: 25%">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h4 class="float-left text-left">
                              Danh sách các dịch vụ
                            </h4>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                            >
                              &times;
                            </button>
                          </div>
                          <form @submit.prevent="registerSer">
                            <div
                              class="color-main mt-2 ml-3 mb-3"
                              v-for="(item, index) in formatService"
                              :key="index"
                            >
                              <b style="font-size: 120%">{{ item.title }}</b>
                              <button
                                type="submit"
                                style="float: right"
                                class="borderx hover mr-2"
                                @click="
                                  registerServices.serviceId = item.id;
                                  registerServices.salonId = salon_id;
                                "
                              >
                                Đăng ký
                              </button>
                            </div>
                          </form>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-default"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div> -->
                  </div>
                </div>

                <loadingData v-if="loading"></loadingData>
                <div v-if="hasData">
                  <div v-if="msg == ''" class="table-responsive mt-4">
                    <!-- Hiển thị các dich vụ đã đăng ký -->
                    <div class="row">
                      <div
                        :class="{
                          opacity: serviceSalon.status === 2,
                        }"
                        class="col-md-3 col-sm-4 col-12"
                        v-for="(serviceSalon, index) in listServiceSalon"
                        :key="index"
                      >
                        <div>
                          <div class="box1" style="position: relative">
                            <div>
                              <span
                                class="bgc p-1"
                                style="
                                border-radius: 50%;
                                position: absolute;
                                transform: translate(30%, -50%);
                              "
                              >
                                <img
                                  alt="photo"
                                  style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;"
                                  class="width-28"
                                  :src="serviceSalon.image"
                                />
                              </span>
                              <div class="text-right pr-2 pt-2">
                                <button
                                  v-if="serviceSalon.status === 1"
                                  class="input1 hover color-main mr-3"
                                  style="cursor: pointer"
                                  @click="changeService(serviceSalon.id)"
                                >
                                  Ẩn
                                </button>
                                <button
                                  v-else
                                  class="input1 hover color-main mr-3"
                                  style="cursor: pointer"
                                  @click="changeService(serviceSalon.id)"
                                >
                                  Hiện
                                </button>
                                <button
                                  class="input1 hover color-main"
                                  style="cursor: pointer"
                                  @click="deleteService(serviceSalon.id)"
                                >
                                  Xoá
                                </button>
                              </div>
                              <div
                                class="color1 pb-1 pl-2 pr-2 pb-3"
                                style="padding-top: 1rem;"
                              >
                                <span class="font-weight-bold">
                                  {{ serviceSalon.title }}
                                </span>
                                <br />
                                <div class="color-main mt-2 font-weight-bold">
                                  {{ formatPrice(serviceSalon.price) }}
                                </div>
                                <div class="mt-2 text-overflow-2">
                                  {{ serviceSalon.description }}
                                </div>
                                <div class="row">
                                  <div class="col-6">
                                    <div class="mt-3">
                                      <router-link
                                        :to="{ name: 'quyTrinhLamViec' }"
                                      >
                                        <span
                                          class="input hover"
                                          style="cursor: pointer"
                                        >
                                          Quy trình
                                        </span>
                                      </router-link>
                                    </div>
                                  </div>
                                  <div class="col-6">
                                    <div class="text-right mt-3">
                                      <router-link
                                        :to="{
                                          name: 'capNhatDichVu',
                                          params: {
                                            updateId: serviceSalon.id,
                                            salonId: salon_id,
                                          },
                                        }"
                                      >
                                        <span
                                          class="input hover"
                                          style="cursor: pointer"
                                        >
                                          Chỉnh sửa
                                        </span>
                                      </router-link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- ====================== -->
                  </div>
                  <div v-else class="text-center">
                    <b>{{ msg }}</b>
                  </div>
                </div>
              </div>
              <div
                role="tabpanel"
                class="tab-pane"
                id="profile"
                style="
                  border: none !important;
                  color: black !important;
                  background-color: rgba(255, 255, 255, 0.4);
                "
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP, formatPrice } from "@/main";
import loadingData from "@/components/loadingData";
export default {
  name: "quanLyDichVu",
  components: {
    loadingData,
  },
  data() {
    return {
      loading: true,
      hasData: false,
      salon_id: "",
      listStore: {},
      service: {},
      msg: "",
      listServiceSalon: {},
      status: "",
    };
  },
  beforeMount() {
    this.getListStore();
  },
  methods: {
    // Thay đổi salon
    onChange() {
      this.listServices();
    },
    // ====================

    // Thay đổi trạng thái
    statusAll() {
      this.status = "";
      this.listServices();
    },
    statusService() {
      this.status = 1;
      this.listServices();
    },
    statusStop() {
      this.status = 2;
      this.listServices();
    },
    // ===================

    // Danh sách các dịch vụ salon theo salon ID
    listServices() {
      this.loading = true;
      this.hasData = false;
      HTTP.get(
        `/salon/main/manage/service?salonId=${this.salon_id}&status=${this.status}`
      )
        .then((res) => {
          let result = res.data;
          // console.log(result);
          if (result.status === 1) {
            this.loading = false;
            this.hasData = true;
            this.listServiceSalon = result.data;
            console.log(this.listServiceSalon);
            if (this.listServiceSalon.length === 0) {
              this.msg = "Salon chưa đăng ký dịch vụ!!!";
            } else this.msg = "";
          } else {
            this.notification.status = true;
            this.notification.message = result.message;
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // ===================
    // danh sach các salon
    getListStore() {
      HTTP.get("/salon/main/manage/branch/all").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listStore = data;
            this.salon_id = this.listStore[0].id;
            this.listServices();
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },

    // Huỷ dịch vụ đã đăng ký
    deleteService(index) {
      this.$swal({
        title: "Xoá dịch vụ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xoá!",
      }).then((result) => {
        if (result.value) {
          // let employeeId = index;
          HTTP.delete(
            `/salon/main/manage/service/delete?salonId=${this.salon_id}&serviceId=${index}`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.$swal("Đã xoá!", result.message, "success");
              this.listServices();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    // ======================

    // thay đổi trạng thái dịch vụ
    changeService(index) {
      HTTP.get(
        `/salon/main/manage/service/status?salonId=${this.salon_id}&serviceId=${index}`
      )
        .then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.$swal("Thay đổi trạng thái", result.message, "success");
            this.listServices();
          } else {
            this.$swal("", result.message, "error");
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // registerSer() {
    //   HTTP.post(
    //     `/salon/main/manage/service/register`,
    //     this.registerServices
    //   ).then((res) => {
    //     let result = res.data;

    //     if (result.status === 1) {
    //       this.$swal("", result.message, "success");
    //       this.listServices();
    //     } else {
    //       this.$swal("", result.message, "error");
    //     }
    //   });
    // },

    // ===========================
    formatPrice,
  },
};
</script>
<style scoped>
* {
  font-size: 14px !important;
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
.pagination li a {
  padding: 0.5rem 1rem !important;
}

li a {
  display: block;
  color: black;
  text-align: center;
  padding: 0.25rem 1em;
  text-decoration: none;
  cursor: pointer;
}

.tab-pane {
  font-size: 14px;
}

a {
  color: #d4476f;
}

.border-main {
  border: 1px solid #d4476f;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.56);
}

li a:hover {
  color: #d4476f;
  text-decoration: none;
}

.active {
  background-color: rgba(212, 71, 111, 0.1);
  border-bottom: 2px solid #d4476f;
  color: #d4476f;
}

::placeholder {
  color: #d4476f;
}
.borderx {
  border: 1px solid #d4476f;
  padding: 5px 25px;
  border-radius: 4px;
  cursor: pointer;
}
.box1 {
  margin-top: 40px;
  max-width: 250px;
  background: white;
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
button {
  background: white;
}
.input1 {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 3px 10px;
  outline: none;
}

.bgc {
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}
.table-responsive {
  overflow-x: hidden;
}
.opacity {
  opacity: 0.5;
}
.text-overflow-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
