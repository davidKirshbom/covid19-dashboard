import React, { useContext } from 'react'
import themeContext from '../context/ThemeContext'

import VerifiedAvgWeekly from './charts/VerifiedAvgWeekly'
import SeriouslyIllWeek from './charts/SeriouslyIllWeek'
import VerifiedOutSideRedZone from './charts/VerifiedOutSideRedZone'
import LookupTag from './LookupTag'
export default () => {
    const { isThemeWhite } = useContext(themeContext)

  return (
    <div className={`spread-weekly ${isThemeWhite?'':'black-theme'}`}>
        <h1 className="title">מדדי התפשטות בהסתכלות שבועית</h1>
        <div className="weekly-charts-container">
          <div id="verified-avg-container" className="weekly-chart-container">
            <h3>מגמת שינוי במאומתים חדשים וקצב הכפלה</h3>
            <LookupTag text='% שינוי בממוצע מאמתים חדשים שבועי, ומספר הימים להכפלת הנדבקים (בסוגריים)' isInfo={true}/>
          <VerifiedAvgWeekly isThemeWhite={ isThemeWhite}/>
          </div>
          <div id="sick-seriously-chart" className="weekly-chart-container flex-shrink-1">
            <h3>מספר החולים קשה וקריטי</h3>
          <SeriouslyIllWeek isThemeWhite={isThemeWhite}/>
          </div>
          <div className="weekly-chart-container">
            <h3>מספר המאומתים החדשים מחוץ לאזורי ההתפשטות</h3>
            <LookupTag text='הנתונים אינם כוללים מאומתים מישובים אדומים, מוסדות גריאטריים וחוזרים מחו"ל'isInfo={true} />
          <VerifiedOutSideRedZone isThemeWhite={isThemeWhite}/>
          </div>
        </div>
      </div>)
}