<template>
  <div class="col-md-10 res mb-5 mt-3">
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
        name: 'themTaiSan',
      }"
    >
      <span class="inputx hover color-main mr-3">+ Thêm tài sản</span>
    </router-link>
    <div class="mt-4">
      <h5 class="color-main font-weight-bold" style="font-size: 16px">
        DANH MỤC TÀI SẢN VÀ VẬT DỤNG
      </h5>
    </div>
    <div class="row mt-3">
      <div class="col-md-8 col-sm-8 col-8">        
        <div class="row pl-3">
          <div>
            <span>
              Ngày bắt đầu: <br />
              <input type="date" v-model="startDate" />
            </span>
          </div>
          <div class="ml-3">
            <span>
              Ngày kết thúc: <br />
              <input type="date" @change="changeDate()" v-model="endDate" />
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-4 col-4">
        <span
          class="color-main input hover"
          style="float: right; font-size: 14px"
        >
          XUẤT BÁO CÁO
        </span>
      </div>
    </div>

    <loadingData v-if="loading"></loadingData>
    <div class="mt-1 p-0">
      <div class="mt-4">
        <div class="bg5 table-responsive">
          <table
            class="table table-hover borderless text-center"
            style="font-size: 14px"
          >
            <thead>
              <tr
                style="
                  border-radius: 16px !important;
                  background-color: #d4476f;
                  color: white;
                  font-weight: 700;
                "
              >
                <th>STT</th>
                <th>Danh mục tài sản</th>
                <th>Số lượng</th>
                <th>Thời gian mua</th>
                <th>Thời gian sử dụng</th>
                <!-- <th>Tỷ lệ khấu hao</th> -->
                <th>Giá trị ban đầu</th>
                <!-- <th>Giá trị còn lại</th> -->
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody v-if="hasData">
              <tr v-for="(asset, index) in listAsset" :key="asset.id">
                <td>{{ index + 1 }}</td>
                <td>{{ asset.name }}</td>
                <td>{{ asset.amount }}</td>
                <td>{{ formatDate(asset.buy_at) }}</td>
                <td>{{ asset.use_time + " ngày" }}</td>
                <td>{{ formatPrice(asset.value) }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'chiTietTaiSan',
                      params: { assetId: asset.id },
                    }"
                  >
                    <span class="color-main" style="cursor: pointer">
                      Xem chi tiết
                    </span>
                  </router-link>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <td colspan="6" class="text-center color-main">
                Chưa có tài sản.
              </td>
            </tbody>
          </table>
        </div>
      </div>
      <div class="bg6 p-2 mt-4" v-if="hasData">
        <div class="row">
          <div class="col-md-6 col-sm-6 col-6">
            <div class="font-weight-bold color-main">TỔNG TÀI SẢN</div>
          </div>
          <div class="col-md-6 col-sm-6 col-6 text-right">
            <div class="font-weight-bold color-main">
              {{ formatPrice(totalMoney) }}
            </div>
          </div>
        </div>
      </div>
      <!-- phân trang -->
      <div class="mt-3">
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
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatPrice } from "@/main";
import { formatDate } from "@/main";
import loadingData from "@/components/loadingData";

export default {
  name: "danhMucTaiSanKhauHao",
  components: {
    loadingData,
  },
  data() {
    return {
      listStore: {},
      listAsset: {},
      totalMoney: 0,
      salon_id: "",
      startDate: "",
      endDate: "",
      paginate: {
        currentPage: 1,
        totalPage: "",
      },
      loading: true,
      hasData: "",
      message: "",
    };
  },
  beforeMount() {
    this.getListAsset();
    this.getListStore();
  },
  methods: {
    // thay đổi trang
    changePage(index) {
      this.paginate.currentPage = index;
      this.getListAsset();
    },

    // thay đổi salon
    onChange() {
      this.paginate.currentPage = 1;
      this.getListAsset();
    },

    // thay đổi ngày tìm kiếm
    changeDate() {
      this.paginate.currentPage = 1;
      this.getListAsset();
    },

    // danh sách tài sản
    getListAsset() {
      this.loading = true;
      HTTP.get(
        "/salon/main/manage/asset?page=" +
          this.paginate.currentPage +
          "&start_date=" +
          this.startDate +
          "&end_date=" +
          this.endDate +
          "&salon_id=" +
          this.salon_id
      )
        .then((res) => {
          var result = res.data;
          if (result.status === 1) {
            if (result.data.data.length > 0) {
              this.hasData = true;
              this.listAsset = result.data.data;
              this.totalMoney = 0;
              for (let i = 0; i < this.listAsset.length; i++) {
                this.totalMoney += this.listAsset[i]["value"];
              }
              this.paginate.totalPage = result.data.last_page;
            } else {
              this.hasData = false;
            }
          } else {
            this.hasData = false;
            this.message = "Lỗi kết nối.";
          }
          this.loading = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    formatDate,
    formatPrice,

    // danh sách salon
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
* {
  font-size: 14px;
}

.input,
input {
  background: rgba(255, 255, 255, 0.8);
  /* border: 1px solid #d4476f; */
  border: none;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 5px 10px;
  outline: none;
}

.bg-8 {
  background: rgba(255, 255, 255, 0.8);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.bg5 {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
}
.bg-40 {
  background: rgba(255, 255, 255, 0.8);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 40px;
  padding: 7px 15px;
}

.bg6 {
  background: #ffffff;
  opacity: 0.8;
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}

.hover:hover {
  background-color: #d4476f;
  color: white;
}
@media only screen and (max-width: 768px) {
  .padding-0 {
    padding: 0;
  }
}
</style>
