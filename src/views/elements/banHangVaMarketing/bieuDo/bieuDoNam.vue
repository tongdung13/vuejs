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
    dataBdDuongNam: {
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
          labels: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
          datasets: [
            {
              label: "Money",
              data: this.dataBdDuongNam,
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
      data: {
        labels: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
      },
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
