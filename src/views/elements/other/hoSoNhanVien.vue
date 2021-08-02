<template>
  <div class="col-md-10 pr-5 mt-3">
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
            style="
              cursor: pointer;
              justify-content: center;
              align-items: center;
              display: flex;
              height: 159px;
            "
          >
            <img
              src="../../../assets/image/690d7faffadbbc8fd08ccc8bb8c4397803.png"
              alt=""
              style="width: 150px"
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
                  Nguyễn Công Hảo
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
                  01/01/2020
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
                  0386632222
                </div>
              </div>
              <div class="col-md-5 col-sm-5 col-12 margin-top-5">
                <div class="bg3" style="font-weight: 700; cursor: pointer">
                  nguyenconghao621997@gmail.com
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
                  hà đông hà nội
                </div>
              </div>
            </div>

            <!-- lịch sử giao dịch -->
            <div class="mt-2 bg-8 table-responsive">
              <table class="text-center table table-borderless table-hover">
                <thead>
                  <tr>
                    <th colspan="4">Lịch sử giao dịch</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="font-weight-bold">Nhuộm tóc ABC</td>
                    <td>01/01/2020</td>
                    <td>Thẻ giảm giá</td>
                    <td class="color-main font-weight-bold">3.456.123Đ</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Nhuộm tóc ABC</td>
                    <td>01/01/2020</td>
                    <td>Thẻ giảm giá</td>
                    <td class="color-main font-weight-bold">3.456.123Đ</td>
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
export default {
  name: "hoSoNhanVien",
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
