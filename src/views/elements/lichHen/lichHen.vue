<template>
  <div class="col-md-10 mb-5 res mt-3">
    <div>
      <select
        name="salon_id"
        class="inputx mr-3 res-margin-0"
        style="width: 30%; outline: none"
        v-model="salon_id"
        @change="onChange()"
      >
        <option value="">Tất cả salon</option>
        <option v-for="salon in listStore" :key="salon.id" :value="salon.id">
          {{ salon.salon_name }}
        </option>
      </select>
      <router-link
        :to="{
          name: 'dichVuOffline',
        }"
      >
        <span class="inputx hover color-main mr-3 res-margin-0">
          + Dịch vụ offline
        </span>
      </router-link>
      <span class="inputx hover color-main">Xuất báo cáo</span>

      <div class="mt-3 pb-3 mb-5 bg-16">
        <div>
          <div>
            <div class="group-tabs">
              <ul class="nav nav-tabs">
                <li role="presentation" @click="changeState(1)">
                  <a
                    role="tab"
                    data-toggle="tab"
                    class="active"
                    style="border-top-left-radius: 16px"
                  >
                    <span class="font-10 color-main">Chờ xác nhận</span>
                  </a>
                </li>
                <li role="presentation" @click="changeState(2)">
                  <a role="tab" data-toggle="tab">
                    <span class="font-10 color-main">Chờ phục vụ</span>
                  </a>
                </li>
                <li role="presentation" @click="changeState(3)">
                  <a role="tab" data-toggle="tab">
                    <span class="font-10 color-main">Hoàn thành</span>
                  </a>
                </li>
                <li role="presentation" @click="changeState(4)">
                  <a role="tab" data-toggle="tab">
                    <span class="font-10 color-main">Đã huỷ</span>
                  </a>
                </li>
              </ul>
              <!-- Tab panes -->
              <div class="tab-content mt-3 pl-3 pr-3">
                <div
                  style="
                  border: none !important;
                  background-color: rgba(255, 255, 255, 0.4);
                "
                >
                  <div class="mt-3">
                    <div class="row">
                      <div class="col-md-6 col-sm-12 col-12">
                        <input
                          type="text"
                          placeholder="Tìm kiếm lịch hẹn"
                          style="width: 50%; position: relative"
                          v-model="str"
                          @change="searchStr"
                        />
                        <i
                          class="fa fa-search color-main"
                          style="
                          position: absolute;
                          transform: translate(-23px, 9px);
                        "
                        >
                        </i>
                      </div>
                      <div class="col-md-6 col-sm-12 col-12 hidden">
                        <span style="float: right" class="margin-top-5">
                          Từ ngày:
                          <input
                            class="inputx mr-2 width-28"
                            type="date"
                            v-model="start_date"
                          />
                          đến
                          <input
                            class="inputx mr-2 width-28"
                            type="date"
                            v-model="end_date"
                          />

                          <span
                            @click="searchDate"
                            class="inputx color-main mr-2 hover"
                            style="cursor: pointer;"
                          >
                            Tìm kiếm
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- loading -->
                  <loadingData v-if="loading"></loadingData>
                  <!-- ========= -->

                  <!-- danh sách -->
                  <div v-else>
                    <div v-if="message == ''">
                      <div class="mt-3 mb-2">
                        <span class="color-main font-weight-bold">
                          {{ total }} lịch hẹn
                        </span>
                      </div>
                      <div class="border-main mt-4">
                        <table class="w-100">
                          <tr class="text-center">
                            <th style="width: 10%;" class="pt-2 pb-2">
                              Tên khách hàng
                            </th>
                            <th style="width: 8%;" class="pt-2 pb-2 hidden">
                              Số điện thoại
                            </th>
                            <th style="width: 15%;" class="pt-2 pb-2">
                              Tên dịch vụ
                            </th>
                            <th style="width: 8%;" class="pt-2 pb-2">
                              Thời gian
                            </th>
                            <th style="width: 13%;" class="pt-2 pb-2 hidden">
                              Địa chỉ salon
                            </th>
                            <th style="width: 8%;" class="pt-2 pb-2">
                              Tổng hoá đơn
                            </th>
                            <th style="width: 8%;" class="pt-2 pb-2">
                              Trạng thái
                            </th>
                            <th style="width: 8%;" class="pt-2 pb-2">
                              Cập nhật TT
                            </th>
                            <th style="width: 8%;" class="pt-2 pb-2">
                              Thao tác
                            </th>
                          </tr>
                        </table>
                      </div>
                      <div
                        v-for="(item, index) in listSchedule"
                        :key="index"
                        class="border-main mt-3"
                      >
                        <table class="w-100">
                          <tr
                            class="1"
                            style="border-bottom: 1px solid #d4476f"
                          >
                            <td colspan="5" class="p-2">
                              <span class="ml-2">
                                Mã đơn
                                <span class="font-weight-bold">
                                  {{ item.sku }}
                                </span>
                              </span>
                            </td>
                            <td colspan="4" class="p-2">
                              <span
                                style="float: right"
                                class="font-weight-bold"
                              >
                                {{ item.salon_name }}
                              </span>
                            </td>
                          </tr>
                          <tr class="text-center">
                            <td style="width: 10%;" class="pt-2 pb-2">
                              <b>{{ item.name }} </b>
                            </td>
                            <td style="width: 8%;" class="hidden">
                              <span>{{ item.phone }} </span>
                            </td>
                            <td style="width: 15%;" class="pt-1 pb-1">
                              <span
                                class="ml-2 font-weight-bold"
                                v-for="(i, index) in item.services"
                                :key="index"
                              >
                                {{ i.title }},
                              </span>
                            </td>
                            <td style="width: 8%;">
                              <span>
                                <span class="font-weight-bold">
                                  {{ formatHour(item.date_time) }}
                                </span>
                                <br />
                                <span>{{ formatDate(item.date_time) }}</span>
                              </span>
                            </td>
                            <td style="width: 13%;" class="hidden">
                              <span>{{ item.salon_address }} </span>
                            </td>
                            <td style="width: 8%;">
                              <span class="font-weight-bold color-main">
                                {{ formatPrice(item.price) }}
                              </span>
                              <br />
                              <span class="hidden">
                                {{ item.status_payment_name }}
                              </span>
                            </td>
                            <td
                              style="width: 8%;"
                              class="color-main font-weight-bold"
                            >
                              {{ item.state_name }}
                            </td>
                            <td
                              style="width: 8%;"
                              class="color-main font-weight-bold"
                            >
                              <div v-if="item.state < 3">
                                <b
                                  v-if="
                                    item.state == 2 && item.status_payment == 0
                                  "
                                  data-toggle="modal"
                                  data-target="#xacNhanThanhToan"
                                  @click="serviceId = item.id"
                                  style="cursor: pointer;"
                                >
                                  Xác nhận TT
                                </b>
                                <b
                                  v-else
                                  @click="confirmStatus(item.id)"
                                  style="cursor: pointer;"
                                >
                                  Xác nhận
                                </b>
                                <br />
                                <b
                                  @click="cancelStatus(item.id)"
                                  style="cursor: pointer;"
                                >
                                  Huỷ
                                </b>
                              </div>
                              <div v-if="item.state == 3">
                                <b class="text-success">Hoàn thành</b>
                              </div>
                              <div v-if="item.state == 4">
                                <b class="text-danger">Đã huỷ</b>
                              </div>
                            </td>
                            <td
                              style="width: 8%;"
                              class="color-main font-weight-bold"
                            >
                              <router-link
                                :to="{
                                  name: 'chiTietLichHen',
                                  params: { lichHenId: item.sku },
                                }"
                              >
                                Xem chi tiết
                              </router-link>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div v-else class="text-center mt-3">
                      <b style="font-size: 110%">{{ message }}</b>
                    </div>
                  </div>
                  <!-- hết danh sách -->
                </div>

                <!-- phân trang -->
                <div v-if="paginate.totalPage == 1"></div>
                <div v-else class="mt-3">
                  <ul class="pagination justify-content-end">
                    <li
                      class="page-item"
                      style="cursor: pointer; color: #d4476f !important"
                      :class="{ disabled: paginate.currentPage === 1 }"
                    >
                      <span class="page-link" @click="changePage(1)">Đầu</span>
                    </li>
                    <li class="page-item" style="cursor: pointer">
                      <span
                        class="page-link"
                        style="height: 100%"
                        @click="changePage(paginate.currentPage - 1)"
                        v-if="paginate.currentPage > 1"
                      >
                        <img
                          src="../../../assets/image/left.png"
                          alt=""
                          style="
                            width: 65%;
                            padding: 3px 0px;
                            display: block;
                            margin: 0px auto;
                            border: none;
                          "
                          class="border1"
                        />
                      </span>
                    </li>

                    <li
                      class="page-item"
                      v-for="(page, index) in paginate.totalPage"
                      :key="index"
                      :class="{ active: paginate.currentPage === page }"
                      style="cursor: pointer"
                    >
                      <span
                        class="page-link"
                        @click="changePage(index + 1)"
                        v-if="
                          index + 1 == paginate.currentPage ||
                            index + 1 == paginate.currentPage + 1 ||
                            index + 1 == paginate.currentPage - 1
                        "
                      >
                        {{ index + 1 }}
                      </span>
                    </li>

                    <li class="page-item" style="cursor: pointer">
                      <span
                        class="page-link"
                        style="height: 100%"
                        @click="changePage(paginate.currentPage + 1)"
                        v-if="paginate.currentPage < paginate.totalPage"
                      >
                        <img
                          src="../../../assets/image/right.png"
                          alt=""
                          style="
                            width: 65%;
                            padding: 3px 0px;
                            display: block;
                            margin: 0px auto;
                            border: none;
                          "
                        />
                      </span>
                    </li>
                    <li
                      class="page-item"
                      style="cursor: pointer"
                      :class="{
                        disabled: paginate.currentPage == paginate.totalPage,
                      }"
                    >
                      <span
                        class="page-link"
                        @click="changePage(paginate.totalPage)"
                      >
                        Cuối
                      </span>
                    </li>
                  </ul>
                </div>
                <!-- ============ -->
              </div>
            </div>
            <!-- Xác nhận tài khoản thanh toán -->
            <div
              class="modal fade"
              id="xacNhanThanhToan"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" style="top: 20%" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Xác nhận thanh toán
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
                  <div class="modal-body">
                    <div>
                      <span>Chọn quỹ & ngân hàng:</span>
                      <select
                        name="salon_id"
                        class="inputx mr-3 res-margin-0"
                        style="width: 100%; outline: none"
                        v-model="bankId.funds_id"
                      >
                        <option value="">Tất cả ngân hàng</option>
                        <option
                          v-for="bank in listBank"
                          :key="bank.id"
                          :value="bank.id"
                        >
                          {{ bank.bank }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button class="btn btn-secondary" data-dismiss="modal">
                      Huỷ
                    </button>
                    <button
                      @click="confirmStatus(serviceId)"
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
  </div>
</template>

<script>
import { HTTP, formatPrice, formatDate } from "@/main";
import loadingData from "@/components/loadingData";
export default {
  name: "lichHen",
  components: {
    loadingData,
  },
  data() {
    return {
      loading: true,
      hasData: true,
      listStore: {},
      listSchedule: {},
      salon_id: "",
      serviceId: "",
      bankId: {
        funds_id: "",
      },
      start_date: "",
      end_date: "",
      keySearch: "",
      total: "",
      state: "1",
      scheduleId: "",
      message: "",
      paginate: {
        currentPage: 1,
        totalPage: 1,
      },
      notification: {
        status: false,
        message: "",
      },
      str: "",
      listBank: [],
    };
  },

  created() {},
  beforeMount() {
    this.listSchedules();
    this.getListStore();
    this.getListBank();
  },
  methods: {
    listSchedules() {
      let page = this.paginate.currentPage;
      HTTP.get(
        `/salon/main/manage/appointmentSchedule?str=${this.str}&state=${this.state}&salon_id=${this.salon_id}&page=${page}&start_date=${this.start_date}&end_date=${this.end_date}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.hasData = true;
          this.total = result.data.total;
          let data = result.data.data;
          let paginate = result.data;

          this.paginate.currentPage = paginate.current_page;
          this.paginate.totalPage = paginate.last_page;
          if (data.length > 0) {
            this.listSchedule = data;
          } else {
            this.message = "Chưa có lịch hẹn!!!";
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },

    changePage(index) {
      this.message = "";
      this.loading = true;
      this.hasData = false;
      this.paginate.currentPage = index;
      this.listSchedules();
    },
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

    // Tìm kiếm theo ngày
    searchDate() {
      this.message = "";
      this.loading = true;
      this.hasData = false;
      this.listSchedules();
    },
    // ==================

    // Lọc theo text nhập vào
    searchStr() {
      this.message = "";
      this.paginate.currentPage = 1;
      this.loading = true;
      this.hasData = false;
      this.listSchedules();
    },
    // ===============

    // Lọc theo SalonId
    onChange() {
      this.message = "";
      this.paginate.currentPage = 1;
      this.loading = true;
      this.hasData = false;
      this.listSchedules();
    },
    // ===============

    // thay đổi trạng thái
    changeState(index) {
      this.paginate.currentPage = 1;
      this.loading = true;
      this.hasData = false;
      this.message = "";
      this.state = index;
      this.listSchedules();
    },
    // ===================

    // Xác nhận
    confirmStatus(value) {
      if (this.state < 3) {
        this.$swal({
          title: "Xác nhận dịch vụ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Xác nhận!",
        }).then((result) => {
          if (result.value) {
            HTTP.put(
              `/salon/main/manage/appointmentSchedule/updateState/${value}`,
              this.bankId
            ).then((res) => {
              this.loading = true;
              let result = res.data;
              if (result.status === 1) {
                this.$swal("Đã xác nhận!", result.message, "success");
                this.listSchedules();
              } else {
                this.$swal("", result.message, "error");
              }
            });
          }
        });
      }
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

    // Huỷ dịch vụ
    cancelStatus(value) {
      this.$swal({
        title: "Huỷ dịch vụ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận!",
        cancelButtonText: "Huỷ!",
      }).then((result) => {
        if (result.value) {
          HTTP.put(
            `/salon/main/manage/appointmentSchedule/updateState/${value}?cancel=4`
          ).then((res) => {
            this.loading = true;
            let result = res.data;
            if (result.status === 1) {
              this.$swal("Đã huỷ!", result.message, "success");
              this.listSchedules();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    // ==============
    // Định dạng giờ
    formatHour(index) {
      var date = new Date(index);
      var h = date.getHours();
      if (h < 10) {
        h = "0" + h;
      }
      var m = date.getMinutes();
      if (m < 10) {
        m = "0" + m;
      }
      return (index = h + ":" + m);
    },
    formatDate,
    formatPrice,

    // ===================
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
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
  font-size: 12px;
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

.group-tabs ul li .active {
  background-color: rgba(212, 71, 111, 0.1);
  border-bottom: 2px solid #d4476f;
}
table td {
  padding: 5px !important;
}
::placeholder {
  color: #d4476f;
}

@media only screen and (max-width: 768px) {
  .res-0 {
    padding: 0 !important;
  }

  .width-50 {
    width: 50% !important;
  }

  .margin-top-5 {
    margin-top: 5px;
  }
  .margin-right-5 {
    margin-right: 5px;
  }
  .width-28 {
    width: 28%;
  }
}
</style>
