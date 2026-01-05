import { useState } from "react";
import avatar1 from "@/assets/images/avatars/avatar-1.png";
import avatar2 from "@/assets/images/avatars/avatar-2.png";
import avatar3 from "@/assets/images/avatars/avatar-3.png";
import avatar4 from "@/assets/images/avatars/avatar-4.png";
import avatar5 from "@/assets/images/avatars/avatar-5.png";
import { Chart, useChart } from "@/components/chart";
import Icon from "@/components/icon/icon";
import { GLOBAL_CONFIG } from "@/global-config";
import { Avatar, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Text, Title } from "@/ui/typography";
import { rgbAlpha } from "@/utils/theme";
import BannerCard from "./banner-card";

const quickStats = [
  {
    icon: "solar:wallet-outline",
    label: "All Earnings",
    value: "$3,020",
    percent: 30.6,
    color: "#3b82f6",
    chart: [12, 18, 14, 16, 12, 10, 14, 18, 16, 14, 12, 10],
  },
  {
    icon: "solar:graph-outline",
    label: "Page Views",
    value: "290K+",
    percent: 30.6,
    color: "#f59e42",
    chart: [8, 12, 10, 14, 18, 16, 14, 12, 10, 14, 18, 16],
  },
  {
    icon: "solar:checklist-outline",
    label: "Total Task",
    value: "839",
    percent: 0,
    color: "#10b981",
    chart: [10, 14, 12, 16, 18, 14, 12, 10, 14, 18, 16, 12],
  },
  {
    icon: "solar:download-outline",
    label: "Download",
    value: "2,067",
    percent: -30.6,
    color: "#ef4444",
    chart: [16, 14, 12, 10, 14, 18, 16, 12, 10, 14, 18, 16],
  },
];

const projectUsers = [
  { avatar: avatar1, name: "John" },
  { avatar: avatar2, name: "Wiliam" },
  { avatar: avatar3, name: "Kevin" },
  { avatar: avatar4, name: "Maciej" },
  { avatar: avatar5, name: "Kamil" },
];
const transactions = [
  { icon: "mdi:spotify", name: "Spotify Music", id: "#T11032", amount: 10000, time: "06:30 pm", status: "up" },
  { icon: "mdi:medium", name: "Medium", id: "#T11032", amount: -26, time: "08:30 pm", status: "down" },
  { icon: "mdi:uber", name: "Uber", id: "#T11032", amount: 210000, time: "08:40 pm", status: "up" },
  { icon: "mdi:taxi", name: "Ola Cabs", id: "#T11032", amount: 210000, time: "07:40 pm", status: "up" },
];

const totalIncome = {
  series: [44, 55, 41, 17],
  labels: ["Income", "Download", "Rent", "Views"],
  details: [
    { label: "Income", value: 23876 },
    { label: "Download", value: 23876 },
    { label: "Rent", value: 23876 },
    { label: "Views", value: 23876 },
  ],
};

export default function Workbench() {
  const [activeTab, setActiveTab] = useState("All Transaction");

  const projectOverviewSparklineOption = useChart({
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
    tooltip: { show: false },
    xAxis: { type: "category", show: false, boundaryGap: false, data: Array.from({ length: 8 }, (_, i) => i + 1) },
    yAxis: { type: "value", show: false },
    series: [
      {
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: { color: "#ef4444", width: 2 },
        data: [10, 20, 15, 30, 25, 40, 35, 20],
      },
    ],
  });

  const totalIncomeColors = ["#3b82f6", "#f59e42", "#10b981", "#6366f1"];
  const totalIncomeOption = useChart({
    tooltip: { trigger: "item" },
    series: [
      {
        type: "pie",
        radius: ["45%", "70%"],
        avoidLabelOverlap: true,
        label: { show: false },
        labelLine: { show: false },
        data: totalIncome.labels.map((name, i) => ({
          name,
          value: totalIncome.series[i],
          itemStyle: { color: totalIncomeColors[i] },
        })),
      },
    ],
  });

  // throw new Error("test error"); // 注释掉直接抛错，改用演示组件

  return (
    <div className="flex flex-col gap-4 w-full">
      <BannerCard />
      {/* 顶部四个统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="flex flex-col justify-between h-full">
            <CardContent className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-lg p-2" style={{ background: rgbAlpha(stat.color, 0.1) }}>
                  <Icon icon={stat.icon} size={24} color={stat.color} />
                </div>
                <Text variant="body2" className="font-semibold">
                  {stat.label}
                </Text>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Title as="h3" className="text-2xl font-bold">
                  {stat.value}
                </Title>
                <span
                  className={`text-xs flex items-center gap-1 font-bold ${stat.percent > 0 ? "text-green-500" : stat.percent < 0 ? "text-red-500" : ""}`}
                >
                  {stat.percent > 0 ? (
                    <Icon icon="mdi:arrow-up" size={16} />
                  ) : stat.percent < 0 ? (
                    <Icon icon="mdi:arrow-down" size={16} />
                  ) : null}
                  {stat.percent !== 0 ? `${Math.abs(stat.percent)}%` : stat.label === "Total Task" ? "New" : null}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 项目概览区块 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 flex flex-col gap-4 p-6">
          <Text variant="body2" className="font-semibold mb-2">
            Project overview
          </Text>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Text variant="body2">Total Tasks</Text>
              <Title as="h3" className="text-xl font-bold">
                34,686
              </Title>
            </div>
            <div>
              <Text variant="body2">Pending Tasks</Text>
              <Title as="h3" className="text-xl font-bold">
                3,786
              </Title>
            </div>
            <div className="flex-1 flex items-center justify-end">
              <Button className="w-48" size="sm" variant="default">
                <Icon icon="mdi:plus" size={18} /> Add project
              </Button>
            </div>
          </div>
          <div className="w-full h-16 mt-4">
            <Chart option={projectOverviewSparklineOption} height={60} />
          </div>
        </Card>
        <Card className="flex flex-col gap-4 p-6 items-center justify-center">
          <Text variant="body2" className="font-semibold mb-2">
            {GLOBAL_CONFIG.appName}
          </Text>
          <div className="flex -space-x-2 mb-2">
            {projectUsers.map((user) => (
              <Avatar key={user.name} className="inline-block w-8 h-8 rounded-full">
                <AvatarImage src={user.avatar} />
              </Avatar>
            ))}
          </div>
          <Button className="w-10 h-10 rounded-full flex items-center justify-center" size="icon" variant="secondary">
            <Icon icon="mdi:plus" size={20} />
          </Button>
        </Card>
      </div>

      {/* 交易+收入区块 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 flex flex-col p-6">
          <div className="flex items-center gap-4 mb-4">
            <Text variant="body2" className="font-semibold">
              Transactions
            </Text>
            <div className="flex gap-2">
              {["All Transaction", "Success", "Pending"].map((tab) => (
                <Button
                  key={tab}
                  size="sm"
                  variant={activeTab === tab ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.name} className="border-b last:border-0">
                    <td className="py-2 w-12">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full">
                        <Icon icon={tx.icon} size={20} />
                      </span>
                    </td>
                    <td className="py-2">
                      <div className="font-semibold">{tx.name}</div>
                      <div className="text-xs">{tx.id}</div>
                    </td>
                    <td className="py-2 text-right font-bold">
                      {tx.amount > 0 ? "+" : "-"}${Math.abs(tx.amount).toLocaleString()}
                    </td>
                    <td className="py-2 text-right">
                      <span className={`text-xs font-bold ${tx.status === "up" ? "text-green-500" : "text-red-500"}`}>
                        {tx.status === "up" ? (
                          <Icon icon="mdi:arrow-up" size={14} />
                        ) : (
                          <Icon icon="mdi:arrow-down" size={14} />
                        )}{" "}
                        {tx.status === "up" ? "+" : "-"}10.6%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4 gap-2">
            <Button variant="outline" className="flex-1">
              View all
            </Button>
            <Button className="flex-1">Create new</Button>
          </div>
        </Card>
        <Card className="flex flex-col p-6">
          <Text variant="body2" className="font-semibold  mb-2">
            Total Income
          </Text>
          <div className="flex-1 flex flex-col items-center justify-center">
            <Chart option={totalIncomeOption} height={180} />
            <div className="w-full mt-4">
              {totalIncome.details.map((item, i) => (
                <div key={item.label} className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={"inline-block w-3 h-3 rounded-full"}
                      style={{ background: ["#3b82f6", "#f59e42", "#10b981", "#6366f1"][i] }}
                    />
                    <Text variant="body2">{item.label}</Text>
                  </div>
                  <span className="font-bold">${item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
