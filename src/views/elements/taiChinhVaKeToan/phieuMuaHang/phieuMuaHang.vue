<template>
  <div class="col-md-10 pl-5 res mb-5 mt-3">
    <form @submit.prevent="addProduct">
      <div class="mt-4 bg-8 pt-3 pl-5 pr-5 pb-2">
        <h6 class="color-main font-weight-bold">THÊM SẢN PHẨM MỚI</h6>
        <div class="mt-3">
          <table class="table table-borderless">
            <tbody>
              <tr>
                <td style="width: 15%">Tên sản phẩm</td>
                <td>
                  <input
                    type="text"
                    v-model="name"
                    placeholder="Tên sản phẩm"
                    style="width: 100%"
                  />
                </td>
                <td style="width: 15%">Mã sản phẩm</td>
                <td>
                  <input
                    type="text"
                    placeholder="Mã sản phẩm"
                    style="width: 100%"
                    v-model="sku"
                  />
                </td>
              </tr>
              <tr>
                <td>Loại sản phẩm</td>
                <td style="width: 35%">
                  <select
                    class="inputx mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="category_id"
                    @change="changeCategory()"
                  >
                    <option
                      v-for="category in listCategory"
                      :key="category.id"
                      :value="category.id"
                    >
                      {{ category.title }}
                    </option>
                  </select>
                </td>
                <td>Danh mục con</td>
                <td>
                  <select
                    class="inputx mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="category_children_id"
                  >
                    <option
                      v-for="category in listChildrenCategory"
                      :key="category.id"
                      :value="category.id"
                    >
                      {{ category.title }}
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Giá Nhập:</td>
                <td>
                  <input
                    type="number"
                    placeholder="Giá nhập..."
                    style="width: 100%"
                    v-model="price_input"
                  />
                </td>
              </tr>
              <tr>
                <td>Giá bán:</td>
                <td>
                  <input
                    type="text"
                    placeholder="Giá sản phẩm"
                    style="width: 100%"
                    v-model="price"
                  />
                </td>
                <td>Giá khuyến mãi</td>
                <td>
                  <input
                    type="text"
                    placeholder="Giá khuyến mãi"
                    style="width: 100%"
                    v-model="price_sale"
                  />
                </td>
              </tr>

              <tr>
                <td>Khối lượng</td>
                <td>
                  <input
                    type="text"
                    placeholder="Đơn vị gram"
                    style="width: 100%"
                    v-model="weight"
                  />
                </td>
                <td>Dung tích</td>
                <td>
                  <input
                    type="text"
                    placeholder="Đơn vị mililiter"
                    style="width: 100%"
                    v-model="capacity"
                  />
                </td>
              </tr>

              <tr>
                <td>Thương hiệu</td>
                <td>
                  <select
                    class="inputx mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="trademark"
                  >
                    <option
                      v-for="item in listTrademark"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </td>
                <td>Xuất xứ</td>
                <td>
                  <select
                    class="inputx mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="producer"
                  >
                    <option
                      v-for="item in listProducer"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Mô tả</td>
                <td colspan="3">
                  <textarea
                    style="width: 100%"
                    rows="5"
                    placeholder="Thêm mô tả"
                    v-model="description"
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- ================== -->
      </div>
      <div class="mt-3">
        <div class="bg-8 pl-5 pr-5 pt-3">
          <h6>DANH SÁCH CÁC SALON NHẬP HÀNG</h6>
          <div class="mt-3">
            <div
              class="border-table mt-3"
              v-for="(item, index) in salons.length"
              :key="index"
            >
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td>Tên Salon</td>
                    <td style="width: 35%">
                      <select
                        name="salon_id"
                        class="inputx mr-3 res-margin-0"
                        style="width: 100%; outline: none"
                        v-model="salons[index].salon_id"
                        @change="getListBank(index, salons[index].salon_id)"
                      >
                        <option value="">--Chọn salon--</option>

                        <option
                          v-for="salon in listStore"
                          :key="salon.id"
                          :value="salon.id"
                        >
                          {{ salon.salon_name }}
                        </option>
                      </select>
                    </td>
                    <td colspan="2" class="text-right">
                      <span class="borderx hover" @click="removeSalon(index)"
                        >Xoá</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 15%">Tài khoản thanh toán:</td>
                    <td>
                      <select
                        class="inputx mr-3 res-margin-0"
                        style="width: 100%; outline: none"
                        v-model.lazy="salons[index].funds_id"
                      >
                        <option value="">--Chọn ngân hàng--</option>
                        <option
                          v-for="(item, index) in salons[index].listBanks"
                          :key="index"
                          :value="item.id"
                        >
                          {{ item.bank }}
                        </option>
                      </select>
                    </td>
                    <td style="width: 15%">Số lượng</td>
                    <td style="width: 35%">
                      <input
                        type="text"
                        placeholder="Số lượng sản phẩm"
                        style="width: 100%"
                        v-model="salons[index].amount"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td style="width: 15%">Giá bán</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Giá sản phẩm"
                        style="width: 100%"
                        v-model="salons[index].price"
                      />
                    </td>
                    <td style="width: 15%">Giá khuyến mãi</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Giá khuyến mãi"
                        style="width: 100%"
                        v-model="salons[index].price_sale"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-right mt-3">
              <span class="borderx font-weight-bold hover" @click="addSalon">
                Thêm salon
              </span>
            </div>
            <table class="table table-borderless mt-3">
              <tbody>
                <tr>
                  <td>
                    ảnh sản phẩm
                    <div class=" text-center">
                      <label
                        for="my-file"
                        style="padding: 10px 15px"
                        class="mt-3 hover"
                      >
                        Thêm ảnh
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple="multiple"
                        @change="previewMultiImage"
                        class="form-control-file"
                        id="my-file"
                        hidden
                      />
                    </div>
                  </td>
                  <td style="width: 85%;" class="border">
                    <form>
                      <div class="form-group ">
                        <div class=" p-2 mt-3">
                          <div class="row">
                            <div
                              v-if="preview_list.length <= 0"
                              class="col-md-4 col-sm-6 col-6"
                            >
                              <img
                                src="../../../../assets/image/pic1.png"
                                alt=""
                                style="width: 150px;"
                              />
                            </div>
                            <div
                              v-else
                              class="col-md-2 col-sm-6 col-6 mt-2"
                              id="preview"
                              v-for="(item, index) in preview_list"
                              :key="index"
                            >
                              <img
                                :src="item"
                                class="img-fluid"
                                style="height: 150px; width: 100%"
                              />
                              <div
                                class="remove-file"
                                style="
                                  position: absolute;
                                  top: -18px;
                                  right: 0;
                                  cursor: pointer;
                                "
                                v-on:click="removeFile(index)"
                              >
                                <img
                                  src="../../../../assets/image/xx.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-3 text-center pb-3">
            <router-link :to="{ name: 'quanLyKho' }">
              <button class="borderx mr-2 color-main">
                Quay lại
              </button>
            </router-link>
            <button
              type="submit"
              @click="submitFile"
              class="borderx color-main"
            >
              Lưu và hiển thị
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "QLK-themSanPham",
  data() {
    return {
      listCategory: "",
      listChildrenCategory: "",
      url: "",
      name: "",
      sku: "",
      category_id: "",
      category_children_id: "",
      price: "",
      price_sale: "",
      weight: "",
      price_input: "",
      capacity: "",
      trademark: "",
      producer: "",
      description: "",
      salons: [
        {
          salon_id: "",
          amount: "",
          price: "",
          price_sale: "",
          funds_id: "",
          listBanks: {},
        },
      ],
      listImage: [],
      preview_list: [],
      listBank: [],
      image_list: [],
      // Danh sách loại sản phẩm
      listCategory: {},
      // danh sách danh mục con
      listChildrenCategory: {},
      // danh sách nhãn hiệu
      listTrademark: {},
      // Danh sách nhà sản xuất
      listProducer: {},
      // Danh sách salon
      listStore: {},
    };
  },
  beforeMount() {
    this.listCategorys();
    this.listTrademarks();
    this.listProducers();
    this.getListStore();
  },
  methods: {
    onFileChange(e) {
      this.listImage = e.target.files[0];
      this.url = URL.createObjectURL(this.listImage);
    },
    removeFile() {
      this.url = "";
    },
    submitFile() {
      let formData = new FormData();

      formData.append("name", this.name);
      formData.append("sku", this.sku);
      formData.append("category_id", this.category_id);
      formData.append("category_children_id", this.category_children_id);
      formData.append("price", this.price);
      formData.append("price_sale", this.price_sale);
      formData.append("price_input", this.price_input);
      formData.append("weight", this.weight);
      formData.append("capacity", this.capacity);
      formData.append("trademark", this.trademark);
      formData.append("producer", this.producer);
      formData.append("description", this.description);
      for (let index = 0; index < this.salons.length; index++) {
        formData.append(
          "salons[ " + index + "][salon_id]",
          this.salons[index].salon_id
        );
        formData.append(
          "salons[ " + index + "][amount]",
          this.salons[index].amount
        );
        formData.append(
          "salons[ " + index + "][funds_id]",
          this.salons[index].funds_id
        );
        formData.append(
          "salons[ " + index + "][price]",
          this.salons[index].price
        );
        formData.append(
          "salons[ " + index + "][price_sale]",
          this.salons[index].price_sale
        );
      }
      for (var i = 0; i < this.image_list.length; i++) {
        let file = this.image_list[i];

        formData.append("listImage[" + i + "]", file);
      }

      HTTP.post(`/salon/main/manage/product/store`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          // this.content = "";
          this.$swal("", result.message, "success");
          this.$router.push({ name: "quanLyKho" });
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },

    // Thêm salon còn hàng
    addSalon() {
      this.salons.push({
        salon_id: "",
        amount: "",
        price: "",
        price_sale: "",
        funds_id: "",
        listBanks: {},
      });
    },
    removeSalon(key) {
      if (this.salons.length > 1) {
        this.salons.splice(key, 1);
      }
    },
    // ===================
    // Danh sách các ngân hàng
    getListBank(value, salon_id) {
      HTTP.get(`/salon/main/manage/funds?page=1&salon_id=${salon_id}`).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            let data = result.data.data;
            this.salons[value].listBanks = data;
          }
        }
      );
    },
    // =======================
    // tim danh muc con theo danh muc cha
    changeCategory() {
      var index = event.target.selectedIndex;
      this.listChildren(index);
      // console.log(index);
    },
    // list nhan hieu
    listTrademarks() {
      HTTP.get("/common/listTrademark").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listTrademark = data;
            // console.log(this.listTrademark);
            return this.listTrademark;
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },
    // list nha san xuat
    listProducers() {
      HTTP.get("/common/listProducer").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listProducer = data;
            // console.log(this.listProducer);
            return this.listProducer;
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },
    // list danh muc cha
    listCategorys() {
      HTTP.get("/common/listCategory").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listCategory = data;
            // console.log(this.listCategory);
            // return this.listCategory;
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },
    // list danh muc con
    listChildren(index) {
      HTTP.get("/common/listCategory").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listChildrenCategory = data[index].data;
            // console.log(this.listChildrenCategory);
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },
    // list cửa hàng
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
    backPage() {
      history.back();
    },
    previewMultiImage: function(event) {
      var input = event.target;
      var count = input.files.length + this.preview_list.length;
      var index = 0;
      if (count <= 6) {
        if (input.files) {
          while (count--) {
            var reader = new FileReader();
            reader.onload = (e) => {
              this.preview_list.push(e.target.result);
            };
            this.image_list.push(input.files[index]);
            reader.readAsDataURL(input.files[index]);
            index++;
          }
        }
      } else alert("Tối đa 6 ảnh");
    },
    removeFile(key) {
      this.preview_list.splice(key, 1);
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
textarea,
select {
  border: none !important;
}
.border-table {
  padding: 10px;
  border: 1px solid gray;
  border-radius: 4px;
}
.active_pro {
  background: #d4476f;
  color: white;
}
@media only screen and (max-width: 768px) {
  .borderx {
    padding: 5px 15px;
  }
}
</style>
