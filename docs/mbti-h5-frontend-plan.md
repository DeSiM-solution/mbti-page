# MBTI 诊断 H5 前端任务拆分计划

## 0. 背景与目标
- 项目基础：已完成 `Vite + Vue3 + TS` 脚手架初始化。
- 设计来源：Figma 文件 `SCHigBKi18HI9HDW6HWssj`，节点 `1011:3`。
- 本文目的：先做任务拆分与架构规划，不写业务代码。
- 交付范围：公共组件清单、移动端外层设置、路由规划、页面 Layout 方案。

## 1. 公共组件规划
## 1.1 基础壳层组件
1. `MobileAppShell`
   - 作用：统一移动端画布宽度、居中、背景、安全区、滚动策略。
   - 复用页面：全部页面。
2. `PageSection`
   - 作用：统一区块间距、内边距、区块背景（白底/浅色卡片等）。
   - 复用页面：LP、Result、Ticket。
3. `PageHeader`
   - 作用：顶部导航/品牌头部（对应设计中的 `header` 组件）。
   - 复用页面：LP、Question、Result、Ticket。
4. `PageFooter`
   - 作用：底部品牌和说明（对应设计中的 `footer` 组件）。
   - 复用页面：LP、Question、Result、Ticket。

## 1.2 按钮与标题类组件
1. `PrimaryButton`
   - 作用：主 CTA（对应设计 `button-1`）。
   - 状态：default、pressed、disabled、loading。
2. `SectionTitle`
   - 作用：统一区块主标题（对应设计 `section-title`）。
   - 说明：支持主标题 + 副标题文案扩展。
3. `BadgeLabel`
   - 作用：小标签/强调文案（如“注意事项”“推荐套餐”等）。

## 1.3 问卷流程组件
1. `QuestionCard`
   - 作用：单题容器（题目 + 插图 + 选项）。
2. `ChoiceOption`
   - 作用：选项按钮（对应 `choices-default / active / disabled`）。
3. `QuestionProgress`
   - 作用：展示题号进度（Q1~Q6）。
4. `QuestionListSection`
   - 作用：问卷页中多题结构编排容器。

## 1.4 结果与营销组件
1. `ResultHeroCard`
   - 作用：展示人格类型、主视觉、核心文案。
2. `ResultFeatureBlock`
   - 作用：展示“特征”“通信风格”等内容块。
3. `SimPlanCard`
   - 作用：展示推荐 eSIM 套餐卡片（价格、套餐名、CTA）。
4. `ShareRewardCard`
   - 作用：展示“分享 3 人领奖励”说明和操作入口。
5. `CouponTicketCard`
   - 作用：兑奖券页面主卡片（票券视觉 + 使用说明）。
6. `FaqAccordion`
   - 作用：FAQ 折叠项（`Question + Answer`）。

## 1.5 组件优先级
1. P0：`MobileAppShell`、`PageHeader`、`PageFooter`、`PrimaryButton`、`SectionTitle`。
2. P1：`QuestionCard`、`ChoiceOption`、`QuestionProgress`。
3. P2：`ResultHeroCard`、`ResultFeatureBlock`、`SimPlanCard`。
4. P3：`ShareRewardCard`、`CouponTicketCard`、`FaqAccordion`。

## 2. 移动端 App 最外层设置建议
## 2.1 基础策略
1. 以手机端优先，设计基准宽度按 `375px` 处理。
2. 页面主体容器建议 `width: 100%`，`max-width: 375px`，桌面端居中显示，移动端铺满视口。

## 2.2 `index.html` 与视口
1. 确保 viewport 配置包含：`width=device-width, initial-scale=1, viewport-fit=cover`。
2. 通过 `viewport-fit=cover` 支持刘海屏安全区。

## 2.3 全局样式基线
1. 清理 Vite 默认模板样式（`color-scheme: light dark`、默认居中布局等）。
2. 统一 box model：`box-sizing: border-box`。
3. 统一字体、行高、背景色、文本抗锯齿。
4. 设置图片与媒体元素为响应式：`max-width: 100%`。

## 2.4 安全区与底部操作区
1. 顶部/底部需要预留 `env(safe-area-inset-top)` 与 `env(safe-area-inset-bottom)`。
2. 有底部固定 CTA 时，主内容要预留底部 padding，避免遮挡。

## 3. 路由页面规划
## 3.1 业务路由数量
1. 建议业务路由 `4` 个，外加 `1` 个兜底路由。

## 3.2 路由定义建议
1. `/`：`LandingPage`
   - 对应 LP 主页面（含 intro、步骤、类型、simless、share、faq）。
2. `/quiz`：`QuizPage`
   - 对应题目流程页（Q1~Q6）。
3. `/result/:type`：`ResultPage`
   - 动态结果页，`type` 示例：`ESTJ | ENTP | INFP | ISFJ | ESFP | INTJ`。
4. `/ticket`：`TicketPage`
   - 对应兑奖券页面。
5. `/:pathMatch(.*)*`：`NotFoundPage`
   - 非业务页面，用于兜底和回跳首页。

## 3.3 路由命名建议
1. `landing`
2. `quiz`
3. `result`
4. `ticket`
5. `not-found`

## 4. 整体 Layout 方案
## 4.1 全局 Layout
1. `MobileAppShell`（全局包裹）
   - 外层：页面背景层（灰底或品牌底色）。
   - 内层：手机画布层（`max-width: 375px`）。
2. 页面结构统一为：
   - `PageHeader`
   - `main`（按 section 组织）
   - `PageFooter`

## 4.2 各页面区块编排
1. `LandingPage`：
   - `FV` -> 入口 CTA -> 分享气泡 -> Intro -> Step 说明 -> Type 列表 -> Simless 区 -> Share 区 -> FAQ -> Footer。
2. `QuizPage`：
   - `FV` -> 问题区块列表（题目组件重复）-> Footer。
3. `ResultPage`：
   - `FV` -> 结果主卡 -> 特征/通信风格 -> 推荐 eSIM -> 套餐 CTA -> 分享激励 -> Footer。
4. `TicketPage`：
   - `FV` -> 票券卡片 -> 注意事项 -> Footer。

## 4.3 Layout 技术原则
1. 所有页面用同一套 spacing token（如 `8/12/16/20/24`）控制间距。
2. 卡片圆角、阴影、按钮高度统一 token 化，减少样式分叉。
3. 插图和装饰元素独立层管理，避免与主内容流混排冲突。
4. 先保证 375 宽度还原，再做 320~430 宽度范围适配。

## 5. 任务拆分与执行顺序
1. 第 1 阶段：项目基础改造
   - 清理 Vite 默认模板。
   - 引入路由能力并完成基础目录规范。
   - 建立全局样式与设计 token。
2. 第 2 阶段：基础公共组件
   - 完成 `MobileAppShell`、`PageHeader`、`PageFooter`、`PrimaryButton`、`SectionTitle`。
3. 第 3 阶段：页面骨架
   - 先搭 4 个路由页面空骨架与区块占位。
4. 第 4 阶段：问卷流程
   - 完成 `QuizPage` 的题目、选项状态、切题与进度展示。
5. 第 5 阶段：结果与兑奖页
   - 完成 `ResultPage`、`TicketPage` 业务组件与布局。
6. 第 6 阶段：联调与验收
   - 全链路跳转测试、移动端适配测试、视觉走查与文案对齐。

## 6. 验收口径
1. 视觉结构与 Figma 主体区块顺序一致。
2. 375 宽下像素级接近设计，320~430 宽无明显错位。
3. 路由可完整串联：`Landing -> Quiz -> Result -> Ticket`。
4. 公共组件可复用且样式 token 化，不在页面内重复写大段样式。
