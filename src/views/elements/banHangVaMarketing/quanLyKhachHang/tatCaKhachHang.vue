<template>
  <div class="mt-4 pb-3 bg">
    <loadingData v-if="loading"></loadingData>
    <div v-if="hasData">
      <div v-if="msg != ''" class="text-center p-3">
        <b>{{ msg }}</b>
      </div>
      <div v-else>
        <div class="row p-2 pt-3">
          <div class="color-main col font-weight-bold text-center mb-2">
            DANH SÁCH TẤT CẢ KHÁCH HÀNG
          </div>
          <!-- <div class="col" style="text-align: right">
            <span>
              <input type="date" />
            </span>
          </div> -->
        </div>
        <div class="ml-4 color-main font-weight-bold">
          Tổng số: {{ total }} khách hàng
        </div>
        <table class="table table-striped text-left mt-3">
          <thead>
            <tr>
              <th style="text-align: right !important"></th>
              <th>Họ và tên</th>
              <th>Giới tính</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody class="font-weight-bold">
            <tr v-for="(item, index) in tanSuat" :key="index">
              <td style="text-align: right !important" class="pt-2">
                <img
                  :src="item.avatar"
                  alt=""
                  style="width: 33px; height: 33px; border-radius: 50%"
                />
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.sex }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.address }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'chiTietKhachHang',
                    params: { custommerId: item.id },
                  }"
                >
                  <span class="color-main">Chi tiết</span>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
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
import loadingData from "@/components/loadingData";
export default {
  name: "khachHangTanSuat",
  components: {
    loadingData,
  },
  data() {
    return {
      msg: "",
      total: 0,
      loading: true,
      hasData: false,
      tanSuat: {},
      paginate: {
        currentPage: 1,
        totalPage: "",
      },
    };
  },
  beforeMount() {
    this.listDoanhSo();
  },
  methods: {
    listDoanhSo() {
      let page = this.paginate.currentPage;
      HTTP.get(`/salon/main/manage/managerCustomer/4?page=${page}`).then(
        (res) => {
          let result = res.data;
          // console.log(result);
          if (result.status === 1) {
            this.loading = false;
            this.hasData = true;
            let data = result.data.data;
            // console.log(data);
            if (data.length > 0) {
              this.tanSuat = data;
              this.total = result.data.total;
              this.paginate.currentPage = result.data.current_page;
              this.paginate.totalPage = result.data.last_page;
            } else {
              this.loading = false;
              this.hasData = true;
              this.msg = "Chưa có khách hàng!!!";
            }
          } else {
            this.notification.status = true;
            this.notification.message = result.message;
          }
        }
      );
    },
    // ================
    // chuyển trang
    changePage(index) {
      this.paginate.currentPage = index;
      this.listDoanhSo();
    },
  },
};
</script>

<style scoped></style>
