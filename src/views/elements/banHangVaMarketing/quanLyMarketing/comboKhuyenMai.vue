<template>
  <div class="col-md-10 pl-5 res mt-3">
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
    <router-link to="/xuatBaoCao">
      <span class="inputx color-main">Xuất báo cáo</span>
    </router-link>
    <div class="mt-3">
      <div class="bg-16 p-3">
        <div class="row">
          <div class="col-md-6">
            <h6 class="color-main">COMBO CỦA TÔI</h6>
          </div>
          <div class="col-md-6">
            <router-link :to="{ name: 'themCombo' }">
              <span class="input" style="float: right">Thêm combo</span>
            </router-link>
          </div>
        </div>
        <div class="bg5 mt-3 font-14 table-responsive">
          <table class="w-100 table-borderless table-striped">
            <thead>
              <tr
                class="border-table"
                style="
                  border-radius: 16px;
                  background-color: #d4476f;
                  color: white;
                  font-weight: 700;
                "
              >
                <th>Tên chương trình</th>
                <th>Loại combo</th>
                <th>Sản phẩm</th>
                <th>Trạng thái</th>
                <th>Thời gian</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Combo mỹ phẩm hàn quốc<br />
                  09138
                </td>
                <td>Mua 3 sản phẩm được<br />giảm giá 10%</td>
                <td>
                  <span class="images mr-1">
                    <input type="file" id="upload" hidden />
                    <label for="upload">Add</label>
                  </span>

                  <span class="images mr-1">
                    <input type="file" id="upload" hidden />
                    <label for="upload">Add</label>
                  </span>

                  <span class="images mr-1">
                    <input type="file" id="upload" hidden />
                    <label for="upload">Add</label>
                  </span>
                </td>
                <td class="text-success">Đang dùng</td>
                <td>01/01/2020 - 01/01/2021</td>
                <td>
                  <span>
                    <router-link
                      to="/quanLyMarketing/chuongTrinhCuaToi/chiTiet"
                    >
                      <span class="color-main">Chi tiết</span>
                    </router-link> </span
                  ><br />
                  <router-link to="/quanLyMarketing/chuongTrinhCuaToi/donHang">
                    <span class="color-main">Đơn hàng</span>
                  </router-link>
                </td>
              </tr>
              <tr>
                <td>
                  Combo mỹ phẩm hàn quốc<br />
                  09138
                </td>
                <td>Mua 3 sản phẩm được<br />giảm giá 10%</td>
                <td>
                  <span class="images mr-1">
                    <input type="file" id="upload" hidden />
                    <label for="upload">Add</label>
                  </span>

                  <span class="images mr-1">
                    <input type="file" id="upload" hidden />
                    <label for="upload">Add</label>
                  </span>

                  <span class="images mr-1">
                    <input type="file" id="upload" hidden />
                    <label for="upload">Add</label>
                  </span>
                </td>
                <td class="text-success">Đang dùng</td>
                <td>01/01/2020 - 01/01/2021</td>
                <td>
                  <span>
                    <router-link
                      to="/quanLyMarketing/chuongTrinhCuaToi/chiTiet"
                    >
                      <span class="color-main">Chi tiết</span>
                    </router-link> </span
                  ><br />
                  <router-link to="/quanLyMarketing/chuongTrinhCuaToi/donHang">
                    <span class="color-main">Đơn hàng</span>
                  </router-link>
                </td>
              </tr>
              <tr>
                <td>
                  Combo mỹ phẩm hàn quốc<br />
                  09138
                </td>
                <td>Mua 3 sản phẩm được<br />giảm giá 10%</td>
                <td>
                  <span class="images mr-1">
                    <input type="file" id="upload" hidden />
                    <label for="upload">Add</label>
                  </span>

                  <span class="images mr-1">
                    <input type="file" id="upload" hidden />
                    <label for="upload">Add</label>
                  </span>

                  <span class="images mr-1">
                    <input type="file" id="upload" hidden />
                    <label for="upload">Add</label>
                  </span>
                </td>
                <td class="text-success">Đang dùng</td>
                <td>01/01/2020 - 01/01/2021</td>
                <td>
                  <span>
                    <router-link
                      to="/quanLyMarketing/chuongTrinhCuaToi/chiTiet"
                    >
                      <span class="color-main">Chi tiết</span>
                    </router-link> </span
                  ><br />
                  <router-link to="/quanLyMarketing/chuongTrinhCuaToi/donHang">
                    <span class="color-main">Đơn hàng</span>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "comboKhuyenMai",
};
</script>
<style scoped>
span {
  font-size: 14px;
}

table th,
table td {
  padding: 10px;
}

.font-14 {
  font-size: 14px;
}

.bg-16 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}

.border-img {
  border-bottom-left-radius: 16px;
  border-top-left-radius: 16px;
}

.bg5 {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
}
.border-table {
  background: rgba(255, 255, 255, 0.56);
  /* new color */

  border: 1px solid #d4476f;
  box-sizing: border-box;
  border-radius: 8px;
}

.button {
  background: #d4476f;
  border-radius: 8px;
}

.border-8 {
  border: 1px solid #d4476f;
  box-sizing: border-box;
  border-radius: 8px;
}

.hover:hover {
  background: #d4476f;
  color: white;
}

.images {
  /* shape */

  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
}

label {
  display: inline-block;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  color: black;
  border-radius: 0.3rem;
  cursor: pointer;
  padding: 15px;
}
</style>
