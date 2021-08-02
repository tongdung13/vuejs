<template>
  <div class="col-md-10 res mb-5 mt-3">
    <i
      class="fas fa-search color-main"
      style="position: absolute; top: 9px; right: 37px"
    ></i>
    <div class="mt-4">
      <div style="margin-left: 0px">
        <h5 class="color-main font-weight-bold" style="font-size: 16px">
          DANH SÁCH ĐÁNH GIÁ SẢN PHẨM
        </h5>
      </div>
      <div class="mt-3" style="margin-left: 0px">
        <div class="res width-100 margin-top-5">
          <div class="bg p-3">
            <h6 class="float-left" style="margin-top: 10px; font-size: 17px">
              DANH SÁCH ĐÁNH GIÁ
            </h6>

            <span
              @click="backPage"
              class="borderx mr-2 mb-3 color-main float-right"
              >Quay lại</span
            >
            <div style="clear: both">
              <div v-if="msg == ''" class="table-responsive">
                <table class="table table-hover text-center">
                  <thead>
                    <tr>
                      <th>Họ và Tên</th>
                      <th style="width: 35%">Nội dung</th>
                      <th>Đánh giá</th>
                      <th>Ngày tạo</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(review, index) in reviewsProduct" :key="index">
                      <td>
                        <img
                          :src="review.user.avatar"
                          alt=""
                          style="width: 25px"
                        />
                        {{ review.user.name }}
                      </td>
                      <td class="text-justify">{{ review.content }}</td>
                      <td class="text-center">
                        {{ review.star }} sao
                        <div>
                          <star-rating
                            :rating="review.star"
                            :read-only="true"
                            :increment="0.01"
                            :show-rating="false"
                            :star-size="20"
                          ></star-rating>
                        </div>
                      </td>
                      <td>{{ formatDate(review.created_at) }}</td>
                      <td class="text-center">{{ review.status }}</td>
                      <td>
                        <span
                          @click="deleteReviewProduct(review.id)"
                          class="color-main hover bg-8 p-1 pr-3 pl-3"
                          style="cursor: pointer"
                          >Xoá đánh giá</span
                        ><br />
                        <div class="mt-3"></div>
                        <span
                          @click="changeStatus(review.id)"
                          class="color-main hover bg-8 p-1 pr-3 pl-3 mt-3"
                          style="cursor: pointer"
                          >Đổi trạng thái</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <b>{{ msg }}</b>
              </div>
            </div>
            <!-- phân trang -->
            <div class="mt-3">
              <ul class="pagination justify-content-end">
                <li
                  class="page-item"
                  style="cursor: pointer"
                  :class="{ disabled: paginate.currentPage === 1 }"
                >
                  <span
                    class="page-link"
                    @click="changePage(paginate.currentPage - 1)"
                    >Trước</span
                  >
                </li>

                <li
                  class="page-item"
                  v-for="(page, index) in paginate.totalPage"
                  :key="index"
                  :class="{ active: paginate.currentPage === page }"
                  style="cursor: pointer"
                >
                  <span class="page-link" @click="changePage(index + 1)">{{
                    index + 1
                  }}</span>
                </li>

                <li
                  class="page-item"
                  style="cursor: pointer"
                  :class="{
                    disabled: paginate.currentPage === paginate.totalPage,
                  }"
                >
                  <span
                    class="page-link"
                    @click="changePage(paginate.currentPage + 1)"
                    >Sau</span
                  >
                </li>
              </ul>
            </div>
            <!-- ============ -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatDate } from "@/main";
import StarRating from "vue-star-rating";
export default {
  name: "danhGiaSanPham",
  components: {
    StarRating,
  },
  data() {
    return {
      reviewsProduct: [],
      msg: "",
      max: 5,
      id: "",
      paginate: {
        currentPage: 1,
        totalPage: 1,
      },
    };
  },
  beforeMount() {
    this.listReviewsProduct();
  },
  methods: {
    changePage(index) {
      this.paginate.currentPage = index;
      this.listReviewsProduct();
    },
    // danh sách đánh giá sản phẩm
    listReviewsProduct() {
      let reviewId = window.location.href.slice(
        window.location.href.indexOf("/danh-gia-san-pham/") + 19,
        window.location.href.length
      );
      this.id = reviewId;
      let page = this.paginate.currentPage;
      HTTP.get(`/salon/main/manage/product/${reviewId}/reviews?page=` + page)
        .then((res) => {
          let result = res.data;
          console.log(result);
          if (result.status === 1) {
            let data = result.data;
            if (data.data.length > 0) {
              this.hasData = true;
              this.reviewsProduct = data.data;
              this.paginate.currentPage = data.current_page;
              this.paginate.totalPage = data.last_page;
            } else {
              this.msg = "Chưa có đánh giá";
            }
          } else {
            this.notification.status = true;
            this.notification.message = result.message;
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    backPage() {
      history.back();
    },
    // ==========================

    // Thay đổi trạng thái đánh giá
    changeStatus(index) {
      let brandID = window.location.href.slice(
        window.location.href.indexOf("/danh-gia-san-pham/") + 19,
        window.location.href.length
      );
      let reviewId = index;
      HTTP.get(
        `/salon/main/manage/product/${brandID}/reviews/${reviewId}/status`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.listReviewsProduct();
        }
      });
    },
    // ===================
    // Xoá đánh giá sản phẩm
    deleteReviewProduct(index) {
      this.$swal({
        title: "Xoá đánh giá?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          let brandID = window.location.href.slice(
            window.location.href.indexOf("/danh-gia-san-pham/") + 19,
            window.location.href.length
          );
          let reviewId = index;
          HTTP.delete(
            `/salon/main/manage/product/${brandID}/reviews/${reviewId}/delete`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.listReviewsProduct();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    // ================

    // Định dạng ngày
    formatDate,
    // ===========================
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
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
table td {
  vertical-align: middle;
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
  font-size: 12px;
}

li a:hover {
  color: #d4476f;
  text-decoration: none;
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
  stroke: yellow;
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
</style>
