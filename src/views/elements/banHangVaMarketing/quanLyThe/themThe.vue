<template>
  <div class="col-md-10 res mb-5 mt-3">
    <h5 class="mt-3 font-weight-bold color-main">THÊM THẺ</h5>

    <!-- Thông tin bán hàng -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <form @submit.prevent="addCards">
        <h6>THÔNG TIN THẺ</h6>
        <div class="mt-3 pb-2">
          <table class="table table-borderless">
            <tbody class="text-right">
              <tr>
                <td style="width: 15%">Tên salon:</td>
                <td>
                  <select
                    name="salon_id"
                    class="inputx mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="addCard.salon_id"
                    @change="changeSalon"
                  >
                    <option value="">--Chọn Salon--</option>

                    <option
                      v-for="salon in listStore"
                      :key="salon.id"
                      :value="salon.id"
                    >
                      {{ salon.salon_name }}
                    </option>
                  </select>
                </td>
                <td style="width: 15%">VIP:</td>
                <td class="text-left">
                  <input
                    class="mr-2"
                    type="radio"
                    id="no"
                    name="vip"
                    value="0"
                    checked
                    v-model="addCard.vip"
                  />
                  <label for="no" class="mr-4"> Không</label>
                  <input
                    class="mr-2"
                    type="radio"
                    id="co"
                    name="vip"
                    value="1"
                    v-model="addCard.vip"
                  />
                  <label for="co"> Có </label>
                </td>
              </tr>
              <tr>
                <td style="width: 15%">
                  <div class="table-input">Loại thẻ:</div>
                </td>
                <td style="width: 30%">
                  <select
                    class="inputx mr-3"
                    style="width: 100%; outline: none"
                    v-model="addCard.type"
                    @change="changeType"
                  >
                    <option value="">--Loại thẻ--</option>
                    <option value="1">Thẻ tiền</option>
                    <option value="2">Thẻ giảm giá theo %</option>
                    <option value="3">Thẻ lượt</option>
                  </select>
                </td>
                <td style="width: 15%">Tên thẻ:</td>
                <td>
                  <input
                    type="text"
                    style="width: 100%"
                    placeholder="Tên thẻ..."
                    v-model="addCard.name_card"
                  />
                </td>
              </tr>
              <tr>
                <td style="width: 15%">Giá trị thẻ:</td>
                <td>
                  <div class="right-inner-addon input-container">
                    <span>VNĐ</span>
                    <input
                      type="text"
                      style="width: 100%"
                      min="0"
                      placeholder="Giá trị thẻ..."
                      v-model="addCard.price"
                    />
                  </div>
                </td>
                <td style="width: 15%">Giá mua thẻ:</td>
                <td>
                  <div class="right-inner-addon input-container">
                    <span>VNĐ</span>
                    <input
                      type="text"
                      style="width: 100%"
                      min="0"
                      placeholder="Giá mua thẻ..."
                      v-model="addCard.price_input"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td style="width: 15%">
                  <div class="table-input">Số lượng thẻ:</div>
                </td>
                <td style="width: 30%">
                  <div class="right-inner-addon input-container">
                    <span>Thẻ</span>
                    <input
                      type="number"
                      style="width: 100%"
                      min="0"
                      placeholder="Số lượng thẻ..."
                      v-model="addCard.amount"
                    />
                  </div>
                </td>
                <td>
                  <div class="table-input">Số lượt dùng:</div>
                </td>
                <td style="width: 30%">
                  <div class="right-inner-addon input-container">
                    <span>Lượt</span>
                    <input
                      type="number"
                      style="width: 100%"
                      min="0"
                      placeholder="Số lượt dùng..."
                      v-model="addCard.turn"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td style="width: 15%">
                  <div class="table-input">Màu thẻ:</div>
                </td>
                <td class="text-left" style="width: 30%">
                  <input
                    type="color"
                    class="p-0 text-left"
                    style="border: none"
                    v-model="addCard.color"
                  />
                </td>
                <td style="width: 15%">
                  <div class="table-input">Ngày hết hạn:</div>
                </td>
                <td>
                  <input
                    type="date"
                    class="w-100"
                    placeholder="Ngày hết hạn..."
                    v-model="addCard.end_at"
                  />
                </td>
              </tr>
              <tr>
                <td v-if="addCard.type == 2">
                  <div class="table-input">Số % giảm:</div>
                </td>
                <td v-if="addCard.type == 2" style="width: 30%">
                  <div class="right-inner-addon input-container">
                    <span>%</span>
                    <input
                      type="number"
                      style="width: 100%"
                      min="0"
                      max="100"
                      placeholder="Số % giảm..."
                      v-model="addCard.ratio"
                    />
                  </div>
                </td>
                <td v-if="addCard.type == 3">Dịch vụ</td>
                <td v-if="addCard.type == 3">
                  <div>
                    <div v-if="addCard.salon_id">
                      <select
                        class="inputx mr-3"
                        style="width: 100%; outline: none"
                        v-model="addCard.service_id"
                      >
                        <option value="">--Chọn dịch vụ--</option>
                        <option
                          :value="item.id"
                          v-for="(item, index) in listProducts"
                          :key="index"
                        >
                          {{ item.title }}
                        </option>
                      </select>
                    </div>
                    <div v-else>
                      <input
                        type="number"
                        style="width: 100%"
                        min="0"
                        max="100"
                        placeholder="Vui lòng chọn salon"
                        readonly
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3 text-center pb-3">
          <span @click="backPage" class="borderx hover mr-3 color-main">
            Quay lại
          </span>
          <button type="submit" class="borderx color-main">
            Lưu và hiển thị
          </button>
        </div>
      </form>
    </div>
    <!-- ================== -->
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "themThe",
  data() {
    return {
      addCard: {
        type: "",
        name_card: "",
        price: "",
        ratio: "",
        turn: "",
        amount: "",
        service_id: "",
        price_input: "",
        color: "#000000",
        salon_id: "",
        vip: "0",
        end_at: "",
      },
      listStore: {},
      listProducts: {},
    };
  },
  created() {
    HTTP.get("/salon/main/manage/branch/all").then((res) => {
      let result = res.data;
      if (result.status === 1) {
        let data = result.data;
        if (data.length > 0) {
          this.listStore = data;
        }
      }
    });
  },
  methods: {
    // Thêm thẻ
    addCards() {
      HTTP.post(`/salon/main/manage/card/store`, this.addCard).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.$swal("", result.message, "success");
          setTimeout(() => {
            history.back();
          }, 1000);
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // ================
    // khi click thay đổi loại thẻ
    changeType() {
      this.getListServices();
    },
    // ==========================
    // khi click thay đổi salon
    changeSalon() {
      this.getListServices();
    },
    // ==========================

    // Danh sách dịch vụ
    getListServices() {
      if (this.addCard.salon_id != "") {
        HTTP.get(
          `/salon/main/manage/form/${this.addCard.salon_id}/commission`
        ).then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.listProducts = result.data.services;
          }
        });
      }
    },
    // =================
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
input[type="radio"]:after {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}

input[type="radio"]:checked:after {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #d4476f;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
table td {
  vertical-align: middle;
}
</style>
