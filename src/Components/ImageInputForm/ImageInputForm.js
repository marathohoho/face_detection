import React from 'react';
import './ImageInputForm.css'

const ImageInputForm = ({onInputChange, onSubmit, onKeySubmit, onReset}) => {
    return (
        <div>
            <p className="f3">
                {"Let's detect stuff"}
            </p>
            <div className="center">
                <div className=" center form br3 pa4 shadow-5">
                    <input className="f4 pa2 w-70 center" type="text" onChange = {onInputChange} onKeyUp={onKeySubmit} placeholder = "Pass the URL"/>
                    <button className="w-30 grow link ph3 pv2 dib white bg-light-purple pointer o-90 " onClick={onSubmit}>Detect</button>
                    <button className="w-30 grow link ph3 pv2 dib white bg-light-purple pointer o-90 " onClick={onReset}>Reset</button>

                </div>
            </div>
          
         </div>
    )
}

export default ImageInputForm;