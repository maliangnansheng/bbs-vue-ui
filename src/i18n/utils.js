//得到默认使用的语言
export const getDefaultLang = () => {
  //用户指定了默认语言时，使用用户指定的
  if (localStorage.getItem('language') != null) {
    return localStorage.getItem('language');
  } else {
    let lang = '';
    //用户未指定时，根据游览器选择:
    if (navigator.language == 'zh-CN') {
      lang = 'zh_CN';
    } else if (navigator.language == 'en') {
      lang = 'en_US';
    } else {
      lang = 'en_US';
    }
    localStorage.setItem('language', lang);
    return lang;
  }
};
