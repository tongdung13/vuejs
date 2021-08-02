<template>
  <div class="bg-8 pt-3">
    <div class="text-center" style="position: relative">
      <span style="font-size: 15px; font-weight: bold"
        >BẢNG BÁO CÁO LƯU CHUYỂN THÔNG TIN</span
      ><br />
      <div>
        <div>
          (Ban hành theo Thông tư số 133/2016/TT-BTC ngày 26/8/2016 của Bộ Tài
          chính)
        </div>
        <div
          class="bg-16 pl-3 pr-3 p-1 xuatBaoCao color-main"
          style="position: absolute; right: 0; top: 0"
        >
          Xuất báo cáo
        </div>
      </div>
    </div>
    <div class="table-responsive mt-2" style="border-radius: 16px">
      <table class="table table-hover p-0">
        <thead>
          <tr class="bg-tr">
            <th>STT</th>
            <th>Mã</th>
            <th style="width: 6%;">Salon</th>
            <th style="width: 6%">Chỉ tiêu</th>
            <th style="width: 20%">Mô tả</th>
            <th>Số năm nay</th>
            <th>Số năm trước</th>
            <th>TK ghi nợ</th>
            <th>TK ghi có</th>
            <th style="width: 20%">Lưu ý</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listFinanceAccounting" :key="index">
            <td>
              <b>#{{ index }}</b>
            </td>
            <td>{{ item.code }}</td>
            <td>{{ checkSalonId(item.salon_id) }}</td>
            <td>{{ item.target }}</td>
            <td>{{ item.description }}</td>
            <td class="text-center">{{ formatNumber(item.kpi_this_year) }}</td>
            <td class="text-center">{{ formatNumber(item.kpi_last_year) }}</td>
            <td class="text-center">{{ formatNumber(item.credit_account) }}</td>
            <td class="text-center">{{ formatNumber(item.debit_account) }}</td>
            <td>{{ item.note }}</td>
            <td class="text-center">
              <span>Cập nhật</span><br />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatDate } from "@/main";
import { formatNumber } from "@/main";
export default {
  name: "baoCaoLuuChuyenTienTe",
  data() {
    return {
      listSalonId: {},
      listFinanceAccounting: {},
    };
  },
  created() {
    HTTP.get(`/salon/main/manage/branch/all`).then((res) => {
      this.listSalonId = res.data.data;
      // console.log(this.listSalonId);
    });
  },
  beforeMount() {
    this.listFinanceAccountings();
  },
  methods: {
    // trả tên salon theo Id
    checkSalonId(salon) {
      var lengSalon = this.listSalonId.length;
      for (let index = 0; index < lengSalon; index++) {
        if (salon === this.listSalonId[index].id)
          return this.listSalonId[index].salon_name;
      }
    },
    // danh sách tài chính
    listFinanceAccountings() {
      HTTP.get(`/salon/main/manage/finance-accounting?type=2`).then((res) => {
        let result = res.data;
        // console.log(result);
        if (result.status === 1) {
          let data = result.data.data;
          this.listFinanceAccounting = data;
          // console.log(this.listFinanceAccounting);
        }
      });
    },
    formatDate,
    formatNumber,
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
.xuatBaoCao:hover {
  background: #d4476f;
  cursor: pointer;
  color: white;
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
</style>
