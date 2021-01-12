import React,{useEffect, useState} from 'react'
import LookupTag from './LookupTag'
import moment from 'moment'
import { getCitiesData } from '../server/data'
const sortOptions = {
    
    name: 'name',
    grade: 'grade',
    newIlls: 'new ills',
    verifiedPercentage: 'verified percentage',
    changesVerified: 'changes verified',
    activeIlls:'active ills'
}
export default () => {
    const [cities, setCities] = useState([])
    const [displayCities, setDisplayCities] = useState([])
    const [sortObj,setSortObj]=useState({type:'',isDesc:true})
    useEffect(() => {
        getCitiesData().then((value) => {
            setCities(value)
            setDisplayCities(value)
        })
    }, [])

    
    useEffect(function filterHandler  () {
        switch (sortObj.type)
        {
            case sortOptions.name:
                if(sortObj.isDesc)
                    setDisplayCities([...displayCities.sort((a, b) => a.city.name.localeCompare(b.city.name))])
                else
                    setDisplayCities([...displayCities.sort((a, b) => b.city.name.localeCompare(a.city.name))])
            case sortOptions.grade:
                if(sortObj.isDesc)
                    setDisplayCities([...displayCities.sort((a, b) => a.grade-b.grade)])
                else
                    setDisplayCities([...displayCities.sort((a, b) => b.grade-a.grade)])
            case sortOptions.newIlls:
                if(sortObj.isDesc)
                    setDisplayCities([...displayCities.sort((a, b) => a.personsNewVerified-b.personsNewVerified)])
                else
                    setDisplayCities([...displayCities.sort((a, b) => b.personsNewVerified-a.personsNewVerified)])
            case sortOptions.verifiedPercentage:
                if(sortObj.isDesc)
                    setDisplayCities([...displayCities.sort((a, b) => a.positiveTestsPercentage-b.positiveTestsPercentage)])
                else
                    setDisplayCities([...displayCities.sort((a, b) => b.positiveTestsPercentage-a.positiveTestsPercentage)])
            case sortOptions.changesVerified:
                if(sortObj.isDesc)
                    setDisplayCities([...displayCities.sort((a, b) => a.changesBetweenWeeks-b.changesBetweenWeeks)])
                else
                    setDisplayCities([...displayCities.sort((a, b) => b.changesBetweenWeeks-a.changesBetweenWeeks)])
            case sortOptions.activeIlls:
                if(sortObj.isDesc)
                    setDisplayCities([...displayCities.sort((a, b) => a.illsCount-b.illsCount)])
                else
                    setDisplayCities([...displayCities.sort((a, b) => b.illsCount-a.illsCount)])
                

        }
   },[sortObj])
    const getCityRow = (cityName, cityGrade, cityIlls10000, cityConfirmedPercentage,
                        cityIllsChanges,cityIllsCount) => {
        return (
            <div className="line-container">
                <div className="data-container">
                    <span className="city-name">{cityName}</span>
                </div>
                <div className="data-container center">
                    <span className={`city-grade ${cityGrade>8?'red-bg':'green-bg'}`}>{cityGrade}</span>
                </div>
                <div className="data-container center">
                    <span className="city-new-ill">{cityIlls10000}</span>
                </div>
                <div className="data-container center">
                    <span className="city-confirmed">{cityConfirmedPercentage}%</span>
                </div>
                <div className="data-container center">
                    <span className="city-changes">{cityIllsChanges}%</span>
                </div>
                <div className="data-container center">
                <span className="city-ills-count">{cityIllsCount}</span>
            </div>
            </div>
        )
    }
    const handleSetSortObj = (sortOption) => {
        setSortObj({type: sortOption,isDesc: sortObj.type===sortOption?!sortObj.isDesc?true:false:true})
    }
    return (
        <div className="cities-by-color-container">
            <div className="top">
                <div className="title-wrapper">
                    <h3>תכנית הרמזור</h3>
                    <h4>*מרכיבי ציון הרמזור (לפי נתוני השבוע האחרון)</h4>
                </div>
                <div className="flex-row-wrapper none-width search-tag">
                <LookupTag isInfo={true} text={`הנתונים נכונים לתאריך ${moment().format('DD/MM/YYYY').toString()}`} />
                    <div className="search-wrapper">
                    <i class="fas fa-search"></i>
                    <input className="search-input" placeholder="חיפוש יישוב" type="text" onChange={(e) => setDisplayCities(cities.filter(city => city.city.name.includes(e.target.value)))}></input>
                </div>
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
                   
                </div>
                 <div className="cities-container">
                        <div className="titles-container">
                        <div className="city-title blue-bright-bg" onClick={()=>handleSetSortObj(sortOptions.name)}>ישוב</div>
                            <div className="city-title center blue-bright-bg" onClick={()=>handleSetSortObj(sortOptions.grade)}>ציון וצבע יומי</div>
                            <div className="city-title center blue-dark-bg" onClick={()=>handleSetSortObj(sortOptions.newIlls)}>חולים חדשים לכל 10,000*</div>
                            <div className="city-title center blue-dark-bg" onClick={()=>handleSetSortObj(sortOptions.verifiedPercentage)}>% הבדיקות החיוביות *</div>
                            <div className="city-title center blue-dark-bg" onClick={()=>handleSetSortObj(sortOptions.changesVerified)}>שיעור שינוי מאומתים *</div>
                            <div className="city-title center blue-bright-bg" onClick={()=>handleSetSortObj(sortOptions.activeIlls)}>חולים פעילים</div>
                        </div>
                    <ul className="cities-list">
                    {displayCities.map(({city,personsNewVerified,positiveTestsPercentage,changesBetweenWeeks,illsCount,grade})=>getCityRow(city.name,grade,personsNewVerified/10000,positiveTestsPercentage,changesBetweenWeeks,illsCount))}
                    </ul>
                    </div>
            </div>
        </div>
    )
}