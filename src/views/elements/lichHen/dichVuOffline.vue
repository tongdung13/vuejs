<template>
  <div class="col-md-10 res mb-5 mt-3">
    <h5 class="mt-3 font-weight-bold color-main">ĐẶT DỊCH VỤ OFFLINE</h5>
    <!-- Thông tin người nhận -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <h6>THÔNG TIN NGƯỜI ĐẶT</h6>
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
                    Email <span class="text-danger"> * </span>:
                  </div>
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
                  />
                </td>
              </tr>
              <tr>
                <td style="width: 15%;">
                  <div class="table-input">
                    Giới tính <span class="text-danger"> * </span>:
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
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="0386632727"
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
                <!-- <tr>
                  <td style="width: 15%;">
                    <div class="table-input">
                      Chọn thẻ thanh toán <span class="text-danger"> * </span>:
                    </div>
                  </td>
                  <td>
                    <select
                      class="inputx mr-3 res-margin-0"
                      style="width: 100%; outline: none"
                      v-model="formsubmit.funds_id"
                    >
                      <option value="">--Chọn thẻ--</option>
                      <option value="0">Thẻ tiền</option>
                      <option value="1">Thẻ giảm giá</option>
                      <option value="2">Thẻ lượt</option>
                    </select>
                  </td>
                </tr> -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- ========================== -->

    <!-- Thong tin bán hàng -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <h6>THÔNG TIN DỊCH VỤ</h6>
      <div class="mt-3 pb-2">
        <table class="table table-borderless">
          <tbody class="text-right">
            <tr>
              <td style="width: 15%">
                <div class="table-input">Tên salon:</div>
              </td>
              <td style="width: 35%;">
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
              <td>
                <div class="table-input">Thời gian:</div>
              </td>
              <td style="width: 35%">
                <input
                  type="datetime-local"
                  class="w-100"
                  v-model="formsubmit.date_time"
                />
              </td>
              <!-- <td style="width: 15%">
                <div class="table-input">Thẻ thanh toán:</div>
              </td>
              <td>
                <div v-if="formsubmit.salon_id">
                  <select
                    class="inputx mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="formsubmit.payment"
                  >
                    <option value="">--Chọn ngân hàng--</option>
                    <option
                      v-for="(item, index) in listBank"
                      :key="index"
                      :value="item.id"
                    >
                      {{ item.bank }}
                    </option>
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
              <td style="width: 15%">
                <div class="table-input">Tên dịch vụ {{ index + 1 }}:</div>
              </td>
              <td>
                <select
                  v-if="formsubmit.salon_id"
                  class="inputx mr-3 res-margin-0"
                  style="width: 100%; outline: none"
                  v-model="formsubmit.productId[index].id"
                  @change="returnPrice(formsubmit.productId[index].id, index)"
                >
                  <option value="">Tất cả dịch vụ</option>

                  <option
                    v-for="product in listProducts"
                    :key="product.id"
                    :value="product.id"
                  >
                    {{ product.title }}
                  </option>
                </select>
                <div v-else class="inputx text-left">
                  --Chọn dịch vụ--
                </div>
              </td>
              <td style="width: 15%">
                <div class="table-input">Đơn giá:</div>
              </td>
              <td>
                <span class="w-50 float-left">
                  <div v-if="formsubmit.productId[index].id" class="inputx">
                    <b class="color-main">
                      {{ formatPrice(formsubmit.productId[index].price) }}
                    </b>
                  </div>
                  <div v-else class="inputx color-main">
                    VNĐ
                  </div>
                </span>
                <span class="w-50 p-0" style="vertical-align: sub;">
                  <span class=" borderx color-main" @click="removeSalon(index)">
                    Xoá
                  </span>
                </span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td colspan="2">
                <span class="borderx" @click="pushQualiti">Thêm dịch vụ</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="table-input">Thẻ ưu đãi:</div>
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
                  <select
                    class="inputx mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    @change="choseCard"
                    v-model="detailCard"
                  >
                    <option value="">--Chọn thẻ--</option>
                    <option
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
              </td>
              <td>
                <div class="table-input">Phí phát sinh:</div>
              </td>
              <td style="width: 35%">
                <div class="right-inner-addon input-container">
                  <span>VNĐ</span>
                  <input
                    type="number"
                    class="w-100"
                    v-model="formsubmit.incurred"
                    @change="convertIncurred"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="table-input">Giảm tiền mặt:</div>
              </td>
              <td>
                <div
                  v-if="price_before"
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
                  v-if="price_before"
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
                <div class="table-input">Mã giảm giá:</div>
              </td>
              <td>
                <div v-if="formsubmit.productId[0].id">
                  <div class="row">
                    <div class="col-8">
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
                    <div class="col-4">
                      <div class="right-inner-addon input-container">
                        <span>₫</span>
                        <input
                          type="number"
                          class="w-100"
                          v-model="priceVoucher"
                          readonly
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <input
                    type="text"
                    class="w-100"
                    placeholder="Vui lòng chọn dịch vụ"
                    readonly
                  />
                </div>
              </td>
              <td style="width: 15%;">
                <div class="table-input">Tổng hoá đơn:</div>
              </td>
              <td>
                <div
                  v-if="price_after < 0"
                  class="right-inner-addon input-container"
                >
                  <span>VNĐ</span>
                  <input type="text" class="w-100" readonly />
                </div>
                <div v-else class="input">
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
      <h6>THÔNG TIN NHÂN VIÊN BÁN HÀNG</h6>
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
  name: "dichVuOffline",
  components: { Multiselect },
  data() {
    return {
      customerId: "",
      customerIdMar: "",
      customerIdTC: "",
      customerIdTP: "",
      listStore: {},
      activeKh: 1,
      listEmployees: {},
      listProducts: {},
      listServices: {},
      salon_id: "",
      url: "",
      productId: "",
      amount: "",
      priceProduct: "",
      formsubmit: {
        name: "",
        phone: "",
        email: "",
        address: "",
        birthday: "",
        sex: "",
        type_card: "",
        salon_id: "",
        productId: [
          {
            id: "",
            price: "",
          },
        ],
        listServices: [],
        vouchers: [],
        voucher_name: "",
        voucher_service: "",
        incurred: "",
        discount: "",
        price: "",
        bill_image: "",
        date_time: "",
        user_id: "",
        user_employee: [],
      },
      price_after: 0,
      price_before: 0,
      priceVoucher: 0,
      priceCard: "",
      selected: null,
      selectedBanHang: null,
      selectedMar: null,
      selectedThoChinh: null,
      selectedThoPhu: null,
      listCustomers: [],
      listVoucher: [],
      listEmploy: {
        nvBanHang: [],
        nvChamSoc: [],
        nvThoChinh: [],
        nvThoPhu: [],
      },
      // listBank: [],
      listCard: [],
      detailCard: [],
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
      // this.getListBank();
      (this.formsubmit.productId = [
        {
          id: "",
          price: "",
        },
      ]),
        (this.salon_id = value);
      this.listSalons();
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
    // danh sách chung
    listGenerals() {
      if (this.salon_id != "") {
        HTTP.get(`/salon/main/manage/form/${this.salon_id}/commission`).then(
          (res) => {
            let result = res.data;
            if (result.status === 1) {
              this.listProducts = result.data.services;
            }
          }
        );
      }
    },
    // ==============
    // Danh sách các thẻ
    listCards() {
      HTTP.get(`/salon/main/manage/form/${this.formsubmit.user_id}/cards`).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            this.listCard = result.data;
          }
        }
      );
    },
    // ==================
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
    // Chọn mã giảm giá
    choseVoucher() {
      if (this.formsubmit.vouchers == "") {
        this.priceVoucher = 0;
        this.totalBill();
      } else {
        this.formsubmit.voucher = this.formsubmit.vouchers.id;
        this.formsubmit.voucher_name = this.formsubmit.vouchers.code;
        this.formsubmit.voucher_service = this.formsubmit.vouchers.product_id;
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
    // ================
    // đẩy vào mảng
    pushQualiti() {
      this.formsubmit.productId.push({ id: "", price: "" });
    },
    removeSalon(key) {
      if (this.formsubmit.productId.length > 1) {
        this.formsubmit.productId.splice(key, 1);
      }
      this.totalBill();
    },
    // Tìm mã giảm giá
    searchVoucher() {
      this.formsubmit.voucher = "";
      let formDataVoucher = new FormData();

      formDataVoucher.append("salon_id", this.formsubmit.salon_id);
      for (let index = 0; index < this.formsubmit.productId.length; index++) {
        formDataVoucher.append(
          "services[" + index + "][id]",
          this.formsubmit.productId[index].id
        );
      }
      HTTP.post(`/salon/main/manage/form/voucher?type=2`, formDataVoucher, {
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

    // trả về giá dịch vụ
    returnPrice(value, chiSo) {
      this.totalBill();
      let leng = this.listProducts.length;
      for (let index = 0; index < leng; index++) {
        if (this.listProducts[index].id === value) {
          this.formsubmit.productId[chiSo].price = this.listProducts[
            index
          ].price;
        }
      }
      this.searchVoucher();
      this.totalBill();
    },
    // ======================

    // Tính tổng tiền hoá đơn
    totalBill() {
      this.price_before = 0;
      this.price_after = 0;
      for (let index = 0; index < this.formsubmit.productId.length; index++) {
        this.price_before += this.formsubmit.productId[index].price;
      }
      this.price_after =
        this.price_before -
        -this.formsubmit.incurred -
        this.formsubmit.discount -
        this.priceCard -
        this.priceVoucher;
    },
    convertIncurred() {
      this.totalBill();
    },
    // =======================
    // Chuyển chiết khấu tiền => %
    convertPercentToDiscount() {
      this.totalBill();
      let pricePercent = (this.formsubmit.discount / this.price_before) * 100;
      this.formsubmit.percent = pricePercent.toFixed(2);
      this.totalBill();
    },
    convertDiscountToPercent() {
      this.totalBill();
      let priceMoney = (this.price_before * this.formsubmit.percent) / 100;
      this.formsubmit.discount = priceMoney;
      this.totalBill();
    },
    // ===============================

    // Submit form
    submitData() {
      let formData = new FormData();

      formData.append("name", this.formsubmit.name);
      formData.append("phone", this.formsubmit.phone);
      formData.append("address", this.formsubmit.address);
      formData.append("birthday", this.formsubmit.birthday);
      formData.append("sex", this.formsubmit.sex);
      formData.append("salon_id", this.formsubmit.salon_id);
      formData.append("discount", this.formsubmit.discount);
      formData.append("extra_fee", this.formsubmit.incurred);
      formData.append("date_time", this.formsubmit.date_time);
      formData.append("voucher", this.formsubmit.voucher);
      formData.append("voucher_name", this.formsubmit.voucher_name);
      formData.append("voucher_service", this.formsubmit.voucher_service);
      if (this.formsubmit.type_card) {
        formData.append("type_card", this.formsubmit.type_card);
      }

      // formData.append("service_id", 1);

      // formData.append("funds_id", this.formsubmit.payment);

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
      if (this.formsubmit.user_id) {
        formData.append("user_id", this.formsubmit.user_id);
      }

      formData.append("user_employee", this.formsubmit.user_employee);
      for (let index = 0; index < this.formsubmit.productId.length; index++) {
        this.formsubmit.listServices.push(this.formsubmit.productId[index].id);
      }
      formData.append("service_id", this.formsubmit.listServices);
      HTTP.post(`/salon/main/manage/appointmentSchedule/store`, formData, {
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
          this.formsubmit.listServices = [];
          this.formsubmit.user_employee = [];
          this.$swal("", result.message, "error");
        }
      });
    },
    // ============

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
    // ===============================
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
