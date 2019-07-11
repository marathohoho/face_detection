import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({urlPassed, box}) => {
    return(
        <div className = 'center ma'>
            <div className = 'absolute mt2'>
                <img id = 'inputImage' style = {{height: '500px', width: 'auto'}} alt = '' 
                src = {urlPassed}/> 
                <div className = "draw-box" style = {{top: box.topRow, bottom: box.bottomRow, 
                                                right: box.rightCol, left: box.leftCol}}>               
                </div>    
            </div>
        </div>
        )
}

export default FaceRecognition;

