<template>
  <div class="col-md-10 res mb-5 mt-3 res-0">
    <div style="font-size: 120%" class="font-weight-bold mt-3">
      CẬP NHẬT SẢN PHẨM
    </div>
    <form @submit.prevent="updateProduct">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <td>
                <div>
                  <b>Ảnh sản phẩm</b>
                  <div class="mt-3">
                    <label
                      for="my-file"
                      style="padding: 10px 15px"
                      class="mt-3 hover"
                      >Thêm ảnh</label
                    >
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
                </div>
              </td>
              <td colspan="3">
                <div class="row">
                  <div
                    class="col-md-3 mt-3"
                    v-for="(item, index) in detail.images"
                    :key="index"
                  >
                    <img
                      :src="item.image"
                      alt="photo"
                      style="width: 150px; height: 150px; position: relative"
                    />
                    <img
                      src="../../../../assets/image/xx.png"
                      alt=""
                      @click="removeMultiImage(item.id)"
                      style="position: absolute; top: -7px; cursor: pointer"
                    />
                  </div>
                  <div
                    class="col-md-3 mt-3"
                    id="preview"
                    v-for="(item, index) in preview_list"
                    :key="index"
                  >
                    <img
                      :src="item"
                      class="img-fluid"
                      style="width: 150px; height: 150px; position: relative"
                    />
                    <img
                      src="../../../../assets/image/xx.png"
                      alt=""
                      @click="removeFile(index)"
                      style="position: absolute; top: -7px; cursor: pointer"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Tên sản phẩm</b></td>
              <td style="width: 35%">
                <input class="update" type="text" v-model="detail.name" />
              </td>
              <td style="width: 15%"><b>Mã sản phẩm</b></td>
              <td style="width: 35%">
                <input class="update" type="text" v-model="detail.sku" />
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Danh mục</b></td>
              <td>
                <select
                  class="inputx mr-3 res-margin-0"
                  style="width: 100%; outline: none"
                  v-model="detail.category_id"
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
              <td style="width: 15%"><b>Danh mục con</b></td>
              <td>
                <select
                  class="inputx mr-3 res-margin-0"
                  style="width: 100%; outline: none"
                  v-model="detail.category_children_id"
                >
                  <option
                    v-for="item in listChildrenCategory"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.title }}
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Giá nhập</b></td>
              <td>
                <input class="update" type="text" placeholder="VNĐ" v-model="detail.price_input" />
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Giá</b></td>
              <td>
                <input class="update" type="text" placeholder="VNĐ" v-model="detail.price" />
              </td>
              <td style="width: 15%"><b>Giá bán</b></td>
              <td>
                <input class="update" type="text" placeholder="VNĐ" v-model="detail.price_sale" />
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Dung tích</b></td>
              <td>
                <input class="update" type="text" v-model="detail.capacity" />
              </td>
              <td style="width: 15%"><b>Khối lượng</b></td>
              <td>
                <input class="update" type="text" v-model="detail.weight" />
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Nhãn hiệu</b></td>
              <td>
                <select
                  class="inputx mr-3 res-margin-0"
                  style="width: 100%; outline: none"
                  v-model="detail.trademark"
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
              <td style="width: 15%"><b>Nhà sản xuất</b></td>
              <td>
                <select
                  class="inputx mr-3 res-margin-0"
                  style="width: 100%; outline: none"
                  v-model="detail.producer"
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
              <td style="width: 15%"><b>Trạng thái</b></td>
              <td>
                <select
                  class="inputx mr-3 res-margin-0"
                  style="width: 100%; outline: none"
                  v-model="detail.status"
                >
                  <!-- <option value="">Danh mục con</option> -->

                  <option value="1">Đang bán</option>
                  <option value="0">Tạm dừng</option>
                </select>
              </td>
              <td style="width: 15%"><b>Mô tả</b></td>
              <td>
                <input
                  class="update"
                  type="text"
                  v-model="detail.description"
                />
              </td>
            </tr>
          </thead>
        </table>
        <div class="mt-4 text-center pb-3">
          <span @click="backPage" class="borderx mr-3 color-main"
            >Quay lại</span
          >
          <button type="submit" @click="submitImage" class="borderx color-main">
            Lưu
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { HTTP } from "@/main";
import { formatPrice } from "@/main";
export default {
  name: "capNhatSanPham",
  data() {
    return {
      detail: {},
      errors: [],
      producer: {},
      listCategory: {},
      listTrademark: {},
      listProducer: {},
      listChildrenCategory: {},
      preview_list: [],
      image_list: [],
      idCategory: '',
    };
  },
  beforeMount() {
    this.detailProduct();
    this.listCategorys();
    this.listTrademarks();
    this.listProducers();
  },
  methods: {
    previewMultiImage: function (event) {
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
    // Chi tiết sản phẩm
    detailProduct() {
      let Code = window.location.href.slice(
        window.location.href.indexOf("/cap-nhat-san-pham/") + 19,
        window.location.href.length
      );
      HTTP.get(`/salon/main/manage/product/${Code}/detail`).then((response) => {
        // this.posts = response.data.data.data;
        this.detail = response.data.data;
        this.idCategory = this.detail.category_children_id;
        this.listChildren(this.detail.category_id);
      });
    },
    changeCategory() {
      var index = event.target.value;
      this.listChildren(index);
      // console.log(index);
    },
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
    listCategorys() {
      HTTP.get("/common/listCategory").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listCategory = data;
          
            // console.log(this.listCategory);
            return this.listCategory;
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },
    listChildren(index) {
      HTTP.get("/common/listCategory").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            for(let i=0; i<data.length ; i++){
              if(data[i].id == index){
                 this.listChildrenCategory = data[i].data;
              }
            }
           
            // console.log(this.listChildrenCategory);
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },
    updateProduct() {
      let productId = window.location.href.slice(
        window.location.href.indexOf("/cap-nhat-san-pham/") + 19,
        window.location.href.length
      );
      HTTP.put(
        `/salon/main/manage/product/${productId}/update`,
        this.detail
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          // this.content = "";
          this.$swal("", result.message, "success");
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },

    // ẢNH sản phẩm
    // ========Thêm ảnh============

    submitImage() {
      let productId = window.location.href.slice(
        window.location.href.indexOf("/cap-nhat-san-pham/") + 19,
        window.location.href.length
      );
      let formData = new FormData();
      for (var i = 0; i < this.image_list.length; i++) {
        let file = this.image_list[i];

        formData.append("listImage[" + i + "]", file);
      }
      HTTP.post(`/salon/main/manage/product/${productId}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function () {})
        .catch(function () {
        });
    },
    // =========Xoá ảnh==============
    removeMultiImage(index) {
      let productId = window.location.href.slice(
        window.location.href.indexOf("/cap-nhat-san-pham/") + 19,
        window.location.href.length
      );
      this.$swal({
        title: "Xoá ảnh?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          HTTP.post(`/salon/main/manage/product/${productId}/delete_images`, {
            listIdImage: [index],
            _method: "delete",
          }).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              // this.$swal("Đã xoá!", result.message, "success");
              this.detailProduct();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    // ===============
    formatPrice,
    backPage() {
      history.back();
    },
  },

  // created() {
  //   let Code = window.location.href.slice(
  //     window.location.href.indexOf("/cap-nhat-san-pham/") + 19,
  //     window.location.href.length
  //   );
  //   HTTP.get(`/salon/main/manage/product/${Code}/detail`)
  //     .then((response) => {
  //       // this.posts = response.data.data.data;
  //       this.detail = response.data.data;
  //       // console.log(this.detail);
  //       this.updateProducts.images = this.detail.images;
  //       this.updateProducts["sku"] = this.detail.sku;
  //       this.updateProducts["name"] = this.detail.name;
  //       this.updateProducts["category_id"] = this.detail.category_id;
  //       // console.log(this.detail.category_id);
  //       this.listChildren(this.detail.category_id);
  //       this.updateProducts[
  //         "category_children_id"
  //       ] = this.detail.categoryChildrenName;
  //       this.updateProducts["price"] = this.detail.price;
  //       this.updateProducts["price_sale"] = this.detail.price_sale;
  //       this.updateProducts["weight"] = this.detail.weight;
  //       this.updateProducts["capacity"] = this.detail.capacity;
  //       this.updateProducts["trademark"] = this.detail.trademark;
  //       this.updateProducts["producer"] = this.detail.producer;
  //       this.updateProducts["status"] = this.detail.status;
  //       this.updateProducts["description"] = this.detail.description;
  //       // console.log(this.detail);
  //     })
  //     .catch((e) => {
  //       this.errors.push(e);
  //     });
  // },
};
</script>
<style scoped>
* {
  font-size: 14px;
}

label {
  display: inline-block;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  color: black;
  border-radius: 0.3rem;
  cursor: pointer;
  padding: 28px;
}
.update {
  /* border: none;
  background: none;
  box-shadow: none; */
  width: 100%;
}
ul {
  padding: 0;
  margin-top: 7px;
}
ul li a {
  color: black;
}
hr {
  margin-top: 0 !important;
}
.navbar {
  padding: 0;
}
._1AsWWl {
  height: 0.1875rem;
  width: 100%;
  background-position-x: -1.875rem;
  background-size: 7.25rem 0.1875rem;
  background-image: repeating-linear-gradient(
    45deg,
    #6fa6d6,
    #6fa6d6 33px,
    transparent 0,
    transparent 41px,
    #f18d9b 0,
    #f18d9b 74px,
    transparent 0,
    transparent 82px
  );
}
.orfer_detail {
  padding: 1.1875rem 1.5rem 1.625rem 0;
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
.table-responsive {
  overflow-x: hidden !important;
}

</style>
