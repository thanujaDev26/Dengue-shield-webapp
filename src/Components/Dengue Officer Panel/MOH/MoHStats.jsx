import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import mohService from "../../../service/mohService";
import PHIAreaDistribution from "../PhiAreaDistribution";

export default function MoHStats({ id }) {
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("monthly"); // "monthly" or "yearly"

  useEffect(() => {
    async function getMessageList() {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const response = await mohService.getMessageList(id);
        const messagelist = response.data;
        setMessageList(messagelist);
      } catch (error) {
        console.error("Error fetching message list:", error);
        setError("Failed to fetch message list. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    getMessageList();
  }, [id]);

  // Process data for stats
  const processData = () => {
    if (!messageList || messageList.length === 0) return null;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Filter for current month's data
    const thisMonthData = messageList.filter((msg) => {
      const msgDate = new Date(msg.createdAt);
      return (
        msgDate.getMonth() === currentMonth &&
        msgDate.getFullYear() === currentYear
      );
    });
    console.log(thisMonthData);
    // Status counts for current month
    const statusCounts = {
      PENDING: thisMonthData.filter((msg) => msg.status === "PENDING").length,
      SENT: thisMonthData.filter((msg) => msg.status === "SENT").length,
      COMPLETED: thisMonthData.filter((msg) => msg.status === "COMPLETED")
        .length,
    };

    const totalH544 = thisMonthData.length;

    // Disease distribution
    const diseaseData = [];
    const diseaseMap = {};

    thisMonthData.forEach((msg) => {
      if (msg.h544 && msg.h544.diseaseName) {
        const disease = msg.h544.diseaseName;
        if (diseaseMap[disease]) {
          diseaseMap[disease]++;
        } else {
          diseaseMap[disease] = 1;
        }
      }
    });

    for (const [disease, count] of Object.entries(diseaseMap)) {
      diseaseData.push({ name: disease, value: count });
    }

    // Monthly trend data (for the current year)
    const monthlyTrend = [];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let i = 0; i < 12; i++) {
      const monthData = messageList.filter((msg) => {
        const msgDate = new Date(msg.createdAt);
        return (
          msgDate.getMonth() === i && msgDate.getFullYear() === currentYear
        );
      });

      monthlyTrend.push({
        name: months[i],
        total: monthData.length,
        pending: monthData.filter((msg) => msg.status === "PENDING").length,
        sent: monthData.filter((msg) => msg.status === "SENT").length,
        completed: monthData.filter((msg) => msg.status === "COMPLETED").length,
      });
    }

    // Yearly trend data
    const yearlyTrend = [];
    const startYear = currentYear - 2; // Show 3 years of data

    for (let year = startYear; year <= currentYear; year++) {
      const yearData = messageList.filter((msg) => {
        const msgDate = new Date(msg.createdAt);
        return msgDate.getFullYear() === year;
      });

      yearlyTrend.push({
        name: year.toString(),
        total: yearData.length,
        pending: yearData.filter((msg) => msg.status === "PENDING").length,
        sent: yearData.filter((msg) => msg.status === "SENT").length,
        completed: yearData.filter((msg) => msg.status === "COMPLETED").length,
      });
    }

    // Patient age distribution
    const ageGroups = {
      "0-18": 0,
      "19-35": 0,
      "36-50": 0,
      "51-65": 0,
      "65+": 0,
    };

    thisMonthData.forEach((msg) => {
      if (msg.h544 && msg.h544.patient && msg.h544.patient.age) {
        const age = msg.h544.patient.age;
        if (age <= 18) ageGroups["0-18"]++;
        else if (age <= 35) ageGroups["19-35"]++;
        else if (age <= 50) ageGroups["36-50"]++;
        else if (age <= 65) ageGroups["51-65"]++;
        else ageGroups["65+"]++;
      }
    });

    const ageData = Object.entries(ageGroups).map(([range, count]) => ({
      name: range,
      value: count,
    }));

    return {
      statusCounts,
      totalH544,
      diseaseData,
      monthlyTrend,
      yearlyTrend,
      ageData,
    };
  };

  const stats = processData();

  // Colors for charts
  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE", "#8884d8"];
  const STATUS_COLORS = {
    PENDING: "#FFB020",
    SENT: "#14B8A6",
    COMPLETED: "#10B981",
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );

  if (error)
    return <div className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>;

  if (!stats) return <div className="text-gray-500 p-4">No data available</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        MOH Statistics Dashboard
      </h2>

      {/* Tab Navigation */}
      <div className="flex mb-6">
        <button
          className={`px-4 py-2 mr-2 ${
            activeTab === "monthly"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-md`}
          onClick={() => setActiveTab("monthly")}
        >
          Monthly View
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "yearly"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-md`}
          onClick={() => setActiveTab("yearly")}
        >
          Yearly View
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg shadow border border-green-100">
          <h3 className="text-lg font-semibold text-gray-700">
            Total H544 Forms
          </h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalH544}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow border border-yellow-100">
          <h3 className="text-lg font-semibold text-gray-700">
            Pending Requests
          </h3>
          <p className="text-3xl font-bold text-yellow-600">
            {stats.statusCounts.PENDING}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-700">Sent Requests</h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.statusCounts.SENT}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            H544 Status Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Pending", value: stats.statusCounts.PENDING },
                    { name: "Sent", value: stats.statusCounts.SENT },
                    { name: "Completed", value: stats.statusCounts.COMPLETED },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {[
                    { name: "Pending", value: stats.statusCounts.PENDING },
                    { name: "Sent", value: stats.statusCounts.SENT },
                    { name: "Completed", value: stats.statusCounts.COMPLETED },
                  ].map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={Object.values(STATUS_COLORS)[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disease Distribution */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          {/* <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Disease Distribution
          </h3>
          <div className="h-64"> */}
          <PHIAreaDistribution messageList={messageList} />
          {/* <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.diseaseData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10B981" name="Cases" />
              </BarChart>
            </ResponsiveContainer> */}
          {/* </div> */}
        </div>

        {/* Trend Chart - Monthly or Yearly */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 col-span-1 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {activeTab === "monthly"
              ? "Monthly Trend (This Year)"
              : "Yearly Trend"}
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={
                  activeTab === "monthly"
                    ? stats.monthlyTrend
                    : stats.yearlyTrend
                }
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#10B981"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                  name="Total Cases"
                />
                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="#FFB020"
                  name="Pending"
                />
                <Line
                  type="monotone"
                  dataKey="sent"
                  stroke="#14B8A6"
                  name="Sent"
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#6366F1"
                  name="Completed"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient Age Distribution */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Patient Age Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.ageData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                barSize={40}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366F1" name="Patients" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart for Trends Over Time */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Case Trend Analysis
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={
                  activeTab === "monthly"
                    ? stats.monthlyTrend
                    : stats.yearlyTrend
                }
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#10B981"
                  fill="#10B98133"
                  name="Total Cases"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// PropTypes validation
MoHStats.propTypes = {
  id: PropTypes.number.isRequired,
};
