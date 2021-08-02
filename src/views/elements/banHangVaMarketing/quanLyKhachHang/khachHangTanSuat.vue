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
            DANH SÁCH KHÁCH TẦN SUẤT
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
              <th>Họ và tên</th>
              <th>Giới tính</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th class="text-center">Số lần mua hàng</th>
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
              <td class="text-center">{{ item.total + " lần" }}</td>
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
export default {
  name: "khachHangTanSuat",
  components: {
    loadingData,
  },
  data() {
    return {
      msg: "",
      loading: true,
      hasData: false,
      tanSuat: {},
    };
  },
  beforeMount() {
    this.listDoanhSo();
  },
  methods: {
    listDoanhSo() {
      HTTP.get(`/salon/main/manage/managerCustomer/3`).then((res) => {
        let result = res.data;
        // console.log(result);
        if (result.status === 1) {
          this.loading = false;
          this.hasData = true;
          let data = result.data.data;
          // console.log(data);
          if (data.length > 0) {
            this.tanSuat = data;
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
  },
};
</script>

<style scoped></style>
