window.onload = function() {
    let canvas = document.querySelector('.weather-graphic');
    let ctx = canvas.getContext('2d');
    let fontsize = parseInt(document.querySelector('html').style.fontSize);
    let u = fontsize / 100;
    let date = ["昨日", "周日", "周一", "周二", "周三", "周四", "周五"]
    
    let weatherReport = document.querySelector('.weather-report');

    Ajax.get('/weather').then((data) => {
        console.log(data);
        data = JSON.parse(data)
        
        RenderToday(data);
        RenderWeek(data);
        CreateReportList(data);
    })
    SetCanvas();

    function RenderToday(data) {
        let TodayDesc = document.querySelector('.today-desc');
        let TodayMaxmin = document.querySelector('.today-maxmin');

        TodayDesc.innerHTML = data[1].weather;
        TodayMaxmin.innerHTML = data[1].max_temp + "° / " + data[1].min_temp + "°";
    }

    function RenderWeek(data) {

        let start = 100,
            max = [],
            x,
            y;
        ctx.font = u * 30 + "微软雅黑";
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 5 * u;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        for (let i = data.length - 1; i >= 0; i--) {
            max[i] = data[i].max_temp;
        }
        console.log(max)

        for (let i = max.length - 1; i >= 0; i--) {
            x = (40 + i * 150);
            y = (300 - max[i] * 2.3);
            ctx.fillText(date[i], (x - 20) * u, 50 * u);
            ctx.fillText(data[i].max_temp + '°', (x - 20) * u, (y - 50) * u);
            ctx.fillText(data[i].min_temp + '°', (x - 20) * u, (y + 50) * u);
            ctx.lineTo(x * u, y * u);

        }

        ctx.stroke();

    }

    function SetCanvas(argument) {
        canvas.width = 10 * fontsize;
        canvas.height = 3.7 * fontsize;
    }

    function CreateReportList(data) {

        for (let i = 2; i <= data.length - 1; i++) {
            let report = document.createElement('div');
            let dates = document.createElement('div');
            let icon = document.createElement('div');
            let tem = document.createElement('div');
            report.className = 'report';
            dates.className = 'report-date';
            icon.className = 'report-icon';
            tem.className = 'report-tem';
            dates.innerHTML = date[i];

            tem.innerHTML = data[i].max_temp + "° / " + data[i].min_temp + '°';
            SetBgPosistion(data,i,icon);
            report.appendChild(dates)
            report.appendChild(icon);
            report.appendChild(tem);
            weatherReport.appendChild(report);

        }
        // let size = document.querySelectorAll('.report-icon');
        // for (var i = size.length - 1; i >= 0; i--) {
        //     size[i].style.backgroundSize = 100 / u * 3.4 + "%";

        // }
    }
    function SetBgPosistion(data,i,icon) {
        // console.log(data[i].weather)
        if (data[i].weather =="晴") {}
        if (data[i].weather =="多云") {
            icon.style.backgroundPosition = "center center";
        }
        if (data[i].weather =="暴雨") {
            icon.style.backgroundPosition = -1.35*2 +'rem 0';
        }
        if (data[i].weather =="冰雹") {
            icon.style.backgroundPosition = -1.35*3 +'rem 0';
        }
        if (data[i].weather =="沙尘暴") {
            icon.style.backgroundPosition = -1.35*5 +'rem 0';
        }
        if (data[i].weather =="台风") {
            icon.style.backgroundPosition = -1.35*6 +'rem 0';
        }
        if (data[i].weather =="雾霾") {
            icon.style.backgroundPosition = -1.35*4 +'rem 0';
        }
        // console.log(icon)
    }

}