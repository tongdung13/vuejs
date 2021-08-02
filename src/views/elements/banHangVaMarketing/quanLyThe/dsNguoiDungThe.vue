<template>
  <div class="col-md-10 res mb-5 mt-3 res-0">
    <div @click="changeClick" class="bg1 p-3">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-6">
          <h6>
            <span class="color-main"> DANH SÁCH KHÁCH HÀNG - </span>
            <span style="color: #3a49f9"> THẺ TIỀN </span>
          </h6>
        </div>
        <div class="col-md-6 col-sm-6 col-6">
          <span
            @click="backPage"
            class="borderx hover mr-3 color-main float-right"
            >Quay lại</span
          >
        </div>
      </div>
      <div class="mt-3">
        <input
          type="text"
          placeholder="Tìm kiếm khách hàng"
          style="width: 25%; padding: 4px 10px"
          v-model="search"
        />
      </div>
      <div v-if="msg == ''" class="mt-3">
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Mã thẻ</th>
              <th scope="col">Tên người dùng</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Ngày tạo</th>
              <th scope="col">Số tiền</th>
              <th></th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in filterCustomer" :key="index">
              <td class="font-weight-bold">{{ customer.user_id }}</td>
              <td>{{ customer.name }}</td>
              <td>{{ customer.phone }}</td>
              <td>{{ formatSex(customer.sex) }}</td>
              <td class="hidden">{{ formatDate(customer.created_at) }}</td>
              <td class="color-main font-weight-bold">
                {{ formatPrice(6000000) }}
              </td>
              <td>
                <input type="checkbox" />
              </td>
              <td class="text-right text-danger" style="cursor: pointer">
                <span @click="deleteCustomer(customer.id)">Xoá</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="mt-3 text-center">
        <b>{{ msg }}</b>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/main";
import { formatDate } from "@/main";
import { formatPrice } from "@/main";
export default {
  props: ["nguoiDungId"],
  name: "danhSachNguoiDungThe",
  data() {
    return {
      listCustomerCard: [],
      msg: "",
      search: "",
    };
  },
  beforeMount() {
    this.listCustomerCards();
  },
  methods: {
    // Danh sách người dùng thẻ
    listCustomerCards() {
      let Code = window.location.href.slice(
        window.location.href.indexOf("/danh-sach-nguoi-dung-the/") + 26,
        window.location.href.length
      );
      HTTP.get(`/salon/main/manage/card/${Code}/customer?page=1`)
        .then((response) => {
          this.listCustomerCard = response.data.data.data;
          if (this.listCustomerCard.length == 0) {
            this.msg = "chưa có người dùng";
          } else return this.listCustomerCard;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // // ==================

    // Xoá người dùng thẻ
    deleteCustomer(index) {
      this.$swal({
        title: "Xoá người dùng?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          let cardId = window.location.href.slice(
            window.location.href.indexOf("/danh-sach-nguoi-dung-the/") + 26,
            window.location.href.length
          );
          let customerId = index;
          HTTP.delete(
            `/salon/main/manage/card/${cardId}/customer/${customerId}/delete`
          ).then((res) => {
            let result = res.data;
            if (result.status === 1) {
              this.$swal("Đã xoá!", result.message, "success");
              this.listCustomerCards();
            } else {
              this.$swal("", result.message, "error");
            }
          });
        }
      });
    },
    // ======================

    // Định dạng giới tính
    formatSex(index) {
      if (index === 1) {
        return (index = "nam");
      } else return (index = "nữ");
    },
    // ====================
    backPage() {
      history.back();
    },
    formatPrice,
    formatDate,
  },
  computed: {
    // TÌm kiếm
    filterCustomer() {
      // console.log(this.listCustomerCard);
      return this.listCustomerCard.filter((item) => {
        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
    // =============
  },
};
</script>

<style scoped>
.borderx {
  border: 1px solid #d4476f;
  padding: 5px 25px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
