import {Animated, Easing} from 'react-native';

// CONSTANTS
const pad = (data) => {
    if (parseInt(data) < 10) return '0' + data;
    return data;
};

const functions = {
    startAnimation: (toAnimate, toValue, duration = 300, easing = Easing.linear, cb = () => {}) => {
        Animated.timing(toAnimate, {
            toValue: toValue,
            duration: duration,
            easing: easing,
            useNativeDriver: false,
        }).start(cb);
    },
    validateEmail: (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    nosSuffix(i) {
        i = Number(i);
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + 'st';
        }
        if (j == 2 && k != 12) {
            return i + 'nd';
        }
        if (j == 3 && k != 13) {
            return i + 'rd';
        }
        return i + 'th';
    },
    nFormatter(num, digits) {
        var si = [
            {value: 1, symbol: ''},
            {value: 1e3, symbol: 'k'},
            {value: 1e6, symbol: 'M'},
            {value: 1e9, symbol: 'G'},
            {value: 1e12, symbol: 'T'},
            {value: 1e15, symbol: 'P'},
            {value: 1e18, symbol: 'E'},
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value) {
                break;
            }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
    },
    getTime: (timeStamp) => {
        let date1 = new Date(timeStamp);
        let date2 = new Date();
        let diffTime = date2.getTime() - date1.getTime();
        let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        var diffSeconds = (date2.getTime() - date1.getTime()) / 1000;
        let unit = 'days';
        if (diffDays >= 365) {
            diffDays = parseInt(diffDays / 365);
            unit = diffDays == 1 ? 'year' : 'years';
            return diffDays + ' ' + unit + ' ago';
        } else if (diffDays >= 7) {
            diffDays = parseInt(diffDays / 7);
            unit = diffDays == 1 ? 'week' : 'weeks';
            return diffDays + ' ' + unit + ' ago';
        } else if (diffDays > 0) {
            unit = diffDays == 1 ? 'day' : 'days';
            return diffDays + ' ' + unit + ' ago';
        } else if (diffSeconds > 3600) {
            diffSeconds = parseInt(diffSeconds / 3600);
            unit = diffSeconds < 2 ? 'hour' : 'hours';
            return diffSeconds + ' ' + unit + ' ago';
        } else if (diffSeconds > 60) {
            diffSeconds = parseInt(diffSeconds / 60);
            unit = diffSeconds < 2 ? 'minute' : 'minutes';
            return diffSeconds + ' ' + unit + ' ago';
        } else {
            unit = parseInt(diffSeconds) <= 1 ? 'second' : 'seconds';
            return parseInt(diffSeconds) + ' ' + unit + ' ago';
        }
    },
    getTimeStamp: () => {
        let dateTime = new Date();
        return dateTime;
    },
    formatTimeStamp: (timeStamp) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let dateTime = new Date(timeStamp);
        let YYYY = dateTime.getFullYear();
        let MM = pad(dateTime.getMonth() + 1);
        let DD = pad(dateTime.getDate());
        let hh = dateTime.getHours();
        let mm = pad(dateTime.getMinutes());
        let ss = pad(dateTime.getSeconds());
        let ampm = hh >= 12 ? 'pm' : 'am';
        hh = pad(hh % 12);
        hh = hh == '00' ? '12' : hh;
        return {
            YYYY,
            MM,
            MMM: months[dateTime.getMonth()],
            DD,
            hh,
            mm,
            ss,
            ampm,
        };
    },
};

export default functions;
