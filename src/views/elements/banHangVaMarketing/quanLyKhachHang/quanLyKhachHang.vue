<template>
  <div class="col-md-10 res mb-5 mt-3">
    <div class="row">
      <div class="col-md-8 col-sm-12 col-12">
        <select
          name="salon_id"
          class="inputx mr-3 res-margin-0"
          style="width: 30%; outline: none"
          v-model="salon_id"
          @change="onChangeSalon"
        >
          <option value="">Tất cả salon</option>

          <option v-for="salon in listStore" :key="salon.id" :value="salon.id">
            {{ salon.salon_name }}
          </option>
        </select>
        <router-link :to="{ name: 'themKhachHang' }">
          <span class="inputx hover color-main mr-3">+ Thêm khách hàng</span>
        </router-link>
      </div>
    </div>
    <ul class="nav mb-3 width-100">
      <li class="nav-item">
        <div
          class="box mt-5 nav-link font-weight-bold"
          @click="onChangeCus(4)"
          :class="{ bgActive: activeKH == 4 }"
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
                  src="../../../../assets/image/Group113572.png"
                  alt=""
                  style="width: 35px"
                  class="width-25px"
                />
              </span>
              <div
                class="color1 pb-1 font-weight-bold"
                style="padding-top: 2.5rem"
              >
                TẤT CẢ <br />
                KHÁCH HÀNG
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="nav-item">
        <div
          class="box mt-5 mr-4 nav-link font-weight-bold"
          @click="onChangeCus(1)"
          :class="{ bgActive: activeKH == 1 }"
        >
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
                src="../../../../assets/image/khVip.png"
                alt=""
                style="width: 35px"
                class="width-25px"
              />
            </span>
            <div
              class="color1 pb-1 font-weight-bold"
              style="padding-top: 2.5rem"
            >
              KHÁCH HÀNG <br />VIP
            </div>
          </div>
        </div>
      </li>
      <li class="nav-item">
        <div
          class="box mt-5 mr-4 nav-link font-weight-bold"
          @click="onChangeCus(2)"
          :class="{ bgActive: activeKH == 2 }"
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
                  src="../../../../assets/image/khDoanhSo.png"
                  alt=""
                  style="width: 35px"
                  class="width-25px"
                />
              </span>
              <div
                class="color1 pb-1 font-weight-bold"
                style="padding-top: 2.5rem"
              >
                KHÁCH HÀNG <br />DOANH SỐ
              </div>
            </div>
            <!-- </router-link> -->
          </div>
        </div>
      </li>
      <li class="nav-item ">
        <div
          class="box mt-5 nav-link font-weight-bold"
          @click="onChangeCus(5)"
          :class="{ bgActive: activeKH == 5 }"
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
                  src="../../../../assets/image/khDungThe.png"
                  alt=""
                  style="width: 35px"
                  class="width-25px"
                />
              </span>
              <div
                class="color1 pb-1 font-weight-bold"
                style="padding-top: 2.5rem"
              >
                KHÁCH HÀNG <br />DÙNG THẺ
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="nav-item">
        <div
          class="box mt-5 nav-link font-weight-bold"
          @click="onChangeCus(8)"
          :class="{ bgActive: activeKH == 8 }"
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
                  src="../../../../assets/image/khTheoDoi.png"
                  alt=""
                  style="width: 35px"
                  class="width-25px"
                />
              </span>
              <div
                class="color1 pb-1 font-weight-bold"
                style="padding-top: 2.5rem"
              >
                KHÁCH HÀNG <br />THEO DÕI
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="nav-item">
        <div
          class="box mt-5 nav-link font-weight-bold"
          @click="onChangeCus(3)"
          :class="{ bgActive: activeKH == 3 }"
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
                  src="../../../../assets/image/khTanSuat.png"
                  alt=""
                  style="width: 35px"
                  class="width-25px"
                />
              </span>
              <div
                class="color1 pb-1 font-weight-bold"
                style="padding-top: 2.5rem"
              >
                KHÁCH HÀNG <br />TẦN SUẤT
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- Chi tiết Khách hàng-->
    <!-- <div class="mt-3">
      <router-view></router-view>
    </div> -->

    <div class="mt-4 pb-3 bg">
      <loadingData v-if="loading"></loadingData>
      <div v-if="hasData">
        <div v-if="msg != ''" class="text-center p-3">
          <b>{{ msg }}</b>
        </div>
        <div v-else>
          <div class="row p-2 pt-3">
            <div class="color-main col font-weight-bold text-center mb-2">
              DANH SÁCH KHÁCH HÀNG
            </div>
            <!-- <div class="col" style="text-align: right">
            <span>
              <input type="date" />
            </span>
          </div> -->
          </div>
          <div class="ml-4 color-main font-weight-bold">
            Tổng số: {{ total }} khách hàng
          </div>
          <table class="table text-center table-striped text-left mt-3">
            <thead>
              <tr>
                <th style="text-align: right !important"></th>
                <th>Họ và tên</th>
                <th>Giới tính</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th v-if="activeKH == 2">Tổng tiền</th>
                <th v-if="activeKH == 3">Lần mua hàng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody class="font-weight-bold">
              <tr v-for="(item, index) in listCus" :key="index">
                <td style="text-align: right !important" class="pt-2">
                  <img
                    :src="item.avatar"
                    alt=""
                    style="width: 33px; height: 33px; border-radius: 50%"
                  />
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.sex }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.address }}</td>
                <td v-if="activeKH == 2">{{ formatPrice(item.total_money) }}</td>
                <td v-if="activeKH == 3">{{ item.total + " lần" }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'chiTietKhachHang',
                      params: { custommerId: item.id },
                    }"
                  >
                    <span class="color-main">Chi tiết</span>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
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
                  src="../../../../assets/image/left.png"
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
                  src="../../../../assets/image/right.png"
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
              <span class="page-link" @click="changePage(paginate.totalPage)"
                >Cuối</span
              >
            </li>
          </ul>
        </div>
        <!-- ============ -->
      </div>
    </div>
    <!-- ================== -->
  </div>
</template>
<script>
import { HTTP, formatPrice } from "@/main";
import loadingData from "@/components/loadingData";
export default {
  name: "quanLyKhachHang",
  components: {
    loadingData,
  },
  data() {
    return {
      loading: true,
      hasData: false,
      listCus: [],
      paginate: {
        currentPage: 1,
        totalPage: "",
      },
      activeKH: 4,
      salon_id: "",
      listStore: {},
      msg: "",
    };
  },
  beforeMount() {
    this.getListStore();
    this.listCustommers();
  },
  methods: {
    listCustommers() {
      let page = this.paginate.currentPage;
      HTTP.get(
        `/salon/main/manage/managerCustomer/${this.activeKH}?page=${page}&salon_id=${this.salon_id}`
      ).then((res) => {
        let result = res.data;
        // console.log(result);
        if (result.status === 1) {
          this.loading = false;
          this.hasData = true;
          let data = result.data.data;
          // console.log(data);
          if (data.length > 0) {
            this.listCus = data;
            this.total = result.data.total;
            this.paginate.currentPage = result.data.current_page;
            this.paginate.totalPage = result.data.last_page;
          } else {
            this.loading = false;
            this.hasData = true;
            this.msg = "Chưa có khách hàng!!!";
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
      });
    },
    // ================

    // Thay đổi khách hàng
    onChangeCus(value) {
      this.loading = true;
      this.hasData = false;
      this.msg = "";
      this.activeKH = value;
      this.listCustommers();
    },
    onChangeSalon() {
      this.loading = true;
      this.hasData = false;
      this.msg = "";
      this.listCustommers();
    },
    // =======================
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
    formatPrice,
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.tab-pane {
  background: rgba(255, 255, 255, 0.16) !important;
}
/* .active {
  background: linear-gradient(#8f41ff 50%, #4423ff 100%);
} */

.active .color1 {
  color: white;
}
.bgActive {
  background: linear-gradient(to right, blue, indigo) !important;
}
.bgActive .color1 {
  color: white;
}
.bg {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
}

ul {
  padding-left: 0;
}

ul li {
  display: inline-block;
  width: 16.66%;
}

.box {
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.56);
  width: 90%;
  cursor: pointer;
}

.bgc {
  background: white;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}
.color1 {
  color: #1f1c8a;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: white;
}
/* .router-link-active .box {
  background: linear-gradient(to right, blue, indigo);
}
.router-link-active .color1 {
  color: white;
} */
/* .active_customer {
  background: linear-gradient(to right, blue, indigo);
} */
.active_customer .color1 {
  color: white !important;
}
.router-link-active div {
  color: white;
  background: linear-gradient(to right, blue, indigo) !important;
}
@media only screen and (max-width: 768px) {
  .width-25px {
    width: 25px !important;
  }
}
</style>
