import React from 'react';
import './header.css';
import HeaderLogo from '../../images/header-logo.svg';
import SearchIcon from '../../images/search.svg'
import NotificationIcon from '../../images/notification.svg'
import UserIcon from '../../images/user.svg'


export const Header = () => {
    return(
        <div className='header'>
            
            <div className="header-top">
               <div className='header-left'>
                  <img src={HeaderLogo} alt="header-logo" />
                  <div className='header-input'>
                    <img className="header-search" src={SearchIcon} alt="search icon"/>
                    <input type="text" placeholder="Search for any training you want" />
                  </div>
                </div>    
                <div className="header-right">
                    <img src={NotificationIcon} alt="icon" /> 
                    <img src={UserIcon} alt="icon" /> 
                </div>
            </div> 
        </div>
    )
}