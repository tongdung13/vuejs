<template>
  <ScrollTopComponent>
    <a class="btnx">
      <i class="fa fa-arrow-up fa-2x"></i>
    </a>
  </ScrollTopComponent>
</template>

<script>
import ScrollTopComponent from "./ScrollTopComponent";
export default {
  components: {
    ScrollTopComponent,
  },
};
</script>

<style>
.btnx {
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 1);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
}
.btnx i {
  color: #d4476f;
}
</style>
