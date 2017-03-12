(function ( $ ) {

    Date.prototype.daysInMonth = function(month) {
        return 32 - new Date(this.getFullYear(), month, 32).getDate();
    }

    Date.prototype.prevMonth = function(month) {
        if (month == 0) {
            return 11;
        } else {
            return parseInt(month - 1);
        }
    }

    Date.prototype.nextMonth = function(month) {
        if (month == 11) {
            return 0;
        } else {
            return parseInt(month + 1);
        }
    }

    Date.prototype.currtCalYear = function(month, year, button) {
        if (month == 11 && $(button).is('.prev')) {
            return parseInt(parseInt(year) - 1);
        } else if (month == 0 && $(button).is('.next')) {
            return parseInt(parseInt(year) + 1);
        } else {
            return year;
        }
    }

    function Helper() {
        this.updateText = function (months, settings, date, month, year, button) {
            date.setFullYear(date.currtCalYear(month, date.getFullYear(), button));
            date.setMonth(month);

            $(settings.prev).data('month', date.prevMonth(month));
            $(settings.next).data('month', date.nextMonth(month));

            $('span', settings.prev).text(months[date.prevMonth(month)] + ' ' + this.coorectPrevYear(date.getFullYear(), month, button));
            $('span', settings.next).text(months[date.nextMonth(month)] + ' ' + this.coorectNextYear(date.getFullYear(), month, button));

            $(settings.year_month).html(months[month]);
            $(settings.year_number).html(date.getFullYear());
        };

        this.coorectPrevYear = function(year, month, button) {
            if (month == 0 && $(button).is('.prev')) {
                return parseInt(year - 1);
            } else if (month == 0 && $(button).is('.next')) {
                return parseInt(year - 1);
            } else {
                return year;
            }
        };

        this.coorectNextYear = function(year, month, button) {
            if (month == 11 && $(button).is('.next')) {
                return parseInt(year + 1)
            } else if (month == 11 && $(button).is('.prev')) {
                return year + 1;
            } else {
                return year;
            }
        };

        this.parse = function (str) {
            if (typeof str !== 'string') {
                return {};
            }

            str = str.trim().replace(/^\?/, '');

            if (!str) {
                return {};
            }

            return str.trim().split('&').reduce(function (ret, param) {
                var parts = param.replace(/\+/g, ' ').split('=');
                var key = parts[0];
                var val = parts[1];

                key = decodeURIComponent(key);
                val = val === undefined ? null : decodeURIComponent(val);

                if (!ret.hasOwnProperty(key)) {
                    ret[key] = val;
                } else if (Array.isArray(ret[key])) {
                    ret[key].push(val);
                } else {
                    ret[key] = [ret[key], val];
                }

                return ret;
            }, {});
        };

        this.stringify = function (obj) {
            return obj ? Object.keys(obj).map(function (key) {
                var val = obj[key];

                if (Array.isArray(val)) {
                    return val.map(function (val2) {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                    }).join('&');
                }

                return encodeURIComponent(key) + '=' + encodeURIComponent(val);
            }).join('&') : '';
        };

        this.insertParam = function (key, value) {
            var params = this.parse(location.search);
            params[key] = value;
            var new_params_string = this.stringify(params)
            history.pushState({}, "", window.location.pathname + '?' + new_params_string);
        }
        this.removeParam = function(key) {
            var rtn = window.location.href.split("?")[0],
                param,
                params_arr = [],
                queryString = (window.location.href.indexOf("?") !== -1) ? window.location.href.split("?")[1] : "";
            if (queryString !== "") {
                params_arr = queryString.split("&");
                for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                    param = params_arr[i].split("=")[0];
                    if (param === key) {
                        params_arr.splice(i, 1);
                    }
                }
                rtn = rtn + "?" + params_arr.join("&");
                if (rtn.replace(window.location.origin + window.location.pathname, '').length == 1) {
                    history.pushState({}, "", window.location.origin + window.location.pathname);
                    return false;
                }
            }
            history.pushState({}, "", rtn);
        }

        this.getParam = function (key) {
            return decodeURIComponent((new RegExp('[?|&]' + key + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
        }

        this.setDay = function(month, day, year, container) {
            this.removeParam('start-day');
            this.insertParam('start-day', month + '-' + day + '-' + year);
            $(container)
                .addClass('oneday')
                .removeClass('period')
                .html('<h1>' + day + '</h1><span>' + monthsShort[month] + '</span>');
        }

        this.setPeriod = function(month, day, year, container, init) {
            var startDay = this.getParam('start-day'),
                endDay   = this.getParam('end-day'),
                html     = '';

            if (startDay && !endDay) {
                startDayArr = startDay.split('-');
                if (parseInt(this.numFormat(startDayArr[2]) + this.numFormat(startDayArr[0]) + this.numFormat(startDayArr[1])) < 
                    parseInt(this.numFormat(year).toString() + this.numFormat(month).toString() + this.numFormat(day).toString())) {
                    this.insertParam('end-day', month + '-' + day + '-' + year);
                } else {
                    this.insertParam('start-day', month + '-' + day + '-' + year);
                    this.insertParam('end-day', startDayArr[0] + '-' + startDayArr[1] + '-' + startDayArr[2]);
                }
            } else if (startDay && endDay && !init) {
                this.insertParam('start-day', month + '-' + day + '-' + year);
                this.removeParam('end-day');
            }

            startDay = this.getParam('start-day').split('-');
            if (endDay = this.getParam('end-day')) {
                endDay = endDay.split('-');
            }

            html += '<div class="str-period">';
            html += '   <h5>' + startDay[1] + '</h5>';
            html += '   <span>' + monthsShort[startDay[0]] + '</span>';
            html += '</div>';
            html += '<div class="sep-period">-</div>';
            if (endDay) {
                html += '<div class="end-period">';
                html += '   <h5>' + endDay[1] + '</h5>';
                html += '   <span>' + monthsShort[endDay[0]] + '</span>';
                html += '</div>';
            }

            $(container)
                .removeClass('oneday')
                .addClass('period')
                .html(html);
        }

        this.numFormat = function(number) {
            return (Math.floor(number / 10)) ? number : '0' + number;
        }
    }

    var date        = new Date(),
        helper      = new Helper(),
        day         = date.getDate();
        month       = date.getMonth(),
        curr_month  = month,
        year        = date.getFullYear(),
        curr_year   = year,
        days        = date.daysInMonth(month);
        months      = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        daysName    = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 
    $.fn.calendar = function( options ) {

        var FN    = {},
            $this = this;

        var settings = $.extend({
            prev:         $('.prev'),
            next:         $('.next'),
            year_wrapper: $('.year'),
            date_wrapper: $('.date'),
            selet_type  : $('.select-type'),
            year_month  : $('.year_month'),
            year_number : $('.year_number')
        }, options );

        FN._init = function() {

            if (helper.getParam('end-day')) {
                $('input[value=period]', settings.selet_type).trigger('click');
            }

            if (startDay = helper.getParam('start-day')) {
                startDayArr = startDay.split('-');

                date.setMonth(startDayArr[0]);
                date.setDate(startDayArr[1]);
                date.setFullYear(startDayArr[2]);

                helper.setDay(date.getMonth(), date.getDate(), date.getFullYear(), settings.date_wrapper);

                if (startDayArr[0] == 0) {
                    helper.updateText(months, settings, date, date.getMonth(), date.getFullYear(), settings.prev);
                } else {
                    helper.updateText(months, settings, date, date.getMonth(), date.getFullYear(), false);
                }

                var html = FN._build(months, date.getMonth(), date.getFullYear());
            } else {
                helper.setDay(date.getMonth(), date.getDate(), date.getFullYear(), settings.date_wrapper);

                helper.updateText(months, settings, date, month, year, false);

                var html = FN._build(months, month, year);
            }

            $($this).html(html);

            /*
             * Select Month
             */
            $(year_month).on('click', function() {
                $('input[value=period]', settings.selet_type).trigger('click');
                $('div.cl-nbr-itm:first-child', $this).trigger('click');
                $('div.cl-nbr-itm:last-child', $this).trigger('click');
                $('div.cl-nbr-itm:first-child', $this).trigger('click');
            });

            /*
             * Select Year
             */
            $(year_number).on('click', function() {
                $('input[value=period]', settings.selet_type).trigger('click');

                helper.removeParam('end-day');
                helper.insertParam('start-day', '0-1-' + $(year_number).text());

                helper.setPeriod(11, date.daysInMonth(11), date.getFullYear(), settings.date_wrapper);

                var html = FN._build(months);

                $($this).html(html);
            });

            /*
             * Choose Click
             */
            $('input[type=radio]', settings.selet_type).on('click', function() {

                if ($(this).val() == 'day') {
                    startDay = helper.getParam('start-day').split('-');
                    helper.removeParam('end-day');
                    
                    helper.setDay(startDay[0], startDay[1], startDay[2], settings.date_wrapper);
                }

                $($this).html(FN._build(months));
            });

            /*
             * Prev and Next Month
             */
            $(settings.prev).on('click', function() {
                FN._update($(this).data('month'), date.getFullYear(), $this, this);
            });
            $(settings.next).on('click', function() {
                FN._update($(this).data('month'), date.getFullYear(), $this, this);
            });

            /*
             * Select date range
             */
            $('body').on('click', '.cl-nbr-itm', function() {

                if ($('input[type=radio]:checked').val() == 'day') {

                    helper.setDay(date.getMonth(), $('h1', this).text(), date.getFullYear(), settings.date_wrapper);

                    var html = FN._build(months, date.getMonth(), date.getFullYear());

                    $($this).html(html);

                } else if ($('input[type=radio]:checked').val() == 'period') {

                    helper.setPeriod(date.getMonth(), $('h1', this).text(), date.getFullYear(), settings.date_wrapper);

                    var html = FN._build(months, date.getMonth(), date.getFullYear());

                    $($this).html(html);
                }

            });

        };

        FN._update = function(month, year, $this, button) {

            days = date.daysInMonth(month);

            helper.updateText(months, settings, date, month, year, button);

            var html = FN._build(months, date.getMonth(), date.getFullYear());

            $($this).html(html);

        };

        FN._build = function(months, month, year) {

            var html     = '',
                startDay = helper.getParam('start-day'),
                endDay   = helper.getParam('end-day');

            if (startDay) {
                startDayArr = startDay.split('-');
            }

            if (endDay) {
                endDayArr = endDay.split('-');
            }

            if (startDay && endDay) {
                var startDayArr = startDay.split('-'),
                    endDayArr   = endDay.split('-'),
                    startDayStr = parseInt(helper.numFormat(startDayArr[2]) + helper.numFormat(startDayArr[0]) + helper.numFormat(startDayArr[1])),
                    endDayStr   = parseInt(helper.numFormat(endDayArr[2]) + helper.numFormat(endDayArr[0]) + helper.numFormat(endDayArr[1]));
            }

            for (var i = 1; i <= days; i++) {

                var current = ''

                if (startDay && endDay) {

                    var currDayStr = date.getFullYear().toString() + helper.numFormat(date.getMonth()) + helper.numFormat(i);

                    if (startDayStr <= parseInt(currDayStr) && parseInt(currDayStr) <= endDayStr) {
                        var current = 'current';
                    } else {
                        var current = '';
                    }

                } else if (startDay && startDayArr[1] == i && date.getMonth() == startDayArr[0]) {
                    var current = 'current';
                } else if (!startDay && day == i && date.getMonth() == curr_month && curr_year == year) {
                    var current = 'current';
                }

                html += '<div href="#" class="cl-nbr-itm ' + current + '">';
                html += '   <div>5 post(s)</div>';
                html += '   <h1>' + i + '</h1>';
                html += '   <span>' + daysName[new Date(date.getFullYear(), date.getMonth(), i).getDay()] + '</span>';
                html += '</div>';
            }

            return html;
        };

        FN._destroy = function($this) {
            $(window).unbind(this);
            $($this).html('');
        }

        FN._init();

    };
 
}( jQuery ));