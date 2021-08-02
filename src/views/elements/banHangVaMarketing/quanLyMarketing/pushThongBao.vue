<template>
  <div class="col-md-10 pl-5 mb-5 res mt-3">
    <select
      name="cars"
      class="inputx mr-3"
      id="cars"
      style="width: 30%; outline: none"
    >
      <option value="volvo">Tất cả salon</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
    <router-link
      :to="{
        name: 'themChuongTrinh',
      }"
    >
      <span class="inputx color-main mr-3">+ Thêm chương trình</span>
    </router-link>
    <span class="inputx color-main">Xuất báo cáo</span>
    <div class="color-main mt-3">
      <h5>PUSH THÔNG BÁO</h5>
    </div>
    <div class="row mt-3">
      <div class="col-md-9">
        <div class="bg p-3" style="border-radius: 16px; height: 100%">
          <div>
            <div class="mt-3 pb-2 w-75 mx-auto">
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td style="width: 20%;">Chọn salon:</td>
                    <td>
                      <select
                        name="salon_id"
                        class="inputx res-margin-0"
                        style="width: 100%; outline: none"
                        v-model="postData.salon_id"
                      >
                        <option value="">Tất cả salon</option>

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
                    <td>Tiêu đề:</td>
                    <td>
                      <textarea
                        name=""
                        id=""
                        rows="2"
                        class="w-100"
                        v-model="postData.title"
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>Nội dung:</td>
                    <td>
                      <textarea
                        name=""
                        id=""
                        rows="6"
                        class="w-100"
                        v-model="postData.content"
                      ></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-4 mb-4" style="float: right; clear: right">
              <span
                style="cursor: pointer"
                class="border-32 p-2 pl-4 pr-4 mr-3 color-main font-weight-bold"
                @click="backPage"
              >
                Quay lại
              </span>

              <span
                style="cursor: pointer"
                class="border-32 p-2 pl-4 pr-4 color-main font-weight-bold"
                @click="submitData"
              >
                PUSH THÔNG BÁO
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 margin-top-5">
        <div class="bg p-3" style="border-radius: 16px">
          <div class="row">
            <div class="col-md-12 col-sm-6 col-6">
              <h6 class="color-main">Đơn hàng</h6>
              <ul>
                <li>
                  <input type="checkbox" v-model="selectAll" @click="select" />
                </li>

                <li>
                  <b>Chọn tất cả</b>
                </li>
              </ul>
              <ul v-for="(i, index) in items" :key="index">
                <li>
                  <input type="checkbox" :value="i.id" v-model="selected" />
                </li>
                <li>
                  <img
                    src="../../../../assets/image/ava.png"
                    alt=""
                    style="width: 30px"
                  />
                </li>
                <li>
                  <b>{{ i.name }}</b>
                </li>
              </ul>
              <hr />
            </div>
            <div class="col-md-12 col-sm-6 col-6">
              <h6 class="color-main">Lịch hẹn</h6>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    v-model="selectAll1"
                    @click="select1"
                  />
                </li>

                <li>
                  <b>Chọn tất cả</b>
                </li>
              </ul>
              <ul v-for="(i, index) in items" :key="index">
                <li>
                  <input type="checkbox" :value="i.id" v-model="selected1" />
                </li>
                <li>
                  <img
                    src="../../../../assets/image/ava.png"
                    alt=""
                    style="width: 30px"
                  />
                </li>
                <li>
                  <b>{{ i.name }}</b>
                </li>
              </ul>
              <hr />
            </div>
          </div>
          <!-- ==== -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "pushThongBao",
  data() {
    return {
      items: [
        {
          id: "id1",
          name: "Công Hảo ",
          img: "../../../../assets/image/ava.png",
        },
        {
          id: "id2",
          name: "Jone Doe",
          img: "../../../../assets/image/ava.png",
        },
      ],
      selected: [],
      selected1: [],
      selectAll: false,
      selectAll1: false,
      preview: null,
      image: null,
      preview_list: [],
      image_list: [],
      postData: {
        salon_id: "",
        title: "",
        content: "",
      },
      listStore: {},
    };
  },
  beforeMount() {
    this.getListStore();
  },
  methods: {
    // Danh sách Salon
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
      });
    },
    // ====================

    // Gửi thông báo
    submitData() {
      HTTP.post(`/salon/main/manage/marketing/4/store`, this.postData).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            this.$swal("", result.message, "success");
          } else {
            this.$swal("", result.message, "error");
          }
        }
      );
    },
    // =============

    // Quay lại
    backPage() {
      this.$router.push({ name: "thongBaoCuaToi" });
    },
    // =========
    select() {
      this.selected = [];
      if (!this.selectAll) {
        for (let i in this.items) {
          this.selected.push(this.items[i].id);
        }
      }
    },
    select1() {
      this.selected1 = [];
      if (!this.selectAll1) {
        for (let i in this.items) {
          this.selected1.push(this.items[i].id);
        }
      }
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
ul {
  padding: 0;
}

ul li {
  display: inline;
}

.border-32 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 32px;
}

.border-32:hover,
.border-32 span:hover {
  background: #d4476f;
  color: white;
}

p {
  font-size: 14px;
}

.border-main {
  border: 1px solid #d4476f;
  box-sizing: border-box;
  border-radius: 4px;
}

span {
  font-size: 14px;
}

.bg {
  background: rgba(255, 255, 255, 0.4);
}

.icon {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 25px;
  margin-top: 6px;
}
.bg ul li {
  margin-right: 10px;
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
.dropbtn {
  color: white;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: -15px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
input[type="checkbox"] {
  font-family: auto !important;
}
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>
