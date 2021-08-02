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

    <router-link
      :to="{
        name: 'themMoiQuy',
      }"
    >
      <span class="inputx hover color-main mr-3">+ Thêm quỹ</span>
    </router-link>
    <div class="mt-4">
      <h5 class="color-main font-weight-bold" style="font-size: 16px">
        QUỸ TIỀN MẶT VÀ NGÂN HÀNG
      </h5>
      <div class="row mt-3">
        <carousel
          class="pl-3"
          :items-to-show="4.2"
          style="width: 100% !important"
        >
          <slide v-for="bank in listTotalBank" :key="bank.code">
            <div>
              <div class="bg mr-2">
                <div class="row pt-2 pl-3 pr-3 pb-2">
                  <div class="col-md-4">
                    <img
                      :src="bank.logo"
                      alt=""
                      style="width:70px"
                      class="img0"
                    />
                  </div>
                  <div class="col-md-8 text-right text-white pl-0">
                    <h6>{{ bank.code }}</h6>
                    <h5 class="font-18" style="font-size: 20px">
                      {{ formatPrice(bank.money) }}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
      <loadingData v-if="loading"></loadingData>

      <div class="mt-4" v-if="hasData">
        <div class="bg5 table-responsive">
          <table class="table table-hover text-center borderless">
            <thead>
              <tr
                style="
                  border-radius: 16px;
                  background-color: #d4476f;
                  color: white;
                  font-weight: 700;
                "
              >
                <th>Tên quỹ</th>
                <th>Số tài khoản</th>
                <th style="width: 15%;">Tên ngân hàng</th>
                <th style="width: 12%;">Số tiền</th>
                <th class="text-center">Tài khoản</th>
                <!-- <th class="text-center">Hiển thị</th> -->
                <th>Trạng thái</th>
                <th style="width: 6%;">Hiển thị</th>
                <th class="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="fund in funds" :key="fund.id">
                <td>
                  {{ fund.code }}
                </td>
                <td>
                  <span v-if="fund.account_number > 0">
                    {{ formatNumberAccount(fund.account_number) }}
                  </span>
                  <span v-else>Tiền mặt</span>
                </td>
                <td>{{ fund.bank }}</td>
                <td>{{ formatPrice(fund.money) }}</td>
                <td class="text-center">{{ fund.account }}</td>
                <!-- <td class="text-center">
                  <input type="checkbox" />
                </td> -->
                <td>{{ formatActive(fund.active) }}</td>
                <td class="color-main" style="width: 5%">
                  <input
                    type="checkbox"
                    :value="display"
                    @click="onChangeFund(fund.id)"
                  />
                </td>
                <td style="width: 11%" class="color-main font-weight-bold">
                  <router-link
                    :to="{
                      name: 'chiTietQuy',
                      params: { fundId: fund.id },
                    }"
                  >
                    xem chi tiết
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else class="bgx p-3 text-center">
        <b>Chưa có thông tin quỹ.</b>
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
              >{{ index + 1 }}</span
            >
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
</template>
<script>
import { HTTP } from "@/main";
import loadingData from "@/components/loadingData";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { formatNumberAccount } from "@/main";
import { formatPrice } from "@/main";
export default {
  name: "quyTienMatVaNganHang",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    loadingData,
  },
  data() {
    return {
      salon_id: "",
      funds: {},
      display: [],
      listStore: {},
      listTotalBank: {},
      listChangeFund: [],
      paginate: {
        currentPage: 1,
        totalPage: "",
      },
      loading: true,
      hasData: false,
    };
  },
  beforeMount() {
    this.listFunds();
    this.getListStore();
  },
  methods: {
    changePage(index) {
      this.paginate.currentPage = index;

      this.listFunds();
    },
    onChange() {
      this.listFunds();
    },
    onChangeFund(id) {
      var index = 0;
      for (var i = 0; i < this.listChangeFund.length; i++) {
        if (this.listChangeFund[i] == id) {
          this.listChangeFund.splice(i, 1);
          index++;
        }
      }
      if (index == 0) {
        (this.listTotalBank = {}), this.listChangeFund.push(id);
      }
      console.log(JSON.stringify(this.listChangeFund));
      console.log(this.display);
      HTTP.get("/salon/main/manage/funds?display=" + this.listChangeFund)
        .then((res) => {
          var result = res.data;
          if (result.status === 1) {
            this.listTotalBank = result.data.data;
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // danh sach quy dau tu
    listFunds() {
      this.loading = true;
      this.hasData = false;
      (this.listChangeFund = []),
        HTTP.get(
          "/salon/main/manage/funds?page=" +
            this.paginate.currentPage +
            "&salon_id=" +
            this.salon_id
        )
          .then((res) => {
            var result = res.data;
            if (result.status === 1) {
              this.funds = result.data.data;
              this.listTotalBank = this.funds;
              this.paginate.totalPage = result.data.last_page;
              if (this.funds.length > 0) this.hasData = true;
              this.loading = false;

              // console.log(this.funds);
            } else {
              this.$swal("", "Chưa có quỹ!", "warning");
            }
          })
          .catch((e) => {
            this.errors.push(e);
          });
    },
    formatNumberAccount,
    // Danh sach tat ca cua hang
    getListStore() {
      HTTP.get("/salon/main/manage/branch/all").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listStore = data;
          }
        } else {
          // this.notification.status = true;
          // this.notification.message = result.message;
        }
        this.loading = false;
      });
    },
    // danh sach quy dau tu theo salon

    formatActive(index) {
      if (index == 1) {
        return "Đang hoạt động";
      } else return "Tạm dừng";
    },
    formatPrice,
  },
};
</script>

<style scoped>
* {
  font-size: 14px;
}

.bgx {
  background: linear-gradient(96.59deg, #ffffff 5.46%, #ffffff 100%);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}
.bg {
  background: linear-gradient(96.59deg, #ec4887 5.46%, #a5009e 100%);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.bg1 {
  background-color: white;
  border-radius: 50%;
  padding: 10px;
}

.bg2 {
  background: linear-gradient(96.98deg, #8f41ff 0%, #4423ff 100%);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.bg3 {
  background: linear-gradient(96.98deg, #ffb31d 0%, #ff6028 100%);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.bg4 {
  background: linear-gradient(96.98deg, #36caff 0%, #0066ff 100%);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.bg5 {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
}

.bg6 {
  background: #ffffff;
  opacity: 0.8;
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.hover:hover {
  cursor: pointer;
}
.table td,
.table th {
  padding: 0.5rem;
}
@media only screen and (max-width: 768px) {
  .img0 {
    transform: translate(0%, 0%) !important;
    width: 45px !important;
  }
  .font-18 {
    font-size: 18px !important;
  }
}
</style>
