<template>
  <div class="col-md-10 res mb-5 mt-3">
    <h5 class="mt-3 font-weight-bold color-main">SỬA LỊCH TRÌNH ĐÀO TẠO</h5>

    <!-- Thông tin bán hàng -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <form @submit.prevent="editSchedules">
        <h6>THÔNG LỊCH TRÌNH</h6>
        <div class="mt-3 pb-2">
          <table class="table table-borderless">
            <tbody class="text-right">
              <tr>
                <td style="width: 15%">
                  <div class="table-input">Kiểu đào tạo:</div>
                </td>
                <td style="width: 30%">
                  <input
                    type="text"
                    style="width: 100%"
                    placeholder="Nhập kiểu đào tạo..."
                    v-model="detailSchedule.type"
                  />
                </td>
                <td style="width: 15%">
                  <div class="table-input">Tiêu đề:</div>
                </td>
                <td style="width: 30%">
                  <input
                    type="text"
                    style="width: 100%"
                    placeholder="Nhập tiêu đề..."
                    v-model="detailSchedule.title"
                  />
                </td>
              </tr>
              <tr>
                <td style="width: 15%">
                  <div class="table-input">Thời gian đào tạo:</div>
                </td>
                <td style="width: 30%">
                  <input
                    type="date"
                    style="width: 100%"
                    placeholder="Nhập thời gian đào tạo..."
                    v-model="detailSchedule.time_date"
                  />
                </td>
                <td style="width: 15%">
                  <div class="table-input">Địa chỉ:</div>
                </td>
                <td style="width: 30%">
                  <input
                    type="text"
                    style="width: 100%"
                    placeholder="Nhập địa chỉ..."
                    maxlength="25"
                    v-model="detailSchedule.address"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Tên salon:</div>
                </td>
                <td style="width: 30%">
                  <select
                    name="salon_id"
                    class="inputx mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="detailSchedule.salon_id"
                  >
                    <option value="">Tất cả salon</option>

                    <option
                      v-for="salon in listStore"
                      :key="salon.id"
                      :value="salon.id"
                    >
                      {{ salon.salon_name }}
                    </option>
                  </select>
                </td>
                <td style="width: 15%">
                  <div class="table-input">Mô tả:</div>
                </td>
                <td>
                  <textarea
                    style="width: 100%"
                    rows="4"
                    placeholder="Nhập mô tả..."
                    v-model="detailSchedule.description[0]"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Nội dung chi tiết:</div>
                </td>
                <td colspan="3" style="width: 30%">
                  <textarea
                    style="width: 100%"
                    rows="8"
                    placeholder="Nhập nội dung..."
                    v-model="detailSchedule.content[0]"
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3 text-center pb-3">
          <span @click="backPage" class="borderx hover mr-3 color-main"
            > Quay lại </span
          >
          <button type="submit" class="borderx color-main">
            Lưu và hiển thị
          </button>
        </div>
      </form>
    </div>
    <!-- ================== -->
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "suaLichTrinh",
  data() {
    return {
      listStore: {},
      schedeleId: "",
      detailSchedule: {
        description: [],
        content: [],
        salon_id: "",
      },
    };
  },
  created() {
    this.schedeleId = this.$route.params.lichTrinhId;

    HTTP.get(`/salon/main/manage/trainingSchedule/${this.schedeleId}`)
      .then((res) => {
        this.detailSchedule = res.data.data;
        this.detailSchedule.description[0] =
          res.data.data.description[0].description;
        this.detailSchedule.content[0] = res.data.data.content[0].content;
      })
      .catch((e) => {
        this.errors.push(e);
      });
      HTTP.get("/salon/main/manage/branch/all").then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let data = result.data;

          if (data.length > 0) {
            this.listStore = data;
          }
        } else {
          this.notification.status = true;
          this.notification.message = result.message;
        }
        this.loading = false;
      });
  },
  methods: {
    // Sửa lịch trình
    editSchedules() {
      HTTP.put(
        `/salon/main/manage/trainingSchedule/${this.schedeleId}/update`,
        this.detailSchedule
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          // this.content = "";
          this.$swal("", result.message, "success");
          setTimeout(() => {
            history.back();
          }, 1000);
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // ==============
    backPage() {
      history.back();
    },
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.table-input {
  padding: 5px 10px;
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
</style>
