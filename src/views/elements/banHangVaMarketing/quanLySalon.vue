<template>
  <div class="col-md-10 mb-5 res mt-3">
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
    <!-- <router-link to="/themSalon">
      <span class="inputx color-main mr-3">+ Thêm salon</span>
    </router-link> -->
    <a>
      <span class="inputx hover color-main">Xuất báo cáo</span>
    </a>
    <div class="mt-3 mb-4">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-6">
          <h6 class="pt-2">Kho hàng / Dịch vụ</h6>
        </div>
        <div class="col-md-6 col-sm-6 col-6">
          <router-link :to="{ name: 'quanLyKho' }">
            <span class="inputx hover color-main" style="float: right"
              > Chi tiết </span
            >
          </router-link>
        </div>
      </div>
    </div>
    <div class="row m-0 w-100">
      <div class="col bgWhite text-center mr-4">
        <h5 class="font-weight-bold" style="color: #ff7a00">
          {{ storage.product.sale }}
        </h5>
        <span>Còn hàng</span>
      </div>
      <div class="col bgWhite text-center mr-4">
        <h5 class="font-weight-bold" style="color: #ff7a00">
          {{ storage.product.stock }}
        </h5>
        <span>Bán hết</span>
      </div>
      <div class="col bgWhite text-center mr-4">
        <h5 class="font-weight-bold" style="color: #ff7a00">
          {{ storage.product.violate }}
        </h5>
        <span>Tạm khoá</span>
      </div>
      <div class="col bgWhite text-center mr-4">
        <h5 class="font-weight-bold" style="color: #ff7a00">
          {{ storage.service.display }}
        </h5>
        <span>Sẵn sàng phục vụ</span>
      </div>
      <div class="col bgWhite text-center mr-4">
        <h5 class="font-weight-bold" style="color: #ff7a00">
          {{ storage.service.hidden }}
        </h5>
        <span>Đã tạm ngừng</span>
      </div>
    </div>
    <div class="row mt-3 mb-5">
      <div class="col-md-7 col-sm-12 col-12">
        <div class="row">
          <div class="col-md-6 col-sm-12 col-12">
            <div class="row">
              <div class="col-md-6 col-sm-6 col-6">
                <h6 class="pt-2">Quản lý thẻ</h6>
              </div>
              <div class="col-md-6 col-sm-6 col-6">
                <router-link :to="{ name: 'quanLyThe' }">
                  <span class="inputx hover color-main" style="float: right"
                    >Chi tiết</span
                  >
                </router-link>
              </div>
            </div>
            <div class="bgWhite1 mt-3 pl-3 pr-3 p-3">
              <div class="row">
                <div class="col-md-6 col-sm-6 col-6">
                  <div class="w-100">
                    <img src="../../../assets/image/cardBlue.png" alt="" />
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-6 text-right">
                  <p class="text-gradient-blue">
                    Số lượng: {{ format(card.card_money.total_card) }}
                  </p>
                  <br />
                  <p class="text-gradient-blue">
                    Giá trị: {{ formatPrice(card.card_money.total_money) }}
                  </p>
                  <br />
                  <p class="text-gradient-blue">
                    Thu về: {{ formatPrice(card.card_money.total_reward) }}
                  </p>
                  <br />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-7 col-sm-6 col-6">
                  <div class="w-100">
                    <img src="../../../assets/image/cardRed.png" alt="" />
                  </div>
                </div>
                <div class="col-md-5 col-sm-6 col-6 pl-0 text-right">
                  <p class="text-gradient-red">
                    Số lượng: {{ format(card.card_ratio.total_card) }}
                  </p>
                  <br />
                  <p class="text-gradient-red">
                    Giá trị: {{ formatPrice(card.card_ratio.total_money) }}
                  </p>
                  <br />
                  <p class="text-gradient-red">
                    Thu về: {{ formatPrice(card.card_ratio.total_reward) }}
                  </p>
                  <br />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-7 col-sm-6 col-6">
                  <div class="w-100">
                    <img src="../../../assets/image/cardYello.png" alt="" />
                  </div>
                </div>
                <div class="col-md-5 col-sm-6 col-6 pl-0 text-right">
                  <p class="text-gradient-yellow">
                    Số lượng: {{ format(card.card_turn.total_card) }}
                  </p>
                  <br />
                  <p class="text-gradient-yellow">
                    Thu về: {{ formatPrice(card.card_turn.total_reward) }}
                  </p>
                  <br />
                  <p class="text-gradient-yellow">
                    Thanh toán: {{ card.card_turn.total_reward }}
                  </p>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 col-12 margin-top-5">
            <div class="row">
              <div class="col-md-7 col-sm-7 col-7">
                <h6 class="pt-2">Quản lý marketing</h6>
              </div>
              <div class="col-md-5 col-sm-5 col-5">
                <router-link :to="{ name: 'index-quanLyMarketing' }">
                  <span class="inputx hover color-main" style="float: right"
                    >Chi tiết</span
                  >
                </router-link>
              </div>
            </div>
            <div class="bgWhite1 mt-3 pl-2">
              <p
                class="color-main font-weight-bold mb-2"
                style="font-size: 100%"
              >
                Chương trình của Beauty Plus
              </p>
              <p>
                Tổng số lượng:
                {{ marketing_manager.marketing_promotions }} Chương trình
              </p>
              <p>
                Đã tham gia:
                {{ marketing_manager.marketing_salon_promotion_used }} Chương
                trình
              </p>
              <p
                class="color-main mt-3 mb-2 font-weight-bold"
                style="font-size: 100%"
              >
                Công cụ của tôi
              </p>
              <p>
                Chương trình của tôi:
                {{ marketing_manager.marketing_salon_promotions }} Chương trình
              </p>
              <p>
                Mã giảm giá của tôi:
                {{ marketing_manager.marketing_discount_code }} Mã
              </p>
              <p>
                Combo của tôi:
                {{ marketing_manager.marketing_combo_sale }} Combo
              </p>
              <p>
                Push thông báo:
                {{ marketing_manager.marketing_notification }} Đã push
              </p>
            </div>
          </div>
        </div>
        <div class="row mt-2 p-3">
          <div class="bg-16 w-100 p-2">
            <div class="row p-2">
              <div class="col-md-6 col-sm-6 col-6">
                <h6 class="pt-2">Phân tích bán hàng</h6>
              </div>
              <div class="col-md-6 col-6 col-6">
                <router-link :to="{ name: 'baoCaoBanHang' }">
                  <span class="inputx hover color-main" style="float: right">
                    Chi tiết
                  </span>
                </router-link>
              </div>
            </div>

            <div class="row mt-1">
              <div class="col-md-12">
                <ul
                  class="nav nav-pills mb-3 w-100"
                  id="pills-tab"
                  role="tablist"
                >
                  <li class="nav-item">
                    <a
                      class="nav-link active font-weight-bold"
                      id="pills-home-tab"
                      data-toggle="pill"
                      href="#pills-home"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      Theo tuần
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link font-weight-bold"
                      id="pills-profile-tab"
                      data-toggle="pill"
                      href="#pills-profile"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      Theo tháng
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link font-weight-bold"
                      id="pills-contact-tab"
                      data-toggle="pill"
                      href="#pills-contact"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      Theo năm
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-md-12">
                <div class="tab-content tab-pills" id="pills-tabContent">
                  <div
                    class="tab-pane fade active show"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div v-if="getData != ''">
                      <bieuDoDuong :dataBdDuong="getData" />
                    </div>
                  </div>
                  <div
                    class="tab-pane"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    <bieuDoThang />
                  </div>
                  <div
                    class="tab-pane"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                  >
                    <bieuDoNam />
                  </div>
                </div>
              </div>
            </div>
            <!-- Biểu đồ -->
            <!-- <div class="container">
              <bieuDoDuong />
            </div> -->
            <!-- ===== -->
            <div></div>
          </div>
        </div>
      </div>
      <div class="col-md-5 col-sm-12 col-12">
        <div class="row margin-top-5">
          <div class="col-md-6 col-sm-6 col-6">
            <h6 class="pt-2">Chuỗi Salon</h6>
          </div>
          <div class="col-md-6 col-sm-6 col-6">
            <router-link :to="{ name: 'index-thietKeSalon' }">
              <span class="inputx hover color-main" style="float: right"
                >Chi tiết</span
              >
            </router-link>
          </div>
        </div>
        <div
          class="bgWhite mt-3 p-0"
          v-for="(item, index) in salon"
          :key="index"
        >
          <div class="row">
            <div class="col-md-5 col-sm-5 col-5 text-center">
              <img
                :src="item.salon_cover_image"
                alt="photo"
                style="max-height: 110px; object-fit: cover; border-top-left-radius: 8px; border-bottom-left-radius: 8px;"
                class="w-100"
              />
            </div>
            <div class="col-md-7 col-sm-7 col-7 mt-3">
              <p style="font-size: 16px" class="font-weight-bold">
                {{ item.salon_name }}
              </p>
              <p class="mt-2" style="font-size: small; line-height: 15px">
                {{ item.salon_address }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatPrice,formatNumberAccount } from "@/main";
import bieuDoDuong from "./bieuDo/bieuDoDuong.vue";
import bieuDoThang from "../banHangVaMarketing/bieuDo/bieuDoThang";
import bieuDoNam from "../banHangVaMarketing/bieuDo/bieuDoNam";
export default {
  components: {
    bieuDoDuong,
    bieuDoThang,
    bieuDoNam,
  },
  data() {
    return {
      posts: [],
      errors: [],
      getData: [],
      salon_id: "",
      listStore: {},
      storage: {
        product: {},
        service: {},
      },
      card: {
        card_money: [],
        card_ratio: {},
        card_turn: {},
      },
      marketing_manager: {},
      salon: {},
      sales_analysis: {},
    };
  },
  created() {
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
    });
  },
  beforeMount() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      HTTP.get(
        `/salon/main/manage/managerSalon?salon_id=${this.salon_id}&type=1`
      )
        .then((res) => {
          let result = res.data.data;
          this.storage.product = result.storage.products;
          this.storage.service = result.storage.services;

          this.card.card_money = result.card.card_money;
          this.card.card_ratio = result.card.card_ratio;
          this.card.card_turn = result.card.card_turn;

          this.marketing_manager = result.marketing_manager;

          this.salon = result.salon;

          this.sales_analysis = result.sales_analysis;

          let dataLine = result.sales_analysis;
          this.getData.push(dataLine[0].total);
          this.getData.push(dataLine[1].total);
          this.getData.push(dataLine[2].total);
          this.getData.push(dataLine[3].total);
          this.getData.push(dataLine[4].total);
          this.getData.push(dataLine[5].total);
          this.getData.push(dataLine[6].total);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    onChange() {
      this.getDetail();
    },
    format(value) {
      if(value == null) {
        return 0;
      } else return value;
    },
    formatPrice,formatNumberAccount,
  },
};
</script>
<style scoped>
.bg-cart-yellow {
  background-image: url("../../../assets/image/Card5.png");
  background-size: cover;
  height: 100%;
  position: relative;
}
.bg-cart-red {
  background-image: url("../../../assets/image/Card4.png");
  background-size: cover;
  height: 100%;
  position: relative;
}
.bg-cart-blue {
  background-image: url("../../../assets/image/cardBlue.png");
  background-size: cover;
  height: 100%;
  position: relative;
}
.info {
  transform: translate(0%, 150%);
  text-align: center;
  font-size: 14px;
  color: white;
  font-weight: bold;
}

.card {
  border: none !important;
}

.icon {
  position: absolute;
  right: -10px;
  top: 58%;
}

.text {
  font-size: 16px;
  line-height: 22px;
  color: #4f4f4f;
}

a:hover {
  text-decoration: none;
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

li span {
  display: block;
  color: #d4476f;
  text-align: center;
  padding: 0 1em;
  text-decoration: none;
  cursor: pointer;
}

::placeholder {
  color: #d4476f;
}

.card-body span,
.bgWhite span {
  font-size: 14px;
  cursor: pointer;
}

.input {
  border: 1px solid #d4476f !important;
  box-sizing: border-box;
  border-radius: 8px;
  outline: none;
  padding: 5px 10px;
}

table th,
td {
  font-size: 14px;
}

.active {
  background-color: rgba(212, 71, 111, 0.1);
  border-bottom: 2px solid #d4476f;
}

.active1 {
  background-color: rgba(212, 71, 111, 0.1);
  border-right: 2px solid #d4476f;
  border-top-left-radius: 16px;
  padding: 0.6rem;
}

.active1 span {
  color: #d4476f;
}

.card-body h6:hover {
  background-color: rgba(212, 71, 111, 0.1);
}

.card-body {
  padding: 0 !important;
}

h6 {
  margin-bottom: 0;
}

p {
  font-size: 14px;
}

.border-main {
  border: 1px solid #d4476f;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.56);
}

#myDIV {
  background-color: rgba(255, 255, 255, 0.4);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.bgWhite {
  background-color: rgba(255, 255, 255, 0.56);
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  padding: 20px 0px;
  line-height: 5px;
}

.bgWhite1 {
  background-color: rgba(255, 255, 255, 0.56);
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  padding: 10px 5px;
}

.bgWhite1 p {
  margin: 0.3rem;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #289e49;
  background-color: white;
  border-bottom: 5px solid #289e49;
}

.nav-pills .nav-link {
  border-radius: 0px;
}

#pills-tab li {
  width: 33.33%;
  text-align: center;
}
.tab-pills .active {
  border: none;
  background: none;
}
.text-gradient-blue {
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(
    177.23deg,
    #9c2cf3 -13.49%,
    #6c3af6 46.85%,
    #3b48f9 109.74%,
    #3a49f9 109.75%
  );

  -webkit-text-fill-color: transparent;
  color: #464646;
  display: inline-block;
  padding: 0;
  margin: 0;
  font-family: Nunito;
  font-weight: 700;
}
.text-gradient-red {
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(
    96.59deg,
    #ec4887 -5.46%,
    #bc1896 27.49%,
    #b81498 30.24%,
    #a5009e 43.97%,
    #a5009e 43.98%,
    #a5009e 96.7%
  );
  -webkit-text-fill-color: transparent;
  color: #464646;
  display: inline-block;
  padding: 0;
  margin: 0;
  font-family: Nunito;
  font-weight: 700;
}
.text-gradient-yellow {
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(
    96.98deg,
    #ffb31d 0%,
    #ff8f22 42.71%,
    #ff6028 100%
  );

  -webkit-text-fill-color: transparent;
  color: #464646;
  display: inline-block;
  padding: 0;
  margin: 0;
  font-family: Nunito;
  font-weight: 700;
}
@media only screen and (max-width: 768px) {
  .bgWhite {
    padding: 5px 15px;
    line-height: 10px;
    margin-top: 5px;
  }
}
</style>
