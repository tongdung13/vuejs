<template>
  <div class="mt-3 w-100">
    <div style="width: 18.3%; float: left" class="width-100">
      <div class="row">
        <div class="col-md-12 col-sm-6 col-6">
          <div style="cursor: pointer">
            <div
              class="box text-center"
              @click="changeTarget(1)"
              :class="[{ activeBox: target_type == 1 }]"
            >
              <div class="row p-2">
                <div class="col-md-4 col-sm-4 col-4">
                  <span>
                    <img
                      src="../../../../assets/image/scissor1.png"
                      alt=""
                      class="bg1"
                      style="padding: 7px"
                    />
                  </span>
                </div>
                <div class="col-md-8 col-sm-8 col-8 text-left p-0">
                  <span>DOANH THU</span><br />
                  <span v-if="target.sales" class="color-main">
                    {{ formatPrice(target.sales) }}
                  </span>
                  <span v-else class="color-main">
                    Chưa có mục tiêu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-sm-6 col-6 mt-2">
          <div style="cursor: pointer">
            <div
              class="box text-center"
              @click="changeTarget(2)"
              :class="[{ activeBox: target_type == 2 }]"
            >
              <div class="row p-2">
                <div class="col-md-4 col-sm-4 col-4">
                  <span>
                    <img
                      src="../../../../assets/image/scissor1.png"
                      alt=""
                      class="bg1"
                      style="padding: 7px"
                    />
                  </span>
                </div>
                <div class="col-md-8 col-sm-8 col-8 text-left p-0">
                  <span>TĂNG ĐƠN</span><br />
                  <span v-if="target.orders" class="color-main">
                    {{ target.orders + " Đơn" }}
                  </span>
                  <span v-else class="color-main">
                    Chưa có mục tiêu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-sm-6 col-6 mt-2">
          <div style="cursor: pointer">
            <div
              class="box text-center"
              @click="changeTarget(3)"
              :class="[{ activeBox: target_type == 3 }]"
            >
              <div class="row p-2">
                <div class="col-md-4 col-sm-4 col-4">
                  <span>
                    <img
                      src="../../../../assets/image/scissor1.png"
                      alt=""
                      class="bg1"
                      style="padding: 7px"
                    />
                  </span>
                </div>
                <div class="col-md-8 col-sm-8 col-8 text-left p-0">
                  <span>PHỤC VỤ</span><br />
                  <span v-if="target.serving_quantity" class="color-main">
                    {{ target.serving_quantity }} Khách
                  </span>
                  <span v-else class="color-main">
                    Chưa có mục tiêu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-sm-6 col-6 mt-2">
          <div style="cursor: pointer">
            <div
              class="box text-center"
              @click="changeTarget(4)"
              :class="[{ activeBox: target_type == 4 }]"
            >
              <div class="row p-2">
                <div class="col-md-4 col-sm-4 col-4">
                  <span>
                    <img
                      src="../../../../assets/image/scissor1.png"
                      alt=""
                      class="bg1"
                      style="padding: 7px"
                    />
                  </span>
                </div>
                <div class="col-md-8 col-sm-8 col-8 text-left p-0">
                  <span>DATA KHÁCH</span><br />
                  <span v-if="target.customers_numbers" class="color-main">
                    {{ target.customers_numbers }} Đơn
                  </span>
                  <span v-else class="color-main">
                    Chưa có mục tiêu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-sm-6 col-6 mt-2">
          <div style="cursor: pointer">
            <div
              class="box text-center"
              @click="changeTarget(5)"
              :class="[{ activeBox: target_type == 5 }]"
            >
              <div class="row p-2">
                <div class="col-md-4 col-sm-4 col-4">
                  <span>
                    <img
                      src="../../../../assets/image/scissor1.png"
                      alt=""
                      class="bg1"
                      style="padding: 7px"
                    />
                  </span>
                </div>
                <div class="col-md-8 col-sm-8 col-8 text-left p-0">
                  <span>KHÁCH HÀNG MỚI</span><br />
                  <span v-if="target.new_customers_numbers" class="color-main">
                    {{ target.new_customers_numbers }} khách
                  </span>
                  <span v-else class="color-main">
                    Chưa có mục tiêu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="float: right; width: 80%" class="box width-100">
      <div class="p-3">
        <div class="row">
          <div class="col-md">
            <h5>KPI BỘ PHẬN THỢ PHỤ</h5>
          </div>
        </div>
        <div v-if="msg != ''" class="w-100 text-center font-weight-bold">
          {{ msg }}
        </div>
        <div v-else>
          <table
            class="table table-striped text-left table-borderless"
            style="font-weight: 100"
          >
            <thead>
              <tr>
                <!-- <th style="text-align: right !important;"></th> -->
                <th colspan="2" style="text-align: center; width: 15%">
                  Họ và tên
                </th>
                <th style="width: 10%" class="text-center">KPI</th>
                <th style="width: 15%" class="text-center">Mục tiêu</th>
                <th style="width: 15%;" class="text-center">Đạt được</th>
                <th style="width: 30%" class="text-center">Tiến độ</th>
                <th colspan="2" style="width: 15%" class="text-center">
                  Đạt được(%)
                </th>
              </tr>
            </thead>
            <tbody style="font-weight: 700">
              <tr v-for="(item, index) in kpi" :key="index">
                <td style="text-align: right !important" class="pt-1">
                  <img
                    :src="item.avatar"
                    alt=""
                    style="width: 33px; height: 33px;"
                  />
                </td>
                <td>{{ item.name }}</td>
                <td class="text-center">{{ item.target }}</td>
                <td class="text-center">{{ formatNumber(item.index) }}</td>
                <td class="text-center">{{ formatNumber(item.total) }}</td>
                <td class="text-center">
                  <div class="bg3x">
                    <div
                      class="bg3"
                      :style="{ width: item.percent + '%' }"
                    ></div>
                  </div>
                </td>
                <td class="pl-3 text-center">
                  <span>{{ item.percent.toFixed(2) + "%" }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP, formatPrice, formatNumber } from "@/main";
export default {
  name: "boPhanBanHang",
  data() {
    return {
      target_type: 1,
      target: [],
      kpi: [],
      msg: "",
    };
  },
  beforeMount() {
    this.getList();
  },
  methods: {
    getList() {
      HTTP.get(
        `/salon/main/manage/kpi?position=6&target_type=${this.target_type}`
      )
        .then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.target = result.data.target;
            if (result.data.kpi.length > 0) {
              this.kpi = result.data.kpi;
            } else this.msg = "Chưa có KPI!!!";
            // console.log(this.target);
            console.log(this.kpi);
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    changeTarget(value) {
      this.msg = "";
      this.target_type = value;
      this.getList();
    },
    formatPrice,
    formatNumber,
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}

input:checked ~ .checkmark {
  background-color: #d4476f;
}

.active {
  background-color: #4423ff !important;
  /* background: linear-gradient(#8F41FF 50%, #4423FF 100%); */
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
.activeBox {
  color: #fff;
  background: linear-gradient(to right, blue, indigo) !important;
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

.color-main {
  color: #d4476f;
}

input[type="checkbox"]:after {
  width: 15px;
  height: 15px;
  /* border-radius: 15px; */
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  border: 2px solid white;
}

input[type="checkbox"]:checked:after {
  width: 15px;
  height: 15px;
  /* border-radius: 15px; */
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #d4476f;
  content: "";
  display: inline-block;
  /* visibility: visible; */
  border: 2px solid white;
}
.table td, .table th {
  padding: 0.5rem !important;
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
