import React from 'react'
import VerifiedAvgWeekly from './charts/VerifiedAvgWeekly'
import SeriouslyIllWeek from './charts/SeriouslyIllWeek'
import VerifiedOutSideRedZone from './charts/VerifiedOutSideRedZone'
import LookupTag from './LookupTag'
export default () => {
   return ( <div className="spread-weekly">
        <h1 className="title">מדדי התפשטות בהסתכלות שבועית</h1>
        <div className="weekly-charts-container">
          <div className="weekly-chart-container">
            <h3>מגמת שינוי במאומתים חדשים וקצב הכפלה</h3>
            <LookupTag text='% שינוי בממוצע מאמתים חדשים שבועי, ומספר הימים להכפלת הנדבקים (בסוגריים)' isInfo={true}/>
          <VerifiedAvgWeekly/>
          </div>
          <div className="weekly-chart-container flex-shrink-1">
            <h3>מספר החולים קשה וקריטי</h3>
            <SeriouslyIllWeek/>
          </div>
          <div className="weekly-chart-container">
            <h3>מספר המאומתים החדשים מחוץ לאזורי ההתפשטות</h3>
            <LookupTag text='הנתונים אינם כוללים מאומתים מישובים אדומים, מוסדות גריאטריים וחוזרים מחו"ל'isInfo={true} />
            <VerifiedOutSideRedZone/>
          </div>
        </div>
      </div>)
}