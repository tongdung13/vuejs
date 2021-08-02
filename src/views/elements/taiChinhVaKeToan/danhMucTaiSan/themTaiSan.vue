<template>
  <div class="col-md-10 pl-5 res mb-5 mt-3">
    <form @submit.prevent="createPost">
      <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
        <h6 class="color-main font-weight-bold">THÊM MỚI TÀI SẢN</h6>
        <div class="mt-3">
          <table class="table table-borderless">
            <tbody>
              <tr>
                <td>Salon chứa tài sản</td>
                <td>
                  <select
                    class="inputx mr-3 res-margin-0"
                    id="cars salon"
                    style="width: 100%; outline: none"
                    required
                    v-model="post.salon_id"
                    @change="choseSalon"
                  >
                    <option value="">--- Chọn salon ---</option>
                    <option
                      v-for="item in listStore"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.salon_name }}
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td style="width: 15%">Tên tài sản</td>
                <td>
                  <input
                    type="text"
                    placeholder="Tên tài sản"
                    style="width: 100%"
                    required
                    v-model="post.name"
                  />
                </td>
                <td style="width: 15%">Ảnh tài sản</td>
                <td>
                  <div
                    v-if="url"
                    class="bg"
                    id="preview"
                    style="
                      cursor: pointer;
                      justify-content: left;
                      align-items: center;
                      display: flex;
                      height: 159px;
                    "
                  >
                    <img
                      :src="url"
                      alt=""
                      style="width: 130px; height: 130px; border-radius: 8px"
                    />
                    <img
                      src="../../../../assets/image/xx.png"
                      alt=""
                      style="transform: translate(0px, -65px)"
                      @click="removeImage"
                    />
                  </div>
                  <div v-else>
                    <input
                      type="file"
                      id="upload"
                      hidden
                      @change="onFileChange"
                    />
                    <label
                      class="bg1 mt-3 text-center p-2 pl-4 pr-4 color-main"
                      style="cursor: pointer"
                      for="upload"
                      >Thêm ảnh</label
                    >
                  </div>
                </td>
              </tr>

              <tr>
                <td>Số lượng</td>
                <td style="width: 35%">
                  <input
                    type="number"
                    placeholder="Số lượng"
                    style="width: 100%"
                    required
                    v-model="post.amount"
                  />
                </td>
                <td>Giá trị ban đầu</td>
                <td>
                  <input
                    type="text"
                    placeholder="Giá trị ban đầu"
                    style="width: 100%"
                    required
                    v-model="post.value"
                  />
                </td>
              </tr>
              <tr>
                <td>Ngày mua</td>
                <td>
                  <input
                    type="date"
                    style="width: 100%"
                    v-model="post.buy_at"
                    @change="analisDay"
                  />
                </td>
                <td>Ngày hết hạn</td>
                <td>
                  <input
                    type="date"
                    style="width: 100%"
                    v-model="post.end_at"
                    @change="analisDay"
                  />
                </td>
              </tr>

              <tr>
                <td>Thời gian sử dụng</td>
                <!-- <td>
                  <input
                    type="text"
                    placeholder="Thời gian sử dụng"
                    style="width: 100%"
                    required
                    v-model="post.use_time"
                  />
                </td> -->
                <td style="width: 30%">
                  <div class="inputx text-left" v-if="post.use_time > 0">
                    {{ post.use_time + " ngày" }}
                  </div>
                  <div
                    class="inputx text-left"
                    v-else
                    style="min-height: 34px;"
                  >
                    {{ post.use_time }}
                  </div>
                </td>

                <td>Tài khoản thanh toán</td>
                <td style="width: 35%">
                  <div v-if="post.salon_id">
                    <select
                      class="inputx mr-3 res-margin-0"
                      style="width: 100%; outline: none"
                      v-model="post.funds_id"
                    >
                      <option value="">--Chọn ngân hàng--</option>
                      <option
                        v-for="(item, index) in listBank"
                        :key="index"
                        :value="item.id"
                      >
                        {{ item.bank }}
                      </option>
                    </select>
                  </div>
                  <div v-else class="inputx text-left">
                    --Chọn salon--
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-3 text-center pb-3">
          <span @click="backPage" class="borderx mr-3 color-main">
            Quay lại
          </span>
          <button class="borderx mr-2 color-main" type="submit">Lưu</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "themTaiSan",
  data() {
    return {
      listStore: {},
      user: "",
      url: "",
      post: {
        name: "",
        amount: "",
        buy_at: "",
        end_at: "",
        use_time: "",
        funds_id: "",
        depreciation_rates: "",
        value: "",
        residual_value: "",
        salon_id: "",
        image: "",
      },
      listBank: [],
    };
  },
  beforeMount() {
    this.getListStore();
  },
  methods: {
    getListStore() {
      HTTP.get("/salon/main/manage/branch/all").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listStore = data;
            // console.log(this.listStore);
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },
    // Tính ngày
    analisDay() {
      if (this.post.buy_at != "" && this.post.end_at != "") {
        const startDate = this.post.buy_at;
        const endDate = this.post.end_at;
        const timeDiff = new Date(endDate) - new Date(startDate);
        if (timeDiff < 0) {
          this.post.use_time = "Ngày bắt đầu phải sau ngày kết thúc";
        } else this.post.use_time = timeDiff / (1000 * 60 * 60 * 24);
      }
    },
    // ===========
    // Chọn salon
    choseSalon() {
      this.getListBank();
    },
    // ==========
    // Danh sách các ngân hàng
    getListBank() {
      HTTP.get(
        `/salon/main/manage/funds?page=1&salon_id=${this.post.salon_id}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data.data;
          this.listBank = data;
        }
      });
    },
    // =======================

    // tao moi san pham
    createPost() {
      let formData = new FormData();
      formData.append("image", this.post.image);
      formData.append("name", this.post.name);
      formData.append("amount", this.post.amount);
      formData.append("buy_at", this.post.buy_at);
      formData.append("use_time", this.post.use_time);
      formData.append("funds_id", this.post.funds_id);
      formData.append("value", this.post.value);
      formData.append("residual_value", this.post.residual_value);
      formData.append("salon_id", this.post.salon_id);

      HTTP.post(`/salon/main/manage/asset/store`, formData).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          // this.content = "";
          this.$swal("", result.message, "success");
          setTimeout(() => {
            history.back();
          }, 1000);
        } else {
          this.$swal("", "Lỗi thêm mới", "error");
        }
      });
    },
    // =================

    // xử lý ảnh
    onFileChange(e) {
      this.post.image = e.target.files[0];
      this.url = URL.createObjectURL(this.post.image);
      console.log(this.post.image);
    },
    // ==============

    // Xoá ảnh
    removeImage() {
      (this.url = ""), (this.post.image = "");
    },
    // ===========
    backPage() {
      history.back();
    },
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}

.borderx {
  border: 1px solid #d4476f;
  padding: 5px 25px;
  border-radius: 4px;
  cursor: pointer;
}

.borderx:hover {
  color: white;
  background-color: #d4476f;
}

.bg-8 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

label {
  padding: 30px;
  font-size: 14px;
  border-radius: 16px;
  text-align: center;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
input {
  outline: none;
  background: rgba(255, 255, 255, 0.56);
  /* shape */
  padding: 5px 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 8px;
}

ul {
  padding: 5px 15px;
}

li {
  padding: 5px 15px;
  list-style: none;
}

.card-header {
  padding: 5px;
  border-bottom: none;
  background: rgba(255, 255, 255, 0.56);
}

.card-body {
  padding: 0;
}

.card {
  border: none;
}
.inputx {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 5px 10px;
  outline: none;
}
table td {
  vertical-align: middle;
}
@media only screen and (max-width: 768px) {
  .borderx {
    padding: 5px 15px;
  }
}
</style>
