<template>
  <div class="col-md-10 mb-5 mt-3 res-0">
    <loadingData v-if="loading"></loadingData>
    <div v-if="hasData">
      <div v-if="notification.status">
        <div class="text-center mt-4">
          <b>{{ notification.message + "!!!" }}</b>
        </div>
      </div>
      <div v-else>
        <div id="printMe">
          <!-- Thông tin người mua -->
          <div class="_1AsWWl00">
            <div class="row">
              <div class="col-9">
                <div class="orfer_detail">
                  <div style="font-size: 120%" class="font-weight-bold">
                    THÔNG TIN NGƯỜI MUA
                  </div>
                  <span>
                    Họ và tên: <b>{{ receiver.name }}</b>
                  </span>
                  <br />
                  <span>
                    Số điện thoại: <b>{{ receiver.phone }}</b>
                  </span>
                  <br />
                  <span>
                    Giới tính: <b>{{ receiver.sex }}</b>
                  </span>
                  <br />
                  <span>
                    Ngày sinh: <b>{{ receiver.birthday }}</b>
                  </span>
                  <br />
                  <span>
                    Địa chỉ: <b>{{ receiver.address }}</b>
                  </span>
                  <br />
                  <span>
                    Email: <b>{{ receiver.email }}</b>
                  </span>
                  <br />
                  <span>
                    <!-- Ghi chú: <b>{{ receiver.note }} </b> -->
                  </span>
                </div>
              </div>
              <div class="col-3 text-right">
                <img
                  :src="buyer.image"
                  alt=""
                  style="width: 120px; height: 120px; border-radius: 50%"
                />
              </div>
            </div>
          </div>
          <!-- =================== -->
          <div class="_1AsWWl"></div>
          <!-- Thông tin người bán -->
          <div class="mt-3">
            <div class="row">
              <div class="col-8">
                <div style="font-size: 120%" class="font-weight-bold">
                  THÔNG TIN NGƯỜI BÁN
                </div>
              </div>
              <div
                class="col-4 text-right"
                v-if="
                  detail.order.status_payment == 0 && detail.order.status != 4
                "
              >
                <span
                  class="borderx hover"
                  data-toggle="modal"
                  data-target="#confirmThanhToan"
                  @click="getListBank"
                >
                  Xác nhận đã thanh toán
                </span>
              </div>
            </div>
            <div class="row">
              <span class="nav-link">
                Salon: <b>{{ buyer.name }}</b>
              </span>
              <span class="nav-link">
                SDT: <b>{{ buyer.phone }}</b>
              </span>
              <span class="nav-link">
                Email: <b v-if="buyer.email">{{ buyer.email }}</b>
                <b v-else>Chưa có email</b>
              </span>
            </div>
          </div>
          <!-- ==================== -->

          <!-- =========Thông tin nhân viên================= -->
          <div class="mt-2">
            <p class="font-weight-bold m-0">THÔNG TIN NHÂN VIÊN:</p>
            <table class="table">
              <tr>
                <td
                  v-for="(item, index) in list_employees"
                  :key="index"
                  class="pl-0"
                >
                  <span class="font-weight-bold ">{{
                    item.position + ": " + item.name
                  }}</span>
                </td>
              </tr>
            </table>
          </div>
          <!-- ========================================== -->

          <!-- Thông tin đơn hàng -->
          <div class="mt-3">
            <div class="row">
              <div class="col-8">
                <div style="font-size: 120%" class="font-weight-bold">
                  THÔNG TIN ĐƠN HÀNG
                </div>
              </div>
              <div class="col-4 text-right" v-if="detail.order.status < 3">
                <span
                  class="borderx hover"
                  @click="confirmStatus(detail.order.status)"
                >
                  Cập nhật trạng thái đơn
                </span>
                <span class="borderx hover ml-2" @click="cancelStatus()">
                  Huỷ đơn
                </span>
              </div>
            </div>
            <div class="row">
              <span class="nav-link">
                Chú ý: <b> {{ detail.order.note }} </b>
              </span>
              <span class="nav-link">
                Trạng thái thanh toán:
                <b>{{ detail.order.status_payment_name }}</b>
              </span>
              <span class="nav-link">
                Trạng thái đơn:
                <b>{{ detail.order.status_name }}</b>
              </span>
              <span class="nav-link">
                Ngày đặt hàng:
                <b> {{ formatDate(detail.order.created_at) }} </b>
              </span>
            </div>
            <div class="table-responsive">
              <table class="table table-hover table-bordered text-center">
                <thead>
                  <tr>
                    <th class="font-weight-bold">#STT</th>
                    <th class="text-left">Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th class="text-right">Đơn giá</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in products" :key="index">
                    <td class="font-weight-bold">#{{ index + 1 }}</td>
                    <td class="text-left">
                      <img
                        :src="item.product_link_image"
                        alt=""
                        style="width: 35px; height: 35px; border-radius: 50%"
                      />
                      <span class="ml-2 font-weight-bold">
                        {{ item.product_name }}
                      </span>
                    </td>
                    <td>{{ item.amount }} sp</td>
                    <td class="text-right color-main">
                      <b>{{ formatPrice(item.price) }}</b>
                    </td>
                    <!-- <td>
                    <div v-if="item.status < 3">
                      <b
                        @click="confirmStatus(item.status, item.item_id)"
                        style="cursor: pointer;"
                      >
                        Xác nhận
                      </b>
                      <br />
                      <b
                        style="cursor: pointer;"
                        data-toggle="modal"
                        data-target="#cancel"
                        @click="getStatus(item.item_id)"
                      >
                        Huỷ
                      </b>
                    </div>
                  </td> -->
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
          </div>
          <!-- ==================== -->

          <!-- Thông tin hoá đơn -->
          <div class="_1AsWWl"></div>
          <table class="table table-bordered table-hover text-right mt-2">
            <tbody>
              <tr>
                <th style="width: 80%">Tổng tiền hàng</th>
                <th>{{ formatPrice(detail.order.total_money) }}</th>
              </tr>
              <tr>
                <td>Vận chuyển</td>
                <td class="font-wight-bold">
                  {{ "+ " + formatPrice(detail.order.price_ship) }}
                </td>
              </tr>
              <tr>
                <td>
                  Chiết khấu
                  <span class="font-wight-bold">
                    {{ "( " + chietKhau + "% )" }}</span
                  >
                </td>
                <td class="font-wight-bold">
                  {{ "- " + formatPrice(detail.order.discount) }}
                </td>
              </tr>
              <!-- <tr>
                <td>Mã giảm giá</td>
                <td>
                  {{"- " + formatPrice(detail.order.voucher) }}<br />
                  <span style="font-size: 80%">VUIMOINGAY</span>
                </td>
              </tr> -->
              <tr>
                <td>Mã giảm giá</td>
                <td>{{ "- " + formatPrice(detail.order.voucher) }}</td>
              </tr>
              <tr>
                <td>Sử dụng thẻ ({{ detail.order.card }})</td>
                <td>{{ "- " + formatPrice(detail.order.reduce_in_card) }}</td>
              </tr>
              <tr>
                <td>Hình thức thanh toán</td>
                <td>{{ detail.order.type_payment }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold" style="vertical-align: middle">
                  Tổng thanh toán
                </td>
                <td class="color-main">
                  <b style="font-size: 150%"
                    >{{ formatPrice(detail.order.total_money_after) }}
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- ================= -->
        </div>
        <!-- XÁc nhận  thanh toán -->
        <div class="modal fade" id="confirmThanhToan" role="dialog">
          <div class="modal-dialog" style="top: 15%">
            <div class="modal-content">
              <div class="modal-body">
                <div
                  class="color-main mb-2 font-weight-bold"
                  style="font-size: 120%"
                >
                  Chọn tài khoản nhận tiền:
                </div>
                <select
                  class="inputx mr-3 res-margin-0 mt-3"
                  style="width: 100%; outline: none"
                  v-model="updatedOrder.funds_id"
                >
                  <option value="">--Chọn tài khoản--</option>

                  <option
                    v-for="bank in listBank"
                    :key="bank.id"
                    :value="bank.id"
                  >
                    {{ bank.bank }}
                  </option>
                </select>
              </div>
              <div class="modal-footer">
                <button
                  class="input creat-status"
                  style="opacity: 0.5"
                  data-dismiss="modal"
                >
                  Huỷ
                </button>
                <button
                  @click="confirmBill"
                  class="input creat-status"
                  data-dismiss="modal"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- ============== -->

        <!-- Button xác nhận -->
        <div class="text-center">
          <button class="borderx color-main mr-3 hover" @click="backPage">
            Quay lại
          </button>
          <button class="borderx color-main hover" @click="print">
            In hoá đơn
          </button>
        </div>
        <!-- ================= -->
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP, formatDate, formatPrice } from "@/main";
import loadingData from "@/components/loadingData";
import { defineComponent } from "vue";
export default defineComponent({
  name: "chitietdonhang",
  components: {
    loadingData,
  },
  data() {
    return {
      loading: true,
      hasData: false,
      orderId: "",
      posts: [],
      detail: [],
      receiver: [],
      buyer: [],
      products: [],
      delivery: 15000,
      updatedOrder: {
        item_id: "",
        status: "",
        reason_cancel: "",
        funds_id: "",
      },
      chietKhau: "",
      selected: "",
      statusDelivery: {},
      errors: [],
      notification: {
        status: false,
        message: "",
      },
      salon_id: "",
      listBank: [],
      list_employees: [],
    };
  },
  created() {
    this.orderId = this.$route.params.donHangId;
    // Danh sách trạng thái đơn hàng
    HTTP.get(`/common/listStatusOrder`).then((res) => {
      this.statusDelivery = res.data.data;
    });
  },
  beforeMount() {
    this.listOrder();
  },
  methods: {
    print() {
      this.$htmlToPaper("printMe");
    },
    saveStatus(index) {
      this.updatedOrder.item_id = index;
    },
    // Chi tiết đơn hàng
    listOrder() {
      let Code = window.location.href.slice(
        window.location.href.indexOf("/chi-tiet/") + 10,
        window.location.href.length
      );
      HTTP.get(`/salon/main/manage/order/${Code}/detail`)
        .then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.loading = false;
            this.hasData = true;
            this.detail = res.data.data;
            this.receiver = this.detail.buyer;
            this.buyer = this.detail.receiver;
            this.salon_id = this.detail.order.salon_id;
            this.products = this.detail.products;
            this.list_employees = this.detail.list_employee;
            let CK =
              (this.detail.order.discount / this.detail.order.total_money) *
              100;
            this.chietKhau = CK.toFixed(2);
          } else {
            this.loading = false;
            this.hasData = true;
            this.notification.status = true;
            this.notification.message = "Không tìm thấy đơn hàng";
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    // Xác nhận trạng thái
    confirmStatus(value) {
      let OrderId = window.location.href.slice(
        window.location.href.indexOf("/chi-tiet/") + 10,
        window.location.href.length
      );
      if (value < 4) {
        this.updatedOrder.status = value + 1;
        this.$swal({
          title: "Cập nhật trạng thái?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Xác nhận!",
        }).then((result) => {
          if (result.value) {
            HTTP.post(
              `/salon/main/manage/order/${OrderId}/status`,
              this.updatedOrder
            ).then((res) => {
              let result = res.data;
              if (result.status === 1) {
                this.$swal("Đã cập nhật!", result.message, "success");
                this.listOrder();
              } else {
                this.$swal("", result.message, "error");
              }
            });
          }
        });
      }
    },
    // ========

    // Xác nhận thanh toán
    confirmBill() {
      HTTP.put(
        `/salon/main/manage/order/${this.orderId}/payment?funds_id=${this.updatedOrder.funds_id}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.$swal("Đã xác nhận!", result.message, "success");
          this.listOrder();
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // =================
    getStatus(value) {
      this.updatedOrder.item_id = value;
    },

    // huỷ
    cancelStatus() {
      let OrderId = window.location.href.slice(
        window.location.href.indexOf("/chi-tiet/") + 10,
        window.location.href.length
      );
      this.updatedOrder.status = 5;
      this.$swal({
        title: "Huỷ đơn?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận!",
      }).then((result) => {
        if (result.value) {
          HTTP.post(
            `/salon/main/manage/order/${OrderId}/status?cancel=4`,
            this.updatedOrder
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.$swal("Đã huỷ đơn!", result.message, "success");
              this.listOrder();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    // ========
    // Danh sách các ngân hàng
    getListBank() {
      HTTP.get(
        `/salon/main/manage/funds?page=1&salon_id=${this.salon_id}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data.data;
          this.listBank = data;
        }
      });
    },
    // =======================

    // ===========================

    backPage() {
      history.back();
    },
    formatPrice,
    formatDate,
  },
});
</script>
<style scoped>
* {
  font-size: 14px;
}
ul {
  padding: 0;
  margin-top: 7px;
}
ul li a {
  color: black;
}
table td {
  vertical-align: middle;
}
hr {
  margin-top: 0 !important;
}
.navbar {
  padding: 0;
}
._1AsWWl {
  height: 0.1875rem;
  width: 100%;
  background-position-x: -1.875rem;
  background-size: 7.25rem 0.1875rem;
  background-image: repeating-linear-gradient(
    45deg,
    #6fa6d6,
    #6fa6d6 33px,
    transparent 0,
    transparent 41px,
    #f18d9b 0,
    #f18d9b 74px,
    transparent 0,
    transparent 82px
  );
}
.orfer_detail {
  padding: 1.1875rem 1.5rem 1.625rem 0;
}
.borderx {
  border: 1px solid #d4476f;
  padding: 5px 25px;
  border-radius: 4px;
  cursor: pointer;
}

.table-bordered th,
.table-bordered td {
  border-bottom: 2px solid rgb(173, 173, 173) !important;
}
</style>
