<template>
  <div class="col-md-10 mb-5 res mt-3">
    <div class="mt-4">
      <h5 class="color-main font-weight-bold" style="font-size: 16px">
        BÁO CÁO THU CHI
      </h5>
    </div>
    <div class="row mt-3">
      <div class="col-md-8 col-sm-8 col-8">
        <div class="row pl-3">
          <div>
            <span>
              Ngày bắt đầu: <br />
              <input type="date" v-model="startDate" />
            </span>
          </div>
          <div class="ml-3">
            <span>
              Ngày kết thúc: <br />
              <input type="date" @change="changeDate()" v-model="endDate" />
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-4 col-4">
        <span
          class="color-main input hover"
          style="float: right; font-size: 14px"
        >
          XUẤT BÁO CÁO
        </span>
      </div>
    </div>

    <loadingData v-if="loading"></loadingData>
    <div class="bg6 p-2 mt-4" v-if="hasData && moneyControl == ''">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-6">
          <div class="font-weight-bold color-main">
            TỔNG THU CHI THÁNG TRƯỚC:
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-6 text-right">
          <div class="font-weight-bold color-main">
            {{ formatPrice(totalLastMonth) }}
          </div>
        </div>
      </div>
    </div>
    <div class="mt-1 p-0">
      <div class="mt-4">
        <div class="bg5 table-responsive">
          <table class="table table-hover borderless" style="font-size: 14px">
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
                <th>Loại phiếu</th>
                <th>Ngày</th>
                <th>Tên KH</th>
                <th>Nội dung</th>
                <th class="text-right">Số tiền</th>
              </tr>
            </thead>
            <tbody v-if="hasData">
              <!-- <tr>
                <td colspan="5" class="text-center">Tiền dư đầu kỳ</td>
                <td colspan="1">456.321.111,00đ</td>
              </tr> -->
              <tr v-for="(report, index) in listReport" :key="index">
                <td>{{ report.number }}</td>
                <td>{{ report.type }}</td>
                <td>{{ formatDate(report.created_at) }}</td>
                <td>{{ report.payer }}</td>
                <td>{{ report.content }}</td>
                <td class="text-right">
                  <span>{{
                    report.type == "Phiếu Chi"
                      ? "- " + formatPrice(report.money)
                      : formatPrice(report.money)
                  }}</span>
                </td>
              </tr>
              <tr>
                <td colspan="5" class="font-weight-bold color-main">
                  TỔNG THU THÁNG NÀY
                </td>
                <td class="text-right font-weight-bold color-main">
                  {{ formatPrice(totalThisMonth) }}
                </td>
              </tr>
            </tbody>
            <tbody v-else class="text-center">
              <td colspan="5" class="color-main">Chưa có báo cáo.</td>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- <div class="bg6 p-2 mt-4" v-if="hasData && moneyControl == ''">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-6">
          <div class="font-weight-bold color-main">TỔNG THU CHI THÁNG NÀY:</div>
        </div>
        <div class="col-md-6 col-sm-6 col-6 text-right">
          <div class="font-weight-bold color-main">
            {{ formatPrice(totalThisMonth) }}
          </div>
        </div>
      </div>
    </div> -->
    <div class="bg6 p-2 mt-4" v-if="hasData && moneyControl != ''">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-6">
          <div class="font-weight-bold color-main">TỔNG THU CHI:</div>
        </div>
        <div class="col-md-6 col-sm-6 col-6 text-right">
          <div class="font-weight-bold color-main">
            {{ formatPrice(moneyControl) }}
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
            Cuối</span
          >
        </li>
      </ul>
    </div>
    <!-- ============ -->
  </div>
</template>
<script>
import { HTTP } from "@/main";
import loadingData from "@/components/loadingData";
import { formatDate } from "@/main";
import { formatPrice } from "@/main";
export default {
  name: " baoCaoThuChi ",
  components: {
    loadingData,
  },
  data() {
    return {
      report: {},
      listReport: {},
      listDay: {},
      msg: "",
      startDate: "",
      endDate: "",
      years: [],
      listSalonId: {},
      loading: true,
      hasData: false,
      totalThisMonth: "",
      totalLastMonth: "",
      moneyControl: "",
      paginate: {
        currentPage: 1,
        totalPage: "",
      },
    };
  },
  created() {
    HTTP.get(`/salon/main/manage/branch/all`).then((res) => {
      this.listSalonId = res.data.data;
    }); // console.log(this.listSalonId);
  },
  beforeMount() {
    this.listReports();
  },
  methods: {
    // tìm kiếm theo page
    changePage(index) {
      this.paginate.currentPage = index;

      this.listReports();
    },

    changeDate() {
      // this.paginate.currentPage = 1;
      this.listReports();
    },

    // trả tên salon theo Id
    checkSalonId(salon) {
      var lengSalon = this.listSalonId.length;
      for (let index = 0; index < lengSalon; index++) {
        if (salon === this.listSalonId[index].id)
          return this.listSalonId[index].salon_name;
      }
    },

    // Danh sách báo cáo
    listReports() {
      this.msg = "";
      this.hasData = false;
      this.loading = true;
      HTTP.get(
        `/salon/main/manage/monthlyReport?start_date=${this.startDate}&end_date=${this.endDate}&page=${this.paginate.currentPage}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          if (result.data.data.data.length > 0) {
            this.hasData = true;
            this.listReport = result.data.data.data;
            this.totalThisMonth = result.data.totalThisMonth;
            this.totalLastMonth = result.data.totalLastMonth;
            if (result.data.moneyControl)
              this.moneyControl = result.data.moneyControl;
            this.paginate.totalPage = result.data.data.last_page;
          } else {
            this.hasData = false;
            this.paginate.totalPage = 0;
          }
        }
        this.loading = false;
      });
    },
    formatDate,
    formatPrice,
    // ===================
  },
};
</script>
<style scoped>
.input,
input {
  background: rgba(255, 255, 255, 0.8);
  /* border: 1px solid #d4476f; */
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

.bg5 {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
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
input[type="date"] {
  padding: 2px 5px 2px 7px !important;
}
</style>
