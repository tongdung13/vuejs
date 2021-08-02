<template>
  <div class="col-md-10 res mb-5 mt-3">
    <h5 class="mt-3 font-weight-bold color-main">ĐƠN OFFLINE</h5>
    <!-- Thông tin người nhận -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <h6>THÔNG TIN NGƯỜI NHẬN</h6>
      <div class="mt-4">
        <span
          class="borderx mr-3"
          @click="activeKh = 1"
          :class="{ active_cus: activeKh == 1 }"
        >
          Khách hàng mới
        </span>
        <span
          class="borderx"
          @click="activeKh = 2"
          :class="{ active_cus: activeKh == 2 }"
        >
          Khách hàng đã có TK
        </span>
      </div>
      <div class="mt-3 pb-2">
        <table class="table table-borderless" v-if="activeKh == 1">
          <tbody class="text-right">
            <tr>
              <td style="width: 15%;">
                <div class="table-input">
                  Họ và tên <span class="text-danger"> * </span>:
                </div>
              </td>
              <td style="width: 35%">
                <input
                  type="text"
                  placeholder="Họ và tên "
                  class="w-100"
                  v-model="formsubmit.name"
                  required
                />
              </td>
              <td style="width: 15%;">
                <div class="table-input">
                  Email:
                </div>
              </td>
              <td>
                <input
                  type="email"
                  class="w-100"
                  placeholder="Nhập email..."
                  v-model="formsubmit.email"
                  required
                />
              </td>
            </tr>
            <tr>
              <td style="width: 15%;">
                <div class="table-input">
                  Số điện thoại <span class="text-danger"> * </span>:
                </div>
              </td>
              <td>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="0386632727"
                  class="w-100"
                  v-model="formsubmit.phone"
                  required
                />
              </td>
              <td style="width: 15%;">
                <div class="table-input">
                  Địa chỉ <span class="text-danger"> * </span>:
                </div>
              </td>
              <td>
                <input
                  type="text"
                  class="w-100"
                  placeholder="Nhập địa chỉ..."
                  v-model="formsubmit.address"
                  required
                />
              </td>
            </tr>
            <tr>
              <td style="width: 15%;">
                <div class="table-input">
                  Giới tính:
                </div>
              </td>
              <td class="text-left">
                <select
                  class="inputx mr-3 res-margin-0"
                  style="outline: none"
                  v-model="formsubmit.sex"
                >
                  <option value="">--Chọn giới tính--</option>
                  <option value="1">Nam</option>
                  <option value="2">Nữ</option>
                </select>
              </td>
              <td style="width: 15%;">
                <div class="table-input">
                  Ngày sinh <span class="text-danger"> * </span>:
                </div>
              </td>
              <td>
                <input
                  type="date"
                  class="w-100"
                  v-model="formsubmit.birthday"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="activeKh == 2">
          <table class="table table-borderless">
            <tbody class="text-right">
              <tr>
                <td style="width: 15%;">
                  <div class="table-input">
                    Chọn sđt KH <span class="text-danger"> * </span>:
                  </div>
                </td>
                <td style="width: 35%">
                  <multiselect
                    v-model="selected"
                    :options="listCustomers"
                    :custom-label="nameWithLang"
                    :close-on-select="true"
                    :clear-on-select="true"
                    placeholder="--Nhập thông tin khách hàng--"
                    label="phone"
                    track-by="id"
                    @select="onSelect($event)"
                  >
                  </multiselect>
                </td>
                <td style="width: 15%;">
                  <div class="table-input">Email:</div>
                </td>
                <td>
                  <input
                    type="email"
                    class="w-100"
                    placeholder="Nhập email..."
                    v-model="formsubmit.email"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Tên khách hàng:</div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Tên khách hàng"
                    class="w-100"
                    v-model="formsubmit.name"
                    readonly
                  />
                </td>
                <td>
                  <div class="table-input">Địa chỉ:</div>
                </td>
                <td>
                  <input
                    type="text"
                    class="w-100"
                    placeholder="Nhập địa chỉ..."
                    v-model="formsubmit.address"
                  />
                </td>
              </tr>
              <tr>
                <td style="width: 15%;">
                  <div class="table-input">
                    Giới tính:
                  </div>
                </td>
                <td class="text-left">
                  <select
                    class="inputx mr-3 res-margin-0"
                    style="outline: none"
                    v-model="formsubmit.sex"
                  >
                    <option value="">--Chọn giới tính--</option>
                    <option value="1">Nam</option>
                    <option value="2">Nữ</option>
                  </select>
                </td>
                <td style="width: 15%;">
                  <div class="table-input">
                    Ngày sinh <span class="text-danger"> * </span>:
                  </div>
                </td>
                <td>
                  <input
                    type="date"
                    class="w-100"
                    v-model="formsubmit.birthday"
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- ========================== -->

    <!-- Thong tin bán hàng -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <h6>THÔNG TIN BÁN HÀNG</h6>
      <div class="mt-3 pb-2">
        <table class="table table-borderless">
          <tbody class="text-right">
            <tr>
              <td style="width: 15%;">
                <div class="table-input">Tên salon:</div>
              </td>
              <td style="width: 35%">
                <select
                  class="inputx mr-3 res-margin-0"
                  style="width: 100%; outline: none"
                  v-model="formsubmit.salon_id"
                  @change="onclickSalon(formsubmit.salon_id)"
                >
                  <option value="">Tất cả salon</option>
                  <option
                    v-for="salon in listStore"
                    :key="salon.id"
                    :value="salon.id"
                  >
                    {{ salon.salon_name }}
                  </option>
                </select>
              </td>
              <td></td>
              <td></td>
              <!-- <td style="width: 15%">
                <div class="table-input">Thẻ thanh toán:</div>
              </td>
              <td>
                <div v-if="formsubmit.salon_id">
                  <select
                    class="inputx mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="formsubmit.funds_id"
                  >
                    <option value="">--Chọn ngân hàng--</option>
                    <option
                      v-for="(item, index) in listBank"
                      :key="index"
                      :value="item.id"
                      >{{ item.bank }}</option
                    >
                  </select>
                </div>
                <div v-else class="inputx text-left">
                  --Chọn salon--
                </div>
              </td> -->
            </tr>
            <tr
              v-for="(item, index) in formsubmit.productId.length"
              :key="index"
            >
              <td>
                <div class="table-input">Sản phẩm: {{ index + 1 }}</div>
              </td>
              <td>
                <!-- <select
                  v-if="formsubmit.salon_id"
                  class="inputx mr-3 res-margin-0"
                  style="width: 100%; outline: none"
                  v-model="formsubmit.productId[index].id"
                  @change="returnPrice(formsubmit.productId[index].id, index)"
                >
                  <option value="">--Chọn sản phẩm--</option>

                  <option
                    v-for="product in listProducts"
                    :key="product.id"
                    :value="product.product_id"
                  >
                    {{ product.name }}
                  </option>
                </select> -->
                <div v-if="formsubmit.salon_id">
                  <multiselect
                    v-model="formsubmit.productId[index].selected"
                    :options="listProducts"
                    :custom-label="nameWithSku"
                    :close-on-select="true"
                    :clear-on-select="true"
                    placeholder="--Chọn sản phẩm--"
                    label="name"
                    @select="onSelectSanPham($event, index)"
                  >
                  </multiselect>
                </div>
                <div v-else class="inputx text-left">
                  --Chọn salon--
                </div>
              </td>
              <td style="width: 15%;">
                <div class="table-input">
                  Số lượng:
                </div>
              </td>
              <td>
                <div class="row">
                  <div class="col-4">
                    <span v-if="formsubmit.productId[index].id">
                      <input
                        type="number"
                        max="1000"
                        placeholder="Số lượng"
                        min="0"
                        class="w-100"
                        v-model="formsubmit.productId[index].amount"
                        @change="changeQualiti"
                      />
                    </span>
                    <span v-else>
                      <input
                        type="number"
                        max="1000"
                        min="0"
                        class="w-100"
                        placeholder="Chọn sản phẩm"
                        readonly
                      />
                    </span>
                  </div>
                  <div class="col-8">
                    <div class="row">
                      <div class="col-8">
                        <div
                          v-if="formsubmit.productId[index].id"
                          class="table-input inputx text-left"
                        >
                          Giá:
                          {{ formatPrice(formsubmit.productId[index].price) }}
                        </div>
                        <div v-else class="mr-4">
                          <div class="right-inner-addon input-container">
                            <span>VNĐ</span>
                            <input
                              type="text"
                              class="w-100"
                              value="Đơn giá:"
                              readonly
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-4" style=" margin-top:5px">
                        <span
                          class="inputx text-left"
                          style="cursor: pointer;"
                          @click="removeSalon(index)"
                        >
                          <img src="../../../assets/image/xx.png" alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <span class="inputx hover" @click="pushQualiti">
                  Thêm sản phẩm
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="table-input">Giảm tiền mặt:</div>
              </td>
              <td>
                <div
                  v-if="totalPriceProducts >= 0"
                  class="right-inner-addon input-container"
                >
                  <span>VNĐ</span>
                  <input
                    type="number"
                    class="w-100"
                    v-model="formsubmit.discount"
                    @change="convertPercentToDiscount"
                  />
                </div>
                <div v-else class="right-inner-addon input-container">
                  <span>VNĐ</span>
                  <input
                    type="number"
                    class="w-100"
                    v-model="formsubmit.discount"
                    @change="convertPercentToDiscount"
                    readonly
                  />
                </div>
              </td>
              <td>
                <div class="table-input">Chiết khấu %:</div>
              </td>
              <td>
                <div
                  v-if="totalPriceProducts >= 0"
                  class="right-inner-addon input-container"
                >
                  <span>%</span>
                  <input
                    type="number"
                    class="w-100"
                    v-model="formsubmit.percent"
                    @change="convertDiscountToPercent"
                  />
                </div>
                <div v-else class="right-inner-addon input-container">
                  <span>%</span>
                  <input
                    type="number"
                    class="w-100"
                    v-model="formsubmit.percent"
                    @change="convertDiscountToPercent"
                    readonly
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="table-input">Phí vận chuyển:</div>
              </td>
              <td>
                <div
                  class="right-inner-addon input-container"
                  v-if="totalPriceProducts >= 0"
                >
                  <span>VNĐ</span>
                  <input
                    type="number"
                    class="w-100"
                    v-model="formsubmit.delivery"
                    @change="convertDelivery"
                  />
                </div>
                <div v-else class="right-inner-addon input-container">
                  <span>VNĐ</span>
                  <input
                    type="number"
                    class="w-100"
                    v-model="formsubmit.delivery"
                    readonly
                  />
                </div>
              </td>
              <td>
                <div class="table-input">Mã giảm giá:</div>
              </td>
              <td>
                <div v-if="formsubmit.productId[0].id">
                  <div class="row">
                    <div class="col-7">
                      <select
                        class="inputx mr-3 res-margin-0"
                        style="width: 100%; outline: none"
                        v-model="formsubmit.vouchers"
                        @change="choseVoucher"
                      >
                        <option value="">--Chọn mã giảm giá--</option>

                        <option
                          v-for="voucher in listVoucher"
                          :key="voucher.id"
                          :value="voucher"
                        >
                          {{ voucher.code }} -- {{ voucher.title }}
                        </option>
                      </select>
                    </div>
                    <div class="col-5">
                      <div
                        v-if="formsubmit.vouchers.type_discount != 3"
                        class="right-inner-addon input-container"
                      >
                        <span>₫</span>
                        <input
                          type="number"
                          class="w-100"
                          v-model="priceVoucher"
                          readonly
                        />
                      </div>
                      <div v-else class="text-success input">
                        {{ product_bonus }}
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <input
                    type="text"
                    class="w-100"
                    placeholder="Vui lòng chọn sản phẩm"
                    readonly
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%;">
                <div class="table-input">
                  Thẻ ưu đãi:
                </div>
              </td>
              <td>
                <div v-if="activeKh == 1">
                  <input
                    type="text"
                    class="w-100"
                    placeholder="Khách chưa có thẻ"
                    readonly
                  />
                </div>
                <div v-else>
                  <div v-if="formsubmit.name">
                    <select
                      class="inputx mr-3 res-margin-0"
                      style="width: 100%; outline: none"
                      @change="choseCard"
                      v-model="detailCard"
                    >
                      <option value="">--Chọn thẻ--</option>
                      <option
                        v-show="item.type == 1 || item.type == 2"
                        v-for="(item, index) in listCard"
                        :key="index"
                        :value="item"
                      >
                        {{ item.type_name }}
                        <span v-if="item.type == 2">
                          {{ " " + item.ratio + " %" }}
                        </span>
                        -- {{ "còn " + formatPrice(item.total_money) }} --
                        {{ item.use + " lượt" }}
                      </option>
                    </select>
                  </div>
                  <div v-else>
                    <input
                      type="text"
                      class="w-100"
                      placeholder="Chọn khách hàng"
                      readonly
                    />
                  </div>
                </div>
              </td>
              <td>
                <div class="table-input">Tổng hoá đơn:</div>
              </td>
              <td>
                <div class="input">
                  {{ formatPrice(price_after) }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- ================== -->

    <!-- Thông tin nhân viên bán hàng -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <h6>THÔNG TIN BỘ PHẬN BÁN HÀNG</h6>
      <div class="mt-3 pb-2">
        <table class="table table-borderless">
          <tbody class="text-right">
            <tr>
              <td style="width: 15%;">
                <div class="table-input">Bán hàng:</div>
              </td>
              <td style="width: 35%;">
                <!-- tìm kiếm select bán hàng -->
                <multiselect
                  v-model="selectedBanHang"
                  :options="listEmploy.nvBanHang"
                  :close-on-select="true"
                  :clear-on-select="true"
                  placeholder="--Nhập thông tin khách hàng--"
                  label="name"
                  @select="onSelectBanHang($event)"
                >
                </multiselect>
                <!-- ======================== -->
              </td>
              <td style="width: 15%;">
                <div class="table-input">Marketing:</div>
              </td>
              <td style="width: 35%;">
                <!-- tìm kiếm select Marketing -->
                <multiselect
                  v-model="selectedMar"
                  :options="listEmploy.nvChamSoc"
                  :close-on-select="true"
                  :clear-on-select="true"
                  placeholder="--Nhập thông tin khách hàng--"
                  label="name"
                  @select="onSelectMar($event)"
                >
                </multiselect>
                <!-- ======================== -->
              </td>
            </tr>
            <tr>
              <td style="width: 15%;">
                <div class="table-input">Thợ chính:</div>
              </td>
              <td style="width: 35%;">
                <!-- tìm kiếm select thợ chính -->
                <multiselect
                  v-model="selectedThoChinh"
                  :options="listEmploy.nvThoChinh"
                  :close-on-select="true"
                  :clear-on-select="true"
                  placeholder="--Nhập thông tin khách hàng--"
                  label="name"
                  @select="onSelectThoChinh($event)"
                >
                </multiselect>
                <!-- ======================== -->
              </td>
              <td style="width: 15%;">
                <div class="table-input">Thợ phụ:</div>
              </td>
              <td style="width: 35%;">
                <!-- tìm kiếm select thợ phụ -->
                <multiselect
                  v-model="selectedThoPhu"
                  :options="listEmploy.nvThoPhu"
                  :close-on-select="true"
                  :clear-on-select="true"
                  placeholder="--Nhập thông tin khách hàng--"
                  label="name"
                  @select="onSelectThoPhu($event)"
                >
                </multiselect>
                <!-- ======================== -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-3 text-center pb-3">
        <span @click="backPage" class="borderx mr-2 color-main">Quay lại</span>
        <span @click="submitData" class="borderx color-main">
          Lưu và hiển thị
        </span>
      </div>
    </div>
    <!-- ============================ -->
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatPrice } from "@/main";
import Multiselect from "../../modul/@suadelabs/vue3-multiselect";
export default {
  name: "donOffline",
  components: { Multiselect },
  data() {
    return {
      customerId: "",
      customerIdMar: "",
      customerIdTC: "",
      customerIdTP: "",
      selected: null,
      selectedBanHang: null,
      selectedMar: null,
      selectedThoChinh: null,
      selectedThoPhu: null,
      selectedSanPham: null,
      selectBank: null,
      options: ["list", "of", "options"],
      activeKh: 1,
      listStore: {},
      listEmployees: {},
      listProducts: [],
      listServices: {},
      salon_id: "",
      url: "",
      productId: "",
      amount: "",
      priceProduct: "",
      qualityProduct: 1,
      formsubmit: {
        name: "",
        phone: "",
        email: "",
        address: "",
        sex: "",
        discount: "",
        voucher: "",
        voucher_name: "",
        voucher_product: "",
        vouchers: [],
        percent: "",
        user_id: "",
        delivery: "",
        type_card: "",
        // funds_id: "",
        birthday: "",
        salon_id: "",
        productId: [
          {
            selected: null,
            id: "",
            amount: "",
            price: "",
          },
        ],
        payment: "",
        user_employee: [],
      },
      priceCard: 0,
      priceVoucher: 0,
      product_bonus: "",
      percentCard: 0,
      price_before: 0,
      price_after: 0,
      detailCard: [],
      totalPriceProducts: 0,
      customer_id: "",
      // listBank: [],
      listCard: [],
      listVoucher: [],
      listCustomers: [],
      listEmploy: {
        nvBanHang: [],
        nvChamSoc: [],
        nvThoChinh: [],
        nvThoPhu: [],
      },
    };
  },
  created() {
    HTTP.get(`/salon/main/manage/form/3/employee`).then((res) => {
      let result = res.data;
      if (result.status === 1) {
        let data = result.data;
        this.listEmploy.nvBanHang = data;
      }
    });
    HTTP.get(`/salon/main/manage/form/4/employee`).then((res) => {
      let result = res.data;
      if (result.status === 1) {
        let data = result.data;
        this.listEmploy.nvChamSoc = data;
      }
    });
    HTTP.get(`/salon/main/manage/form/5/employee`).then((res) => {
      let result = res.data;
      if (result.status === 1) {
        let data = result.data;
        this.listEmploy.nvThoChinh = data;
      }
    });
    HTTP.get(`/salon/main/manage/form/6/employee`).then((res) => {
      let result = res.data;
      if (result.status === 1) {
        let data = result.data;
        this.listEmploy.nvThoPhu = data;
      }
    });
  },
  beforeMount() {
    this.listSalons();
    this.getListCustomers();
  },
  methods: {
    nameWithLang({ name, phone }) {
      return `${phone} — ${name}`;
    },
    onclickSalon(value) {
      this.salon_id = value;
      for (let index = 0; index < this.qualityProduct; index++) {
        this.formsubmit.productId[index].id = "";
      }
      this.listSalons();
      this.selectBank = null;
      // this.getListBank();
    },
    // danh sách salon
    listSalons() {
      HTTP.get("/salon/main/manage/branch/all").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listStore = data;
            this.listGenerals();
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },
    // Chọn thẻ
    choseCard() {
      this.priceCard = 0;
      if (this.detailCard == "") {
        this.totalBill();
        this.priceCard == 0;
      } else {
        this.formsubmit.type_card = this.detailCard.id;
        this.totalBill();
        if (this.detailCard.type == 1) {
          this.priceCard = this.detailCard.total_money;
          if (this.priceCard >= this.price_before) {
            this.priceCard = this.price_before;
          }
        } else if (this.detailCard.type == 2) {
          this.priceCard = (this.price_before * this.detailCard.ratio) / 100;
        } else if (this.priceCard === undefined) {
          this.priceCard = 0;
        }
      }
      this.totalBill();
    },
    // =========
    // đẩy vào mảng
    pushQualiti() {
      this.formsubmit.delivery = "";
      this.formsubmit.discount = "";
      this.formsubmit.percent = "";
      this.formsubmit.vouchers = [];
      this.priceVoucher = 0;
      this.formsubmit.productId.push({
        selected: null,
        id: "",
        amount: "",
        price: "",
      });
      this.totalBill();
    },
    removeSalon(key) {
      if (this.formsubmit.productId.length > 1) {
        this.formsubmit.productId.splice(key, 1);
      }
      this.totalBill();
    },
    // =============

    // danh sách chung
    listGenerals() {
      if (this.salon_id) {
        HTTP.get(
          `/salon/main/manage/product?condition=1&salon_id=${this.salon_id}`
        ).then((res) => {
          let result = res.data;
          if (result.status === 1) {
            let data = result.data;
            this.listProducts = data.data;
          }
        });
      }
    },
    // ==============

    // Thay đổi số lượng
    changeQualiti() {
      this.totalBill();
      this.choseVoucher();
    },
    // =================

    // Tìm mã giảm giá
    searchVoucher() {
      this.formsubmit.voucher = "";
      let formDataVoucher = new FormData();

      formDataVoucher.append("salon_id", this.formsubmit.salon_id);
      for (let index = 0; index < this.formsubmit.productId.length; index++) {
        formDataVoucher.append(
          "products[" + index + "][id]",
          this.formsubmit.productId[index].id
        );
      }
      HTTP.post(`/salon/main/manage/form/voucher?type=1`, formDataVoucher, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.listVoucher = result.data;
          // console.log(this.listVoucher);
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // ===============

    // Danh sách các thẻ
    listCards() {
      HTTP.get(`/salon/main/manage/form/${this.formsubmit.user_id}/cards`).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            this.listCard = result.data;
            // console.log(this.listCard);
          }
        }
      );
    },
    // ==================

    // Danh sách khách hàng
    getListCustomers() {
      HTTP.get(`/salon/main/manage/form/customers`).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data.data;
          this.listCustomers = data;
        }
      });
    },
    // ====================
    // Trả thông tin khách hàng
    onSelect(selected) {
      this.formsubmit.name = selected.name;
      this.formsubmit.phone = selected.phone;
      this.formsubmit.email = selected.email;
      this.formsubmit.address = selected.address;
      this.formsubmit.sex = selected.sex;
      this.formsubmit.birthday = selected.birthday;
      this.formsubmit.user_id = selected.id;

      this.listCards();
    },
    // =========================

    // tìm kiếm nhân viên theo bộ phận
    onSelectBanHang(banHang) {
      this.customerId = banHang.id;
    },
    onSelectMar(mar) {
      this.customerIdMar = mar.id;
    },
    onSelectThoChinh(thoChinh) {
      this.customerIdTC = thoChinh.id;
    },
    onSelectThoPhu(thoPhu) {
      this.customerIdTP = thoPhu.id;
    },
    onSelectSanPham(sanPham, index) {
      this.formsubmit.productId[index].id = sanPham.product_id;
      if (sanPham.price_sale != null) {
        this.formsubmit.productId[index].price = sanPham.price_sale;
      } else this.formsubmit.productId[index].price = sanPham.price;
      // this.searchVoucher();
      this.priceVoucher = 0;
      this.totalBill();
      this.formsubmit.vouchers = [];
    },
    nameWithSku({ sku, name }) {
      return `${sku} — ${name}`;
    },
    // ===============================

    // trả về giá sản phẩm
    returnPrice(value, chiSo) {
      let leng = this.listProducts.length;
      for (let index = 0; index < leng; index++) {
        if (this.listProducts[index].product_id === value) {
          if (this.listProducts[index].price_sale != null) {
            this.formsubmit.productId[chiSo].price = this.listProducts[
              index
            ].price_sale;
          } else
            this.formsubmit.productId[chiSo].price = this.listProducts[
              index
            ].price;
        }
      }
      this.searchVoucher();
      this.priceVoucher = 0;
      this.totalBill();
      this.formsubmit.vouchers = [];
    },
    // ======================

    // Submit form
    submitData() {
      let formData = new FormData();

      formData.append("name", this.formsubmit.name);
      formData.append("sex", this.formsubmit.sex);
      formData.append("discount", this.formsubmit.discount);
      formData.append("phone", this.formsubmit.phone);
      if (this.formsubmit.email != null) {
        formData.append("email", this.formsubmit.email);
      }
      formData.append("address", this.formsubmit.address);
      formData.append("voucher", this.formsubmit.voucher);
      formData.append("voucher_name", this.formsubmit.voucher_name);
      formData.append("voucher_product", this.formsubmit.voucher_product);
      formData.append("birthday", this.formsubmit.birthday);
      if (this.formsubmit.type_card) {
        formData.append("type_card", this.formsubmit.type_card);
      }
      formData.append("price_ship", this.formsubmit.delivery);
      formData.append("salon_id", this.formsubmit.salon_id);
      // formData.append("funds_id", this.formsubmit.funds_id);
      if (this.customerId) {
        this.formsubmit.user_employee.push(this.customerId);
      }
      if (this.customerIdMar) {
        this.formsubmit.user_employee.push(this.customerIdMar);
      }
      if (this.customerIdTC) {
        this.formsubmit.user_employee.push(this.customerIdTC);
      }
      if (this.customerIdTP) {
        this.formsubmit.user_employee.push(this.customerIdTP);
      }
      formData.append("user_employee", this.formsubmit.user_employee);

      if (this.formsubmit.user_id) {
        formData.append("user_id", this.formsubmit.user_id);
      }
      for (let index = 0; index < this.formsubmit.productId.length; index++) {
        formData.append(
          "products[" + index + "][id]",
          this.formsubmit.productId[index].id
        );
        formData.append(
          "products[" + index + "][price]",
          this.formsubmit.productId[index].price
        );
        formData.append(
          "products[" + index + "][amount]",
          this.formsubmit.productId[index].amount
        );
      }
      HTTP.post(`/salon/main/manage/order/store`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.$swal("", result.message, "success");
          setTimeout(function() {
            history.back();
          }, 1000);
        } else {
          this.$swal("", result.message, "error");
        }
      });
      this.formsubmit.user_employee = [];
    },
    // ============

    // Tính tổng tiền hoá đơn
    totalBill() {
      this.price_before = 0;
      this.price_after = 0;
      for (let index = 0; index < this.formsubmit.productId.length; index++) {
        this.price_before +=
          this.formsubmit.productId[index].amount *
          this.formsubmit.productId[index].price;
      }
      this.price_after =
        this.price_before -
        this.formsubmit.discount -
        -this.formsubmit.delivery -
        this.priceVoucher;
      if (this.priceCard >= this.price_after) this.price_after = 0;
      else this.price_after -= this.priceCard;
    },
    // =======================

    // Chuyển chiết khấu tiền => %
    convertPercentToDiscount() {
      this.totalBill();
      let pricePercent = (this.formsubmit.discount / this.price_before) * 100;
      this.formsubmit.percent = pricePercent.toFixed(2);
    },
    convertDiscountToPercent() {
      this.totalBill();
      let priceMoney = (this.price_before * this.formsubmit.percent) / 100;
      this.formsubmit.discount = priceMoney;
      this.totalBill();
    },
    convertDelivery() {
      this.totalBill();
      this.price_after -= this.formsubmit.delivery;
      this.totalBill();
    },
    choseVoucher() {
      if (this.formsubmit.vouchers == "") {
        this.priceVoucher = 0;
        this.totalBill();
      } else {
        this.formsubmit.voucher = this.formsubmit.vouchers.id;
        this.formsubmit.voucher_name = this.formsubmit.vouchers.code;
        this.formsubmit.voucher_product = this.formsubmit.vouchers.product_id;
        if (this.formsubmit.vouchers.type_discount == 1) {
          this.totalBill();
          const price = parseFloat(this.formsubmit.vouchers.discount);
          this.priceVoucher = (this.price_before * price) / 100;

          this.totalBill();
        } else if (this.formsubmit.vouchers.type_discount == 2) {
          this.totalBill();
          const price = parseFloat(this.formsubmit.vouchers.discount);
          this.priceVoucher = price;

          this.totalBill();
        } else if (this.formsubmit.vouchers.type_discount == 3) {
          this.priceVoucher = 0;
          this.product_bonus = "Tặng " + this.formsubmit.vouchers.product_bonus;
          this.totalBill();
        }
      }
      // console.log(this.priceVoucher);
    },
    // =================
    onFileChange(e) {
      this.formsubmit.bill_image = e.target.files[0];
      this.url = URL.createObjectURL(this.formsubmit.bill_image);
    },
    // ==============
    removeFile() {
      this.formsubmit.bill_image = "";
      this.url = "";
    },
    backPage() {
      history.back();
    },
    formatPrice,
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
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.table-input {
  padding: 5px 10px;
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

label {
  padding: 25px 15px;
  background: rgba(255, 255, 255, 0.56);

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
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
.active_cus {
  background: #d4476f;
  color: white;
}
</style>
<style
  src="../../modul/@suadelabs/vue3-multiselect/dist/vue3-multiselect.css"
></style>
