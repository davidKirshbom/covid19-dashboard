import React, { useEffect, useState } from 'react'
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';
import { getChangesAndDoubleFactorPerWeek } from '../../server/data'
import respiratoryChart from '../../charts/makeChart'
Chart.plugins.unregister(ChartDataLabels);
export default () => {
    

    useEffect(() => {
        let ctx = document.getElementById('verified-avg-chart');
        let gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 500);
    
        gradient.addColorStop(0, 'rgba(83, 204, 253, 1)');
        gradient.addColorStop(0.25, 'rgba(204, 243, 246, 0.5)');
        gradient.addColorStop(0.35, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        getChangesAndDoubleFactorPerWeek().then(value => {
            var myChart = new Chart('verified-avg-chart', {
                plugins:[ChartDataLabels],
                type: 'line',
                data: {
                  
                    datasets: [{
                        label: {
                          
                        },
                        data: value.length > 0 ? value.map(data => data.avgChangeByWeek) : undefined,
                        
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
                     
                        type: 'bubble',
                        label: {
                        
                        },
                        data: value.length > 0 ? value.map(data => data.avgChangeByWeek) : undefined,
                      
                        backgroundColor:
                            gradient
                        ,
                        borderColor:
                            '#53ccfd'
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
                            labels: value.map(data => data.avgChangeByWeek),
                            scaleLabel: {
                                display: true,
                                labelString: 'אחוז שינוי יומי',
                                fontSize: 15,
                            },
                            ticks: {
                              
                                maxTicksLimit: 5,
                                callback: (value) => {
                                    return value+"%"
                                }
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
                            formatter: (text,context)=> {
                                return `${text}% \n (${value[context.dataIndex].daysToDoubleSickPeople})`
                            }
                        }
                    }
                }

            })
        }
                
        )
        
    }, [])
   
    

    


    return (
    <div id="verified-avg-chart-container" className={`medium-chart-container `}  style={{ position: 'relative',width:35+'vw'}}>
    <canvas id="verified-avg-chart" ></canvas>
    </div>)

}