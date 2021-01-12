import React,{useEffect,useState} from 'react'
import { getTotalDeaths, getDeathsSinceDateByDay } from '../../server/data'
import Chart from 'chart.js'
import moment from 'moment'
import LookupTag from '../LookupTag'

import CustomSelect from '../CustomSelect'


export default () => {
    const [totalDeaths,setTotalDeaths]=useState()
    const [startDate, setStartDate] = useState(moment().subtract(2, 'weeks').toDate());
    useEffect(() => {
        getTotalDeaths().then(value=>setTotalDeaths(value.deathsCount))
    },[])
    useEffect(() => {
        getDeathsSinceDateByDay(startDate).then((value) => {            
            var myChart = new Chart('deaths-chart-by-date', {
           
                type: 'line',
                data: {
                    datasets: [
                        {
                     
                            type: 'bar',
                            label: 'נפטרים',
                            data: value.length > 0 ? value.map(data => data.count) : undefined,
                            backgroundColor:'#1c7d7e',
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
                            filter: (item, chart)=>{
                                return item.datasetIndex!==2&&item.datasetIndex!==3
                            }
                            
                        },
                        
                    },
                    scales: {
                    
                        xAxes: [{
                            
                            labels: value.map(data => data.day),
                            scaleLabel: {
                                display: true,
                                labelString: 'תאריך ',
                                fontSize: 15,
                            },
                            ticks: {
                                maxTicksLimit:8,
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
                                labelString: 'מספר נפטרים',
                                fontSize: 15,

                            },
                            ticks: {
                                
                                maxTicksLimit: 5,
                              
                            },
                            gridLines: {
                                display: true
                            }
                            
                            
                        }
                            
                            
                        ]
                    },
                    tooltips: {
                        mode:'index',
                      intersect:true,
                    },
                    layout: {
                        
                        padding: {
                            top: 20,
                            right: 25
                        }
                    },
                   
                }
                })
        
        })

    })
    return (
        <div className="deaths-chart-by-date-container">
        <div className="title-filter-wrapper">
          <h3>נפטרים</h3>
          <CustomSelect
            id="death-date-select"
            onChange={(selected) => setStartDate(selected)}
            optionsArray={[{ value: moment('20/3/2020', 'DD/M/YYYY').toDate(), text: "עד עכשיו" },
                           { value: moment().subtract(1, 'week').toDate(), text:"שבוע אחרון" },
                           { value: moment().subtract(2, 'weeks').toDate(), text: 'שבועיים אחרונים' },
                           {isDefault:true,value:moment().subtract(1,'month').toDate(),text:'חודש אחרון'}
                                        ]} />
        </div>
        <LookupTag text={`סה"כ ${totalDeaths} נפטרים מאז תחילת המשבר (מרץ 2020)`} isInfo={false} />
        
        <div className="medium-chart-container">
        <canvas id="deaths-chart-by-date">
          
        </canvas>
      </div>
        </div>
        
    )
}