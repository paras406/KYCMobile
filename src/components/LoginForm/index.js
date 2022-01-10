import React from 'react';
import 'antd/dist/antd.css';
import { Button, Row, Col, Input } from 'antd';
import { useHistory } from 'react-router-dom';

import InputHeadingComponent from '../InputHeadingComponent';
import TextButton from '../Textbutton';
import styles from './index.module.css';
import '../../assets/fonts/fonts.css'

const LoginForm = (props) => {

    const { 
        signInAction,
        emailValue = '',
        passwordValue = '',
        emailOnChange = () => {},
        passwodOnChange = () => {},
        emailVerification = () => {},
        passwordVerification = () => {},
        enableLoginButton = false,
     } = props;
    const history = useHistory();

    return (
        <div className={styles.FormContainer}>
            <div className={styles.GrowText}>GROW</div>
            <div className={styles.SignInText}>
                Sign in to your account
            </div>
            <InputHeadingComponent
              text="Email or Phone"
              value={emailValue}
              onChange={emailOnChange}
              fieldVerification={emailVerification}
            />
            <InputHeadingComponent
              text="Password"
              type="password"
              value={passwordValue}
              onChange={passwodOnChange}
              fieldVerification={passwordVerification}
            />
            <TextButton
              text=" Forgot your Password?"
              action={() => {history.replace('/signUp')}}
              containerStyle={styles.ForgotPasswordButton}
            />
            <Button type="primary" className={styles.SignInButton} onClick={signInAction} disabled={!enableLoginButton}>
                <span className={styles.SignInButtonText}>
                    Sign in
                </span>
            </Button>
        </div>
    );
}

export default LoginForm;

