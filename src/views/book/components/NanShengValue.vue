<template>
  <div id="nan-sheng-value" :style="$store.state.collapsed ? 'padding: 10px 10px 0 10px;' : 'padding: 50px 50px 20px 50px;'">
    <div class="markdown-body">
      <h1>南生值、等级与权限说明</h1>
      <br />
      <h2>南生值</h2>
      <p>
        在南生论坛里我们会使用
        <strong>南生值</strong>
        来计算一个南友的累计贡献值，累计贡献值的目的是为了更好地回馈优质的用户，同时也借由他们生产的优质内容帮助到更多的南友们。您可以在您的个人主页上看到自己的南生值。
      </p>
      <h3>南生值的价值</h3>
      <ol>
        <li>南生值会影响到你发的文章的排序，南生值高且活跃的用户所生产的内容会被推荐给更多的用户</li>
        <li>南生值会影响你是否被推荐，越来越多的南友通过关注来消费内容，因而被推荐并获得关注可以有效地提高你的影响力</li>
        <li>南生值会有不同的权限，随着南生值的不断提高，越来越多的功能和权限会解锁，让你在南生论坛里畅行无阻</li>
      </ol>
      <h3>南生值如何计算</h3>
      <p>南生值的目的就是为了计算一名南友的累计贡献，而南生论坛的核心目的是去分享和学习有价值的内容，因而他与您分享的内容本身的价值直接相关：</p>
      <p style="color: red">南生值 = 文章的阅读数 / 10 + 获得的点赞数</p>
      <code class="hljs language-!" lang="!">
        1、南生值只计算用户在南生论坛内的文章
        <br />
        2、南生值每天凌晨<span style="color: red">1点</span>更新计算一次
        <br />
        3、如果作者删除了自己的文章，相应的南生值会被扣除，已经获得的权限也将被撤销
      </code>
      <br />
      <h2>等级与权限</h2>
      <table>
        <thead>
          <tr>
            <th>等级</th>
            <th>南生值下限</th>
            <th>南生值上限</th>
            <th>身份</th>
            <th>权限（继承）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img style="width: 30px" src="@/assets/img/level/Lv1.svg" alt="" />
            </td>
            <td>0</td>
            <td>99</td>
            <td><img src="@/assets/img/level/badge-Lv1.svg" alt="" /> 新手</td>
            <td>基础功能</td>
          </tr>
          <tr>
            <td>
              <img style="width: 30px" src="@/assets/img/level/Lv2.svg" alt="" />
            </td>
            <td>100</td>
            <td>299</td>
            <td><img src="@/assets/img/level/badge-Lv2.svg" alt="" /> 麒麟儿</td>
            <td>获得南生论坛的<span style="color: red">源码讲解视频</span></td>
          </tr>
          <tr>
            <td>
              <img style="width: 30px" src="@/assets/img/level/Lv3.svg" alt="" />
            </td>
            <td>300</td>
            <td>599</td>
            <td><img src="@/assets/img/level/badge-Lv3.svg" alt="" /> 三好学生</td>
            <td>获得南生论坛的<span style="color: red">word设计文档（16000字/50页左右）</span></td>
          </tr>
          <tr>
            <td>
              <img style="width: 30px" src="@/assets/img/level/Lv4.svg" alt="" />
            </td>
            <td>600</td>
            <td>999</td>
            <td><img src="@/assets/img/level/badge-Lv4.svg" alt="" /> 技术贡献者</td>
            <td>出管理员可以置顶文章外，自己也可<span style="color: red">置顶自己的文章</span>（首页置顶展示）</td>
          </tr>
          <tr>
            <td>
              <img style="width: 30px" src="@/assets/img/level/Lv5.svg" alt="" />
            </td>
            <td>1000</td>
            <td>1499</td>
            <td><img src="@/assets/img/level/badge-Lv5.svg" alt="" /> 优秀作者</td>
            <td><span style="color: red">自动</span>推荐至首页，成为南生论坛<span style="color: red">优秀作者</span></td>
          </tr>
          <tr>
            <td>
              <img style="width: 30px" src="@/assets/img/level/Lv6.svg" alt="" />
            </td>
            <td>1500</td>
            <td>2099</td>
            <td><img src="@/assets/img/level/badge-Lv6.svg" alt="" /> 共建者</td>
            <td>维护标签，维护资源导航，成为南生论坛共建者<span style="color: red">(享受南生系列所有项目的免费源码更新)</span></td>
          </tr>
        </tbody>
      </table>
      <h3>刷南生值的惩罚</h3>
      <p>
        一经发现某一用户通过机器等手段刷点赞、阅读等数据，恶意提高自己的南生值，南生论坛作者在核实后会给予惩罚，<span style="color: red">南生值归 0，撤销所有权限及身份。</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
};
</script>

<style scoped>
#nan-sheng-value {
  background: #fff;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
}

.markdown-body {
  word-break: break-word;
  line-height: 1.75;
  font-weight: 400;
  font-size: 16px;
  overflow-x: hidden;
  color: #333;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  line-height: 1.5;
  margin-bottom: 10px;
  padding-bottom: 5px;
}

.markdown-body h1 {
  font-size: 24px;
  margin-bottom: 5px;
}

.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  font-size: 20px;
}

.markdown-body h2 {
  padding-bottom: 12px;
  border-bottom: 1px solid #ececec;
}

.markdown-body h3 {
  font-size: 18px;
  padding-bottom: 0;
}

.markdown-body h6 {
  margin-top: 5px;
}

.markdown-body p {
  line-height: inherit;
  margin-top: 22px;
  margin-bottom: 22px;
}

.markdown-body img {
  max-width: 100%;
}

.markdown-body hr {
  border: none;
  border-top: 1px solid #ddd;
  margin-top: 32px;
  margin-bottom: 32px;
}

.markdown-body code {
  font-size: 14px;
  padding: 15px 12px;
  margin: 0;
  word-break: normal;
  display: block;
  overflow-x: auto;
  color: #333;
  background: #f8f8f8;
}

.markdown-body a {
  text-decoration: none;
  color: #0269c8;
  border-bottom: 1px solid #d1e9ff;
}

.markdown-body a:active,
.markdown-body a:hover {
  color: #275b8c;
}

.markdown-body table {
  display: inline-block !important;
  font-size: 12px;
  width: auto;
  max-width: 100%;
  overflow: auto;
  border: 1px solid #f6f6f6;
}

.markdown-body thead {
  background: #f6f6f6;
  color: #000;
  text-align: left;
}

.markdown-body tr:nth-child(2n) {
  background-color: #fcfcfc;
}

.markdown-body td,
.markdown-body th {
  padding: 12px 7px;
  line-height: 24px;
}

.markdown-body td {
  min-width: 120px;
}

.markdown-body blockquote {
  color: #666;
  padding: 1px 23px;
  margin: 22px 0;
  border-left: 4px solid #cbcbcb;
  background-color: #f8f8f8;
}

.markdown-body blockquote:after {
  display: block;
  content: '';
}

.markdown-body blockquote > p {
  margin: 10px 0;
}

.markdown-body ol,
.markdown-body ul {
  padding-left: 28px;
}

.markdown-body ol li,
.markdown-body ul li {
  margin-bottom: 0;
  list-style: inherit;
}

.markdown-body ol li .task-list-item,
.markdown-body ul li .task-list-item {
  list-style: none;
}

.markdown-body ol li .task-list-item ol,
.markdown-body ol li .task-list-item ul,
.markdown-body ul li .task-list-item ol,
.markdown-body ul li .task-list-item ul {
  margin-top: 0;
}

.markdown-body ol ol,
.markdown-body ol ul,
.markdown-body ul ol,
.markdown-body ul ul {
  margin-top: 3px;
}

.markdown-body ol li {
  padding-left: 6px;
}

.markdown-body .contains-task-list {
  padding-left: 0;
}

.markdown-body .task-list-item {
  list-style: none;
}

@media (max-width: 720px) {
  .markdown-body h1 {
    font-size: 24px;
  }

  .markdown-body h2 {
    font-size: 20px;
  }

  .markdown-body h3 {
    font-size: 18px;
  }
}
</style>
