<template>
  <div class="col-md-10 res mb-5 mt-3 res-0">
    <div style="font-size: 120%" class="font-weight-bold mt-3 color-main">
      CHI TIẾT SỔ
    </div>
    <div class="table-responsive mt-3">
      <table class="table table-hover">
        <thead>
          <tr>
            <td style="width: 15%"><b>Ngày ghi sổ</b></td>
            <td style="width: 15%">{{ formatDate(detail.record_date) }}</td>
            <td style="width: 15%"><b>Tên kho</b></td>
            <td style="width: 15%">{{ salon }}</td>
          </tr>
          <tr>
            <td style="width: 15%"><b>Sổ chứng từ</b></td>
            <td style="width: 15%">{{ detail.voucher_book }}</td>
            <td style="width: 15%"><b>Sổ hoá đơn</b></td>
            <td>{{ detail.invoice_book }}</td>
          </tr>
          <tr>
            <td style="width: 15%"><b>Diễn giải</b></td>
            <td style="width: 15%">{{ detail.explain }}</td>
       
            <td style="width: 15%"><b>Số lượng nhập: </b></td>
            <td style="width: 15%">
              {{ detail.amount_import }}
            </td>
          </tr>

          <tr>
            <td style="width: 15%"><b>Số lượng xuất: </b></td>
            <td style="width: 15%">
              {{ detail.amount_export }}
            </td>
            
            <td style="width: 15%"><b>Số lượng tồn: </b></td>
            <td style="width: 15%">
              {{ detail.amount_ending_stocks }}
            </td>
           
          </tr>
        
        </thead>
      </table>
      <div class="mt-4 text-center pb-3">
        <span @click="backPage" class="borderx hover mr-3 color-main"
          >Quay lại</span
        >

        <span
          @click="deleteDetail(detail.id)"
          class="borderx hover mr-3 color-main"
          >Xoá
        </span>
        <router-link
          :to="{
            name: 'capNhatSoChiTiet',
            params: { detailId: detail.id },
          }"
        >
          <span class="borderx hover mr-3 color-main"
            >Cập nhật</span
          ></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/main";
import { formatPrice } from "@/main";
import { formatDate } from "@/main";
export default {
  name: "chiTietSoHangHoa",
  data() {
    return {
      salon_id: "",
      detail: [],
      errors: [],
      salon: "",
    };
  },
  methods: {
    deleteDetail(detailId) {
      this.$swal({
        title: "Xoá sổ chi tiết?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.value) {
          HTTP.delete("/salon/main/manage/detailGoods/" + detailId + "/delete")
            .then((res) => {
              let result = res.data;
              // console.log(result);
              if (result.status == 1) {
                this.$swal("", result.message, "success");
                this.backPage();
              } else {
                this.$swal("", result.message, "error");
              }
            })
            .catch((e) => {
              this.$swal("", "Xoá thành công!", "success");
              this.backPage();
              this.errors.push(e);
            });
        }
      });
    },

    detailSalon(id) {
      HTTP.get(`/salon/main/manage/branch/${id}/detail`)
        .then((response) => {
          this.salon = response.data.data.salon_name;
          // console.log(this.salon);
           
        })
        .catch((e) => {
          this.errors.push(e);
        });
       
    },
    backPage() {
      history.back();
    },
    // =================
    formatDate,
    formatPrice,
  },

  created() {
    let code = window.location.href.slice(
      window.location.href.indexOf("/chi-tiet-so-hang-hoa/") + 22,
      window.location.href.length
    );
    console.log(code);
    HTTP.get(`/salon/main/manage/detailGoods/` + code)
      .then((response) => {
        this.detail = response.data.data[0];
        this.detailSalon(this.detail.salon_id);
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}
ul {
  padding: 0;
  margin-top: 7px;
}
ul li a {
  color: black;
}
hr {
  margin-top: 0 !important;
}
.navbar {
  padding: 0;
}
._1AsWWl {
  height: 0.1875rem;
  width: 100%;
  background-position-x: -1.875rem;
  background-size: 7.25rem 0.1875rem;
  background-image: repeating-linear-gradient(
    45deg,
    #6fa6d6,
    #6fa6d6 33px,
    transparent 0,
    transparent 41px,
    #f18d9b 0,
    #f18d9b 74px,
    transparent 0,
    transparent 82px
  );
}
.orfer_detail {
  padding: 1.1875rem 1.5rem 1.625rem 0;
}
.nameSalon {
  color: black;
}
.nameSalon:hover {
  color: #d4476f;
}
.borderx {
  border: 1px solid #d4476f;
  padding: 5px 25px;
  border-radius: 4px;
  cursor: pointer;
}
.table td,
.table th {
  vertical-align: middle !important;
}
</style>
