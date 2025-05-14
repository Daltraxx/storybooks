const moment = require('moment');

const formatDate = (date, format) => moment(date).format(format);

const truncate = (str, maxLength) => {
    if (str.length > maxLength && str.length > 0) {
      let newStr = str + ' ';
      newStr = str.slice(0, maxLength)
      newStr = str.slice(0, newStr.lastIndexOf(' '))
      newStr = newStr.length > 0 ? newStr : str.slice(0, maxLength)
      return newStr + '...'
    }
    return str
}

const stripTags = input => input.replace(/<(?:.|\n)*?>/gm, '');

module.exports = {
    formatDate,
    truncate,
    stripTags
}
