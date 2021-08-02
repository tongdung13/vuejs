<template>
  <div class="col-md-10 res mb-5 mt-3">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-12">
        <select
          name="salon_id"
          class="inputx mr-3 res-margin-0"
          id="cars"
          style="width: 30%; outline: none"
          v-model="salon_id"
          @change="changeStore()"
        >
          <option value="">Tất cả salon</option>

          <option v-for="salon in listStore" :key="salon.id" :value="salon.id">
            {{ salon.salon_name }}
          </option>
        </select>
        <span class="inputx hover color-main">Xuất báo cáo</span>
      </div>
    </div>

    <div class="mt-4">
      <div class="mt-3">
        <router-link
          :to="{ name: 'danhSachPhieuThu' }"
          class="input color-main hover mr-3"
        >
          PHIẾU THU
        </router-link>
        <router-link
          :to="{ name: 'danhSachPhieuChi' }"
          class="input color-main hover mr-3"
        >
          <span> PHIẾU CHI </span>
        </router-link>
      </div>
    </div>

    <div class="mt-3 bg-16">
      <div class="p-3">
        <div class="row">
          <div class="col">
            <h5 class="color-main">PHIẾU THU</h5>
          </div>
          <div class="col text-right">
            <router-link :to="{ name: 'themPhieuThu' }">
              <span class="hover inputx color-main">Thêm phiếu thu</span>
            </router-link>
          </div>
        </div>
        <div class="row pl-3">
          <div>
            <span>
              Ngày bắt đầu: <br />
              <input type="date" @change="changeDate()" v-model="startDate" />
            </span>
          </div>
          <div class="ml-3">
            <span>
              Ngày kết thúc: <br />
              <input type="date" @change="changeDate()" v-model="endDate" />
            </span>
          </div>
        </div>
        <loadingData v-if="loading"></loadingData>

        <div class="mt-1 p-0">
          <div class="bg6 p-2 mt-4" v-if="hasData && moneyControl == ''">
            <div class="row">
              <div class="col-md-6 col-sm-6 col-6">
                <div class="font-weight-bold color-main">
                  TỔNG THU THÁNG TRƯỚC:
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-6 text-right">
                <div class="font-weight-bold color-main">
                  {{ formatPrice(totalLastMonth) }}
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div class="bg5 table-responsive">
              <table
                class="table borderless text-center table-hover"
                style="font-size: 14px; overflow-x: auto"
              >
                <thead>
                  <tr
                    style="
                      border-radius: 16px;
                      background-color: #d4476f;
                      color: white;
                      font-weight: 700;
                    "
                  >
                    <th>Mã</th>
                    <th>Ngày</th>
                    <th>Tên KH</th>
                    <th>Tên salon</th>
                    <th>Nội dung</th>
                    <th>Số tiền</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody v-if="hasData">
                  <!-- <tr>
              <td colspan="7" class="text-center">Tiền dư đầu kỳ</td>
              <td colspan="2">456.321.111,00đ</td>
            </tr> -->
                  <tr v-for="(reciept, index) in listReceipt" :key="index">
                    <td>{{ reciept.number }}</td>
                    <td>{{ formatDate(reciept.created_at) }}</td>
                    <td>{{ reciept.payer }}</td>
                    <td>{{ checkSalonId(reciept.salon_id) }}</td>
                    <td>{{ reciept.content }}</td>
                    <td>{{ formatPrice(reciept.money) }}</td>
                    <td>
                      <router-link
                        :to="{
                          name: 'capNhatPhieuThu',
                          params: { phieuThuId: reciept.id },
                        }"
                      >
                        <span class="color-main mr-2" style="cursor: pointer"
                          >Cập nhật</span
                        ></router-link
                      >
                      <span
                        @click="deleteReciept(reciept.id)"
                        class="text-danger"
                        style="cursor: pointer"
                        >Xoá</span
                      >
                    </td>
                  </tr>
                </tbody>
                <tbody v-else class="text-center">
                  <th colspan="9" class="color-main">Chưa có phiếu thu.</th>
                </tbody>
              </table>
            </div>
          </div>
          <div class="bg6 p-2 mt-4" v-if="hasData && moneyControl == ''">
            <div class="row">
              <div class="col-md-6 col-sm-6 col-6">
                <div class="font-weight-bold color-main">
                  TỔNG THU THÁNG NÀY:
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-6 text-right">
                <div class="font-weight-bold color-main">
                  {{ formatPrice(totalThisMonth) }}
                </div>
              </div>
            </div>
          </div>
          <div class="bg6 p-2 mt-4" v-if="hasData && moneyControl != ''">
            <div class="row">
              <div class="col-md-6 col-sm-6 col-6">
                <div class="font-weight-bold color-main">TỔNG THU:</div>
              </div>
              <div class="col-md-6 col-sm-6 col-6 text-right">
                <div class="font-weight-bold color-main">
                  {{ formatPrice(moneyControl) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- phân trang -->
      <div v-if="paginate.totalPage <= 1"></div>
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
import { formatDate } from "@/main";
import { formatPrice } from "@/main";
export default {
  name: " danhSachPhieuThu ",
  components: {
    loadingData,
  },
  data() {
    return {
      listReceipt: {},

      msg: "",
      listSalonId: {},
      salon_id: "",
      url: "",
      startDate: "",
      endDate: "",
      listStore: {},
      totalThisMonth: "",
      totalLastMonth: "",
      moneyControl: "",
      paginate: {
        currentPage: 1,
        totalPage: "",
      },
      loading: true,
      hasData: false,
    };
  },
  created() {
    HTTP.get(`/salon/main/manage/branch/all`).then((res) => {
      this.listSalonId = res.data.data;
      // console.log(this.listSalonId);
    });
  },
  beforeMount() {
    this.listReceipts();
    this.getListStore();
  },
  methods: {
    changePage(index) {
      this.paginate.currentPage = index;

      this.listReceipts();
    },
    changeDate() {
      if (this.startDate && this.endDate) {
        this.loading = true;
        this.hasData = false;
        this.paginate.currentPage = 1;
        this.listReceipts();
      }
    },

    changeStore() {
      if (this.salon_id == "")
        sessionStorage.removeItem("salon_id", this.salon_id);
      else sessionStorage.setItem("salon_id", this.salon_id);
      this.paginate.currentPage = 1;
      this.listReceipts();
    },

    getListStore() {
      if (sessionStorage.getItem("salon_id")) {
        this.salon_id = sessionStorage.getItem("salon_id");
      }
      HTTP.get("/salon/main/manage/branch/all").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listStore = data;
          }
        } else {
          this.$swal("", result.message, "warning");
        }
        this.loading = false;
      });
    },
    // trả tên salon theo Id
    checkSalonId(salon) {
      var lengSalon = this.listSalonId.length;
      for (let index = 0; index < lengSalon; index++) {
        if (salon === this.listSalonId[index].id)
          return this.listSalonId[index].salon_name;
      }
    },
    //   danh sách phiếu thu
    listReceipts() {
      if (sessionStorage.getItem("salon_id")) {
        this.salon_id = sessionStorage.getItem("salon_id");
      }
      console.log(this.salon_id);

      HTTP.get(
        `/salon/main/manage/receipts?salon_id=${this.salon_id}&page=${this.paginate.currentPage}&start_date=${this.startDate}&end_date=${this.endDate}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;
          if (data.data.data.length > 0) {
            this.hasData = true;
            this.listReceipt = data.data.data;
            this.paginate.totalPage = data.data.last_page;

            this.totalThisMonth = result.data.totalThisMonth;
            this.totalLastMonth = result.data.totalLastMonth;
            if (result.data.moneyControl)
              this.moneyControl = result.data.moneyControl;
          } else {
            this.paginate.totalPage = 0;
            this.hasData = false;
          }
          console.log(this.paginate.totalPage);
        } else {
          this.msg = "Chưa có phiếu thu";
        }
        this.loading = false;
      });
    },

    // ==============

    // Xoá phiếu thu
    deleteReciept(recieptId) {
      this.$swal({
        title: "Xoá phiếu thu?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete(`/salon/main/manage/receipts/${recieptId}/delete`).then(
            (res) => {
              let result = res.data;
              if (result.status === 1) {
                this.$swal("Đã xoá!", result.message, "success");
                this.listReceipts();
              } else {
                this.$swal("", result.message, "error");
              }
            }
          );
        }
      });
    },
    // =================
    formatDate,
    formatPrice,
  },
};
</script>

<style scoped>
.bg5 {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
}
.router-link-active,
.router-link-exact-active {
  background: #d4476f;
  color: white;
}
.bg-8 {
  background: rgba(255, 255, 255, 0.8);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.bg-16 {
  background: rgba(255, 255, 255, 0.3);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.bg5 {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
}
.bg6 {
  background: #ffffff;
  opacity: 0.8;
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
input[type="date"] {
  padding: 2px 5px 2px 7px !important;
}
</style>
