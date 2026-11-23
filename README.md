# Nan's BBS 南生论坛（SpringBoot+Vue2）

[![](https://img.shields.io/badge/Author-马亮南生-orange.svg)](https://bbs.nansin.top/user/1640)
[![](https://img.shields.io/badge/version-3.0.0-brightgreen.svg)](https://github.com/maliangnansheng/bbs-springboot)
[![GitHub stars](https://img.shields.io/github/stars/maliangnansheng/bbs-springboot.svg?style=social&label=Stars)](https://github.com/maliangnansheng/bbs-springboot)
[![GitHub forks](https://img.shields.io/github/forks/maliangnansheng/bbs-springboot.svg?style=social&label=Fork)](https://github.com/maliangnansheng/bbs-springboot)

> [!TIP]
> 本项目基于 AGPL 3.0 协议完全开源，使用此项目时请遵守开源协议，如果觉得不错麻烦帮忙点一次`Star⭐️`
>
> 个人学习使用不限制（公司使用或者商用需要 [**获取授权**](https://bbs.nansin.top/detail/600)）
>
> 加载太慢or图片加载不出来 [**点我**](https://bbs.nansin.top/detail/172)

## 仓库说明

> [!NOTE]
> 本仓库`bbs-vue-ui`是【南生论坛3.0.0】前后端分离项目的**前端项目（Vue2 + Antd）**
>
> 对应的**后端项目**仓库移步至：[bbs-springboot](https://github.com/maliangnansheng/bbs-springboot)
>
> Vue3 + Ant Design Vue 4 版本移步至：[bbs-vue3-ui](https://github.com/maliangnansheng/bbs-vue3-ui)

## 部署效果

开源版演示地址：[https://open.nansin.top](https://open.nansin.top)（普通用户：`自己注册就行`；管理员：`椿/123456`）

商业版演示地址：[https://bbs-corp.nansin.top](https://bbs-corp.nansin.top)（超管：`马亮南生/123456`，体验完整的权限控制）

开源版部署教程：[【后端】安装部署教程](https://bbs.nansin.top/detail/44)、[【前端】安装部署教程](https://bbs.nansin.top/detail/45)

视频教程：[https://www.bilibili.com/video/BV1ThYQzfEvR](https://www.bilibili.com/video/BV1ThYQzfEvR)

文档教程：[01 南生运营（南生系列基础系统）的设计理念](https://bbs.nansin.top/detail/171)、 [02 10分钟搞懂南生论坛](https://bbs.nansin.top/detail/369)、 [03 如何进行南生论坛管理维护？](https://bbs.nansin.top/detail/679)、 [04 南生运营功能介绍](https://bbs.nansin.top/detail/521)、 [05 如何获取南生论坛设计文档？](https://bbs.nansin.top/detail/76)、 [06 南生论坛更新日志（开源计划）](https://bbs.nansin.top/detail/122)

## 项目架构

![](https://76.nansin.top/github/ns-jiagou2.png)

## 关于项目

- 多种技术方案可供选择：[「SpringBoot2 / SpringBoot3 / Spring Cloud Alibaba」与「Vue2 + Antd / Vue3 + Element Plus」](https://bbs.nansin.top/detail/641)
- 分为 [南生论坛](https://bbs.nansin.top) 和 [南生运营（权限管理）](https://manage.nansin.top) 两部分
- 大厂微服务架构，仿掘金风格，前后端分离，多端适配，界面优雅，功能全面，性能高效

## 技术栈

- **框架**：Vue 2.6、Vue Router 3.4、Vuex 3.5（`history` 模式）
- **UI**：Ant Design Vue 1.7（全量引入，含 `antd.css`）
- **构建**：@vue/cli 4.5（Webpack 4）、Less 2.7 + less-loader 7、Babel（`@vue/app` 预设）
- **主题**：webpack-theme-color-replacer 1.3 + @ant-design/colors，打包期生成主题色样式表，运行时可切换
- **Markdown**：mavon-editor 2.10（编辑器 + 预览 + 目录）
- **请求**：Axios 0.21（统一拦截器、响应头同步头像/未读数、`code=302` 触发登录弹窗）
- **国际化**：vue-i18n 8（`zh` / `en` 两套语言包，挂在 `Vue.prototype.$t`）
- **时间处理**：Moment.js 2.29
- **辅助**：vue-clipboard2（复制到剪贴板）、qs（请求参数序列化）
- **构建优化**：uglifyjs-webpack-plugin（JS 压缩）、compression-webpack-plugin（生成 `.gz` 产物）

## 快速开始

```bash
# Node.js 16.x（仓库 .node-version 为 16.20.2）
yarn install

# 启动开发服务器（默认 http://localhost:8082，/api 代理到 http://localhost:7010）
yarn serve

# 生产构建（产物在 dist/，静态资源目录为 static/）
yarn build
```

## 为什么做这个项目？

- 企业一般都需要一个内部社区供开发者学习、分享、交流（本项目参考了稀土掘金、哔哩哔哩等部分功能）。
- 市面上已有的开源社区大部分都是PHP语言的，Java开源的很少，SpringBoot/SpringCloud框架开发的几乎没有。大多数互联网公司内部开发语言都是Java，很多都是SpringBoot/SpringCloud开发框架，对于PHP开源的社区，无法很好的接入公司内部系统。
- 现有的开源社区功能过于简单，无法满足企业的大部分需求。
- 现有的开源社区界面风格老式，没有跟上时代发展的审美，且定制能力差。
- 现有的开源社区缺乏用户/角色/权限统一管理的功能，用户系统各成一套，二开成本过高。

## 视频教程

[https://www.bilibili.com/video/BV1ThYQzfEvR](https://www.bilibili.com/video/BV1ThYQzfEvR)

![](https://76.nansin.top/github/bilibili002.png)

## 联系作者

> **商用** 需要联系作者[**授权**](https://bbs.nansin.top/detail/600)(学习使用不需要授权)

1. 加作者微信：maliangnansheng（[扫码添加](https://bbs.nansin.top/about)）
2. 加作者QQ：924818949（[扫码添加](https://bbs.nansin.top/about)）

## 功能结构

- 南生论坛-功能结构图

  ![](https://76.nansin.top/github/ns-bbs260203.png)

- 南生运营（权限管理）-功能结构图

  ![](https://76.nansin.top/github/ns-manage260106.png)

## 项目结构

```
bbs-vue-ui
├── public
│   ├── favicon.ico
│   └── index.html               # 页面模板（含 less 全局配置）
├── src
│   ├── assets
│   │   ├── css/                 # 全局样式（main.css、main.less）
│   │   ├── font/                # 自定义字体
│   │   ├── icon/                # iconfont 图标（css / js / json / 字体文件）
│   │   ├── img/                 # 图片资源（logo、头像、等级图标、消息图标…）
│   │   └── json/nav.js          # 导航菜单配置
│   ├── components
│   │   ├── article/             # 文章详情、写文章、发布表单、封面上传、审核、左侧按钮
│   │   ├── books/               # 南生值说明页内容
│   │   ├── comment/             # 文章评论、子评论、发表评论
│   │   ├── concern/             # 首页轮播
│   │   ├── errorPage/           # 404 / 500
│   │   ├── index/               # 各页面容器（首页、详情、写文章、用户中心、设置、标签、资源、关于…）
│   │   │   ├── head/            # 页头、导航菜单、移动端侧栏
│   │   │   └── messages/        # 消息、通知、消息盒
│   │   ├── label/               # 标签列表、新增标签、图片上传
│   │   ├── login/               # 登录、注册、手机/邮箱找回密码
│   │   ├── resource/            # 资源列表、新增资源、图片上传
│   │   ├── right/               # 右侧栏卡片（项目简介、作者、作者榜、最新评论、相关文章、目录、备案…）
│   │   ├── user/                # 个人中心、资料/账号设置、绑定手机/邮箱、改密、关注列表、头像上传
│   │   └── utils/               # 返回顶部、空状态、骨架屏、页脚按钮
│   ├── config
│   │   ├── config.js            # 主题色替换插件配置（webpack-theme-color-replacer）
│   │   └── utils.js             # 主题色计算与切换
│   ├── i18n                     # 中英文语言包（zh/、en/）
│   ├── router/index.js          # 路由表（history 模式，页面级懒加载）
│   ├── service/                 # 接口层（axios 拦截器 + 各模块 service）
│   ├── store/index.js           # Vuex：登录态、主题色、语言、屏幕尺寸、未读数、国际化方法
│   ├── utils/utils.js           # 时间格式化、Markdown 目录生成、滚动加载等工具
│   ├── App.vue                  # 根组件（登录/注册等全局弹窗）
│   └── main.js                  # 入口（按需注册 antd、mavon-editor、剪贴板、全局样式）
├── vue.config.js                # 构建配置（端口、代理、gzip、主题插件、CDN externals）
├── babel.config.js
├── jsconfig.json                # `@` 指向 src 的别名提示
└── package.json
```

## 静态展示

> 这里只浅展示部分效果，完整体验去 **商业版演示系统**：[https://bbs-corp.nansin.top/](https://bbs-corp.nansin.top/)

### 微信小程序 | Windows版 | macOS版 | Android版

[去下载Windows版 | macOS版 | Android版](https://www.nansin.top)

![image](https://76.nansin.top/github/apps/nansing-www-wechat.png)

### 用户系统

- **论坛管理**

  ![](https://76.nansin.top/github/bbs/bbs-manage.png)

- **文章**

  ![](https://76.nansin.top/github/bbs/bbs-article.png)

- **问答**

  ![](https://76.nansin.top/github/bbs/bbs-issue.png)

- **话题**

  ![](https://76.nansin.top/github/bbs/bbs-topic.png)

- **积分系统**

  ![](https://76.nansin.top/github/bbs/points_system.png)

- **消息通知**

  ![](https://76.nansin.top/github/bbs/message_notification.png)

- **创作中心**

  ![](https://76.nansin.top/github/bbs/creative_center.png)

- **个人主页**

  ![](https://76.nansin.top/github/bbs/ns-bbs-homepage.png)

- **切换主题**

  ![](https://76.nansin.top/github/bbs/ns-bbs-theme.png)

  完整体验去 **商业版演示系统**：[https://bbs-corp.nansin.top/](https://bbs-corp.nansin.top/)

### 管理系统

- **仪表盘**

  ![](https://76.nansin.top/github/manage/dashboard.png)

- **组织架构**

  ![](https://76.nansin.top/github/manage/organizational_structure.png)

- **系统管理**

  ![](https://76.nansin.top/github/manage/system_management.png)

- **角色管理**

  ![](https://76.nansin.top/github/manage/role_management.png)

- **菜单配置**

  ![](https://76.nansin.top/github/manage/menu_configuration.png)

- **用户管理**

  ![](https://76.nansin.top/github/manage/user_management.png)

- **访问记录**

  ![](https://76.nansin.top/github/manage/access_log.png)

  完整体验去 **商业版演示系统**：[https://bbs-corp.nansin.top/](https://bbs-corp.nansin.top/)
