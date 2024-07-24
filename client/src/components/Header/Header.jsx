import React from 'react';
import AcadLogo from '../../assets/Academian-Card.png'
 
function Header() {
  return (
    <header style={headerStyle}>
      <div className="black-bar" style={blackBarStyle}>
        <div className='Logo'><img src={AcadLogo} alt="Academian logo" style={Logo}/></div>
      </div>
    </header>
  );
}
 
// Styles (you can also use a separate CSS file for styles)
const headerStyle = {
  backgroundColor: '#f2f2f2',
  width: '100%'
};
 
const blackBarStyle = {
  backgroundColor: '#000',
  height: '60px', // Increased height of the black bar
  width: '100%', // Ensures it spans horizontally
};
 
const Logo = {
  height : '60px',
  marginLeft: '33px',
};
 
export default Header;