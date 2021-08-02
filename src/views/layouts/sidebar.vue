<template>
  <div
    class="col-md-2 p-0 min-height-37 w3-sidebar w3-bar-block w3-collapse"
    id="mySidebar"
    style="
      background-color: rgb(247, 247, 247);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      min-height: 95vh;
    "
    v-bind:style="{ display: isSidebar }"
  >
    <button
      class="font-weight-bold w3-bar-item w3-button w3-hide-large text-right"
      v-on:click="changeSidebar()"
    >
      Đóng &times;
    </button>
    <!-- Thông Báo -->
    <div class="bs-example" id="change">
      <div class="accordion" id="accordionExample">
        <div class="card">
          <div
            type="button"
            class="btn font-weight-bold p-0"
            data-toggle="collapse"
            data-target="#collapseOne"
          >
            <div class="card-header" id="headingOne">
              <h2 class="mb-0" style="position: relative">
                <h6 class="m-0 size_2 text-left">Thông báo</h6>
                <img
                  src="../../assets/image/Polygon1.png"
                  alt=""
                  class="icon"
                />
              </h2>
            </div>
          </div>
          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div class="card-body">
              <ul class="nav">
                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-donhang',
                    }"
                    tag="li"
                    active-class="active"
                    exact
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/Group13468.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Đơn Hàng</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-lichHen',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/Group13468.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Dịch vụ</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- BÁN HÀNG VÀ MARKETING -->
        <div class="card">
          <span
            type="button"
            class="btn font-weight-bold p-0"
            data-toggle="collapse"
            data-target="#collapseTwo"
          >
            <div class="card-header" id="headingTwo">
              <h2 class="mb-0" style="position: relative">
                <h6 class="m-0 size_2 text-left">Bán hàng và marketing</h6>
                <img
                  src="../../assets/image/Polygon1.png"
                  alt=""
                  class="icon"
                />
              </h2>
            </div>
          </span>
          <div
            id="collapseTwo"
            class="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample"
          >
            <div class="card-body">
              <ul class="nav" role="tablist">
                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'quanLySalon',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/3.png" alt="" />
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Quản lý Salon</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-thietKeSalon',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/4.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Thiết kế Salon</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-quanLyMarketing',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/5.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Quản lý marketing</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'quanLyThe',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/6.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Quản lý thẻ</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'baoCaoBanHang',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/7.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Báo cáo bán hàng</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-quan-ly-kho',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/8.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Quản lý kho</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-quanLyDichVu',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/10.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Quản lý dịch vụ</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-quanLyKhachHang',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/10.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Quản lý khách hàng</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- QUẢN LÝ NHÂN SỰ -->
        <div class="card">
          <span
            type="button"
            class="btn font-weight-bold p-0"
            data-toggle="collapse"
            data-target="#collapseThree"
          >
            <div class="card-header" id="headingThree">
              <h2 class="mb-0" style="position: relative">
                <h6 class="m-0 size_2 text-left">Quản lý nhân sự</h6>
                <img
                  src="../../assets/image/Polygon1.png"
                  alt=""
                  class="icon"
                />
              </h2>
            </div>
          </span>
          <div
            id="collapseThree"
            class="collapse"
            aria-labelledby="headingThree"
            data-parent="#accordionExample"
          >
            <div class="card-body">
              <ul class="nav" role="tablist">
                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'thongBaoNhanVien',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/11.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Thông báo nhân viên</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-quanLyNhanVien',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/11.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Quản lý nhân viên</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-quanLyChamCong',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/11.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Quản lý Chấm công</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-quanLyKPI',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/13.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Quản lý KPI</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-quanLyHoaHong',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/14.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Quản lý hoa hồng</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-quanLyHopDong',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/15.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Quản lý hợp đồng</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-lichTrinhDaoTao',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/16.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Lịch trình đào tạo</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>
                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-quyTrinhLamViec',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/17.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Quy trình làm việc</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- TÀI CHÍNH VÀ KẾ TOÁN -->
        <div class="card">
          <span
            type="button"
            class="btn font-weight-bold p-0"
            data-toggle="collapse"
            data-target="#collapseFour"
          >
            <div class="card-header" id="headingFour">
              <h2 class="mb-0" style="position: relative">
                <h6 class="m-0 size_2 text-left">Tài chính & kế toán</h6>
                <img
                  src="../../assets/image/Polygon1.png"
                  alt=""
                  class="icon"
                />
              </h2>
            </div>
          </span>
          <div
            id="collapseFour"
            class="collapse"
            aria-labelledby="headingFour"
            data-parent="#accordionExample"
          >
            <div class="card-body">
              <ul class="nav" role="tablist">
                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-quytienmat',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/18.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Tiền mặt và ngân hàng</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-phieuThuPhieuChi',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/19.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Phiếu thu, phiếu chi</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'baoCaoThuChi',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/20.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Báo cáo thu chi</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-phieuMuaHang',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/phieuMuaHang.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Phiếu mua hàng</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-baoCaoMuaHang',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/21.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Báo cáo mua hàng</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

              
                
                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'baoCaoHangHoa',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/baoCaoHangHoa.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Báo cáo hàng hoá</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-danhMucTaiSan',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/22.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span> Tài sản và vật dụng </span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>

                <li class="nav-item p-0">
                  <router-link
                    :to="{
                      name: 'index-taiChinhLaiLo',
                    }"
                    tag="li"
                    active-class="active"
                    class="nav-link nav-item p-0"
                  >
                    <h6 class="hao pl-4 m-0">
                      <div class="row pl-2">
                        <div class="col-md-2 col-sm-2 col-2 p-0">
                          <img src="../../assets/image/23.png" alt="" class="icon_img"/>
                        </div>
                        <div class="col-md-10 col-sm-10 col-10 text-left pl-0">
                          <span>Tài chính tạm tính lãi lỗ</span>
                        </div>
                      </div>
                    </h6>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- CỘNG ĐỒNG -->
        <div class="card">
          <span
            type="button"
            class="btn font-weight-bold p-0"
            data-toggle="collapse"
            data-target="#collapseFive"
          >
            <div class="card-header" id="headingFive">
              <router-link :to="{ name: 'congDong' }">
                <h2 class="mb-0" style="position: relative">
                  <h6 class="m-0 size_2 text-left">
                    <span class="text-dark">Cộng đồng</span>
                  </h6>
                </h2>
              </router-link>
            </div>
          </span>
        </div>
        <!-- Hết CỘNG ĐỒNG -->
      </div>
    </div>
    <!-- =============== -->
  </div>

  <div class="w3-main" style="margin-left: 16.6666667%">
    <div class="w3-teal">
      <button
        class="p-2 w3-button w3-teal w3-xlarge w3-hide-large"
        v-on:click="changeSidebar()"
      >
        &#9776;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      isSidebar: "block",
    };
  },
  methods: {
    changeSidebar() {
      if (this.isSidebar === "block") {
        this.isSidebar = "none";
      } else {
        this.isSidebar = "block";
      }
    },
  },
};
</script>
<style scoped>
a {
  background-color: transparent;
}
/* #mySidebar {
  width: 225px;
} */
#mySidebar::-webkit-scrollbar {
  width: 0;
  background-color: #f5f5f5;
}
a:active,
a:hover {
  outline-width: 0;
}
.w3-sidebar {
  height: 100%;
  width: 100%;
  background-color: #fff;
  position: fixed !important;
  z-index: 1;
  overflow: auto;
}
.w3-bar-block .w3-dropdown-hover,
.w3-bar-block .w3-dropdown-click {
  width: 100%;
}
.w3-bar-block .w3-dropdown-hover .w3-dropdown-content,
.w3-bar-block .w3-dropdown-click .w3-dropdown-content {
  min-width: 100%;
}
.w3-bar-block .w3-dropdown-hover .w3-button,
.w3-bar-block .w3-dropdown-click .w3-button {
  width: 100%;
  text-align: left;
  padding: 8px 16px;
}
.w3-main,
#main {
  transition: margin-left 0.4s;
}
.w3-bar {
  width: 100%;
  overflow: hidden;
}
.w3-center .w3-bar {
  display: inline-block;
  width: auto;
}
.w3-bar .w3-bar-item {
  padding: 8px 16px;
  float: left;
  width: auto;
  border: none;
  display: block;
  outline: 0;
}
.w3-bar .w3-dropdown-hover,
.w3-bar .w3-dropdown-click {
  position: static;
  float: left;
}
.w3-bar .w3-button {
  white-space: normal;
}
.w3-bar-block .w3-bar-item {
  width: 100%;
  display: block;
  /* padding: 8px 16px; */
  text-align: left;
  border: none;
  white-space: normal;
  float: none;
  outline: 0;
}
.w3-bar-block.w3-center .w3-bar-item {
  text-align: center;
}
.w3-block {
  display: block;
  width: 100%;
}
.w3-responsive {
  display: block;
  overflow-x: auto;
}
.w3-col.s1 {
  width: 8.33333%;
}
.w3-col.s2 {
  width: 16.66666%;
}
.w3-col.s3 {
  width: 24.99999%;
}
.w3-col.s4 {
  width: 33.33333%;
}
.w3-col.s5 {
  width: 41.66666%;
}
.w3-col.s6 {
  width: 49.99999%;
}
.w3-col.s7 {
  width: 58.33333%;
}
.w3-col.s8 {
  width: 66.66666%;
}
.w3-col.s9 {
  width: 74.99999%;
}
.w3-col.s10 {
  width: 83.33333%;
}
.w3-col.s11 {
  width: 91.66666%;
}
.w3-col.s12 {
  width: 99.99999%;
}
.w3-rest {
  overflow: hidden;
}
.w3-stretch {
  margin-left: -16px;
  margin-right: -16px;
}
.w3-content,
.w3-auto {
  margin-left: auto;
  margin-right: auto;
}
.w3-content {
  max-width: 980px;
}
.w3-auto {
  max-width: 1140px;
}
.w3-cell-row {
  display: table;
  width: 100%;
}
.w3-cell {
  display: table-cell;
}
.w3-cell-top {
  vertical-align: top;
}
.w3-cell-middle {
  vertical-align: middle;
}
.w3-cell-bottom {
  vertical-align: bottom;
}
.w3-hide {
  display: none !important;
}
.w3-show-block,
.w3-show {
  display: block !important;
}
.w3-show-inline-block {
  display: inline-block !important;
}
@media (max-width: 1205px) {
  .w3-auto {
    max-width: 95%;
  }
}
@media (max-width: 600px) {
  .w3-modal-content {
    margin: 0 10px;
    width: auto !important;
  }
  .w3-modal {
    padding-top: 30px;
  }
  .w3-dropdown-hover.w3-mobile .w3-dropdown-content,
  .w3-dropdown-click.w3-mobile .w3-dropdown-content {
    position: relative;
  }
  .w3-hide-small {
    display: none !important;
  }
  .w3-mobile {
    display: block;
    width: 100% !important;
  }
  .w3-bar-item.w3-mobile,
  .w3-dropdown-hover.w3-mobile,
  .w3-dropdown-click.w3-mobile {
    text-align: center;
  }
  .w3-dropdown-hover.w3-mobile,
  .w3-dropdown-hover.w3-mobile .w3-btn,
  .w3-dropdown-hover.w3-mobile .w3-button,
  .w3-dropdown-click.w3-mobile,
  .w3-dropdown-click.w3-mobile .w3-btn,
  .w3-dropdown-click.w3-mobile .w3-button {
    width: 100%;
  }
}
@media (max-width: 768px) {
  .w3-modal-content {
    width: 500px;
  }
  .w3-modal {
    padding-top: 50px;
  }
}
@media (min-width: 993px) {
  .w3-modal-content {
    width: 900px;
  }
  .w3-hide-large {
    display: none !important;
  }
  .w3-sidebar.w3-collapse {
    display: block !important;
  }
}
@media (max-width: 992px) and (min-width: 601px) {
  .w3-hide-medium {
    display: none !important;
  }
}
@media (max-width: 992px) {
  .w3-sidebar.w3-collapse {
    display: none;
  }
  .w3-main {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .w3-auto {
    max-width: 100%;
  }
}
li {
  display: block;
  font-size: 20px;
  /* border: 1px solid red; */
  /* padding: 0.3rem 1rem; */
  width: 100%;
  padding: 0;
  text-align: center;
  cursor: pointer;
}

.btn {
  border: none !important;
}

.card {
  border: none !important;
}

.icon {
  position: absolute;
  right: -7px;
  top: 40%;
}

.text {
  font-size: 14px;

  /* Gray 2 */

  color: #4f4f4f;
}

a:hover {
  text-decoration: none;
}

* {
  font-size: 14px;
}
.color-main {
  color: #d4476f;
}

.hao {
  color: black;
  padding: 0.65rem 1rem;
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

li span {
  /* display: block; */
  /* color: #d4476f; */
  /* text-align: center; */
  /* padding: 0 1em; */
  text-decoration: none;
  cursor: pointer;
}

.input,
input {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 5px 10px;
  outline: none;
}

::placeholder {
  color: #d4476f;
}

.card-body span {
  font-size: 14px;
  cursor: pointer;
}

.input1 {
  border: 1px solid #d4476f !important;
  box-sizing: border-box;
  border-radius: 4px;
  outline: none;
  padding: 5px;
}

table th,
td {
  font-size: 14px;
}

.active1 {
  background-color: rgba(212, 71, 111, 0.1);
  border-bottom: 2px solid #d4476f;
}

.active {
  background-color: rgba(212, 71, 111, 0.1);
  border-right: 2px solid #d4476f;
  padding: 0.6rem;
}

.active span {
  color: #d4476f;
}

.card-body h6:hover {
  background-color: rgba(212, 71, 111, 0.1);
  cursor: pointer;
}

.card-body {
  padding: 0 !important;
}

h6 {
  margin-bottom: 0;
  cursor: pointer;
}

.chat {
  width: 125px;
  height: 48px;
  border-radius: 8px;
  background-color: #d4476f;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  line-height: 48px;
  text-align: center;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
  position: fixed;
  bottom: 0;
  right: 0;
  cursor: pointer;
}

.card-header {
  border-bottom: none;
}
.w3-button {
  border: none;
  display: inline-block;
  padding: 0;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  background-color: inherit;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
}
.card-header {
  padding: 1rem 1rem;
}
.card-header h6 {
  font-weight: 1000;
}
.hao div span {
  font-weight: 500;
}
.icon_img {
  width: 17px;
}
@media only screen and (max-width: 768px) {
  .min-height-37 {
    min-height: 10vh !important;
  }
  #mySidebar {
    width: 135px;
  }
}
</style>
