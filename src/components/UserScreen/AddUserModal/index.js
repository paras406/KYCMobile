import React, { useEffect, useState } from "react";
import lodash from 'lodash';
import Overlay from "../../Overlay";
import { Button } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";

import InputHeadingComponent from "../../InputHeadingComponent";
import CustomMenu from '../../CustomMenu';
import { useGetGraphQL } from '../../../hooks/useGraphQl';
import { emptyStringVerification } from "../../../utils";

import { GET_CATEGORIES } from '../../../queries/categories';

import styles from "./index.module.css";

const Modal = (props) => {

    const {
        headingText = "Add New User",
        onClose = () => { },
        visible = false,
        name = '',
        updateName = () => { },
        phone = '',
        updatePhone = () => { },
        buttonText = 'Send for the KYC',
        onSubmit = () => { },
        categoryId,
        updateCategoryId,
        updateSubCategoryId,
        subCategoryId,
    } = props;

    // get call
    let [getCall, state] = useGetGraphQL({
        query: GET_CATEGORIES,
    });

    const selectedCategory = state?.data?.categories ? state.data.categories.find((item) => {
        if (item.id === categoryId) {
            return true;
        }
    }) : {};

    useEffect(() => {
        if (visible) {
            getCall();
        }
    }, [visible]);

    const selectCategoryFunc = (id) => {
        updateCategoryId(id);
        updateSubCategoryId('');
    }

    if (visible) {
        return (
            <Overlay innerStyle={styles.overlayStyle}>
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
                        text="Mobile"
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
                    <Button
                        variant="contained"
                        classes={{
                            root: styles.buttonContainer,
                            label: styles.buttonText,
                        }}
                        onClick={onSubmit}
                    >
                        {buttonText}
                    </Button>
                </div>
            </Overlay>
        );
    }
    return null;
};

export default Modal;
