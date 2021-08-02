<template>
  <div style="height: 100%; width: 100%">
    <vue3-chart-js id="pie" type="pie" :data="dataPie.data"></vue3-chart-js>
  </div>
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";

export default {
  props: {
    input: {
      type: Object,
    },
  },
  data() {
    return {
      dataPie: {},
    }
  },
  name: "bieuDoTron",
  components: {
    Vue3ChartJs,
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    getData() {
      this.dataPie = {
        data: {
          labels: ["Đơn offline", "Đặt lịch online", "Đơn online"],
          datasets: [
            {
              backgroundColor: ["#A5009E", "#FF6028", "#0066FF"],
              data: this.input ,
            },
          ],
        },
      };
    },
  },  
};
</script>
