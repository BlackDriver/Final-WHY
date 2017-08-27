'use strict';

window.onload = function () {
    var canvas = document.querySelector('.weather-graphic');
    var ctx = canvas.getContext('2d');
    var fontsize = parseInt(document.querySelector('html').style.fontSize);
    var u = fontsize / 100;
    var date = ["昨日", "周日", "周一", "周二", "周三", "周四", "周五"];

    var weatherReport = document.querySelector('.weather-report');

    Ajax.get('/weather').then(function (data) {
        // console.log(data);
        data = JSON.parse(data);

        RenderToday(data);
        RenderWeek(data);
        CreateReportList(data);
    });
    SetCanvas();

    function RenderToday(data) {
        var TodayDesc = document.querySelector('.today-desc');
        var TodayMaxmin = document.querySelector('.today-maxmin');

        TodayDesc.innerHTML = data[1].weather;
        TodayMaxmin.innerHTML = data[1].max_temp + "° / " + data[1].min_temp + "°";
    }

    function RenderWeek(data) {

        var start = 100,
            max = [],
            x = void 0,
            y = void 0;
        ctx.font = u * 30 + "微软雅黑";
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 5 * u;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        for (var i = data.length - 1; i >= 0; i--) {
            max[i] = data[i].max_temp;
        }
        // console.log(max)

        for (var _i = max.length - 1; _i >= 0; _i--) {
            x = 40 + _i * 150;
            y = 300 - max[_i] * 2.3;
            ctx.fillText(date[_i], (x - 20) * u, 50 * u);
            ctx.fillText(data[_i].max_temp + '°', (x - 20) * u, (y - 50) * u);
            ctx.fillText(data[_i].min_temp + '°', (x - 20) * u, (y + 50) * u);
            ctx.lineTo(x * u, y * u);
        }

        ctx.stroke();
    }

    function SetCanvas(argument) {
        canvas.width = 10 * fontsize;
        canvas.height = 3.7 * fontsize;
    }

    function CreateReportList(data) {

        for (var i = 2; i <= data.length - 1; i++) {
            var report = document.createElement('div');
            var dates = document.createElement('div');
            var icon = document.createElement('div');
            var tem = document.createElement('div');
            report.className = 'report';
            dates.className = 'report-date';
            icon.className = 'report-icon';
            tem.className = 'report-tem';
            dates.innerHTML = date[i];

            tem.innerHTML = data[i].max_temp + "° / " + data[i].min_temp + '°';
            SetBgPosistion(data, i, icon);
            report.appendChild(dates);
            report.appendChild(icon);
            report.appendChild(tem);
            weatherReport.appendChild(report);
        }
        // let size = document.querySelectorAll('.report-icon');
        // for (var i = size.length - 1; i >= 0; i--) {
        //     size[i].style.backgroundSize = 100 / u * 3.4 + "%";

        // }
    }
    function SetBgPosistion(data, i, icon) {
        // console.log(data[i].weather)
        if (data[i].weather == "晴") {}
        if (data[i].weather == "多云") {
            icon.style.backgroundPosition = "center center";
        }
        if (data[i].weather == "暴雨") {
            icon.style.backgroundPosition = -1.35 * 2 + 'rem 0';
        }
        if (data[i].weather == "冰雹") {
            icon.style.backgroundPosition = -1.35 * 3 + 'rem 0';
        }
        if (data[i].weather == "沙尘暴") {
            icon.style.backgroundPosition = -1.35 * 5 + 'rem 0';
        }
        if (data[i].weather == "台风") {
            icon.style.backgroundPosition = -1.35 * 6 + 'rem 0';
        }
        if (data[i].weather == "雾霾") {
            icon.style.backgroundPosition = -1.35 * 4 + 'rem 0';
        }
        // console.log(icon)
    }
};