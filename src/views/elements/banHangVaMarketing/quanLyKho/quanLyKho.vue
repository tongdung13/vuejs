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
    <!-- <router-link :to="{ name: 'QLK-themSanPham' }">
      <span class="inputx hover color-main mr-3">+ Thêm sản phẩm</span>
    </router-link> -->
    <a>
      <span class="inputx hover color-main">Xuất báo cáo</span>
    </a>
    <div class="mt-3 pb-3 mb-5 bg-16">
      <div>
        <div>
          <div class="group-tabs">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
              <!-- <li role="presentation">
                <a
                  role="tab"
                  data-toggle="tab"
                  class="active"
                  style="border-top-left-radius: 16px"
                >
                  <span>Tất cả</span>
                </a>
              </li> -->
              <li role="presentation" @click="changeCondition(1)">
                <a
                  role="tab"
                  data-toggle="tab"
                  class="active"
                  style="border-top-left-radius: 16px"
                >
                  <span>Đang bán</span>
                </a>
              </li>
              <li role="presentation" @click="changeCondition(2)">
                <a role="tab" data-toggle="tab">
                  <span>Sắp hết hàng</span>
                </a>
              </li>
              <li role="presentation" @click="changeCondition(3)">
                <a role="tab" data-toggle="tab">
                  <span>Sản phẩm vi phạm</span>
                </a>
              </li>
              <li role="presentation" @click="changeCondition(4)">
                <a role="tab" data-toggle="tab">
                  <span>Hết hàng</span>
                </a>
              </li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content mt-3 pl-3 pr-3">
              <div
                role="tabpanel"
                class="tab-pane active"
                style="
                  border: none !important;
                  background-color: rgba(255, 255, 255, 0.4);
                  color: black !important;
                "
                id="home"
              >
                <!-- one -->
                <div class="mt-3">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm"
                    style="width: 30%; position: relative"
                    v-model="keySearch"
                    @change="searchProduct()"
                  />
                  <i
                    class="fa fa-search color-main"
                    style="position: absolute;transform: translate(-23px, 9px);"
                  ></i>

                  <div class="mt-2 mb-2" v-if="posts.total > 0">
                    <span class="color-main font-weight-bold">
                      {{ posts.total }} sản phẩm
                    </span>
                  </div>
                </div>
                <loadingData v-if="loading"></loadingData>
                <div v-if="hasData">
                  <div v-if="msg != ''" class="text-center mt-3">
                    <b>{{ msg }}</b>
                  </div>
                  <div v-else>
                    <div class="border-main mt-2">
                      <table class="w-100">
                        <tr class="text-center">
                          <td style="width: 5%"><b>STT</b></td>
                          <th style="width: 25%" class="pt-2 pb-2 text-left">
                            Tên sản phẩm
                          </th>
                          <th class="pt-2 pb-2">Số lượng</th>
                          <th style="width: 15%" class="pt-2 pb-2">Giá bán</th>
                          <th style="width: 15%" class="pt-2 pb-2">
                            Giá khuyến mãi
                          </th>
                          <th class="pt-2 pb-2">
                            Mã sản phẩm
                          </th>
                          <th class="pt-2 pb-2">
                            khoi luong 
                          </th>
                          <th class="pt-2 pb-2">
                           dung tich
                          </th>
                          <th style="15%" class="pt-2 pb-2">Thao tác</th>
                        </tr>
                      </table>
                    </div>
                    <div
                      class="border-main mt-3"
                      v-for="(item, index) in detail"
                      :key="index"
                    >
                      <table class="w-100">
                        <tr class="text-center">
                          <td style="width: 5%;">
                            <b>#{{ index + 1 }}</b>
                          </td>
                          <td style="width: 25%" class="pt-1 pb-1 text-left">
                            <img
                              :src="item.link_image"
                              alt=""
                              class="hidden"
                              style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;"
                            />
                            <span class="ml-2 font-weight-bold">
                              {{ item.name }}
                            </span>
                          </td>
                          <td >
                            <span>
                              <b>{{ formatNumber(item.amount) }} Sp</b>
                            </span>
                          </td>
                          <td style="width: 15%;">
                            <span
                              class="font-weight-bold color-main"
                              :class="{ decoration: item.price_sale > 0 }"
                            >
                              {{ formatPrice(item.price) }}
                            </span>
                          </td>
                          <td style="width: 15%;">
                            <span
                              class="font-weight-bold color-main"
                              style=""
                              v-if="item.price_sale > 0"
                            >
                              {{ formatPrice(item.price_sale) }}
                            </span>
                            <span
                              class="font-weight-bold color-main"
                              style=""
                              v-else
                            >
                              Chưa có khuyến mãi
                            </span>
                          </td>
                          <td
                            style="width: 15%;"
                            class="color-main font-weight-bold"
                          >
                            {{ item.sku }}
                          </td>
                          <td
                            
                            class="color-main font-weight-bold"
                          >
                            {{ item.weight + ' gram' }}
                          </td>
                          <td
                            
                            class="color-main font-weight-bold"
                          >
                            {{ item.capacity + ' mili'}}
                          </td>
                          <td
                            style="width: 15%;"
                            class="color-main font-weight-bold"
                          >
                            <router-link
                              :to="{
                                name: 'chiTietQuanLyKho',
                                params: { khoId: item.product_id },
                              }"
                            >
                              xem chi tiết
                            </router-link>
                          </td>
                        </tr>
                      </table>
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
    <!-- <content-component /> -->
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatPrice, formatNumber } from "@/main";
import loadingData from "@/components/loadingData";

export default {
  name: "quanLyKho",
  components: {
    loadingData,
  },
  data() {
    return {
      msg: "",
      posts: [],
      search: "",
      detail: [],
      errors: [],
      keySearch: "",
      salon_id: "",
      condition: "1",
      paginate: {
        currentPage: 1,
        totalPage: 1,
      },
      listStore: [],
      loading: true,
      hasData: false,
    };
  },
  beforeMount() {
    this.manageWarehouse();
    this.getListStore();
    this.testkho();
  },
  methods: {
    changePage(index) {
      this.paginate.currentPage = index;
      this.manageWarehouse();
    },
    onChange() {
      this.manageWarehouse();
      this.paginate.currentPage = 1;
    },
    changeCondition(index) {
      this.condition = index;
      this.paginate.currentPage = 1;
      this.manageWarehouse();
    },
    searchProduct() {
      this.paginate.currentPage = 1;
      this.manageWarehouse();
    },

    // Danh sách kho hàng
    testkho() {
      HTTP.get(`/salon/main/manage/product?page=1&condition=1`)
        .then((res) => {
          let result = res.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    manageWarehouse() {
      this.loading = true;
      this.hasData = false;
      let page = this.paginate.currentPage;
      HTTP.get(
        `/salon/main/manage/product?page=${page}&condition=${this.condition}&salon_id=${this.salon_id}&name=${this.keySearch}`
      )
        .then((res) => {
          let result = res.data;
          if (result.status === 1) {
            let data = result.data;
            if (data.data.length > 0) {
              this.msg = "";
              this.loading = false;
              this.hasData = true;
              this.posts = data;
              this.detail = data.data;
              this.paginate.currentPage = data.current_page;
              this.paginate.totalPage = data.last_page;
            } else {
              this.loading = false;
              this.hasData = true;
              this.msg = "Không có sản phẩm!!!";
              this.posts.total = 0;
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

    // ==================

    formatPrice,
    formatNumber,
  },
  computed: {
    filteredItemsWarehouse() {
      return this.detail.filter((item) => {
        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
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
  color: black;
  text-align: center;
  padding: 0.5rem 1em;
  text-decoration: none;
  cursor: pointer;
}

.tab-pane {
  font-size: 14px;
}

.border-main {
  border: 1px solid #d4476f;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.56);
}

li a:hover {
  color: #d4476f;
  text-decoration: none;
}

.group-tabs ul li .active {
  background-color: rgba(212, 71, 111, 0.1);
  border-bottom: 2px solid #d4476f;
  color: #d4476f;
}

::placeholder {
  color: #d4476f;
}
.decoration {
  text-decoration: line-through;
}
</style>
