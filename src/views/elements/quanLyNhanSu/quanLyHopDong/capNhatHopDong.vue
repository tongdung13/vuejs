<template>
  <div class="col-md-10 res mb-5 mt-3">
    <!-- <router-link to="/donOffline">
      <span class="inputx color-main mr-3">+ Đơn ofline</span>
    </router-link>
    <router-link to="/xuatBaoCao">
      <span class="inputx color-main">Xuất báo cáo</span>
    </router-link> -->
    <h5 class="mt-3 font-weight-bold color-main">CẬP NHẬT HỢP ĐỒNG</h5>
    <!-- Thông tin người nhận -->
    <form @submit.prevent="updateContract">
      <!-- <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
        <h6>THÔNG TIN BÊN A</h6>
        <div class="mt-3 pb-2">
          <table class="table table-borderless">
            <tbody class="text-right">
              <tr>
                <td>
                  <div class="table-input">Họ và tên:</div>
                </td>
                <td>
                  <input type="text" placeholder="Họ và tên " class="w-100" />
                </td>
                <td>
                  <div class="table-input">Ngày sinh:</div>
                </td>
                <td>
                  <input type="date" class="w-100" />
                </td>
              </tr>
              <tr>
                <td style="width: 15%">
                  <div class="table-input">Địa chỉ:</div>
                </td>
                <td colspan="3" style="width: 85%">
                  <input type="text" placeholder="Địa chỉ " class="w-100" />
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
                    placeholder="Số điện thoại..."
                    class="w-100"
                    required
                  />
                </td>
                <td>
                  <div class="table-input">Email:</div>
                </td>
                <td>
                  <input
                    type="email"
                    class="w-100"
                    placeholder="Nhập email..."
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> -->
      <!-- ========================== -->

      <!-- Thong tin bán hàng -->
      <div class="mt-4 bg-8 pt-3 pb-3 pl-5 pr-5">
        <h6>THÔNG TIN HỢP ĐỒNG</h6>
        <div class="mt-3 pb-2">
          <table class="table table-borderless">
            <tbody class="text-right">
              <tr>
                <td style="width: 15%">
                  <div class="table-input">Loại hợp đồng:</div>
                </td>
                <td style="width: 30%">
                  <input
                    type="text"
                    class="w-100"
                    v-model="listContract.type_contract"
                    readonly
                  />
                </td>
                <td style="width: 15%">
                  <div class="table-input">thời hạn:</div>
                </td>
                <td style="width: 30%">
                  <input
                    type="text"
                    placeholder="Thời hạn... "
                    class="w-100"
                    v-model="listContract.timeout"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Công việc:</div>
                </td>
                <td style="width: 30%">
                  <input
                    type="text"
                    class="w-100"
                    placeholder="Công việc..."
                    v-model="listContract.work"
                  />
                </td>
                <td style="width: 15%">
                  <div class="table-input">Thời gian làm việc:</div>
                </td>
                <td>
                  <input
                    type="text"
                    class="w-100"
                    placeholder="Thời gian làm việc..."
                    v-model="listContract.worktime"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Mức lương:</div>
                </td>
                <td style="width: 30%">
                  <input
                    type="number"
                    class="w-100"
                    placeholder="Mức lương..."
                    v-model="listContract.salary"
                  />
                </td>
                <td style="width: 15%">
                  <div class="table-input">Phụ cấp:</div>
                </td>
                <td>
                  <input
                    type="text"
                    class="w-100"
                    placeholder="Phụ cấp..."
                    v-model="listContract.allowance"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Thưởng:</div>
                </td>
                <td style="width: 30%">
                  <input
                    type="text"
                    class="w-100"
                    placeholder="Thưởng..."
                    v-model="listContract.reward"
                  />
                </td>
                <td style="width: 15%">
                  <div class="table-input">Bảo hiểm lao động:</div>
                </td>
                <td>
                  <input
                    type="text"
                    class="w-100"
                    placeholder="Bảo hiểm lao động..."
                    v-model="listContract.insurrance"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3 text-center pb-3">
          <span @click="backPage" class="borderx hover mr-3 color-main"
            >Quay lại</span
          >
          <span class="borderx mr-2 hover color-main">Lưu</span>
          <button type="submit" class="borderx hover color-main">
            Lưu và hiển thị
          </button>
        </div>
      </div>
    </form>
    <!-- ================== -->
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "capNhatHopDong",
  data() {
    return {
      listContract: {},
    };
  },
  beforeMount() {
    this.listContracts();
  },
  methods: {
    // chi tiết hợp đồng
    listContracts() {
      let Code = window.location.href.slice(
        window.location.href.indexOf("/cap-nhat-hop-dong/") + 19,
        window.location.href.length
      );
      HTTP.get(`/salon/main/manage/contract/show/${Code}`)
        .then((response) => {
          // this.posts = response.data.data.data;
          this.listContract = response.data.data;
          console.log(this.listContract);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // // ==================

    // Cập nhật hợp đồng
    updateContract() {
      let contractId = window.location.href.slice(
        window.location.href.indexOf("/cap-nhat-hop-dong/") + 19,
        window.location.href.length
      );
      HTTP.put(
        `/salon/main/manage/contract/update/${contractId}`,
        this.listContract
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

label {
  padding: 25px 15px;
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
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
@media only screen and (max-width: 768px) {
  .borderx {
    padding: 5px 15px;
  }
}
</style>
