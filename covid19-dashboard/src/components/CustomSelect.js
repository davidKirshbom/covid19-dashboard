import React,{useState,useEffect} from 'react'

export default ({optionsArray,id,onChange}) => {
    
    const [selectedOption,setSelectedOption]=useState(optionsArray.find(option => option.isDefault))
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        onChange(selectedOption.value)
    },[selectedOption])

    return (
        <div className="custom-select-wrapper"
            onClick={() => setIsOpen(!isOpen)}>
            <div className="current-value">
                <i class={`fas fa-chevron-down ${isOpen?'rotateUp':''}`}></i>
                {selectedOption.text||'none'}
                </div>
        <div className="custom-select"
           
            name={`${id}-time`}
            id={id}>
            
            <div className={`options-container ${isOpen?'open':''}`}>
            {optionsArray.map((option) =>
                <div
                    className={`custom-option ${option.text===selectedOption.text?'selected':''}`}
                    onClick={()=>setSelectedOption(option)}>{option.text}</div>)}
            </div>
   
        </div>
    </div>)
}