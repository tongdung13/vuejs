<template>
  <div class="col-md-10 res mb-5 mt-3">
    <div class="row mb-4">
      <div class="col-md-12 col-sm-12 col-12">
        <select
          name="salon_id"
          class="inputx mr-3 res-margin-0"
          style="width: 30%; outline: none"
          v-model="salon_id"
        >
          <option value="">Tất cả salon</option>

          <option v-for="salon in listStore" :key="salon.id" :value="salon.id">
            {{ salon.salon_name }}
          </option>
        </select>
        <span class="inputx hover color-main">Xuất báo cáo</span>
      </div>
    </div>
    <b class="color-main" style="font-size: 130%">TÀI CHÍNH TẠM TÍNH LÃI LỖ</b>
    <div class="mt-3 row">
      <div class="col-md-3">
        <router-link :to="{ name: 'thongKeTaiChinh' }">
          <div
            class="p-3 box hover color-main"
            @click="active = 1"
            :class="{ activeClass: active == 1 }"
          >
            <div class="row">
              <div class="col-md-3">
                <img
                  src="../../../../assets/image/Group13572.png"
                  alt=""
                  class="bg-8"
                  style="padding: 5px 8px"
                />
              </div>
              <div class="col-md-9" style="display: flex">
                <span style="align-items: center; display: flex">
                  THỐNG KÊ <br />TÀI CHÍNH
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-md-3">
        <router-link :to="{ name: 'ketQuaKinhDoanh' }">
          <div
            class="p-3 box hover color-main"
            @click="active = 2"
            :class="{ activeClass: active == 2 }"
          >
            <div class="row">
              <div class="col-md-3">
                <img
                  src="../../../../assets/image/Group13572.png"
                  alt=""
                  class="bg-8"
                  style="padding: 5px 8px"
                />
              </div>
              <div class="col-md-9" style="display: flex">
                <span style="align-items: center; display: flex">
                  BÁO CÁO <br />KQ KINH DOANH
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-3">
        <router-link :to="{ name: 'canDoiKeToan' }">
          <div
            class="p-3 box hover color-main"
            @click="active = 3"
            :class="{ activeClass: active == 3 }"
          >
            <div class="row">
              <div class="col-md-3">
                <img
                  src="../../../../assets/image/Group13572.png"
                  alt=""
                  class="bg-8"
                  style="padding: 5px 8px"
                />
              </div>
              <div class="col-md-9" style="display: flex">
                <span style="align-items: center; display: flex">
                  BẢNG CÂN ĐỐI <br />KẾ TOÁN
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-3">
        <router-link :to="{ name: 'luuChuyenTienTe' }">
          <div
            class="p-3 box hover color-main"
            @click="active = 4"
            :class="{ activeClass: active == 4 }"
          >
            <div class="row">
              <div class="col-md-3">
                <img
                  src="../../../../assets/image/Group13572.png"
                  alt=""
                  class="bg-8"
                  style="padding: 5px 8px"
                />
              </div>
              <div class="col-md-9" style="display: flex">
                <span style="align-items: center; display: flex">
                  BÁO CÁO <br />LƯU CHUYỂN TT
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="mt-3" style="padding: 15px; width: 100%">
        <router-view></router-view>
        <!-- ================ -->
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
import baoCaoKetQuaKD from "./ketQuaKinhDoanh/baoCaoKetQuaKD";
import baoCaoLuuChuyenThongTin from "./baoCaoLuuChuyenThongTin";
import bangCanDoiKeToan from "./bangCanDoiKeToan";

export default {
  components: { baoCaoKetQuaKD, baoCaoLuuChuyenThongTin, bangCanDoiKeToan },
  name: "taiChinhTamTinhLaiLo",
  data() {
    return {
      active: "1",
      salon_id: "",
      listStore: {},
    };
  },
  beforeMount() {
    this.getListStore();
  },
  methods: {
    // Danh sách Salon
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
    // ====================
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}

.box {
  /* width: 200px; */
  /* height: 50px; */
  background: rgba(255, 255, 255, 0.66);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: white !important;
  background-color: #d4476f;
}

.bg-16 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}

.bg-8 {
  background: rgba(255, 255, 255, 0.65);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.active {
  color: black;
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
.activeClass {
  background: #d4476f;
  color: white;
}
</style>
