import React,{useContext} from 'react'
import themeContext from '../context/ThemeContext'


export default ({ text, isInfo }) => {
  const { isThemeWhite } = useContext(themeContext)

    return (
    <div className={`lookup ${isThemeWhite?'':'black-theme'}`}>
     {isInfo? <i class="fas fa-info-circle"></i>:<i class="far fa-lightbulb"></i>}
        <div className="lookup-text">{text||''}</div>
    </div>)
  }
