<template>
  <div class="mt-3 w-100">
    <div style="width: 18.3%; float: left" class="width-100">
      <div class="row">
        <div class="col-md-12 col-sm-6 col-6">
          <div style="cursor: pointer">
            <div class="box text-center">
              <div class="row p-2">
                <div class="col-md-4 col-sm-4 col-4">
                  <span>
                    <img
                      src="../../../../assets/image/scissor1.png"
                      alt=""
                      class="bg1"
                      style="padding: 7px"
                    />
                  </span>
                </div>
                <div class="col-md-8 col-sm-8 col-8 text-left p-0">
                  <span>PHỤC VỤ</span><br />
                  <span class="color-main">1000 khách</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-sm-6 col-6 mt-2">
          <div style="cursor: pointer">
            <div class="box text-center">
              <div class="row p-2">
                <div class="col-md-4 col-sm-4 col-4">
                  <span>
                    <img
                      src="../../../../assets/image/scissor1.png"
                      alt=""
                      class="bg1"
                      style="padding: 7px"
                    />
                  </span>
                </div>
                <div class="col-md-8 col-sm-8 col-8 text-left p-0">
                  <span>DOANH THU</span><br />
                  <span class="color-main">100.000.000 </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-sm-6 col-6 mt-2">
          <div style="cursor: pointer">
            <div class="box text-center">
              <div class="row p-2">
                <div class="col-md-4 col-sm-4 col-4">
                  <span>
                    <img
                      src="../../../../assets/image/scissor1.png"
                      alt=""
                      class="bg1"
                      style="padding: 7px"
                    />
                  </span>
                </div>
                <div class="col-md-8 col-sm-8 col-8 text-left p-0">
                  <span>DATA KHÁCH</span><br />
                  <span class="color-main">100 Đơn vị</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-sm-6 col-6 mt-2">
          <div style="cursor: pointer">
            <div class="box text-center">
              <div class="row p-2">
                <div class="col-md-4 col-sm-4 col-4">
                  <span>
                    <img
                      src="../../../../assets/image/scissor1.png"
                      alt=""
                      class="bg1"
                      style="padding: 7px"
                    />
                  </span>
                </div>
                <div class="col-md-8 col-sm-8 col-8 text-left p-0">
                  <span>TĂNG ĐƠN</span><br />
                  <span class="color-main">200 khách hàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-sm-6 col-6 mt-2">
          <div style="cursor: pointer">
            <div class="box text-center">
              <div class="row p-2">
                <div class="col-md-4 col-sm-4 col-4">
                  <span>
                    <img
                      src="../../../../assets/image/scissor1.png"
                      alt=""
                      class="bg1"
                      style="padding: 7px"
                    />
                  </span>
                </div>
                <div class="col-md-8 col-sm-8 col-8 text-left p-0">
                  <span>KHÁCH HÀNG MỚI</span><br />
                  <span class="color-main">20 khách</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="float: right; width: 80%" class="box width-100">
      <div class="p-3">
        <div class="row">
          <div class="col-md">
            <h5>KPI BỘ PHẬN QUẢN LÝ</h5>
          </div>
          <div class="col-md text-right">
            <span class="bg2 p-1 pr-4 pl-4 color-main" style="cursor: pointer"
              >XUẤT BÁO CÁO</span
            >
          </div>
        </div>
        <table
          class="table table-striped text-left table-borderless"
          style="font-weight: 100"
        >
          <thead>
            <tr>
              <!-- <th style="text-align: right !important;"></th> -->
              <th colspan="2" style="text-align: center; width: 25%">
                Họ và tên
              </th>
              <th style="width: 20%">Phục vụ 100 khách</th>
              <th style="width: 40%">Tiến độ</th>
              <th colspan="2" style="width: 15%">Đạt được</th>
            </tr>
          </thead>
          <tbody style="font-weight: 700">
            <tr>
              <td style="text-align: right !important" class="pt-1">
                <img
                  src="../../../../assets/image/ava.png"
                  alt=""
                  width="33px"
                />
              </td>
              <td>John</td>
              <td>Phục vụ 100 khách</td>
              <td>
                <div class="bg3x">
                  <div class="bg3" :style="{ width: index + '%' }"></div>
                </div>
              </td>
              <td class="pl-3">
                {{ index }}
              </td>
              <td class="color-main" style="width: 5%">
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td style="text-align: right !important" class="pt-1">
                <img
                  src="../../../../assets/image/ava.png"
                  alt=""
                  width="33px"
                />
              </td>
              <td>John</td>
              <td>Phục vụ 100 khách</td>
              <td>
                <div class="bg3x">
                  <div class="bg3" :style="{ width: index + '%' }"></div>
                </div>
              </td>
              <td class="pl-3">
                {{ index }}
              </td>
              <td class="color-main" style="width: 5%">
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td style="text-align: right !important" class="pt-1">
                <img
                  src="../../../../assets/image/ava.png"
                  alt=""
                  width="33px"
                />
              </td>
              <td>John</td>
              <td>Phục vụ 100 khách</td>
              <td>
                <div class="bg3x">
                  <div class="bg3" :style="{ width: index + '%' }"></div>
                </div>
              </td>
              <td class="pl-3">
                {{ index }}
              </td>
              <td class="color-main" style="width: 5%">
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td style="text-align: right !important" class="pt-1">
                <img
                  src="../../../../assets/image/ava.png"
                  alt=""
                  width="33px"
                />
              </td>
              <td>John</td>
              <td>Phục vụ 100 khách</td>
              <td>
                <div class="bg3x">
                  <div class="bg3" :style="{ width: index + '%' }"></div>
                </div>
              </td>
              <td class="pl-3">
                {{ index }}
              </td>
              <td class="color-main" style="width: 5%">
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td style="text-align: right !important" class="pt-1">
                <img
                  src="../../../../assets/image/ava.png"
                  alt=""
                  width="33px"
                />
              </td>
              <td>John</td>
              <td>Phục vụ 100 khách</td>
              <td>
                <div class="bg3x">
                  <div class="bg3" :style="{ width: index + '%' }"></div>
                </div>
              </td>
              <td class="pl-3">
                {{ index }}
              </td>
              <td class="color-main" style="width: 5%">
                <input type="checkbox" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "boPhanQuanLy",
  data() {
    return {
      index: "60",
    };
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}

input:checked ~ .checkmark {
  background-color: #d4476f;
}

.active {
  background-color: #4423ff !important;
  /* background: linear-gradient(#8F41FF 50%, #4423FF 100%); */
}

.active .color1 {
  color: white;
}

.tab-pane {
  background: rgba(255, 255, 255, 0) !important;
}

.bg {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
}

.bg1 {
  background: #d4476f;
  border-radius: 8px !important;
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.bg2 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 47px;
}
.bg3x {
  border: 1px solid rgba(53, 53, 53, 0.56);
  width: 100%;
  height: 10px;
  border-radius: 8px;
}
.bg3 {
  height: 8px;
  background: #d4476f;
  border-radius: 8px;
}

ul {
  padding-left: 0;
}

ul li {
  display: inline-block;
}

.box {
  /* width: 200px; */
  /* height: 50px; */
  background: white;
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
}
table td {
  vertical-align: middle;
}
.bgc {
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}

.box img {
  border-radius: 50%;
}

.color1 {
  color: #1f1c8a;
}

.input,
input {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 5px 10px;
  outline: none;
}

.color-main {
  color: #d4476f;
}

input[type="checkbox"]:after {
  width: 15px;
  height: 15px;
  /* border-radius: 15px; */
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  border: 2px solid white;
}

input[type="checkbox"]:checked:after {
  width: 15px;
  height: 15px;
  /* border-radius: 15px; */
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #d4476f;
  content: "";
  display: inline-block;
  /* visibility: visible; */
  border: 2px solid white;
}
@media only screen and (max-width: 768px) {
  .width-28 {
    width: 28px !important;
  }
  .width-33 {
    width: 33.33% !important;
  }
  .width-100 {
    width: 100% !important;
  }
}
</style>
