import React, { useEffect, useState } from "react";
import { Button } from "antd";
import lodash from 'lodash';

import AddUserModal from '../../components/AddUserModal';
import "../../assets/fonts/fonts.css";
import styles from "./index.module.css";
import UserRow from "../../components/UserRow";
import { ADD_USER, GET_USERS, DELETE_USER, EDIT_USER } from '../../queries/user';
import { usePostGraphQL, useGetGraphQL } from '../../hooks/useGraphQl';
import AuthenticationService from '../../utils/AuthenticateService';
import OverlayLoading from "../../components/OverlayLoading";
import ErrorComponent from '../../components/ErrorComponent';
import SuccessComponent from "../../components/SuccessComponent";

const User = (props) => {

    const [addUserModalVisible, updateAddUserModalVisible] = useState(false);
    const [name, updateName] = useState('');
    const [email, updateEmail] = useState('');
    const [phone, updatePhone] = useState('');
    const [desc, updateDesc] = useState('');
    const [categoryId, updateCategoryId] = useState('');
    const [subCategoryId, updateSubCategoryId] = useState('');

    const [errorState, updateErrorState] = useState(false);
    const [errorMessage, updateErrorMessage] = useState("");
    const [successState, updateSuccessState] = useState(false);
    const [successMessage, updateSuccessMessage] = useState("");

    const [addUser, addUserState] = usePostGraphQL({
        query: ADD_USER,
    });

    const [deleteUser, deleteUserState] = usePostGraphQL({
        query: DELETE_USER,
    });

    const [editUser, editUserState] = usePostGraphQL({
        query: EDIT_USER,
    });

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

    const {
        loading: addUserLoading,
        data: addUserData,
        error: addUserError,
    } = addUserState;

    const {
        loading: deleteUserLoading,
        error: deleteUserError,
        data: deleteUserData,
    } = deleteUserState;

    const {
        loading: editUserLoading,
        error: editUserError,
        data: editUserData,
    } = editUserState;

    const onDeleteAction = (id) => {
        deleteUser({
            variables: {
                id,
            }   
        })
    }

    const onEditAction = (variables) => {
        editUser({
           variables
        });
    }

    const onClose = () => {
        updateAddUserModalVisible(false);
        updateName('');
        updateEmail('');
        updatePhone('');
        updateDesc('');
        updateCategoryId('');
        updateSubCategoryId('');
    }

    const getUserDataFn = () => {
        getCall({
            variables:{
              microSeller: AuthenticationService.getId(),
            } 
        });
    }

    useEffect(() => {
        getUserDataFn(); 
    }, []);

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

    useEffect(() => {
        if (getUserError) {
            const message = lodash.get(getUserError, "networkError.result.errors[0].message", "Error Occured");
            updateErrorState(true);
            updateErrorMessage(message);
        }
    }, [getUserError]);

    useEffect(() => {
        if (deleteUserError) {
            const message = lodash.get(deleteUserError, "networkError.result.errors[0].message", "Error Occured");
            updateErrorState(true);
            updateErrorMessage(message);
            deleteUserState.reset();
        } else if (deleteUserData) {
            updateSuccessState(true);
            updateSuccessMessage("User Deleted Successfully");
            getUserDataFn(); 
            deleteUserState.reset();
        }
    }, [deleteUserError, deleteUserData]);

    useEffect(() => {
        if (editUserError) {
            const message = lodash.get(editUserError, "networkError.result.errors[0].message", "Error Occured");
            updateErrorState(true);
            updateErrorMessage(message);
            editUserState.reset();
        } else if (editUserData) {
            updateSuccessState(true);
            updateSuccessMessage("User Edited Successfully");
            getUserDataFn(); 
            editUserState.reset();
        }
    }, [editUserError, editUserData]);

    const addUserFn = () => {
        addUser({
            variables: {
                name,
                email,
                phoneNumber: phone,
                countryCode: '+91',
                role: 'SUPER_USER',
                categoryId,
                subCategoryId,
                microSeller: AuthenticationService.getId(),
            }
        });
    }

    const userDataList = () => {
        if(getUserData?.usersConnection?.edges){
            const edges = getUserData?.usersConnection?.edges;
            return edges.map((item, index) => {
                return <UserRow user={item.node} index={index} onDeleteAction={onDeleteAction} onEditAction={onEditAction} />
            })
        }
        return null;
    }

    const renderData = () => {
        return (
            <div>
                <div className={styles.AddCategoryContainer}>
                    <div className={styles.ProfessionalCategoryText}>
                        Users
                    </div>
                    <Button
                        className={styles.AddSubCategory}
                        onClick={() => { updateAddUserModalVisible(true) }}
                        type="primary"
                    >
                        Add User
                    </Button>
                </div>
                <div className={styles.teacherTable}>
                    <div className={styles.teacherTableHeader}>
                        <div className={styles.name}>
                            Name
                        </div>
                        <div className={styles.email}>
                            Email
                        </div>
                        <div className={styles.phone}>
                            Phone
                        </div>
                        <div className={styles.category}>
                            Category
                        </div>
                        <div className={styles.category}>
                            SubCategory
                        </div>
                    </div>
                    {userDataList()}
                </div>
                <AddUserModal
                    visible={addUserModalVisible}
                    onClose={onClose}
                    name={name}
                    updateName={updateName}
                    email={email}
                    updateEmail={updateEmail}
                    phone={phone}
                    updatePhone={updatePhone}
                    description={desc}
                    updateDescription={updateDesc}
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
    };

    const renderLoading = () => {
        if (addUserLoading || getUserLoading || deleteUserLoading || editUserLoading) {
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

    return (
        <div>
            {renderData()}
            {renderLoading()}
            {renderError()}
            {renderSuccess()}
        </div>
    );
};

export default User;
