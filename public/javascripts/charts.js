

function drawChart(data) {
var chart = new Chartist.Line('.ct-chart1', data, {
  low: 0,
  showArea: true
});
}



function drawChart1(data) {
var chart = new Chartist.Line('.ct-chart2', data, {
  low: 0,
  showArea: true
});
}

function drawChart2(data) {
var chart = new Chartist.Line('.ct-chart3', data, {
  low: 0,
  showArea: true
});
}


function drawChart3(data) {
var chart = new Chartist.Line('.ct-chart4', data, {
  low: 0,
  showArea: true
});
}





function drawChart4(data) {
var options = {
  seriesBarDistance: 10
};

var responsiveOptions = [
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
];

new Chartist.Bar('.ct-chart4', data, options, responsiveOptions);
}
