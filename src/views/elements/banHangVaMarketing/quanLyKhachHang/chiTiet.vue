<template>
  <div class="col-md-10 pl-5 pr-5 mt-3">
    <div class="mt-4">
      <div class="row" style="margin-left: 0px">
        <div class="col-md-8">
          <h5 class="color-main font-weight-bold" style="font-size: 16px">
            THÔNG TIN KHÁCH HÀNG
          </h5>
        </div>
      </div>
      <div class="row mt-3" style="margin: 0 auto">
        <div class="col-md-3">
          <div
            class="bg"
            style="
              cursor: pointer;
              justify-content: center;
              align-items: center;
              display: flex;
              height: 159px;
            "
          >
            <img
              :src="detail.avatar"
              alt=""
              style="width: 130px; height: 130px; border-radius: 50%"
            />
          </div>
        </div>
        <div class="col-md-9 margin-top-5">
          <div class="bg p-3">
            <h6>THÔNG TIN CÁ NHÂN</h6>
            <div class="row">
              <div
                class="col-md-3 col-sm-3 col-12 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Họ và tên:
              </div>
              <div class="col-md-9 col-sm-9 col-12">
                <div class="bg3" style="font-weight: 700; cursor: pointer">
                  {{ detail.name }}
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div
                class="col-md-3 col-sm-3 col-12 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Ngày sinh:
              </div>
              <div class="col-md-4 col-sm-4 col-6">
                <div class="bg3" style="font-weight: 700; cursor: pointer">
                  {{ detail.birthday }}
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div
                class="col-md-3 col-sm-3 col-12 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Số điện thoại / email:
              </div>
              <div class="col-md-4 col-sm-3 col-12">
                <div class="bg3" style="font-weight: 700; cursor: pointer">
                  {{ detail.phone }}
                </div>
              </div>
              <div class="col-md-5 col-sm-5 col-12 margin-top-5">
                <div class="bg3" style="font-weight: 700; cursor: pointer">
                  {{ detail.email }}
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div
                class="col-md-3 col-sm-3 col-12 font-weight-bold"
                style="margin-top: 10px; text-align: right"
              >
                Địa chỉ liên hệ:
              </div>
              <div class="col-md-9 col-sm-9 col-12">
                <div class="bg3" style="font-weight: 700; cursor: pointer">
                  {{ detail.address }}
                </div>
              </div>
            </div>

            <!-- lịch sử giao dịch -->
            <div class="mt-2 bg-8 table-responsive">
              <h4
                class="text-center mt-3 font-weight-bold"
                style="font-size: 120%"
              >
                Lịch sử mua hàng
              </h4>
              <table class="text-center table table-borderless table-hover">
                <thead>
                  <tr>
                    <th>Tên dịch vụ</th>
                    <th>Ngày mua</th>
                    <th>Hình thức thanh toán</th>
                    <th>Đơn giá</th>
                  </tr>
                </thead>
                <tbody v-if="history.length > 0">
                  <tr v-for="(item, index) in history" :key="index">
                    <td class="font-weight-bold">{{ item.name }}</td>
                    <td>{{ formatDate(item.created_at) }}</td>
                    <td>{{ item.type_card }}</td>
                    <td class="color-main font-weight-bold">
                      {{ formatPrice(item.total_money) }}
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="4">{{msgHis}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- ======================= -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
import { formatDate } from "@/main";
import { formatPrice } from "@/main";
import loadingData from "@/components/loadingData";
export default {
  name: "chiTietKhachHang",
  components: {
    loadingData,
  },
  data() {
    return {
      loading: true,
      hasData: false,
      custommerId: "",
      msgHis: "",
      detail: {},
      history: [],
    };
  },
  created() {
    this.custommerId = window.location.href.slice(
      window.location.href.indexOf("/chi-tiet-khach-hang/") + 21,
      window.location.href.length
    );
    this.detailCustomer();
  },
  methods: {
    detailCustomer() {
      HTTP.get(
        `/salon/main/manage/managerCustomer/detail/${this.custommerId}`
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.loading = false;
          this.hasData = true;
          this.detail = result.data;
          if (result.data.history.length > 0) {
            this.history = result.data.history;
          } else this.msgHis = "Chưa có lịch sử mua hàng!!!";
          // console.log(this.history);
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
      });
    },
    formatDate,
    formatPrice,
  },
};
</script>
<style scoped>
* {
  font-size: 12px;
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
  min-height: 34px;
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
</style>
