import React from 'react'
import LookupTag from './LookupTag'
import moment from 'moment'

export default () => {
    
    return (
        <div className="cities-by-color-container">
            <div className="top">
                <div className="title-wrapper">
                    <h3>תכנית הרמזור</h3>
                    <h4>*מרכיבי ציון הרמזור (לפי נתוני השבוע האחרון)</h4>
                </div>
                <div className="flex-row-wrapper none-width">
                <LookupTag isInfo={true} text={`הנתונים נכונים לתאריך ${moment().format('DD/MM/YYYY').toString()}`} />
                <input className="search-input" type="text"></input>
                </div>
            </div>
            <div className="extra-large-chart-container">
                <div className="legends-container">
                    <div className="legend-container">
                        <div className="legend-color red-bg"></div>
                        <div className="legend-text">
                            <div className="legend-title">אדום-פעילות מינימלית</div>
                            <div className="legend-subtitle">ציון 7.5 ומעלה</div>
                        </div>
                    </div>
                    <div className="legend-container ">
                        <div className="legend-color orange-bg"></div>
                        <div className="legend-text">
                            <div className="legend-title">כתום - פעילות מצומצמת</div>
                            <div className="legend-subtitle">ציון בין 6 ל -7.5</div>
                        </div>
                    </div>
                    <div className="legend-container ">
                        <div className="legend-color bright-yellow-bg"></div>
                        <div className="legend-text">
                            <div className="legend-title">צהוב - פעילות מוגבלת</div>
                            <div className="legend-subtitle">ציון בין 4.5 ל - 6</div>
                        </div>
                    </div>
                    <div className="legend-container ">
                        <div className="legend-color green-bg"></div>
                        <div className="legend-text">
                            <div className="legend-title">ירוק - פעילות רחבה</div>
                            <div className="legend-subtitle">ציון עד 4.5</div>
                        </div>
                    </div>
                    <div className="cities-container">
                        <div className="titles-container">
                            <div className="city-title">ישוב</div>
                            <div className="city-title"></div>
                            <div className="city-title">חולים חדשים לכל 10,000*</div>
                            <div className="city-title">% הבדיקות החיוביות *</div>
                            <div className="city-title">שיעור שינוי מאומתים *</div>
                            <div className="city-title">חולים פעילים</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}