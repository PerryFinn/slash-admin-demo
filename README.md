# Slash Admin

Slash Admin 是一款现代化的后台管理模板，基于 React 19、Vite、shadcn/ui 和 TypeScript 构建。它旨在帮助开发人员快速搭建功能强大的后台管理系统。

## 特性

+ 使用 React 19 hooks 进行构建。
+ 基于 Vite 进行快速开发和热模块替换。
+ 集成 shadcn/ui，提供丰富的 UI 组件和设计模式。
+ 使用 TypeScript 编写，提供类型安全性和更好的开发体验。
+ 响应式设计，适应各种屏幕尺寸和设备。
+ 灵活的路由配置，支持多级嵌套路由。
+ 集成权限管理，根据用户角色控制页面访问权限。
+ 集成国际化支持，轻松切换多语言。
+ 集成常见的后台管理功能，如用户管理、角色管理、权限管理等。
+ 可定制的主题和样式，以满足您的品牌需求。
+ 基于 MSW 和 Faker.js 的Mock方案
+ 使用 MobX 进行状态管理
+ 使用 React-Query 进行数据获取

## 快速开始

### 安装依赖

在项目根目录下运行以下命令安装项目依赖：

```bash
pnpm install
```

### 启动开发服务器

运行以下命令以启动开发服务器：

```bash
pnpm dev
```

访问 [http://localhost:3001](http://localhost:3001) 查看您的应用程序。

### 构建生产版本

运行以下命令以构建生产版本：

```bash
pnpm build
```

## 文件结构

## Project Structure

```text
├─ public/
│  └─ mockServiceWorker.js      # MSW startup script (auto-generated service worker script)
├─ src/                         # Core source code
│  ├─ _mock/                    # Mock API data and handlers
│  ├─ api/                      # API request services
│  ├─ assets/                   # Static assets (images, icons)
│  ├─ components/               # Global reusable components
│  ├─ hooks/                    # Custom React Hooks
│  ├─ layouts/                  # Page layout components
│  ├─ locales/                  # Internationalization (i18n) language packs
│  ├─ pages/                    # Page components (corresponding to routes)
│  ├─ routes/                   # Routing configuration
│  ├─ store/                    # Global state management (Mobx)
│  ├─ theme/                    # Theme and style configuration
│  ├─ types/                    # Global TypeScript type definitions
│  ├─ ui/                       # Base UI components (shadcn/ui)
│  ├─ utils/                    # Utility functions
│  ├─ App.tsx                   # Root application component
│  └─ main.tsx                  # Application entry point
├─ .env                         # Environment variables file 
├─ .env.development             # Development environment variables 
├─ .env.production              # Production environment variables 
├─ package.json                 # Project dependencies and scripts
├─ vite.config.ts                # Vite configuration file
├─ tailwind.config.ts            # Tailwind CSS configuration file
├─ tsconfig.ts                   # TypeScript configuration file
└─ biome.json                   # Biome formatter/linter configuration
```
