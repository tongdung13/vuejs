import {
    createRouter,
    createWebHistory
} from "vue-router";
import store from "../store";

const routes = [{
        path: "/auth",
        redirect: "/auth/dang-nhap",
        component: () =>
            import ("../views/elements/authenticate/index"),
        children: [{
                path: "dang-nhap",
                name: "login",
                component: () =>
                    import ("../views/elements/authenticate/login")
            },
            {
                path: "ho-tro",
                name: "support",
                component: () =>
                    import ("../views/elements/authenticate/hoTro")
            },
            {
                path: "dang-ky",
                name: "register",
                component: () =>
                    import ("../views/elements/authenticate/register")
            },
            {
                path: "dang-ky-2",
                name: "register-2",
                component: () =>
                    import ("../views/elements/authenticate/register2")
            },
            {
                path: "otp",
                name: "otp",
                component: () =>
                    import ("../views/elements/authenticate/OTP")
            },
            {
                path: "otp-forgot-password",
                name: "otpForgot",
                component: () =>
                    import ("../views/elements/authenticate/otp_forgot")
            },
            {
                path: "new-password",
                name: "newPassword",
                component: () =>
                    import ("../views/elements/authenticate/newPassword")
            },
            {
                path: "register-success",
                name: "register-success",
                component: () =>
                    import ("../views/elements/authenticate/register-success")
            },
            {
                path: "quen-mat-khau",
                name: "forgotPassword",
                component: () =>
                    import ("../views/elements/authenticate/forgotPassword")
            }
        ]
    },
    {
        path: "/",
        redirect: "don-hang",
        name: "pageMain",
        component: () =>
            import ("../views/layouts/main"),
        meta: {
            requiresAuth: true
        },
        props: true,
        children: [
            // Đơn hàng
            {
                path: "/don-hang",
                name: "index-donhang",
                redirect: "/don-hang/danh-sach",
                component: () =>
                    import ("../views/elements/donhang/index"),
                children: [{
                        path: "danh-sach",
                        name: "danhsachdonhang",
                        component: () =>
                            import ("../views/elements/donhang/donHang")
                    },
                    {
                        path: "don-offline",
                        name: "donOffline",
                        component: () =>
                            import ("../views/elements/donhang/donOffline")
                    },
                    {
                        path: "xuat-bao-cao",
                        name: "xuatBaoCao",
                        component: () =>
                            import ("../views/elements/donhang/xuatBaoCao")
                    },
                    {
                        path: "chi-tiet/:donHangId",
                        name: "chitietdonhang",
                        component: () =>
                            import ("../views/elements/donhang/chitiet")
                    }
                ]
            },

            //Lịch hẹn
            {
                path: "/lich-hen",
                name: "index-lichHen",
                redirect: "/lich-hen/danh-sach",
                component: () =>
                    import ("../views/elements/lichHen/index"),
                children: [{
                        path: "danh-sach",
                        name: "danhSachLichHen",
                        component: () =>
                            import ("../views/elements/lichHen/lichHen")
                    },
                    {
                        path: "them-dich-vu",
                        name: "dichVuOffline",
                        component: () =>
                            import ("../views/elements/lichHen/dichVuOffline")
                    },
                    {
                        path: "xuat-bao-cao",
                        name: "xuatBaoCao",
                        component: () =>
                            import ("../views/elements/donhang/xuatBaoCao")
                    },
                    {
                        path: "chi-tiet/:lichHenId",
                        name: "chiTietLichHen",
                        component: () =>
                            import ("../views/elements/lichHen/chiTietLichHen")
                    }
                ]
            },

            // =============BÁN HÀNG VÀ MARKETING===========

            // Quản lý salon
            {
                path: "/quan-ly-salon",
                name: "quanLySalon",
                component: () =>
                    import ("../views/elements/banHangVaMarketing/quanLySalon")
            },

            // thiết kế salon
            {
                path: "/thiet-ke-salon",
                name: "index-thietKeSalon",
                redirect: "/thiet-ke-salon/danh-sach-thiet-ke-salon",
                component: () =>
                    import ("../views/elements/banHangVaMarketing/thietKeSalon/index"),
                children: [{
                        path: "danh-sach-thiet-ke-salon",
                        name: "danhSachThietKeSalon",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/thietKeSalon/thietKeSalon"
                            )
                    },
                    {
                        path: "them-salon",
                        name: "themSalon",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/thietKeSalon/themSalon"
                            )
                    },
                    {
                        path: "sua-salon/:brandID",
                        name: "chinhSuaSalon",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/thietKeSalon/chinhSuaSalon"
                            )
                    },
                    {
                        path: "chi-tiet-thiet-ke-salon/:salonId",
                        name: "chiTietThietKeSalon",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/thietKeSalon/chiTietThietKeSalon"
                            )
                    },
                    {
                        path: "danh-gia-salon/:salonId",
                        name: "danhGiaSalon",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/thietKeSalon/danhGiaSalon"
                            )
                    }
                ]
            },

            // quản Lý Marketing
            {
                path: "/quan-ly-marketing",
                name: "index-quanLyMarketing",
                redirect: "/quan-ly-marketing/index-quan-ly-marketing",
                component: () =>
                    import (
                        "../views/elements/banHangVaMarketing/quanLyMarketing/index.vue"
                    ),
                children: [{
                        path: "index-quan-ly-marketing",
                        name: "quanlymarketing",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyMarketing/quanLyMarketing.vue"
                            )
                    },
                    {
                        path: "chuong-trinh-beauty-love",
                        name: "chuongTrinhBeautyLove",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyMarketing/chuongTrinhBeautyLove"
                            )
                    },
                    {
                        path: "thong-bao-beauty-love",
                        name: "thongBaoBeautyLove",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyMarketing/thongBaoBeautyLove"
                            )
                    },
                    {
                        path: "thong-bao-cua-toi",
                        name: "thongBaoCuaToi",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyMarketing/thongBaoCuaToi"
                            )
                    },
                    // chương trình của tôi
                    {
                        path: "/chuong-trinh-cua-toi",
                        name: "index-chuongTrinhCuaToi",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyMarketing/chuongTrinhCuaToi/index"
                            ),
                        children: [{
                                path: "danh-sach",
                                name: "chuongTrinhCuaToi",
                                component: () =>
                                    import (
                                        "../views/elements/banHangVaMarketing/quanLyMarketing/chuongTrinhCuaToi/chuongTrinhCuaToi"
                                    )


                            },
                            {
                                path: "chi-tiet/:idProgram",
                                name: "chiTietChuongTrinh",
                                component: () =>
                                    import (
                                        "../views/elements/banHangVaMarketing/quanLyMarketing/chuongTrinhCuaToi/chiTiet"
                                    )

                            },
                            {
                                path: "cap-nhat/:idProgram",
                                name: "capNhatChuongTrinh",
                                component: () =>
                                    import (
                                        "../views/elements/banHangVaMarketing/quanLyMarketing/chuongTrinhCuaToi/capNhat"
                                    )

                            },
                            {
                                path: "them-moi",
                                name: "themChuongTrinhCuaToi",
                                component: () =>
                                    import (
                                        "../views/elements/banHangVaMarketing/quanLyMarketing/chuongTrinhCuaToi/themChuongTrinhCuaToi"
                                    )

                            },
                        ]
                    },
                    // ==============
                    // mã giảm giá của tôi
                    {
                        path: "/ma-giam-gia-cua-toi",
                        name: "index-maGiamGiaCuaToi",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyMarketing/maGiamGia/index"
                            ),
                        children: [{
                                path: "danh-sach",
                                name: "maGiamGiaCuaToi",
                                component: () =>
                                    import (
                                        "../views/elements/banHangVaMarketing/quanLyMarketing/maGiamGia/maGiamGiaCuaToi"
                                    )


                            },
                            {
                                path: "them-moi",
                                name: "themMaGiamGia",
                                component: () =>
                                    import (
                                        "../views/elements/banHangVaMarketing/quanLyMarketing/maGiamGia/themMaGiamGia"
                                    )


                            },
                            {
                                path: "chi-tiet/:idDiscount",
                                name: "chiTietMaGiamGia",
                                component: () =>
                                    import (
                                        "../views/elements/banHangVaMarketing/quanLyMarketing/maGiamGia/chiTiet"
                                    )


                            },
                            {
                                path: "cap-nhat/:idDiscount",
                                name: "capNhatMaGiamGia",
                                component: () =>
                                    import (
                                        "../views/elements/banHangVaMarketing/quanLyMarketing/maGiamGia/capNhat"
                                    )


                            },


                        ]
                    },
                    // ==============

                    // mã giảm giá của tôi
                    {
                        path: "/com-bo-khuyen-mai",
                        name: "index-comboKhuyenMai",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyMarketing/combo/index"
                            ),
                        children: [{
                                path: "danh-sach",
                                name: "comboKhuyenMai",
                                component: () =>
                                    import (
                                        "../views/elements/banHangVaMarketing/quanLyMarketing/combo/DSCombo"
                                    )
                            },
                            {
                                path: "them-moi",
                                name: "themCombo",
                                component: () =>
                                    import (
                                        "../views/elements/banHangVaMarketing/quanLyMarketing/combo/themCombo"
                                    )
                            },
                            {
                                path: "chi-tiet/:idCombo",
                                name: "chiTietCombo",
                                component: () =>
                                    import (
                                        "../views/elements/banHangVaMarketing/quanLyMarketing/combo/chiTiet"
                                    )
                            },
                            {
                                path: "cap-nhat/:idCombo",
                                name: "capNhatCombo",
                                component: () =>
                                    import (
                                        "../views/elements/banHangVaMarketing/quanLyMarketing/combo/capNhat"
                                    )
                            },

                        ]
                    },
                    // ==============


                    {
                        path: "push-thong-bao",
                        name: "pushThongBao",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyMarketing/pushThongBao"
                            )
                    },
                    {
                        path: "them-chuong-trinh",
                        name: "themChuongTrinh",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyMarketing/themChuongTrinh"
                            )
                    }
                ]
            },

            // quản Lý thẻ
            {
                path: "/quan-ly-the",
                name: "quanLyThe",
                redirect: "/quan-ly-the/danh-sach-khach-hang",
                component: () =>
                    import ("../views/elements/banHangVaMarketing/quanLyThe/index"),
                children: [{
                        path: "danh-sach-khach-hang",
                        name: "danhSachKhachHang",
                        component: () =>
                            import ("../views/elements/banHangVaMarketing/quanLyThe/quanLyThe")
                            // children: [
                            //   {
                            //     path: "danh-sach-nguoi-dung-the/:theId",
                            //     name: "danhSachNguoiDungThe",
                            //     component: () =>
                            //       import(
                            //         "../views/elements/banHangVaMarketing/quanLyThe/dsNguoiDungThe"
                            //       )
                            //   }
                            // ]
                    },
                    {
                        path: "danh-sach-nguoi-dung-the/:theId",
                        name: "danhSachNguoiDungThe",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyThe/dsNguoiDungThe"
                            )
                    },
                    {
                        path: "danh-sach-bao-cao",
                        name: "danhSachBaoCao",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyThe/QLT_danhSachBaoCao"
                            )
                    },
                    {
                        path: "lich-su-giao-dich",
                        name: "lichSuGiaoDich",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyThe/QLT_lichSuGiaoDich"
                            )
                    },
                    {
                        path: "them-the",
                        name: "themThe",
                        component: () =>
                            import ("../views/elements/banHangVaMarketing/quanLyThe/themThe")
                    },
                    {
                        path: "them-nguoi-dung/:themId",
                        name: "themNguoiDung",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyThe/themNguoiDungThe"
                            )
                    },
                    {
                        path: "cap-nhat-the/:theId",
                        name: "capNhatThe",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyThe/capNhatThe"
                            )
                    },
                    {
                        path: "chi-tiet-the",
                        name: "chiTietThe",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyThe/chiTietThe"
                            )
                    }
                ]
            },

            // báo cáo bán hàng
            {
                path: "/bao-cao-ban-hang",
                name: "baoCaoBanHang",
                component: () =>
                    import ("../views/elements/banHangVaMarketing/baoCaoBanHang")
            },

            // quản lý kho
            {
                path: "/quan-ly-kho",
                name: "index-quan-ly-kho",
                redirect: "/quan-ly-kho/danh-sach-quan-ly-kho",
                component: () =>
                    import ("../views/elements/banHangVaMarketing/quanLyKho/index"),
                children: [{
                        path: "danh-sach-quan-ly-kho",
                        name: "quanLyKho",
                        component: () =>
                            import ("../views/elements/banHangVaMarketing/quanLyKho/quanLyKho")
                    },
                    {
                        path: "chi-tiet-quan-ly-kho/:khoId",
                        name: "chiTietQuanLyKho",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyKho/chiTietQuanLyKho"
                            )
                    },
                    {
                        path: "salon-con-hang/:conHangId",
                        name: "salonConHang",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyKho/salonConHang"
                            )
                    },
                    {
                        path: "danh-gia-san-pham/:sanPhamId",
                        name: "danhGiaSanPham",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyKho/danhGiaSanPham"
                            )
                    },
                    {
                        path: "xuat-kho/:xuatKhoId",
                        name: "xuatKho",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyKho/xuatKho"
                            )
                    },
                    {
                        path: "cap-nhat-san-pham/:sanPhamId",
                        name: "capNhatSanPham",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyKho/capNhatSanPham"
                            )
                    },
                    {
                        path: "them-san-pham",
                        name: "QLK-themSanPham",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyKho/themSanPham"
                            )
                    }
                ]
            },

            // quản lý dịch vụ
            {
                path: "/quan-ly-dich-vu",
                name: "index-quanLyDichVu",
                redirect: "/quan-ly-dich-vu/danh-sach",
                component: () =>
                    import ("../views/elements/banHangVaMarketing/quanLyDichVu/index"),
                children: [{
                        path: "danh-sach",
                        name: "quanLyDichVu",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyDichVu/quanLyDichVu"
                            )
                    },
                    {
                        path: "them-dich-vu/:addServiceId",
                        name: "themDichVu",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyDichVu/themDichVu"
                            )
                    },
                    {
                        path: "cap-nhat/:updateId/:salonId",
                        name: "capNhatDichVu",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyDichVu/capNhatDichVu"
                            )
                    },
                    {
                        path: "chi-tiet",
                        name: "chiTietDichVu",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyDichVu/chiTiet"
                            )
                    }
                ]
            },

            // quản lý khách hàng
            {
                path: "/quan-ly-khach-hang",
                name: "index-quanLyKhachHang",
                redirect: "/quan-ly-khach-hang/danh-sach-quan-ly-khach-hang",
                component: () =>
                    import ("../views/elements/banHangVaMarketing/quanLyKhachHang/index"),
                children: [
                    {
                        path: "danh-sach-quan-ly-khach-hang",
                        name: "quanLyKhachHang",
                        // redirect: "/quan-ly-khach-hang/danh-sach-quan-ly-khach-hang/tat-ca-khach-hang",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyKhachHang/quanLyKhachHang"
                            ),
                    //     children: [{
                    //             path: "khach-hang-vip",
                    //             name: "khachHangVip",
                    //             component: () =>
                    //                 import (
                    //                     "../views/elements/banHangVaMarketing/quanLyKhachHang/khachHangVip"
                    //                 )
                    //         },
                    //         {
                    //             path: "khach-hang-dung-the",
                    //             name: "khachHangDungThe",
                    //             component: () =>
                    //                 import (
                    //                     "../views/elements/banHangVaMarketing/quanLyKhachHang/khachHangDungThe"
                    //                 )
                    //         },
                    //         {
                    //             path: "khach-hang-theo-doi",
                    //             name: "khachHangTheoDoi",
                    //             component: () =>
                    //                 import (
                    //                     "../views/elements/banHangVaMarketing/quanLyKhachHang/khachHangTheoDoi"
                    //                 )
                    //         },
                    //         {
                    //             path: "khach-hang-doanh-so",
                    //             name: "khachHangDoanhSo",
                    //             component: () =>
                    //                 import (
                    //                     "../views/elements/banHangVaMarketing/quanLyKhachHang/khachHangDoanhSo"
                    //                 )
                    //         },
                    //         {
                    //             path: "khach-hang-tan-suat",
                    //             name: "khachHangTanSuat",
                    //             component: () =>
                    //                 import (
                    //                     "../views/elements/banHangVaMarketing/quanLyKhachHang/khachHangTanSuat"
                    //                 )
                    //         },
                    //         {
                    //             path: "tat-ca-khach-hang",
                    //             name: "tatCaKhachHang",
                    //             component: () =>
                    //                 import (
                    //                     "../views/elements/banHangVaMarketing/quanLyKhachHang/tatCaKhachHang.vue"
                    //                 )
                    //         }
                    //     ]
                    },
                    {
                        path: "them-khach-hang",
                        name: "themKhachHang",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyKhachHang/themKhachHang"
                            )
                    },
                    {
                        path: "chi-tiet-khach-hang/:custommerId",
                        name: "chiTietKhachHang",
                        component: () =>
                            import (
                                "../views/elements/banHangVaMarketing/quanLyKhachHang/chiTiet"
                            )
                    }
                ]
            },

            // =============QUẢN LÝ NHÂN SỰ===========

            // thông báo nhân viên
            {
                path: "/thong-bao-nhan-vien",
                name: "thongBaoNhanVien",
                component: () =>
                    import ("../views/elements/quanLyNhanSu/thongBaoNhanVien")
            },

            // quản lý nhân viên
            {
                path: "/quan-ly-nhan-vien",
                name: "index-quanLyNhanVien",
                redirect: "/quan-ly-nhan-vien/index-quan-ly-nhan-vien",
                component: () =>
                    import ("../views/elements/quanLyNhanSu/quanLyNhanVien/index"),
                children: [{
                        path: "index-quan-ly-nhan-vien",
                        name: "quanLyNhanVien",
                        component: () =>
                            import (
                                "../views/elements/quanLyNhanSu/quanLyNhanVien/quanLyNhanVien"
                            )
                    },
                    {
                        path: "them-nhan-vien",
                        name: "themNhanVien",
                        component: () =>
                            import (
                                "../views/elements/quanLyNhanSu/quanLyNhanVien/themNhanVien"
                            )
                    },
                    {
                        path: "cap-nhat-thong-tin-nhan-vien/:capNhatId",
                        name: "capNhatThongTinNhanVien",
                        component: () =>
                            import (
                                "../views/elements/quanLyNhanSu/quanLyNhanVien/capNhatthongTinNhanVien"
                            )
                    },
                    {
                        path: "thong-tin-nhan-vien/:nhanVienId",
                        name: "thongTinNhanVien",
                        component: () =>
                            import (
                                "../views/elements/quanLyNhanSu/quanLyNhanVien/thongTinNhanvien"
                            )
                    }
                ]
            },
            // =================

            // quản lý chấm công
            {
                path: "/quan-ly-cham-cong",
                name: "index-quanLyChamCong",
                redirect: "/quan-ly-cham-cong/index-quan-ly-cham-cong",
                component: () =>
                    import ("../views/elements/quanLyNhanSu/quanLyChamCong/index.vue"),
                children: [{
                        path: "index-quan-ly-cham-cong",
                        name: "quanLyChamCong",
                        component: () =>
                            import (
                                "../views/elements/quanLyNhanSu/quanLyChamCong/quanLyChamCong.vue"
                            )
                    },
                    {
                        path: "danh-sach-nhan-vien",
                        name: "danhSachNhanVien",
                        component: () =>
                            import (
                                "../views/elements/quanLyNhanSu/quanLyChamCong/danhSachNhanVien"
                            )
                    }
                ]
            },

            // quản lý KPI
            {
                path: "/quan-ly-kpi",
                name: "index-quanLyKPI",
                redirect: "/quan-ly-kpi/index-quan-ly-kpi",
                component: () =>
                    import ("../views/elements/quanLyNhanSu/quanLyKPI/index"),
                children: [{
                        path: "index-quan-ly-kpi",
                        name: "quanLyKPI",
                        component: () =>
                            import ("../views/elements/quanLyNhanSu/quanLyKPI/quanLyKPI")
                    },
                    {
                        path: "them-KPI",
                        name: "themKPI",
                        component: () =>
                            import ("../views/elements/quanLyNhanSu/quanLyKPI/themKPI")
                    }
                ]
            },

            // quản lý hoa hồng
            {
                path: "/quan-ly-hoa-hong",
                name: "index-quanLyHoaHong",
                redirect: "/quan-ly-hoa-hong/danh-sach-quan-ly-hoa-hong",
                component: () =>
                    import ("../views/elements/quanLyNhanSu/quanLyHoaHong/index.vue"),
                children: [{
                        path: "danh-sach-quan-ly-hoa-hong",
                        name: "quanLyHoaHong",
                        component: () =>
                            import (
                                "../views/elements/quanLyNhanSu/quanLyHoaHong/quanLyHoaHong.vue"
                            )
                    },
                    {
                        path: "them-hoa-hong",
                        name: "themHoaHong",
                        component: () =>
                            import (
                                "../views/elements/quanLyNhanSu/quanLyHoaHong/themHoaHong.vue"
                            )
                    }
                ]
            },

            // quản lý hợp đồng
            {
                path: "/quan-ly-hop-dong",
                name: "index-quanLyHopDong",
                redirect: "/quan-ly-hop-dong/danh-sach",
                component: () =>
                    import ("../views/elements/quanLyNhanSu/quanLyHopDong/index"),
                children: [{
                        path: "danh-sach",
                        name: "quanLyHopDong",
                        component: () =>
                            import (
                                "../views/elements/quanLyNhanSu/quanLyHopDong/quanLyHopDong"
                            )
                    },
                    {
                        path: "cap-nhat-hop-dong/:hopDongId",
                        name: "capNhatHopDong",
                        component: () =>
                            import ("../views/elements/quanLyNhanSu/quanLyHopDong/capNhatHopDong")
                    },
                    {
                        path: "them-hop-dong",
                        name: "themHopDong",
                        component: () =>
                            import ("../views/elements/quanLyNhanSu/quanLyHopDong/themHopDong")
                    }
                ]
            },

            // Lịch trình đào tạo
            {
                path: "/lich-trinh-dao-tao",
                name: "index-lichTrinhDaoTao",
                redirect: "/lich-trinh-dao-tao/danh-sach-lich-trinh",
                component: () =>
                    import ("../views/elements/banHangVaMarketing/quanLyThe/index"),
                children: [{
                        path: "danh-sach-lich-trinh",
                        name: "lichTrinhDaoTao",
                        component: () =>
                            import (
                                "../views/elements/quanLyNhanSu/lichTrinhDaotao/lichTrinhDaoTao"
                            )
                    },
                    {
                        path: "them-lich-trinh",
                        name: "themLichTrinhDaoTao",
                        component: () =>
                            import (
                                "../views/elements/quanLyNhanSu/lichTrinhDaotao/themLichTrinh"
                            )
                    },
                    {
                        path: "sua-lich-trinh/:lichTrinhId",
                        name: "suaLichTrinh",
                        component: () =>
                            import (
                                "../views/elements/quanLyNhanSu/lichTrinhDaotao/suaLichTrinh"
                            )
                    },
                    {
                        path: "chi-tiet-lich-trinh/:scheduleId",
                        name: "chiTietLichTrinh",
                        component: () =>
                            import (
                                "../views/elements/quanLyNhanSu/lichTrinhDaotao/chiTietLichTrinhDaoTao"
                            )
                    }
                ]
            },

            // Quy trình làm việc
            {
                path: "/quy-trinh-lam-viec",
                name: "index-quyTrinhLamViec",
                redirect: "/quy-trinh-lam-viec/danh-sach",
                component: () =>
                    import ("../views/elements/quanLyNhanSu/quyTrinhLamViec/index"),
                children: [{
                        path: "danh-sach",
                        name: "quyTrinhLamViec",
                        component: () =>
                            import (
                                "../views/elements/quanLyNhanSu/quyTrinhLamViec/quyTrinhLamViec"
                            ),
                    },
                    {
                        path: "them-quy-trinh",
                        name: "themQuyTrinh",
                        component: () =>
                            import (
                                "../views/elements/quanLyNhanSu/quyTrinhLamViec/themQuyTrinh"
                            )
                    }
                ]
            },

            // ============TÀI CHÍNH VÀ KẾ TOÁN==========

            // quỹ tiền mặt và ngân hàng
            {
                path: "/quy-tien-mat-va-ngan-hang",
                name: "index-quytienmat",
                redirect: '/quy-tien-mat-va-ngan-hang/danh-sach-quy',
                component: () =>
                    import ("../views/elements/taiChinhVaKeToan/quy/index"),
                children: [{
                        // danh sách quỹ
                        path: "danh-sach-quy",
                        name: "quyTienMatVaNganHang",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/quy/quyTienMatVaNganHang")
                    },
                    // chi tiết quỹ
                    {
                        path: "chi-tiet-quy/:fundId",
                        name: "chiTietQuy",
                        component: () =>
                            import (
                                "../views/elements/taiChinhVaKeToan/quy/chiTietQuy"
                            )
                    },
                    // cập nhật quỹ
                    {
                        path: "cap-nhat-quy/:fundId",
                        name: "capNhatQuy",
                        component: () =>
                            import (
                                "../views/elements/taiChinhVaKeToan/quy/capNhatQuy"
                            )
                    },
                    // thêm mớI quỹ
                    {
                        path: "them-moi-quy",
                        name: "themMoiQuy",
                        component: () =>
                            import (
                                "../views/elements/taiChinhVaKeToan/quy/themMoiQuy"
                            )
                    },
                ]
            },

            // phiếu thu, phiếu chi
            {
                path: "/phieu-thu-chi",
                name: "index-phieuThuPhieuChi",
                redirect: "/phieu-thu-chi/danh-sach-phieu-thu",
                component: () =>
                    import ("../views/elements/taiChinhVaKeToan/phieuThuPhieuChi/index"),
                children: [{
                        path: "danh-sach-phieu-thu",
                        name: "danhSachPhieuThu",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/phieuThuPhieuChi/danhSachPhieuThu")
                    },
                    {
                        path: "them-phieu-thu",
                        name: "themPhieuThu",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/phieuThuPhieuChi/themPhieuThu")
                    },
                    {
                        path: "cap-nhat-phieu-thu/:phieuThuId",
                        name: "capNhatPhieuThu",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/phieuThuPhieuChi/capNhatPhieuThu")
                    },
                    // danh sách phiếu chi
                    {
                        path: "danh-sach-phieu-chi",
                        name: "danhSachPhieuChi",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/phieuThuPhieuChi/danhSachPhieuChi")
                    },
                    {
                        path: "them-phieu-chi",
                        name: "themPhieuChi",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/phieuThuPhieuChi/themPhieuChi")
                    },
                    {
                        path: "cap-nhat-phieu-chi/:phieuChiId",
                        name: "capNhatPhieuChi",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/phieuThuPhieuChi/capNhatPhieuChi")
                    }
                ]
            },
            // báo cáo thu chi
            {
                path: "/bao-cao-thu-chi",
                name: "baoCaoThuChi",
                component: () =>
                    import ("../views/elements/taiChinhVaKeToan/baoCaoThuChi")
            },
            // phiếu mua hàng
            {
                path: "/phieu-mua-hang",
                name: "index-phieuMuaHang",
                redirect: "/phieu-mua-hang/danh-sach",
                component: () =>
                    import ("../views/elements/taiChinhVaKeToan/phieuMuaHang/index"),
                children: [{
                    path: "danh-sach",
                    name: "danhSachPhieuMuaHang",
                    component: () =>
                        import ("../views/elements/taiChinhVaKeToan/phieuMuaHang/phieuMuaHang")
                }, ]
            },

            // báo cáo mua hàng
            {
                path: "/bao-cao-mua-hang",
                name: "index-baoCaoMuaHang",
                redirect: "/bao-cao-mua-hang/danh-sach-bao-cao-mua-hang",
                component: () =>
                    import ("../views/elements/taiChinhVaKeToan/baoCaoMuaHang/index"),
                children: [{
                        path: "danh-sach-bao-cao-mua-hang",
                        name: "danhSachbaoCaoMuaHang",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/baoCaoMuaHang/baoCaoMuaHang")
                    },
                    {
                        path: "cap-nhat-bao-cao-mua-hang/:muaHangId",
                        name: "capNhatBaoCaoMuaHang",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/baoCaoMuaHang/capNhatBaoCaoMuaHang")
                    },
                    {
                        path: "them-bao-cao-mua-hang",
                        name: "themBaoCaoMuaHang",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/baoCaoMuaHang/thembaoCaoMuaHang")
                    }
                ]
            },

            // phiếu hàng hoá
            {
                path: "/phieu-hang-hoa",
                name: "index-phieuHangHoa",
                redirect: "/phieu-hang-hoa/danh-sach",
                component: () =>
                    import ("../views/elements/taiChinhVaKeToan/phieuHangHoa/index"),
                children: [{
                    path: "danh-sach",
                    name: "danhSachPhieuHangHoa",
                    component: () =>
                        import ("../views/elements/taiChinhVaKeToan/phieuHangHoa/phieuHangHoa")
                }, ]
            },

            // báo cáo hàng hoá
            {
                path: "/bao-cao-hang-hoa",
                name: "baoCaoHangHoa",
                redirect: '/bao-cao-hang-hoa/danh-sach-bao-cao',
                component: () =>
                    import ("../views/elements/taiChinhVaKeToan/baoCaoHangHoa/index"),
                children: [
                    // danh sách báo cáo hàng hoá
                    {
                        path: "danh-sach-bao-cao",
                        name: "danhSachBaoCao",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/baoCaoHangHoa/baoCaoHangHoa"),

                    },
                    // chi tiết báo cáo hàng hoá
                    {
                        path: "chi-tiet-bao-cao/:reportId",
                        name: "chiTietBaoCaoHangHoa",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/baoCaoHangHoa/chiTietBaoCao"),

                    },
                    // thêm báo cáo hàng hoá
                    {
                        path: "them-bao-cao-hang-hoa",
                        name: "themBaoCaoHangHoa",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/baoCaoHangHoa/themBaoCaoHangHoa"),

                    },
                    // cập nhật báo cáo hàng hoá
                    {
                        path: "cap-nhat-bao-cao-hang-hoa/:reportId",
                        name: "capNhatBaoCaoHangHoa",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/baoCaoHangHoa/capNhatBaoCaoHangHoa"),

                    },
                    // sổ chi tiết hàng hoá
                    {
                        path: "so-chi-tiet-hang-hoa",
                        name: "soChiTietHangHoa",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/baoCaoHangHoa/soChiTietHangHoa"),

                    },
                    // thêm sổ chi tiết hàng hoá
                    {
                        path: "them-so-chi-tiet",
                        name: "themSoChiTiet",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/baoCaoHangHoa/themSoChiTiet"),

                    },
                    // chi tiết sổ hàng hoá
                    {
                        path: "chi-tiet-so-hang-hoa/:detailId",
                        name: "chiTietSoHangHoa",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/baoCaoHangHoa/chiTietSoHangHoa"),

                    },
                    // cập nhật sổ chi tiết 
                    {
                        path: "cap-nhat-so-hang-hoa/:detailId",
                        name: "capNhatSoChiTiet",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/baoCaoHangHoa/capNhatSoChiTiet"),

                    },

                ]
            },

            // danh muc tai san va khấu hao
            {
                path: "/tai-san-khau-hao",
                name: "index-danhMucTaiSan",
                redirect: '/tai-san-khau-hao/danh-sach-tai-san',
                component: () =>
                    import ("../views/elements/taiChinhVaKeToan/danhMucTaiSan/index"),
                children: [{
                        //bang danh sach tai san
                        path: "danh-sach-tai-san",
                        name: "danhMucTaiSanKhauHao",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/danhMucTaiSan/danhMucTaiSanKhauHao"),
                    },
                    // thêm mới tài sản
                    {
                        path: "them-tai-san",
                        name: "themTaiSan",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/danhMucTaiSan/themTaiSan"),
                    },
                    // chi tiết tài sản
                    {
                        path: "chi-tiet-tai-san/:assetId",
                        name: "chiTietTaiSan",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/danhMucTaiSan/chiTietTaiSan"),
                    },

                    // cập nhật tài sản
                    {
                        path: "cap-nhat-tai-san/:assetId",
                        name: "capNhatTaiSan",
                        component: () =>
                            import ("../views/elements/taiChinhVaKeToan/danhMucTaiSan/capNhatTaiSan"),
                    }


                ]
            },

            // tài chính tạm tính lãi lỗ
            {
                path: "/tam-tinh-lai-lo",
                name: "index-taiChinhLaiLo",
                redirect: "/tam-tinh-lai-lo/danh-sach",
                component: () =>
                    import (
                        "../views/elements/taiChinhVaKeToan/taiChinhTamTinhLaiLo/index"
                    ),
                children: [{
                    path: "danh-sach",
                    name: "taiChinhTamTinhLaiLo",
                    redirect: "/tam-tinh-lai-lo/danh-sach/thong-ke-tai-chinh",
                    component: () =>
                        import (
                            "../views/elements/taiChinhVaKeToan/taiChinhTamTinhLaiLo/taiChinhTamTinhLaiLo"
                        ),
                    children: [{
                            path: "thong-ke-tai-chinh",
                            name: "thongKeTaiChinh",
                            component: () =>
                                import ("../views/elements/taiChinhVaKeToan/taiChinhTamTinhLaiLo/thongKetaiChinh")
                        },
                        {
                            path: "ket-qua-kinh-doanh",
                            name: "index-ketQuaKinhDoanh",
                            redirect: "/tam-tinh-lai-lo/danh-sach/ket-qua-kinh-doanh/danh-sach-ket-qua-kinh-doanh",
                            component: () =>
                                import ("../views/elements/taiChinhVaKeToan/taiChinhTamTinhLaiLo/ketQuaKinhDoanh/index"),
                            children: [{
                                    path: "danh-sach-ket-qua-kinh-doanh",
                                    name: "ketQuaKinhDoanh",
                                    component: () =>
                                        import ("../views/elements/taiChinhVaKeToan/taiChinhTamTinhLaiLo/ketQuaKinhDoanh/baoCaoKetQuaKD")
                                },
                                {
                                    path: "tao-bang-ket-qua-kinh-doanh",
                                    name: "taoBangKetQuaKinhDoanh",
                                    component: () =>
                                        import ("../views/elements/taiChinhVaKeToan/taiChinhTamTinhLaiLo/ketQuaKinhDoanh/taoBangBaoCao")
                                },
                            ]
                        },
                        {
                            path: "can-doi-ke-toan",
                            name: "index-canDoiKeToan",
                            redirect: "/tam-tinh-lai-lo/danh-sach/can-doi-ke-toan/danh-sach-can-doi-ke-toan",
                            component: () =>
                                import ("../views/elements/taiChinhVaKeToan/taiChinhTamTinhLaiLo/canDoiKeToan/index"),
                            children: [{
                                    path: "danh-sach-can-doi-ke-toan",
                                    name: "canDoiKeToan",
                                    component: () =>
                                        import ("../views/elements/taiChinhVaKeToan/taiChinhTamTinhLaiLo/canDoiKeToan/canDoiKeToan")
                                },
                                {
                                    path: "tao-bang-can-doi-ke-toan",
                                    name: "bangCanDoiKeToan",
                                    component: () =>
                                        import ("../views/elements/taiChinhVaKeToan/taiChinhTamTinhLaiLo/canDoiKeToan/taoBangCanDoi")
                                },
                            ]
                        },
                        {
                            path: "luu-chuyen-tien-te",
                            name: "index-luuChuyenTienTe",
                            redirect: "/tam-tinh-lai-lo/danh-sach/luu-chuyen-tien-te/danh-sach-luu-chuyen-tien-te",
                            component: () =>
                                import ("../views/elements/taiChinhVaKeToan/taiChinhTamTinhLaiLo/luuChuyenTienTe/index"),
                            children: [{
                                    path: "danh-sach-luu-chuyen-tien-te",
                                    name: "luuChuyenTienTe",
                                    component: () =>
                                        import ("../views/elements/taiChinhVaKeToan/taiChinhTamTinhLaiLo/luuChuyenTienTe/luuChuyenTienTe")
                                },
                                {
                                    path: "tao-bang-luu-chuyen-tien-te",
                                    name: "bangLuuChuyenTienTe",
                                    component: () =>
                                        import ("../views/elements/taiChinhVaKeToan/taiChinhTamTinhLaiLo/luuChuyenTienTe/taoBangLuuchuyen")
                                },
                            ]
                        },
                    ]
                }]
            },

            //============CỘNG ĐỒNG=============
            {
                path: "/cong-dong",
                name: "index-congDong",
                redirect: "/cong-dong/danh-sach-cong-dong",
                component: () =>
                    import ("../views/elements/congDong/index"),
                children: [{
                        path: "danh-sach-cong-dong",
                        name: "congDong",
                        component: () =>
                            import ("../views/elements/congDong/congDong")
                    },
                    {
                        path: "chi-tiet-bai-dang/:baiDangId",
                        name: "chiTietBaiDang",
                        component: () =>
                            import ("../views/elements/congDong/chiTietBaiDang")
                    }
                ]
            },

            // =======HỒ SƠ CỦA BẠN========
            // Hồ sơ của bạn
            {
                path: "/ho-so-cua-ban",
                name: "hoSoCuaBan",
                component: () =>
                    import ("../views/elements/dropdown/hoSoCuaBan")
            },

            // Phân cấp quyền
            {
                path: "/phan-cap-quyen",
                name: "phanCapQuyen",
                component: () =>
                    import ("../views/elements/dropdown/phanCapQuyen")
            },
            // cập nhật thông tin
            {
                path: "/cap-nhat-thong-tin",
                name: "capNhatThongTin",
                component: () =>
                    import ("../views/elements/dropdown/capNhatThongTin")
            },
            {
                path: "/thong-tin-san-pham",
                name: "thongTinSanPham",
                component: () =>
                    import ("../views/elements/other/thongTinSanPham")
            },
            {
                path: "/ho-so-nhan-vien",
                name: "hoSoNhanVien",
                component: () =>
                    import ("../views/elements/other/hoSoNhanVien")
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("accessToken");
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            if (!token || token === "") {
                this.$store.dispatch("doLogout").then(() => {
                    window.location.href = "/auth";
                });
            }
            next();
            return;
        }
        next("/auth");
    } else {
        if (token) {
            window.history.back();
        } else {
            next();
        }
    }
});

export default router;