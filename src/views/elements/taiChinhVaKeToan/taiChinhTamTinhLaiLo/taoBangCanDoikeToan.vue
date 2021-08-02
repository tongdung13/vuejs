<template>
  <div class="bg-8 pt-3">
    <div class="text-center" style="position: relative">
      <span style="font-size: 15px; font-weight: bold"
        >TẠO BẢNG BÁO CÁO KẾT QUẢ KINH DOANH</span
      ><br />
      <div>
        <div>
          (Ban hành theo Thông tư số 133/2016/TT-BTC ngày 26/8/2016 của Bộ Tài
          chính)
        </div>
        <div
          class="pl-3 pr-3 p-1 color-main"
          style="position: absolute; right: 0; top: 0"
        >
          <span class="dropdown" style="float: right; margin-top: -6px">
            <span class="dropbtn">
              <img
                src="../../../../assets/image/more-horizontal.png"
                alt=""
                style="width: 31px; padding: 5px !important"
                class="border1"
              />
            </span>
            <div class="dropdown-content">
              <div>
                <span>Xuất báo cáo</span>
              </div>
              <div>
                <span>Tạo bảng báo cáo</span>
              </div>
              <div>
                <span>Cập nhật</span>
              </div>
              <div>
                <span class="text-danger">Xoá báo cáo</span>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="table-responsive mt-2" style="border-radius: 16px">
      <table class="table table-hover p-0">
        <thead>
          <tr class="bg-tr">
            <th>STT</th>
            <th>Chỉ tiêu</th>
            <th style="width: 20%">Mô tả</th>
            <th>Số năm nay</th>
            <th>Số năm trước</th>
            <th>TK ghi nợ</th>
            <th>TK ghi có</th>
            <th style="width: 20%">Lưu ý</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in 15" :key="index">
            <td>
              <b>#{{ item }}</b>
            </td>
            <td>
              {{ table.data[index].content }}
            </td>
            <td>
              <input type="text" v-model="table.data[index].description" />
            </td>
            <td>
              <input type="text" v-model="table.data[index].kpi_this_year" />
            </td>
            <td>
              <input type="text" v-model="table.data[index].kpi_last_year" />
            </td>
            <td class="text-center">
              <input type="text" v-model="table.data[index].credit_account" />
            </td>
            <td class="text-center">
              <input type="text" v-model="table.data[index].debit_account" />
            </td>
            <td class="text-center">
              <input type="text" v-model="table.data[index].note" />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-3 text-center pb-3">
        <span @click="backPage" class="borderx hover mr-3 color-main">
          Quay lại
        </span>
        <button @click="creadTable" class="borderx color-main">
          Lưu và hiển thị
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
// import { formatDate } from "@/main";
// import { formatNumber } from "@/main";
export default {
  name: "taoBangCanDoiKeToan",
  data() {
    return {
      table: {
        salonId: 1,
        data: [
          {
            target: "1",
            content: " Doanh thu bán hàng và cung cấp dịch vụ",
            description: "",
            kpi_this_year: "",
            kpi_last_year: "",
            credit_account: "",
            debit_account: "",
            note: "",
          },
          {
            target: "2",
            content: "Các khoản giảm trừ doanh thu ",
            description: "",
            kpi_this_year: "",
            kpi_last_year: "",
            credit_account: "",
            debit_account: "",
            note: "",
          },
          {
            target: "3",
            content:
              " Doanh thu thuần về bán hàng và cung cấp dịch vụ (10 = 01 - 02]",
            description: "",
            kpi_this_year: "",
            kpi_last_year: "",
            credit_account: "",
            debit_account: "",
            note: "",
          },
          {
            target: "4",
            content: " Giá vốn hàng bán",
            description: "",
            kpi_this_year: "",
            kpi_last_year: "",
            credit_account: "",
            debit_account: "",
            note: "",
          },
          {
            target: "5",
            content:
              "Lợi nhuận gộp về bán hàng và cung cấp dịch vụ (20 = 10 - 11] ",
            description: "",
            kpi_this_year: "",
            kpi_last_year: "",
            credit_account: "",
            debit_account: "",
            note: "",
          },
          {
            target: "6",
            content: "Doanh thu hoạt động tài chính ",
            description: "",
            kpi_this_year: "",
            kpi_last_year: "",
            credit_account: "",
            debit_account: "",
            note: "",
          },
          {
            target: "7",
            content: " Chi phí tài chính",
            description: "",
            kpi_this_year: "",
            kpi_last_year: "",
            credit_account: "",
            debit_account: "",
            note: "",
          },
          {
            target: "8",
            content: "Chi phí quản lý kinh doanh ",
            description: "",
            kpi_this_year: "",
            kpi_last_year: "",
            credit_account: "",
            debit_account: "",
            note: "",
          },
          {
            target: "9",
            content:
              "Lợi nhuận thuần từ hoạt động kinh doanh (30 = 20 + 21 - 22 – 24]	 ",
            description: "",
            kpi_this_year: "",
            kpi_last_year: "",
            credit_account: "",
            debit_account: "",
            note: "",
          },
          {
            target: "10",
            content: "Thu nhập khác",
            description: "",
            kpi_this_year: "",
            kpi_last_year: "",
            credit_account: "",
            debit_account: "",
            note: "",
          },
          {
            target: "11",
            content: " Chi phí khác",
            description: "",
            kpi_this_year: "",
            kpi_last_year: "",
            credit_account: "",
            debit_account: "",
            note: "",
          },
          {
            target: "12",
            content: " Lợi nhuận khác (40 = 31 - 32]",
            description: "",
            kpi_this_year: "",
            kpi_last_year: "",
            credit_account: "",
            debit_account: "",
            note: "",
          },
          {
            target: "13",
            content: " Tổng lợi nhuận kế toán trước thuế (50 = 30 + 40]",
            description: "",
            kpi_this_year: "",
            kpi_last_year: "",
            credit_account: "",
            debit_account: "",
            note: "",
          },
          {
            target: "14",
            content: " Chi phí thuế TNDN",
            description: "",
            kpi_this_year: "",
            kpi_last_year: "",
            credit_account: "",
            debit_account: "",
            note: "",
          },
          {
            target: "15",
            content: " Lợi nhuận sau thuế thu nhập doanh nghiệp (60 = 50 – 51]",
            description: "",
            kpi_this_year: "",
            kpi_last_year: "",
            credit_account: "",
            debit_account: "",
            note: "",
          },
        ],
      },
    };
  },
  //   created() {
  //     HTTP.get(`/salon/main/manage/branch/all`).then((res) => {
  //       this.listSalonId = res.data.data;
  //       // console.log(this.listSalonId);
  //     });
  //   },
  //   beforeMount() {
  //     this.listFinanceAccountings();
  //   },
  //   methods: {
  //     // trả tên salon theo Id
  //     checkSalonId(salon) {
  //       var lengSalon = this.listSalonId.length;
  //       for (let index = 0; index < lengSalon; index++) {
  //         if (salon === this.listSalonId[index].id)
  //           return this.listSalonId[index].salon_name;
  //       }
  //     },
  //     // danh sách tài chính
  //     listFinanceAccountings() {
  //       HTTP.get(`/salon/main/manage/finance-accounting?type=1`).then((res) => {
  //         let result = res.data;
  //         // console.log(result);
  //         if (result.status === 1) {
  //           let data = result.data.data;
  //           this.listFinanceAccounting = data;
  //           // console.log(this.listFinanceAccounting);
  //         }
  //       });
  //     },
  //     formatDate,
  //     formatNumber,
  //   },
  methods: {
    creadTable() {
      HTTP.post(
        `/salon/main/manage/finance-accounting/store?type=1`,
        this.table
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.$swal("", result.message, "success");
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    backPage() {
      history.back();
    },
  },
};
</script>
<style scoped>
.bg-tr {
  background: linear-gradient(96.98deg, #8f41ff 0%, #4423ff 100%);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  color: white;
  font-weight: 100 !important;
}
th {
  font-weight: 100 !important;
}
table td,
table th {
  padding: 5px;
  vertical-align: middle;
  font-size: 12px !important;
}
table th {
  font-weight: bold !important;
  text-align: center;
}
.dropbtn {
  color: white;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.dropdown-content div {
  cursor: pointer;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: right;
}

.dropdown-content div:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
table td input[type="text"] {
  width: 100%;
  border: none;
}
.borderx {
  border: 1px solid #d4476f;
  padding: 5px 25px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
