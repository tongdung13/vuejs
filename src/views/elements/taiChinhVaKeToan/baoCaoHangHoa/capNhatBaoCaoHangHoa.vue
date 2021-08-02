<template>
  <div class="col-md-10 pl-5 res mb-5 mt-3">
    <form @submit.prevent="updatePost">
      <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
        <h6 class="color-main font-weight-bold">CẬP NHẬT BÁO CÁO HÀNG HOÁ</h6>
        <div class="mt-3">
          <table class="table table-borderless">
            <tbody>
              <tr>
                <td>Tên salon</td>
                <td>
                  <select
                    class="inputx mr-3 res-margin-0"
                    id="cars salon"
                    style="width: 100%; outline: none"
                    required
                    v-model="post.salon_id"
                    @change="changeStore()"
                  >
                    <option value="">---Chọn salon---</option>
                    <option
                      v-for="item in listStore"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.salon_name }}
                    </option>
                  </select>
                </td>

                <td style="width: 10%">Tên hàng</td>
                <td>
                  <select
                    v-if="post.salon_id"
                    class="inputx mr-3 res-margin-0"
                    id="cars salon"
                    style="width: 100%; outline: none"
                    required
                    v-model="post.product_id"
                  >
                    <option value="">---Chọn tên hàng hoá---</option>
                    <option
                      v-for="item in listProduct"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                  <div v-else class="inputx text-left">
                    ---Chọn tên sản phẩm---
                  </div>
                </td>
              </tr>

              <tr>
                <td>Đơn vị tính</td>
                <td>
                  <input
                    type="text"
                    style="width: 100%"
                    required
                    v-model="post.unit"
                  />
                </td>
              </tr>

              <tr>
                <td>Số lượng tồn đầu kỳ</td>
                <td>
                  <input
                    type="number"
                    placeholder="Số lượng"
                    style="width: 100%"
                    required
                    v-model="post.amount_early_balance"
                  />
                </td>
                <td>Số tiền</td>
                <td>
                  <input
                    type="number"
                    placeholder="Số tiền"
                    style="width: 100%"
                    required
                    v-model="post.price_early_balance"
                  />
                </td>
              </tr>

              <tr>
                <td>Số lượng nhập trong kỳ</td>
                <td>
                  <input
                    type="number"
                    placeholder="số lượng"
                    style="width: 100%"
                    required
                    v-model="post.amount_import"
                  />
                </td>
                <td>Số tiền</td>
                <td>
                  <input
                    type="number"
                    placeholder="Số tiền"
                    style="width: 100%"
                    required
                    v-model="post.price_import"
                  />
                </td>
              </tr>

              <tr>
                <td>Số lượng xuất</td>
                <td>
                  <input
                    type="number"
                    placeholder="số lượng"
                    style="width: 100%"
                    required
                    v-model="post.amount_export"
                  />
                </td>
                <td>Số tiền</td>
                <td>
                  <input
                    type="number"
                    placeholder="Số tiền"
                    style="width: 100%"
                    required
                    v-model="post.price_export"
                  />
                </td>
              </tr>

              <tr>
                <td>Số lượng tồn cuối kỳ</td>
                <td>
                  <input
                    type="number"
                    placeholder="số lượng"
                    style="width: 100%"
                    required
                    v-model="post.amount_ending_stocks"
                  />
                </td>
                <td>Số tiền</td>
                <td>
                  <input
                    type="number"
                    placeholder="Số tiền"
                    style="width: 100%"
                    required
                    v-model="post.price_ending_stocks"
                  />
                </td>
              </tr>
             
            </tbody>
          </table>
        </div>

        <div class="mt-3 text-center pb-3">
          <span @click="backPage" class="borderx mr-3 color-main"
            >Quay lại</span
          >
          <button class="borderx mr-2 color-main" type="submit">Lưu</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "capNhatBaoCaoHangHoa",
  data() {
    return {
      reportGoodId: "",
      listStore: {},
      listProduct: {},
      user: "",
      post: {
        sku: "",
        name: "",
        category: "",
        unit: "",
        amount_early_balance: "",
        price_early_balance: "",
        amount_import: "",
        price_import: "",
        amount_export: "",
        price_export: "",
        amount_ending_stocks: "",
        price_ending_stocks: "",
        salon_id: "",
        note: "",
        product_id: "",
      },
    };
  },
  beforeMount() {
    this.getListStore();
    this.detailReportGoods();
  },
  methods: {
    detailReportGoods() {
      this.reportGoodId = this.$route.params.reportId;
      HTTP.get("/salon/main/manage/reportGoods/" + this.reportGoodId).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            let data = result.data;
            this.post = data[0];
            this.getListProduct();
          } else {
            this.notification.status = true;
            this.notification.message = result.message;
          }
          this.loading = false;
        }
      );
    },
    changeStore() {
      this.getListProduct();
    },
    getListStore() {
      HTTP.get("/salon/main/manage/branch/all").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listStore = data;
            // console.log(this.listStore);
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },

    getListProduct() {
      HTTP.get(
        "/salon/main/manage/form/products?type=1&salon_id=" + this.post.salon_id
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listProduct = data;
            // console.log(this.listProduct);
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },

    // cập nhật báo cáo hàng hoá
    updatePost() {
      HTTP.put(`/salon/main/manage/reportGoods/${this.reportGoodId}/update`, this.post).then(
        (res) => {
          let result = res.data;
          // console.log(result);
          if (result.status === 1) {
            // this.content = "";
            this.$swal("",result.message, "success");
            this.backPage();
          } else {
            this.$swal("", result.message, "error");
          }
        }
      );
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

.bg-8 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

label {
  padding: 30px;
  font-size: 14px;
  border-radius: 16px;
  text-align: center;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
input {
  outline: none;
  background: rgba(255, 255, 255, 0.56);
  /* shape */
  padding: 5px 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 8px;
}

ul {
  padding: 5px 15px;
}

li {
  padding: 5px 15px;
  list-style: none;
}

.card-header {
  padding: 5px;
  border-bottom: none;
  background: rgba(255, 255, 255, 0.56);
}

.card-body {
  padding: 0;
}

.card {
  border: none;
}
.inputx {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 5px 10px;
  outline: none;
}
table td {
  vertical-align: middle;
}
@media only screen and (max-width: 768px) {
  .borderx {
    padding: 5px 15px;
  }
}
</style>
