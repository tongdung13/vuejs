<template>
  <div class="col-md-10 res mb-5 mt-3">
    <div class="mt-4">
      <h5 class="color-main font-weight-bold" style="font-size: 16px">
        DANH SÁCH ĐÁNH GIÁ SALON: {{ posts }}
      </h5>
      <div class="mt-3" style="margin-left: 0px">
        <div class="res width-100 margin-top-5">
          <div class="bg p-3">
            <h6 class="float-left" style="margin-top: 10px; font-size: 17px">
              DANH SÁCH ĐÁNH GIÁ
            </h6>

            <router-link
              :to="{
                name: 'chiTietThietKeSalon',
                params: { salonId: postsId.id },
              }"
            >
              <span class="borderx mr-2 mb-3 color-main float-right"
                >Quay lại</span
              >
            </router-link>
            <div style="clear: both">
              <div v-if="msg == ''" class="table-responsive">
                <table class="table table-hover text-center">
                  <thead>
                    <tr>
                      <th>Họ và Tên</th>
                      <th style="width: 35%">Nội dung</th>
                      <th class="text-center">Đánh giá</th>
                      <th>Ngày tạo</th>
                      <th>Trạng thái</th>
                      <th class="text-center" style="width: 15%">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(review, index) in reviews" :key="index">
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
                      <td>{{ review.status }}</td>
                      <td class="text-center">
                        <button
                          @click="deleteReview(review.id)"
                          class="color-main hover bg-8 p-1 pr-3 pl-3"
                          style="cursor: pointer; outline: none; border: none"
                        >
                          Xoá đánh giá
                        </button>
                        <button
                          @click="changeStatusReview(review.id)"
                          class="color-main hover bg-8 p-1 mt-3 pr-3 pl-3"
                          style="cursor: pointer; outline: none; border: none"
                        >
                          Đổi trạng thái
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else class="text-center">
                <b style="font-size: 130%">{{ msg }}</b>
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
  name: "danhSachNhanVien",
  components: {
    StarRating,
  },
  data() {
    return {
      reviews: [],
      msg: "",
      posts: [],
      postsId: "",
      max: 5,
      paginate: {
        currentPage: 1,
        totalPage: 1,
      },
      brandID: "",
    };
  },
  beforeMount() {
    this.listReviews();
  },
  methods: {
    changePage(index) {
      this.paginate.currentPage = index;
      this.listReviews();
    },
    // danh sách đánh giá
    listReviews() {
      let page = this.paginate.currentPage;
      HTTP.get(`/salon/main/manage/branch/${this.brandID}/reviews?page=` + page)
        .then((res) => {
          let result = res.data;
          if (result.status === 1) {
            let data = result.data;
            if (data.data.length > 0) {
              this.reviews = data.data;
              this.paginate.currentPage = data.current_page;
              this.paginate.totalPage = data.last_page;
            } else {
              this.msg = "Chưa có đánh giá";
            }
          } else {
            this.notification.status = true;
            this.notification.message = result.message;
          }
          this.loading = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      HTTP.get(`/salon/main/manage/branch/${this.brandID}/detail`)

        .then((response) => {
          this.posts = response.data.data.salon_name.toUpperCase();
          this.postsId = response.data.data;
          // this.detail = this.posts.amount;
          // this.date123 = this.posts.created_at;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // ==================

    // Xoá đánh giá chi nhánh
    deleteReview(index) {
      this.$swal({
        title: "Xoá đánh giá chi nhánh?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          let reviewId = index;
          HTTP.delete(
            `/salon/main/manage/branch/${this.brandID}/reviews/${reviewId}/delete`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.$swal("Đã xoá!", result.message, "success");
              this.listReviews();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    // =====================

    // Thay đổi trạng thái đánh giá
    changeStatusReview(index) {
      HTTP.get(
        `/salon/main/manage/branch/${this.brandID}/reviews/${index}/status`
      )

        .then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.listReviews();
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // =============================

    // Định dạng ngày
    formatDate,
    // ===========================
  },
  created() {
    this.brandID = window.location.href.slice(
      window.location.href.indexOf("/danh-gia-salon/") + 16,
      window.location.href.length
    );
    HTTP.get(`/salon/main/manage/branch/${this.brandID}/reviews?page=1`)
      .then((res) => {
        this.reviews = res.data.data.data;
        // this.config.rating = this.listReviews[1].star;
        // console.log(this.listReviews);
        if (this.reviews.length == 0) {
          this.msg = "Chưa có đánh giá";
        } else return this.reviews;
      })
      .catch((e) => {
        this.errors.push(e);
      });
    HTTP.get(`/salon/main/manage/branch/${this.brandID}/detail`)

      .then((response) => {
        this.posts = response.data.data.salon_name.toUpperCase();
        this.postsId = response.data.data;
        // this.detail = this.posts.amount;
        // this.date123 = this.posts.created_at;
      })
      .catch((e) => {
        this.errors.push(e);
      });
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
