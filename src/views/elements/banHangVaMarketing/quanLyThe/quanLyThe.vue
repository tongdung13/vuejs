<template>
  <div class="col-md-10 mb-5 res mt-3 font-14">
    <select
      name="salon_id"
      class="inputx mr-3 res-margin-0"
      style="width: 30%; outline: none"
      v-model="salon_id"
      @change="onChange()"
    >
      <option value="">Tất cả salon</option>

      <option v-for="salon in listStore" :key="salon.id" :value="salon.id">
        {{ salon.salon_name }}
      </option>
    </select>
    <router-link :to="{ name: 'themThe' }">
      <span class="inputx hover color-main mr-3">+ Thêm thẻ</span>
    </router-link>
    <!-- <div v-if="msg != ''" class="mt-3 font-weight-bold text-center">{{msg}}</div> -->
    <div class="mt-3">
      <h5 class="color-main">QUẢN LÝ THẺ</h5>
      <div class="col-lg-3 col-md-4 col-sm-7 col-7 pl-0">
        <select
          class="border1"
          style="width: 96%; outline: none; color: #828282;"
          v-model="typeId"
          @change="onChange()"
        >
          <option value="">TẤT CẢ THẺ</option>
          <option value="1">Thẻ tiền</option>
          <option value="2">thẻ giảm giá theo %</option>
          <option value="3">Thẻ lượt</option>
        </select>
      </div>
      <div class="row mt-3">
        <div class=" col-lg-4 col-md-4 col-sm-12 col-12 parent">
          <div v-if="msgCard != ''" class="bg1 p-3 text-center mt-3">
            <b>{{ msgCard }}</b>
          </div>
          <div v-else class="row child">
            <div
              class="col-md-12 col-sm-12 col-12"
              v-for="(card, index) in cards"
              :key="index"
            >
              <div @click="inputNguoiDung(card.id)">
                <div
                  @click="arrow = card.id"
                  :class="{ arrow: arrow == card.id }"
                  :style="{ backgroundColor: card.color }"
                  class="p-3 bgCard mt-3"
                >
                  <div class="row text-white">
                    <div class="col-md-8 col-sm-8 col-8">
                      <span>
                        {{ formatType(card.type) }} &#8226; {{ card.name_card }}
                      </span>
                      <h4 class="mt-2" style="font-size: 140% !important">
                        <span class="hidden-card">Giá trị: </span>
                        {{ formatPrice(card.price) }}
                      </h4>
                      <h6 class="hidden-card">
                        {{ "Giá mua: " + formatPrice(card.price_input) }}
                        <span style="font-size: 80%"></span>
                      </h6>
                    </div>
                    <div class="col-md-4 col-sm-4 col-4 text-right">
                      <img
                        src="../../../../assets/image/Group13572.png"
                        alt=""
                        class="bg-8 p-2 pr-3 pl-3"
                      />
                    </div>
                  </div>
                  <div>
                    <span v-if="card.vip == 1" class="text-white">VIP</span>
                    <span v-else class="text-white">Thẻ thường</span>
                    <div class="text-white">
                      {{
                        "Số lượng: " + card.totalUser + "/" + card.amount + " "
                      }}
                      &#8226;
                      {{ " Lượt dùng: " + card.turn }}
                    </div>
                  </div>
                  <div class="row text-white mb-2" style="margin-top: 1rem">
                    <div class="col-md-7 col-sm-8 col-8">
                      <div>{{ card.code }}</div>
                    </div>
                    <div class="col-md-5 col-sm-4 col-4 pl-0">
                      <div class="text-right">
                        {{ "HSD: " + formatDate(card.end_at) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8 col-md-8 col-sm-12 col-12 margin-top-5">
          <div>
            <div @click="changeClick" class="bg1 p-3 mt-3">
              <div class="row">
                <div class="col-md-6 col-sm-6 col-6">
                  <h6>
                    <span class="color-main">
                      DANH SÁCH KHÁCH HÀNG DÙNG THẺ
                    </span>
                  </h6>
                </div>
                <div class="col-md-6 col-sm-6 col-6">
                  <span class="dropdown" style="float: right; margin-top: -6px">
                    <span class="dropbtn">
                      <img
                        src="../../../../assets/image/more-horizontal.png"
                        alt=""
                        style="width: 31px; padding: 5px !important"
                        class="border1"
                      />
                    </span>
                    <div class="dropdown-content text-right">
                      <router-link
                        :to="{
                          name: 'themNguoiDung',
                          params: { themId: nguoiDungId },
                        }"
                      >
                        Thêm người dùng
                      </router-link>

                      <router-link
                        :to="{
                          name: 'capNhatThe',
                          params: { theId: nguoiDungId },
                        }"
                      >
                        Cập nhật thẻ
                      </router-link>
                      <a @click="deleteCard()"> <span>Xoá thẻ</span></a>
                    </div>
                  </span>
                </div>
              </div>
              <div class="mt-3">
                <input
                  type="text"
                  placeholder="Tìm kiếm khách hàng"
                  style="width: 25%; padding: 4px 10px"
                  v-model="search"
                />
              </div>
              <div v-if="msgCard != ''" class="text-center mt-3">
                <b>{{ msgCard }}</b>
              </div>
              <div v-else>
                <loadingData v-if="loading"></loadingData>
                <div v-if="hasData">
                  <div v-if="msg == ''" class="mt-3">
                    <table class="table table-borderless">
                      <thead>
                        <tr>
                          <th scope="col">ID người dùng</th>
                          <th scope="col">Tên người dùng</th>
                          <th scope="col">Số điện thoại</th>
                          <th scope="col">Giới tính</th>
                          <th scope="col">Lượt sử dụng</th>
                          <th scope="col">Số tiền</th>
                          <th>Ngày tạo</th>
                          <th class="text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(customer, index) in filterCustomer"
                          :key="index"
                        >
                          <td class="font-weight-bold">
                            {{ "#" + customer.user_id }}
                          </td>
                          <td>{{ customer.name }}</td>
                          <td>{{ customer.phone }}</td>
                          <td>{{ formatSex(customer.sex) }}</td>
                          <td class="color-main font-weight-bold">
                            {{ customer.use + " lượt" }}
                          </td>
                          <td class="color-main font-weight-bold">
                            {{ formatPrice(customer.money) }}
                          </td>
                          <td>
                            {{ formatDate(customer.created_at) }}
                          </td>
                          <td
                            class="text-right text-danger"
                            style="cursor: pointer"
                          >
                            <span @click="deleteCustomer(customer.id)">
                              Xoá
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div v-else class="mt-3 text-center">
                    <b>{{ msg }}</b>
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
                    >
                      {{ index + 1 }}
                    </span>
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
                    <span
                      class="page-link"
                      @click="changePage(paginate.totalPage)"
                    >
                      Cuối
                    </span>
                  </li>
                </ul>
              </div>
              <!-- ============ -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP, formatDate, formatPrice } from "@/main";
import loadingData from "@/components/loadingData";
export default {
  name: "quanLyThe",
  components: {
    loadingData,
  },
  data: function() {
    return {
      arrow: "",
      cards: {},
      loading: true,
      hasData: false,
      nguoiDungId: 1,
      listCustomerCard: [],
      search: "",
      msg: "",
      msgCard: "",
      typeId: "",
      salon_id: "",
      paginate: {
        currentPage: 1,
        totalPage: 1,
      },
      notification: {
        status: false,
        message: "",
      },
      listStore: {},
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
    this.listcards();
  },
  methods: {
    changePage(index) {
      this.paginate.currentPage = index;
      this.listCustomerCards();
    },
    onChange() {
      this.listcards();
    },
    inputNguoiDung(index) {
      this.loading = true;
      this.hasData = false;
      this.nguoiDungId = index;
      this.paginate.currentPage = 1;
      this.msg = "";
      this.listCustomerCards();
    },
    listcards() {
      this.loading = true;
      this.hasData = false;
      HTTP.get(
        `/salon/main/manage/card?type=${this.typeId}&salon_id=${this.salon_id}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          if (result.data.length > 0) {
            this.cards = result.data;
            this.nguoiDungId = this.cards[0].id;
            this.listCustomerCards();
          } else this.msgCard = "Chưa có thẻ!!!";
        }
      });
    },

    // Danh sách khách hàng dùng thẻ
    listCustomerCards() {
      if (!isNaN(this.nguoiDungId) == true) {
        let page = this.paginate.currentPage;
        HTTP.get(
          `/salon/main/manage/card/${this.nguoiDungId}/customer?page=${page}`
        )
          .then((res) => {
            let result = res.data;
            if (result.status === 1) {
              let data = result.data;
              if (data.data.length > 0) {
                this.hasData = true;
                this.loading = false;
                this.listCustomerCard = data.data;
                this.paginate.currentPage = data.current_page;
                this.paginate.totalPage = data.last_page;
              } else {
                this.hasData = true;
                this.loading = false;
                this.msg = "Chưa có người dùng!!!";
              }
            } else {
              this.notification.status = true;
              this.notification.message = result.message;
            }
          })
          .catch((e) => {
            this.errors.push(e);
          });
      }
    },
    // ==================

    // Xoá người dùng thẻ
    deleteCustomer(index) {
      this.$swal({
        title: "Xoá người dùng?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          let customerId = index;
          HTTP.delete(
            `/salon/main/manage/card/${this.nguoiDungId}/customer/${customerId}/delete`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              // this.loading = false;
              // this.hasData = true;
              this.$swal("Đã xoá!", result.message, "success");
              this.listCustomerCards();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    // ======================

    // Định dạng giới tính
    formatSex(index) {
      if (index === 1) {
        return (index = "nam");
      } else return (index = "nữ");
    },
    // ĐỊnh dạng kiểu thẻ
    formatType(value) {
      if (value == 1) {
        return (value = "Thẻ tiền");
      } else if (value == 2) {
        return (value = "Thẻ giảm %");
      } else return (value = "Thẻ lượt");
    },
    // ===================

    // Xoá thẻ
    deleteCard() {
      this.$swal({
        title: "Xoá thẻ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xoá!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete(
            `/salon/main/manage/card/${this.nguoiDungId}/delete`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              // this.loading = false;
              // this.hasData = true;
              this.$swal("Đã xoá!", result.message, "success");
              this.listcards();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    // ========
    // Lọc theo SalonId
    onChange() {
      this.listcards();
    },
    // ===============
    formatPrice,
    formatDate,
  },
  computed: {
    // TÌm kiếm
    filterCustomer() {
      return this.listCustomerCard.filter((item) => {
        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
  },
};
</script>
<style scope>
.font-14 {
  font-size: 14px;
}
.border1 {
  border: 1px solid #d4476f;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 5px 10px;
  outline: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.56);
  cursor: pointer;
}
.bg1 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}

p {
  margin: 5px !important;
}
.bgCard {
  background: linear-gradient(
    261.33deg,
    rgba(255, 153, 0, 0.72) 4.78%,
    rgba(255, 255, 255, 0.14) 102.38%
  );
  border-radius: 16px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 5px 10px;
  height: 100%;
  position: relative;
}
/* .bgCard::after {
  background-image: url("../../../../assets/image/bgcard.png");
  content: "";
  opacity: 0.35;
  top: 0;
  left: -5px;
  position: absolute;
  z-index: 100;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 23px;
  width: 102%;
  height: 100%;
} */
.arrow {
  position: relative;
  -webkit-border-radius: 16px;
  -moz-border-radius: 16px;
  border-radius: 16px;
}
.arrow::before {
  content: "";
  position: absolute;
  top: 41%;
  right: -30px;
  z-index: 1;
  border: solid 15px transparent;
  border-left-color: #d4476f;
}
.bgRed {
  background-image: url(../../../../assets/image/Card4.png);
  border-radius: 16px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 5px 10px;
  height: 100%;
}
.bgBlue {
  background-image: url(../../../../assets/image/cart6.png);
  border-radius: 16px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 5px 10px;
  height: 100%;
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

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.page-item {
  z-index: 1;
}
.scrollCard {
  overflow-y: scroll;
  max-height: 100vh;
  overflow-x: hidden;
}
.parent {
  max-height: 100vh;
  overflow: hidden;
}
.child {
  max-height: 80vh;
  margin-right: -36px;
  padding-right: 17px;
  overflow-y: scroll;
}
@media only screen and (max-width: 768px) {
  .margin-top-5 .dropdown .dropbtn img {
    width: 26px !important;
  }
}
@media only screen and (max-width: 1500px) {
  .hidden-card {
    display: none;
  }
}
</style>
