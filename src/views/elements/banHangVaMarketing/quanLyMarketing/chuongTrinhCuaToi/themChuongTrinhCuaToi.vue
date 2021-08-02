<template>
  <div class="col-md-10 pl-5 res mb-5 mt-3">
    <div class="mt-4 w-75 width-100" style="margin: 0 auto">
      <h5 class="color-main font-weight-bold" style="font-size: 16px">
        THÊM KHUYẾN MẠI TẠI SALON
      </h5>
      <div class="bg-16 p-3 mb-4">
        <h6>THÔNG TIN CƠ BẢN</h6>
        <div>
          <form @submit.prevent="addProgram">
            <table class="table table-bordered table-borderless">
              <tr>
                <td class="font-weight-bold text-right">Tên chương trình:</td>
                <td colspan="2">
                  <input
                    type="text"
                    placeholder="Nhập tên chương trình "
                    class="w-100"
                    v-model="post.title"
                  />
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold text-right">Mã code:</td>
                <td colspan="2">
                  <input
                    type="text"
                    placeholder="Nhập tên chương trình khuyến mãi"
                    class="w-100"
                    v-model="post.code"
                  />
                </td>
              </tr>

              <tr>
                <td class="font-weight-bold text-right">Tên salon</td>
                <td>
                  <select
                    class="inputx mr-3 res-margin-0 w-100"
                    style="outline: none"
                    v-model="post.salon_id"
                    @change="changeProduct"
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
              </tr>

              <tr>
                <td class="font-weight-bold text-right" style="width: 20%">
                  Sản phẩm
                </td>
                <td style="width: 40%">
                  <select
                    class="inputx mr-3 res-margin-0 w-100"
                    style="outline: none"
                    v-model="post.type_product"
                    @change="changeProduct"
                    v-if="post.salon_id"
                  >
                    <option value="">--Chọn loại sản phẩm--</option>
                    <option value="1">Sản phẩm</option>
                    <option value="2">Dịch vụ</option>
                  </select>
                  <div v-else class="inputx text-left">
                    --Chọn loại sản phẩm--
                  </div>
                </td>
                <td class="display: flex" style="width: 50%">
                  <multiselect
                    v-model="myValue"
                    :multiple="true"
                    :options="myOptions"
                    :custom-label="nameWithLang"
                    :select-all="true"
                    :clear-on-select="true"
                    placeholder="--Nhập ít nhất 1 kí tự--"
                    label="label"
                    track-by="value"
                    style="width: 100%"
                  >
                  </multiselect>

                  <!-- <div v-else class="inputx text-left">--Chọn sản phẩm--</div> -->
                </td>
              </tr>

              <tr>
                <td colspan="3">
                  <div class="row text-center">
                  <div class="col-6">
                    <span class="font-weight-bold mr-3">Thời gian bắt đầu:</span>
                  <input type="date" v-model="post.start_date" />
                  </div>
                  <div class="col-6">
                    <span class="font-weight-bold mr-3">Thời gian kết thúc:</span>
                  <input type="date" v-model="post.end_date" />
                  </div>
                </div>
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold text-right">Mô tả:</td>
                <td colspan="2">
                  <textarea
                    class="w-100"
                    rows="5"
                    v-model="post.description"
                    placeholder="Nhập mô tả ..."
                  />
                </td>
              </tr>
            </table>
          </form>
        </div>

        <div class="row mt-2 mb-3 float-right">
          <div class="mr-2">
            <router-link :to="{ name: 'chuongTrinhCuaToi' }">
              <button class="bg-24 pt-2 pb-2 pr-4 pl-4" style="border: none">
                Huỷ
              </button>
            </router-link>
          </div>
          <div class="mr-2">
            <button
              type="submit"
              class="bg-24 pt-2 pb-2 pr-4 pl-4"
              style="border: none"
              @click="addProgram"
            >
              Thêm mới
            </button>
          </div>
        </div>
        <br /><br />
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/main";
// import Multiselect from "@vueform/multiselect";
import Multiselect from "../../../../modul/@suadelabs/vue3-multiselect";

export default {
  name: "themChuongTrinhCuaToi",
  components: {
    Multiselect,
  },
  data() {
    return {
      post: {
        salon_id: "",
        product_id: "",
        type_product: "",
      },
      listProduct: {},
      keySearch: "",
      listStore: {},
      myValue: [],
      myOptions: [
        {
          value: "",
          label: "",
          selected: false,
        },
      ],
    };
  },
  beforeMount() {
    this.getListStore();
  },
  methods: {
    nameWithLang({ sku, label }) {
      return `${sku} — ${label}`;
    },

    changeProduct() {
      this.getListAllProduct();
    },
    getListAllProduct() {
      HTTP.get(
        "/salon/main/manage/form/products?type=" +
          this.post.type_product +
          "&salon_id=" +
          this.post.salon_id
      )
        .then((res) => {
          let result = res.data;

          if (result.status === 1) {
            let data = result.data;

            this.myOptions = data;
            for (var index = 0; index < data.length; index++) {
              this.myOptions[index].value = data[index].id;
              if (this.post.type_product == 1) {
                this.myOptions[index].label = data[index].name;
                this.myOptions[index].sku = data[index].sku;
              } else if (this.post.type_product == 2) {
                this.myOptions[index].label = data[index].title;
                this.myOptions[index].sku = data[index].id;
              }
            }
          } else {
            this.notification.status = true;
            this.notification.message = result.message;
          }
          this.loading = false;
        })
        .catch((e) => {
          // this.errors.push(e);
        });
    },

    addProgram() {
      // console.log(this.myValue[0].id);
      for (var i = 0; i < this.myValue.length; i++) {
        this.post.product_id += this.myValue[i].id + ",";
      }

      // console.log(this.post);
      // alert(1);
      HTTP.post(`/salon/main/manage/marketing/1/store`, this.post, {}).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            // this.content = "";
            this.$swal("", result.message, "success");
            history.back();
          } else {
            this.$swal("", result.message, "error");
          }
        }
      );
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
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
* {
  font-size: 14px;
}
.bg-16 {
  background: rgba(255, 255, 255, 0.56) !important;
}

.input {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 5px 10px;
  outline: none;
}

input,
textarea,
.bg3 {
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
  padding: 10px 15px;
  outline: none;
  border: none;
}
.bg-24 {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
}

.bg-24:hover {
  background: #d4476f;
  color: white;
}
.color-main {
  color: #d4476f;
}

ul li {
  display: inline-block;
}

.bg {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}

.bg1 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 47px;
}

.bg2 {
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
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

li a {
  display: block;
  color: #d4476f;
  text-align: center;
  padding: 0.5rem 1em;
  text-decoration: none;
  cursor: pointer;
}

.tab-pane {
  font-size: 14px;
}

li a:hover {
  color: #d4476f;
  text-decoration: none;
}

.active {
  background-color: rgba(212, 71, 111, 0.1);
  border-bottom: 2px solid #d4476f;
}
table td,
table th {
  vertical-align: middle;
}
span select {
  background: none;
  border: none;
}
input[type="date"] {
  padding: 9px !important;
}
</style>
<style
  src="../../../../modul/@suadelabs/vue3-multiselect/dist/vue3-multiselect.css"
></style>
