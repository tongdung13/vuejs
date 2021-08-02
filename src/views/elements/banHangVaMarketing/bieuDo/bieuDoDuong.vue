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
  name: "bieuDoDuong",
  components: {
    Vue3ChartJs,
  },
  props: {
    dataBdDuong: {
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
        labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
        datasets: [
          {
            label: "Money",
            data: this.dataBdDuong,
            fill: false,
            borderColor: "#06b70d",
            tension: 0.5,
          },
        ],
      },
      };
    }
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
