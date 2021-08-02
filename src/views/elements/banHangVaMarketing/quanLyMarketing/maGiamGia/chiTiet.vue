<template>
  <div class="col-md-10 res mb-5 mt-3 res-0">
    <div style="font-size: 120%" class="font-weight-bold mt-3 color-main">
      THÔNG TIN VOUCHER GIẢM GIÁ
    </div>
    <div class="table-responsive mt-3">
      <table class="table table-hover">
        <thead>
          <tr style="height: 100px">
            <td style="width: 15%"><b>Ảnh sản phẩm:</b></td>
            <td colspan="3">
              <div class="row" v-if="listImage.length > 0">
                <div
                  class="col-3 mt-2 text-center"
                  v-for="(image, index) in listImage"
                  :key="index"
                >
                  <img
                    :src="image"
                    alt="photo"
                    style="width: 150px; height: 150px"
                  />
                </div>
              </div>
              <div v-else>Voucher chưa có ảnh.</div>
            </td>
          </tr>
          <tr>
            <td style="width: 15%"><b>Tên voucher:</b></td>
            <td style="width: 35%">{{ detail.title }}</td>
            <td style="width: 15%"><b>Mã code:</b></td>
            <td style="width: 35%">{{ detail.code }}</td>
          </tr>

          <tr>
            <td style="width: 15%"><b>Tên salon:</b></td>
            <td style="width: 35%">
              <span v-if="salon && salon.salon_name != null">{{
                salon.salon_name
              }}</span>
            </td>
            <td style="width: 15%"><b>Tên sản phẩm:</b></td>
            <td style="width: 35%">
              <span v-for="product in detail.products" :key="product.id">
                <span v-if="product.categories == 1">{{ product.name }},</span>
                <span v-else>{{ product.title }},</span>
              </span>
            </td>
          </tr>

          <tr>
            <td style="width: 15%"><b>Ngày bắt đầu</b></td>
            <td>{{ formatDate(detail.start_date) }}</td>
            <td style="width: 15%"><b>Ngày kết thúc</b></td>
            <td>{{ formatDate(detail.end_date) }}</td>
          </tr>

          <tr>
            <td style="width: 15%"><b>Loại mức giảm:</b></td>
            <td style="width: 35%" v-if="detail.type_discount != 1">
              Phần trăm
            </td>
            <td style="width: 35%" v-else-if="detail.type_discount == 1">
              Số tiền
            </td>
            <td style="width: 15%"><b>Mức giảm:</b></td>
            <td style="width: 35%" v-if="detail.type_discount != 1">
              {{ detail.discount }}%
            </td>
            <td style="width: 35%" v-else-if="detail.type_discount == 1">
              {{ formatPrice(detail.discount) }}
            </td>
          </tr>

          <tr>
            <td style="width: 15%"><b>Giá trị đơn tối thiểu:</b></td>
            <td style="width: 35%">{{ formatPrice(detail.min_order) }}</td>

            <td style="width: 15%"><b>Số lượng mã:</b></td>
            <td style="width: 35%">{{ detail.amount }}</td>
          </tr>
        </thead>
      </table>
      <div class="mt-4 text-center pb-3">
        <span @click="backPage" class="borderx hover mr-3 color-main"
          >Quay lại</span
        >

        <span
          @click="deleteDiscount(detail.id)"
          class="borderx hover mr-3 color-main"
          >Xoá</span
        >
        <router-link
          :to="{
            name: 'capNhatMaGiamGia',
            params: { idDiscount: detail.id },
          }"
        >
          <span class="borderx hover mr-3 color-main"
            >Cập nhật</span
          ></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/main";
import { formatPrice } from "@/main";
import { formatDate } from "@/main";

export default {
  name: "chiTietMaGiamGia",
  data() {
    return {
      detail: [],
      idDiscount: "",
      product: "",
      salon: "",
      listImage: [],
    };
  },
  methods: {
    // Xoá chương trình
    deleteDiscount(idDiscount) {
      this.$swal({
        title: "Xoá Voucher giảm giá?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete(
            `/salon/main/manage/marketing/2/${idDiscount}/delete`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.$swal("Đã xoá!", result.message, "success");
              setTimeout(function () {
                history.back();
              }, 1000);
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    getSalon(salon_id) {
      HTTP.get(`/salon/main/manage/branch/${salon_id}/detail`)
        .then((response) => {
          if (response.data.status == 1) {
            this.salon = response.data.data;
            // console.log(this.salon);
          }
        })
        .catch((e) => {
          // this.errors.push(e);
        });
    },
    formatDate,
    formatPrice,

    backPage() {
      history.back();
    },
  },

  created() {
    this.idDiscount = window.location.href.slice(
      window.location.href.indexOf("/chi-tiet/") + 10,
      window.location.href.length
    );

    HTTP.get(`/salon/main/manage/marketing/2/${this.idDiscount}`)
      .then((response) => {
        if (response.data.status == 1) {
          this.detail = response.data.data;
          console.log(this.detail);
          this.getSalon(this.detail.salon_id);
          for (let index = 0; index < this.detail.products.length; index++) {
            this.listImage[index] =
              this.detail["products"][index].listImage[0].link_image_small;
            this.detail.type_product = this.detail.products[index].categories;
            if (this.detail.type_product == 1)
              this.getProduct(this.detail.products[index].id);
          }
        }
      })
      .catch((e) => {
        // this.errors.push(e);
      });
  },
  formatPrice,
  formatDate,
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
