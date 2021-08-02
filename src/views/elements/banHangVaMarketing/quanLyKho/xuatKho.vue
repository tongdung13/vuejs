<template>
  <div class="col-md-10 res mb-5 mt-3">
    <!-- Thông tin nhân viên bán hàng -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <h6>XUẤT KHO</h6>
      <div class="mt-4 text-center mb-4">
        <span
          class="borderx mr-3"
          @click="activeXuatKho = 1"
          :class="{ active_cus: activeXuatKho == 1 }"
        >
          Xuất huỷ
        </span>
        <span
          class="borderx"
          @click="activeXuatKho = 2"
          :class="{ active_cus: activeXuatKho == 2 }"
        >
          Xuất khác
        </span>
      </div>
      <div class="w-75 mx-auto">
        <div
          class="mt-3 pb-2 border-table"
          v-for="(item, index) in formSubmits.length"
          :key="index"
        >
          <table class="table table-borderless">
            <tbody class="text-right">
              <tr>
                <td style="width: 18%;">
                  <div class="table-input">Chọn salon:</div>
                </td>
                <td style="width: 45%;">
                  <select
                    name="salon_id"
                    class="inputx mr-3 res-margin-0"
                    id="cars"
                    style="width: 100%; outline: none"
                    v-model="formSubmits[index].salon_id"
                  >
                    <option value="">--Chọn salon--</option>

                    <option
                      v-for="salon in listSalons"
                      :key="salon.id"
                      :value="salon.id"
                    >
                      {{ salon.salon_name }}
                    </option>
                  </select>
                </td>
                <td colspan="2">
                  <div>
                    <span class="borderx" @click="removeSalon(index)">Xoá</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="width: 18%;">
                  <div class="table-input">Số lượng:</div>
                </td>
                <td>
                  <input
                    type="text"
                    class="w-100"
                    placeholder="Số lượng..."
                    v-model="formSubmits[index].amount"
                  />
                </td>
                <td style="width: 18%;">
                  <div class="table-input">Ngày xuất:</div>
                </td>
                <td>
                  <input
                    type="date"
                    class="w-100"
                    v-model="formSubmits[index].input_date"
                  />
                </td>
              </tr>
              <tr>
                <td style="width: 18%;">
                  <div class="table-input">Lý do:</div>
                </td>
                <td colspan="3">
                  <textarea
                    class="w-100"
                    rows="4"
                    placeholder="Lý do..."
                    v-model="formSubmits[index].reason"
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-right mt-4">
          <span class="borderx" @click="addSalon">Thêm salon</span>
        </div>
        <div class="mt-3 text-center pb-3">
          <span @click="backPage" class="borderx mr-2 color-main"
            >Quay lại</span
          >
          <span @click="submitForm" class="borderx color-main">
            Xác nhận
          </span>
        </div>
      </div>
      <!-- ============================ -->
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  data() {
    return {
      activeXuatKho: 1,
      xuatKho_id: "",
      listSalons: {},
      formSubmits: [
        {
          salon_id: "",
          amount: "",
          date: "",
          reason: "",
          input_date: "",
        },
      ],
    };
  },
  created() {
    this.xuatKho_id = this.$route.params.xuatKhoId;
  },
  beforeMount() {
    this.getlistSalonProduct();
  },
  methods: {
    //   danh sách các salon
    getlistSalonProduct() {
      HTTP.get(`/salon/main/manage/product/${this.xuatKho_id}/detail`)
        .then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.listSalons = res.data.data.salons;
          } else {
            this.noti.msg = result.message;
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // =====================

    // thêm salon
    addSalon() {
      this.formSubmits.push({
        salon_id: "",
        amount: "",
        input_date: "",
        reason: "",
      });
    },
    removeSalon(key) {
      if (this.formSubmits.length > 1) {
        this.formSubmits.splice(key, 1);
      }
    },
    // ==============
    // submit data
    submitForm() {
      let formData = new FormData();
      formData.append("type", this.activeXuatKho);
      for (let index = 0; index < this.formSubmits.length; index++) {
        formData.append(
          "products[" + index + "][salon_id]",
          this.formSubmits[index].salon_id
        );
        formData.append(
          "products[" + index + "][amount]",
          this.formSubmits[index].amount
        );
        formData.append(
          "products[" + index + "][reason]",
          this.formSubmits[index].reason
        );
        formData.append(
          "products[" + index + "][input_date]",
          this.formSubmits[index].input_date
        );
      }
      HTTP.post(
        `/salon/main/manage/product/${this.xuatKho_id}/product-error`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then((res) => {
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
    },
    // ===========
    backPage() {
      history.back();
    },
  },
};
</script>
<style scoped>
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
.border-table {
  padding: 10px;
  border: 1px solid gray;
  border-radius: 4px;
}
.active_cus {
  background: #d4476f;
  color: white;
}
</style>
