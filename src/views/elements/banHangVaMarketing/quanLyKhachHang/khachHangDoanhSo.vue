<template>
  <div class="mt-4 bg">
    <loadingData v-if="loading"></loadingData>
    <div v-if="hasData">
      <div v-if="msg != ''" class="text-center p-3">
        <b>{{ msg }}</b>
      </div>
      <div v-else>
        <div class="row p-2 pt-3">
          <div class="color-main col font-weight-bold text-center mb-2">
            DANH SÁCH KHÁCH HÀNG DANH SỐ
          </div>
          <!-- <div class="col" style="text-align: right">
            <span>
              <input type="date" />
            </span>
          </div> -->
        </div>
        <table class="table table-striped text-left">
          <thead>
            <tr>
              <th style="text-align: right !important"></th>
              <th class="pl-4">Họ và tên</th>
              <th class="text-center">Giới tính</th>
              <th class="text-center">Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Tổng tiền</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody class="font-weight-bold">
            <tr v-for="(item, index) in doanhSo" :key="index">
              <td style="text-align: right !important" class="pt-2">
                <img
                  :src="item.avatar"
                  alt=""
                  style="width: 33px; height: 33px; border-radius: 50%"
                />
              </td>
              <td class="pl-4">{{ item.name }}</td>
              <td class="text-center">{{ item.sex }}</td>
              <td class="text-center">{{ item.phone }}</td>
              <td>{{ item.address }}</td>
              <td class="color-main">{{ formatPrice(item.total_money) }}</td>
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
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/main";
import loadingData from "@/components/loadingData";
import { formatPrice } from "@/main";
export default {
  name: "khachHangDoanhSo",
  components: {
    loadingData,
  },
  data() {
    return {
      msg: "",
      loading: true,
      hasData: false,
      doanhSo: {},
    };
  },
  beforeMount() {
    this.listDoanhSo();
  },
  methods: {
    listDoanhSo() {
      HTTP.get(`/salon/main/manage/managerCustomer/2`).then((res) => {
        let result = res.data;
        // console.log(result);
        if (result.status === 1) {
          this.loading = false;
          this.hasData = true;
          let data = result.data.data;
          // console.log(data);
          if (data.length > 0) {
            this.doanhSo = data;
            // console.log(this.doanhSo);
          } else {
            this.loading = false;
            this.hasData = true;
            this.msg = "Chưa có khách hàng!!!";
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
      });
    },
    // ================
    formatPrice,
  },
};
</script>

<style scoped></style>
