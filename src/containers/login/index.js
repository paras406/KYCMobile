import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import lodash from 'lodash';
import { useLocation, useHistory } from 'react-router-dom';

import styles from './index.module.css';
import '../../assets/fonts/fonts.css'
import AuthenticationService from '../../utils/AuthenticateService';
import LoginForm from '../../components/LoginForm';
import ImageForm from '../../components/ImageForm';
import LoadingIndicator from '../../components/LoadingIndicator';
import { emailVerification, emptyStringVerification } from '../../utils';
import ErrorComponent from '../../components/ErrorComponent';

import { AUTHENTICATE } from '../../queries/login';
import { usePostGraphQL } from '../../hooks/useGraphQl';

const Login = () => {
    const location = useLocation();
    const history = useHistory();

    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');

    const [errorState, updateErrorState] = useState(false);
    const [errorMessage, updateErrorMessage] = useState(false);

    // post call for adding sub category
    const [authenticateReq, authenticateState] = usePostGraphQL({
        query: AUTHENTICATE
    });

    const {
     loading,
    } = authenticateState;

    useEffect(() => {
        const { error, data } = authenticateState;
        if (error) {
            const message = lodash.get(error, "networkError.result.errors[0].message", "Error Occured");
            updateErrorState(true);
            updateErrorMessage(message);
            
        } else if (data) {
            AuthenticationService.storeUserInfo(data);
            const { from } = location.state || { from: { pathname: "/adminHome" } };
            history.replace(from);
        }
    }, [authenticateState]);

    const authenticate = async () => {
        try {
            const variables = {
                email,
                password,
            };
            authenticateReq({
                variables
            });
        } catch (error) {
        }
    }

    const enableLoginButton = () => {
        return emailVerification(email) && emptyStringVerification(password) && !loading;
    }

    const renderData = () => {
        return (
            <div className={styles.login}>
                <Row style={{ height: '100%' }} gutter={16}>
                    <Col span={12}>
                        <LoginForm
                            signInAction={authenticate}
                            emailValue={email}
                            passwordValue={password}
                            emailOnChange={e => { updateEmail(e.target.value) }}
                            passwodOnChange={e => { updatePassword(e.target.value) }}
                            emailVerification={emailVerification}
                            passwordVerification={emptyStringVerification}
                            enableLoginButton={enableLoginButton()}
                        />
                    </Col>
                    <Col span={12}>
                        <ImageForm
                            text1="Nec ei solet dicam"
                            text2="Growinn allows you to lorem ipsum dolor sit amet, ludus virtute id sea, ut nam atqui nobis animal. Sea te altera consequuntur."
                        />
                    </Col>
                </Row>
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
        <div>
            <div className={styles.container}>
                {loading && <LoadingIndicator />}
                {renderData()}
            </div>
            {renderError()}
        </div>
    );
}

export default Login;

