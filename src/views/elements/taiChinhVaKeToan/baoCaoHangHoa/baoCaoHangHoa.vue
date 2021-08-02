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
        name: 'themBaoCaoHangHoa',
      }"
    >
      <span class="inputx hover color-main mr-3">+ Thêm</span>
    </router-link>
    <a>
      <span class="inputx hover color-main mr-3">Xuất báo cáo</span>
    </a>
    <div class="mt-4">
      <h5 class="color-main font-weight-bold" style="font-size: 16px">
        BÁO CÁO HÀNG HOÁ
      </h5>
    </div>

    <div class="mt-3">
      <div class="row">
        <div class="col-md-8 col-sm-8 col-8">
          <table>
            <tr>
              <th>Ngày bắt đầu:</th>
              <th>Ngày kết thúc:</th>
            </tr>
            <tr>
              <td class="pr-3">
                <input type="date" v-model="startDate" @change="changeDate()" />
              </td>

              <td>
                <input type="date" @change="changeDate()" v-model="endDate" />
              </td>
            </tr>
          </table>
        </div>
        <div class="col-md-4 col-sm-8 col-8 text-right padding-0">
          <!-- <router-link
            :to="{
              name: 'soChiTietHangHoa',
            }"
          >
            <span class="color-main bg-40 hover mr-3 font-weight-bold">
              SỔ CHI TIẾT
            </span>
          </router-link> -->
          <span class="color-main bg-40 hover font-weight-bold">
            XUẤT BÁO CÁO
          </span>
        </div>
      </div>
    </div>

    <div class="mt-2 mb-2" v-if="message == true">
      <span class="color-main font-weight-bold">Lỗi kết nối</span>
    </div>

    <loadingData v-if="loading"></loadingData>
    <div class="mt-1 p-0">
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
                <th colspan="3">Hàng hoá - Vật tư</th>
                <th>Tồn đầu kỳ</th>
                <th>Nhập trong kỳ</th>
                <th>Xuất huỷ</th>
                <th>Xuất khác</th>
                <th>Xuất bán</th>
                <th>Tồn cuối kỳ</th>
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
                <th>Mã hàng</th>
                <th>Tên hàng</th>
                <th style="border-right: 1px solid white">DVT</th>
                <!-- <th>Chủng loại</th>
                <th style="border-right: 1px solid white">DVT</th> -->
                <th style="border-right: 1px solid white">Số lượng</th>
                <!-- <th style="border-right: 1px solid white">Số tiền</th> -->
                <th style="border-right: 1px solid white">Số lượng</th>
                <!-- <th style="border-right: 1px solid white">Số tiền</th> -->
                <th style="border-right: 1px solid white">Số lượng</th>
                <th style="border-right: 1px solid white">Số lượng</th>
                <th style="border-right: 1px solid white">Số lượng</th>
                <!-- <th style="border-right: 1px solid white">Số tiền</th> -->
                <th style="border-right: 1px solid white">Số lượng</th>
                <!-- <th>Số tiền</th> -->
                <th style="border-right: 1px solid white">Thao tác</th>
              </tr>
            </thead>
            <tbody v-if="hasData">
              <tr v-for="item in listReportGoods" :key="item.id">
                <td>{{ item.sku }}</td>
                <td>{{ item.name }}</td>
                <!-- <td>{{ item.category }}</td>-->
                <td>{{item.weight + " " + item.unit}}</td> 
                <td>{{ item.amount_early_balance }}</td>
                <!-- <td>{{ formatPrice(item.price_early_balance) }}</td> -->
                <td>{{ item.amount_import }}</td>
                <td>{{ item.export_cancel }}</td>
                <td>{{ item.export_more }}</td>
                <td>{{ item.export_sales }}</td>
                <td>{{ item.amount_ending_stocks }}</td>
                <!-- <td>{{ formatPrice(item.price_ending_stocks) }}</td> -->
                <td>
                  <router-link
                    :to="{
                      name: 'chiTietBaoCaoHangHoa',
                      params: { reportId: item.id },
                    }"
                  >
                    <span class="color-main mr-2" style="cursor: pointer"
                      >Xem chi tiết</span
                    >
                  </router-link>
                </td>
              </tr>
            </tbody>
            <tbody v-else class="mt-2">
              <td colspan="8" class="color-main text-center">
                Không có báo cáo hàng hoá.
              </td>
            </tbody>
          </table>
        </div>
      </div>
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
</template>
<script>
import { HTTP } from "@/main";
import { formatPrice } from "@/main";
import loadingData from "@/components/loadingData";

export default {
  name: "danhSachBaoCao",
  components: {
    loadingData,
  },
  data() {
    return {
      listReportGoods: {},
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
    this.getListReportGoods();
    this.getListStore();
  },
  methods: {
    changePage(index) {
      this.paginate.currentPage = index;

      this.getListReportGoods();
    },
    changeDate() {
      // this.paginate.currentPage = 1;
      this.getListReportGoods();
    },

    onChange() {
      this.getListReportGoods();
    },

    getListReportGoods() {
      this.loading = true;
      this.hasData = false;
      let page = this.paginate.currentPage;
      HTTP.get(
        `/salon/main/manage/reportGoods?start_date=${this.startDate}&end_date=${this.endDate}&page=${page}&salon_id=${this.salon_id}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;
          if (data.data.length > 0) {
            this.hasData = true;
            this.listReportGoods = data.data;
            this.paginate.totalPage = data.last_page;
            // console.log(this.listReportGoods);
          }
        } else {
          this.message = true;
        }
        this.loading = false;
      });
    },
    formatPrice,

    getListStore() {
      HTTP.get("/salon/main/manage/branch/all").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listStore = data;
          }
        }
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

@media only screen and (max-width: 768px) {
  .padding-0 {
    padding: 0;
  }
}
</style>
