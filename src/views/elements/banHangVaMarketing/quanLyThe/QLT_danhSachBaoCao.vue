<template>
  <div class="col-md-10 pl-5 pr-5 mt-3 font-14">
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
    <router-link to="/themThe">
      <span class="inputx color-main mr-3">+ Thêm thẻ</span>
    </router-link>
    <router-link to="/xuatBaoCao">
      <span class="inputx color-main">Xuất báo cáo</span>
    </router-link>
    <div class="mt-3">
      <div class="row">
        <div class="col-md-6 col-sm-12 col-12">
          <h5 class="color-main">QUẢN LÝ THẺ</h5>
        </div>
        <div class="col-md-6 col-sm-12 col-12 margin-top-5 text-right">
          <span class="mr-3" style="cursor: pointer" v-on:click="add()">
            <span class="border1 text-dark">Thêm khách hàng</span>
          </span>
          <a href="##" class="mr-3">
            <span class="border1 text-dark">Danh sách khách hàng</span>
          </a>
          <span class="dropdown" style="float: right; margin-top: -5px">
            <span class="dropbtn">
              <img
                src="../../../../assets/image/more-horizontal.png"
                alt=""
                style="width: 31px; padding: 5px !important"
                class="border1"
              />
            </span>
            <div class="dropdown-content">
              <router-link :to="{ name: 'quanLyThe' }">
                <span>Danh sách khách hàng</span>
              </router-link>
              <router-link :to="{ name: 'lichSuGiaoDich' }">
                <span>Lịch sử giao dịch</span>
              </router-link>
              <router-link :to="{ name: 'danhSachBaoCao' }">
                <span>Danh sách báo cáo</span>
              </router-link>
              <router-view></router-view>
            </div>
          </span>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-3">
          <select
            name="cars"
            class="border1 mr-3"
            id="cars"
            style="width: 100%; outline: none; color: #828282"
          >
            <option value="volvo">TẤT CẢ THẺ</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
          <div class="mt-3">
            <div class="bg-the p-3">
              <div class="row text-white">
                <div class="col-md-8">
                  <span>Thẻ tiền</span>
                  <h6>6.000.000Đ</h6>
                </div>
                <div class="col-md-4 text-right">
                  <img src="../../../../assets/image/Group13572.png" alt="" />
                </div>
              </div>
              <div class="row text-white" style="margin-top: 2rem">
                <div class="col-md-8">
                  <div>5282 3456 7890 1289</div>
                </div>
                <div class="col-md-4">
                  <div class="text-right">09/2021</div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <div class="bg-the p-3">
              <div class="row text-white">
                <div class="col-md-8">
                  <span>Thẻ tiền</span>
                  <h6>6.000.000Đ</h6>
                </div>
                <div class="col-md-4 text-right">
                  <img src="../../../../assets/image/Group13572.png" alt="" />
                </div>
              </div>
              <div class="row text-white" style="margin-top: 2rem">
                <div class="col-md-8">
                  <div>5282 3456 7890 1289</div>
                </div>
                <div class="col-md-4">
                  <div class="text-right">09/2021</div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <div class="bg-the p-3">
              <div class="row text-white">
                <div class="col-md-8">
                  <span>Thẻ tiền</span>
                  <h6>6.000.000Đ</h6>
                </div>
                <div class="col-md-4 text-right">
                  <img src="../../../../assets/image/Group13572.png" alt="" />
                </div>
              </div>
              <div class="row text-white" style="margin-top: 2rem">
                <div class="col-md-8">
                  <div>5282 3456 7890 1289</div>
                </div>
                <div class="col-md-4">
                  <div class="text-right">09/2021</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="bg1 p-3">
            <div class="row">
              <div class="col-md-6">
                <h6>
                  <span class="color-main"> DANH SÁCH BÁO CÁO - </span>
                  <span style="color: #3a49f9"> THẺ TIỀN </span>
                </h6>
              </div>
              <div class="col-md-6">
                <input
                  type="text"
                  placeholder="Tìm kiếm khách hàng"
                  style="
                    width: 75%;
                    position: relative;
                    float: right;
                    padding: 4px 10px;
                  "
                />
                <i
                  class="fas fa-search color-main"
                  style="position: absolute; top: 9px; right: 23px"
                ></i>
              </div>
            </div>

            <div class="mt-3">
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td class="font-weight-bold">CN001</td>
                    <td>Nguyễn Công Hảo</td>
                    <td>0386632727</td>
                    <td>20/05//2020</td>
                    <td class="color-main font-weight-bold">6.000.000</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">CN001</td>
                    <td>Nguyễn Công Hảo</td>
                    <td>0386632727</td>
                    <td>20/05//2020</td>
                    <td class="color-main font-weight-bold">6.000.000</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">CN001</td>
                    <td>Nguyễn Công Hảo</td>
                    <td>0386632727</td>
                    <td>20/05//2020</td>
                    <td class="color-main font-weight-bold">6.000.000</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "danhSachBaoCao",
};
</script>
<style scope>
.font-14 {
  font-size: 14px;
}

.border1 {
  border: 1px solid #d4476f;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 5px 10px;
  outline: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.56);
}

.bg1 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}

.bg-the {
  background: #ed713c;
  border-radius: 16px;
}

.dropbtn {
  color: white;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
