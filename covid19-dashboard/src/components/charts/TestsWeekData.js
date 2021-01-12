import React,{useEffect} from 'react'
import LookupTag from '../LookupTag'
import moment from 'moment'
import { getTestsSinceDate } from '../../server/data'
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.plugins.unregister(ChartDataLabels);

export default () => {
    useEffect(() => {
        getTestsSinceDate(moment().clone().subtract(1, 'week').toDate()).then((data) => {
            var myChart = new Chart('tests-last-week-chart', {
                plugins:[ChartDataLabels],
                type: 'bar',
                data: {
                    datasets: [
                        {
                     
                            type: 'bar',
                            label: 'מאומתים',
                            data: data.length > 0 ? data.map(dayData => dayData.verifiedCount) : undefined,
                            backgroundColor:    '#348a8b',
                            borderColor:
                                '#348a8b'
                            ,
                            borderWidth: 2,
                            barThickness:10,
                            datalabels: {
                                color: 'black',
                                clamp:false,
                                anchor:'end',
                                textAlign:'center',
                                backgroundColor: 'white',
                                borderColor: '#348a8b',
                                borderWidth: 2,
                                borderRadius:5,
                                padding: {
                                    right:2,
                                    left:2
                                },
                                formatter(text, context) {
                                console.log("🚀 ~ file: TestsWeekData.js ~ line 43 ~ formatter ~ context", context)
                                   const allTestCount= data[context.dataIndex].allTestCount
                                    if (text === 0)
                                        return null
                                    else
                                        return (text/allTestCount)*100+"%"
                                }
                            }
                            },{
                        type: 'bar',
                            label: 'בדיקות',
                            backgroundColor: '#50cbfd',
                            borderColor:'#50cbfd',
                        
                            data:data&& data.length > 0 ? data.map(dayData => dayData.allTestCount-dayData.verifiedCount) : undefined,
                            borderWidth: 2,
                            barThickness: 10,
                          
                                datalabels: {
                                    color: 'black',
                                    clamp:false,
                                    anchor:'end',
                                    textAlign:'center',
                                    align: 'top',
                                    formatter(text, context) {
                                        const allTestCount = data[context.dataIndex].allTestCount;                                        
                                             return allTestCount
                                     }
                                   
                            }
                           
                            
                        
                        
                    },
                   
                       
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
                       display:false
                    },
                   
                    scales: {
                    
                        xAxes: [{
                            stacked:true,
                            labels: data.map(dayData => dayData.day),
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
                            stacked:true,
                            labels: data.map(dayData => dayData.verifiedUntilDate),
                            scaleLabel: {
                                display: true,
                                labelString: 'מספר בדיקות',
                                fontSize: 15,

                            },
                            ticks: {
                                
                                maxTicksLimit: 5,
                              
                            },
                            gridLines: {
                                display: false
                            }
                            
                            
                        }
                            
                            
                        ]
                    },
                    tooltips: {
                        mode:'index',
                        intersect: true,
                        backgroundColor: 'white',
                        bodyFontColor: 'black',
                        callbacks: {
                            title:()=>{}
                        }
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
            
        
    },[])
    return (
        <div className="tests-last-week">
            <div className="flex-row space-between">
                <h3>בדיקות לגילוי נבדקים</h3>
                <div className="flex-row circle-legends-container">
                    <div className="flex-row circle-legend-container">
                        <div id="test-circle-legend" className="circle-legend "></div>
                        <div className="legend-text">מאומתים</div>    
                    </div>
                    <div className="flex-row circle-legend-container">
                        <div id="verified-circle-legend" className="circle-legend "></div>
                        <div className="legend-text">בדיקות</div> 
                    </div>
                    </div>
                   
            </div>
            <div className="lookups-container">
                <LookupTag text='סה"כ 707,721 בדיקות בשבוע האחרון ( 6.54% אחוז המאומתים השבועי הממוצע)' isInfo={false} />
                <LookupTag text="הנתונים אינם כוללים מידע על בדיקות לאבחון החלמה" isInfo={true} />
            </div>
            <canvas id="tests-last-week-chart"></canvas>
        </div>
    )
}