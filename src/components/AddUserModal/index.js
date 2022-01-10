import React, { useEffect, useState } from "react";
import lodash from 'lodash';
import Overlay from "../Overlay";
import { Button } from "antd";
import CloseIcon from "@material-ui/icons/Close";

import InputHeadingComponent from "../InputHeadingComponent";
import TextAreaHeadingComponent from "../TextAreaHeadingComponent";
import CustomMenu from '../CustomMenu';

import { GET_CATEGORIES } from '../../queries/categories';
import { useGetGraphQL } from '../../hooks/useGraphQl';

import { emptyStringVerification } from "../../utils";
import styles from "./index.module.css";

const Modal = (props) => {

    const {
        headingText = "Add User",
        onClose = () => { },
        visible = false,
        name = '',
        updateName = () => { },
        email = '',
        updateEmail = () => { },
        phone = '',
        updatePhone = () => { },
        description = '',
        updateDescription = () => { },
        buttonText = 'Add User',
        onSubmit = () => { },
        categoryId,
        updateCategoryId,
        updateSubCategoryId,
        subCategoryId,
    } = props;

    const [successState, updateSuccessState] = useState(false);
    const [errorState, updateErrorState] = useState(false);
    const [errorMessage, updateErrorMessage] = useState("");
    const [successMessage, updateSuccessMessage] = useState("");

    // get call
    let { getCall, state } = useGetGraphQL({
        query: GET_CATEGORIES,
    });

    const selectedCategory = state?.data?.categories ? state.data.categories.find((item) => {
      if(item.id === categoryId){
          return true;
      }
    }) : {};

    useEffect(() => {
      if(visible){
        getCall();
      }
    }, [visible]);

    useEffect(() => {
        const { error } = state;
        if (error) {
            const message = lodash.get(error, "networkError.result.errors[0].message", "Error Occured");
            updateErrorState(true);
            updateErrorMessage(message);
        }
    }, [state]);

    const loginButtonDisabled = () => {
        if (emptyStringVerification(name) && emptyStringVerification(email) && emptyStringVerification(phone) && emptyStringVerification(categoryId) && emptyStringVerification(subCategoryId)) {
            return false;
        }
        return true;
    };

    const selectCategoryFunc = (id) => {
        updateCategoryId(id);
        updateSubCategoryId('');
    }

    if (visible) {
        return (
            <Overlay style={styles.container}>
                <div className={styles.heading}>
                    <span className={styles.headingText}>{headingText}</span>
                    <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
                </div>
                <div className={styles.content}>
                    <InputHeadingComponent
                        text="Name"
                        style={styles.inputContainer}
                        inputStyle={styles.input}
                        value={name}
                        fieldVerification={emptyStringVerification}
                        onChange={(event) => {
                            updateName(event.target.value);
                        }}
                    />
                    <InputHeadingComponent
                        text="Email"
                        style={styles.inputContainer}
                        inputStyle={styles.input}
                        value={email}
                        fieldVerification={emptyStringVerification}
                        onChange={(event) => {
                            updateEmail(event.target.value);
                        }}
                    />
                    <InputHeadingComponent
                        text="Phone"
                        style={styles.inputContainer}
                        inputStyle={styles.input}
                        value={phone}
                        fieldVerification={emptyStringVerification}
                        onChange={(event) => {
                            updatePhone(event.target.value);
                        }}
                    />
                    <CustomMenu 
                     heading="Categories"
                     list={state?.data?.categories ? state?.data?.categories : []}
                     item={categoryId}
                     updateItem={selectCategoryFunc}
                    />
                    <CustomMenu 
                     heading="Sub Categories"
                     list={selectedCategory?.subCategories ? selectedCategory.subCategories : []}
                     item={subCategoryId}
                     updateItem={updateSubCategoryId}
                    />
                    <TextAreaHeadingComponent
                        rows={2}
                        text="Description"
                        value={description}
                        onChange={(event) => {
                            updateDescription(event.target.value);
                        }}
                    />
                    <div
                        style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}
                    >
                        <Button
                            className={styles.actionButton}
                            onClick={onSubmit}
                            disabled={loginButtonDisabled()}
                        >
                            {buttonText}
                        </Button>
                    </div>
                </div>
            </Overlay>
        );
    }
    return null;
};

export default Modal;
