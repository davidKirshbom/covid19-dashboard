import themeContext from '../context/ThemeContext'
import React, { useContext, useEffect ,useState} from 'react'
import respiratoryChart from '../charts/respiratoryChart'
import {getGeneralStatics} from '../server/data'
export default () => {
  useEffect(() => {
    let data;
    getGeneralStatics().then((value) => {
    console.log("🚀 ~ file: MainPage.js ~ line 9 ~ getGeneralStatics ~ value", value)
      data = value;
      respiratoryChart('respiratory-chart',value.allRespiratoryData)

    })
  
  }, [])
  const [isRespiratrChartOpen,setRespirtryCartOpen]=useState(false)
  const getInfoTag = (textHtml) => {
    return (
      <div className="info-container">
        <i className="fas fa-info-circle"></i>
        <div className="info-text" dangerouslySetInnerHTML={{__html:textHtml}}></div>
    </div>)
  }
  
  return (
    <div className="general-statics">
      <div className="static-square">
        <div className="title">מאומתים חדשים אתמול {getInfoTag(`<p>סך הנדבקים בנגיף COVID-19 בישראל שאותרו משעה 00:00 עד שעה 23:59 של יום אתמול</p>

        <p>מאומת-כל מי שנבדק ונמצא חיובי לנגיף COVID-19, בים אם הופיעו אצלו תסמינים ובין אם לא, בים אם הוא חולה, החלים או נפטר</p>`) }</div>
        <div className="static-prime-data">5086</div>
        <div className="static-sub-data"><strong>3,519+</strong> מחצות</div>
        <div className="static-sub-data"><strong>423,262</strong> סה"כ</div>
      </div>
      <div className="static-square">
        <div className="title">חולים פעילים {getInfoTag(`<p>חולה פעיל - כל מי שנבדק ונמצא חיובי לנגיף COVID-19, ללא קשר להופעת תסמינים, שטרם הוגדר כמחלים ושלא נפטר</p>`) }</div>
        <div className="static-prime-data">45,373</div>
        <div className="static-sub-data"><strong>189+</strong> מחצות</div>
        <div className="static-bottom-data flex-row">
          <div className="detail-box">
            <div className="detail-title">בית / קהילה</div>
            <div className="detail-content"><strong>10,153</strong></div>
          </div>
          <div className="detail-box">
          <div className="detail-title">מלון</div>
          <div className="detail-content"><strong>10,153</strong></div>
          </div>
          <div className="detail-box">
          <div className="detail-title">בי"ח</div>
          <div className="detail-content"><strong>10,153</strong></div>
        </div>
        </div>
      </div>
      <div className="static-square">
        <div className="title">חולים קשים {getInfoTag(`<p>סך החולים במצב קשה וקריטי כפי שהוגדרו ע"י מערכת הבריאות, המאושפזים בבתי החולים</p>`) }</div>
        <div className="static-prime-data">678</div>
        <div className="static-sub-data"><strong>-12</strong> מחצות</div>
        <div className="static-bottom-data flex-column">
          <div className="detail-line">
            <div className="detail-content"><span className="circle redpink-bg"></span>מתוכם קריטי <strong>10,153</strong></div>
          </div>
          <div className="detail-line">
         
          <div className="detail-content"><div className="circle yellow-bg"></div>בינוני <strong>10,153</strong></div>
          </div>
          
        </div>
      </div>
      <div className="static-square">
        <div className="title">מונשמים{getInfoTag(`<p>סך החולים בנגיף COVID-19 המחוברים למכונת הנשמה בבתי חולים</p>`) }</div>
        <div className="static-prime-data">678</div>
        <div className="static-sub-data"><strong>-2</strong> מחצות</div>
        <div className="static-bottom-data">
          <div className="detail-chart-title">
            <p><i onClick={()=>setRespirtryCartOpen(!isRespiratrChartOpen)} class="fas fa-signal"></i>מגמת שינוי יומית</p>
            <div id="respiratory-chart-container" className={`small-chart-container ${isRespiratrChartOpen?'open':''}`}>
            <canvas id="respiratory-chart" ></canvas>
            </div>
            
          </div>
        </div>
      </div>
      <div className="static-square"></div>
      <div className="static-square"></div>

  
    </div>
  );
}

