<template>
  <div style="height: 100%; width: 100%">
    <vue3-chart-js
      :id="doughnutChart.id"
      :type="doughnutChart.type"
      :data="dataLine.data"
      :options="doughnutChart.options"
    ></vue3-chart-js>
  </div>
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";

export default {
  name: "bieuDoThang",
  components: {
    Vue3ChartJs,
  },
  props: {
    dataBdDuongThang: {
      type: Object,
    },
  },
  data() {
    return {
      index: [10, 20, 5],
      dataLine: {},
    };
  },
  beforeMount() {
    this.getBdDuong();
  },
  methods: {
    getBdDuong() {
      this.dataLine = {
        data: {
          labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4", "Tuần 5"],
          datasets: [
            {
              label: "Money",
              data: this.dataBdDuongThang,
              fill: false,
              borderColor: "#06b70d",
              tension: 0.5,
            },
          ],
        },
      };
    },
  },
  setup() {
    const doughnutChart = {
      id: "line",
      type: "line",
      options: {
        plugins: {
          datalabels: {
            display: true,
            align: "bottom",
            backgroundColor: "#ccc",
            borderRadius: 3,
            font: {
              size: 100,
            },
          },
        },
      },
    };

    return {
      doughnutChart,
    };
  },
};
</script>
