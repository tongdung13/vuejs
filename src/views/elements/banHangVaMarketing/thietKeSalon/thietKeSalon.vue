<template>
  <div class="col-md-10 res mb-5 mt-2">
    <input
      type="text"
      class="inputx mr-3"
      placeholder="Tìm kiếm tên salon"
      v-model="salon_name"
      @change="reloadListSalon"
      style="width: 30%; outline: none"
    />
    <router-link :to="{ name: 'themSalon' }">
      <span class="inputx color-main mr-3">+ Thêm salon</span>
    </router-link>
    <!-- ==== -->
    <p class="color-main mt-4 font-weight-bold" style="font-size: 130%">
      Danh sách salon: {{ total + " salon" }}
    </p>
    <loadingData v-if="loading" class="bg p-2 text-center"></loadingData>
    <div v-if="hasData">
      <div v-if="msg != ''" class="bg p-3 text-center">
        <b>{{ msg }}</b>
      </div>
      <div
        v-else
        class="mt-3 row bg pb-2 m-0"
        v-for="(items, index) in posts"
        :key="index"
      >
        <div class="col-md-3 col-sm-3 col-3 p-0 text-center">
          <img
            :src="items.salon_cover_image"
            alt=""
            class="width-100 w-100"
            style="
              max-height: 160px;
              border-bottom-left-radius: 16px;
              border-top-left-radius: 16px;
              object-fit: cover;
            "
          />
        </div>
        <div class="col-md-9 col-sm-9 col-9 mt-3">
          <div class="row">
            <div class="col-md-8 col-sm-12 col-12 pr-0">
              <h6 class="m-0" style="font-size: 120%">
                {{ items.salon_name }}
              </h6>
              <span class="font-12">
                {{ items.salon_address }}
              </span>
            </div>
            <div class="col-md-4 col-sm-12 col-12 hidden">
              <div class="text-left">
                <!-- <div style="padding-left: 15%">{{ items.amount.star }} sao</div> -->
                <star-rating
                  :rating="items.amount.star"
                  :read-only="true"
                  :increment="0.01"
                  :show-rating="false"
                  :star-size="25"
                ></star-rating>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-3 col-sm-3 col-3 hidden">
              <div class="row">
                <div
                  class="mr-3 pl-3"
                  style="display: flex; align-items: center"
                >
                  <img
                    src="../../../../assets/image/stocks1.png"
                    alt=""
                    style="width: 23px"
                  />
                </div>
                <div class="font-12">
                  Kho hàng <br />
                  {{ formatNumber(items.amount.product) }}
                </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3 col-3 hidden pr-0">
              <div class="row">
                <div
                  class="mr-3 pl-3"
                  style="display: flex; align-items: center"
                >
                  <img
                    src="../../../../assets/image/scissor1.png"
                    alt=""
                    style="width: 23px"
                  />
                </div>
                <div class="font-12">
                  Dịch vụ<br />
                  {{ items.amount.service }}
                </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3 col-3 hidden pr-0">
              <div class="row">
                <div
                  class="mr-3 pl-3"
                  style="display: flex; align-items: center"
                >
                  <img
                    src="../../../../assets/image/view1.png"
                    alt=""
                    style="width: 23px"
                  />
                </div>
                <div class="font-12">
                  Lượt theo dõi<br />
                  {{ items.amount.follow }}
                </div>
              </div>
            </div>
            <div
              class="col-md-3 col-sm-12 col-12 margin-top-50 mt-1"
              style="
                display: flex;
                align-items: center;
                justify-content: flex-end;
              "
            >
              <router-link
                :to="{
                  name: 'chiTietThietKeSalon',
                  params: { salonId: items.id },
                }"
              >
                <span class="border-black font-12 hover color-main">
                  Xem chi tiết
                </span>
              </router-link>
            </div>
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
</template>
<script>
import { HTTP, formatNumber } from "@/main";
import loadingData from "@/components/loadingData";
import StarRating from "vue-star-rating";
export default {
  name: "thietKeSalon",
  components: {
    StarRating,
    loadingData,
  },
  data() {
    return {
      loading: true,
      hasData: false,
      posts: [],
      pages: "",
      errors: [],
      salon_name: "",
      msg: "",
      total: 0,
      paginate: {
        currentPage: 1,
        totalPage: 1,
      },
      notification: {
        message: "",
      },
    };
  },
  beforeMount() {
    this.listSalon();
  },
  methods: {
    // thay đổi trang
    changePage(index) {
      this.paginate.currentPage = index;
      this.listSalon();
    },
    // ==============

    // Danh sách các salon
    listSalon() {
      let page = this.paginate.currentPage;
      HTTP.get(
        `/salon/main/manage/branch?salon_name=${this.salon_name}&page=$${page}`
      )
        .then((res) => {
          // this.posts = res.data.data.data;

          let result = res.data;
          // console.log(result);
          if (result.status === 1) {
            let data = result.data;
            if (data.data.length > 0) {
              this.msg = "";
              this.hasData = true;
              this.loading = false;
              this.posts = data.data;
              this.total = data.total;
              this.paginate.currentPage = data.current_page;
              this.paginate.totalPage = data.last_page;
            } else {
              this.hasData = true;
              this.loading = false;
              this.total = 0;
              this.msg = "Chưa có salon!!";
            }
          } else {
            this.notification.message = result.message;
            this.$swal("", result.message, "warning");
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // ====================

    // Tìm kiếm theo tên salon
    reloadListSalon() {
      this.msg = "";
      this.loading = true;
      this.hasData = false;
      this.paginate.currentPage = 1;
      this.listSalon();
    },
    // ========================
    formatNumber,
  },
};
</script>

<style scoped>
* {
  font-size: 14px;
}

router-link:hover {
  text-decoration: none;
}

.bg {
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}

div.stars {
  display: inline-block;
}

input.star {
  display: none;
}

label.star {
  float: right;
  padding-left: 7px;
  font-size: 20px;
  color: #444;
  transition: all 0.2s;
}

input.star:checked ~ label.star:before {
  content: "\f005";
  color: #fd4;
  transition: all 0.25s;
}

.border-black {
  border: 1px solid #d4476f;
  border-radius: 4px;
  padding: 0.2rem 1rem;
}

option {
  padding: 0;
}

a {
  text-decoration: none;
}

label.star:before {
  content: "\f006";
  font-family: FontAwesome;
}

.input,
input {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 3px 10px;
  outline: none;
}
#rating {
  width: 25px;
  border: none;
  border-radius: 0;
  font-size: 40px;
  line-height: 40px;
  text-align: right;
  background-color: transparent;
  color: #fff;
  outline: none;
  padding: 10px;
}
#rating:focus {
  box-shadow: 0 0 0 2px #fff inset;
}
.star {
  stroke-width: 10px;
  stroke: rgb(19, 19, 18);
  display: inline-block;
  fill: transparent;
}
.star.filled {
  fill: yellow;
}
.star.gradient {
  fill: url(#grad);
}
.gradient-start {
  stop-color: yellow;
  stop-opacity: 1;
}
.gradient-end {
  stop-color: transparent;
  stop-opacity: 1;
}
@media only screen and (max-width: 768px) {
  .margin-top-50 {
    margin-top: -50px;
  }
}
</style>
