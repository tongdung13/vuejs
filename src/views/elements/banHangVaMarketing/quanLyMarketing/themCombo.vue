<template>
  <div class="col-md-10 pl-5 pr-5 mt-3">
    <div class="mt-4 w-75" style="margin: 0 auto">
      <h5 class="color-main font-weight-bold" style="font-size: 16px">
        THÊM COMBO
      </h5>
      <div class="bg-16 p-3">
        <h6>THÔNG TIN CƠ BẢN</h6>
        <div class="table-responsive">
          <table class="table table-bordered table-borderless">
            <tbody>
              <tr>
                <td class="font-weight-bold text-right">Tên combo:</td>
                <td colspan="2">
                  <input
                    type="text"
                    placeholder="Nhập tên combo"
                    class="w-100"
                  />
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold text-right">Mã combo:</td>
                <td colspan="2">
                  <input
                    type="text"
                    placeholder="Nhập mã combo"
                    class="w-100"
                  />
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold text-right">Thời gian:</td>
                <td>
                  <input type="date" placeholder="ngày bắt đầu:" />
                </td>
                <td>
                  <input type="date" placeholder="ngày bắt đầu:" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h6>THÔNG TIN MÃ GIẢM GIÁ</h6>
          <div class="table-responsive">
            <table class="table table-bordered table-borderless">
              <tbody>
                <tr>
                  <td class="font-weight-bold text-right">Loại mức giảm:</td>
                  <td>
                    <span class="bg-24 pt-2 pb-2 pr-4 pl-4">
                      Voucher toàn shop
                    </span>
                  </td>
                  <td>
                    <span class="bg-24 pt-2 pb-2 pr-4 pl-4">
                      Voucher sản phẩm
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-right">
                    Giới hạn đặt hàng:
                  </td>
                  <td colspan="2">
                    <input
                      type="text"
                      placeholder="Nhập giá trị"
                      class="w-100"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-right">Số lượng mã:</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Nhập số lượng"
                      class="w-100"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-right">Sản phẩm:</td>
                  <td>
                    <router-link to="/sanPhamThamGia">
                      <span class="bg-24 color-main" style="padding: 10px 15px"
                        >Sản phẩm tham gia</span
                      >
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row mt-2 mb-3 text-right">
          <div class="col-md-8">
            <span class="bg-24" style="padding: 10px 30px; background: white"
              >Huỷ</span
            >
          </div>
          <div class="col-md-4">
            <span class="bg-24" style="padding: 10px 30px; background: white"
              >Thêm mã giảm giá</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "themCombo",
};
</script>
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
