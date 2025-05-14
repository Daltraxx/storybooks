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

const editIcon = (storyUser, loggedUser, storyId, floating = true) => {
  const editTagFloating = `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
  const editTagNotFloating = `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`;

  if (storyUser._id.toString() == loggedUser._id.toString()) {
    return floating ? editTagFloating : editTagNotFloating;
  } else {
    return '';
  }
}

module.exports = {
    formatDate,
    truncate,
    stripTags,
    editIcon
}
