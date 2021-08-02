<template>
  <div class="col-md-10 res mb-5 mt-3 res-0">
    <div v-if="noti.msg != ''">
      <div class="text-center mt-4">
        <b>{{ noti.msg }}</b>
      </div>
    </div>
    <div v-else>
      <div style="font-size: 120%" class="font-weight-bold mt-3 color-main">
        THÔNG TIN SẢN PHẨM
      </div>
      <div class="mt-3">
        <table class="table table-hover">
          <thead>
            <tr style="height: 100px;">
              <td style="width: 15%;"><b>Ảnh sản phẩm:</b></td>
              <td colspan="3">
                <div class="row">
                  <div
                    class="col-3 mt-2 text-center"
                    v-for="(item, index) in detail.images"
                    :key="index"
                  >
                    <img
                      :src="item.image"
                      alt="photo"
                      style="width: 150px; height: 150px; border-radius: 8px; object-fit: cover;"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Tên sản phẩm</b></td>
              <td style="width: 35%" class="font-weight-bold color-main">
                {{ detail.name }}
              </td>
              <td style="width: 15%"><b>Mã sản phẩm</b></td>
              <td style="width: 35%" class="font-weight-bold color-main">
                {{ detail.sku }}
              </td>
            </tr>

            <tr>
              <td style="width: 15%"><b>Danh mục</b></td>
              <td>{{ detail.categoryName }}</td>
              <td style="width: 15%"><b>Loại sản phẩm</b></td>
              <td>{{ detail.categoryChildrenName }}</td>
            </tr>

            <tr>
              <td style="width: 15%"><b>Lượt đánh giá</b></td>
              <td>{{ detail.reviews }} lượt</td>
              <td style="width: 15%"><b>Số lượng</b></td>
              <td>
                <span class="font-weight-bold"> {{ detail.amount }} </span>
                sản phẩm
              </td>
            </tr>

            <tr>
              <td style="width: 15%"><b>Giá bán</b></td>
              <td>
                <span
                  class="font-weight-bold color-main"
                  :class="{ decoration: detail.price_sale > 0 }"
                >
                  {{ formatPrice(detail.price) }}
                </span>
              </td>
              <td style="width: 15%"><b>Giá khuyến mại</b></td>
              <td>
                <span
                  class="font-weight-bold color-main"
                  v-if="detail.price_sale > 0"
                >
                  {{ formatPrice(detail.price_sale) }}
                </span>
                <span v-else>Chưa có khuyến mãi</span>
              </td>
            </tr>

            <tr>
              <td style="width: 15%"><b>Dung tích</b></td>
              <td>{{ detail.capacity }} milliliter</td>
              <td style="width: 15%"><b>Trọng lượng</b></td>
              <td>{{ detail.weight }} gram</td>
            </tr>

            <tr>
              <td style="width: 15%"><b>Nhãn hiệu</b></td>
              <td>{{ detail.trademarkName }}</td>
              <td style="width: 15%">
                <b>Các salon còn hàng:</b>
              </td>
              <td colspan="3">
                <span v-for="(salon, index) in detail.salons" :key="index">
                  {{ salon.salon_name }},
                </span>
                <span class="float-right mt-2"
                  ><router-link
                    :to="{
                      name: 'salonConHang',
                      params: { conHangId: detail.id },
                    }"
                    ><span class="borderx hover color-main"
                      >Chi tiết</span
                    ></router-link
                  ></span
                >
              </td>
            </tr>

            <tr>
              <td style="width: 15%"><b>Ngày tạo</b></td>
              <td>{{ formatDate(detail.created_at) }}</td>
              <td style="width: 15%"><b>Ngày cập nhật</b></td>
              <td>{{ formatDate(detail.updated_at) }}</td>
            </tr>
            <tr>
              <!-- <td style="width: 15%;"><b>Nhãn hiệu</b></td>
            <td>{{ detail.trademarkName }}</td> -->
              <td style="width: 15%"><b>Nhà sản xuất</b></td>
              <td>{{ detail.producerName }}</td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Mô tả</b></td>
              <td colspan="3">{{ detail.description }}</td>
            </tr>
          </thead>
        </table>
        <div class="mt-4 text-center pb-3">
          <span @click="backPage" class="borderx hover mr-3 color-main">
            Quay lại
          </span>
          <router-link
            :to="{
              name: 'danhGiaSanPham',
              params: { sanPhamId: detail.id },
            }"
          >
            <span class="borderx hover mr-3 color-main">
              DS đánh giá
            </span></router-link
          >
          <span
            @click="deleteProduct(detail.id)"
            class="borderx hover mr-3 color-main"
          >
            Xoá
          </span>
          <router-link
            :to="{
              name: 'capNhatSanPham',
              params: { sanPhamId: detail.id },
            }"
          >
            <span class="borderx hover mr-3 color-main">
              Cập nhật
            </span>
          </router-link>
          <router-link
            :to="{
              name: 'xuatKho',
              params: { xuatKhoId: detail.id },
            }"
          >
            <span class="borderx hover mr-3 color-main">
              Xuất kho
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/main";
import { formatPrice } from "@/main";
import { formatDate } from "@/main";
export default {
  name: "chiTietQuanLyKho",
  data() {
    return {
      detail: [],
      errors: [],
      updateProducts: [],
      noti: {
        status: "",
        msg: "",
      },

      salon_id: "",
    };
  },
  methods: {
    // Xoá Sản phẩm
    deleteProduct(productId) {
      this.$swal({
        title: "Xoá sản phẩm?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete(`/salon/main/manage/product/${productId}/delete`).then(
            (res) => {
              let result = res.data;
              if (result.status === 1) {
                this.$swal("Đã xoá!", result.message, "success");
                setTimeout(function() {
                  history.back();
                }, 1000);
              } else {
                this.$swal("", result.message, "error");
              }
            }
          );
        }
      });
    },
    backPage() {
      history.back();
    },
    // =================
    formatPrice,
    formatDate,
  },

  created() {
    let code = this.$route.params.khoId;
    HTTP.get(`/salon/main/manage/product/${code}/detail`)
      .then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.detail = res.data.data;
        } else {
          this.noti.msg = result.message;
        }
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
.decoration {
  text-decoration: line-through;
}
</style>
