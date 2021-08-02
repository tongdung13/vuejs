<template>
  <div class="messaging right-0 hao" id="box-chat-component">
    <div class="inbox_msg">
      <div
        class="row pt-1 pl-3 pb-2 pr-3"
        style="border-bottom: 1px solid #d4476f; background: #d4476f"
      >
        <div
          class="col-md-6 col-sm-6 col-6 text-white font-weight-bold"
          style="font-size: 20px !important"
        >
          TIN NHẮN
        </div>
        <div class="col-md-6 col-sm-6 col-6 text-right">
          <div class="modal-dialog" style="margin: 0">
            <div class="modal-content">
              <img
                src="../assets/image/close.png"
                alt=""
                class="close"
                data-dismiss="modal"
                style="cursor: pointer; margin-top: 5px"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Box list message -->
      <div class="mesgs">
        <div class="msg_history">
          <!-- Start list message -->
          <loadingData v-if="loadingMessage"></loadingData>
          <div v-else-if="hasDataMessage" id="listMessage">
            <div v-for="(itemMessage, key) in listMessage" :key="key">
              <div
                class="outgoing_msg"
                v-if="itemMessage.sender_id === currentUser.id"
              >
                <div class="incoming_msg_img1">
                  <img
                    :src="itemMessage.sender_avatar"
                    :alt="itemMessage.sender_name"
                    :title="itemMessage.sender_name"
                  />
                </div>
                <div class="sent_msg">
                  <p>{{ itemMessage.content }}</p>
                </div>
              </div>

              <div class="incoming_msg" v-else>
                <div class="incoming_msg_img">
                  <img
                    :src="itemMessage.sender_avatar"
                    :alt="itemMessage.sender_name"
                    :title="itemMessage.sender_name"
                  />
                </div>
                <div class="received_msg">
                  <div class="receivedWithMsg">
                    <p>{{ itemMessage.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End list message -->
        </div>
        <div class="type_msg">
          <div class="input_msg_write">
            <input
              type="text"
              class="write_msg"
              placeholder="Viết tin nhắn"
              v-model="content"
            />
            <span class="msg_send_btn" @click="sendMessage">
              <img src="../assets/image/sent.png" alt="" />
            </span>
          </div>
        </div>
      </div>
      <!-- End box list message -->

      <!-- Box list conversation -->
      <div class="inbox_people">
        <div class="inbox_chat" id="inbox_chat">
          <!-- Start list conversation -->
          <loadingData v-if="loadingConversation"></loadingData>
          <div class="abc" v-else-if="hasDataConversation" id="listUser">
            <div v-for="(itemConversation, key) in listConversation" :key="key">
              <div
                :id="'id' + itemConversation.code"
                class="chat_list"
                :class="
                  itemConversation.code === conversationCode
                    ? 'active_chat'
                    : ''
                "
                @click="
                  changeClass(
                    itemConversation.code,
                    itemConversation.receiver_id
                  )
                "
              >
                <div class="chat_people">
                  <div class="chat_img">
                    <img
                      :src="itemConversation.receiver_avatar"
                      :alt="itemConversation.receiver_name"
                      :title="itemConversation.receiver_name"
                    />
                  </div>
                  <div class="chat_ib">
                    <h5>
                      {{ itemConversation.receiver_name }}
                      <span class="chat_date">
                        ({{ itemConversation.message_last_time }})
                      </span>
                    </h5>
                    <p>{{ itemConversation.last_message }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-else
            class="text-center"
            style="font-size: 14px; padding-top: 10px"
          >
            Chưa có cuộc hội thoại
          </div>
          <!-- End list conversation -->
        </div>
      </div>
      <!-- End box list conversation -->
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/main";
import jQuery from "jquery";
import Pusher from "pusher-js";
import loadingData from "@/components/loadingData";

// TODO load more conversation and message when scroll element

export default {
  name: "chatBox",
  components: {
    loadingData,
  },
  data() {
    return {
      crPageConversation: 1,
      listConversation: [],
      loadingConversation: true,
      hasDataConversation: false,

      crPageMessage: 1,
      listMessage: [],
      loadingMessage: false,
      hasDataMessage: false,

      currentUser: {},
      conversationCode: "",
      content: "",
      receiver_id: "",
    };
  },
  created() {
    this.subscribe();
  },
  beforeMount() {
    this.getListConversation();
    this.getCurrentUser();
  },
  methods: {
    subscribe() {
      let pusher = new Pusher("1501b09ec0e3c4830730", { cluster: "ap1" });
      pusher.subscribe("Conversation");
      pusher.bind("messageContent", (data) => {
        let userId = this.currentUser.id;
        let message = data.data;
        jQuery("#id" + message.messages.code + " .chat_date").html(
          " (" + message.messages.time_created + ")"
        );
        jQuery("#id" + message.messages.code + " p").html(
          message.messages.content
        );
        if (parseInt(userId) !== parseInt(message.userInfo.id)) {
          let user =
            '<div><div class="chat_list">' +
            '<div class="chat_people"><div class="chat_img">' +
            '<img src="' +
            message.userInfo.avatar +
            '" alt="' +
            message.userInfo.name +
            '" title="' +
            message.userInfo.name +
            '"/>' +
            '</div><div class="chat_ib"> <h5>' +
            message.userInfo.name +
            '<span class="chat_date"> (' +
            message.messages.time_created +
            ")</span></h5><p>" +
            message.messages.content +
            "</p></div></div></div></div>";
          jQuery("#listUser").append(user);
          this.hasDataConversation = true;
        }
        if (this.conversationCode === message.messages.code) {
          let html = "";
          if (parseInt(userId) === parseInt(message.userInfo.id)) {
            html =
              '<div><div class="outgoing_msg"><div class="incoming_msg_img1">' +
              '<img src="' +
              message.userInfo.avatar +
              '" alt="' +
              message.userInfo.name +
              '" title="' +
              message.userInfo.name +
              '" />' +
              '</div><div class="sent_msg"><p>' +
              message.messages.content +
              "</p></div></div></div>";
          } else {
            html =
              '<div><div class="incoming_msg"><div class="incoming_msg_img">' +
              '<img src="' +
              message.userInfo.avatar +
              '" alt="' +
              message.userInfo.name +
              '" title="' +
              message.userInfo.name +
              '" />' +
              '</div><div class="received_msg"><div class="receivedWithMsg"><p>' +
              message.messages.content +
              "</p></div></div></div></div>";
          }
          jQuery("#listMessage").append(html);
          this.setHeight(200);
        }
      });
    },
    getCurrentUser() {
      let account = localStorage.getItem("userInfo");
      if (account) {
        this.currentUser = JSON.parse(account);
      }
    },
    async getListConversation() {
      await HTTP.get("/common/message?page=" + this.crPageConversation).then(
        (res) => {
          let result = res.data;
          if (result.status === 1) {
            let content = result.data;
            if (content.data.length) {
              this.crPageConversation += 1;
              this.listConversation.push(...content.data);
              this.hasDataConversation = true;
            }
          } else {
            this.$swal("Xảy ra lỗi", result.message, "error");
          }
          this.loadingConversation = false;
        }
      );
    },
    async detailConversation(idCode) {
      this.loadingMessage = true;
      this.hasDataMessage = false;
      this.listMessage = [];
      await HTTP.get(
        "/common/message/" + idCode + "/detail?page=" + this.crPageMessage
      ).then((res) => {
        let result = res.data;
        if (result.status === 1) {
          let content = result.data;
          this.listMessage.unshift(...content.data.reverse());
          this.hasDataMessage = true;
        } else {
          this.$swal("Xảy ra lỗi", result.message, "error");
        }
        this.setHeight(200);
        this.loadingMessage = false;
      });
    },
    sendMessage() {
      let err = "";
      let content = this.content;
      let receiver_id = this.receiver_id;
      if (content === "") {
        err = "Vui lòng nhập nội dung tin nhắn";
      } else if (content.length > 10000) {
        err = "Nội dung tin nhắn không quá 10.000 ký tự";
      }
      if (!receiver_id) {
        err = "Vui lòng chọn cuộc trò chuyện";
      }
      if (err === "") {
        HTTP.post("/common/message/store", {
          receiver_id: receiver_id,
          content: content,
        }).then((res) => {
          let result = res.data;
          if (result.status === 1) {
            this.content = "";
          } else {
            this.$swal("", result.message, "error");
          }
        });
      } else {
        this.$swal("", err, "error");
      }
    },
    changeClass(idCode, receiver_id) {
      jQuery(".chat_list").removeClass("active_chat");
      jQuery("#" + idCode).addClass("active_chat");
      this.conversationCode = idCode;
      this.receiver_id = receiver_id;
      this.detailConversation(idCode);
    },
    setHeight(time) {
      setTimeout(() => {
        let height = jQuery("#listMessage").height();
        jQuery(".msg_history").animate(
          {
            scrollTop: height,
          },
          250
        );
      }, time);
    },
  },
};
</script>

<style>
#box-chat-component.hao {
  position: relative;
}

#box-chat-component.messaging {
  width: 40%;
  margin: 0 0 50px 0;
  border-radius: 16px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 10;
}

#box-chat-component img {
  max-width: 100%;
}

#box-chat-component .chat_date {
  font-size: 11px !important;
  opacity: 0.7;
}

#box-chat-component .inbox_people {
  float: left;
  width: 40%;
  border-right: 1px solid #d4476f;
}

#box-chat-component .inbox_msg {
  border: 1px solid #d4476f;
  /* max-width: 680px; */
  clear: both;
  height: 515px;
  overflow: hidden;
  border-radius: 16px;
  background: white;
}

#box-chat-component .top_spac {
  margin: 20px 0 0;
}

#box-chat-component .srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}

#box-chat-component .headind_srch {
  padding: 10px 29px 10px 20px;
  overflow: hidden;
  border-bottom: 1px solid #c4c4c4;
}

#box-chat-component .srch_bar input {
  border: 1px solid #cdcdcd;
  width: 80%;
  padding: 2px 0 4px 6px;
  background: none;
}

#box-chat-component .srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}

#box-chat-component .srch_bar .input-group-addon {
  margin: 0 0 0 -27px;
}

#box-chat-component .chat_ib h5 {
  font-size: 13px;
  color: #464646;
  margin: 0 0 8px 0;
}

#box-chat-component .chat_ib h5 span {
  font-size: 13px;
}

#box-chat-component .chat_ib p {
  font-size: 12px;
  color: #989898;
  margin: auto;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}

#box-chat-component .chat_img {
  float: left;
  width: 12%;
}

#box-chat-component .chat_img img {
  border-radius: 50%;
}

#box-chat-component .chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
  height: 60px;
  overflow: hidden;
}

#box-chat-component .chat_people {
  overflow: hidden;
  clear: both;
}

#box-chat-component .chat_list {
  margin: 0;
  padding: 10px 10px 10px;
  cursor: pointer;
}

#box-chat-component .inbox_chat {
  height: 550px;
  overflow-y: scroll;
  margin-right: -20px;
}

#box-chat-component .active_chat {
  background: rgba(212, 71, 111, 0.2);
}

#box-chat-component .incoming_msg_img {
  display: inline-block;
  width: 8%;
}

#box-chat-component .incoming_msg_img1 {
  width: 8%;
  float: right !important;
  margin-left: 5px;
}

#box-chat-component .received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
}

#box-chat-component .receivedWithMsg p {
  background: #ebebeb none repeat scroll 0 0;
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 0 8px 8px 8px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
  line-height: 20px;
}

#box-chat-component .time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}

#box-chat-component .receivedWithMsg {
  width: 80%;
}

#box-chat-component .mesgs {
  float: left;
  padding: 15px 15px 10px 15px;
  width: 60%;
  border-right: 1px solid #d4476f;
  background: white;
}

#box-chat-component .sent_msg p {
  background: #d4476f none repeat scroll 0 0;
  border-radius: 8px 0 8px 8px;
  /* shape */

  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  margin: 0;
  color: #fff;
  padding: 5px 10px 5px 12px;
  width: 100%;
  line-height: 20px;
}

#box-chat-component .outgoing_msg {
  overflow: hidden;
  margin: 16px 0;
}

#box-chat-component .incoming_msg {
  margin: 16px 0;
}

#box-chat-component .sent_msg {
  float: right;
  width: 70%;
}

#box-chat-component .input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 16px;
  min-height: 48px;
  width: 100%;
}

#box-chat-component .type_msg {
  border-top: 1px solid #d4476f;
  position: relative;
}

#box-chat-component .msg_send_btn {
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}

#box-chat-component .msg_history {
  height: 400px;
  overflow-y: scroll;
  margin-right: -20px;
  padding-right: 17px;
}

#box-chat-component .inbox_chat ::-webkit-scrollbar,
#box-chat-component .msg_history::-webkit-scrollbar {
  display: none;
}

#box-chat-component .modal-content {
  display: inline;
  border: none;
}

#box-chat-component .close {
  opacity: 1;
}

@media only screen and (max-width: 768px) {
  #box-chat-component.messaging {
    width: 95%;
    height: 470px;
  }
  #box-chat-component .mesgs {
    height: 100%;
  }
  /* #box-chat-component.right-0 {
    right: 0 !important;
  } */
  #box-chat-component .msg_history {
    height: 80%;
  }
}

@media (min-width: 576px) {
  #box-chat-component .modal-dialog {
    max-width: 500px;
    margin: 0;
  }
}
</style>
