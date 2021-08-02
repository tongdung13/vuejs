<template>
  <div class="col-md-10 res mb-5 mt-3 res-0">
    <div style="font-size: 120%; float: left" class="color-main">
      <b>THÔNG TIN CÁC SALON CÒN HÀNG</b>
    </div>
    <div class="text-right mt-1">
      <span class="borderx hover" @click="backPage">Quay lại</span>
    </div>
    <div
      class="table-responsive mt-3"
      v-for="(salon, index) in detail"
      :key="index"
    >
      <div>
        <b>#{{ index + 1 }}</b>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <td style="width: 13%">Tên salon</td>
            <td>
              <b>{{ salon.salon_name }}</b>
            </td>
            <td style="width: 13%">Email</td>
            <td>
              <b>{{ salon.salon_email }}</b>
            </td>
          </tr>
          <tr>
            <td style="width: 13%">Địa chỉ salon</td>
            <td colspan="3">
              <b>{{ salon.salon_address }}</b>
            </td>
          </tr>
          <tr>
            <td style="width: 13%">Hotline salon</td>
            <td>
              <b>{{ salon.salon_hotline }}</b>
            </td>
            <td style="width: 13%">Số lượng</td>
            <td style="width: 35%;">
              <div class="pt-2 float-left font-weight-bold">
                {{ salon.amount + " Sản phẩm" }}
              </div>
              <div
                class="float-right inputx hover"
                data-toggle="modal"
                data-target="#nhapThem"
                @click="getListBank(salon.id)"
              >
                Nhập thêm
              </div>
            </td>
          </tr>
          <tr>
            <td style="width: 13%">Giá</td>
            <td>
              <b>{{ formatPrice(salon.price) }}</b>
            </td>
            <td style="width: 13%">Giá khuyến mại</td>
            <td>
              <b>{{ formatPrice(salon.price_sale) }}</b>
            </td>
          </tr>
        </thead>
      </table>
      <hr />
      <!-- Nhập thêm sản phẩm -->
      <div
        class="modal fade"
        id="nhapThem"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title font-weight-bold color-main"
                id="exampleModalLabel"
              >
                Nhập thêm sản phẩm
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <table class="table table-borderless table-hover">
                <tbody>
                  <tr>
                    <td style="width: 30%;">Số lượng:</td>
                    <td><div class="right-inner-addon input-container">
                        <span>Sp</span>
                      <input
                        class="w-100"
                        type="number"
                        min="0"
                        v-model="addProducts.amount"
                      />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 30%;">Giá nhập:</td>
                    <td>
                      <div class="right-inner-addon input-container">
                        <span>VNĐ</span>

                        <input
                          class="w-100"
                          type="number"
                          min="0"
                          v-model="addProducts.price_input"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 30%;">Giá bán:</td>
                    <td>
                      <div class="right-inner-addon input-container">
                        <span>VNĐ</span>

                        <input
                          class="w-100"
                          type="number"
                          min="0"
                          v-model="addProducts.price"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 30%;">Giá khuyến mãi:</td>
                    <td>
                      <div class="right-inner-addon input-container">
                        <span>VNĐ</span>

                        <input
                          class="w-100"
                          type="number"
                          min="0"
                          v-model="addProducts.price_sale"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 30%;">TK thanh toán:</td>
                    <td>
                      <select
                        class="inputx mr-3 w-100 res-margin-0"
                        style="outline: none"
                        v-model="addProducts.funds_id"
                      >
                        <option value="">--Chọn tài khoản thanh toán--</option>
                        <option
                          :value="item.id"
                          v-for="(item, index) in listBank"
                          :key="index"
                        >
                          {{ item.bank }}
                        </option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn borderx hover"
                data-dismiss="modal"
              >
                Huỷ
              </button>
              <button
                type="button"
                @click="addProSubmit"
                class="btn borderx hover"
                data-dismiss="modal"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatPrice } from "@/main";
export default {
  name: "salonConhang",
  data() {
    return {
      detail: {},
      id_product: "",
      addProducts: {
        salon_id: "",
        amount: "",
        price_input: "",
        price: "",
        price_sale: "",
        funds_id: "",
      },
      listBank: [],
    };
  },

  beforeMount() {
    this.availableProduct();
  },
  methods: {
    availableProduct() {
      this.id_product = window.location.href.slice(
        window.location.href.indexOf("/salon-con-hang/") + 16,
        window.location.href.length
      );
      HTTP.get(`/salon/main/manage/product/${this.id_product}/detail`)
        .then((response) => {
          this.detail = response.data.data.salons;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // Nhập thêm sản phẩm
    addProSubmit() {
      HTTP.put(
        `/salon/main/manage/product/${this.id_product}/update-amount`,
        this.addProducts
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.$swal("", result.message, "success");
          this.availableProduct();
          this.addProducts.salon_id = "";
          this.addProducts.amount = "";
          this.addProducts.price_input = "";
          this.addProducts.price = "";
          this.addProducts.price_sale = "";
          this.addProducts.funds_id = "";
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // ===================

    // Danh sách ngân hàng
    getListBank(index) {
      this.addProducts.salon_id = index;
      HTTP.get(
        `/salon/main/manage/funds?page=1&salon_id=${this.addProducts.salon_id}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data.data;
          this.listBank = data;
        }
      });
    },
    // ===================
    backPage() {
      history.back();
    },
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
table td {
  vertical-align: middle;
}
</style>
