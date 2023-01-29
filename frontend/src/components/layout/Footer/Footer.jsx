import React from 'react';
import playStore from '../../../images/playStore.png';
import appStore from '../../../images/appStore.png';
import logo from "../../../images/cd.png";

import './Footer.css'


const Footer = () => {
  return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>Download our App</h4>
                <p>Download our App for Android and IOS mobile </p>
                <img className='ps' src={playStore} alt="playStore"  />
                <img className='as' src={appStore} alt="appStore"  />
            </div>
            <div className="midFooter">
            <img className='logo' src={logo} alt="appStore"  />
                <p>High quality is our first priority</p>
                <p>Copyrights 2022 &copy; @ectech </p>
            </div>
            <div className="rightFooter">
                <h4>Follow US on</h4>
                <a href="https://www.instagram.com/sceptervin/">Instagram</a>
                <a href="https://www.instagram.com/sceptervin/">Youtube</a>
                <a href="https://www.instagram.com/sceptervin/">Facebook</a>
                
                
            </div>
        </footer>        
  )
}

export default Footer