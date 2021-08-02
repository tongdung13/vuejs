<template>
  <div class="col-md-10 mb-5 res mt-3">
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
        name: 'themMaGiamGia',
      }"
    >
      <span class="inputx color-main mr-3">+ Thêm khuyến mãi</span>
    </router-link>
    <div class="mt-3 text-a">
      <h6 class="color-main font-weight-bold">QUẢN LÝ MARKETING</h6>
      <div class="row">
        <div class="col-md-3 col-sm-12 col-12 margin-top-5">
          <div class="border1 bbb p-2">
            <router-link :to="{ name: 'chuongTrinhBeautyLove' }">
              <div class="row pl-2 pr-2">
                <div class="col-md-9 col-sm-9 col-9 pr-1">
                  <span class="font-weight-bold" style="cursor: pointer"
                    >Chương trình Beauty Love</span
                  ><br />
                  <p style="font-size: 13px">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem I
                  </p>
                </div>
                <div class="col-md-3 col-sm-3 col-3 p-0 mt-2 text-center">
                  <span class="bg pt-3 pb-3 p-2">
                    <img src="../../../../assets/image/Group13572.png" alt="" />
                  </span>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="col-md-3 margin-top-5">
          <div class="border1 bbb p-2">
            <router-link :to="{ name: 'thongBaoBeautyLove' }">
              <div class="row pl-2 pr-2">
                <div class="col-md-9 col-sm-9 col-9 pr-1">
                  <span class="font-weight-bold" style="cursor: pointer"
                    >Thông báo Beauty Love</span
                  ><br />
                  <p style="font-size: 13px">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem I
                  </p>
                </div>
                <div class="col-md-3 col-sm-3 col-3 p-0 mt-2 text-center">
                  <span class="bg pt-3 pb-3 p-2">
                    <img src="../../../../assets/image/Group13572.png" alt="" />
                  </span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="col-md-3 margin-top-5">
          <div class="border1 bbb p-2">
            <router-link :to="{ name: 'thongBaoCuaToi' }">
              <div class="row pl-2 pr-2">
                <div class="col-md-9 col-sm-9 col-9 pr-1">
                  <span class="font-weight-bold" style="cursor: pointer"
                    >Thông báo của tôi</span
                  ><br />
                  <p style="font-size: 13px">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem I
                  </p>
                </div>
                <div class="col-md-3 col-sm-3 col-3 p-0 mt-2 text-center">
                  <span class="bg pt-3 pb-3 p-2">
                    <img src="../../../../assets/image/Group13572.png" alt="" />
                  </span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <h6 class="color-main mt-4 font-weight-bold">CÔNG CỤ CỦA TÔI</h6>
      <div class="row">
        <div class="col-md-3">
          <router-link :to="{ name: 'chuongTrinhCuaToi' }">
            <div class="border1 bbb p-2">
              <div class="row pl-2 pr-2">
                <div class="col-md-9 col-sm-9 col-9 pr-1">
                  <span class="font-weight-bold" style="cursor: pointer"
                    >Khuyến mại tại salon</span
                  ><br />
                  <p style="font-size: 13px">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem I
                  </p>
                </div>
                <div class="col-md-3 col-sm-3 col-3 p-0 mt-2 text-center">
                  <span class="bg pt-3 pb-3 p-2">
                    <img src="../../../../assets/image/Group13572.png" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-md-3 margin-top-5">
          <router-link :to="{ name: 'maGiamGiaCuaToi' }">
            <div class="border1 bbb p-2">
              <div class="row pl-2 pr-2">
                <div class="col-md-9 col-sm-9 col-9 pr-1">
                  <span class="font-weight-bold" style="cursor: pointer"
                    >Khuyến mại trên app</span
                  ><br />
                  <p style="font-size: 13px">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem I
                  </p>
                </div>
                <div class="col-md-3 col-sm-3 col-3 p-0 mt-2 text-center">
                  <span class="bg pt-3 pb-3 p-2">
                    <img src="../../../../assets/image/Group13572.png" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-md-3 margin-top-5">
          <router-link :to="{ name: 'comboKhuyenMai' }">
            <div class="border1 bbb p-2">
              <div class="row pl-2 pr-2">
                <div class="col-md-9 col-sm-9 col-9 pr-1">
                  <span class="font-weight-bold" style="cursor: pointer"
                    >Khuyến mại theo combo</span
                  ><br />
                  <p style="font-size: 13px">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem I
                  </p>
                </div>
                <div class="col-md-3 col-sm-3 col-3 p-0 mt-2 text-center">
                  <span class="bg pt-3 pb-3 p-2">
                    <img src="../../../../assets/image/Group13572.png" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-md-3 margin-top-5">
          <router-link :to="{ name: 'pushThongBao' }">
            <div class="border1 bbb p-2">
              <div class="row pl-2 pr-2">
                <div class="col-md-9 col-sm-9 col-9 pr-1">
                  <span class="font-weight-bold" style="cursor: pointer"
                    >Push thông báo</span
                  ><br />
                  <p style="font-size: 13px">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem I
                  </p>
                </div>
                <div class="col-md-3 col-sm-3 col-3 p-0 mt-2 text-center">
                  <span class="bg pt-3 pb-3 p-2">
                    <img src="../../../../assets/image/Group13572.png" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "quanLyMarketing",
};
</script>
<style scoped>
/* * {
  font-size: 14px;
} */
ul {
  padding: 0;
}

ul li {
  display: inline;
}

.bbb:hover span {
  color: #d4476f;
}
.cmt {
  border-radius: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 32px;
}

a {
  text-decoration: none;
  color: black;
}

.border-main {
  border: 1px solid #d4476f;
  box-sizing: border-box;
  border-radius: 4px;
}

.text-a span {
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

.border1 {
  border: 1px solid #eeacbf;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  height: 100%;
}
.border1:hover {
  border: 1px solid #d4476f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: scale(1.02);
}
.bg {
  background: rgba(212, 71, 111, 0.16);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
</style>
