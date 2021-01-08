import React from 'react'


export default ({text,isInfo}) => {
    return (
    <div className="lookup">
     {isInfo? <i class="fas fa-info-circle"></i>:<i class="far fa-lightbulb"></i>}
        <div className="lookup-text">{text||''}</div>
    </div>)
  }
