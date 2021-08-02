<template>
  <div class="col-md-10 res mt-3">
    <!--===== Chọn salon =======-->
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
    <router-link
      :to="{
        name: 'themMaGiamGia',
      }"
    >
      <span class="inputx color-main mr-3">+ Thêm khuyến mãi</span>
    </router-link>
    <!-- ================= -->

    <!-- Phần Bảng khuyến mại tại salon -->
    <div class="mt-3">
      <div class="bg-16 p-3">
        <h6 class="color-main font-weight-bold">KHUYẾN MÃI TẠI SALON</h6>
        <loadingData v-if="loading"></loadingData>
        <div v-else class="bg5 mt-3 font-14 table-responsive">
          <table
            class="w-100 table-borderless text-center table-hover table-striped"
          >
            <thead>
              <tr class="border-table">
                <th>Mã giảm</th>
                <th>Tên mã giảm</th>
                <th>Loại mã</th>
                <th>Giảm/Tặng</th>
                <th>Số lượng</th>
                <th style="width: 10%">
                  Đã dùng
                </th>
                <th>Trạng thái/Thời gian</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody v-if="listDiscount.length > 0">
              <tr v-for="(discount, index) in listDiscount" :key="index">
                <td>{{ discount.type_voucher }}</td>

                <td>
                  {{ discount.title }} <br />Code: <b> {{ discount.code }} </b>
                </td>

                <td>
                  {{ discount.type_discount }}
                </td>

                <td v-if="discount.type_discount == 'Giảm giá tiền'">
                  {{ formatPrice(discount.discount) }}
                </td>
                <td v-else-if="discount.type_discount == 'Giảm phần trăm'">
                  {{ discount.discount }} %
                </td>
                <td v-else>
                  {{ discount.product_bonus_name }}
                </td>

                <td>{{ discount.amount }}</td>

                <td>{{ discount.used }}</td>

                <td>
                  <span class="color-main">{{ discount.status }} </span> <br />
                  <span>
                    {{ formatDate(discount.start_date) }} -
                    {{ formatDate(discount.end_date) }}
                  </span>
                </td>

                <td>
                  <span>
                    <router-link
                      :to="{
                        name: 'chiTietChuongTrinh',
                        params: { idProgram: discount.id },
                      }"
                    >
                      <span class="color-main"> Chi tiết </span>
                    </router-link>
                  </span>
                  <br />
                  <div>
                    <span
                      class="color-main"
                      style="cursor: pointer"
                      @click="deleteDiscount(discount.id)"
                    >
                      Xoá
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <th colspan="8" class="text-center color-main">
                Không tìm thấy khuyến mãi.
              </th>
            </tbody>
          </table>
        </div>
        <!-- Hết phần Bảng  -->

        <!-- ========= phân trang =========== -->
        <div class="mt-3" v-if="paginate.totalPage > 1">
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
                  src="../../../../../assets/image/left.png"
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
                  src="../../../../../assets/image/right.png"
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
              <span class="page-link" @click="changePage(paginate.totalPage)">
                Cuối
              </span>
            </li>
          </ul>
        </div>
        <!-- ================================= -->
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatDate } from "@/main";
import { formatPrice } from "@/main";
import loadingData from "@/components/loadingData";

export default {
  name: "maGiamGiaCuaToi",
  components: {
    loadingData,
  },
  data() {
    return {
      salon_id: "",
      listStore: {},
      listDiscount: [],
      paginate: {
        currentPage: 1,
        totalPage: 1,
      },
      loading: true,
      hasData: true,
    };
  },
  beforeMount() {
    this.getListStore();
    this.getListDiscount();
  },

  methods: {
    deleteDiscount(idDiscount) {
      this.$swal({
        title: "Xoá Voucher giảm giá?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xoá!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete(
            `/salon/main/manage/marketing/1/${idDiscount}/delete?type_offline=1`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.$swal("Đã xoá!", result.message, "success");
              this.getListDiscount();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },

    changePage(index) {
      this.paginate.currentPage = index;
      this.getListDiscount();
    },

    onChange() {
      this.paginate.currentPage = 1;
      this.getListDiscount();

      // this.paginate.currentPage = 1;
    },

    deleteProgram(idProgram) {
      this.$swal({
        title: "Xoá chương trình?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete(
            `/salon/main/manage/marketing/1/${idProgram}/delete`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.$swal("Đã xoá!", result.message, "success");
              this.getListDiscount();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },

    getListDiscount() {
      this.loading = true;
      this.hasData = false;
      let page = this.paginate.currentPage;
      HTTP.get(
        `/salon/main/manage/marketing/1?type_offline=1&salon_id=${this.salon_id}&page=${page}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          if (result.data.data.length > 0) {
            this.hasData = true;
            this.listDiscount = result.data.data;
            this.paginate.currentPage = result.data.current_page;
            this.paginate.totalPage = result.data.last_page;
          } else {
            this.listDiscount = [];
            this.hasData = false;
          }
        } else {
          this.hasData = false;
        }
        this.loading = false;
      });
    },
    formatDate,
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
span {
  font-size: 14px;
}

table th,
table td {
  padding: 10px;
}

.font-14 {
  font-size: 14px;
}

.bg-16 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}

.border-img {
  border-bottom-left-radius: 16px;
  border-top-left-radius: 16px;
}

.border-table {
  background: rgba(255, 255, 255, 0.56);
  background-color: #d4476f;
  color: white;
  font-weight: 700;
  border: 1px solid #d4476f;
  box-sizing: border-box;
  border-radius: 8px;
}

.button {
  background: #d4476f;
  border-radius: 8px;
}

.bg5 {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
}
.border-8 {
  border: 1px solid #d4476f;
  box-sizing: border-box;
  border-radius: 8px;
}

.hover:hover {
  background: #d4476f;
  color: white;
}

.images {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
</style>
