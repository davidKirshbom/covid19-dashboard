import React,{useEffect,useState} from 'react'
import { getEpidemicCurve, getSeriouslyIllAndRespiratoryUntilNow,getEnlightenmentSeriouslyIllUntilNow } from '../../server/data'
import Chart from 'chart.js'
import moment from 'moment'
import LookupTag from '../LookupTag'

import CustomSelect from '../CustomSelect'
import {updateCharByCurrentTheme} from '../../charts/utils'


export default ({isThemeWhite}) => {
    const [noteData,setNoteData]=useState()

    const [startDate, setStartDate] = useState(moment().subtract(2, 'weeks').toDate());
    const [chart,setChart]=useState()
    useEffect(() => {
        if (chart) {
            setChart(updateCharByCurrentTheme(chart,isThemeWhite))
            chart.update();
       }
    },[isThemeWhite])
    useEffect(() => {
        getEnlightenmentSeriouslyIllUntilNow().then(value=>setNoteData(value))
      },[])
    useEffect(() => {
        const isTwoLinesChart = startDate && moment().diff(moment(startDate), 'days') > 80 ;

        // let ctx = document.getElementById('seriously-ill-and-respiratory-chart');
        // let gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 500);
        // gradient.addColorStop(0, 'rgba(83, 204, 253, 1)');
        // gradient.addColorStop(0.25, 'rgba(204, 243, 246, 0.5)');
        // gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        getSeriouslyIllAndRespiratoryUntilNow(startDate).then((value) => {            
            let myChart = new Chart('seriously-ill-and-respiratory-chart', {
           
                type: 'line',
                data: {
                    datasets: [
                        {
                     
                            type: 'line',
                            label: 'חולים קשים',
                            data: value.length > 0 ? value.map(data => data.seriouslyIllOnDate) : undefined,
                            backgroundColor:'transparent',
                            borderColor:
                                '#b6ca51'
                            ,
                            borderWidth: 5,
                            pointRadius: 0,
                            
                            },{
                        type: 'line',
                            label: 'מונשמים',
                            backgroundColor:'transparent',
                        
                        data:value&& value.length > 0 ? value.map(data => data.respiratoryOnDate) : undefined,
                        
                      
                        borderColor:
                            '#50cbfd'
                        ,
                        borderWidth: 5,
                        pointRadius: 0,
                        
                    },
                   
                        {
                     
                            type: 'bubble',
                            
                            label: {},
                            data: value.length > 0 ? value.map(data => data.respiratoryOnDate) : undefined,
                        
                      
                            borderColor:
                                '#50cbfd'
                            ,
                            borderWidth: 5,
                            pointRadius: 0,
                            
                        },
                        {
                     
                            type: 'bubble',
                            label: false,
                            data: value.length > 0 ? value.map(data => data.seriouslyIllOnDate) : undefined,
                      
                            borderColor:
                                '#b6ca51'
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
                            right: 60
                        }
                    },
                   
                }
            })
            setChart(myChart)
        
        })

    },[])
    return (
        <div className={`seriously-ill-and-respiratory-chart-container chart-card ${isThemeWhite?'':'black-theme'}`}>
        <div className="title-filter-wrapper">
        <h3>חולים קשה ומונשמים</h3>
          <CustomSelect
            id="seriously-ill-and-respiratory-date-select"
            onChange={(selected) => setStartDate(selected)}
            optionsArray={[{ value: moment('20/3/2020', 'DD/M/YYYY').toDate(), text: "עד עכשיו" },
                           { value: moment().subtract(1, 'week').toDate(), text:"שבוע אחרון" },
                           { value: moment().subtract(2, 'weeks').toDate(), text: 'שבועיים אחרונים' },
                           {isDefault:true,value:moment().subtract(1,'month').toDate(),text:'חודש אחרון'}
                                        ]} />
        </div>
        <LookupTag text={`סה"כ ${noteData?noteData.seriouslyIllData:''} חולים קשה ו - ${noteData?noteData.respiratoryData:''} מונשמים מאז תחילת המשבר (מרץ 2020) `} isInfo={false} />
        
        <div  className="large-chart-container">
        <canvas id="seriously-ill-and-respiratory-chart">
          
        </canvas>
      </div>
        </div>
        
    )
}