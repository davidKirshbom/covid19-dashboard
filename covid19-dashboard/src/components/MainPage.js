import themeContext from '../context/ThemeContext'
import React, { useContext, useEffect ,useState} from 'react'
import RespiratoryChart from './charts/respiratoryChart'
import {getGeneralStatics} from '../server/data'
import DeathsChart from './charts/DeathsChart'
import PositiveTestsChart from './charts/PositiveTestsChart'
export default () => {
  const chartsName={respiratory:'respiratory',deaths:'deaths',positiveTests:'positiveTests'}
  const [data, setData] = useState()
  const [selectedChartOpen,setSelectedChartOpen]=useState()

  useEffect(() => {
    getGeneralStatics().then((value) => {
    console.log("🚀 ~ file: MainPage.js ~ line 14 ~ getGeneralStatics ~ value", value)
      
       setData(value)
              })
  },[])
  
  const getInfoTag = (textHtml) => {
    return (
      <div className="info-container">
        <i className="fas fa-info-circle"></i>
        <div className="info-text" dangerouslySetInnerHTML={{__html:textHtml}}></div>
    </div>)
  }
  
  return (
    <div className="flex-row center general-statics-container">
      <div className="general-statics">
      <div className="static-square">
        <div className="title">מאומתים חדשים אתמול {getInfoTag(`<p>סך הנדבקים בנגיף COVID-19 בישראל שאותרו משעה 00:00 עד שעה 23:59 של יום אתמול</p>

        <p>מאומת-כל מי שנבדק ונמצא חיובי לנגיף COVID-19, בים אם הופיעו אצלו תסמינים ובין אם לא, בים אם הוא חולה, החלים או נפטר</p>`) }</div>
          <div className="static-prime-data">{data?data.verifiedSick.fromYesterdayVerifiedUntilNow.length:'Not available'}</div>
          <div className="static-sub-data"><strong>{data?data.verifiedSick.fromMidnightUntilNow.length:'Not available'}+</strong> מחצות</div>
          <div className="static-sub-data"><strong>{data?data.verifiedSick.allTimesCount:'Not available' }</strong> סה"כ</div>
      </div>
      <div className="static-square">
        <div className="title">חולים פעילים {getInfoTag(`<p>חולה פעיל - כל מי שנבדק ונמצא חיובי לנגיף COVID-19, ללא קשר להופעת תסמינים, שטרם הוגדר כמחלים ושלא נפטר</p>`) }</div>
          <div className="static-prime-data">{data?data.sickPeople.allCurrentSick.length:'Not available' }</div>
          <div className="static-sub-data"><strong>{data?data.sickPeople.fromMidnightUntilNow.length:'Not available' }+</strong> מחצות</div>
        <div className="static-bottom-data flex-row">
          <div className="detail-box">
            <div className="detail-title">בית / קהילה</div>
              <div className="detail-content"><strong>{ data?data.sickPeople.locationsCount.home:'Not available' }</strong></div>
          </div>
          <div className="detail-box">
          <div className="detail-title">מלון</div>
          <div className="detail-content"><strong>{ data?data.sickPeople.locationsCount.hotels:'Not available' }</strong></div>
          </div>
          <div className="detail-box">
          <div className="detail-title">בי"ח</div>
          <div className="detail-content"><strong>{ data?data.sickPeople.locationsCount.hospitals:'Not available' }</strong></div>
        </div>
        </div>
      </div>
      <div className="static-square">
        <div className="title">חולים קשים {getInfoTag(`<p>סך החולים במצב קשה וקריטי כפי שהוגדרו ע"י מערכת הבריאות, המאושפזים בבתי החולים</p>`) }</div>
          <div className="static-prime-data">{data?data.sickPeople.SeriouslyIll.length:'Not available'}</div>
        <div className="static-sub-data"><strong>{data?data.sickPeople.SeriouslyIllSinceMidnight:'Not available' }</strong> מחצות</div>
        <div className="static-bottom-data flex-column">
          <div className="detail-line">
            <div className="detail-content"><span className="circle redpink-bg"></span>מתוכם קריטי <strong>{data?data.sickPeople.SeriouslyIll.filter(person=>person.statuses[person.statuses.length-1].detail==='קריטי').length:''}</strong></div>
          </div>
          <div className="detail-line">
         
              <div className="detail-content"><div className="circle yellow-bg"></div>בינוני <strong>{data?data.sickPeople.mediumIll.length:'' }</strong></div>
          </div>
          
        </div>
      </div>
      <div className={`static-square ${selectedChartOpen===chartsName.respiratory?'selected':''}`}>
        <div className="title">מונשמים{getInfoTag(`<p>סך החולים בנגיף COVID-19 המחוברים למכונת הנשמה בבתי חולים</p>`) }</div>
          <div className="static-prime-data">{data?data.respiratory.allRespiratoryData.length:'' }</div>
        <div className="static-sub-data"><strong>{data?data.respiratory.changeTodayAndMidnight:'' }</strong> מחצות</div>
        <div className="static-bottom-data">
          <div className="detail-chart-title">
            <p><i onClick={() => {setSelectedChartOpen(selectedChartOpen===chartsName.respiratory?'':chartsName.respiratory)
            }} class="fas fa-signal"></i>מגמת שינוי יומית</p>
            <RespiratoryChart  isOpen={selectedChartOpen===chartsName.respiratory} data={data?data.allRespiratoryData:[]} ></RespiratoryChart>
            
          </div>
        </div>
      </div>
      <div className={`static-square ${selectedChartOpen===chartsName.deaths?'selected':''}`}>
        <div className="title">נפטרים מצטבר{getInfoTag(`<p>סך הנפטרים מנגיף covid-19 בישראל, החל מפרוץ המגפה</p>`) }</div>
          <div className="static-prime-data">{data?data.deathsData.length:'' }</div>
        <div className="static-sub-data"> </div>
        <div className="static-bottom-data">
          <div className="detail-chart-title">
            <p id="death-chart-icon"><i onClick={() => {
             
              setSelectedChartOpen(selectedChartOpen===chartsName.deaths?'':chartsName.deaths)
           
              
            }} class="fas fa-signal"></i>מגמת שינוי יומית</p>
            <DeathsChart  isOpen={selectedChartOpen===chartsName.deaths}  data={data?data.deathsData:[]}></DeathsChart>
          </div>
        </div>
      </div>
      <div className={`static-square ${selectedChartOpen===chartsName.positiveTests?'selected':''}`}>
        <div className="title">אחוז בדיקות חיוביות אתמול{getInfoTag(`<p>אחוז הבדיקות החיוביות מתוך סך הבדיקות לגילוי הנגיף בפעם הראשונה לכל נבדק. שתוצאותיהן התקבלו משעה : עד שעה : של יום אתמול</p><p>בדיקות אתמול - מספר תוצאות של בדיקות, הן לבדיקה לזיהוי ראשוני של הנגיף והן לבדיקה נלוות לקביעת החלמה, שהתקבלו החל מחצות : עד שעה : של יום אתמול</p>`) }</div>
          <div className="static-prime-data">%{data?data.testsData.percentPositiveYesterday:'N/A' }</div>
        <div className="static-sub-data"><strong>%{data?data.testsData.percentPositiveToday:'N/A' }</strong> מחצות</div>
        <div className="static-bottom-data">
          <div className="detail-chart-title">
            <p><i onClick={() => {
                setSelectedChartOpen(selectedChartOpen === chartsName.positiveTests ? '' : chartsName.positiveTests)
              }} class="fas fa-signal"></i>מגמת שינוי יומית</p>
            <PositiveTestsChart  isOpen={selectedChartOpen===chartsName.positiveTests}data={data?data.deathsData:[]}></PositiveTestsChart>
            
          </div>
        </div>
        </div>
        </div>
 
    </div>
  );
}

