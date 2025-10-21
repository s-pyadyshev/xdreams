import Chart from "chart.js/auto";

export const pieChart = (function () {
  const init = function () {};

  const ctx = document.getElementById("pie-chart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Red", "Green", "Blue"],
      datasets: [
        {
          label: "# of Votes",
          data: [25, 50, 100],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  return {
    init: init,
  };
})();
