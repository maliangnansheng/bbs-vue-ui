/**
 * @description: 格式化：清除前后空格
 * @param {string} str 格式化的字符串
 * @returns {string} 返回格式化后的字符串
 */
export const trimString = str => {
  return str.replace(/^\s+|\s+$/g, '');
};
