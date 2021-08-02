<template>
  <div class="col-md-10 pl-5 res mb-5 mt-3">
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
    <!-- <router-link to="/themSalon">
      <span class="inputx color-main mr-3">+ Thêm salon</span>
    </router-link> -->
    <router-link to="/xuatBaoCao">
      <span class="inputx color-main">Xuất báo cáo</span>
    </router-link>
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <h6>THÊM DỊCH VỤ</h6>
      <div class="mt-3">
        <table class="table table-borderless">
          <tbody>
            <tr>
              <td style="width: 15%">Tên dịch vụ</td>
              <td style="width: 85%">
                <input type="text" placeholder="Tên dich vụ" class="w-100" />
              </td>
            </tr>
            <tr>
              <td>Mô tả</td>
              <td>
                <textarea
                  style="width: 100%"
                  rows="5"
                  placeholder="Thêm mô tả"
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>Danh mục</td>
              <td>
                <div id="accordion">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="card">
                        <div class="card-header" id="One">
                          <h5 class="mb-0">
                            <span
                              data-toggle="collapse"
                              data-target="#collapseOne11"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Chăm sóc da
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" id="Two">
                          <h5 class="mb-0">
                            <span
                              class="collapsed"
                              data-toggle="collapse"
                              data-target="#collapseTwo22"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              Chắm sóc tóc
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" id="Three">
                          <h5 class="mb-0">
                            <span
                              class="collapsed"
                              data-toggle="collapse"
                              data-target="#collapseThree33"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              Chăm sóc cơ thể
                            </span>
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-8">
                      <div
                        id="collapseOne11"
                        class="collapse bg-8"
                        aria-labelledby="One"
                        data-parent="#accordion"
                      >
                        <div class="card-body">
                          <ul>
                            <li>Trang điểm mặt - Face</li>
                            <li>Trang điểm mặt - Face</li>
                            <li>Trang điểm mặt - Face</li>
                          </ul>
                        </div>
                      </div>
                      <div
                        id="collapseTwo22"
                        class="collapse bg-8"
                        aria-labelledby="Two"
                        data-parent="#accordion"
                      >
                        <div class="card-body">
                          <ul>
                            <li>Tẩy trang - Makeup Remover</li>
                            <li>Tẩy trang - Makeup Remover</li>
                            <li>Tẩy trang - Makeup Remover</li>
                            <li>Tẩy trang - Makeup Remover</li>
                            <li>Tẩy trang - Makeup Remover</li>
                          </ul>
                        </div>
                      </div>
                      <div
                        id="collapseThree33"
                        class="collapse bg-8"
                        aria-labelledby="Three"
                        data-parent="#accordion"
                      >
                        <div class="card-body">
                          <ul>
                            <li>Trang điểm môi - Lips</li>
                            <li>Trang điểm môi - Lips</li>
                            <li>Trang điểm môi - Lips</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td>Công nghệ</td>
              <td>
                <input
                  type="text"
                  placeholder="Công nghệ nhuộm xxx"
                  style="width: 31%"
                />
              </td>
            </tr>

            <tr>
              <td>Dung tích</td>
              <td>
                <input
                  type="text"
                  placeholder="Tên sản phẩm"
                  style="width: 31%"
                />
              </td>
            </tr>

            <tr>
              <td>Giới tính</td>
              <td>
                <input
                  type="text"
                  placeholder="Tên sản phẩm"
                  style="width: 31%"
                />
              </td>
            </tr>

            <tr>
              <td>Quy trình</td>
              <td>
                <input
                  type="text"
                  placeholder="Tên sản phẩm"
                  style="width: 31%"
                />
              </td>
            </tr>

            <tr>
              <td>Đối tượng</td>
              <td>
                <input type="text" placeholder="Tóc thằng" style="width: 31%" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mt-3">
      <div class="bg-8 pl-5 pr-5 pt-3">
        <h6>THÔNG TIN BÁN HÀNG</h6>
        <div class="mt-3">
          <table class="table table-borderless">
            <tbody>
              <tr>
                <td style="width: 15%">Giá cung cấp</td>
                <td>
                  <input
                    type="text"
                    placeholder="Nhập vào"
                    style="width: 31%"
                  />
                </td>
              </tr>
              <tr>
                <td>hương hiệu</td>
                <td>
                  <input
                    type="text"
                    placeholder="Tên sản phẩm"
                    style="width: 31%"
                  />
                </td>
              </tr>
              <tr>
                <td>Thương hiệu</td>
                <td>
                  <input
                    type="text"
                    placeholder="Tên sản phẩm"
                    style="width: 31%"
                  />
                </td>
              </tr>

              <tr>
                <td>ảnh sản phẩm</td>
                <td style="width: 100%">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-6">
                          <input type="file" id="upload" hidden />
                          <label for="upload">Thêm ảnh</label>
                        </div>
                        <div class="col-md-6">
                          <input type="file" id="upload" hidden />
                          <label for="upload">Thêm ảnh</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-3">Ảnh hoá đơn</div>
                        <div class="col-md-6">
                          <input type="file" id="upload" hidden />
                          <label for="upload">Thêm ảnh</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3 text-center pb-3">
          <span class="borderx mr-2 color-main">Lưu</span>
          <span class="borderx mr-2 color-main">Lưu và Ẩn</span>
          <span class="borderx color-main">Lưu và hiển thị</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "themDichVu",
};
</script>
<style scoped>
* {
  font-size: 12px;
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
  padding: 30px;
  font-size: 14px;
  border-radius: 16px;
  text-align: center;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.bg-8 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
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
</style>
