<template>
  <div class="col-md-10 pl-5 res mb-5 mt-3">
    <div class="mt-4 w-75 width-100" style="margin: 0 auto">
      <h5 class="color-main font-weight-bold" style="font-size: 16px">
        THÊM CHƯƠNG TRÌNH
      </h5>
      <div class="bg-16 p-3 mb-4">
        <h6>THÔNG TIN CƠ BẢN</h6>
        <div class="table-responsive">
          <form @submit.prevent="updateProgram">
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
                    class="inputx mr-3 res-margin-0"
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
                <td class="font-weight-bold text-right">Sản phẩm</td>
                <td>
                  <select
                    class="inputx mr-3 res-margin-0"
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
                <td class="display: flex">
                  <multiselect
                    v-model="myValue"
                    :options="myOptions"
                    mode="multiple"
                    placeholder="Chọn sản phẩm"
                    :searchable="true"
                    :trackBy="value"
                    :label="label"
                  >
                  </multiselect>
                  <!-- <div v-else class="inputx text-left">--Chọn sản phẩm--</div> -->
                </td>
              </tr>

              <tr>
                <td class="font-weight-bold text-right">Thời gian bắt đầu:</td>
                <td>
                  <input type="date" v-model="post.start_date" />
                </td>
              </tr>

              <tr>
                <td class="font-weight-bold text-right">Thời gian kết thúc:</td>
                <td><input type="date" v-model="post.end_date" /></td>
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
             @click="updateProgram"
            >
              Cập nhật
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
import Multiselect from "@vueform/multiselect";

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
      idProgram: "",
      listProduct: {},
      keySearch: "",
      listStore: {},
      myValue: [],
      myOptions: [{}],
    };
  },
  beforeMount() {
    this.getListStore();
    this.detailProgram();
  },
  methods: {
    detailProgram() {
      this.idProgram = this.$route.params.idProgram;
      HTTP.get("/salon/main/manage/marketing/1/" + this.idProgram).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.post = result.data;
          console.log(this.post);
          if(this.post.products[0].categories == 1) this.post.type_product = 1;
          else this.post.type_product = 2;
          this.getListAllProduct();
          for (let index = 0; index < this.post.products.length; index++) {
            this.myValue[index] = this.post.products[index].id;
            
          }
          
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },

    changeProduct() {
      this.myValue = [];
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
              if (this.post.type_product == 1)
                this.myOptions[index].label = data[index].name;
              else if (this.post.type_product == 2)
                this.myOptions[index].label = data[index].title;
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

    updateProgram() {
      this.post.product_id = this.myValue.join();
      console.log(this.post);
      HTTP.put(`/salon/main/manage/marketing/1/${this.idProgram}/update`, this.post, {}).then(
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
    getListProducts() {
      HTTP.get("/salon/main/manage/product?&condition=1&name=" + this.keySearch)
        .then((res) => {
          let result = res.data;
          // console.log(result);
          if (result.status === 1) {
            let data = result.data;
            // console.log(data);
            if (data.data.length > 0) {
              this.listProduct = data.data;
              this.post.product_id = this.listProduct[0].product_id;
            } else {
              this.$swal("", "Không tìm thấy sản phẩm!", "warning");
            }
          } else {
            this.notification.status = true;
            this.notification.message = result.message;
          }
          this.loading = false;
        })
        .catch((e) => {
          this.errors.push(e);
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
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
* {
  font-size: 12px;
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
  font-size: 12px;
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
</style>
