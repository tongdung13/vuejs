<template>
  <div class="col-md-10 pl-5 res mb-5 mt-3">
    <form @submit.prevent="createPost">
      <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
        <h6 class="color-main font-weight-bold">THÊM SỔ CHI TIẾT HÀNG HOÁ</h6>
        <div class="mt-3">
          <table class="table table-borderless">
            <tbody>
              <tr>
                <td style="width: 20%">Ngày ghi sổ</td>
                <td>
                  <input
                    type="date"
                    placeholder="Ngày ghi sổ"
                    style="width: 100%"
                    required
                    v-model="post.record_date"
                  />
                </td>
                <td>Tên salon</td>
                <td>
                  <select
                    class="inputx mr-3 res-margin-0"
                    id="cars salon"
                    style="width: 100%; outline: none"
                    required
                    v-model="post.salon_id"
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
              </tr>

              <tr>
                <td style="width: 10%">Sổ chứng từ</td>
                <td>
                  <input
                    type="text"
                    placeholder="Sổ chứng từ"
                    style="width: 100%"
                    required
                    v-model="post.voucher_book"
                  />
                </td>
                <td>Sổ hoá đơn</td>
                <td>
                  <input
                    type="text"
                    style="width: 100%"
                    placeholder="Sổ hoá đơn"
                    required
                    v-model="post.explain"
                  />
                </td>
              </tr>
              <tr>
                  <td>Đơn giá</td>
                  <td>
                  <input
                    type="text"
                    style="width: 100%"
                    placeholder="Đơn giá"
                    required
                    v-model="post.unit_price"
                  />
                </td>
              </tr>

              <tr>
                <td>Số lượng nhập</td>
                <td>
                  <input
                    type="number"
                    placeholder="Số lượng nhập"
                    style="width: 100%"
                    required
                    v-model="post.amount_import"
                  />
                </td>
             
                <td>Số lượng xuất</td>
                <td>
                  <input
                    type="number"
                    placeholder="số lượng xuất"
                    style="width: 100%"
                    required
                    v-model="post.amount_export"
                  />
                </td>
                
              </tr>

              <tr>
                <td>Số lượng tồn</td>
                <td>
                  <input
                    type="number"
                    placeholder="số lượng"
                    style="width: 100%"
                    required
                    v-model="post.amount_ending_stocks"
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
  name: "themSoChiTiet",
  data() {
    return {
      listStore: {},
      user: "",
      post: {
        record_date: "",
        voucher_book: "",
        invoice_book: "",
        explain: "",
        unit_price: "",
        amount_import: "",
        price_import: "",
        amount_export: "",
        price_export: "",
        amount_ending_stocks: "",
        price_ending_stocks: "",
        salon_id: "",
      },
    };
  },
  beforeMount() {
    this.getListStore();
  },
  methods: {
    getListStore() {
      HTTP.get("/salon/main/manage/branch/all").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listStore = data;
            // console.log(this.listStore);
          }
        } 
        this.loading = false;
      });
    },

    // tao moi san pham
    createPost() {
      HTTP.post(`/salon/main/manage/detailGoods/store`, this.post).then(
        (res) => {
          let result = res.data;
          console.log(result);
          if (result.status === 1) {
            // this.content = "";
            this.$swal("", "Thêm mới thành công", "success");
            this.backPage();
          } else {
            this.$swal("", "Lỗi thêm mới", "error");
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
