/** 节流函数 */
export const throttle = (fn, delay, ...args) => {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
};

/**
 * @param {*} event  事件对象
 * @returns {Boolean} true: 说明超出元素宽度显示 false: 说明并未超出显示
 */
export function isClamp(event) {
  try {
    const width = event.target.clientWidth;
    const originWidth = event.target.nextElementSibling.clientWidth;
    return originWidth > width;
  } catch (error) {
    return false;
  }
}

/**
 * 监听列表滚动事件，当滚动到底部时，触发回调函数
 * @param {HTMLDivELement} el 滚动节点
 * @param {boolean} unWatchOnNoMoreData 是否在没有更多数据时停止监听
 */
export function scroll(el, unWatchOnNoMoreData = false) {
  /**
   * @this {VM} this指向的是Vue实例对象，因为是在vue实例（组件）里面通过call绑定this后调用的，
   *            这样hasNext、finish等参数就不需要传过来，直接在this身上取
   * @argument {DomElement} el 需要监听滚动事件的dom元素（容器）
   * @argument {Number} height 高度
   */
  const scrollCB = ({ target }) => {
    /**
     * scrollTop:滚动条滚动距离;
     * scrollHeight:文档内容实际高度（包括超出视窗的溢出部分）;
     * clientHeight:窗口可视范围高度
     */
    const { scrollTop, scrollHeight, clientHeight } = target;
    /**
     * @property hasNext 列表是否还有没加载完的（是否已经加载完最后一项），是后台返回的结果
     * @property finish 上个请求是否完成，完成后才可以进行下个请求
     * @function loadMore 加载下一页的方法
     */
    if (this.hasNext && this.finish && scrollHeight - scrollTop <= clientHeight) {
      this.loadMore();
    }
    // 列表加载完毕，移除滚动事件
    if (unWatchOnNoMoreData && !this.hasNext) {
      el.removeEventListener('scroll', scrollCB);
    }
  };
  el.addEventListener('scroll', scrollCB, { passive: true });
  this.$once('hook:beforeDestroy', () => {
    el.removeEventListener('scroll', scrollCB);
  });
}

/**
 * @description: 对比锚点时间，生成时间差字符
 * @param {Date} time 锚点时间
 * @returns {String} 锚点时间差字符串
 */
export function showtime(time) {
  const date = typeof time === 'number' ? new Date(time) : new Date((time || '').replace(/-/g, '/'));
  // 秒
  const secondTime = (new Date().getTime() - date.getTime()) / 1000;
  // 天
  const dayTime = Math.floor(secondTime / 86400);

  const isValidDate = Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());

  if (!isValidDate) {
    window.console.error('不是有效日期格式');
  }
  const formatDate = function (date) {
    const today = new Date(date);
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };

  // 异常情况
  if (isNaN(dayTime) || dayTime < 0) {
    return formatDate(date);
  }

  return (
    (dayTime === 0 &&
      ((secondTime < 60 && '刚刚') ||
        (secondTime < 120 && '1分钟前') ||
        (secondTime < 3600 && Math.floor(secondTime / 60) + '分钟前') ||
        (secondTime < 7200 && '1小时前') ||
        (secondTime < 86400 && Math.floor(secondTime / 3600) + '小时前'))) ||
    (dayTime === 1 && '昨天') ||
    (dayTime < 7 && dayTime + '天前') ||
    (dayTime < 30 && Math.floor(dayTime / 7) + '周前') ||
    (dayTime < 365 && Math.floor(dayTime / 30) + '月前') ||
    (dayTime >= 365 && Math.floor(dayTime / 365) + '年前')
  );
}

/**
 * @description: 根据文章markdown生成的html，获取文章的摘要
 * @param {string} data innerHTML字符串
 * @returns {string} 返回目录innerHTML字符串
 */
export function toToc(data) {
  // 过滤出<h?>标签
  data = data.match(/<[hH][1-6]>.*?<\/[hH][1-6]>/g);
  if (!data) {
    return null;
  }
  const levelStack = [];
  let result = '';
  const addStartUL = function () {
    result += '<ul class="catalog-list">';
  };
  const addEndUL = function () {
    result += '</ul>\n';
  };
  const addLI = function (index, itemText) {
    result += '<li><a class="toc-link' + '-#' + index + '" href="#' + index + '">' + itemText + '</a></li>\n';
  };
  data.forEach(function (item, index) {
    // 获取a标签的id值
    const a_id = item.replace(/<a id="(.*?)"([^[]*)/g, '$1').replace(/<[hH][1-6]>/g, '');
    // 匹配h标签的文字
    const itemText = item.replace(/<[^>]+>/g, '');
    // 匹配h?标签<h?>
    const itemLabel = item.match(/<\w+?>/)[0];
    // 判断数组里有无<h?>
    let levelIndex = levelStack.indexOf(itemLabel);
    // 没有找到相应<h?>标签，则将新增ul、li
    if (levelIndex === -1) {
      levelStack.unshift(itemLabel);
      addStartUL();
      addLI(a_id, itemText);
    }
    // 找到了相应<h?>标签，并且在栈顶的位置则直接将li放在此ul下
    else if (levelIndex === 0) {
      addLI(a_id, itemText);
    }
    // 找到了相应<h?>标签，但是不在栈顶位置，需要将之前的所有<h?>出栈并且打上闭合标签，最后新增li
    else {
      while (levelIndex--) {
        levelStack.shift();
        addEndUL();
      }
      addLI(a_id, itemText);
    }
  });
  // 如果栈中还有<h?>，全部出栈打上闭合标签
  while (levelStack.length) {
    levelStack.shift();
    addEndUL();
  }

  // 去掉回车换行
  return result.replace(/\r?\n|\r/g, '');
}
