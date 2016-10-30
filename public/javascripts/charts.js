

function drawChart(data) {
var chart = new Chartist.Line('.ct-chart1', data, {
  low: 0,
  showArea: true,
  showPoint: false,
  fullWidth: true
});
chart.on('draw', function(data) {
  if(data.type === 'line' || data.type === 'area') {
    data.element.animate({
      d: {
        begin: 2000 * data.index,
        dur: 2000,
        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
        to: data.path.clone().stringify(),
        easing: Chartist.Svg.Easing.easeOutQuint
      }
    });
  }
});
}

function drawChart1(data) {
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
new Chartist.Bar('.ct-chart2', data, options, responsiveOptions);
}


function drawChart2(data) {
  new Chartist.Line('.ct-chart3', data, {
  fullWidth: true,
  chartPadding: {
    right: 40
  }
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

new Chartist.Bar('.ct-chart5', data, options, responsiveOptions);
}

function drawChart5(data) {
  new Chartist.Bar('.ct-chart6', data, {
    axisX: {
      // On the x-axis start means top and end means bottom
      position: 'start'
    },
    axisY: {
      // On the y-axis start means left and end means right
      position: 'end'
    }
  });

}


function drawChart6(data) {

  var chart = new Chartist.Line('.ct-chart7',
  data, {
  // Remove this configuration to see that chart rendered with cardinal spline interpolation
  // Sometimes, on large jumps in data values, it's better to use simple smoothing.
  lineSmooth: Chartist.Interpolation.simple({
    divisor: 2
  }),
  fullWidth: true,
  chartPadding: {
    right: 20
  },
  low: 0
});

}


function drawChart7(data) {
  var chart = new Chartist.Line('.ct-chart8', data, {
    low: 0,
    showArea: true,
    showPoint: false,
    fullWidth: true
  });

  chart.on('draw', function(data) {
    if(data.type === 'line' || data.type === 'area') {
      data.element.animate({
        d: {
          begin: 2000 * data.index,
          dur: 2000,
          from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint
        }
      });
    }
  });

}

function drawChart8(data) {
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

new Chartist.Bar('.ct-chart9', data, options, responsiveOptions);
}

function drawChart9(data) {
  new Chartist.Line('.ct-chart10', data, {
    fullWidth: true,
    chartPadding: {
      right: 40
    }
  });

}

function drawChart10(data) {
  new Chartist.Line('.ct-chart11', data, {
    low: 0,
    showArea: true
  });
}

function drawChart11(data) {
  var chart = new Chartist.Line('.ct-chart12', data, {
    low: 0,
    showArea: true,
    showPoint: false,
    fullWidth: true
  });

  chart.on('draw', function(data) {
    if(data.type === 'line' || data.type === 'area') {
      data.element.animate({
        d: {
          begin: 2000 * data.index,
          dur: 2000,
          from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint
        }
      });
    }
  });

}
