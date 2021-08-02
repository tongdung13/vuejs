<template>
  <div class="col-md-10 mb-5 res mt-3">
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
        name: 'donOffline',
      }"
    >
      <span class="inputx hover color-main mr-3 res-margin-0">
        + Đơn offline
      </span>
    </router-link>
    <!-- <span class="inputx hover color-main" @click="exportxx">
      Xuất báo cáo
    </span> -->
    <!-- =============================== -->

    <!-- =============================== -->
    <div class="mt-3 pb-2 mb-5 bg-16">
      <div class="group-tabs">
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" @click="changeStatus(0)">
            <a
              role="tab"
              data-toggle="tab"
              class="active"
              style="border-top-left-radius: 16px"
            >
              <span class="font-10 color-main">Tất cả</span>
            </a>
          </li>

          <li role="presentation" @click="changeStatus(1)">
            <a role="tab" data-toggle="tab">
              <span class="font-10 color-main">Chờ xác nhận</span>
            </a>
          </li>

          <li role="presentation" @click="changeStatus(2)">
            <a role="tab" data-toggle="tab">
              <span class="font-10 color-main"> Đang giao hàng </span>
            </a>
          </li>

          <li role="presentation" @click="changeStatus(3)">
            <a role="tab" data-toggle="tab">
              <span class="font-10 color-main"> Hoàn thành </span>
            </a>
          </li>

          <li role="presentation" @click="changeStatus(4)">
            <a role="tab" data-toggle="tab">
              <span class="font-10 color-main"> Đã huỷ </span>
            </a>
          </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content mt-3 pl-3 pr-3">
          <div
            role="tabpanel"
            class="tab-pane active"
            style="
              border: none !important;
              background-color: rgba(255, 255, 255, 0.4);
            "
            id="home"
          >
            <!-- one -->
            <div class="mt-3">
              <div class="row">
                <div class="col-md-4 col-sm-12 col-12">
                  <input
                    type="text"
                    placeholder="Tìm kiếm đơn hàng"
                    style="width: 90%; position: relative"
                    v-model="str"
                    @change="searchSalon"
                  />
                  <i
                    class="fa fa-search color-main"
                    style="
                      position: absolute;
                      transform: translate(-23px, 9px);
                    "
                  ></i>
                </div>
                <div class="col-md-8 col-sm-12 col-12 hidden">
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
                      Tìm
                    </span>
                  </span>
                </div>
              </div>
              <div class="mt-2">
                <span
                  v-if="donHang.total > 0"
                  class="color-main font-weight-bold"
                >
                  {{ donHang.total }} đơn hàng
                </span>
              </div>
            </div>
            <loadingData v-if="loading"></loadingData>
            <div v-if="hasData">
              <div>
                <!-- Table -->
                <table class="w-100">
                  <thead>
                    <tr class="text-center">
                      <th class="pt-2 pb-2">Mã đơn hàng</th>
                      <th class="pt-2 pb-2 hidden">Tên khách hàng</th>
                      <th class="pt-2 pb-2 hidden">Số điện thoại</th>
                      <th class="pt-2 pb-2">Số sản phẩm</th>
                      <th class="pt-2 pb-2 hidden">Hình thức vận chuyển</th>
                      <th class="pt-2 pb-2 hidden">Thanh toán</th>
                      <!-- <th class="pt-2 pb-2 hidden">Đơn vị giao hàng</th> -->
                      <th class="pt-2 pb-2">Tổng tiền</th>
                      <th class="pt-2 pb-2">Trạng thái đơn</th>
                      <th class="pt-2 pb-2">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="text-center spacer"
                      v-for="(itemOrder, index) in filteredItemsOrder"
                      :key="index"
                    >
                      <td class="pt-2 pb-2">
                        {{ "#" + itemOrder.sku }}
                      </td>
                      <td class="pt-2 pb-2 hidden">
                        {{ itemOrder.name }}
                      </td>
                      <td class="pt-2 pb-2 hidden">
                        {{ itemOrder.phone }}
                      </td>
                      <td class="pt-2 pb-2">
                        {{ itemOrder.total_product }} sp
                      </td>
                      <td class="pt-2 pb-2 hidden">
                        {{ itemOrder.transfer_name }}
                      </td>
                      <td class="pt-2 pb-2 hidden">
                        {{ itemOrder.status_payment_name }}
                      </td>
                      <!-- <td class="pt-2 pb-2 hidden">
                        {{ itemOrder.transfer_name }}
                      </td> -->
                      <td class="pt-2 pb-2">
                        <b class="color-main">
                          {{ formatPrice(itemOrder.total_money) }}
                        </b>
                      </td>
                      <td class="color-main font-weight-bold pt-2 pb-2">
                        {{ itemOrder.status_name }}
                      </td>
                      <td class="color-main font-weight-bold">
                        <router-link
                          :to="{
                            name: 'chitietdonhang',
                            params: { donHangId: itemOrder.sku },
                          }"
                        >
                          Xem chi tiết
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- End table -->
              </div>
            </div>
            <div v-if="donHang.total == 0" class=" mt-3 mb-3 text-center">
              <b class="mt-3" style="font-size: 16px">{{ msg }}</b>
            </div>
            <div v-if="notification.status">
              {{ notification.message }}
            </div>
            <!-- End data -->
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
                <span class="page-link" @click="changePage(paginate.totalPage)">
                  Cuối
                </span>
              </li>
            </ul>
          </div>
          <!-- ============ -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/main";
import loadingData from "@/components/loadingData";
import { formatDate } from "@/main";
import { formatPrice } from "@/main";

export default {
  name: "donHang",
  components: {
    loadingData,
  },
  data() {
    return {
      search: "",
      msg: "",
      loading: true,
      hasData: false,
      listOrder: [],
      listStore: {},
      str: "",
      status: "",
      start_date: "",
      end_date: "",
      donHang: "",
      paginate: {
        currentPage: 1,
        totalPage: 1,
      },
      salon_id: "",
      notification: {
        status: false,
        message: "",
      },
    };
  },
  created() {},
  beforeMount() {
    this.getListOrder();
    this.getListStore();
  },
  methods: {
    exportxx() {
      HTTP.get(`/salon/main/manage/order/export?salon_id=1`);
    },
    // Danh sách đơn hàng
    getListOrder() {
      this.loading = true;
      this.hasData = false;
      let page = this.paginate.currentPage;
      HTTP.get(
        "/salon/main/manage/order?page=" +
          page +
          "&salon_id=" +
          this.salon_id +
          "&str=" +
          this.str +
          "&condition=" +
          this.status +
          "&start_date=" +
          this.start_date +
          "&end_date=" +
          this.end_date
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;
          if (data.data.length > 0) {
            this.hasData = true;
            this.donHang = data;
            this.listOrder = data.data;
          } else {
            this.donHang = data;
            this.msg = "Chưa có đơn hàng";
          }
          this.paginate.currentPage = data.current_page;
          this.paginate.totalPage = data.last_page;
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },
    // ======================

    // chuyển trang
    changePage(index) {
      this.paginate.currentPage = index;
      this.getListOrder();
    },
    // =================

    // Lọc theo salon_id
    onChange() {
      this.getListOrder();
    },
    // ===================
    // Lọc theo trạng thái đơn hàng
    changeStatus(value) {
      this.msg = "";
      this.start_date = "";
      this.end_date = "";
      this.paginate.totalPage = 1;
      if (value == 0) {
        this.status = "";
        this.getListOrder();
      } else {
        this.status = value;
        this.getListOrder();
      }
    },
    // ====================

    // Lọc theo mã đơn hàng
    searchSalon() {
      this.getListOrder();
    },
    // =====================

    // lọc trong khoảng ngày
    searchDate() {
      this.getListOrder();
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
    formatDate,
    formatPrice,
  },
  computed: {
    // TÌm kiếm
    filteredItemsOrder() {
      return this.listOrder.filter((item) => {
        return item.sku.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
    // =============
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

a {
  text-decoration: none;
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

table {
  border-collapse: separate;
  border-spacing: 0 10px;
}

table th:first-child,
table td:first-child {
  border-radius: 8px 0 0 8px;
  border-left: 1px solid #d4476f;
}

table th:last-child,
table td:last-child {
  border-radius: 0 8px 8px 0;
  border-right: 1px solid #d4476f;
}

table th,
tbody td {
  border-top: 1px solid #d4476f;
  border-bottom: 1px solid #d4476f;
}
</style>
