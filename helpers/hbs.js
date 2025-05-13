const moment = require('moment');

const formatDate = (date, format) => moment(date).format(format);

module.exports = {
    formatDate
}
