<template>
  <div class="bg mt-3">
    <loadingData v-if="loading"></loadingData>
    <div v-if="hasData">
      <div v-if="msg != ''" class="text-center p-3">
        <b>{{ msg }}</b>
      </div>
      <div v-else>
        <div class="row p-2 pt-3">
          <div class="color-main col font-weight-bold text-center mb-2">DANH SÁCH KHÁCH HÀNG VIP</div>
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
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody class="font-weight-bold">
            <tr v-for="(vip, index) in listCustomVip" :key="index">
              <td style="text-align: right !important" class="pt-1">
                <img :src="vip.avatar" alt="photo" style="width: 33px; height: 33px; border-radius: 50%" />
              </td>
              <td>{{ vip.name }}</td>
              <td>{{ vip.sex }}</td>
              <td>{{ vip.phone }}</td>
              <td>{{ vip.address }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'chiTietKhachHang',
                    params: { custommerId: vip.id },
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
import loadingData from "@/components/loadingData";
import { HTTP } from "@/main";
export default {
  name: "khachHangVip",
  components: {
    loadingData,
  },
  data() {
    return {
      loading: true,
      hasData: false,
      listCustomVip: {},
      msg: "",
    };
  },
  beforeMount() {
    this.listCustomVips();
  },
  methods: {
    listCustomVips() {
      HTTP.get(`/salon/main/manage/managerCustomer/1`).then((res) => {
        let result = res.data;
        // console.log(result);
        if (result.status === 1) {
          this.loading = false;
          this.hasData = true;
          let data = result.data.data;
          // console.log(data);
          if (data.length > 0) {
            this.listCustomVip = data;
            // console.log(this.listCustomVip);
          } else {
            this.msg = "Chưa có khách hàng!!!";
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
      });
    },
  },
};
</script>

<style scoped></style>
