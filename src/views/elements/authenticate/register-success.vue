<template>
  <div class="container mt-5 ip5">
    <div class="row width-30 width-sm-80" style="margin: 0 auto">
      <div class="col-12 box-form pt-4 pb-4 padding-sm-15">
        <h4 class="text-center mb-3 color-main">ĐĂNG KÝ</h4>
        <form class="mt-5 ip5">
          <div class="row">
            <div class="col">
              <h5 class="color-main">ĐĂNG KÝ THÀNH CÔNG</h5>
              <p>
                Bạn vui lòng kiểm tra tin nhắn và đăng nhập dùng thử dịch vụ của
                chúng tôi.
              </p>
              <p>Cảm ơn bạn đã quan tâm sản phẩm của Beauty Salon</p>
            </div>
            <div
              class="col"
              style="
                align-items: center;
                justify-content: center;
                display: flex;
              "
            >
              <img
                src="../../../assets/image/Group.png"
                alt=""
                style="width: 160px"
              />
            </div>
          </div>
          <div class="mt-3 text-center">
            <router-link :to="{ name: 'login' }">
              <button class="mt-2 mr-3 res-button">
                <span>Vào đăng nhập</span>
              </button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register-success",
};
</script>
