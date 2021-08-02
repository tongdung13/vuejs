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
        name: 'themSoChiTiet',
      }"
    >
      <span class="inputx hover color-main mr-3">+ Thêm</span>
    </router-link>
    <div class="mt-4">
      <h5 class="color-main font-weight-bold" style="font-size: 16px">
        SỔ CHI TIẾT HÀNG HOÁ
      </h5>
    </div>
    <div class="mt-3">
      <div class="row">
        <div class="col-md-6 col-sm-8 col-8">
          <table>
            <tr>
              <th>Ngày bắt đầu:</th>
              <th>Ngày kết thúc:</th>
            </tr>
            <tr>
              <td>
                <input type="date" v-model="startDate" @change="changeDate()" />
              </td>

              <td>
                <input type="date" @change="changeDate()" v-model="endDate" />
              </td>
            </tr>
          </table>
        </div>
        <div class="col-md-6 col-sm-8 col-8 text-right padding-0">
          <router-link
            :to="{
              name: 'danhSachBaoCao',
            }"
          >
            <span class="color-main bg-40 hover mr-3 font-weight-bold">
              BÁO CÁO HÀNG HOÁ
            </span>
          </router-link>
          <span class="color-main bg-40 hover font-weight-bold">
            XUẤT BÁO CÁO
          </span>
        </div>
      </div>
    </div>
    <loadingData v-if="loading"></loadingData>

    <div class="mt-1 p-0" v-if="hasData">
      <div class="mt-4">
        <div class="bg5 table-responsive" style="font-size: 11px !important">
          <table class="table table-hover borderless table-striped text-center">
            <thead>
              <tr
                class="table-bordered"
                style="
                  border-radius: 16px;
                  background-color: #d4476f;
                  color: white;
                  font-weight: 700;
                  text-align: center;
                "
              >
                <th colspan="6">Thông tin phiếu</th>
                <th>Nhập</th>
                <th>Xuất</th>
                <th>Tồn</th>
                <th></th>
              </tr>
              <tr
                style="
                  border-radius: 16px;
                  background-color: #d4476f;
                  color: white;
                  font-weight: 700;
                  text-align: center;
                "
              >
                <th>STT</th>
                <th>Ngày ghi sổ</th>
                <th>Sổ chứng từ</th>
                <th>Sổ hoá đơn</th>
                <th>Diễn giải</th>
                <th>Kho</th>
                <!-- <th>Đơn giá</th> -->
                <th style="border-left: 1px solid white">Số lượng</th>
                <!-- <th>Số tiền</th> -->
                <th style="border-left: 1px solid white">Số lượng</th>
                <!-- <th>Số tiền</th> -->
                <th style="border-left: 1px solid white">Số lượng</th>
                <!-- <th>Số tiền</th> -->
                <!-- <th>Đơn giá BQ</th> -->
                <th style="border-left: 1px solid white">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in listDetailGoods" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ formatDate(item.record_date) }}</td>
                <td>{{ item.voucher_book }}</td>
                <td>{{ item.invoice_book }}</td>
                <td>{{ item.explain }}</td>
                <td>{{ item.storage }}</td>
                <!-- <td>{{ formatPrice(item.unit_price) }}</td> -->
                <td>{{ item.amount_import }}</td>
                <!-- <td>{{ formatPrice(item.price_import) }}</td> -->
                <td>{{ item.amount_export }}</td>
                <!-- <td>{{ formatPrice(item.price_export) }}</td> -->
                <td>{{ item.amount_ending_stocks }}</td>
                <!-- <td>{{ formatPrice(item.price_ending_stocks) }}</td> -->
                <!-- <td>{{ formatPrice(item.average_unit_price) }}</td> -->
                <td>
                  <router-link
                    :to="{
                      name: 'chiTietSoHangHoa',
                      params: { detailId: item.id },
                    }"
                  >
                    <span class="color-main mr-2" style="cursor: pointer"
                      >Xem chi tiết</span
                    >
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else class="mt-2">
      <b class="color-main">Không có số chi tiết hàng hoá.</b>
    </div>

    <!-- phân trang -->
    <div class="mt-3">
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
</template>
<script>
import { HTTP } from "@/main";
import { formatPrice } from "@/main";
import { formatDate } from "@/main";
import loadingData from "@/components/loadingData";

export default {
  name: "soChiTietHangHoa",
  components: {
    loadingData,
  },
  data() {
    return {
      listDetailGoods: {},
      listStore: {},
      salon_id: "",
      startDate: "",
      endDate: "",
      url: "",
      paginate: {
        currentPage: 1,
        totalPage: "",
      },
      loading: true,
      hasData: false,
      message: false,
    };
  },
  beforeMount() {
    this.getListDetailGoods();
    this.getListStore();
  },
  methods: {
    changePage(index) {
      this.paginate.currentPage = index;

      this.getListDetailGoods();
    },

    onChange() {
      this.paginate.currentPage = 1;
      this.getListDetailGoods();
    },
    changeDate() {
      this.paginate.currentPage = 1;
      this.getListDetailGoods();
    },

    getListDetailGoods() {
      let page = this.paginate.currentPage;
      // console.log(this.startDate);
      HTTP.get(
        `/salon/main/manage/detailGoods?start_date=${this.startDate}&end_date=${this.endDate}&page=${page}&salon_id=${this.salon_id}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;
          // console.log(data);
          if (data.data.length > 0) {
            this.hasData = true;
            this.listDetailGoods = data.data;
            this.paginate.totalPage = data.last_page;
            // console.log(this.listReportGoods);
          } else {
            this.hasData = false;
          }
        }
        this.loading = false;
      });
    },
    formatPrice,
    formatDate,

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
* {
  font-size: 14px;
}
table th {
  padding: 10px 5px;
  border-bottom: none;
}

.bg5 {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
}
.input,
input {
  background: rgba(255, 255, 255, 0.8);
  color: #d4476f;
  border: none;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 5px 10px;
  outline: none;
}

.bg-8 {
  background: rgba(255, 255, 255, 0.8);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.bg-40 {
  background: rgba(255, 255, 255, 0.8);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 40px;
  padding: 7px 15px;
}

.bg6 {
  background: #ffffff;
  opacity: 0.8;
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.hover:hover {
  background-color: #d4476f;
  color: white;
}
option {
  color: #d4476f;
}
.table td,
.table th {
  font-size: 13px;
  padding: 5px;
  vertical-align: middle;
}
@media only screen and (max-width: 768px) {
  .padding-0 {
    padding: 0;
  }
}
</style>
