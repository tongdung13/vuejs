<template>
  <div class="col-md-10 res mb-5 mt-3">
    <h5 class="mt-3 font-weight-bold color-main">THÊM LỊCH TRÌNH ĐÀO TẠO</h5>

    <!-- Thông tin bán hàng -->
    <div class="mt-4 bg-8 pt-3 pl-5 pr-5">
      <form @submit.prevent="addSchedules">
        <h6>THÔNG LỊCH TRÌNH</h6>
        <div class="mt-3 pb-2">
          <table class="table table-borderless">
            <tbody class="text-right">
              <tr>
                <td>
                  <div class="table-input">Tên salon:</div>
                </td>
                <td style="width: 30%">
                  <select
                    name="salon_id"
                    class="inputx mr-3 res-margin-0"
                    style="width: 100%; outline: none"
                    v-model="addSchedule.salon_id"
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
                  <div class="table-input">Kiểu đào tạo:</div>
                </td>
                <td style="width: 30%">
                  <input
                    type="text"
                    style="width: 100%"
                    placeholder="Nhập kiểu đào tạo..."
                    v-model="addSchedule.type"
                  />
                </td>
              </tr>
              <tr>
                <td style="width: 15%">
                  <div class="table-input">Tiêu đề:</div>
                </td>
                <td style="width: 30%">
                  <input
                    type="text"
                    style="width: 100%"
                    placeholder="Nhập tiêu đề..."
                    v-model="addSchedule.title"
                  />
                </td>
                <td style="width: 15%">
                  <div class="table-input">Thời gian đào tạo:</div>
                </td>
                <td style="width: 30%">
                  <input
                    type="date"
                    style="width: 100%"
                    placeholder="Nhập thời gian đào tạo..."
                    v-model="addSchedule.time_date"
                  />
                </td>
              </tr>
              <tr>
                <td style="width: 15%">
                  <div class="table-input">Địa chỉ:</div>
                </td>
                <td style="width: 30%">
                  <input
                    type="text"
                    style="width: 100%"
                    maxlength="25"
                    placeholder="Nhập địa chỉ..."
                    v-model="addSchedule.address"
                  />
                </td>
                <td style="width: 15%">
                  <div class="table-input">Mô tả:</div>
                </td>
                <td>
                  <input
                    type="text"
                    class="w-100"
                    placeholder="Tối đa 100 kí tự..."
                    maxlength="100"
                    v-model="addSchedule.description[0]"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-input">Nội dung:</div>
                </td>
                <td colspan="3" style="width: 30%">
                  <textarea
                    rows="8"
                    v-model="addSchedule.content[0]"
                    style="width: 100%;"
                    placeholder="Nhập nội dung..."
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3 text-center pb-3">
          <span @click="backPage" class="borderx hover mr-3 color-main">
            Quay lại
          </span>
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
  name: "themLichTrinhDaoTao",
  data() {
    return {
      addSchedule: {},
      listStore: {},
      addSchedule: {
        salon_id: "",
        description: [],
        content: [],
      },
    };
  },
  beforeMount() {
    this.getListStore();
  },
  methods: {
    addSchedules() {
      HTTP.post(
        `/salon/main/manage/trainingSchedule/store`,
        this.addSchedule
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          this.$swal("", result.message, "success");
          setTimeout(() => {
            history.back();
          }, 1000);
        } else {
          this.$swal("", result.message, "error");
        }
      });
    },
    // Danh sách Salon
    getListStore() {
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
    // ====================
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
