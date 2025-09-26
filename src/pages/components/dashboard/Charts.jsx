import React from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { label } from "framer-motion/client";

ChartJS.register(ChartDataLabels);

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

const Charts = () => {
  // Pie chart data (Spend Breakdown)
  const pieData = {
    labels: ["Food", "Fuel", "ATM", "Others"],
    datasets: [
      {
        data: [8500, 4200, 2800, 1500],
        backgroundColor: ["#3b82f6", "#f97316", "#8b5cf6", "#06b6d4"],
        borderColor: "#fff",
        borderWidth: 1,
        radius: "70%",
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // hide legend, since you use custom labels
      },
      datalabels: {
        display: false, // Disable data labels
      },
    },
  };

  // Line chart data (Monthly Money Flow)
  const lineData = {
    labels: ["1", "5", "10", "15", "20", "25", "30"],
    datasets: [
      {
        label: "Money Loading",
        data: [7400, 8200, 6000, 5000, 7000, 9000, 8500],
        fill: true,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        tension: 0.4,
      },
      {
        label: "Money Unloading",
        data: [2000, 3200, 4000, 4600, 3900, 5500, 20000],
        fill: true,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // hide legend, since you use custom labels
      },
      datalabels: {
        display: false, // Disable data labels
      },
    },
    scales: {
      x: {
        grid: {
          drawBorder: false,
          color: "rgba(250, 212, 137, 0.1)",
          borderColor: "transparent",
          borderDash: [6, 6],
        },
      },
      y: {
        ticks: {
          callback: (value) => `₹${value / 1000}k`, // format ticks
          stepSize: 1, // control interval
          maxTicksLimit: 5, // allow max 5 ticks
          count: 5,
        },
        beginAtZero: true, // always start from 0
        grid: {
          drawBorder: false,
          color: "rgba(250, 212, 137, 0.1)", // dashed line color
          borderColor: "transparent",
          borderDash: [6, 6], // dashed line style
        },
      },
    },
  };
  const outsideLabelPlugin = {
    id: "outsideLabelPlugin",
    afterDraw: (chart) => {
      const {
        ctx,
        chartArea: { width },
      } = chart;

      // Disable labels if width is less than 400px (mobile)
      if (width < 400) return;

      chart.data.datasets[0].data.forEach((value, i) => {
        const meta = chart.getDatasetMeta(0).data[i];
        const angle = (meta.startAngle + meta.endAngle) / 2;
        const radius = meta.outerRadius + 20; // distance from chart
        const x = meta.x + Math.cos(angle) * radius;
        const y = meta.y + Math.sin(angle) * radius;

        ctx.save();
        // ctx.fillStyle = "#000";
        ctx.fillStyle = chart.data.datasets[0].backgroundColor[i];
        ctx.font = "12px Arial";
        ctx.textAlign = x < meta.x ? "right" : "left";
        ctx.textBaseline = "middle";
        const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
        const percentage = ((value / total) * 100).toFixed(1);
        ctx.fillText(`${percentage}%`, x, y);
        ctx.restore();
      });
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Spend Breakdown */}
      <div className="text-card-foreground flex flex-col gap-6 rounded-xl border p-6 card-bg-br chart-heading ">
        <h4 className="chart-heading font-semibold">
          Spend Breakdown - This Month
        </h4>

        <div className="h-64 w-full max-w-md mx-auto flex items-center justify-center">
          <Pie
            data={pieData}
            options={pieOptions}
            plugins={[outsideLabelPlugin]}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {pieData.labels.map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: pieData.datasets[0].backgroundColor[i],
                }}
              />
              <span className="text-sm text-muted-foreground">{label}</span>
              <span className="text-sm font-medium text-foreground">
                ₹{pieData.datasets[0].data[i].toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Money Flow */}
      <div className="text-card-foreground flex flex-col gap-6 rounded-xl border p-6 card-bg-br chart-heading">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          Monthly Money Flow
        </h4>
        <div className="h-64 w-full max-w-md mx-auto flex items-center justify-center">
          <Line data={lineData} options={lineOptions} />
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-sm text-muted-foreground">Money Loading</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400"></div>
            <span className="text-sm text-muted-foreground">
              Money Unloading
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
