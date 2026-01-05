import cdnUploadVitePlugin from "@cvte/cdn-upload-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { codeInspectorPlugin } from "code-inspector-plugin";
import { resolve } from "pathe";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { name as APP_NAME, version as APP_VERSION } from "./package.json";

const CDN_SUB_PATH = `/cisp/${APP_NAME}/${APP_VERSION}`; // CDN子路径
const DIST_PATH = resolve(import.meta.dirname, "dist");
const CDN_IGNORE_PATH = resolve(import.meta.dirname, ".cdn-plugin-ignore");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_APP_PUBLIC_PATH || "/";
  const isProduction = mode === "production";

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      tsconfigPaths(),

      isProduction &&
        visualizer({
          open: false,
          gzipSize: true,
          brotliSize: true,
          template: "treemap",
        }),
      codeInspectorPlugin({
        bundler: "vite",
        hideDomPathAttr: true,
        hideConsole: true,
      }),
      // https://gitlab.gz.cvte.cn/sspc/ops/cdn-upload-webpack-plugin
      cdnUploadVitePlugin({
        cdnSubPath: CDN_SUB_PATH, // cdn 上传目录, 建议路径格式是  /{产品名称}/{应用名称}/[版本号]
        resourcePath: DIST_PATH, // 必填参数，支持上传指定文件夹 & 单个文件。填入相对于process.cwd()目录的相对路径。
        cdnigorePath: CDN_IGNORE_PATH, // 可选参数，.cdnignore文件路径。填入相对于process.cwd()目录的相对路径。支持提供.cdnignore文件过滤不需要上传的文件夹 & 单个文件。.cdnignore规则参考.gitignore规则
        // archive: "node-tar", //归档资源文件所使用的工具。 'node-tar': 采用node-tar包(默认)；'system-tar': 采用系统的tar
        // ignoreUploadFail: false, //可选参数， 默认值为false, 即如果出现上传异常，会中断webpack打包进程
        // removeFiles: false, //可选参数， 默认值为false, 是否在上传了cdn后，删除已上传的资源，这样可以有效减小镜像大小和推包时间，而且也能有效减小流量费用
      }),
    ].filter(Boolean),

    server: {
      open: true,
      host: true,
      port: 3001,
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          secure: false,
        },
      },
    },

    build: {
      target: "esnext",
      minify: "esbuild",
      sourcemap: !isProduction,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            "vendor-core": ["react", "react-dom", "react-router"],
            "vendor-ui": ["antd"],
            "vendor-utils": ["axios", "dayjs", "i18next", "mobx", "mobx-react-lite", "@iconify/react"],
            "vendor-charts": ["echarts"],
          },
        },
      },
    },
    css: {
      modules: {
        localsConvention: "camelCase",
      },
    },

    optimizeDeps: {
      include: ["react", "react-dom", "react-router", "antd", "axios", "dayjs", "mobx", "mobx-react-lite"],
      exclude: ["@iconify/react"],
    },

    esbuild: {
      drop: isProduction ? ["console", "debugger"] : [],
      legalComments: "none",
      target: "esnext",
    },
  };
});
