<template>
  <div class="col-md-10 res mb-5 mt-3 res-0">
    <div style="font-size: 120%" class="font-weight-bold mt-3">
      CẬP NHẬT SỔ CHI TIẾT HÀNG HOÁ
    </div>
    <form @submit.prevent="putUpdateDetail">
      <div class="table-responsive" style="overflow-x: hidden;">
        <table class="table table-hover">
          <tbody>
            <tr>
              <td style="width: 15%">Ngày ghi sổ</td>
              <td>
                <input
                  type="date"
                  placeholder="Ngày ghi sổ"
                  style="width: 100%"
                  v-model="updateDetail.record_date"
                />
              </td>
              <td style="width: 15%">Tên kho</td>
              <td>
                <select
                  class="inputx mr-3 res-margin-0"
                  id="cars salon"
                  style="width: 100%; outline: none"
                  v-model="updateDetail.salon_id"
                  @change="onChange()"
                >
                  <option value="">---Chọn Salon---</option>
                  <option
                    v-for="item in listStore"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.salon_name }}
                  </option>
                </select>
              </td>
            </tr>

            <tr>
              <td style="width: 15%">Sổ chứng từ</td>
              <td>
                <input
                  type="text"
                  placeholder="Sổ chứng từ"
                  style="width: 100%"
                  v-model="updateDetail.voucher_book"
                />
              </td>
              <td style="width: 15%">Sổ hoá đơn</td>
              <td>
                <input
                  type="text"
                  placeholder="Đơn vị tính"
                  style="width: 100%"
                  v-model="updateDetail.invoice_book"
                />
              </td>
            </tr>

            <tr>
              <td style="width: 15%">Diễn giải</td>
              <td>
                <input
                  type="text"
                  placeholder="Diễn giải"
                  style="width: 100%"
                  v-model="updateDetail.explain"
                />
              </td>
              <td style="width: 15%">Đơn giá</td>
              <td>
                <input
                  type="number"
                  placeholder="Đơn giá"
                  style="width: 100%"
                  v-model="updateDetail.unit_price"
                />
              </td>
            </tr>

            <tr>
              <td style="width: 15%">Số lượng nhập</td>
              <td>
                <input
                  type="number"
                  placeholder="Số lượng"
                  style="width: 100%"
                  v-model="updateDetail.amount_import"
                />
              </td>
              <td>Số tiền nhập</td>
              <td>
                <input
                  type="number"
                  placeholder="Số tiền"
                  style="width: 100%"
                  v-model="updateDetail.price_import"
                />
              </td>
            </tr>

            <tr>
              <td style="width: 15%">Số lượng xuất</td>
              <td>
                <input
                  type="number"
                  placeholder="Số lượng"
                  style="width: 100%"
                  v-model="updateDetail.amount_export"
                />
              </td>
              <td>Số tiền xuất</td>
              <td>
                <input
                  type="number"
                  placeholder="Số tiền"
                  style="width: 100%"
                  v-model="updateDetail.price_export"
                />
              </td>
            </tr>

            <tr>
              <td style="width: 15%">Số lượng tồn</td>
              <td>
                <input
                  type="number"
                  placeholder="Số lượng"
                  style="width: 100%"
                  v-model="updateDetail.amount_ending_stocks"
                />
              </td>
              <td>Số tiền tồn</td>
              <td>
                <input
                  type="number"
                  placeholder="Số tiền"
                  style="width: 100%"
                  v-model="updateDetail.price_ending_stocks"
                />
              </td>
            </tr>
            <tr>
              <td>Đơn giá BQ</td>
              <td>
                <input
                  type="number"
                  placeholder="Đơn giá BQ"
                  style="width: 100%"
                  v-model="updateDetail.average_unit_price"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4 text-center pb-3">
          <span @click="backPage" class="borderx mr-3 color-main"
            >Quay lại</span
          >
          <button type="submit" class="borderx color-main">Lưu</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { HTTP } from "@/main";
export default {
  name: "capNhatSoChiTiet",
  data() {
    return {
      updateDetail: [],
      listStore: [],
      errors: [],
    };
  },
  created() {
    this.detailId = window.location.href.slice(
      window.location.href.indexOf("/cap-nhat-so-chi-tiet/") + 61,
      window.location.href.length
    );
  },
  beforeMount() {
    this.getDetail();
    this.getListStore();
  },
  methods: {
    onChange() {
      HTTP.get(
        "/salon/main/manage/branch/" + this.updateDetail.salon_id + "/detail"
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;
          this.updateDetail.storage = data.salon_name;
          console.log(this.updateDetail.storage);
        }
      });
    },
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

    getDetail() {
      HTTP.get(`/salon/main/manage/detailGoods/${this.detailId}`).then(
        (res) => {
          let result = res.data;
          if (result.status == 1) {
            this.updateDetail = result.data[0];
            // console.log(this.updateDetail);
          }
        }
      );
    },
    putUpdateDetail() {
      HTTP.put(
        `/salon/main/manage/detailGoods/${this.detailId}/update`,
        this.updateDetail
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          // this.content = "";
          this.$swal("", result.message, "success");
          this.historyBack();
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
* {
  font-size: 14px;
}
.update {
  border: none;
  background: none;
  box-shadow: none;
  width: 100%;
}
ul {
  padding: 0;
  margin-top: 7px;
}
ul li a {
  color: black;
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

.borderx {
  border: 1px solid #d4476f;
  padding: 5px 25px;
  border-radius: 4px;
  cursor: pointer;
}

.borderx:hover {
  color: white;
  background-color: #d4476f;
}
</style>
