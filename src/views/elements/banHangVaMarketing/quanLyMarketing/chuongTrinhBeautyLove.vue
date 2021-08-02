<template>
  <div class="col-md-10 pl-5 res mt-3">
    <!-- <select
      name="salon_id"
      class="inputx mr-3 res-margin-0"
      id="cars"
      style="width: 30%; outline: none"
      v-model="salon_id"
      @change="onChange()"
    > -->
      <!-- <option value="">Tất cả salon</option>

      <option v-for="salon in listStore" :key="salon.id" :value="salon.id">
        {{ salon.salon_name }}
      </option>
    </select>
    <router-link
      :to="{
        name: 'themChuongTrinhCuaToi',
      }"
    > -->
      <!-- <span class="inputx color-main mr-3">+ Thêm chương trình</span>
    </router-link>
    <router-link to="/xuatBaoCao">
      <span class="inputx color-main">Xuất báo cáo</span>
    </router-link> -->
    <div class="color-main mt-3">
      <h5>CHƯƠNG TRÌNH CỦA BEAUTY LOVE</h5>
    </div>
    <div class="mt-3" v-if="hasData">
      <div class="bg-16">
        <div class="row">
          <div class="col-md-4">
            <img
              src="../../../../assets/image/1sse8abca2db695ebd7b6bf2175ff4f82bcs.png"
              alt=""
              class="border-img w-100 h-100"
            />
          </div>
          <div class="col-md-6 pt-2 pb-2">
            <h6>[ DỊCH VỤ LÀM ĐẸP ] - [ GIẢM GIÁ 10% TOÀN BỘ DỊCH VỤ ]</h6>
            <span
              >Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.</span
            >
            <div class="mt-2 font-12 mb-2">
              <span>Thời gian: Từ nay - hết ngày</span>
              <span class="color-main">01/01/2021</span>
            </div>
            <span class="button p-1 pl-3 pr-3" style="cursor: pointer">
              <span class="text-white">Đang diễn ra</span>
            </span>
          </div>
          <div class="col-md-2 pt-2 text-center">
            <span class="border-8 p-1 pl-4 pr-4 hover" style="cursor: pointer"
              >Tham gia</span
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else><b class="color-main">Chưa có chương trình của Beauty Love.</b></div>
    
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatDate } from "@/main";
import loadingData from "@/components/loadingData";

export default {
  name: "chuongTrinhBeautyLove",
  components: {
    loadingData,
  },
  data() {
    return {
      salon_id: "",
      listStore: {},
      listProgram: {},
      listImage: {},
      paginate: {
        currentPage: 1,
        totalPage: 1,
      },
      loading: true,
      hasData: false,
    };
  },
  beforeMount() {
    this.getListProgram();
    this.getListStore();
  },
  methods: {
    changePage(index) {
      this.paginate.currentPage = index;
      this.getListProgram();
    },

    onChange() {
      this.paginate.currentPage = 1;
      this.getListProgram();

      // this.paginate.currentPage = 1;
    },

    getListProgram() {
      this.loading = true;
      this.hasData = false;
      let page = this.paginate.currentPage;
      HTTP.get(
        "/salon/main/manage/marketing/1?salon_id=" +
          this.salon_id +
          "&page=" +
          page
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;
          if (data.data.length > 0) {
            // this.hasData = true;

            this.listProgram = data.data;
            this.paginate.currentPage = data.current_page;
            this.paginate.totalPage = data.last_page;
            // console.log(this.paginate.totalPage);
            for (let index = 0; index < this.listProgram.length; index++) {
              if (this.listProgram[index].listImage != null)
                this.listImage.push(this.listProgram[index].listImage);
            }
            console.log(this.listImage);
          }
        }
        this.loading = false;
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
  },
};
</script>
<style scoped>
span {
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
</style>
