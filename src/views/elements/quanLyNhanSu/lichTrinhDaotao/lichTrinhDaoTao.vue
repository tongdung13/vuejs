<template>
  <div class="col-md-10 res mb-5 mt-3">
    <div class="row">
      <div class="col-md-8 col-sm-12 col-12">
        <select
          name="salon_id"
          class="inputx mr-3 res-margin-0"
          id="cars"
          style="width: 30%; outline: none"
          v-model="salon_id"
          @change="onChange()"
        >
          <option value="">Tất cả salon</option>

          <option v-for="salon in listStore" :key="salon.id" :value="salon.id">
            {{ salon.salon_name }}
          </option>
        </select>
        <router-link :to="{ name: 'themLichTrinhDaoTao' }">
          <span class="inputx hover color-main mr-3">+ Thêm lịch trình</span>
        </router-link>
        <!-- <span class="inputx hover color-main">Xuất báo cáo</span> -->
      </div>
      <!-- <div class="col-md-4 div sm-12 col-12">
        <input
          type="text"
          placeholder="Tìm kiếm nhân viên"
          style="
            width: 50%;
            position: relative;
            float: right;
            padding: 4px 10px;
          "
          class="margin-top-5 float-left-0"
        />
        <i
          class="fas fa-search color-main"
          style="position: absolute; top: 9px; right: 55px"
        ></i>
      </div> -->
    </div>
    <div class="mt-4">
      <div class="row">
        <div class="col-md-6">
          <h5 class="color-main font-weight-bold" style="font-size: 16px">
            LỊCH TRÌNH ĐÀO TẠO
          </h5>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <div class="row">
        <div
          class="col-md-3 col-sm-6 col-6 margin-top-5 mt-3"
          v-for="(schedule, index) in listTrainingSchedule"
          :key="index"
        >
          <div
            class="bg1 pt-2 pb-3 pr-3 pl-3"
            style="height: 100%; position: relative"
          >
            <span class="font-weight-bold">{{ schedule.type }}</span>
            <h4 class="text-center mt-3" style="font-size: 18px">
              {{ schedule.title }}
            </h4>
            <div class="mb-5">
              <div
                v-for="(item, index) in schedule.description"
                :key="index"
              >
                {{"*" + item.description }}
              </div>
            </div>
            <div
              class="row mt-4 text-center"
              style="position: absolute; width: 100%; bottom: 15px"
            >
              <div
                class="col-md-4 col-sm-4 col-4 pr-0"
                style="display: flex; align-items: center"
              >
                <router-link
                  :to="{
                    name: 'chiTietLichTrinh',
                    params: { scheduleId: schedule.id },
                  }"
                >
                  <div
                    class="bg2 hover font-weight-bold color-main"
                    style="padding: 7px; cursor: pointer"
                  >
                    Chi tiết
                  </div>
                </router-link>
              </div>
              <div class="col-md-8 col-sm-8 col-8 text-right">
                <h6 class="m-0">{{ schedule.time_date }}</h6>
                <span class="text-danger"> {{ schedule.address }}</span>
              </div>
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
  name: "lichTrinhDaoTao",
  data() {
    return {
      salon_id: "",
      listTrainingSchedule: {},
      listTrainingScheduleSalonId: {},
      listStore: {},
    };
  },
  beforeMount() {
    this.listTrainingSchedules();
    this.getListStore();
  },
  methods: {
    onChange() {
      if (this.salon_id == "") {
        this.listTrainingSchedules();
      } else this.listTrainingScheduleSalonIds();
    },
    // Danh sach tat ca cua hang
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
    // danh sách tất cả lịch trình
    listTrainingSchedules() {
      HTTP.get(`/salon/main/manage/trainingSchedule`)
        .then((res) => {
          this.listTrainingSchedule = res.data.data.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // =======================

    // danh sách theo salonId
    listTrainingScheduleSalonIds() {
      HTTP.get(
        `/salon/main/manage/trainingSchedule?salon_id=${this.salon_id}`
      )
        .then((res) => {
          this.listTrainingSchedule = res.data.data.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // ============================
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}

.input,
input {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid #d4476f;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 5px 10px;
  outline: none;
}

.bg {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 47px;
}

.bg1 {
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}

.bg1:hover {
  background-color: #ffffff;
}

.bg1:hover h4 {
  color: #d4476f;
}

.bg2 {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background-color: #ffffff;
}

ul {
  list-style-type: none;
  padding: 0;
}

/* li {
  float: left;
} */

li a {
  display: block;
  color: #d4476f;
  text-align: center;
  padding: 0.5rem 1em;
  text-decoration: none;
  cursor: pointer;
}

.tab-pane {
  font-size: 14px;
}

li a:hover {
  color: #d4476f;
  text-decoration: none;
}

.active {
  background-color: rgba(212, 71, 111, 0.1);
  border-bottom: 2px solid #d4476f;
}

.menu-right h5:hover {
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}
</style>
