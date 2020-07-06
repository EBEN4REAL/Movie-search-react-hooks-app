import React from "react";
import LoginRegisterModal from '../Components/utils/Login_Register_Modal.js';
import {useState, useRef, useEffect} from 'react';
import UseVisible from './utils/UseVisible';

const logoURl = "https://yts.mx/assets/images/website/logo-YTS.svg";



const Header = (props) => {
  const [modalOpen, showModal]  = useState(false);
  const { ref, isVisible, setIsVisible } = UseVisible(false);


  const openModal = () => {
    showModal(true);
  }
  const hideModal = () => {
    showModal(false);
  }

  return (
    <header className="nav">
       <div className="main_header">
        <div className="logo_wrapper">
          <img src={logoURl} />
        </div>  
        <div className="menu_items">
          <div className="search_wrapper">
            <div className="search_icon_wrapper">
            <i className="fa fa-search search_icon" aria-hidden="true"></i>
            </div>
            <div className="search_input">
                <input type="search" placeholder="Quick Search" onChange={props.inputChange } />
            </div>
          </div>
          <div className="menu_item">
            <h2 className="">Home</h2 >
          </div>
          <div className="menu_item">
            <h2 className="" style={{color: '#6AC045'}}>4K</h2>
          </div>
          <div className="menu_item">
            <h2 className="">Browse Movies</h2>
          </div>
          <div className="menu_item">
            <h2 className="" style={{color: 'white'}} onClick={e => setIsVisible(!isVisible)}><span className="account_link">Login</span> | <span className="account_link">Register</span></h2>
          </div>
        </div>
      </div>
      {
        isVisible  ? (
          <LoginRegisterModal  hideModal={hideModal}  />
        ) : null
      }
    </header>
   
  );
};

export default Header;





