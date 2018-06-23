const stringConver = {
  /**
   * 剪切掉匹配到文字的后半段部分
   * @param {String} string 裁剪前的文字
   * @param {String} match 要裁剪匹配的文字
   * @return {String} 裁剪后的文字
   */
  sliceLastIndexOfBy: (string, match) => {
    let stringOfMatch= string.indexOf(match);
    if (stringOfMatch !== -1) {
      return string.slice(0, stringOfMatch);
    } else {
      return string
    }
  },
}

module.exports = stringConver;
