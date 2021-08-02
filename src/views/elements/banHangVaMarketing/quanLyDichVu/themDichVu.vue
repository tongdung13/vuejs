<template>
  <div class="col-md-10 res mb-5 mt-3">
    <h5 class="mt-3 font-weight-bold color-main">THÊM DỊCH VỤ</h5>
    <!-- Thông tin salon -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <h6>THÔNG TIN DỊCH VỤ</h6>
      <div class="mt-3 pb-2">
        <table class="table table-borderless">
          <tbody class="text-right">
            <tr>
              <td style="width: 15%">
                <div class="table-input">Danh mục:</div>
              </td>
              <td style="width: 35%">
                <select
                  name="salon_id"
                  class="inputx mr-3 res-margin-0"
                  style="width: 100%; outline: none"
                  v-model="salon.category"
                >
                  <option value="">--Chọn danh mục dịch vụ--</option>
                  <option v-for="(item, index) in listCategory" :value="item.id" :key="index">
                    {{item.name}}
                  </option>
                </select>
              </td>
              <td style="width: 15%">
                <div class="table-input">Ảnh dịch vụ:</div>
              </td>
              <td style="width: 35%">
                <div v-if="url == ''" class="text-center">
                  <input
                    type="file"
                    id="upload"
                    hidden
                    @change="onFileChange"
                  />
                  <label
                    class="bg1 hover mt-3 text-center p-2 pl-4 pr-4 color-main"
                    style="cursor: pointer"
                    for="upload"
                    >Thêm ảnh</label
                  >
                </div>
                <div
                  v-else
                  class="bg"
                  id="preview"
                  style="
                    cursor: pointer;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    position: relative;
                  "
                >
                  <img
                    :src="url"
                    alt=""
                    style="width: 110px; border-radius: 8px"
                  />
                  <img
                    src="../../../../assets/image/xx.png"
                    alt=""
                    style="position: absolute; right: 95px; top: -5px"
                    @click="removeImage()"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%">
                <div class="table-input">Tên dịch vụ:</div>
              </td>
              <td style="width: 35%">
                <input
                  type="text"
                  placeholder="Tên dịch vụ... "
                  class="w-100"
                  v-model="salon.title"
                  required
                />
              </td>
              <td style="width: 15%">
                <div class="table-input">Giá:</div>
              </td>
              <td style="width: 35%">
                <div class="right-inner-addon input-container">
                  <span>VNĐ</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Giá... "
                    class="w-100"
                    v-model="salon.price"
                    required
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%">
                <div class="table-input">Mô tả:</div>
              </td>
              <td colspan="3">
                <textarea
                  class="w-100"
                  rows="6"
                  v-model="salon.description"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-3 text-center pb-3">
        <button class="borderx mr-2 color-main" @click="backPage">
          Quay lại
        </button>
        <button type="submit" @click="addService" class="borderx color-main">
          Lưu và hiển thị
        </button>
      </div>
    </div>
    <!-- ========================== -->
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "themSalon",
  data() {
    return {
      listCategory: [
        {
          id:1,
          name: "Nhuộm"
        },
        {
          id:2,
          name: "Uấn"
        },
        {
          id:3,
          name: "Ép"
        },
        {
          id:4,
          name: "Xấy"
        },
      ],
      salon: {
        title: "",
        description: "",
        price: "",
        salonId: "",
        category: "",
        image: "",
      },
      errors: [],
      url: "",
    };
  },
  created() {
    this.salon.salonId = this.$route.params.addServiceId;
  },
  methods: {
    addService() {
      if (this.url == "") {
        this.$swal("", "Vui lòng thêm hình ảnh!", "warning");
      } else {
        let formData = new FormData();
        formData.append("title", this.salon.title);
        formData.append("description", this.salon.description);
        formData.append("price", this.salon.price);
        formData.append("salonId", this.salon.salonId);
        formData.append("category", this.salon.category);
        formData.append("image", this.salon.image);
        HTTP.post(`/salon/main/manage/service/store`, formData).then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.$swal("", result.message, "success");
            setTimeout(function() {
              history.back();
            }, 1000);
          } else {
            this.$swal("", result.message, "error");
          }
        });
      }
    },
    removeImage() {
      this.url = "";
    },
    onFileChange(e) {
      this.salon.image = e.target.files[0];
      this.url = URL.createObjectURL(this.salon.image);
    },
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
.table-input {
  padding: 5px 10px;
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
.bg1 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
</style>
