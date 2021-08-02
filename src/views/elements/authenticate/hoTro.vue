<template>
  <div class="container mt-5 ip5">
    <div class="row width-30 width-sm-80" style="margin: 0 auto">
      <div class="col-12 box-form pt-4 pb-4 padding-sm-15">
        <loadingData v-if="loading"></loadingData>
        <div v-if="hasData">
          <h4 class="text-center mb-3 color-main">HỖ TRỢ</h4>
          <form class="mt-5 ip5">
            <div class="row">
              <div class="col-md-7">
                <h5 class="color-main">HỖ TRỢ TỪ SALON</h5>
                <p>
                  {{ support }}
                </p>
                <p>Cảm ơn bạn đã quan tâm sản phẩm của Beauty Salon</p>
              </div>
              <div
                class="col-md-5"
                style="
                  align-items: center;
                  justify-content: center;
                  display: flex;
                "
              >
                <img
                  src="../../../assets/image/Group.png"
                  alt=""
                  style="width: 160px"
                />
              </div>
            </div>
            <div class="mt-3 text-center">
              <router-link :to="{ name: 'login' }">
                <button class="mt-2 mr-3 res-button">
                  <span>Vào đăng nhập</span>
                </button>
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/main";
import loadingData from "@/components/loadingData";
export default {
  name: "support",
  components: {
    loadingData,
  },
  data() {
    return {
      loading: true,
      hasData: false,
      message: "",
      support: {},
    };
  },
  created() {
    HTTP.get(`/common/support`).then((res) => {
      let result = res.data;
      if (result.status === 1) {
        let data = result.data;
        this.hasData = true;
        this.support = data.support;
      } else {
        this.message = result.message;
      }
      this.loading = false;
    });
  },
};
</script>
