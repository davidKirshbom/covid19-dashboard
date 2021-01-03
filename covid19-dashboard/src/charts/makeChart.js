
import Chart from 'chart.js'


export default (containerName, data, { xTitle, yTitle, chartTitle, toolTipPostfix } = {}) => {
  let ctx = document.getElementById(containerName);
  let gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 500);
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
          
        }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display:true,
        text:chartTitle||'',
   
        
      },
      legend: {
        
          display:false,
      },
      scales: {
        xAxes: [{
          labels: lineArray.map(data => data.x),
          scaleLabel: {
            display: true,
            labelString: xTitle||'',
            fontSize:15,
          },
          ticks: {
            maxTicksLimit: 5,
            beginAtZero: true,
            
          }}],
        yAxes: [{
          labels: lineArray.map(data => data.y),
          scaleLabel: {
            display: true,
            labelString: yTitle||'',
            fontSize:15,
          },
                ticks: {
                  
                  maxTicksLimit: 5,
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