<template>
  <div class="col-md-10 res mb-5 mt-3">
    <select
      name="salon_id"
      class="inputx mr-3 res-margin-0"
      id="cars"
      style="width: 30%; outline: none"
      v-model="salon_id"
      @change="onChange()"
    >
      <option value="">Tất cả salon</option>

      <option v-for="salon in listStore" :key="salon.id" :value="salon.id">
        {{ salon.salon_name }}
      </option>
    </select>
    <!-- <a>
      <span class="inputx hover color-main">Xuất báo cáo</span>
    </a> -->
    <!-- ==== -->

    <div class="mt-4">
      <h5 class="color-main font-weight-bold">BÁO CÁO BÁN HÀNG</h5>
      <div class="mt-3 row">
        <div class="col-md-3 col-sm-6 col-6 margin-top-5">
          <div class="bg-16 bbb">
            <div class="row p-2  pl-3 pr-3">
              <div class="col-md-9 col-sm-9 col-8 pr-1">
                <p
                  class="font-weight-bold"
                  style="cursor: pointer; margin-bottom: 0px; font-size: 14px"
                >
                  DOANH SỐ
                </p>
                <img
                  src="../../../assets/image/arow.png"
                  alt=""
                  style="width: 17px"
                />
                <span style="color: #289e49; font-weight: bold">
                  + {{ formatPercen(sales.percent) }}</span
                >
                <p
                  style="
                    font-size: 18px;
                    font-weight: bold;
                    margin-top: 8px;
                    margin-bottom: 0px;
                  "
                >
                  {{ formatPrice(sales.total) }}
                </p>
              </div>
              <div class="col-md-3 col-sm-3 col-3 p-0 mt-2 text-center">
                <span class="bg pt-3 pb-3 p-1">
                  <span
                    style="
                      background: rgba(212, 71, 111, 0.15);
                      padding: 11px 4px;
                      border-radius: 8px;
                    "
                  >
                    <img
                      src="../../../assets/image/Group3600.png"
                      alt=""
                      style="padding: 5px; width: 30px"
                    />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 col-sm-6 col-6 margin-top-5">
          <div class="bg-16 bbb">
            <div class="row p-2 pl-3 pr-3">
              <div class="col-md-9 col-sm-9 col-8 pr-1">
                <p
                  class="font-weight-bold"
                  style="cursor: pointer; margin-bottom: 0px; font-size: 14px"
                >
                  ĐƠN HÀNG
                </p>
                <img
                  src="../../../assets/image/arow.png"
                  alt=""
                  style="width: 17px"
                />
                <span style="color: #289e49; font-weight: bold">
                  +{{ formatPercen(order.percent) }}</span
                >
                <p
                  style="
                    font-size: 18px;
                    font-weight: bold;
                    margin-top: 8px;
                    margin-bottom: 0px;
                  "
                >
                  {{ order.total + " đơn hàng" }}
                </p>
              </div>
              <div class="col-md-3 col-sm-3 col-3 p-0 mt-2 text-center">
                <span class="bg pt-3 pb-3 p-1">
                  <span
                    style="
                      background: rgba(212, 71, 111, 0.15);
                      padding: 11px 4px;
                      border-radius: 8px;
                    "
                  >
                    <img
                      src="../../../assets/image/view1.3.png"
                      alt=""
                      style="width: 30px; padding: 5px"
                    />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 col-sm-6 col-6 margin-top-5">
          <div class="bg-16 bbb">
            <div class="row p-2 pl-3 pr-3">
              <div class="col-md-9 col-sm-9 col-8 pr-1">
                <p
                  class="font-weight-bold"
                  style="cursor: pointer; margin-bottom: 0px; font-size: 14px"
                >
                  LỊCH HẸN
                </p>
                <img
                  src="../../../assets/image/arow.png"
                  alt=""
                  style="width: 17px"
                />
                <span style="color: #289e49; font-weight: bold">
                  +{{ formatPercen(appointment.percent) }}</span
                >
                <p
                  style="
                    font-size: 18px;
                    font-weight: bold;
                    margin-top: 8px;
                    margin-bottom: 0px;
                  "
                >
                  {{ appointment.total + " lịch hẹn" }}
                </p>
              </div>
              <div class="col-md-3 col-sm-3 col-3 p-0 mt-2 text-center">
                <span class="bg pt-3 pb-3 p-1">
                  <span
                    style="
                      background: rgba(212, 71, 111, 0.15);
                      padding: 11px 4px;
                      border-radius: 8px;
                    "
                  >
                    <img
                      src="../../../assets/image/view1.2.png"
                      alt=""
                      style="width: 30px; padding: 5px"
                    />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 col-sm-6 col-6 margin-top-5">
          <div class="bg-16 bbb">
            <div class="row p-2 pl-3 pr-3">
              <div class="col-md-9 col-sm-9 col-8 pr-1">
                <p
                  class="font-weight-bold"
                  style="cursor: pointer; margin-bottom: 0px; font-size: 14px"
                >
                  LƯỢT THEO DÕI
                </p>
                <img
                  src="../../../assets/image/arow.png"
                  alt=""
                  style="width: 17px"
                />
                <span style="color: #289e49; font-weight: bold">
                  +{{ formatPercen(follow.percent) }}</span
                >

                <p
                  style="
                    font-size: 18px;
                    font-weight: bold;
                    margin-top: 8px;
                    margin-bottom: 0px;
                  "
                >
                  {{ follow.total + " lượt" }}
                </p>
              </div>
              <div class="col-md-3 col-sm-3 col-3 p-0 mt-2 text-center">
                <span class="bg pt-3 pb-3 p-1">
                  <span
                    style="
                      background: rgba(212, 71, 111, 0.15);
                      padding: 11px 4px;
                      border-radius: 8px;
                    "
                  >
                    <img
                      src="../../../assets/image/view1.1.png"
                      alt=""
                      style="width: 30px; padding: 5px"
                    />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-md-7">
          <div class="bg-16 pl-3 pt-2 pr-3">
            <div class="row">
              <div class="col-md-4 col-sm-4 col-4">
                <span
                  class="color-main"
                  style="font-weight: bold; font-size: 18px"
                  >Doanh số</span
                >
              </div>
              <div class="col-md-8 col-sm-8 col-8">
                <input
                  type="date"
                  id="start"
                  name="trip-start"
                  value="2018-07-22"
                  min="2018-01-01"
                  max="2018-12-31"
                />
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-md-12">
                <ul
                  class="nav nav-pills mb-3 w-100"
                  id="pills-tab"
                  role="tablist"
                >
                  <li class="nav-item">
                    <a
                      class="nav-link active font-weight-bold"
                      id="pills-home-tab"
                      data-toggle="pill"
                      href="#pills-home"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      Theo tuần
                    </a>
                  </li>
                  <li class="nav-item" @click="getMonth">
                    <a
                      class="nav-link font-weight-bold"
                      id="pills-profile-tab"
                      data-toggle="pill"
                      href="#pills-profile"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      Theo tháng
                    </a>
                  </li>
                  <li class="nav-item" @click="getYear">
                    <a
                      class="nav-link font-weight-bold"
                      id="pills-contact-tab"
                      data-toggle="pill"
                      href="#pills-contact"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      Theo năm
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-md-12">
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade active show"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div v-if="bdDuong != ''">
                      <bieuDoDuong :dataBdDuong="bdDuong" />
                    </div>
                  </div>
                  <div
                    class="tab-pane"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    <div v-if="bdDuongThang != ''">
                      <bieuDoThang :dataBdDuongThang="bdDuongThang" />
                    </div>
                  </div>
                  <div
                    class="tab-pane"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                  >
                    <div v-if="bdDuongNam != ''">
                      <bieuDoNam :dataBdDuongNam="bdDuongNam" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class=" bg-16 col-md-5 p-3">
          <span class="color-main" style="font-weight: bold; font-size: 18px">
            Phân tích
          </span>
          <div class="mt-3">
            <div v-if="bdTron != ''">
              <bieuDoTron :input="bdTron" />
              <div class="text-center mt-2" style="color: #A5009E">
                Đơn hàng Offline: <b>{{ priceOrderOff }} đơn</b>
              </div>
              <div class="text-center mt-3" style="color: #0066FF">
                Đơn hàng Online: <b>{{ priceOrderOn }} đơn</b>
              </div>
              <div class="text-center mt-3" style="color: #FF6028">
                Đặt lịch Online: <b>{{ priceAtpoiOn }} đơn</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-6 col-sm-6 col-6">
          <h6 class="color-main">DỊCH VỤ CUNG CẤP</h6>
        </div>
        <div class="col-md-6 col-sm-6 col-6" style="text-align: right">
          <span class="border-main"> + Thêm dịch vụ</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bieuDoDuong from "../banHangVaMarketing/bieuDo/bieuDoDuong";
import bieuDoThang from "../banHangVaMarketing/bieuDo/bieuDoThang";
import bieuDoNam from "../banHangVaMarketing/bieuDo/bieuDoNam";
import bieuDoTron from "../banHangVaMarketing/bieuDo/bieuDoTron";
import { HTTP, formatPrice } from "@/main";
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
export default {
  name: "baoCaoBanHang",
  components: {
    bieuDoDuong,
    bieuDoThang,
    bieuDoNam,
    bieuDoTron,
    Vue3ChartJs,
  },
  data() {
    return {
      bdTron: [],
      bdDuong: [],
      bdDuongThang: [],
      bdDuongNam: [],
      salon_id: "",
      sales: {},
      follow: {},
      order: {},
      appointment: {},
      listStore: [],
      loading: true,
      hasData: false,
      priceOrderOn: "",
      priceOrderOff: "",
      priceAtpoiOn: "",
    };
  },
  beforeMount() {
    this.reportSale();
    this.getListStore();
  },
  methods: {
    onChange() {
      this.bdTron = [];
      this.reportSale();
    },
    reportSale() {
      HTTP.get(
        `/salon/main/manage/reportSales?salon_id=${this.salon_id}&type=1`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let firt = result.data.this_month_with_last_month;
          this.follow = firt.follow;
          this.sales = firt.sales;
          this.order = firt.order;
          this.appointment = firt.appointment;
          let analysis = result.data.chart_analysis;
          if (analysis != "") {
            this.bdTron.push(analysis.order_offline.percent);
            this.bdTron.push(analysis.appointment_online.percent);
            this.bdTron.push(analysis.order_online.percent);
            this.priceOrderOff = analysis.order_offline.count;
            this.priceOrderOn = analysis.order_online.count;
            this.priceAtpoiOn = analysis.appointment_online.count;
          }
          let dataDuong = result.data.chart_sales;
          if (dataDuong != "") {
            this.bdDuong.push(dataDuong[0].total);
            this.bdDuong.push(dataDuong[1].total);
            this.bdDuong.push(dataDuong[2].total);
            this.bdDuong.push(dataDuong[3].total);
            this.bdDuong.push(dataDuong[4].total);
            this.bdDuong.push(dataDuong[5].total);
            this.bdDuong.push(dataDuong[6].total);
          }
        }
        this.loading = false;
      });
    },
    getMonth() {
      HTTP.get(
        `/salon/main/manage/reportSales?salon_id=${this.salon_id}&type=2`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let dataDuongThang = result.data.chart_sales;
          if (dataDuongThang != "") {
            this.bdDuongThang.push(dataDuongThang[0].total);
            this.bdDuongThang.push(dataDuongThang[1].total);
            this.bdDuongThang.push(dataDuongThang[2].total);
            this.bdDuongThang.push(dataDuongThang[3].total);
            this.bdDuongThang.push(dataDuongThang[4].total);
          }
        }
      });
    },
    getYear() {
      HTTP.get(
        `/salon/main/manage/reportSales?salon_id=${this.salon_id}&type=3`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let dataDuongNam = result.data.chart_sales;
          if (dataDuongNam != "") {
            this.bdDuongNam.push(dataDuongNam[0].total);
            this.bdDuongNam.push(dataDuongNam[1].total);
            this.bdDuongNam.push(dataDuongNam[2].total);
            this.bdDuongNam.push(dataDuongNam[3].total);
            this.bdDuongNam.push(dataDuongNam[4].total);
            this.bdDuongNam.push(dataDuongNam[5].total);
            this.bdDuongNam.push(dataDuongNam[6].total);
            this.bdDuongNam.push(dataDuongNam[7].total);
            this.bdDuongNam.push(dataDuongNam[8].total);
            this.bdDuongNam.push(dataDuongNam[9].total);
            this.bdDuongNam.push(dataDuongNam[10].total);
            this.bdDuongNam.push(dataDuongNam[11].total);
          }
        }
      });
    },
    formatPercen(value) {
      if (value == null) {
        return " Chưa có dữ liệu";
      } else return value.toFixed(2) + " %";
    },
    formatPrice,
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
  },
};
</script>
<style scoped>
.font-14 {
  font-size: 14px;
}

span {
  font-size: 14px;
}

.input,
input {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 3px 10px;
  outline: none;
}

input[type="date"] {
  padding: 0 !important;
  font-size: 14px;
  outline: none;
  text-align: right;
  float: right;
  border: 1px solid #289e49;
}

a {
  text-decoration: none;
  color: #06b70d;
}

#pills-tab li {
  width: 33.33%;
  text-align: center;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #289e49;
  background-color: white;
  border-bottom: 5px solid #289e49;
}

.nav-pills .nav-link {
  border-radius: 0px;
}

.border-main {
  border: 1px solid #d4476f;
  padding: 0.3rem 1rem;
  border-radius: 4px;
}

::placeholder {
  color: #d4476f;
}

.bg-16 {
  background: #ffffff;
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}

.table td,
.table th {
  padding: 4px;
  font-size: 14px;
}
</style>
