<template>
  <div class="col-md-10 mb-5 mt-3 res-0">
    <div id="printMe">
      <div class="_1AsWWl00">
        <div class="row">
          <div class="col-9">
            <div class="orfer_detail">
              <p style="font-size: 120%" class="font-weight-bold">
                THÔNG TIN NGƯỜI ĐẶT DỊCH VỤ
              </p>
              <span>
                Họ và tên: <b>{{ receiver.name }}</b></span
              >
              <br />
              <span>
                Số điện thoại: <b>{{ receiver.phone }}</b></span
              >
              <br />
              <span>
                Giới tính: <b>{{ receiver.sex }}</b></span
              >
              <br />
              <span>
                Ngày sinh: <b>{{ receiver.birthday }}</b></span
              >
              <br />
              <span>
                Địa chỉ: <b>{{ receiver.address }}</b>
              </span>
              <br />
              <span>
                Email: <b>{{ receiver.email }}</b></span
              >
              <br />
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
      <!-- ================================= -->
      <div class="_1AsWWl"></div>
      <div class="row mt-3">
        <div class="col-8">
          <div style="font-size: 120%" class="font-weight-bold">
            THÔNG TIN SALON
          </div>
        </div>
        <!-- <div
          class="col-4 text-right"
          v-if="order.status_payment == 0 && order.status != 4"
        >
          <span
            class="borderx hover"
            data-toggle="modal"
            data-target="#xacNhanThanhToan"
          >
            Xác nhận đã thanh toán
          </span>
        </div> -->
      </div>
      <div class="row">
        <span class="nav-link">
          Salon: <b>{{ buyer.name }}</b>
        </span>
        <span class="nav-link">
          SDT: <b>{{ buyer.phone }}</b>
        </span>
        <span class="nav-link">
          Email: <b>{{ buyer.email }}</b>
        </span>
      </div>
      <div class="row">
        <span class="nav-link">
          Trạng thái dịch vụ:
          <b>{{ order.status_name }}</b>
        </span>
        <span class="nav-link">
          Trạng thái thanh toán:
          <b>{{ order.status_payment_name }}</b>
        </span>
        <span class="nav-link">
          Ngày đặt lịch:
          <b> {{ formatDate(order.created_at) }} </b>
        </span>
      </div>
      <!-- ======================= -->

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
      <div style="font-size: 120%" class="font-weight-bold mt-3">
        THÔNG TIN DỊCH VỤ
      </div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th class="font-weight-bold">#STT</th>
              <th>Tên dịch vụ</th>
              <th class="text-right">Tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in products" :key="index">
              <td class="fomt-weight-bold" style="width: 10%;">
                #{{ index + 1 }}
              </td>
              <td>
                <img
                  src="../../../assets/image/30cd39cc5dd4a5798b6c25f8b66f05151.png"
                  alt=""
                  style="width: 35px"
                  class="mr-2"
                />
                {{ item.service_name }}
              </td>
              <td class="text-right color-main font-weight-bold">
                {{ formatPrice(item.price) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <div class="_1AsWWl"></div>
      <table class="table table-bordered table-hover text-right">
        <tbody>
          <tr>
            <th style="width: 80%">Tổng tiền hàng</th>
            <th>{{ formatPrice(order.total_money) }}</th>
          </tr>
          <tr>
            <td>Chiết khấu</td>
            <td>{{ "- " + formatPrice(order.discount) }}</td>
          </tr>
          <tr>
            <td>Giảm giá</td>
            <td>{{ "- " + formatPrice(order.voucher) }}</td>
          </tr>
          <tr>
            <td>Phí phát sinh</td>
            <td>{{ "+ " + formatPrice(order.extra_fee) }}</td>
          </tr>
          <tr>
            <td>Thẻ khách hàng</td>
            <td>{{ order.card }}</td>
          </tr>
          <tr>
            <td>Hình thức thanh toán</td>
            <td>{{ order.type_payment }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold">Tổng số tiền</td>
            <td style="font-size: 150%; color: #f18d9b; font-weight: bold">
              {{ formatPrice(order.total_money_after) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- ============== -->
    <!-- XÁc nhận  thanh toán -->
    <div class="modal fade" id="xacNhanThanhToan" role="dialog">
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
            >
              <option value="">--Chọn tài khoản--</option>

              <option v-for="bank in listBank" :key="bank.id" :value="bank.id">
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
    <div class="text-center mt-4">
      <button class="borderx color-main mr-3 hover" @click="backPage">
        Quay lại
      </button>
      <button class="borderx color-main hover" @click="print">
        In hoá đơn
      </button>
    </div>
    <!-- ================= -->
  </div>
</template>

<script>
import { HTTP } from "@/main";
import { formatPrice, formatDate } from "@/main";
import { defineComponent } from "vue";
export default defineComponent({
  name: "chiTietLichHen",
  data() {
    return {
      posts: [],
      detail: [],
      order: [],
      receiver: [],
      buyer: [],
      products: [],
      delivery: 15000,
      voucher: 30000,
      errors: [],
      listBank: [],
      list_employees: [],
    };
  },
  beforeMount() {
    this.getListBank();
  },
  methods: {
    print() {
      this.$htmlToPaper("printMe");
    },
    // Danh sách các ngân hàng
    getListBank() {
      HTTP.get(`/salon/main/manage/funds?page=1&salon_id=1`).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data.data;
          this.listBank = data;
        }
      });
    },
    // =======================
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
    backPage() {
      history.back();
    },
    formatPrice,
    formatDate,
  },
  created() {
    let Code = this.$route.params.lichHenId;
    HTTP.get(`/salon/main/manage/appointmentSchedule/${Code}`)
      .then((res) => {
        this.detail = res.data.data;
        this.receiver = this.detail.user;
        this.order = this.detail.order;
        console.log(this.order);
        this.buyer = this.detail.receiver;
        this.products = this.detail.services;
        this.list_employees = this.detail.list_employee;
      })
      .catch((e) => {
        this.errors.push(e);
      });
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
