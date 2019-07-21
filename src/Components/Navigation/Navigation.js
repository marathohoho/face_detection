import React from 'react';
import brain from '../Logo/brain.png';
import Tilt from 'react-tilt'

const Navigation = ( {onRouteChange, isSignedIn} ) => {
        if(isSignedIn){
            return (
                <nav style={{display: 'flex', justifyContent: 'space-between', height: '130px'}}>
                    <div className='ma4 mt4'>   
                    <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 200, width: 200 }} >
                        <div className="Tilt-inner pa2 tc"> 
                            <img src={brain} style={{paddingTop: '5px'}} alt='logo' className="br-100 pa1 ba b--black-10 h3 w3"/>
                        </div>
                    </Tilt>
                    </div>
                    <p onClick= {() => onRouteChange('signout')} className="f3 dim link white pa4 underline pointer">Sign out</p>
                </nav>
            );
        } else {
            return (
                <nav style={{ height: '130px'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', flexWrap: 'nowrap', flexDirection: 'row'}}>
                        <p onClick= {() => onRouteChange('signin')} className="f3 dim link white pa4 underline pointer">Sign in</p>
                        <p onClick= {() => onRouteChange('register')} className="f3 dim link white pa4 underline pointer">Register</p>
                    </div>    
                </nav>   
            );
        }
}
export default Navigation;
