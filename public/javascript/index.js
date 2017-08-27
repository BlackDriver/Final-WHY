window.onload = function() {
    let canvas = document.querySelector('.weather-graphic');
    let ctx = canvas.getContext('2d');
    let fontsize = parseInt(document.querySelector('html').style.fontSize);
    let u = fontsize / 100;
    let date = ["昨日", "周日", "周一", "周二", "周三", "周四", "周五"]
    Ajax.get('/weather').then((data) => {
        data = JSON.parse(data)
        console.log(data);
        RenderToday(data);
        RenderWeek(data);
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
        ctx.font = u*30 +"微软雅黑";
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 5*u;
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
            ctx.lineTo(x*u, y*u);

        }

        ctx.stroke();

    }

    function SetCanvas(argument) {
        canvas.width = 10 * fontsize;
        canvas.height = 3.7 * fontsize;
    }
}