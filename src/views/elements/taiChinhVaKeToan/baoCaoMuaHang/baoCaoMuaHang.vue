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
        name: 'themBaoCaoMuaHang',
      }"
    >
      <span class="inputx hover color-main mr-3">+ Thêm báo cáo</span>
    </router-link>
    <div class="mt-4">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-6">
          <h5 class="color-main font-weight-bold pt-1" style="font-size: 16px">
            BÁO CÁO MUA HÀNG
            <!-- <select class="bg-8 pl-2 pr-2 p-1">
              <option>Hóa đơn mua hàng</option>
              <option>Phiếu chi</option>
            </select> -->
          </h5>
        </div>
        <!-- <div class="col-md-6 col-sm-6 col-6 text-right" style="margin-top: 9px">
          <router-link :to="{ name: 'themBaoCaoMuaHang' }">
            <span class="hover inputx color-main"
              >Thêm hoá đơn mua hàng</span
            ></router-link
          >
        </div> -->
      </div>

      <loadingData v-if="loading"></loadingData>
      <div class="mt-3 bg-16">
        <div class="mt-1 p-0">
          <div class="mt-4">
            <div class="bg5 table-responsive">
              <table
                class="table table-hover borderless"
                style="font-size: 14px"
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
                    <th>Mã đơn</th>
                    <th>Ngày</th>
                    <th>Người bán</th>
                    <th>Nhà sản xuất</th>
                    <th style="width: 20%">Địa chỉ</th>
                    <th class="text-center">Salon</th>
                    <th class="text-center">ĐV giao hàng</th>
                    <th class="text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody v-if="hasData">
                  <tr v-for="(bill, index) in listBill" :key="index">
                    <td>{{ bill.tax_code }}</td>
                    <td>{{ formatDate(bill.input_date) }}</td>
                    <td>{{ bill.seller }}</td>
                    <td>{{ bill.producer }}</td>
                    <td>{{ bill.address }}</td>
                    <td class="text-center">{{ bill.salon_name }}</td>
                    <td class="text-center">{{ bill.shipper }}</td>
                    <td class="text-right">
                      <router-link
                        :to="{
                          name: 'capNhatBaoCaoMuaHang',
                          params: { muaHangId: bill.id },
                        }"
                      >
                        <span class="color-main mr-2" style="cursor: pointer"
                          >Cập nhật</span
                        >
                      </router-link>
                      <span
                        @click="deleteBill(bill.id)"
                        class="text-danger"
                        style="cursor: pointer"
                        >Xoá</span
                      >
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <td colspan="8" class="color-main text-center"><b>Chưa có báo cáo</b></td>
                </tbody>
              </table>
            </div>
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
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatDate } from "@/main";
import loadingData from "@/components/loadingData";

export default {
  name: "baoCaoMuaHang",
  components: {
    loadingData,
  },
  data() {
    return {
      listBill: {},
      salon_id: "",
      listStore: {},
      paginate: {
        currentPage: 1,
        totalPage: "",
      },
      loading: true,
      hasData: true,
    };
  },
  beforeMount() {
    this.listBills();
    this.getListStore();
  },
  methods: {
    changePage(index) {
      this.paginate.currentPage = index;

      this.listBills();
    },

    onChange() {
      this.paginate.currentPage = 1;
      if (this.salon_id == "") {
        this.listBills();
      } else this.getListBillsSalon();
    },

    listBills() {
      let page = this.paginate.currentPage;
      HTTP.get(`/salon/main/manage/billGoods?page=${page}`).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;
          if (data.data.length > 0) {
            this.hasData = true;
            this.loading = false;
            this.listBill = data.data;
            console.log(this.listBill);
            this.paginate.totalPage = data.last_page;
            // console.log(this.listBill);
          } else {
            this.hasData = false;
            this.msg = "Chưa có báo cáo";
          }
        }
      });
    },

    getListBillsSalon() {
      HTTP.get(
        `/salon/main/manage/billGoods/salon?salon_id= ${this.salon_id}&page=${this.paginate.currentPage}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;
          if (data.data.length > 0) {
            this.listBill = data.data;
            this.paginate.totalPage = data.last_page;
            // console.log(this.listReportGoods);
          }
        } else {
          this.$swal("Chưa có báo cáo", "", "warning");
        }
      });
    },

    // ===============

    // Xoá phiếu thu
    deleteBill(billId) {
      this.$swal({
        title: "Xoá hoá đơn?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete(`/salon/main/manage/billGoods/${billId}/delete`).then(
            (res) => {
              let result = res.data;
              if (result.status === 1) {
                this.$swal("Đã xoá!", result.message, "success");
                this.listBills();
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

    getListStore() {
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
  },
};
</script>
<style scoped>
.bg-8 {
  background: rgba(255, 255, 255, 0.8);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.bg-16 {
  background: rgba(145, 145, 145, 0.1);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.bg-40 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 40px;
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

select,
input {
  outline: none;
  color: #d4476f;
  /* border: 1px solid #d4476f; */
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 5px 15px;
}
</style>
