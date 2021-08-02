<template>
  <div class="col-md-10 pl-5 res mb-5 mt-3">
    <div class="mt-4 w-75 width-100" style="margin: 0 auto">
      <h5 class="color-main font-weight-bold" style="font-size: 16px">
        THÊM KHUYẾN MẠI
      </h5>
      <div class="bg-16 p-3 mb-4">
        <h6 class="font-weight-bold color-main">THÔNG TIN CƠ BẢN</h6>

        <table class="table table-borderless">
          <tbody>
            <tr>
              <td class="font-weight-bold text-right" style="width: 20%;">
                Voucher:
              </td>
              <td>
                <select
                  class="inputx mr-3 res-margin-0 w-100"
                  style="outline: none"
                  v-model="addVoucher.type_offline"
                >
                  <option value="">--Chọn kiểu voucher--</option>
                  <option value="1">Khuyến mãi tại cửa hàng</option>
                  <option value="2">Khuyễn mãi trên app</option>
                </select>
              </td>
              <td class="font-weight-bold text-right" style="width: 20%;">
                Loại voucher:
              </td>
              <td>
                <select
                  class="inputx mr-3 res-margin-0 w-100"
                  style="outline: none"
                  v-model="addVoucher.type_voucher"
                >
                  <option value="">--Chọn loại voucher--</option>
                  <option value="3">Voucher toàn shop</option>
                  <option value="1">Voucher sản phẩm</option>
                  <option value="2">Voucher dịch vụ</option>
                </select>
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold text-right">Tên chương trình:</td>
              <td colspan="3">
                <input
                  type="text"
                  placeholder="Nhập tên chương trình khuyến mãi"
                  class="w-100"
                  v-model="addVoucher.title"
                />
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold text-right">Thời gian:</td>
              <td>
                <input
                  type="date"
                  placeholder="ngày bắt đầu:"
                  v-model="addVoucher.start_date"
                />
              </td>
              <td>
                <input
                  type="date"
                  placeholder="ngày bắt đầu:"
                  v-model="addVoucher.end_date"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <h6 class="font-weight-bold color-main">THÔNG TIN MÃ GIẢM GIÁ</h6>
        <div class="mt-1">
          <table class="table table-borderless">
            <tbody>
              <tr>
                <td class="font-weight-bold text-right" style="width: 20%;">
                  Tên salon:
                </td>
                <td style="width: 35%;">
                  <select
                    class="inputx mr-3 res-margin-0 w-100"
                    style="outline: none"
                    v-model="addVoucher.salon_id"
                    @change="choseSalon"
                  >
                    <option value="">--Chọn Salon--</option>
                    <option
                      v-for="salon in listSalon"
                      :key="salon.id"
                      :value="salon.id"
                    >
                      {{ salon.salon_name }}
                    </option>
                  </select>
                </td>
                <td colspan="2">
                  <div class="row">
                    <div
                      v-if="
                        addVoucher.type_voucher != '' &&
                          addVoucher.type_voucher != 3
                      "
                      class="col-5 font-weight-bold text-right pt-1"
                    >
                      SP/DV:
                    </div>
                    <div class="col-7">
                      <div v-if="addVoucher.type_voucher == 1">
                        <select
                          class="inputx mr-3 res-margin-0 w-100"
                          style="outline: none; style: 100%"
                          v-model="addVoucher.product_id"
                        >
                          <option value="">--Chọn sản phẩm--</option>
                          <option
                            :value="item.id"
                            v-for="(item, index) in listProduct"
                            :key="index"
                          >
                            {{ item.name }}
                          </option>
                        </select>
                      </div>
                      <div v-if="addVoucher.type_voucher == 2">
                        <select
                          class="inputx mr-3 res-margin-0 w-100"
                          style="outline: none; style: 100%"
                          v-model="addVoucher.product_id"
                        >
                          <option value="">--Chọn dịch vụ--</option>
                          <option
                            :value="item.id"
                            v-for="(item, index) in listService"
                            :key="index"
                          >
                            {{ item.title }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold text-right">Loại mức giảm:</td>
                <td>
                  <select
                    class="inputx mr-3 res-margin-0 w-100"
                    style="outline: none; style: 100%"
                    v-model="addVoucher.type_discount"
                  >
                    <option value="">--Chọn loại mức giảm--</option>
                    <option value="1">Phần trăm</option>
                    <option value="2">Số tiền</option>
                    <option value="3">Sản phẩm tặng kèm</option>
                  </select>
                </td>
                <td colspan="2" v-if="addVoucher.type_discount != ''">
                  <div class="row">
                    <div class="col-5 font-weight-bold text-right pt-2">
                      Nhập mức giảm:
                    </div>
                    <div class="col-7">
                      <div v-if="addVoucher.type_discount == 1">
                        <div class="right-inner-addon input-container">
                          <span>%</span>
                          <input
                            id="phanTram"
                            type="text"
                            placeholder="Nhập %"
                            class="w-100"
                            v-model="addVoucher.discount"
                          />
                        </div>
                      </div>
                      <div v-if="addVoucher.type_discount == 2">
                        <div class="right-inner-addon input-container">
                          <span>VNĐ</span>
                          <input
                            type="text"
                            placeholder="Nhập số tiền"
                            class="w-100"
                            v-model="addVoucher.discount"
                          />
                        </div>
                      </div>
                      <div v-if="addVoucher.type_discount == 3">
                        <select
                          class="inputx mr-3 res-margin-0 w-100"
                          style="outline: none; style: 100%"
                          v-model="product_bonus"
                        >
                          <option value="">--Chọn sản phẩm--</option>
                          <option
                            :value="item.id"
                            v-for="(item, index) in listProduct"
                            :key="index"
                          >
                            {{ item.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold text-right">
                  Giá trị đơn tối thiểu:
                </td>
                <td colspan="2">
                  <input
                    type="number"
                    placeholder="Giá trị đơn tối thiểu"
                    min="0"
                    class="w-100"
                    v-model="addVoucher.min_order"
                  />
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold text-right">Số lượng mã:</td>
                <td colspan="2">
                  <input
                    type="number"
                    min="0"
                    placeholder="Số lượng mã"
                    class="w-100"
                    v-model="addVoucher.amount"
                  />
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold text-right">Mô tả:</td>
                <td colspan="3">
                  <textarea
                    class="w-100"
                    rows="5"
                    placeholder="Nhập mô tả ..."
                    v-model="addVoucher.description"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center">
          <div class="mt-3 text-center pb-3">
            <span @click="backPage" class="borderx mr-2 color-main">
              Quay lại
            </span>
            <span @click="submitAddVoucher" class="borderx color-main">
              Lưu và hiển thị
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
import loadingData from "@/components/loadingData";
import Multiselect from "../../../../modul/@suadelabs/vue3-multiselect";

export default {
  name: "themMaGiamGia",
  components: {
    loadingData,
    Multiselect,
  },
  data() {
    return {
      addVoucher: {
        type_voucher: "",
        type_offline: "",
        title: "",
        start_date: "",
        end_date: "",
        salon_id: "",
        product_id: "",
        type_discount: "",
        min_order: "",
        amount: "",
        description: "",
        discount: "",
      },
      product_bonus: "",
      listSalon: [],
      listProduct: [],
      listService: [],
    };
  },
  beforeMount() {
    this.getListSalon();
  },
  methods: {
    // Gửi form thêm voucher
    submitAddVoucher() {
      if (this.product_bonus) {
        this.addVoucher.product_bonus = this.product_bonus;
      }
      HTTP.post(`/salon/main/manage/marketing/1/store`, this.addVoucher).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            this.$swal("", result.message, "success");
            setTimeout(() => {
              history.back();
            }, 1000);
          } else {
            this.$swal("", result.message, "error");
          }
        }
      );
    },
    // =====================

    // Danh sách các salon
    getListSalon() {
      HTTP.get("/salon/main/manage/branch/all").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;
          if (data.length > 0) {
            this.listSalon = data;
          }
        }
        this.loading = false;
      });
    },
    // ===================

    // Sự kiện chọm salon trả ra ds DV&&SP
    choseSalon() {
      this.getListProductAndService();
    },
    // ===================

    // Danh sách sản phẩm/dịch vụ
    getListProductAndService() {
      HTTP.get(
        `/salon/main/manage/form/${this.addVoucher.salon_id}/commission`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.listProduct = result.data.products;
          this.listService = result.data.services;
        }
        this.loading = false;
      });
    },
    // ===========================
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
.bg-16 {
  background: rgba(255, 255, 255, 0.56) !important;
}

.input {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 5px 10px;
  outline: none;
}

input,
textarea,
.bg3 {
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
  padding: 10px 15px;
  outline: none;
  border: none;
}
.bg-24 {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
}

.bg-24:hover {
  background: #d4476f;
  color: white !important;
}
.color-main {
  color: #d4476f;
}

ul li {
  display: inline-block;
}

.bg {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}

.bg1 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 47px;
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

.bg2 {
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: left;
}

li a {
  display: block;
  color: #d4476f;
  text-align: center;
  padding: 0.5rem 1em;
  text-decoration: none;
  cursor: pointer;
}

.tab-pane {
  font-size: 14px;
}

li a:hover {
  color: #d4476f;
  text-decoration: none;
}

.active {
  background-color: rgba(212, 71, 111, 0.1);
  border-bottom: 2px solid #d4476f;
}
table td,
table th {
  vertical-align: middle;
}
span select {
  background: none;
  border: none;
}
input[type="date"] {
  padding: 9px !important;
}
.right-inner-addon span {
  padding: 10px 12px !important;
}
</style>
<style
  src="../../../../modul/@suadelabs/vue3-multiselect/dist/vue3-multiselect.css"
></style>
