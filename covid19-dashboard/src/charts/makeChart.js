

import Chart from 'chart.js'

const getLimitedTicks=(ticks)=> {
  const skipParameter = Math.floor(ticks.length / 5);
  return [ticks[0], ticks[skipParameter], ticks[skipParameter * 2], ticks[skipParameter * 3], ticks[skipParameter * 4]]
}

export default (containerName, data,isThemeWhite ,{ xTitle, yTitle, chartTitle, toolTipPostfix } = {}) => {


  let ctx = document.getElementById(containerName);
  let gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 500);
  let xTicks=getLimitedTicks(data.map(data=>data.x))
  gradient.addColorStop(0, 'rgba(83, 204, 253, 1)');
  gradient.addColorStop(0.25, 'rgba(204, 243, 246, 0.5)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  const lineArray = data
  var myChart = new Chart(ctx, {

    type: 'line',
    data: {
        
        datasets: [{
          label: {
              
            },
          data:data.length>0? lineArray.map(data=>data.y):undefined,
            
            backgroundColor: 
                gradient
            ,
            borderColor: 
                '#53ccfd'
              ,
          borderWidth: 5,
          pointRadius: 0,
          
      },
        {
        type:'bubble',
        label: {
            
          },
        data:data.length>0? lineArray.filter(data=>!xTicks.includes(data.x)).map(data=>data.y):undefined,
          
          backgroundColor: 
              gradient
          ,
          borderColor: 
              '#53ccfd'
            ,
        borderWidth: 5,
        pointRadius: 0,
        
      }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display:true,
        text:chartTitle||'',
        fontColor:isThemeWhite?'':'white'
        
      },
      legend: {
        
          display:false,
      },
      scales: {
        
        xAxes: [{
          afterBuildTicks() {            
            return xTicks
          },
          labels: lineArray.map(data => data.x),
          scaleLabel: {
            display: true,
            labelString: xTitle||'',
            fontSize: 15,
            fontColor:isThemeWhite?'':'white'
          },
          ticks: {
            fontColor:isThemeWhite?'':'white'
          }
         }],
        yAxes: [{
          labels: lineArray.map(data => data.y),
          scaleLabel: {
            display: true,
            labelString: yTitle||'',
            fontSize: 15,
            fontColor:isThemeWhite?'':'white'
          },
                ticks: {
                  
                  maxTicksLimit: 5,
                  fontColor:isThemeWhite?'':'white'
                }
            }]
      },
      tooltips: {
        displayColors: false,
        backgroundColor: 'white',
        bodyFontColor: '#53ccfd',
        titleFontColor: '#53ccfd',
        titleAlign:'center',
        callbacks: {
          title: function (item) {
            return item[0].label
          },
          label: function (item) {
           
            return item.value+ (toolTipPostfix||'');
          }
        }
      }
    }
    
});
}


//highcharts
// export default (containerName, data) => {
  
//     const dates = getXDates();
//     const lineArray=getChartLineData(data)
//   highCharts.chart(containerName, {
//     chart: {
//       type: 'areaspline',
     
//     },
//     title: {
//       text: 'מונשמים - שינוי יומי'
//     },
   
//     xAxis: {
//       type: 'category',
//   startOnTick:true,
//       categories: lineArray.map(data => data[0]),
      
     
//       labels: {
//         autoRotation:0,
//         padding:105+"px",
   
     
        
//       }
//     },
//     credits:false,
//     series: [
//       {
//         name: '',
//         data: lineArray,
//         color:highCharts.getOptions().colors[0]
//     }]
// })
// }