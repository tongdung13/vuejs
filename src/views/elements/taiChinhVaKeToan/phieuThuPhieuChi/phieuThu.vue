<template>
  <div class="col-md-10 res mb-5 mt-3">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-12">
        <select
          name="salon_id"
          class="inputx mr-3 res-margin-0"
          id="cars"
          style="width: 30%; outline: none"
          v-model="salon_id"
          @change="changeStore()"
        >
          <option value="">Tất cả salon</option>

          <option v-for="salon in listStore" :key="salon.id" :value="salon.id">
            {{ salon.salon_name }}
          </option>
        </select>
        <span class="inputx hover color-main">Xuất báo cáo</span>
      </div>
    </div>
    <div class="mt-4">
      <div class="mt-3">
        <router-link
          :to="{ name: 'phieuThu' }"
          class="input color-main hover mr-3"
        >
          <span>PHIẾU THU</span></router-link
        >
        <router-link
          :to="{ name: 'phieuChi' }"
          class="input color-main hover mr-3"
        >
          <span>PHIẾU CHI</span></router-link
        >
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<template>
  <div class="mt-3 bg-16">
    <div class="p-3">
      <div class="row">
        <div class="col">
          <h5 class="color-main">PHIẾU THU</h5>
        </div>
        <div class="col text-right">
          <router-link :to="{ name: 'themPhieuThu' }">
            <span class="hover inputx color-main">Thêm phiếu thu</span>
          </router-link>
        </div>
      </div>
    </div>
    <!-- Danh sách Phiếu thu -->
    <router-view></router-view>
    <!-- ================= -->
  </div>
  <div class="text-right mt-4" style="padding-bottom: 80px">
    <span class="hover bg6 pl-3 pr-3 p-2 color-main mr-4">
      <img src="../../../../assets/image/add.png" alt="" style="width: 17px" />
      Thêm</span
    >
    <span class="hover bg6 pl-3 pr-3 p-2 color-main mr-4">
      <img src="../../../../assets/image/Delete.png" alt="" /> Xoá</span
    >
    <span class="hover bg6 pl-3 pr-3 p-2 color-main mr-4">
      <img src="../../../../assets/image/save.png" alt="" /> Lưu</span
    >
    <span class="hover bg6 pl-3 pr-3 p-2 color-main">
      <img src="../../../../assets/image/print.png" alt="" /> In
    </span>
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatDate } from "@/main";
import { formatPrice } from "@/main";
export default {
  name: " phieuThu ",
  data() {
    return {
      // listReceipt: {},
      msg: "",
    };
  },
  beforeMount() {
    // this.listReceipts();
  },
  methods: {
    // listReceipts() {
    //   HTTP.get(`/salon/main/manage/receipts`).then((res) => {
    //     let result = res.data;
    //     if (result.status === 1) {
    //       let data = result.data;
    //       if (data.length > 0) {
    //         this.listReceipt = data.receipts;
    //         // console.log(this.listReceipt);
    //       } else {
    //         this.msg = "Chưa có phiếu thu";
    //       }
    //     }
    //   });
    // },
    // formatDate,
    // formatPrice,
  },
};
</script>
<style scoped>
.bg-8 {
  background: rgba(255, 255, 255, 0.8);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.bg-16 {
  background: rgba(145, 145, 145, 0.5);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.bg5 {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
}
.bg6 {
  background: #ffffff;
  opacity: 0.8;
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.hover:hover {
  cursor: pointer;
}

select {
  outline: none;
  color: #d4476f;
  border: 1px solid #d4476f;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 5px 15px;
}
.dropbtn {
  color: white;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
@media only screen and (max-width: 768px) {
  .padding-left-0 {
    padding-left: 0 !important;
  }
  .margin-left-15 {
    margin-left: 15px !important;
  }
  .width-100 {
    width: 100% !important;
  }
  .width-95 {
    width: 95% !important;
  }
}

@media only screen and (max-width: 925px) {
  .bg5 {
    overflow: scroll;
  }
}
</style>
