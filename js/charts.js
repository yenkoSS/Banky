import Chart from "../node_modules/chart.js/dist/chart.umd"

const xValues = [50,60,70,80];
const yValues = [7,8,8,9,9];
const mychart = document.querySelector('#mychart');
const doughnutChart = document.querySelector('#doughnutChart')

const barColors = [
"rgba(255, 0, 0, 0.6);",
"rgba(67, 245, 39, 0.8)",
"rgba(0, 151, 255, 0.8)",
"rgba(255, 173, 0, 0.8)",
"rgba(0,0,255,0.2)",
];

new Chart("mychart", {
type: "line",
data: {
    labels: xValues,
    datasets: [{
    backgroundColor:"rgba(0,0,255,1.0)",
    borderColor: "rgba(0,0,255,0.1)",
    data: yValues
    }]
},
});

new Chart("doughnutChart", {
type: "doughnut",
data: {
    labels: xValues,
    datasets: [{
    backgroundColor: barColors,
    data: yValues
    }]
},
options: {
    title: {
    display: true,
    text: "World Wide Wine Production"
    }
}
});