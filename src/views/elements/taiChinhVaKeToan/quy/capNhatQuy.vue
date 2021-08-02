<template>
  <div class="col-md-10 pl-5 res mb-5 mt-3">
    <form @submit.prevent="updateFund">
      <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
        <h6 class="color-main font-weight-bold">CẬP NHẬT QUỸ VÀ TIỀN MẶT</h6>
        <div class="mt-3">
          <table class="table table-borderless">
            <tbody>
              <!-- <tr>
                <td style="width: 15%">Mã quỹ</td>
                <td>
                  <input
                    type="text"
                    placeholder="Mã quỹ"
                    style="width: 100%"
                    required
                    v-model="post.code"
                  />
                </td>
              </tr> -->

              <tr>
                <td>Tên ngân hàng</td>
                <td>
                  <select
                    class="inputx mr-3 res-margin-0"
                    id="cars salon"
                    style="width: 100%; outline: none"
                    required
                    v-model="post.bank"
                  >
                  <option value="">--- Chọn ngân hàng ---</option>
                    <option
                      v-for="(item,index) in listBank"
                      :key="item.id"
                      :value="index"
                    >
                      {{ item[0] }}
                    </option>
                  </select>
                </td>
                
                <td>Số tài khoản</td>
                <td style="width: 35%">
                  <input
                    type="number"
                    placeholder="Số tài khoản"
                    style="width: 100%"
                    required
                    v-model="post.account_number"
                    @keyup="checkSTK()"
                  />
                </td>
              </tr>

              <tr>
                <td>Số tiền</td>
                <td>
                  <input
                    type="text"
                    placeholder="Số tiền"
                    style="width: 100%"
                    required
                    v-model="post.money"
                  />
                </td>
                <td>Tài khoản</td>
                <td>
                  <input
                    type="text"
                    placeholder="tài khoản"
                    style="width: 100%"
                    required
                    v-model="post.account"
                  />
                </td>
               
              </tr>

              <tr>
                <td>Tên Salon</td>
                <td>
                  <select
                    class="inputx mr-3 res-margin-0"
                    id="cars salon"
                    style="width: 100%; outline: none"
                    required
                    v-model="post.salon_id"
                  >
                    <option
                      v-for="item in listStore"
                      :key="item.id"
                      :value="item.id"
                      
                    >
                      {{ item.salon_name }}
                    </option>
                  </select>
                </td>
                <!-- <td>Tên chủ quỹ</td>
                <td>
                  <input
                    type="text"
                    placeholder="Loại"
                    style="width: 100%"
                    required v-model="post.user_id"
                    readonly
                  />
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-3 text-center pb-3">
          <span @click="backPage" class="borderx mr-3 color-main"
            >Quay lại</span
          >
          <button class="borderx mr-2 color-main" type="submit">Lưu</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "capNhatQuy",
  data() {
    return {
      listStore: {},
      listBank: [],
      user: "",
      fundId: "",
      post: {
        account_number: "",
        bank: "",
        money: "",
        account: "",
        salon_id: "",
        user_id: "",
      },
    };
  },
  beforeMount() {
    this.getListStore();
    this.getListBank();
    this.detailFund();
  },
  methods: {
    // tim danh muc con theo danh muc cha
    changeStore() {
      let index = this.post.salon_id;

      HTTP.get("/salon/main/manage/branch/" + index + "/detail").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;
          // console.log(data.user_id);
          this.post.user_id = data.user_id;
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },

    getListBank() {
      HTTP.get("/salon/main/manage/form/bank").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;
          this.listBank = data;
          // console.log(this.listBank);
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
    },

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

    // tao moi san pham
    updateFund() {
      this.post.user_id = JSON.parse(localStorage.getItem("userInfo")).id;
      console.log(this.post);
      HTTP.put(`/salon/main/manage/funds/${this.fundId}/update`, this.post).then((res) => {
        let result = res.data;
        // console.log(result);
        if (result.status === 1) {
          // this.content = "";
          this.$swal("", result.message, "success");
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },

    detailFund(){
      this.fundId = this.$route.params.fundId;
       HTTP.get("/salon/main/manage/funds/"+this.fundId).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.post = data[0];
            console.log(this.post);
            for(var i=0; i<=this.listBank.length; i++){
              if(this.listBank[i][1] == this.post.code) this.post.bank = i;
            }
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
