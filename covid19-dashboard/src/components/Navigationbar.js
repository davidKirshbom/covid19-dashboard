import React,{useContext} from 'react'
import themeContext from '../context/ThemeContext'
import logo from '../images/logo_dashboard.png'
export default ({onClickBurgerButton,isMenuOpen}) => {
    const { isThemeWhite, setIsThemeWhite } = useContext(themeContext)
    
    return (<div className="navigation-container">
        
        <div className="right-side-container">
            <div className={`burger-button ${isMenuOpen?'open':''}`} onClick={onClickBurgerButton}>
            <div id="burger-line-1" className="burger-btn-line"></div>
            <div id="burger-line-2" className="burger-btn-line"></div>
            <div id="burger-line-3" className="burger-btn-line"></div>
            </div>
            <img className="logo" src={logo}></img>
        </div>
        <div className="left-side-container">
        
        <div className="title-container">
            <span className="title">נגיף הקורונה בישראל - תמונת מצב כללית</span>
            <span className="subtitle">עדכון אחרון: 31 בדצמבר 2020 | 10:25</span>
        </div>
        <button className="rounded-button theme-button" onClick={()=>setIsThemeWhite(!isThemeWhite)}>לתצוגה נגישה</button>
        </div>
        </div>)
}