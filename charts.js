/*
 * LACNIC Labs - 2017
 * agustin at lacnic dot net
 */

define(function () {

    var charts = {};

    charts.debug = document.URL.indexOf('localhost') > 0;

    charts.endpoint = charts.debug && 'http://127.0.0.1:8001' || 'https://charts.dev.lacnic.net';

    charts.progressBars = {};  // charts managed by the CHARTS object

    charts.updateChart = function (divId, value, message) {

        var progress = document.getElementById(divId).getElementsByTagName('progress')[0];
        progress.value = value;
    }

    charts.draw = async function ({x = [], y = [], ys = [[]], kind = '', divId = '', xType = '', callback = '', labels = [], colors = [], stacked = '', my_options = {}}) {

        var body = document.getElementsByTagName('body')[0];
        var progress = document.createElement('progress');
        var br = document.createElement('br');
        var span = document.createElement('span');
        var div;



        if (document.getElementById(divId) === null) {
            div = document.createElement('div');
            div.id = divId;
            body.appendChild(div);
        } else {
            div = document.getElementById(divId);
        }
        div.style.fontFamily = 'Helvetica';
        div.style.fontSize = '.60em';
        div.style.color = 'grey';
        div.style.minHeight = '12em';
        div.style.margin = 'auto';
        div.style.textAlign = 'center';
        div.appendChild(progress);
        div.appendChild(br);
        div.appendChild(span);


        charts.updateChart(divId, 20);


        let params_dict = {
            'x': JSON.stringify(x),
            'y': JSON.stringify(y),
            'ys': JSON.stringify(ys),
            'kind': JSON.stringify(kind),
            'divId': JSON.stringify(divId),
            'xType': JSON.stringify(xType),
            'callback': JSON.stringify(callback),
            'labels': JSON.stringify(labels),
            'colors': JSON.stringify(colors),
            'stacked': JSON.stringify(stacked),
            'my_options': JSON.stringify(my_options)
        };

        charts.updateChart(divId, 30);

        var service = '/code/';
        if(kind === 'Histogram')
            service = '/hist/code/';

        const code = await fetch(
            this.endpoint + service,  //  + '/?' + params,
            {
                method: 'POST',
                body: JSON.stringify(params_dict)
            }
        ).then(
            code => code.text()
        );

        eval(code);  // remote script execution!

        charts.updateChart(divId, 75);
    };

    return charts;
});
