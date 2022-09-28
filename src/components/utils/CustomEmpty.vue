<template>
  <div id="custom-empty">
    <div class="container">
      <!-- 头像 -->
      <div class="avatar">
        <a-avatar :size="50" style="background: #f0f2f5" />
        <div class="username">
          <p></p>
          <div></div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="content"></div>
      <!-- 评论 -->
      <div class="comment">
        <p></p>
        <div></div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  name: 'CustomEmpty',
};
</script>

<style lang="less" scoped>
#custom-empty {
  width: 100%;
  background: #fff;
}

#custom-empty .container {
  padding: 10px;
}

#custom-empty .avatar {
  display: flex;
  align-items: center;
}

#custom-empty .username {
  width: 100%;
  padding-left: 20px;

  p {
    background: #f0f2f5;
    height: 16px;
    width: 20%;
  }

  div {
    background: #f0f2f5;
    height: 8px;
    width: 5%;
  }
}

#custom-empty .content {
  background: #f0f2f5;
  width: 100%;
  height: 400px;
  margin-top: 40px;
}

#custom-empty .comment {
  width: 100%;
  margin-top: 60px;

  p {
    background: #f0f2f5;
    height: 40px;
    width: 40%;
  }

  div {
    background: #f0f2f5;
    height: 20px;
    width: 90%;
    margin-top: 20px;
  }
}
</style>
