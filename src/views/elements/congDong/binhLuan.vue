<template>
  <div class="p-2" style="border-top: 5px solid white">
    <!-- Danh sách bình luận -->
    <div class="row mt-2" v-for="(comment, index) in comments" :key="index">
      <div class="col-md-1 pr-0 text-right">
        <img :src="comment.account.avatar" alt="" style="width: 30px" />
      </div>
      <div class="col-md-11">
        <div class="bg-8 p-2">
          <span class="font-weight-bold"> {{ comment.account.name }} </span
          ><br />
          {{ comment.comment }}
        </div>
      </div>
    </div>
    <!-- ============== -->

    <!-- Viết bình luận -->
    <div class="row mt-2">
      <div class="col-md-1 pr-0 text-right">
        <img src="comment.account.avatar" alt="photo" style="width: 30px" />
      </div>
      <div class="col-md-11">
        <div class="bg-8 p-2">
          <span class="font-weight-bold"> Công Hảo </span> <br />
          <input
            type="text"
            id="comment"
            placeholder="Viết bình luận..."
            class="w-100 mt-2"
          />
        </div>
      </div>
    </div>
    <!-- =============== -->
  </div>
</template>
<script>
import { HTTP } from "@/main";
export default {
  name: "binhLuan",
  data() {
    return {
      account: [],
      comments: [],
    };
  },
  created() {
    let Code = window.location.href.slice(
      window.location.href.indexOf("/binh-luan/") + 11,
      window.location.href.length
    );
    console.log(Code);
    HTTP.get(`/salon/main/manage/conversation/${Code}/comment?page=1`).then(
      (res) => {
        this.comments = res.data.data.comments;
        // this.account = res.data.data.comments.account;
        console.log(this.comments);
      }
    );
  },
};
</script>
<style scoped>
#comment {
  border-radius: 32px;
  border: none;
  background: rgba(255, 255, 255);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
}
</style>
