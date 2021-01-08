import themeContext from '../context/ThemeContext'
import React, { useContext, useEffect ,useState} from 'react'


import StaticsRow from '../components/StaticsRow'
import WeeklyCharts from './WeeklyCharts'
import LookupTag from './LookupTag'
import moment, { months } from 'moment'
import EpidemicCurveChart from './charts/EpidemicCurveChart'
import CustomSelect from './CustomSelect'
import SeriouslyIllChart from './charts/SeriouslyIllChart'
import CitiesByColor from './CitiesByColor'
export default () => {
 
  
  const [startDate, setStartDate] = useState(moment().subtract(2, 'weeks').toDate());

  
  return (
    <div className="main-page-container">
      <StaticsRow />
      <WeeklyCharts />
      <div className="flex-row-wrapper">
      <EpidemicCurveChart />
     <SeriouslyIllChart/>
        </div>
      <CitiesByColor/>
      
    </div>
 )
}

