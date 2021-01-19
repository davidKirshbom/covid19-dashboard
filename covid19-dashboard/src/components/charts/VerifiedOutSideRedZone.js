import React, { useEffect, useState } from 'react'
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';
import { getVerifiedOutsideRedZone } from '../../server/data'
import respiratoryChart from '../../charts/makeChart'
import {updateCharByCurrentTheme} from '../../charts/utils'

Chart.plugins.unregister(ChartDataLabels);
export default ({isThemeWhite}) => {
    const [chart,setChart]=useState()
    useEffect(() => {
        if (chart) {
            setChart(updateCharByCurrentTheme(chart,isThemeWhite))
            chart.update();
       }
    },[isThemeWhite])
    useEffect(() => {
        let ctx = document.getElementById('verified-outside-red-chart');
        getVerifiedOutsideRedZone().then(value => {
            let myChart = new Chart('verified-outside-red-chart', {
                plugins:[ChartDataLabels],
                type: 'bar',
                data: {
                  
                    datasets: [{
                        label: {
                          
                        },
                        data: value.length > 0 ? value.map(data => data.count) : undefined,
                        
                        borderColor:
                            '#b8cb56'
                        ,
                        backgroundColor: '#b8cb56',
                        borderWidth: 0,
                        borderWidth:1,
                        pointRadius: 0,
                        barThickness:10,
                      
                    }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text:  '',
               
                    
                    },
                    legend: {
                    
                        display: false,
                    },
                    scales: {
                    
                        xAxes: [{
                            
                            labels: value.map(data => data.day),
                            scaleLabel: {
                                display: true,
                                labelString: '',
                                fontSize: 15,
                            },
                            gridLines: {
                                display:false
                            }
                        }],
                        yAxes: [{
                            labels: value.map(data => data.count),
                            scaleLabel: {
                                display: true,
                                labelString: '',
                                fontSize: 15,
                            },
                            ticks: {
                              
                                maxTicksLimit: 5,
                               
                            },
                            gridLines: {
                                display:false
                            }
                            
                            
                        }]
                    },
                    tooltips: {
                        enabled:false
                    },
                    layout: {
                        
                        padding: {
                            top: 20,
                            right:25
                     }  
                   },
                    plugins: {
                        datalabels: {
                            clamp:false,
                            display: 'auto',
                            offset:65,
                            textAlign:'center',
                            align:'top',
                           
                        }
                    }
                }

            })
            setChart(myChart)
            
        }
                
        )
        
    }, [])
   
    

    


    return (
    <div id="verified-outside-red-chart-container" className={`medium-chart-container `} >
    <canvas id="verified-outside-red-chart" ></canvas>
    </div>)

}