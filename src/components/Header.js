import React from "react";


// Header component for the web site.
const Header = () => {
    return (
        <div className='d-flex flex-row justify-content-center align-items-center pt-4'>
            <h1 id='siteTitle' className='mt-1'>
                Open Brewery
            </h1>
            <img  src='logo.png' style={{Height: '40px', width: '40px'}} alt=''/>
        </div>
    );
};

export default Header;
