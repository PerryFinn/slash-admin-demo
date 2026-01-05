import { domMax, LazyMotion, m } from "motion/react";

type Props = {
  children: React.ReactNode;
};
/**
 * [通过懒加载Motion功能子集来减小包大小](https://www.framer.com/motion/lazy-motion/)
 *
 * 使用LazyMotion和m组件，我们可以将初始渲染减少到6kb，然后同步或异步加载功能子集。
 */
export function MotionLazy({ children }: Props) {
  return (
    <LazyMotion strict features={domMax}>
      <m.div style={{ height: "100%" }}> {children} </m.div>
    </LazyMotion>
  );
}
