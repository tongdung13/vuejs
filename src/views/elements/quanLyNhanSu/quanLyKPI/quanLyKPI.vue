<template>
  <div class="col-md-10 res mb-5 mt-3">
    <!-- <div v-if="loading1" class="text-center color-main" style="font-size: 130%">Đang chờ cập nhật!!!</div> -->
    <div>
      <div class="row">
        <div class="col-md-12 col-sm-12 col-12">
          <select
            class="inputx mr-3 res-margin-0"
            style="width: 30%; outline: none"
          >
            <option value="">Tất cả salon</option>
          </select>
          <router-link :to="{ name: 'themKPI' }">
            <span class="inputx hover color-main mr-3">+ Sửa KPI</span>
          </router-link>
          <span class="inputx hover color-main">Xuất báo cáo</span>
        </div>
      </div>
      <div class="mt-4">
        <h5 class="color-main font-weight-bold" style="font-size: larger">
          QUẢN LÝ KPI
        </h5>
        <div class="row m-0">
          <ul class="nav nav-pills mb-3 w-100" id="pills-tab" role="tablist">
            <li class="nav-item width-33" style="width: 25%">
              <a
                class="box mt-5 mr-4 active nav-link font-weight-bold"
                id="pills-profile-tab"
                data-toggle="pill"
                href="#pills-profile"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                <div>
                  <div class="text-center" style="position: relative">
                    <span
                      class="bgc p-3"
                      style="
                      border-radius: 50%;
                      position: absolute;
                      transform: translate(-50%, -50%);
                    "
                    >
                      <img
                        src="../../../../assets/image/sale1.png"
                        alt=""
                        style="width: 35px"
                        class="width-28"
                      />
                    </span>
                    <div
                      class="color1 pb-1 font-weight-bold"
                      style="padding-top: 2.5rem; font-size: 14px"
                    >
                      BỘ PHẬN BÁN HÀNG
                    </div>
                  </div>
                  <!-- </router-link> -->
                </div>
              </a>
            </li>
            <li class="nav-item width-33" style="width: 25%">
              <a
                class="box mt-5 mr-4 nav-link font-weight-bold"
                id="pills-contact-tab"
                data-toggle="pill"
                href="#pills-contact"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
              >
                <div>
                  <div class="text-center" style="position: relative">
                    <span
                      class="bgc p-3"
                      style="
                      border-radius: 50%;
                      position: absolute;
                      transform: translate(-50%, -50%);
                    "
                    >
                      <img
                        src="../../../../assets/image/customer.png"
                        alt=""
                        style="width: 35px"
                        class="width-28"
                      />
                    </span>
                    <div
                      class="color1 pb-1 font-weight-bold"
                      style="padding-top: 2.5rem; font-size: 14px"
                    >
                      BỘ PHẬN MARKETING
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li class="nav-item width-33" style="width: 25%">
              <a
                class="box mt-5 mr-4 nav-link font-weight-bold"
                id="pills-four-tab"
                data-toggle="pill"
                href="#pills-four"
                role="tab"
                aria-controls="pills-four"
                aria-selected="false"
              >
                <div>
                  <!-- <router-link to="/quanLyKhachHang/khachHangDoanhSo"> -->
                  <div class="text-center" style="position: relative">
                    <span
                      class="bgc p-3"
                      style="
                      border-radius: 50%;
                      position: absolute;
                      transform: translate(-50%, -50%);
                    "
                    >
                      <img
                        src="../../../../assets/image/sale1.png"
                        alt=""
                        style="width: 35px"
                        class="width-28"
                      />
                    </span>
                    <div
                      class="color1 pb-1 font-weight-bold"
                      style="padding-top: 2.5rem; font-size: 14px"
                    >
                      BỘ PHẬN THỢ CHÍNH
                    </div>
                  </div>
                  <!-- </router-link> -->
                </div>
              </a>
            </li>
            <li class="nav-item width-33" style="width: 25%">
              <a
                class="box mt-5 nav-link font-weight-bold"
                id="pills-five-tab"
                data-toggle="pill"
                href="#pills-five"
                role="tab"
                aria-controls="pills-five"
                aria-selected="false"
              >
                <div>
                  <div class="text-center" style="position: relative">
                    <span
                      class="bgc p-3"
                      style="
                      border-radius: 50%;
                      position: absolute;
                      transform: translate(-50%, -50%);
                    "
                    >
                      <img
                        src="../../../../assets/image/customer.png"
                        alt=""
                        style="width: 35px"
                        class="width-28"
                      />
                    </span>
                    <div
                      class="color1 pb-1 font-weight-bold"
                      style="padding-top: 2.5rem; font-size: 14px"
                    >
                      BỘ PHẬN THỢ PHỤ
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <!-- Xem theo tuần/tháng/quý/năm -->
          <div class="mt-2 mb-2">
            <div>
              <input class="ml-2" checked type="radio" id="tuan" name="contact" value="Tuần" />
              <label class="ml-1 font-weight-bold" for="tuan">Tuần</label>

              <input
                class="ml-3"
                type="radio"
                id="thang"
                name="contact"
                value="Tháng"
              />
              <label class="ml-1 font-weight-bold" for="thang">Tháng</label>

              <input
                class="ml-3"
                type="radio"
                id="quy"
                name="contact"
                value="Quý"
              />
              <label class="ml-1 font-weight-bold" for="quy">Quý</label>

              <input
                class="ml-3"
                type="radio"
                id="nam"
                name="contact"
                value="Năm"
              />
              <label class="ml-1 font-weight-bold" for="nam">Năm</label>
            </div>
          </div>
          <!-- =========================== -->
          <div class="tab-content w-100" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <boPhanBanHang />
            </div>
            <div
              class="tab-pane fade"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
            >
              <boPhanMarketing />
            </div>
            <div
              class="tab-pane fade"
              id="pills-four"
              role="tabpanel"
              aria-labelledby="pills-four-tab"
            >
              <boPhanThoChinh />
            </div>
            <div
              class="tab-pane fade"
              id="pills-five"
              role="tabpanel"
              aria-labelledby="pills-five-tab"
            >
              <boPhanThoPhu />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import loadingData from "@/components/loadingData";
import boPhanBanHang from "./boPhanBanHang";
import boPhanMarketing from "./boPhanMarketing";
import boPhanThoChinh from "./boPhanThoChinh";
import boPhanThoPhu from "./boPhanThoPhu";
export default {
  components: {
    boPhanBanHang,
    boPhanMarketing,
    boPhanThoChinh,
    boPhanThoPhu,
    loadingData,
  },
  name: "quanLyKPI",
  data() {
    return {};
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}

.active .color1 {
  color: white;
}

.tab-pane {
  background: rgba(255, 255, 255, 0) !important;
}

.bg {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
}

.bg1 {
  background: #d4476f;
  border-radius: 8px !important;
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.bg2 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 47px;
}
.bg3x {
  border: 1px solid rgba(53, 53, 53, 0.56);
  width: 100%;
  height: 10px;
  border-radius: 8px;
}
.bg3 {
  height: 8px;
  background: #d4476f;
  border-radius: 8px;
}

ul {
  padding-left: 0;
}

ul li {
  display: inline-block;
}

.box {
  /* width: 200px; */
  /* height: 50px; */
  background: white;
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
}
table td {
  vertical-align: middle;
}
.bgc {
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}

.box img {
  border-radius: 50%;
}

.color1 {
  color: #1f1c8a;
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
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background: linear-gradient(to right, blue, indigo) !important;
}
@media only screen and (max-width: 768px) {
  .width-28 {
    width: 28px !important;
  }
  .width-33 {
    width: 33.33% !important;
  }
  .width-100 {
    width: 100% !important;
  }
}
</style>
