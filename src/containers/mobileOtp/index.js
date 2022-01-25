import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import { ReactComponent as GroupImage } from '../../assets/icons/Group.svg';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorComponent from '../../components/ErrorComponent';

import { VERIFY_OTP } from '../../queries/otp';
import { useGetGraphQL } from '../../hooks/useGraphQl';
import AuthenticationService from '../../utils/AuthenticateService';

import styles from './index.module.css';

const MobileLogin = (props) => {

    const history = useHistory();

    const { location: { state } } = history;

    const [otp1, updateOTP1] = useState();
    const [otp2, updateOTP2] = useState();
    const [otp3, updateOTP3] = useState();
    const [otp4, updateOTP4] = useState();

    const {
        mobileNumber,
        id,
    } = state;

    const [errorState, updateErrorState] = useState(false);
    const [errorMessage, updateErrorMessage] = useState(false);

    const [verifyOTP, otpState] = useGetGraphQL({
        query: VERIFY_OTP
    });

    const {
        loading,
        error,
        data,
    } = otpState;

    const navigateToUserScreen = () => {
        history.push("/users");
    }

    useEffect(() => {
        if (error) {
            const message = lodash.get(error, "networkError.result.errors[0].message", "Error Occured");
            updateErrorState(true);
            updateErrorMessage(message);
            
        } else if (data) {
            AuthenticationService.storeUserInfo(data.verifyOtp);
            navigateToUserScreen();
        }
    }, [error, data]);

    const verifyOTPFunc = async () => {
        try {
            const variables = {
                otp: `${otp1}${otp2}${otp3}${otp4}`,
                id,
            };
            verifyOTP({
                variables
            });
        } catch (error) {
        }
    }

    const autoTab = (e) => {
        const BACKSPACE_KEY = 8;
        const DELETE_KEY = 46;
        let tabindex = e.target.getAttribute("name") || 0;
        let value = e.target.getAttribute("value");
        tabindex = Number(tabindex);
        if (e.keyCode === BACKSPACE_KEY) {
            tabindex -= 1;
        } else if (e.keyCode !== DELETE_KEY) {
            tabindex += 1;
        }
        const elem = document.getElementById("tabIndex" + tabindex);

        if (elem) {
            elem.focus();
        }
    };

    const mobileNumberHeading = () => {
        return (
            <div className={styles.mobileHeadingContainer}>
                <div className={styles.mobileHeading1}>Fill OTP</div>
                <div className={styles.mobileHeading2}>We have sent the code <span style={{ color: '#fff' }}>{mobileNumber}</span></div>
            </div>
        )
    }

    const renderOTPBox = (id, value, updateValue) => {
        return (
            <div className={styles.otpBox}>
                <TextField
                    InputProps={{
                        disableUnderline: true,
                        classes: {
                            input: styles.input,
                        },
                    }}
                    // inputProps={{ maxLength: 1 }}
                    value={value}
                    onChange={(e) => {
                        updateValue(e.target.value.slice(e.target.value.length - 1, e.target.value.length))
                    }}
                    onKeyUp={autoTab}
                    name={id}
                    id={`tabIndex${id}`}
                />
            </div>
        )
    }

    const otpContainer = () => {
        return (
            <div className={styles.otpContainer}>
                {renderOTPBox(1, otp1, updateOTP1)}
                {renderOTPBox(2, otp2, updateOTP2)}
                {renderOTPBox(3, otp3, updateOTP3)}
                {renderOTPBox(4, otp4, updateOTP4)}
            </div>
        )
    }

    const mobileNumberContainer = () => {
        return (
            <div className={styles.mobileNumberContainer}>
                <div className={styles.mobileNumberText}>Enter OTP</div>
                {otpContainer()}
                <Button
                    variant="contained"
                    classes={{
                        root: styles.buttonContainer,
                        label: styles.buttonText,
                    }}
                    onClick={verifyOTPFunc}
                >
                    Verify and Enjoy Journey
                </Button>
            </div>
        )
    }

    const renderError = () => {
        if (errorState) {
            return (
                <ErrorComponent
                    description={errorMessage}
                    open={errorState}
                    handleClose={() => { updateErrorState(false) }}
                />
            );
        }
        return null;
    }

    return (
        <div className={styles.container}>
            <Header />
            {mobileNumberHeading()}
            {mobileNumberContainer()}
            <GroupImage className={styles.groupImage} />
            {renderError()}
            {loading && <LoadingIndicator />}
        </div>
    );
};

export default MobileLogin;