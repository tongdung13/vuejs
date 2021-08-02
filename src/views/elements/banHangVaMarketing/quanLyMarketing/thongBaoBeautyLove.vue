<template>
  <div class="col-md-10 pl-5 mb-5 res mt-3">
    <!-- <select
      name="cars"
      class="inputx mr-3"
      id="cars"
      style="width: 30%; outline: none"
    >
      <option value="volvo">Tất cả salon</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select> -->
    <!-- <router-link
      :to="{
        name: 'themChuongTrinh',
      }"
    >
      <span class="inputx color-main mr-3">+ Thêm chương trình</span>
    </router-link>
    <router-link to="/xuatBaoCao">
      <span class="inputx color-main">Xuất báo cáo</span>
    </router-link> -->
    <div class="color-main mt-3">
      <h5>THÔNG BÁO BEAUTY LOVE</h5>
    </div>
    <div class="row mt-3" v-if="hasData">
      <div class="col-md-9">
        <div class="bg p-3" style="border-radius: 16px; height: 100%">
          <div class="row">
            <div class="col-md-1 col-sm-1 col-2">
              <img
                src="../../../../assets/image/ava.png"
                alt=""
                style="width: 40px"
              />
            </div>
            <div class="col-md-9 col-sm-9 col-8">
              <span class="font-weight-bold">BOSS</span><br />
              <ul class="m-0">
                <li>
                  <span class="font-weight-bold"
                    >Quản trị viên
                    <img
                      src="../../../../assets/image/dot.png"
                      alt=""
                      class="pl-2 pr-2"
                    />
                  </span>
                </li>
                <li>
                  <span class="color-main">4 giờ trước </span>
                </li>
              </ul>
            </div>
            <div class="col-md-2 col-sm-2 col-2" style="text-align: right">
              <span class="dropdown" style="float: right; margin-top: -5px">
                <span class="dropbtn">
                  <img
                    src="../../../../assets/image/more-horizontal.png"
                    alt=""
                    style="width: 28px"
                    class="border1 p-1"
                  />
                </span>
                <div class="dropdown-content">
                  <router-link to="/quanLyThe">
                    <span>Danh sách khách hàng</span>
                  </router-link>
                  <router-link to="/quanLyThe/lichSuGiaoDich">
                    <span>Lịch sử giao dịch</span>
                  </router-link>
                  <router-link to="/quanLyThe/danhSachBaoCao">
                    <span>Danh sách báo cáo</span>
                  </router-link>
                  <router-view></router-view>
                </div>
              </span>
            </div>
          </div>
          <p class="mt-2">
            <span class="font-weight-bold"
              >Chào mừng bạn đến với ThienAnCo.ltd!</span
            ><br />
          </p>

          <p>
            Chúng tôi tạo ra các công nghệ và dịch vụ nhằm hỗ trợ mọi người kết
            nối với nhau, xây dựng cộng đồng và phát triển doanh nghiệp. Các
            Điều khoản này điều chỉnh việc bạn sử dụng Facebook, Messenger và
            các sản phẩm, tính năng, ứng dụng, dịch vụ, công nghệ cũng như phần
            mềm khác mà chúng tôi cung cấp (Sản phẩm của Facebook hoặc Sản
            phẩm), trừ khi chúng tôi nêu rõ là áp dụng các điều khoản riêng (và
            không áp dụng các điều khoản này). Các sản phẩm này do Facebook,
            Inc. cung cấp cho bạn.
          </p>

          <p>
            Chính sách dữ liệu của chúng tôi giải thích cách chúng tôi thu thập
            và sử dụng dữ liệu cá nhân của bạn để quyết định hiển thị cho bạn
            quảng cáo nào cũng như để cung cấp tất cả các dịch vụ khác được mô
            tả bên dưới. Bạn cũng có thể chuyển đến phần cài đặt bất kỳ lúc nào
            để xem lại các lựa chọn quyền riêng tư của mình đối với cách chúng
            tôi sử dụng dữ liệu của bạn.
          </p>
        </div>
      </div>
      <div class="col-md-3 margin-top-5">
        <div class="bg p-3" style="border-radius: 16px">
          <div class="row">
            <div class="col-md-12 col-sm-6 col-6">
              <h6 class="color-main">Đơn hàng</h6>
              <ul>
                <li>
                  <input type="checkbox" v-model="selectAll" @click="select" />
                </li>

                <li>
                  <b>Chọn tất cả</b>
                </li>
              </ul>
              <ul v-for="(i, index) in items" :key="index">
                <li>
                  <input type="checkbox" :value="i.id" v-model="selected" />
                </li>
                <li>
                  <img
                    src="../../../../assets/image/ava.png"
                    alt=""
                    style="width: 30px"
                  />
                </li>
                <li>
                  <b>{{ i.name }}</b>
                </li>
              </ul>
              <hr />
            </div>
            <div class="col-md-12 col-sm-6 col-6">
              <h6 class="color-main">Lịch hẹn</h6>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    v-model="selectAll1"
                    @click="select1"
                  />
                </li>

                <li>
                  <b>Chọn tất cả</b>
                </li>
              </ul>
              <ul v-for="(i, index) in items" :key="index">
                <li>
                  <input type="checkbox" :value="i.id" v-model="selected1" />
                </li>
                <li>
                  <img
                    src="../../../../assets/image/ava.png"
                    alt=""
                    style="width: 30px"
                  />
                </li>
                <li>
                  <b>{{ i.name }}</b>
                </li>
              </ul>
              <hr />
            </div>
          </div>
          <!-- ==== -->
        </div>
      </div>
    </div>
    <div v-else><b class="color-main">Chưa có thông báo Beauty Love.</b></div>
  </div>
</template>
<script>
export default {
  name: "thongBaoBeautyLove",
  
};
</script>
<style scoped>
ul {
  padding: 0;
}

ul li {
  display: inline;
}

.border-32 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 32px;
}

.border-32:hover,
.border-32 span:hover {
  background: #d4476f;
  color: white;
}

p {
  font-size: 14px;
}

.border-main {
  border: 1px solid #d4476f;
  box-sizing: border-box;
  border-radius: 4px;
}

span {
  font-size: 14px;
}

.bg {
  background: rgba(255, 255, 255, 0.4);
}

.icon {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 25px;
  margin-top: 6px;
}
.bg ul li {
  margin-right: 10px;
}
label {
  display: inline-block;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  color: black;
  border-radius: 0.3rem;
  cursor: pointer;
  padding: 28px;
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
  right: -15px;
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
