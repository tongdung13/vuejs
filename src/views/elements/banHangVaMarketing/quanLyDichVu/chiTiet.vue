<template>
  <div class="col-md-10 pl-5 pr-0 mt-3 res-0">
    <div class="_1AsWWl00">
      <div class="orfer_detail">
        <p style="font-size: 120%" class="font-weight-bold">
          THÔNG TIN NGƯỜI NHẬN
        </p>
        <span>Họ và tên: {{ receiver.name }}</span
        ><br />
        <span>Số điện thoại: {{ receiver.phone }}</span
        ><br />
        <span>Địa chỉ: {{ receiver.address }} </span><br />
        <span>Email: {{ receiver.email }}</span>
      </div>
    </div>
    <div class="_1AsWWl"></div>
    <div style="font-size: 120%" class="font-weight-bold mt-3">
      THÔNG TIN NGƯỜI BÁN
    </div>
    <div class="row">
      <div class="col-md-12">
        <nav class="navbar navbar-expand-sm">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">
                <img
                  src="../../../../assets/image/ava.png"
                  alt=""
                  style="width: 22px"
                />
                <span class="pl-2 font-weight-bold">
                  {{ buyer.name }}
                </span>
              </a>
            </li>
            <li class="nav-item">
              <span class="nav-link" href="#">SDT: {{ buyer.phone }}</span>
            </li>
            <li class="nav-item">
              <span class="nav-link" href="#">Email: {{ buyer.email }}</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th colspan="2">Tên sản phẩm</th>
            <th>Trạng thái</th>
            <th>Voucher</th>
            <th>Số lượng</th>
            <th>Ghi chú</th>
            <th class="text-right">Tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in products" :key="index">
            <td>
              <img
                src="../../../../assets/image/30cd39cc5dd4a5798b6c25f8b66f05151.png"
                alt=""
                style="width: 35px"
              />
            </td>
            <td>{{ item.product_name }}</td>
            <td>{{ item.status_name }}</td>
            <td>{{ item.voucher }}</td>
            <td>X{{ item.amount }}</td>
            <td>{{ item.note }}</td>
            <td class="text-right color-main">{{ item.price }}Đ</td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />
    <table class="table table-bordered table-hover text-right">
      <tbody>
        <tr>
          <th style="width: 80%">Tổng tiền hàng</th>
          <th>{{ total }}</th>
        </tr>
        <tr>
          <td>Vận chuyển</td>
          <td>35.000Đ</td>
        </tr>
        <tr>
          <td>Giảm giá</td>
          <td>-35.000Đ</td>
        </tr>
        <tr>
          <td class="font-weight-bold">Tổng số tiền</td>
          <td style="font-size: 150%; color: #f18d9b; font-weight: bold">
            350.000Đ
          </td>
        </tr>
        <tr>
          <td>Hình thức thanh toán</td>
          <td>Thẻ ngân hàng</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

const token = localStorage.getItem("accessToken");
export default {
  name: "chiTietDichVu",
  data() {
    return {
      posts: [],
      detail: [],
      receiver: [],
      buyer: [],
      products: [],
      total: 0,
      errors: [],
    };
  },
  created() {
    let Code = window.location.href.slice(
      window.location.href.indexOf("/chi-tiet/") + 10,
      window.location.href.length
    );
    axios
      .get(
        `http://103.226.249.210:8006/api/salon/main/manage/order/${Code}/detail`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        // this.posts = response.data.data.data;
        this.detail = response.data.data;
        this.receiver = this.detail.receiver;
        this.buyer = this.detail.buyer;
        this.products = this.detail.products;

        // console.log(this.products[1].price);
        for (let i = 0; i < this.products.length; i++) {
          this.total += this.products[i].price;
          console.log(this.total);
          this.total = dynamicSort(100000);
        }
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
function dynamicSort(value) {
  var data = parseFloat(value)
    .toFixed(2)
    .toString()
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
    .replace(".00", " Đ");
  //console.log(data)
  return data;
}
</script>
<style scoped>
* {
  font-size: 14px;
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
</style>
