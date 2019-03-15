import ApexCharts from "apexcharts";

const  options = {
  chart: {
    type: "radialBar"
  },
  series: [22, 222, 67, 83],
  labels: ["Apples", "Oranges", "Bananas", "Berries"]
};

const chart = new ApexCharts(document.querySelector("#radial"), options);
chart.render();
