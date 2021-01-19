import React,{useEffect,useState} from 'react'
import { getEpidemicCurve } from '../../server/data'
import Chart from 'chart.js'
import moment from 'moment'
import LookupTag from '../LookupTag'
import {updateCharByCurrentTheme} from '../../charts/utils'

import CustomSelect from '../CustomSelect'

import { getEnlightenmentVerifiedDoubleFromNow } from '../../server/data'

export default ({isThemeWhite}) => {
    const [daysDoubledVerified,setDaysDoubleVerified]=useState(0)

    const [startDate, setStartDate] = useState(moment().subtract(2, 'weeks').toDate());
    
    const [chart,setChart]=useState()
    useEffect(() => {
        if (chart) {
            setChart(updateCharByCurrentTheme(chart,isThemeWhite))
            chart.update();
       }
    },[isThemeWhite])
    useEffect(() => {
        getEnlightenmentVerifiedDoubleFromNow().then(value=>setDaysDoubleVerified(value))
      },[])
    useEffect(() => {
        const isTwoLinesChart = startDate && moment().diff(moment(startDate), 'days') > 80 ;

        let ctx = document.getElementById('epidemic-curve-chart');
        let gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 500);
 
        gradient.addColorStop(0, 'rgba(83, 204, 253, 1)');
        gradient.addColorStop(0.25, 'rgba(204, 243, 246, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        getEpidemicCurve(startDate).then((value) => {            
            let myChart = new Chart('epidemic-curve-chart', {
           
                type: 'line',
                
                data: {
                  
                    datasets: [{
                        type: 'line',
                        label: 'מאומתים מצטבר',
                        yAxisID:'verified-all',
                        data: value.length > 0 ? value.map(data => data.verifiedUntilDate) : undefined,
                        
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
                     
                        type: isTwoLinesChart?'line':'bar',
                        label: 'מחלימים חדשים',
                        data: value.length > 0 ? value.map(data => data.recoverOnDate) : undefined,
                      
                        backgroundColor:
                            '#898989'
                        ,
                        borderColor:
                            '#898989'
                        ,
                        borderWidth: 5,
                        pointRadius: 0,
                        
                        },
                        {
                     
                            type: 'bar',
                            yAxisID:'new-cases',
                            label: 'מאומתים חדשים',
                            data: value.length > 0 ? value.map(data => data.verifiedOnDate) : undefined,
                          
                            backgroundColor:
                                '#1c7d7e'
                            ,
                            borderColor:
                                '#1c7d7e'
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
                        display: true,
                        text: '',
               
                    
                    },
                    legend: {
                        align: 'start',
                        rtl: true,
                        
                        onClick: (e) => e.stopPropagation(),
                        labels: {
                            usePointStyle: true,
                            // fontSize: 7,
                            boxWidth: 6,
                            
                            
                        },
                        
                    },
                    
                    scales: {
                        
                        xAxes: [{
                            
                            labels: value.map(data => data.day),
                            scaleLabel: {
                                display: true,
                                labelString: 'תאריך הבדיקה',
                                fontSize: 15,
                            },
                            ticks: {
                                maxTicksLimit:19,
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            id: 'verified-all',
                            position: 'left',
                            labels: value.map(data => data.verifiedUntilDate),
                            scaleLabel: {
                                display: true,
                                labelString: 'מספר מקרים מצטבר',
                                fontSize: 15,

                            },
                            ticks: {
                                
                                maxTicksLimit: 5,
                              
                            },
                            gridLines: {
                                display: true
                            }
                            
                            
                        }, {
                            id: 'new-cases',
                            position: 'right',
                            labels: value.map(data => data.verifiedOnDate),
                            scaleLabel: {
                                display: true,
                                labelString: 'מספר מקרים חדשים',
                                fontSize: 15,
                                
                            },
                            ticks: {
                              
                                maxTicksLimit: 5,
                           
                            },
                            gridLines: {
                                display: true
                            }
                            
                            
                        }]
                    },
                    tooltips: {
                        mode:'index',
                      intersect:true,
                    },
                    layout: {
                        
                        padding: {
                            top: 20,
                            right: 35
                        }
                    },
                   
                }
                })
                setChart(myChart)
        })
        

    },[])
    return (
        <div className={`epidemic-chart-container chart-card ${isThemeWhite?'':'black-theme'}`}>
        <div className="title-filter-wrapper">
          <h3>עקומה אפידמית</h3>
          <CustomSelect
            id="epidemic-curve-date-select"
            onChange={(selected) => setStartDate(selected)}
            optionsArray={[{ value: moment('20/3/2020', 'DD/M/YYYY').toDate(), text: "עד עכשיו" },
                           { value: moment().subtract(1, 'week').toDate(), text:"שבוע אחרון" },
                           {isDefault:true, value: moment().subtract(2, 'weeks').toDate(), text: 'שבועיים אחרונים' },
                           {value:moment().subtract(1,'month').toDate(),text:'חודש אחרון'}
                                        ]} />
        </div>
        <LookupTag text={`'מספר הנדבקים היום הינו כפול מהמספר לפני ${daysDoubledVerified} ימים'`} isInfo={false} />
        
        <div className="large-chart-container">
        <canvas id="epidemic-curve-chart">
          
        </canvas>
      </div>
        </div>
        
    )
}