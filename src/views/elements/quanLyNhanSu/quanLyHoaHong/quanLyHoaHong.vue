<template>
  <div class="col-md-10 res mb-2 mt-3">
    <div class="row">
      <div class="col-md-8 col-sm-12 col-12">
        <select
          name="salon_id"
          class="inputx mr-3 res-margin-0"
          style="width: 30%; outline: none"
          v-model="salon_id"
          @click="changeSalon(salon_id)"
        >
          <option value="">Tất cả salon</option>

          <option v-for="salon in listStore" :key="salon.id" :value="salon.id">
            {{ salon.salon_name }}
          </option>
        </select>
        <router-link :to="{ name: 'themHoaHong' }">
          <span class="inputx hover color-main mr-3">+ Thêm hoa hồng</span>
        </router-link>
        <span class="inputx hover color-main">Xuất báo cáo</span>
      </div>
      <!-- <div class="col-md-4 div sm-12 col-12">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng"
          style="
            width: 50%;
            position: relative;
            float: right;
            padding: 4px 10px;
          "
          class="margin-top-5 float-left-0"
        />
        <i
          class="fa fa-search color-main"
          style="position: absolute; top: 9px; right: 55px"
        ></i>
      </div> -->
    </div>
    <div class="mt-4">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-4">
          <h5 class="color-main font-weight-bold" style="font-size: 16px">
            QUẢN LÝ HOA HỒNG
          </h5>
        </div>
        <div class="col-md-6 col-sm-6 col-8" style="text-align: right">
          <!-- <div style="text-align: right">
            <span class="input">
              <img src="../../../../assets/image/Group1.png" alt="" />
              30/08/2020 - 02/09/2020
            </span>
          </div> -->
        </div>
      </div>
    </div>
    <div class="mt-3">
      <div class="row">
        <div class="col-md-2 col-sm-12 col-12">
          <b class="color-main" style="font-size: 110%">Danh sách nhân viên</b>
          <div class="row">
            <div
              class="col-md-12 col-sm-6 col-6 mt-3"
              v-for="(item, index) in list_employee"
              :key="index"
            >
              <div
                v-if="item.id != 2"
                class="bg"
                style="cursor: pointer"
                @click="changeUserId(item.id)"
                :class="{ active: parameters.userId === item.id }"
              >
                <div class="row p-1">
                  <div class="col-md-3 col-sm-3 col-3">
                    <img
                      :src="item.link_avatar"
                      alt=""
                      style="
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        object-fit: cover;
                      "
                    />
                  </div>
                  <div
                    class="col-md-9 col-sm-9 col-9 font-weight-bold"
                    style="display: flex; align-items: center"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7 col-sm-12 col-12 margin-top-5">
          <div class="bg1 p-3 mb-3">
            <h6 class="color-main font-weight-bold mt-2">CHI TIẾT HOA HỒNG</h6>
            <loadingData v-if="loading"></loadingData>
            <div v-if="hasData" class="mt-3">
              <div
                v-if="msg != ''"
                class="mt-3 color-main text-center"
                style="font-size: 120%"
              >
                <b>{{ msg }}</b>
              </div>
              <div v-else class="row">
                <div class="col-md-3 text-center">
                  <img
                    :src="detailEmployee.avatar"
                    alt=""
                    style="
                      width: 120px;
                      height: 120px;
                      border-radius: 50%;
                      object-fit: cover;
                    "
                  />
                  <div class="mt-2 color-main text-center font-weight-bold">
                    {{ detailEmployee.name }}
                  </div>
                </div>
                <div class="col-md-9">
                  <div>
                    <div id="accordion"></div>
                    <div id="accordion">
                      <div
                        id="headingTwo2"
                        class="bg p-2"
                        style="cursor: pointer"
                      >
                        <h5 class="mb-0">
                          <div
                            data-toggle="collapse"
                            data-target="#collapseTwo2"
                            aria-expanded="false"
                            aria-controls="#collapseTwo2"
                          >
                            HOA HỒNG THEO DỊCH VỤ
                            <span style="float: right">
                              <img
                                src="../../../../assets/image/Polygon8.png"
                                alt=""
                                style="width: 14px"
                              />
                            </span>
                          </div>
                        </h5>
                      </div>
                      <div
                        id="collapseTwo2"
                        class="collapse show"
                        aria-labelledby="headingTwo2"
                        data-parent="#accordion"
                      >
                        <div class="card-body p-0">
                          <table
                            class="table table-borderless mt-2"
                            style="font-size: 500"
                          >
                            <tbody>
                              <tr
                                v-for="(item, index) in commission_service"
                                :key="index"
                              >
                                <td
                                  scope="row"
                                  class="pl-0"
                                  style="
                                    padding-top: 6px !important;
                                    width: 35%;
                                  "
                                >
                                  <img
                                    :src="item.image"
                                    alt=""
                                    style="
                                      width: 35px;
                                      height: 35px;
                                      border-radius: 50%;
                                      object-fit: cover;
                                    "
                                  />
                                  <b class="ml-2">{{ item.title }}</b>
                                </td>
                                <td>{{ item.amount }}</td>
                                <td style="width: 25%">
                                  {{ formatPrice(item.price) }}
                                </td>
                                <td
                                  style="width: 25%"
                                  class="color-main text-right pr-0"
                                >
                                  {{ formatPrice(item.commission) }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div id="accordion">
                      <div
                        id="headingThree3"
                        class="bg p-2 mt-3"
                        style="cursor: pointer"
                      >
                        <h5 class="mb-0">
                          <div
                            data-toggle="collapse"
                            data-target="#collapseThree3"
                            aria-expanded="false"
                            aria-controls="#collapseThree3"
                          >
                            HOA HỒNG THEO SẢN PHẨM
                            <span style="float: right">
                              <img
                                src="../../../../assets/image/Polygon8.png"
                                alt=""
                                style="width: 14px"
                              />
                            </span>
                          </div>
                        </h5>
                      </div>
                      <div
                        id="collapseThree3"
                        class="collapse show"
                        aria-labelledby="headingThree3"
                        data-parent="#accordion"
                      >
                        <div class="card-body p-0">
                          <table
                            class="table table-borderless mt-2"
                            style="font-size: 500"
                          >
                            <tbody>
                              <tr
                                v-for="(item, index) in commission_product"
                                :key="index"
                              >
                                <td
                                  scope="row"
                                  class="pl-0"
                                  style="
                                    padding-top: 6px !important;
                                    width: 35%;
                                  "
                                >
                                  <img
                                    :src="item.image"
                                    alt=""
                                    style="
                                      width: 35px;
                                      height: 35px;
                                      border-radius: 50%;
                                      object-fit: cover;
                                    "
                                  />
                                  <b class="ml-2">{{ item.name }}</b>
                                </td>
                                <td>{{ item.amount }}</td>
                                <td style="width: 25%">
                                  {{ formatPrice(item.price) }}
                                </td>
                                <td
                                  style="width: 25%"
                                  class="color-main text-right pr-0"
                                >
                                  {{ formatPrice(item.commission) }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div id="accordion">
                      <div
                        id="headingFour4"
                        class="bg p-2 mt-3"
                        style="cursor: pointer"
                      >
                        <h5 class="mb-0">
                          <div
                            data-toggle="collapse"
                            data-target="#collapseFour4"
                            aria-expanded="false"
                            aria-controls="#collapseFour4"
                          >
                            HOA HỒNG THEO MỐC CHI TIÊU
                            <span style="float: right">
                              <img
                                src="../../../../assets/image/Polygon8.png"
                                alt=""
                                style="width: 14px"
                              />
                            </span>
                          </div>
                        </h5>
                      </div>
                      <div
                        id="collapseFour4"
                        class="collapse show"
                        aria-labelledby="headingFour4"
                        data-parent="#accordion"
                      >
                        <div class="card-body p-0">
                          <table
                            class="table table-borderless mt-2"
                            style="font-size: 500"
                          >
                            <tbody>
                              <tr
                                v-for="(item, index) in commission_sale"
                                :key="index"
                              >
                                <td
                                  scope="row"
                                  class="pl-0"
                                  style="
                                    padding-top: 6px !important;
                                    width: 35%;
                                  "
                                >
                                  <b class="ml-2">{{ item.name }}</b>
                                </td>
                                <td>{{ item.money }}</td>
                                <td
                                  style="width: 25%"
                                  class="color-main text-right pr-0"
                                >
                                  {{ formatPrice(item.commission) }}
                                </td>
                              </tr>
                              <tr
                                v-for="(item, index) in commission_serve"
                                :key="index"
                              >
                                <td
                                  scope="row"
                                  class="pl-0"
                                  style="
                                    padding-top: 6px !important;
                                    width: 35%;
                                  "
                                >
                                  <b class="ml-2">{{ item.name }}</b>
                                </td>
                                <td>{{ item.amount }}</td>
                                <td>{{ item.money }}</td>
                                <td
                                  style="width: 25%"
                                  class="color-main text-right pr-0"
                                >
                                  {{ formatPrice(item.commission) }}
                                </td>
                              </tr>
                              <!-- <tr>
                                <td colspan="2">
                                  {{
                                    commission_target.commission_customer[0]
                                      .name
                                  }}
                                </td>
                                <td colspan="2" class="text-right color-main pr-0">
                                  {{
                                    formatPrice(
                                      commission_target.commission_customer[0]
                                        .money
                                    )
                                  }}
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2">
                                  {{
                                    commission_target.commission_new_customer[0]
                                      .name
                                  }}
                                </td>
                                <td colspan="2" class="text-right color-main pr-0">
                                  {{
                                    formatPrice(
                                      commission_target
                                        .commission_new_customer[0].money
                                    )
                                  }}
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2">
                                  {{
                                    commission_target.commission_sale[0].name
                                  }}
                                </td>
                                <td colspan="2" class="text-right color-main pr-0">
                                  {{
                                    formatPrice(
                                      commission_target.commission_sale[0].money
                                    )
                                  }}
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2">
                                  {{
                                    commission_target.commission_serve[0].name
                                  }}
                                </td>
                                <td colspan="2" class="text-right color-main pr-0">
                                  {{
                                    formatPrice(
                                      commission_target.commission_serve[0]
                                        .money
                                    )
                                  }}
                                </td>
                              </tr>
                              <tr> -->
                              <!-- <td colspan="2">
                                  {{
                                    commission_target
                                      .commission_singer_increase[0].name
                                  }}
                                </td>
                                <td colspan="2" class="text-right color-main pr-0">
                                  {{
                                    formatPrice(
                                      commission_target
                                        .commission_singer_increase[0].money
                                    )
                                  }} -->
                              <!-- </td>
                              </tr> -->
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div class="bg mt-3">
                      <div
                        class="color-main font-weight-bold pt-2 pb-2"
                        style="font-size: 14px"
                      >
                        <div class="row p-0">
                          <div class="col-md-6 color-main pl-4">
                            TỔNG THƯỞNG
                          </div>
                          <div class="col-md-6 color-main text-right pr-4">
                            {{ formatPrice(total) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-12 col-12 text-center margin-top-5">
          <div class="bg1 p-2">
            <div class="bg">
              <div
                class="color-main font-weight-bold pt-2 pb-2 text-center"
                style="font-size: 14px"
              >
                THỐNG KÊ
              </div>
            </div>
            <div class="menu-right">
              <h5
                style="font-size: 13px"
                class="p-3 mt-2"
                v-for="(item, index) in listSalon"
                :key="index"
              >
                {{ item.salon_name }}: {{ item.total }} Thưởng
              </h5>
            </div>
            <div class="bg">
              <div
                class="color-main font-weight-bold pt-2 pb-2 text-center"
                style="font-size: 14px"
              >
                <div class="row">
                  <div class="col-4 color-main pr-0">TỔNG</div>
                  <div class="col-8 pl-0 color-main text-right pr-4">
                    {{ formatPrice(totalSalon) }}
                  </div>
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
import loadingData from "@/components/loadingData";
import { formatPrice } from "@/main";
export default {
  name: "quanLyHoaHong",
  components: {
    loadingData,
  },
  data() {
    return {
      msg: "",
      loading: true,
      hasData: false,
      salon_id: "",
      listCommission: {},
      commission_product: {},
      commission_service: {},
      commission_sale: {},
      commission_serve: {},
      commission_singer_increase: {},
      commission_customer: {},
      commission_new_customer: {},
      commission_target: {},
      list_employee: {},
      listSalon: {},
      listStore: {},
      parameters: {
        userId: "",
        salon_id: "",
        type: "",
      },
      total: "",
      totalSalon: "",
      detailEmployee: {},
    };
  },
  created() {
    this.getListStore();
    this.listEmployees();
  },
  methods: {
    // Danh sách hoa hồng
    listCommissions() {
      HTTP.get(
        `/salon/main/manage/commission?user_id=${this.parameters.userId}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.hasData = true;
          this.loading = false;
          let data = result.data;
          this.total = data.total_person;
          this.totalSalon = data.total_salon;
          this.commission_product = data.commission_product;
          this.commission_service = data.commission_service;
          this.commission_sale = data.commission_sale;
          this.commission_serve = data.commission_serve;
          this.commission_singer_increase = data.commission_singer_increase;
          this.commission_customer = data.commission_customer;
          this.commission_new_customer = data.commission_new;
          this.listSalon = data.list_salon;
          this.commission_target = data;
          if (
            this.commission_product.length == 0 &&
            this.commission_service.length == 0
          ) {
            this.msg = "Chưa có hoa hồng!!!";
          } else this.msg = "";
          // this.list_salon = data.list_salon;
        }

        this.loading = false;
      });
    },
    // ============================

    // danh sách nhân viên
    listEmployees() {
      HTTP.get(
        `/salon/main/manage/employee?salon_id=${this.parameters.salon_id}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;
          this.list_employee = data.data;
          this.parameters.userId = this.list_employee[0].id;
          this.listCommissions();
          this.listDetailEmployees();
        }
      });
    },
    // ===================

    // Chi tiết nhân viên
    listDetailEmployees() {
      if (this.parameters.userId) {
        HTTP.get(
          `/salon/main/manage/employee/${this.parameters.userId}/detail`
        ).then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.detailEmployee = result.data.account;
          }
        });
      }
    },
    // ===================

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

    // Thay đổi salon Id
    changeSalon(value) {
      this.parameters.salon_id = value;
      this.listEmployees();
    },
    // =================
    // Thay đổi User Id
    changeUserId(value) {
      this.loading = true;
      this.hasData = false;
      this.parameters.userId = value;
      this.listCommissions();
      this.listDetailEmployees();
    },
    // =================
    formatPrice,
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}

ul li {
  display: inline-block;
}

.bg {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 47px;
}

.bg1 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
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

.active {
  background-color: #d4476f;
  color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
}

.menu-right h5:hover {
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}
table td {
  padding: 0.5rem;
  vertical-align: middle;
}
</style>
