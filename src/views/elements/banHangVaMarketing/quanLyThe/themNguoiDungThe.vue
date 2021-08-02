<template>
  <div class="col-md-10 res mb-5 mt-3">
    <h5 class="mt-3 font-weight-bold color-main">THÊM NGƯỜI DÙNG THẺ</h5>
    <!-- Thông tin salon -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <form @submit.prevent="addCustomerCard">
        <h6>THÔNG TIN KHÁCH HÀNG</h6>
        <div class="mt-3 pb-2 w-50 mx-auto">
          <table class="table table-borderless">
            <tbody class="text-right">
              <tr>
                <td style="width: 30%">
                  <div class="table-input">Tên khách hàng:</div>
                </td>
                <td>
                  <multiselect
                    v-model="selected"
                    :options="listCustommer"
                    :custom-label="nameWithLang"
                    :close-on-select="true"
                    :clear-on-select="true"
                    placeholder="--Nhập thông tin khách hàng--"
                    label="name"
                    track-by="id"
                    @select="onSelect($event)"
                  >
                  </multiselect>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Địa chỉ:</div>
                </td>
                <td>
                  <input
                    type="address"
                    id="address"
                    name="address"
                    class="w-100"
                    required
                    v-model="addCustomer.address"
                    readonly
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Giới tính:</div>
                </td>
                <td class=" text-left">
                  <input type="text" v-model="addCustomer.sex_name" readonly />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Số điện thoại:</div>
                </td>
                <td>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="0386632727"
                    class="w-100"
                    required
                    v-model="addCustomer.phone"
                    readonly
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3 text-center pb-3">
          <span @click="backPage" class="borderx mr-2 color-main">
            Quay lại
          </span>
          <button type="submit" class="borderx color-main">
            Lưu và hiển thị
          </button>
        </div>
      </form>
    </div>
    <!-- ========================== -->
  </div>
</template>
<script>
import { HTTP } from "@/main";
import Multiselect from "../../../modul/@suadelabs/vue3-multiselect";
export default {
  name: "themNguoiDung",
  components: { Multiselect },
  data() {
    return {
      selected: null,
      addCustomer: {
        card_id: "",
        user_id: "",
        name: "",
        sex: "",
        sex_name: "",
        phone: "",
        address: "",
      },
      listCustommer: [],
      options: [
        { text: "Nam", value: "1" },
        { text: "Nữ", value: "0" },
      ],
      errors: [],
      url: "account.avatar",
    };
  },
  created() {
    this.listCustommers();
    this.addCustomer.card_id = window.location.href.slice(
      window.location.href.indexOf("/them-nguoi-dung/") + 17,
      window.location.href.length
    );
  },
  methods: {
    addCustomerCard() {
      HTTP.post(
        `/salon/main/manage/card/${this.addCustomer.card_id}/customer/store`,
        this.addCustomer
      ).then((res) => {
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
    // ===================
    nameWithLang({ name, phone }) {
      return `${name} - ${phone} `;
    },

    // dánh sách khách dùng thẻ
    listCustommers() {
      HTTP.get(`/salon/main/manage/managerCustomer/4`).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.listCustommer = result.data.data;
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // =========================
    // trả về tên
    returnName(value) {
      let leng = this.listCustommer.length;
      for (let index = 0; index < leng; index++) {
        if (this.listCustommer[index].id == value) {
          this.addCustomer.name = this.listCustommer[index].name;
        }
      }
    },
    // =========================
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    // =============================

    onSelect(value) {
      this.addCustomer.user_id = value.id;
      this.addCustomer.name = value.name;
      this.addCustomer.address = value.address;

      if (value.sex == "Nữ") {
        this.addCustomer.sex = 0;
        this.addCustomer.sex_name = "Nữ";
      } else if ((value.sex = "Nam")) {
        this.addCustomer.sex = 1;
        this.addCustomer.sex_name = "Nam";
      }

      this.addCustomer.phone = value.phone;
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
</style>
<style
  src="../../../modul/@suadelabs/vue3-multiselect/dist/vue3-multiselect.css"
></style>
