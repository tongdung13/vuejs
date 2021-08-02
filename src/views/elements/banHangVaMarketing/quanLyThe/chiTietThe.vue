<template>
  <div class="col-md-10 res mb-5 mt-3 res-0">
    <div style="font-size: 120%" class="font-weight-bold mt-3 color-main">
      THÔNG TIN THẺ
    </div>
    <div class="table-responsive mt-3">
      <table class="table table-hover">
        <thead>
          <tr>
            <td style="width: 15%"><b>Mã thẻ</b></td>
            <!-- <td>{{ cards.code }}</td> -->
            <td style="width: 15%"><b>Màu thẻ</b></td>
            <!-- <td>{{ cards.color }}</td> -->
          </tr>
          <tr>
            <td style="width: 15%"><b>Giá</b></td>
            <!-- <td>{{ cards.price }}</td> -->
            <td style="width: 15%"><b>Tỷ lệ</b></td>
            <!-- <td>{{ cards.ratio }}</td> -->
          </tr>
          <tr>
            <td style="width: 15%"><b>Số lượng</b></td>
            <!-- <td>{{ cards.amount }} lượt</td> -->
            <td style="width: 15%"><b>Ngày tạo</b></td>
            <!-- <td>{{ formatDate(cards.created_at) }}</td> -->
          </tr>
          <tr>
            <td style="width: 15%"><b>Giá bán</b></td>
            <!-- <td>{{ formatPrice(detail.price_sale) }}</td> -->
            <td style="width: 15%"><b>Số lượng</b></td>
            <!-- <td>{{ detail.amount }} sản phẩm</td> -->
          </tr>
        </thead>
      </table>
      <!-- <div class="mt-4 text-center pb-3">
        <span @click="backPage" class="borderx hover mr-3 color-main"
          >Quay lại</span
        >
        <router-link
          :to="{
            name: 'danhGiaSanPham',
            params: { sanPhamId: detail.id }
          }"
        >
          <span class="borderx hover mr-3 color-main"
            >Danh sách đánh giá</span
          ></router-link
        >
        <span
          @click="deleteProduct(detail.id)"
          class="borderx hover mr-3 color-main"
          >Xoá sản phẩm</span
        >
        <router-link
          :to="{
            name: 'capNhatSanPham',
            params: { sanPhamId: detail.id }
          }"
        >
          <span class="borderx hover mr-3 color-main"
            >Cập nhật sản phẩm</span
          ></router-link
        >
      </div> -->
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/main";
import { formatPrice } from "@/main";
import { formatDate } from "@/main";
export default {
  name: "chiTietThe",
  data() {
    return {
      cards: {},
    };
  },
  beforeMount() {
    this.detailCard();
  },
  methods: {
    detailCard() {
      HTTP.get(`/salon/main/manage/card`)
        .then((response) => {
          // this.posts = response.data.data.data;
          this.cards = response.data.data;
          console.log(this.cards);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    backPage() {
      history.back();
    },
    // =================
    formatPrice,
    formatDate,
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
</style>
