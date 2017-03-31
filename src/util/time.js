module.exports = function (time, format) {
    var week = {
        0: '星期日',
        1: '星期一',
        2: '星期二',
        3: '星期三',
        4: '星期四',
        5: '星期五',
        6: '星期六'
    };

    time = new Date(time);

    var o = {
        E: week[time.getDay() + ''],
        y: time.getFullYear(), //年
        M: time.getMonth() + 1, //月份
        d: time.getDate(), //日
        h: time.getHours() % 12 === 0 ? 12 : time.getHours() % 12, //小时
        H: time.getHours(), //小时
        m: time.getMinutes(), //分
        s: time.getSeconds(), //秒
        q: Math.floor((time.getMonth() + 3) / 3), //季度
        S: time.getMilliseconds() //毫秒
    };

    for (var k in o) {
        format = format.replace(new RegExp(k + '+', 'g'), function(w) {
            var value = (k != 'E') ? '000' + o[k] : o[k];
            return value.substr(value.length - w.length >= 0 ? value.length - w.length : 0);
        });
    }
    return format;
};