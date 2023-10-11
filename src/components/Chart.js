import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { customAxios } from "../config/api";

const Chart = ({ aspect, title }) => {
  const [revenueState, setrevenueState] = useState(null);

  useEffect(() => {
    getrevenueApi();
  }, []);
  const getrevenueApi = async () => {
    try {
      const res = await customAxios.get("/admin/bill/revenue/all");
      //   dispatch(addListproduct(res.data));
      setrevenueState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  console.log("test", revenueState?.data);
  const data = [
    { name: "Tháng 9", Total: 89038 },
    { name: "Tháng 10", Total: 889089 },
    { name: "Tháng 11", Total: 454678978 },
    { name: "Tháng 12", Total: 34243564 },
    { name: "Tháng 1", Total: 345675 },
    { name: "Tháng 2", Total: 34253647 },
  ];
  // const data = [
  //   { name: "Tháng 9", Total: revenueState?.data[0]?.totalRevenue },
  //   { name: "Tháng 10", Total: revenueState?.data[1]?.totalRevenue },
  //   { name: "Tháng 11", Total: revenueState?.data[2]?.totalRevenue },
  //   { name: "Tháng 12", Total: revenueState?.data[3]?.totalRevenue },
  //   { name: "Tháng 1", Total: revenueState?.data[4]?.totalRevenue },
  //   { name: "Tháng 2", Total: revenueState?.data[5]?.totalRevenue },
  // ];
  return (
    <div className="chart" style={{ width: "75%", paddingLeft: "15px" }}>
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
