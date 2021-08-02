<template>
  <div class="bg-8 pt-3">
    <div class="text-center" style="position: relative">
      <span style="font-size: 15px; font-weight: bold"
        >BẢNG CÂN DỐI KẾ TOÁN</span
      ><br />
      <div>
        <div>
          (Ban hành theo Thông tư số 133/2016/TT-BTC ngày 26/8/2016 của Bộ Tài
          Chính)
        </div>
        <div
          class="pl-3 pr-3 p-1 color-main"
          style="position: absolute; right: 0; top: 0"
        >
          <span class="dropdown" style="float: right; margin-top: -6px">
            <span class="dropbtn">
              <img
                src="../../../../../assets/image/more-horizontal.png"
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
                <router-link :to="{ name: 'bangCanDoiKeToan' }"
                  ><span class="text-dark">Tạo bảng báo cáo</span></router-link
                >
              </div>
              <div>
                <span>Cập nhật báo cáo</span>
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
            <th>Mã</th>
            <th style="width: 6%;">Salon</th>
            <th style="width: 6%">Chỉ tiêu</th>
            <th style="width: 20%">Mô tả</th>
            <th>Số năm nay</th>
            <th>Số năm trước</th>
            <!-- <th>TK ghi nợ</th>
            <th>TK ghi có</th> -->
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
            <!-- <td class="text-center">{{ formatNumber(item.credit_account) }}</td>
            <td class="text-center">{{ formatNumber(item.debit_account) }}</td> -->
            <td>{{ item.note }}</td>
            <td
              class="text-center"
              style="cursor: pointer;"
              data-toggle="modal"
              data-target="#update2"
              @click="clickUpdate(item.id)"
            >
              Cập nhật
            </td>
          </tr>
        </tbody>
      </table>
      <!-- sửa thông báo -->
      <div class="modal fade" id="update2" role="dialog">
        <div class="modal-dialog modal-xl" style="top: 15%">
          <div class="modal-content">
            <div class="modal-body">
              <div class="color-main">Sửa bảng:</div>
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td>
                      <div class="text-right table-input">Mô tả:</div>
                    </td>
                    <td style="width: 85%">
                      <input
                        type="text"
                        style="width: 100%"
                        v-model="updateTable.description"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="text-right table-input">Số năm nay:</div>
                    </td>
                    <td style="width: 85%">
                      <input
                        type="number"
                        style="width: 100%"
                        v-model="updateTable.kpi_this_year"
                      />
                    </td>
                  </tr>
                  <!-- <tr>
                    <td>
                      <div class="text-right table-input">
                        Tài khoản ghi nợ:
                      </div>
                    </td>
                    <td style="width: 85%">
                      <input
                        type="number"
                        style="width: 100%"
                        v-model="updateTable.kpi_last_year"
                      />
                    </td>
                  </tr> -->
                  <!-- <tr>
                    <td>
                      <div class="text-right table-input">
                        Tài khoản ghi có:
                      </div>
                    </td>
                    <td style="width: 85%">
                      <input
                        type="number"
                        style="width: 100%"
                        v-model="updateTable.credit_account"
                      />
                    </td>
                  </tr> -->
                  <tr>
                    <td>
                      <div class="text-right table-input">Số năm trước:</div>
                    </td>
                    <td style="width: 85%">
                      <input
                        type="number"
                        style="width: 100%"
                        v-model="updateTable.debit_account"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="text-right table-input">Chú ý:</div>
                    </td>
                    <td style="width: 85%">
                      <input
                        type="text"
                        style="width: 100%"
                        v-model="updateTable.note"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button
                class="input creat-status"
                style="opacity: 0.5"
                data-dismiss="modal"
              >
                Huỷ
              </button>
              <button
                @click="submitUpdateTable"
                class="input creat-status"
                data-dismiss="modal"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- ============== -->
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatDate } from "@/main";
import { formatNumber } from "@/main";
export default {
  name: "bangCanDoiKeToan",
  data() {
    return {
      listSalonId: {},
      listFinanceAccounting: {},
      tableId: "",
      updateTable: {
        description: "",
        kpi_this_year: "",
        kpi_last_year: "",
        credit_account: "",
        debit_account: "",
        note: "",
      },
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
    // ==============================

    // Cập nhật bảng
    clickUpdate(value) {
      this.tableId = value;
      this.detailRowTable();
    },
    // ========================

    // Chi tiết 1 hàng
    detailRowTable() {
      HTTP.get(
        `/salon/main/manage/finance-accounting/${this.tableId}?type=2&salonId=1`
      ).then((res) => {
        let result = res.data;
        // console.log(result);
        if (result.status === 1) {
          let data = result.data;
          this.updateTable = data;
        }
      });
    },
    // ================// Cập nhật bảng
    submitUpdateTable() {
      HTTP.put(
        `/salon/main/manage/finance-accounting/${this.tableId}/update?type=2&salonId=1`,
        this.updateTable
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          // this.content = "";
          this.listFinanceAccountings();
          this.$swal("", result.message, "success");
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // =================
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
</style>
