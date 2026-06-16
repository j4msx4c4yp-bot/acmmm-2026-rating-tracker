# ACM MM 2026 Final Rating Tracker

一个可开源的静态网页原型，用来登记不同 `paper id` 的 final rating，并实时查看每篇 paper 的均分和总体分位点。

## 功能

- 首页提供两个入口：提交最终审稿分数、查看已记录最终分数
- 提交页支持一次录入多篇 paper
- 每篇 paper 支持 1 到 5 个 final rating
- `paper id` 唯一；重复提交会提示该 paper 已经记录
- 结果页按 `paper id` 顺序展示记录
- 自动计算每篇 paper 的平均分
- 实时显示已记录 paper 平均分的 25%、50%、75% 分位点
- 支持导出 JSON
- 已内置 2026-06-16 截图整理出的 61 条初始记录
- 配置 Supabase 后支持多人共同维护同一份公开结果

## 使用

本地预览：

```bash
python3 -m http.server 8097
```

然后打开 `http://localhost:8097`。

如果 `config.js` 仍然是占位符配置，页面会使用浏览器 `localStorage`，适合本地预览。填入 Supabase Project URL 和 anon public key 后，页面会自动切换为共享数据库模式。

## 发布

按照 `DEPLOY.md` 操作：

1. 在 Supabase SQL Editor 运行 `supabase-schema.sql`
2. 把 Supabase Project URL 和 anon public key 填入 `config.js`
3. 推送到 GitHub
4. 在 GitHub Pages 启用 `main` 分支部署
