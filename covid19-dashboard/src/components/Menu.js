import React,{useState} from 'react'


export default ({ isOpen,setIsOpen }) => {
    const [selectedLink, setSelectedLink] = useState(1);
    return (
        <div className={`menu-container ${isOpen?"open":"close"}`}>
            <div className="navigator-container">
                <a onClick={()=>{setIsOpen(false);setSelectedLink(1)}} className={`menu-link ${selectedLink===1?"selected":""}`}>
                    <span >
                        <svg  width="24px" height="25px" viewBox="0 0 24 25" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="עומסים" transform="translate(-1388.000000, -158.000000)" stroke="currentColor" stroke-width="2">
                        <path d="M1398,171.5 L1398,182 L1389,182 L1389,171.5 L1398,171.5 Z M1411,174 L1411,182 L1402.5,182 L1402.5,174 L1411,174 Z M1411,159 L1411,169.5 L1402.5,169.5 L1402.5,159 L1411,159 Z M1398,159 L1398,167 L1389,167 L1389,159 L1398,159 Z" id="Combined-Shape"></path>
                    </g>
                </g>
                        </svg>
                    </span>
                    מצב כללי
                </a>
                <a onClick={()=>{setIsOpen(false);setSelectedLink(2)}} className={`menu-link ${selectedLink===2?"selected":""}`}>אודות</a>
                <a onClick={()=>{setIsOpen(false);setSelectedLink(3)}} className={`menu-link ${selectedLink===3?"selected":""}`}>תנאי שימוש</a>
                <a onClick={() => { setIsOpen(false); setSelectedLink(4) }} className={`menu-link ${selectedLink === 4 ? "selected" : ""}`}>מדריך למשתמש</a>
                <div onClick={() => { setSelectedLink(5) }} className={`menu-link login-container   ${selectedLink === 5 ? "show-login" : ""}`}>
                 <div className="menu-link">מנהלן</div> 
                    <form className={` login ${selectedLink === 5 ? "show" : ""}`}>
                        <input type="text" name="username" placeholder="שם משתמש" className="login-input"></input>
                        <input type="text" name="password" placeholder="סיסמא" className="login-input"></input>
                        <input type="submit" className="rounded-button login-button" value="התחבר"></input>
                    </form>
                </div>

            </div>
    </div>)
}