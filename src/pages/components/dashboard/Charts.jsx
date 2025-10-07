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
import {
  BarChart,
  BarChart2,
  BarChart3,
  ChartBar,
  MoveLeft,
} from "lucide-react";

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

const Charts = ({ dashBoardData }) => {
  const monthlyFlow = dashBoardData?.monthlyFlow || [];

  const spendBreakdown = dashBoardData?.spendBreakdown || [];
  // Pie chart data (Spend Breakdown)
  const pieData = {
    labels: spendBreakdown.map((item) => item.category),
    datasets: [
      {
        data: spendBreakdown.map((item) => item.total_spent),
        backgroundColor: [
          "#3b82f6", // blue
          "#f97316", // orange
          "#8b5cf6", // purple
          "#06b6d4", // cyan
          "#10b981", // green
          "#ef4444", // red
        ],
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
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => {
            const dataset = tooltipItem.dataset;
            const value = dataset.data[tooltipItem.dataIndex];
            const total = dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            const label = tooltipItem.label;
            return `${label} (${percentage}%): ₹${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  // ------------------ LINE CHART (Dynamic using API) ------------------
  const labels = monthlyFlow.map((item) => item.day_of_month);
  const loadingData = monthlyFlow.map((item) => item.loading);
  const unloadingData = monthlyFlow.map((item) => item.unloading);

  const lineData = {
    labels:
      labels.length > 0 ? labels : ["1", "5", "10", "15", "20", "25", "30"],
    datasets: [
      {
        label: "Money Loading",
        data: loadingData.length > 0 ? loadingData : [0, 0, 0, 0, 0, 0, 0],
        fill: true,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        tension: 0.4,
      },
      {
        label: "Money Unloading",
        data: unloadingData.length > 0 ? unloadingData : [0, 0, 0, 0, 0, 0, 0],
        fill: true,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    interaction: {
      mode: "index", // hover at same x-index across datasets
      intersect: false, // allows vertical line even if not directly on point
    },
    plugins: {
      legend: { display: false },
      datalabels: { display: false },
      tooltip: {
        enabled: true, // use built-in tooltip
        mode: "index",
        intersect: false,
        callbacks: {
          title: (tooltipItems) => `Day: ${tooltipItems[0].label}`,
          label: (tooltipItem) => {
            if (tooltipItem.dataset.label === "Money Loading") {
              return `Money Loading: ₹${tooltipItem.formattedValue}`;
            }
            if (tooltipItem.dataset.label === "Money UnLoading") {
              return `Money UnLoading: ₹${tooltipItem.formattedValue}`;
            }
            return `${tooltipItem.dataset.label}: ₹${tooltipItem.formattedValue}`;
          },
        },
      },
      verticalLine: {
        afterDraw: (chart) => {
          if (chart.tooltip._active && chart.tooltip._active.length) {
            const ctx = chart.ctx;
            const activePoint = chart.tooltip._active[0];
            const x = activePoint.element.x;
            const topY = chart.scales.y.top;
            const bottomY = chart.scales.y.bottom;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "rgba(34,197,94,0.7)";
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.restore();
          }
        },
      },
    },
    scales: {
      x: {
        grid: {
          drawTicks: false,
          drawBorder: false,
          color: "rgba(200,200,200,0.1)",
          borderDash: [6, 6],
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawTicks: false,
          drawBorder: false,
          color: "rgba(255, 255, 255, 0.1)",
          borderDash: [6, 6],
        },
        ticks: {
          callback: (value) => `₹${value / 1000}k`,
        },
      },
    },
    elements: {
      point: {
        radius: 5, // show points on hover
        hoverRadius: 7,
      },
      line: {
        tension: 0.4,
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-1 mb-4">
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
          <BarChart3 style={{ color: "var(--primary-color)" }} />
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
