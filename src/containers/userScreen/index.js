import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import lodash from 'lodash';

import UserRow from '../../components/UserScreen/UserRow';
import Header from '../../components/Header';
import AddUserModal from '../../components/UserScreen/AddUserModal';

import { ADD_USER, GET_USERS } from '../../queries/user';
import { usePostGraphQL, useGetGraphQL } from '../../hooks/useGraphQl';
import AuthenticationService from '../../utils/AuthenticateService';
import OverlayLoading from "../../components/OverlayLoading";
import ErrorComponent from '../../components/ErrorComponent';
import SuccessComponent from "../../components/SuccessComponent";

import styles from './index.module.css';

const MobileLogin = () => {

    const [addUserModalVisible, setAddModalVisible] = useState(false);
    const [name, updateName] = useState('');
    const [phone, updatePhone] = useState('');
    const [categoryId, updateCategoryId] = useState('');
    const [subCategoryId, updateSubCategoryId] = useState('');

    const [errorState, updateErrorState] = useState(false);
    const [errorMessage, updateErrorMessage] = useState("");
    const [successState, updateSuccessState] = useState(false);
    const [successMessage, updateSuccessMessage] = useState("");

    const [
        getCall,
        getUsersState,
    ] = useGetGraphQL({
        query: GET_USERS,
    });
    const {
        loading: getUserLoading,
        data: getUserData,
        error: getUserError,
    } = getUsersState;

    const [addUser, addUserState] = usePostGraphQL({
        query: ADD_USER,
    });
    const {
        loading: addUserLoading,
        data: addUserData,
        error: addUserError,
    } = addUserState;

    const getUserDataFn = () => {
        getCall({
            variables: {
                microSeller: AuthenticationService.getId(),
            }
        });
    }

    useEffect(() => {
        getUserDataFn();
    }, []);

    useEffect(() => {
        if (getUserError) {
            const message = lodash.get(getUserError, "networkError.result.errors[0].message", "Error Occured");
            updateErrorState(true);
            updateErrorMessage(message);
        }
    }, [getUserError]);

    const addUserFn = () => {
        addUser({
            variables: {
                name,
                phoneNumber: phone,
                countryCode: '+91',
                role: 'SUPER_USER',
                categoryId,
                subCategoryId,
                microSeller: AuthenticationService.getId(),
            }
        });
    }

    useEffect(() => {
        if (addUserError) {
            const message = lodash.get(addUserError, "networkError.result.errors[0].message", "Error Occured");
            updateErrorState(true);
            updateErrorMessage(message);
            addUserState.reset();
        } else if (addUserData) {
            updateSuccessState(true);
            updateSuccessMessage("User Added Successfully");
            getUserDataFn();
            addUserState.reset();
        }
    }, [addUserError, addUserData]);

    const onClose = () => {
        setAddModalVisible(false);
        updateName('');
        updatePhone('');
        updateCategoryId('');
        updateSubCategoryId('');
    }

    const userScreenHeader = () => {
        return (
            <div className={styles.userScreenHeader}>
                <div>
                    <div className={styles.addedUserText}>Added User</div>
                    <div className={styles.addNewUserText}>To add new user please click on the add new user</div>
                </div>
                <Button
                    variant="contained"
                    classes={{
                        root: styles.addUserButtonContainer,
                        label: styles.addUserButtonText,
                    }}
                    onClick={() => { setAddModalVisible(true) }}
                >
                    Add New User
                </Button>
            </div>
        );
    }


    const userListHeader = () => {
        return (
            <div style={{ display: 'flex' }}>
            <div className={styles.userListHeader}>
                <div className={styles.name}>Name</div>
                <div className={styles.mobile}>Mobile</div>
                <div className={styles.category}>Category</div>
                <div className={styles.subCategory}>Sub-Category</div>
            </div>
            </div>
        );
    }

    const renderLoading = () => {
        if (addUserLoading || getUserLoading) {
            return <OverlayLoading />
        }
        return null;
    };

    const renderError = () => {
        return (
            <ErrorComponent
                open={errorState}
                description={errorMessage}
                handleClose={() => {
                    updateErrorState(false);
                    updateErrorMessage("");
                }}
            />
        );
    };

    const renderSuccess = () => {
        return (
            <SuccessComponent
                open={successState}
                description={successMessage}
                handleClose={() => {
                    updateSuccessState(false);
                    updateSuccessMessage("");
                }}
            />
        );
    };

    const userDataList = () => {
        if(getUserData?.usersConnection?.edges){
            const edges = getUserData?.usersConnection?.edges;
            return edges.map((item, index) => {
                return <UserRow user={item.node} index={index} />
            })
        }
        return null;
    }

    const renderData = () => {
        return (
            <div className={styles.container}>
                <Header />
                <div className={styles.headerLine} />
                <div className={styles.body}>
                    {userScreenHeader()}
                    <div className={styles.horizontalScroll}>
                        {userListHeader()}
                        {userDataList()}
                    </div>
                </div>
                <AddUserModal
                    visible={addUserModalVisible}
                    onClose={onClose}
                    name={name}
                    updateName={updateName}
                    phone={phone}
                    updatePhone={updatePhone}
                    categoryId={categoryId}
                    updateCategoryId={updateCategoryId}
                    subCategoryId={subCategoryId}
                    updateSubCategoryId={updateSubCategoryId}
                    onSubmit={() => {
                        onClose();
                        addUserFn();
                    }}
                />
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flex: 1 }}>
            {renderData()}
            {renderLoading()}
            {renderError()}
            {renderSuccess()}
        </div>
    )
};

export default MobileLogin;