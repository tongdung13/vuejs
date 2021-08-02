<template>
  <div class="col-md-10 res mb-5 mt-3">
    <div v-if="noti.msg != ''" class="mt-4 text-center">
      <b>{{ noti.msg }}</b>
    </div>
    <div v-else>
      <div class="mt-4">
        <div class="row">
          <div class="col-md-7">
            <h5 class="color-main" style="font-size: 150%">
              {{ posts.salon_name }}
            </h5>
            <span class="font-12">
              {{ posts.salon_address }}
            </span>
          </div>
          <div class="col-md-5">
            <div class="col-sm-12 pr-0" style="text-align: right">
              <span class="dropdown" style="float: right">
                <span class="dropbtn">
                  <img
                    src="../../../../assets/image/more-horizontal.png"
                    alt=""
                    style="width: 33px"
                    class="border1 p-1 input"
                  />
                </span>
                <div class="dropdown-content">
                  <router-link
                    :to="{
                      name: 'danhGiaSalon',
                      params: { brandID },
                    }"
                  >
                    <span>Danh sách đánh giá</span></router-link
                  >
                  <router-link
                    :to="{
                      name: 'chinhSuaSalon',
                      params: { brandID },
                    }"
                  >
                    <span>Chỉnh sửa</span></router-link
                  >
                  <div @click="deleteBrand">
                    <span class="text-danger">Xoá</span>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6 pl-4">
          <!-- <div v-if="listimages.length > 0">
            <carousel :items-to-show="1">
              <slide v-for="(item, index) in listimages" :key="index">
                <img :src="item.link_image" alt="" />
              </slide>
              <template #addons>
                <navigation />
                <pagination />
              </template>
            </carousel>
          </div>
          <div v-else></div> -->
          <img
            :src="posts.salon_cover_image"
            alt=""
            style="width: 100%; height: 325px; object-fit: cover; border-radius: 16px"
          />
        </div>
        <div class="col-md-6">
          <div class="bg-white p-3" style="border-radius: 16px">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <td class="font-weight-bold">Ngày tạo</td>
                  <td style="text-align: right" class="color-main">
                    {{ formatDate(posts.created_at) }}
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Số sản phẩm</td>
                  <td style="text-align: right" class="color-main">
                    {{ detail.product }} Sản phẩm
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Hotline</td>
                  <td style="text-align: right" class="color-main">
                    {{ posts.salon_hotline }}
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Email</td>
                  <td style="text-align: right" class="color-main">
                    {{ posts.salon_email }}
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Số đơn hàng</td>
                  <td style="text-align: right" class="color-main">
                    {{ posts.order }}
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Tỷ lệ phản hồi trung bình</td>
                  <td style="text-align: right" class="color-main">9 giờ</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Đánh giá trung bình</td>
                  <td style="text-align: right" class="color-main">
                    {{ detail.star }} sao
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Tỷ lệ thành công</td>
                  <td style="text-align: right" class="color-main">80%</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Lượt ghé thăm</td>
                  <td style="text-align: right" class="color-main">
                    {{ detail.views }} Lượt
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Danh sách dịch vụ -->
      <div class="row mt-3">
        <div class="col-md-6">
          <h6 class="color-main">DỊCH VỤ CUNG CẤP</h6>
        </div>
        <div class="col-md-6" style="text-align: right">
          <router-link
            v-if="brandID"
            :to="{
              name: 'themDichVu',
              params: { addServiceId: brandID },
            }"
          >
            <span class="borderx  hover" style="float: right; cursor: pointer">
              Thêm dịch vụ
            </span>
          </router-link>
        </div>
      </div>
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
                  class="bgc p-0"
                  style="
                  border-radius: 50%;
                  position: absolute;
                  transform: translate(30%, -50%);
                "
                >
                  <img
                    :src="serviceSalon.image"
                    alt="photo"
                    style="width: 50px; height: 50px; border-radius: 50%"
                    class="width-28"
                  />
                </span>
                <div class="text-right pr-2 pt-2">
                  <button
                    v-if="serviceSalon.status === 1"
                    @click="changeStatus(serviceSalon.service_id)"
                    class="input1 color-main mr-2"
                    style="font-size: 12px; cursor: pointer"
                  >
                    Ẩn
                  </button>
                  <button
                    v-else
                    @click="changeStatus(serviceSalon.service_id)"
                    class="input1 color-main mr-2"
                    style="font-size: 12px; cursor: pointer"
                  >
                    Hiện
                  </button>
                  <button class="mr-2" style="cursor: pointer; border: none">
                    <img
                      src="../../../../assets/image/x.png"
                      alt=""
                      style="margin-top: -2px"
                      @click="deleteService(serviceSalon.id)"
                    />
                  </button>
                </div>
                <div
                  class="color1 pb-1 pl-2 pr-2 pb-3"
                  style="padding-top: 1rem; font-size: 12px"
                >
                  <span class="font-weight-bold">
                    {{ serviceSalon.title }}
                  </span>
                  <div class="color-main font-weight-bold">
                    {{ formatPrice(serviceSalon.price) }}
                  </div>
                  <br />
                  <div class="text-right mt-3">
                    <router-link :to="{ name: 'quyTrinhLamViec' }">
                      <span class="input hover" style="cursor: pointer">
                        Quy trình
                      </span>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ====================== -->
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatDate, formatPrice } from "@/main";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
export default {
  name: "chiTietThietKeSalon",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      posts: [],
      detail: [],
      errors: [],
      date123: "",
      brandID: "",
      listServiceSalon: {},
      listimages: {},
      registerServices: {},
      serviceFormat: {
        title: "",
        link_image: "",
        slug: "",
      },
      noti: {
        msg: "",
        status: "",
      },
    };
  },
  created() {
    // Chi tiết salon
    this.brandID = this.$route.params.salonId;
    HTTP.get(`/salon/main/manage/branch/${this.brandID}/detail`)
      .then((response) => {
        let result = response.data;
        if (result.status === 1) {
          this.posts = response.data.data;
          this.listimages = this.posts.listImage;
          this.detail = this.posts.amount;
        } else {
          this.noti.msg = result.message;
        }
      })
      .catch((e) => {
        this.errors.push(e);
      });
    // =======================
  },
  beforeMount() {
    this.listServices();
  },
  methods: {
    // Danh sách các dịch vụ salon theo salon ID
    listServices() {
      HTTP.get(`/salon/main/manage/service?salonId=${this.brandID}`)
        .then((response) => {
          this.listServiceSalon = response.data.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // ===================

    // ẩn dịch vụ
    changeStatus(serviceId) {
      this.$swal({
        title: "Ẩn/Hiện dịch vụ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm!",
      }).then((result) => {
        if (result.value) {
          let id = window.location.href.slice(
            window.location.href.indexOf("/chi-tiet-thiet-ke-salon/") + 25,
            window.location.href.length
          );

          HTTP.get(
            `/salon/main/manage/service/status?salonId=${id}&serviceId=${serviceId}`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.$swal("Đã ẩn!", result.message, "success");
              this.listServices();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    // xoá dịch vụ salon đã đăng ký
    deleteService(serviceId) {
      this.$swal({
        title: "Xoá dịch vụ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xoá!",
      }).then((result) => {
        if (result.value) {
          let id = window.location.href.slice(
            window.location.href.indexOf("/chi-tiet-thiet-ke-salon/") + 25,
            window.location.href.length
          );

          HTTP.delete(
            `/salon/main/manage/service/delete?salonId=${id}&serviceId=${serviceId}`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.$swal("Đã xoá dịch vụ!", result.message, "success");
              this.listServices();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    // đăng ký dịch vụ
    registerSer() {
      // let salon_id = this.registerServices.salonId;
      // console.log(salon_id);
      HTTP.post(`/salon/main/manage/service/store`, this.registerServices).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            this.$swal("", result.message, "success");
            this.listServices();
          } else {
            this.$swal("", result.message, "error");
          }
        }
      );
    },
    // Xoá chi nhánh
    deleteBrand() {
      this.$swal({
        title: "Xoá chi nhánh?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          let deleteID = window.location.href.slice(
            window.location.href.indexOf("/chi-tiet-thiet-ke-salon/") + 25,
            window.location.href.length
          );
          HTTP.delete(`/salon/main/manage/branch/${deleteID}/delete`).then(
            (res) => {
              let result = res.data;
              if (result.status === 1) {
                this.$swal("Đã xoá!", result.message, "success");
                setTimeout(function() {
                  history.back();
                }, 1000);
              } else {
                this.$swal("", result.message, "error");
              }
            }
          );
        }
      });
    },
    // =============
    formatDate,
    formatPrice,
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
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
.color-main {
  color: #d4476f;
}
.dropbtn {
  color: white;
  border: none;
  cursor: pointer;
}

.dropdown-content div {
  color: black;
  cursor: pointer;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content div:hover {
  background-color: #f1f1f1;
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

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.bgc {
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}
a {
  text-decoration: none;
  color: black;
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
.table {
  font-size: 14px;
}

.table td {
  padding: 5px 10px;
}

.border-main {
  border: 1px solid #d4476f;
  padding: 0.3rem 1rem;
  border-radius: 4px;
}

.borderx {
  border: 1px solid #d4476f;
  padding: 5px 25px;
  border-radius: 4px;
  cursor: pointer;
}
.carousel__pagination {
  padding: 0;
}
::placeholder {
  color: #d4476f;
}
.opacity {
  opacity: 0.5;
}
</style>
