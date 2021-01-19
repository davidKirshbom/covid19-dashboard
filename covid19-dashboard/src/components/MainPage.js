import themeContext from '../context/ThemeContext'
import React, { useContext, useEffect ,useState} from 'react'

import DeathsChartByDate from './charts/DeathsChartByDate'
import StaticsRow from '../components/StaticsRow'
import WeeklyCharts from './WeeklyCharts'
import LookupTag from './LookupTag'
import moment, { months } from 'moment'
import EpidemicCurveChart from './charts/EpidemicCurveChart'
import CustomSelect from './CustomSelect'
import SeriouslyIllChart from './charts/SeriouslyIllChart'
import CitiesByColor from './CitiesByColor'
import TestsWeekData from './charts/TestsWeekData'
export default () => {
 
  
  const { isThemeWhite } = useContext(themeContext)

  
  return (
    <div className={`main-page-container ${isThemeWhite?'':'black-theme'}`}  >
        <StaticsRow />
        <WeeklyCharts />
      <div className="flex-row-wrapper">
        <EpidemicCurveChart isThemeWhite={isThemeWhite} />
        <SeriouslyIllChart isThemeWhite={isThemeWhite}/>
      </div>
      <div id="city-and-test-section" className="flex-row-wrapper">
        <CitiesByColor isThemeWhite={isThemeWhite}/>
        <TestsWeekData isThemeWhite={isThemeWhite}/>
      </div>
      <div className="flex-row-wrapper">
        <DeathsChartByDate isThemeWhite={isThemeWhite}/>
      </div>
    </div>
 )
}

