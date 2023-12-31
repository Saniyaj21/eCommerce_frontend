import React from 'react';
import './footer.scss';
import playStore from '../../../media/playstore.png'
import appStore from '../../../media/Appstore.png'

const Footer = () => {
  return (
    <footer id="footer">
    <div className="leftFooter">
      <h4>DOWNLOAD OUR APP</h4>
      {/* <p>Download App for Android and IOS mobile phone</p> */}
      <img src={playStore} alt="playstore" />
      <img src={appStore} alt="Appstore" />
    </div>

    <div className="midFooter">
      <h1>ECOMMERCE.</h1>
      <p>High Quality is our first priority</p>

      <p>Copyrights 2021 &copy; Saniyaj Mallik</p>
    </div>

    <div className="rightFooter">
      <h4>Follow Us</h4>
      <a href="https://www.instagram.com/saniyajmallik/">Instagram</a>
      <a href="https://www.linkedin.com/in/saniyaj-mallik-27809923a/">Linkedin</a>
      <a href="https://www.facebook.com/saniyaj.mallik.7">Facebook</a>
    </div>
  </footer>
  )
}

export default Footer