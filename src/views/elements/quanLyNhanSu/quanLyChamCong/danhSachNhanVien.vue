<template>
  <div class="col-md-10 res mb-5 mt-3">
    <i
      class="fas fa-search color-main"
      style="position: absolute; top: 9px; right: 37px"
    ></i>
    <div class="mt-4">
      <div class="row" style="margin-left: 0px">
        <div class="col-md-4 col-sm-4 col-4">
          <h5 class="color-main font-weight-bold" style="font-size: 16px">
            DANH SÁCH NHÂN VIÊN
          </h5>
        </div>
        <div class="col-md-8 col-sm-8 col-8 pr-4" style="text-align: right">
          <span class="color-main bg pl-4 pr-4 p-2 font-weight-bold"
            >BÁO CÁO NHÂN VIÊN</span
          >
        </div>
      </div>
      <div class="mt-3" style="margin-left: 0px">
        <div class="w-75 res width-100 margin-top-5" style="margin: 0 auto">
          <div class="bg p-3">
            <h6>DANH SÁCH NHÂN VIÊN</h6>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Họ và Tên</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th class="text-center">Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody v-for="(employee, index) in employees" :key="index">
                  <tr>
                    <router-link
                      :to="{
                        name: 'thongTinNhanVien',
                        params: { nhanVienId: employee.id },
                      }"
                    >
                      <td class="color-main">
                        <b>{{ employee.name }}</b>
                      </td>
                    </router-link>
                    <td>{{ employee.phone }}</td>
                    <td>{{ employee.email }}</td>
                    <td class="text-center">
                      <span v-if="status_lock == 1">Khoá</span>
                      <span v-else></span>
                    </td>
                    <td>
                      <router-link
                        :to="{
                          name: 'thongTinNhanVien',
                          params: { nhanVienId: employee.id },
                        }"
                      >
                        <b class="color-main">Xem chi tiết</b>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- phân trang -->
              <div class="mt-3">
                <ul class="pagination justify-content-end">
                  <li
                    class="page-item"
                    style="cursor: pointer"
                    :class="{ disabled: paginate.currentPage === 1 }"
                  >
                    <span
                      class="page-link"
                      @click="changePage(paginate.currentPage - 1)"
                      >Trước</span
                    >
                  </li>

                  <li
                    class="page-item"
                    v-for="(page, index) in paginate.totalPage"
                    :key="index"
                    :class="{ active: paginate.currentPage === page }"
                    style="cursor: pointer"
                  >
                    <span class="page-link" @click="changePage(index + 1)">{{
                      index + 1
                    }}</span>
                  </li>

                  <li
                    class="page-item"
                    style="cursor: pointer"
                    :class="{
                      disabled: paginate.currentPage === paginate.totalPage,
                    }"
                  >
                    <span
                      class="page-link"
                      @click="changePage(paginate.currentPage + 1)"
                      >Sau</span
                    >
                  </li>
                </ul>
              </div>
              <!-- ============ -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "danhSachNhanVien",
  data() {
    return {
      employees: [],
      lock: [],
      status_lock: 1,
      paginate: {
        currentPage: 1,
        totalPage: 1,
      },
    };
  },
  beforeMount() {
    this.listEmployee();
  },
  methods: {
    changePage(index) {
      this.paginate.currentPage = index;
      this.listEmployee();
    },
    listEmployee() {
      let page = this.paginate.currentPage;
      HTTP.get(
        `/salon/main/manage/employee?page=` + page + `&name&phone=&email`
      )
        .then((res) => {
          // this.employees = res.data.data.data;
          // console.log(this.employees);

          let result = res.data;
          console.log(result);
          if (result.status === 1) {
            let data = result.data;
            if (data.data.length > 0) {
              this.hasData = true;
              this.employees = data.data;
              this.paginate.currentPage = data.current_page;
              this.paginate.totalPage = data.last_page;
            } else {
              this.msg = "Chưa có nhân viên";
            }
          } else {
            this.notification.status = true;
            this.notification.message = result.message;
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
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
</style>
