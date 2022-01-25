import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import { ReactComponent as GroupImage } from '../../assets/icons/Group.svg';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorComponent from '../../components/ErrorComponent';

import { SEND_OTP } from '../../queries/otp';
import { usePostGraphQL } from '../../hooks/useGraphQl';

import styles from './index.module.css';

const MobileLogin = () => {

    const history = useHistory();
    const [mobileNumber, updateMobileNumber] = useState('');

    const [errorState, updateErrorState] = useState(false);
    const [errorMessage, updateErrorMessage] = useState(false);

    const [sendOTP, otpState] = usePostGraphQL({
        query: SEND_OTP
    });

    const {
     loading,
     error,
     data,
    } = otpState;

    const navigateToOTPScreen = () => {
        history.push("/mobileOTP", {
            mobileNumber,
            id: data?.sendOtpForRegistration?.id,
        });
    }

    useEffect(() => {
        if (error) {
            const message = lodash.get(error, "networkError.result.errors[0].message", "Error Occured");
            updateErrorState(true);
            updateErrorMessage(message);
            
        } else if (data) {
            navigateToOTPScreen();
        }
    }, [error, data]);

    const sendOTPFunc = async () => {
        try {
            const variables = {
                phoneNumber: mobileNumber,
                countryCode: '+91',
            };
            sendOTP({
                variables
            });
        } catch (error) {
        }
    }

    const mobileNumberHeading = () => {
        return (
            <div className={styles.mobileHeadingContainer}>
                <div className={styles.mobileHeading1}>Continue with mobile number</div>
                <div className={styles.mobileHeading2}>You will receive a 4 digit code to verify next.</div>
            </div>
        )
    }

    const mobileNumberInput = () => {
        return (
            <div className={styles.mobileNumberInput}>
               <div className={styles.countryCodeBlock}>+91</div> 
               <div className={styles.countryCodeDivider}/> 
               <TextField 
                InputProps={{
                    disableUnderline: true,
                    classes: {
                        input: styles.input,
                    },
                }}
                classes={{
                    root: styles.textField
                }}
                type="number"
                value={mobileNumber}
                onChange={(event) => updateMobileNumber(event.target.value)}
               />
            </div>
        )
    }

    const mobileNumberContainer = () => {
        return (
            <div className={styles.mobileNumberContainer}>
               <div className={styles.mobileNumberText}>Enter Mobile Number*</div>
               {mobileNumberInput()}
               <Button 
                variant="contained"
                classes={{
                    root: styles.buttonContainer,
                    label: styles.buttonText,
                }}
                onClick={sendOTPFunc}
               >
                   Verify Number
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