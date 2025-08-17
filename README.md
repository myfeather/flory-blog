# Flory 博客

## 项目概述

基于Nuxt.js构建的个人博客系统，支持多作者、分类合集和友情链接管理。

## 开始使用

```bash
pnpm install
pnpm run dev
```

访问 `http://localhost:3000`

## 配置说明

### 主配置文件 (`flory.config.ts`)

| 属性 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `title` | string | 博客主标题 | `'Flory 博客'` |
| `description` | string | 博客描述 | `'我们都是流浪者...'` |
| `author` | object | 默认作者信息 | - |
| `author.name` | string | 作者名称 | `'AFeather'` |
| `copyright` | object | 版权信息 | - |
| `copyright.abbr` | string | 版权缩写 | `'CC BY-NC-SA 4.0'` |
| `highlight` | object | 代码高亮配置 | - |
| `highlight.languages` | string[] | 支持的语言列表 | `['js', 'ts', 'vue']` |

示例配置：
```ts
{
  title: 'Flory 博客',
  description: '我们都是流浪者...',
  // 其他配置...
}
```

### 作者配置 (`configs/flory.authors.config.ts`)

| 属性 | 类型 | 说明 | 必填 |
|------|------|------|------|
| `id` | number | 唯一作者ID | 是 |
| `name` | string | 作者显示名称 | 是 |
| `desc` | string | 作者简介 | 否 |

### 合集配置 (`configs/flory.collections.config.ts`)

| 属性 | 类型 | 说明 |
|------|------|------|
| `name` | string | 合集显示名称 |
| `id` | string | 合集唯一标识符 |
| `desc` | string | 合集描述 |

### 友情链接配置 (`configs/flory.links.config.ts`)

#### 分组属性
| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | string | 分组标题 |
| `subTitle` | string | 分组副标题 |
| `links` | array | 链接列表 |

#### 链接属性
| 属性 | 类型 | 说明 |
|------|------|------|
| `name` | string | 链接名称 |
| `url` | string | 链接地址 |
| `desc` | string | 链接描述 |
| `type` | string | 链接类型标识 |

## 注意事项

1. 修改配置后需要重启服务
2. 所有配置都有TypeScript类型提示
3. 必填字段不能为空
