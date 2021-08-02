<template>
  <div class="col-md-10 res mb-5 mt-3 res-0">
    <div style="font-size: 120%" class="font-weight-bold mt-3 color-main">
      CHI TIẾT BÁO CÁO HÀNG HOÁ
    </div>
    <div class="table-responsive mt-3">
      <table class="table table-hover">
        <thead>
          <tr>
            <td style="width: 15%"><b>Tên salon</b></td>
            <td style="width: 15%"> {{detail.salon_name}}</td>
            <td style="width: 15%"><b>Đơn vị tính</b></td>
            <td style="width: 35%">{{ detail.unit }}</td>
          </tr>
          <tr>
            <td style="width: 15%"><b>Mã hàng</b></td>
            <td style="width: 35%">{{ detail.sku }}</td>
            <td style="width: 15%"><b>Tên hàng</b></td>
            <td style="width: 35%">{{detail.name}}</td>
          </tr>

          <tr>
            <td style="width: 15%"><b>Tồn đầu kỳ: </b></td>
            <td style="width: 15%">
              Số lượng: {{ detail.amount_early_balance }}
            </td>
            <td style="width: 15%"><b>Nhập trong kỳ</b></td>
            <td colspan="">Số lượng: {{ detail.amount_import }}</td>
          </tr>
          <tr>
            <td style="width: 15%"><b>Xuất huỷ</b></td>
            <td>Số lượng: {{ detail.export_cancel }}</td>
            <td style="width: 15%"><b>Xuất khác</b></td>
            <td>Số lượng: {{ detail.export_more }}</td>
          </tr>
          <tr>
            <td style="width: 15%"><b>Tồn cuối kỳ</b></td>
            <td>Số lượng: {{ detail.amount_ending_stocks }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td style="width: 15%"><b>Khối lượng</b></td>
            <td colspan="3">{{ detail.weight + ' gram' }}</td>
          </tr>
          <tr>
            <td style="width: 15%"><b>dung tich</b></td>
            <td colspan="3">{{ detail.capacity + ' milliliter' }}</td>
          </tr>
        </thead>
      </table>
      <!-- Bảng xuất Huỷ- xuất Khác -->
      <div class="mt-3">
        <p class="font-weight-bold color-main" style="font-size: 130%">
          Bảng xuất huỷ - xuất khác<br />
        </p>
        <div class="bg5 table-responsive">
          <table class="table text-center table-hover">
            <thead>
              <tr
                style="
                  border-radius: 16px;
                  background-color: #d4476f;
                  color: white;
                  font-weight: 700;
                "
              >
                <th>Ngày xuất</th>
                <th colspan="2">Kiểu xuất</th>
                <th>Số lượng</th>
                <th style="width: 40%;">Lý do</th>
              </tr>
            </thead>
            <tbody v-if="msg == ''">
              <tr v-for="(item, index) in xuatKho" :key="index">
                <td>{{ formatDate(item.input_date) }}</td>
                <td>
                  <span v-if="item.type == 2">Xuất khác</span>
                  <span v-if="item.type == 1"></span>
                </td>
                <td>
                  <span v-if="item.type == 2"></span>
                  <span v-if="item.type == 1">Xuất huỷ</span>
                </td>
                <td>{{ item.amount }}</td>
                <td>{{ item.reason }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5" class="font-weight-bold ">{{ msg }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- ======================== -->
      <div class="mt-4 text-center pb-3">
        <span @click="backPage" class="borderx hover mr-3 color-main">
          Quay lại
        </span>

        <span
          @click="deleteReport(detail.id)"
          class="borderx hover mr-3 color-main"
        >
          Xoá
        </span>
        <!-- <router-link
          :to="{
            name: 'capNhatBaoCaoHangHoa',
            params: { reportId: detail.id },
          }"
        >
          <span class="borderx hover mr-3 color-main"> Cập nhật </span>
        </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP, formatPrice, formatDate } from "@/main";
export default {
  name: "chiTietBaoCaoHangHoa",
  data() {
    return {
      salon_id: "",
      product_id: "",
      detail_id: "",
      msg: "",
      detail: [],
      detailSalon: [],
      detailProduct: [],
      errors: [],
      xuatKho: [],
    };
  },
  created() {
    this.detail_id = this.$route.params.reportId;
  },
  beforeMount() {
    this.getListDetail();
  },
  methods: {
    // danh sách
    getListDetail() {
      HTTP.get(`/salon/main/manage/reportGoods/${this.detail_id}`).then(
        (response) => {
          this.detail = response.data.data[0];
          this.salon_id = response.data.data[0].salon_id;
          this.product_id = response.data.data[0].product_id;
          this.getListXuatKho();
        }
      );
    },
    // ===========

    // Danh sách xuất kho
    getListXuatKho() {
      HTTP.get(
        `/salon/main/manage/product/list-product-error?salon_id=${this.salon_id}&product_id=${this.product_id}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          if (result.data.length > 0) {
            this.xuatKho = result.data;
          } else this.msg = "Chưa có dữ liệu!!!";
        }
      });
    },
    // ==================
    deleteReport(reportId) {
      this.$swal({
        title: "Xoá báo cáo?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete("/salon/main/manage/reportGoods/" + reportId + "/delete")
            .then((res) => {
              let result = res.data;
              // if (result.status == 1) {
              this.$swal("", result.message, "success");
              this.backPage();
              // } else {
              //   this.$swal("", result.message, "error");
              // }
            })
            .catch((e) => {
              this.$swal("", "Xoá thành công!", "success");
              this.backPage();
              this.errors.push(e);
            });
        }
      });
    },
    backPage() {
      history.back();
    },
    // =================
    formatDate,
    formatPrice,
  },
};
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
.bg5 {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
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
.nameSalon {
  color: black;
}
.nameSalon:hover {
  color: #d4476f;
}
.borderx {
  border: 1px solid #d4476f;
  padding: 5px 25px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
