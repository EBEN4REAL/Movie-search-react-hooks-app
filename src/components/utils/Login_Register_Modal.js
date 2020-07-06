import React from 'react';
import {useEffect, useState, useRef} from 'react';

const Modal = ({ modalOpen, hideModal, tab}) => {
    const modal_main_ref = useRef();
    const emailRef = useRef();
    const usernameRef = useRef();
    const passRef = useRef();
    const [activeTab, activateTab] = useState('login'); 

    useEffect(() => {
        activateTab(tab);
        document.addEventListener("mousedown", handleClick); // add when mounted
        return () => {
          document.removeEventListener("mousedown", handleClick); // return function to be called when unmounted
        };
      }, []);

    const validateEmail = email =>  {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          return true;
        }
        return false;
    }
    const validatePasword = password => {
        if (password.length > 6) {
          return true;
        }
        return false;
    }
    const validateInput = e => {
        let _errNode = e.target.parentNode.children[1];
        if(e.target.name === 'email') {
            if(!validateEmail(e.target.value)) {
                emailRef.current.style.border = '1px solid red';
                _errNode.innerHTML = 'Invalid Email format';
            }else {
                emailRef.current.style.border = '1px solid #d2d8d8';
                _errNode.innerHTML = '';
            }
        }
        if(e.target.name === 'username') {
            if(e.target.value === "") {
                usernameRef.current.style.border = '1px solid red';
                _errNode.innerHTML = 'This Field iws required';
            }else {
                usernameRef.current.style.border = '1px solid #d2d8d8';
                _errNode.innerHTML = '';
            }
        }
        if(e.target.name === 'password') {
            if(e.target.value === "") {
                passRef.current.style.border = '1px solid red';
                _errNode.innerHTML = 'Fill in this field';
            }else if(!validatePasword(e.target.value)) {
                passRef.current.style.border = '1px solid red';
                _errNode.innerHTML = 'Password must be more than six(6) characters';
            }else {
                passRef.current.style.border = '1px solid #d2d8d8';
                _errNode.innerHTML = '';
            }
        }
    }
    const handleClick = e => {
        if (modal_main_ref.current.contains(e.target)) {
            return;
        }
        hideModal();
    };

    const makeActive = (e, type) => {
        activateTab(type);
    }
   
    return (
        <div className={`modal_wrapper ${modalOpen ? ' display-block' : 'display-none'}}`}>
            <div className="modal_main" ref={modal_main_ref}>
                <div className="tab__menu">
                    <div className={`tab_item ${activeTab === 'login' ? 'acitve_tab_item' : null}`} onClick={(e) => makeActive(e, 'login')}>
                        <h4 className={`header_title ${activeTab === 'login' ? 'active_tab_header' : null}`} >Login</h4>
                    </div>
                    <div className={`tab_item ${activeTab === 'register' ? 'acitve_tab_item' : null}`} onClick={(e) => makeActive(e, 'register')}>
                        <h4 className={`header_title ${activeTab === 'register' ? 'active_tab_header' : null}`} >Register</h4>
                    </div>
                </div>
                <form className="form_wrapper mt-5">
                    {
                        activeTab === 'login' ? (
                           <div>
                                <div className="input_wrapper">
                                    <div className="input_icon_placeholder">
                                        <i className="fa fa-user" name="username" aria-hidden="true" style={{color: '#eaeaea', fontSize: '20px'}}></i>
                                    </div>
                                    <div className="input_div">
                                        <input type="email" placeholder="Username or Email" name="email" className="input__container"  />
                                        <div className="error_flag" ></div>
                                    </div>
                                </div>
                                <div className="input_wrapper mt-4">
                                    <div className="input_icon_placeholder">
                                        <i className="fa fa-lock" aria-hidden="true" style={{color: '#eaeaea', fontSize: '20px'}}></i>
                                    </div>
                                    <div className="input_div">
                                        <input type="password" placeholder="Password" className="input__container"  />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button className="button success max-width" style={{padding: '10px'}}>
                                        Login
                                    </button>
                                </div>
                           </div>
                        ) : 
                        (
                            <div>
                                <div className="input_wrapper" ref={usernameRef}>
                                    <div className="input_icon_placeholder">
                                        <i className="fa fa-user" aria-hidden="true" style={{color: '#eaeaea', fontSize: '20px'}}></i>
                                    </div>
                                    <div className="input_div">
                                        <input type="text" placeholder="Username" name="username" className="input__container" onBlur={(e) => validateInput(e)} />
                                        <div className="error_div"></div>
                                    </div>
                                    
                                </div>
                                <div className="input_wrapper mt-4" ref={emailRef} >
                                    <div className="input_icon_placeholder">
                                        <i className="fa fa-envelope" aria-hidden="true" style={{color: '#eaeaea', fontSize: '20px'}}></i>
                                    </div>
                                    <div className="input_div" >
                                        <input type="email" placeholder="Email" name="email" className="input__container" onBlur={(e) => validateInput(e)}   />
                                        <div className="error_div"></div>
                                    </div>
                                    
                                </div>
                                <div className="input_wrapper mt-4" ref={passRef}>
                                    <div className="input_icon_placeholder">
                                        <i className="fa fa-lock" aria-hidden="true" style={{color: '#eaeaea', fontSize: '20px'}}></i>
                                    </div>
                                    <div className="input_div">
                                        <input type="password" name="password" placeholder="Password" className="input__container" onBlur={(e) => validateInput(e)} />
                                        <div className="error_div"></div>
                                    </div>
                                </div>
                                <div className="input_wrapper mt-4">
                                    <div className="input_icon_placeholder">
                                        <i className="fa fa-lock" aria-hidden="true" style={{color: '#eaeaea', fontSize: '20px'}}></i>
                                    </div>
                                    <div className="input_div">
                                        <input type="password" placeholder="Confirm Password" className="input__container"  />
                                    </div>
                                </div>
                                <div className="text-center mt-3">
                                    <p className="terms_text">
                                        By clicking Register, you agree to our  
                                        <span style={{color: '#428bca'}}> Terms and Conditions </span>
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <button className="button success max-width" style={{padding: '10px'}}>
                                        Register
                                    </button>
                                </div>
                        </div>
                        )
                    }
                </form>
                
            </div>
        </div>
    )
}


export default Modal;