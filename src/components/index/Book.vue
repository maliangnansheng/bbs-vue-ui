<template>
  <a-layout>
    <a-layout id="book-index">
      <index-header class="header" />
      <a-layout-content>
        <main class="content" :style="$store.state.collapsed ? 'width: 100%;' : 'width: 800px;'">
          <nan-sheng-value />
          <a-row>
            <a-col :span="24" style="height: 10px;" />
          </a-row>
        </main>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import IndexHeader from '@/components/index/head/IndexHeader';
import NanShengValue from '@/components/books/NanShengValue';

export default {
  name: '',
  components: { IndexHeader, NanShengValue },
};
</script>

<style>
#book-index .header {
  position: fixed;
  width: 100%;
  z-index: 999;
  background: #fff;
  border-bottom: 1px solid #00000021;
}

#book-index .content {
  margin-top: 64px;
}

#book-index .ant-layout-header,
.ant-layout-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

#book-index .ant-layout-header {
  background: #fff;
  height: auto;
  line-height: 2.3;
}
</style>
