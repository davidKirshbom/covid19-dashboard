import React, { useEffect } from 'react'
import moment from 'moment';

import respiratoryChart from '../../charts/makeChart'

export default ({ isOpen,data }) => {
    useEffect(() => {
            if(isOpen)
                respiratoryChart('Positive-test-chart', getChartLineData(data),{xTitle:'תאריך',yTitle:'מספר בדיקות יומיות',chartTitle:'בדיקות - מגמת שינוי יומית',toolTipPostfix:'בדיקות'})
            else 
            respiratoryChart('Positive-test-chart', [])
        
    }, [isOpen])
    const getChartLineData = (people) => {
        let day = moment('01/01/2020','DD/MM/YYYY');
        const end = moment().clone();
        const result = [];
      
        while (day.isSameOrBefore(end)) {  
            let count = 0;
          people.forEach(person => {      
            person.statuses.forEach((status) => { 
              
                if ((moment(status.createdAt).startOf('day').isSame(day.startOf('day')) && status.name === 'נבדק'))
                    count++;
            })
          });
        
          result.push({ x: day.clone().format('D.M').toString(), y:count });
          day.add('1','day')
        }
        return result   
      }
    

    


    return (
    <div id="respiratory-chart-container" className={`small-chart-container ${isOpen ? 'open' : ''}`}>
    <canvas id="Positive-test-chart" ></canvas>
    </div>)

}