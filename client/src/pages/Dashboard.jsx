import { useEffect, useState } from "react";
import {
  Package,
  Users,
  ShoppingCart,
  IndianRupee,
} from "lucide-react";

import API from "../api/axios";

import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import RecentSales from "../components/RecentSales";

function Dashboard() {
  const [summary, setSummary] = useState({});
  const [chartData, setChartData] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      // Dashboard Summary
      const summaryRes = await API.get("/dashboard/summary");

      if (summaryRes.data.success) {
        setSummary(summaryRes.data.data);
      }

      // Sales Chart
      const chartRes = await API.get("/dashboard/sales-chart");

      if (chartRes.data.success) {
        const formattedChart = chartRes.data.data.map((item) => ({
          date: item.month,
          revenue: Number(item.sales),
        }));

        setChartData(formattedChart);
      }

      // Recent Sales
      const salesRes = await API.get("/dashboard/recent-sales");

      if (salesRes.data.success) {
        const formattedSales = salesRes.data.data.map((sale) => ({
          invoiceNumber: sale.invoiceNumber,
          customerName: sale.customer?.name || "Unknown",
          amount: Number(sale.totalAmount),
          date: new Date(sale.createdAt || sale.saleDate).toLocaleDateString(),
        }));

        setSales(formattedSales);
      }
    } catch (err) {
      console.error("Dashboard Error:", err);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Inventra ERP Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={summary.totalProducts || 0}
          icon={Package}
        />

        <StatCard
          title="Total Customers"
          value={summary.totalCustomers || 0}
          icon={Users}
        />

        <StatCard
          title="Total Sales"
          value={`₹${summary.totalSales || 0}`}
          icon={ShoppingCart}
        />

        <StatCard
          title="Profit"
          value={`₹${summary.profit || 0}`}
          icon={IndianRupee}
        />
      </div>

      {/* Revenue Chart */}
      <div className="mt-8">
        <RevenueChart data={chartData} />
      </div>

      {/* Recent Sales */}
      <div className="mt-8">
        <RecentSales sales={sales} />
      </div>
    </>
  );
}

export default Dashboard;