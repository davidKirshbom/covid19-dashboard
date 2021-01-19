import React, { useEffect , useState} from 'react'
import moment from 'moment'
import { getGeneralStatics } from '../../server/data'
import respiratoryChart from '../../charts/makeChart'
import {updateCharByCurrentTheme} from '../../charts/utils'

export default ({ isOpen, data, isThemeWhite }) => {
  const [chart,setChart]=useState()
  useEffect(() => {
      if (chart) {
          setChart(updateCharByCurrentTheme(chart,isThemeWhite))
          chart.update();
     }
  },[isThemeWhite])
    const getChartLineData = (people) => {
        let day = moment('02/03/2020','DD/MM/YYYY');
        const end = moment().clone();
        const result = [];
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
          result.push({ x: day.clone().format('D.M').toString(), y:count });
          day.add('1','day')
        }
        return result
        
      }
    useEffect(() => {                
            if(isOpen)
                respiratoryChart('respiratory-chart',getChartLineData(data),isThemeWhite,{xTitle:'תאריך',yTitle:'כמות מונשמים',chartTitle:'מונשמים',toolTipPostfix:'מונשמים'})
            else 
                respiratoryChart('respiratory-chart', [],isThemeWhite,{xTitle:'תאריך',yTitle:'כמות מונשמים',chartTitle:'מונשמים',toolTipPostfix:'מונשמים'})
          
            
        
    }, [isOpen])

    

    


    return (
    <div id="respiratory-chart-container" className={`small-chart-container ${isOpen ? 'open' : ''}`}>
    <canvas id="respiratory-chart" ></canvas>
    </div>)

}