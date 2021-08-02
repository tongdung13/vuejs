<template>
  <div class="notifycation">
    <div class="mess pt-3">
      <div class="abcd">
        <!-- <div class="row">
          <div class="col-md-6 col-sm-12 col-12">
            <div class="bg11 text-center">
              <span class="font-weight-bold">Thông báo chung</span>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 col-12 margin-top-5">
            <div class="bg11 text-center">
              <span class="font-weight-bold">Thông báo theo vị trí</span>
            </div>
          </div>
        </div> -->
        <div v-for="(item, index) in listNoti" :key="index">
          <div class="row hover p-4" 
            :class="{ bgActive: item.seen == 0 }">
            <div class="col-md-2 col-sm-2 col-2 center">
              <img :src="item.avatar" alt="" style="width: 40px; height: 40px; border-radius: 50%" />
            </div>
            <div class="col-md-7 col-sm-8 col-8 p-0">
              <span class="font-weight-bold"> {{ item.type_noti_name }}</span>
              <br />
              <span> {{ item.content }} </span>
            </div>
            <div class="col-md-3 col-sm-2 col-2 pl-0 center">
              <!-- <span class="bg-12"></span> -->
              {{ getHumanDate(item.created_at) }}
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/main";
import moment from "moment";
import vi from "moment/locale/vi";
moment.updateLocale("vi", vi);
export default {
  data() {
    return {
      listNoti: {},
    };
  },
  beforeMount() {
    this.listNotis();
  },
  methods: {
    getHumanDate: function(date) {
      return moment(date).fromNow();
    },
    // danh sách thông báo
    listNotis() {
      HTTP.get(`/salon/main/manage/notification/all`)
        .then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.loading = false;
            this.hasData = true;
            this.listNoti = res.data.data.data.data;
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
.hao {
  position: relative;
}
.notifycation {
  position: fixed;
  width: 450px;
  top: 42px;
  right: 24px;
  z-index: 10;
  background: white;
  font-size: 12px;
  border: 1px solid #d4476f;
  border-radius: 16px;
}
.mess {
  padding: 15px 15px 15px 0;
  height: 90vh;
  overflow: hidden;
}
hr{
  /* margin: 0 !important; */
}
.abcd {
  height: 100%;
  margin-right: -31px;
  padding-right: 17px;
  overflow-y: scroll;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
hr {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.hover {
  cursor: pointer;
}
.hover:hover {
  background: rgb(228, 228, 228);
}
.bg11 {
  background: #efefef;
  padding: 5px 10px;
  cursor: pointer;
  /* shape */
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
}
.bg11:hover {
  background: #d4476f;
  color: white;
}
.bg-12 {
  background: #d4476f;
  border-radius: 50%;
  padding: 5px 7px;
  color: white;
}
.bgActive {
  background: rgb(226, 223, 223) !important;
}
hr {
  margin: 0 !important;
  padding: 2px !important;
}
@media only screen and (max-width: 768px) {
  .right-0 {
    right: 0 !important;
  }
  .notifycation {
    max-width: 250px;
  }
  .mess {
    max-height: 430px;
  }
}
</style>
