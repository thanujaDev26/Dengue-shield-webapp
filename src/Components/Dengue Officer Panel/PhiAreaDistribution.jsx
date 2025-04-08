import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// PHI Area Distribution Chart Component
const PHIAreaDistribution = ({ messageList }) => {
  // Process data for PHI area distribution
  const getPHIAreaData = () => {
    if (!messageList || messageList.length === 0) return [];

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

    // Count cases by PHI area
    const areaMap = {};

    thisMonthData.forEach((msg) => {
      if (msg.phiOfficer && msg.phiOfficer.area) {
        const area = msg.phiOfficer.area;
        if (areaMap[area]) {
          areaMap[area]++;
        } else {
          areaMap[area] = 1;
        }
      }
    });

    // Convert to array for chart
    const areaData = Object.entries(areaMap).map(([area, count]) => ({
      name: area,
      cases: count,
    }));

    // Sort by number of cases (descending)
    return areaData.sort((a, b) => b.cases - a.cases);
  };

  const areaData = getPHIAreaData();

  if (areaData.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          PHI Area Distribution
        </h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500">No area data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Cases by PHI Area
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={areaData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cases" fill="#10B981" name="Number of Cases" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// PropTypes validation
PHIAreaDistribution.propTypes = {
  messageList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      status: PropTypes.string,
      createdAt: PropTypes.string,
      phiOfficer: PropTypes.shape({
        area: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default PHIAreaDistribution;
