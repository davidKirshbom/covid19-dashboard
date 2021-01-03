import React, { useEffect } from 'react'
import moment from 'moment';
import { getGeneralStatics } from '../../server/data'
import respiratoryChart from '../../charts/makeChart'

export default ({ isOpen,data }) => {
    useEffect(() => {
            if(isOpen)
                respiratoryChart('deaths-chart', getChartLineData(data),{xTitle:'תאריך',yTitle:'כמות נפטרים',chartTitle:'נפטרים - שינוי יומי', toolTipPostfix:'נפטרים'})
            else 
            respiratoryChart('deaths-chart', [])
        
    }, [isOpen])
    const getChartLineData = (people) => {
        let day = moment('02/03/2020','DD/MM/YYYY');
        const end = moment().clone();
        const result = [];
        let count = 0;
    
        while (day.isSameOrBefore(end)) {         
          people.forEach(person => {      
            if (person.statuses.some((status) => { 
              
               
                return status.name === 'נפטר' && (moment(status.createdAt).startOf('day').isSame(day.startOf('day')))
          
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
    

    


    return (
    <div id="respiratory-chart-container" className={`small-chart-container ${isOpen ? 'open' : ''}`}>
    <canvas id="deaths-chart" ></canvas>
    </div>)

}