import React, { useEffect } from 'react'
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {  getSeriouslyIllWeek } from '../../server/data'

Chart.plugins.unregister(ChartDataLabels);
export default () => {
    

    useEffect(() => {
        let ctx = document.getElementById('seriously-ill-chart');
        let gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 500);
    
        gradient.addColorStop(0, 'rgba(104, 169, 169, 1)');
        gradient.addColorStop(0.25, 'rgba(167, 205, 206, 0.5)');
        gradient.addColorStop(0.35, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        getSeriouslyIllWeek().then(value => {
            var myChart = new Chart('seriously-ill-chart', {
                plugins:[ChartDataLabels],
                type: 'line',
                data: {
                  
                    datasets: [{
                        label: {
                          
                        },
                        data: value.length > 0 ? value.map(data => data.count) : undefined,
                        
                        backgroundColor:
                            gradient
                        ,
                        borderColor:
                            'rgba(104, 169, 169, 1)'
                        ,
                        borderWidth: 5,
                        pointRadius: 0,
                      
                    },
                        {
                     
                        type: 'bubble',
                        label: {
                        
                        },
                        data: value.length > 0 ? value.map(data => data.count) : undefined,
                      
                        backgroundColor:
                            gradient
                        ,
                        borderColor:
                            'rgba(104, 169, 169, 1)'
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
                            display:'auto',
                            textAlign:'center',
                            align:'top',
                            
                        }
                    }
                }

            })
        }
                
        )
        
    }, [])
   
    

    


    return (
    <div id="seriously-ill-chart-container" className={`medium-chart-container `}  style={{ position: 'relative',width:20+'vw'}}>
    <canvas id="seriously-ill-chart" ></canvas>
    </div>)

}