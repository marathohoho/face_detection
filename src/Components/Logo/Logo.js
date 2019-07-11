import React from 'react';
import Tilt from 'react-tilt'
import brain from './brain.png';

const Logo = () => {
    return (
        <div className='ma4 mt4'>
            <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> 
                    <img src={brain} style={{paddingTop: '5px'}} alt='logo'/>
                </div>
            </Tilt>
        </div>
        )
        
}

export default Logo;
