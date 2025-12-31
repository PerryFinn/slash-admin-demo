import type { EChartsOption } from "echarts";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import { cn } from "@/utils";
import "./styles.css";

const DEFAULT_HEIGHT_PX = 320;

type EChartsInstance = ReturnType<typeof echarts.init>;

export type ChartProps = {
  option: EChartsOption;
  height?: number;
  width?: number | string;
  className?: string;
  renderer?: "canvas" | "svg";
};

export function Chart({
  option,
  height = DEFAULT_HEIGHT_PX,
  width = "100%",
  className,
  renderer = "canvas",
}: ChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<EChartsInstance | null>(null);

  useEffect(() => {
    const dom = containerRef.current;
    if (!dom) return;

    const instance = echarts.init(dom, undefined, { renderer });
    chartRef.current = instance;

    return () => {
      instance.dispose();
      chartRef.current = null;
    };
  }, [renderer]);

  useEffect(() => {
    const instance = chartRef.current;
    if (!instance) return;

    instance.setOption(option, { notMerge: true, lazyUpdate: true });
  }, [option]);

  useEffect(() => {
    const dom = containerRef.current;
    const instance = chartRef.current;
    if (!dom || !instance) return;

    const handleResize = () => instance.resize();

    const resizeObserver = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(handleResize);
    resizeObserver?.observe(dom);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
    };
  }, []);

  return <div ref={containerRef} className={cn("echarts-wrapper", className)} style={{ height, width }} />;
}
