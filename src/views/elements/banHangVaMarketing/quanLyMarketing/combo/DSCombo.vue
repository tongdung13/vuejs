<template>
  <div class="col-md-10 res mt-3">
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
        name: 'themCombo',
      }"
    >
      <span class="inputx color-main mr-3">+ Thêm Combo</span>
    </router-link>
    <div class="mt-3">
      <div class="bg-16 p-3 mb-5">
        <h6 class="color-main">COMBO CỦA TÔI</h6>

        <loadingData v-if="loading"></loadingData>

        <div v-if="hasData" class="bg5 table-responsive mt-3 font-14">
          <table
            class="w-100 table-borderless table-hover text-center table-striped"
          >
            <thead>
              <tr
                class="border-table"
                style="
                  border-radius: 16px;
                  background-color: #d4476f;
                  color: white;
                  font-weight: 700;
                "
              >
                <th>Tên combo</th>
                <th>Mã</th>
                <th>Loại mức giảm</th>
                <th>Salon</th>
                <th>Sản phẩm</th>
                <th class="text-center">Thời gian</th>

                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody v-if="listCombo.length > 0">
              <tr v-for="(combo, index) in listCombo" :key="index">
                <td>
                  {{ combo.title }}
                </td>
                <td>
                  {{ combo.code }}
                </td>
                <td>
                  {{ combo.type_discount }}
                </td>
                <td>
                  {{ combo.salon_name }}
                </td>
                <td>
                  <div
                    v-for="(product, index) in combo.products"
                    :key="index"
                    class="mr-2"
                  >
                    <p class="m-0">
                      {{ index + 1 }} - {{ product.title }}
                    </p>
                  </div>
                  <p v-if="combo.length >= 3">...</p>
                </td>

                <td class="text-center">
                  {{ "Từ " + formatDate(combo.start_date) }} <br />
                  {{ "đến " + formatDate(combo.end_date) }}
                </td>
                <td>{{ combo.status }}</td>
                <td>
                  <span>
                    <router-link
                      :to="{
                        name: 'chiTietCombo',
                        params: { idCombo: combo.id },
                      }"
                    >
                      <span class="color-main">Chi tiết</span>
                    </router-link>
                  </span>
                  <br />
                  <div>
                    <span
                      class="color-main"
                      style="cursor: pointer"
                      @click="deleteCombo(combo.id)"
                    >
                      Xoá
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <th colspan="8" class="text-center color-main mt-2">
                Chưa có combo.
              </th>
            </tbody>
          </table>
        </div>
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
              <span class="page-link" @click="changePage(paginate.totalPage)"
                >Cuối</span
              >
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
import loadingData from "@/components/loadingData";

export default {
  name: "combo",
  components: {
    loadingData,
  },
  data() {
    return {
      salon_id: "",
      listStore: {},
      listCombo: [],
      listImage: {},
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
    this.getListCombo();
  },
  methods: {
    changePage(index) {
      this.paginate.currentPage = index;
      this.getListCombo();
    },

    onChange() {
      this.paginate.currentPage = 1;
      this.getListCombo();

      // this.paginate.currentPage = 1;
    },

    deleteCombo(idCombo) {
      this.$swal({
        title: "Xoá combo?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xoá!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete(`/salon/main/manage/marketing/2/${idCombo}/delete`).then(
            (res) => {
              let result = res.data;
              if (result.status === 1) {
                this.getListCombo();
                this.$swal("Đã xoá!", result.message, "success");
              } else {
                this.$swal("", result.message, "error");
              }
            }
          );
        }
      });
    },

    getListCombo() {
      let page = this.paginate.currentPage;
      HTTP.get(
        `/salon/main/manage/marketing/2?salon_id=${this.salon_id}&page=${page}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          if (result.data.data.length > 0) {
            this.hasData = true;

            this.listCombo = result.data.data;
            // console.log(this.listCombo);
            this.paginate.currentPage = result.data.current_page;
            this.paginate.totalPage = result.data.last_page;
            // console.log(this.paginate.totalPage);
            for (let index = 0; index < this.listCombo.length; index++) {
              this.listImage[index] = this.listCombo[index].listImage;
            }
          } else {
            this.listCombo = [];
            // this.hasData = false;
          }
        } else {
          // this.hasData = false;
        }
      });
      this.loading = false;
    },

    formatDate,
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
      });
    },

    getSalon(salon_id) {
      HTTP.get(`/salon/main/manage/branch/${salon_id}/detail`)
        .then((response) => {
          if (response.data.status == 1) {
            return response.data.data.salon_name;
          }
        })
        .catch((e) => {
          this.errors.push(e);
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
  /* new color */

  border: 1px solid #d4476f;
  box-sizing: border-box;
  border-radius: 8px;
}

.button {
  background: #d4476f;
  border-radius: 8px;
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

.bg5 {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
}
.images {
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

label {
  display: inline-block;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  color: black;
  border-radius: 0.3rem;
  cursor: pointer;
  padding: 15px;
}
</style>
