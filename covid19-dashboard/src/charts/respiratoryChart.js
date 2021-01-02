import moment from 'moment'
import highCharts from 'highcharts'
import Chart from 'chart.js'
const getXDates = () => {
    let day = moment('02/03/2020')
    const end = moment();
    const dates=[]
  while (day <= end) {     
        dates.push(day.clone().toString())
      day=day.add({ days: 15, month: 1 })    
  }

    return dates;
    
}
const getChartLineData = (people) => {
  let day = moment('02/03/2020','DD/MM/YYYY');
  const end = moment().clone();
  const data = [];
  while (day.isSameOrBefore(end)) {
    
    let count = 0;
    people.forEach(person => {      
      if (person.statuses.some((status) => { 
        
        return status.isRespiratory&&(moment(status.createdAt).isSameOrBefore(day) && (!status.end_date || moment(status.end_date).isSameOrAfter(day)))
      }))
      {
        count++;
      }
    });
    data.push({ x: day.clone().format('D.M').toString(), y:count });
    day.add('1','day')
  }

  console.log("🚀 ~ file: respiratoryChart.js ~ line 39 ~ getChartLineData ~ data", data)

  return data
  
}
export default (containerName, data) => {
   
  let ctx = document.getElementById('respiratory-chart');
  let gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 500);
  gradient.addColorStop(0, 'rgba(83, 204, 253, 1)');
  gradient.addColorStop(0.25, 'rgba(204, 243, 246, 0.5)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  const lineArray = getChartLineData(data)
  var myChart = new Chart(ctx, {
    
    type: 'line',
    data: {
        
        datasets: [{
          label: {
              
            },
          data: lineArray.map(data=>data.y),
            
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
      title: {
        display:true,
        text: 'מונשמים - שינוי יומי',
   
        
      },
      legend: {
        
          display:false,
      },
      scales: {
        xAxes: [{
          labels: lineArray.map(data => data.x),
          scaleLabel: {
            display: true,
            labelString: 'תאריך',
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
            labelString: 'כמות מונשמים',
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
           
            return item.value+ ' מונשמים';
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