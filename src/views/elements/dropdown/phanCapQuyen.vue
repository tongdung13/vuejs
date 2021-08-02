<template>
  <div class="col-md-10 pr-5 mt-3">
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
    <router-link to="/themHoaHong">
      <span class="inputx color-main mr-3">+ Thêm hoa hồng</span>
    </router-link>
    <router-link to="/xuatBaoCao">
      <span class="inputx color-main">Xuất báo cáo</span>
    </router-link>
    <input
      type="text"
      placeholder="Tìm kiếm đơn hàng"
      style="width: 25%; position: relative; float: right; padding: 4px 10px"
    />
    <i
      class="fas fa-search color-main"
      style="position: absolute; top: 9px; right: 55px"
    ></i>
    <div class="mt-4">
      <div class="row">
        <div class="col-md-6">
          <h5 class="color-main font-weight-bold" style="font-size: 16px">
            PHÂN CẤP QUYỀN
          </h5>
        </div>
        <div class="col-md-6" style="text-align: right">
          <div style="text-align: right">
            <span class="input">
              <img src="../../../assets/image/Group1.png" alt="" />
              30/08/2020 - 02/09/2020
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <div class="row">
        <div class="col-md-2">
          <div class="bg">
            <div class="row p-1">
              <div class="col-3">
                <img
                  src="../../../assets/image/ava.png"
                  alt=""
                  style="width: 35px"
                />
              </div>
              <div
                class="col-md-9 font-weight-bold"
                style="display: flex; align-items: center"
              >
                Mark Zackerbug
              </div>
            </div>
          </div>
          <div class="bg mt-3">
            <div class="row p-1">
              <div class="col-3">
                <img
                  src="../../../assets/image/ava.png"
                  alt=""
                  style="width: 35px"
                />
              </div>
              <div
                class="col-md-9 font-weight-bold"
                style="display: flex; align-items: center"
              >
                Mark Zackerbug
              </div>
            </div>
          </div>
          <div class="bg mt-3">
            <div class="row p-1">
              <div class="col-3">
                <img
                  src="../../../assets/image/ava.png"
                  alt=""
                  style="width: 35px"
                />
              </div>
              <div
                class="col-md-9 font-weight-bold"
                style="display: flex; align-items: center"
              >
                Mark Zackerbug
              </div>
            </div>
          </div>
          <div class="bg mt-3">
            <div class="row p-1">
              <div class="col-3">
                <img
                  src="../../../assets/image/ava.png"
                  alt=""
                  style="width: 35px"
                />
              </div>
              <div
                class="col-md-9 font-weight-bold"
                style="display: flex; align-items: center"
              >
                Mark Zackerbug
              </div>
            </div>
          </div>
          <div class="bg mt-3">
            <div class="row p-1">
              <div class="col-3">
                <img
                  src="../../../assets/image/ava.png"
                  alt=""
                  style="width: 35px"
                />
              </div>
              <div
                class="col-md-9 font-weight-bold"
                style="display: flex; align-items: center"
              >
                Mark Zackerbug
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="bg1 p-3">
            <div class="row">
              <div class="col-md">
                <h6 class="color-main font-weight-bold" style="margin-top: 5px">
                  BỘ PHẬN SALON - BILL GATE
                </h6>
              </div>
              <div class="col-md text-right">
                <span class="color-main" style="font-size: 14px">
                  Chi tiết hoa hồng
                  <img
                    src="../../../assets/image/more-horizontal.png"
                    class="input ml-2"
                    alt=""
                    style="width: 42px"
                  />
                </span>
              </div>
            </div>
            <div class="mt-3">
              <div class="row">
                <div class="col-md-3">
                  <img
                    src="../../../assets/image/690d7faffadbbc8fd08ccc8bb8c4397803.png"
                    alt=""
                    style="width: 120px"
                  />
                </div>
                <div class="col-md-9">
                  <div>
                    <div id="accordion"></div>
                    <div id="accordion">
                      <div
                        id="headingTwo2"
                        class="bg p-2"
                        style="cursor: pointer"
                      >
                        <h5 class="mb-0">
                          <div
                            data-toggle="collapse"
                            data-target="#collapseTwo2"
                            aria-expanded="false"
                            aria-controls="#collapseTwo2"
                          >
                            HOA HỒNG THEO DỊCH VỤ
                            <span style="float: right">
                              <img
                                src="../../../assets/image/Polygon8.png"
                                alt=""
                                style="width: 14px"
                              />
                            </span>
                          </div>
                        </h5>
                      </div>
                      <div
                        id="collapseTwo2"
                        class="collapse show"
                        aria-labelledby="headingTwo2"
                        data-parent="#accordion"
                      >
                        <div class="card-body p-0">
                          <table
                            class="table table-borderless mt-2"
                            style="font-size: 500"
                          >
                            <tbody>
                              <tr>
                                <th
                                  scope="row"
                                  class="pl-0"
                                  style="padding-top: 6px !important"
                                >
                                  <img
                                    src="../../../assets/image/300cd39cc5dd4a5798b6c25f8b66f0515.png"
                                    alt=""
                                    style="width: 32px"
                                  />
                                </th>
                                <td>Gội đầu</td>
                                <td>01</td>
                                <td>100.000</td>
                                <td class="color-main text-right pr-0">
                                  10.000
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  class="pl-0"
                                  style="padding-top: 6px !important"
                                >
                                  <img
                                    src="../../../assets/image/30cd39cc5dd4a5798b6c25f8b66f05151.png"
                                    alt=""
                                    style="width: 32px"
                                  />
                                </th>
                                <td>Gội đầu</td>
                                <td>01</td>
                                <td>100.000</td>
                                <td class="color-main text-right pr-0">
                                  10.000
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  class="pl-0"
                                  style="padding-top: 6px !important"
                                >
                                  <img
                                    src="../../../assets/image/30cd39cc5dd4a5798b6c25f8b66f05151.png"
                                    alt=""
                                    style="width: 32px"
                                  />
                                </th>
                                <td>Gội đầu</td>
                                <td>01</td>
                                <td>100.000</td>
                                <td class="color-main text-right pr-0">
                                  10.000
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  class="pl-0"
                                  style="padding-top: 6px !important"
                                >
                                  <img
                                    src="../../../assets/image/30cd39cc5dd4a5798b6c25f8b66f05151.png"
                                    alt=""
                                    style="width: 32px"
                                  />
                                </th>
                                <td>Gội đầu</td>
                                <td>01</td>
                                <td>100.000</td>
                                <td class="color-main text-right pr-0">
                                  10.000
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div id="accordion">
                      <div
                        id="headingThree3"
                        class="bg p-2 mt-3"
                        style="cursor: pointer"
                      >
                        <h5 class="mb-0">
                          <div
                            data-toggle="collapse"
                            data-target="#collapseThree3"
                            aria-expanded="false"
                            aria-controls="#collapseThree3"
                          >
                            HOA HỒNG THEO SẢN PHẨM
                            <span style="float: right">
                              <img
                                src="../../../assets/image/Polygon8.png"
                                alt=""
                                style="width: 14px"
                              />
                            </span>
                          </div>
                        </h5>
                      </div>
                      <div
                        id="collapseThree3"
                        class="collapse show"
                        aria-labelledby="headingThree3"
                        data-parent="#accordion"
                      >
                        <div class="card-body p-0">
                          <table
                            class="table table-borderless mt-2"
                            style="font-size: 500"
                          >
                            <tbody>
                              <tr>
                                <th
                                  scope="row"
                                  class="pl-0"
                                  style="padding-top: 6px !important"
                                >
                                  <img
                                    src="../../../assets/image/30cd39cc5dd4a5798b6c25f8b66f05151.png"
                                    alt=""
                                    style="width: 32px"
                                  />
                                </th>
                                <td>Dầu gội ELVISTAR</td>
                                <td>01</td>
                                <td>100.000</td>
                                <td class="color-main text-right pr-0">
                                  10.000
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  class="pl-0"
                                  style="padding-top: 6px !important"
                                >
                                  <img
                                    src="../../../assets/image/30cd39cc5dd4a5798b6c25f8b66f05151.png"
                                    alt=""
                                    style="width: 32px"
                                  />
                                </th>
                                <td>Gội đầu</td>
                                <td>01</td>
                                <td>100.000</td>
                                <td class="color-main text-right pr-0">
                                  10.000
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  class="pl-0"
                                  style="padding-top: 6px !important"
                                >
                                  <img
                                    src="../../../assets/image/30cd39cc5dd4a5798b6c25f8b66f05151.png"
                                    alt=""
                                    style="width: 32px"
                                  />
                                </th>
                                <td>Gội đầu</td>
                                <td>01</td>
                                <td>100.000</td>
                                <td class="color-main text-right pr-0">
                                  10.000
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  class="pl-0"
                                  style="padding-top: 6px !important"
                                >
                                  <img
                                    src="../../../assets/image/30cd39cc5dd4a5798b6c25f8b66f05151.png"
                                    alt=""
                                    style="width: 32px"
                                  />
                                </th>
                                <td>Gội đầu</td>
                                <td>01</td>
                                <td>100.000</td>
                                <td class="color-main text-right pr-0">
                                  10.000
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div id="accordion">
                      <div
                        id="headingFour4"
                        class="bg p-2 mt-3"
                        style="cursor: pointer"
                      >
                        <h5 class="mb-0">
                          <div
                            data-toggle="collapse"
                            data-target="#collapseFour4"
                            aria-expanded="false"
                            aria-controls="#collapseFour4"
                          >
                            HOA HỒNG THEO MỐC CHI TIÊU
                            <span style="float: right">
                              <img
                                src="../../../assets/image/Polygon8.png"
                                alt=""
                                style="width: 14px"
                              />
                            </span>
                          </div>
                        </h5>
                      </div>
                      <div
                        id="collapseFour4"
                        class="collapse show"
                        aria-labelledby="headingFour4"
                        data-parent="#accordion"
                      >
                        <div class="card-body p-0">
                          <table
                            class="table table-borderless mt-2"
                            style="font-size: 500"
                          >
                            <tbody>
                              <tr>
                                <th
                                  scope="row"
                                  class="pl-0"
                                  style="padding-top: 6px !important"
                                >
                                  <img
                                    src="../../../assets/image/Group113688.png"
                                    alt=""
                                    style="width: 20px"
                                  />
                                </th>
                                <td>Bán 50 sản phẩm đầu tiên</td>
                                <td>100.000</td>
                                <td class="color-main text-right pr-0">
                                  10.000
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  class="pl-0"
                                  style="padding-top: 6px !important"
                                >
                                  <img
                                    src="../../../assets/image/scissors3.png"
                                    alt=""
                                    style="width: 20px"
                                  />
                                </th>
                                <td>Bán 50 sản phẩm đầu tiên</td>
                                <td>100.000</td>
                                <td class="color-main text-right pr-0">
                                  10.000
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  class="pl-0"
                                  style="padding-top: 6px !important"
                                >
                                  <img
                                    src="../../../assets/image/Group113688.png"
                                    alt=""
                                    style="width: 20px"
                                  />
                                </th>
                                <td>Bán 50 sản phẩm đầu tiên</td>
                                <td>100.000</td>
                                <td class="color-main text-right pr-0">
                                  10.000
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  class="pl-0"
                                  style="padding-top: 6px !important"
                                >
                                  <img
                                    src="../../../assets/image/scissors3.png"
                                    alt=""
                                    style="width: 20px"
                                  />
                                </th>
                                <td>Bán 50 sản phẩm đầu tiên</td>
                                <td>100.000</td>
                                <td class="color-main text-right pr-0">
                                  10.000
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div class="bg mt-3">
                      <div
                        class="color-main font-weight-bold pt-2 pb-2"
                        style="font-size: 14px"
                      >
                        <div class="row p-0">
                          <div class="col-md-6 color-main pl-4">
                            TỔNG THƯỞNG
                          </div>
                          <div class="col-md-6 color-main text-right pr-4">
                            5.000.000Đ
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 text-center">
          <div class="bg">
            <div
              class="color-main font-weight-bold pt-2 pb-2 text-center"
              style="font-size: 14px"
            >
              MÔ TẢ TRUY CẬP
            </div>
          </div>
          <!-- <div class="menu-right">
            <h5 class="p-3 mt-2">30SHINE BÌNH THẠNH: 25 Thưởng</h5>
            <h5 class="p-3">30SHINE BÌNH THẠNH: 25 Thưởng</h5>
            <h5 class="p-3">30SHINE BÌNH THẠNH: 25 Thưởng</h5>
            <h5 class="p-3">30SHINE BÌNH THẠNH: 25 Thưởng</h5>
            <h5 class="p-3">30SHINE BÌNH THẠNH: 25 Thưởng</h5>
            <h5 class="p-3">30SHINE BÌNH THẠNH: 25 Thưởng</h5>
            <h5 class="p-3">30SHINE BÌNH THẠNH: 25 Thưởng</h5>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
* {
  font-size: 12px;
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

ul li {
  display: inline-block;
}

.bg {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 47px;
}

.bg1 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
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
.inputx {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 5px 10px;
  outline: none;
  font-size: 12px;
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

.menu-right h5:hover {
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}
</style>
