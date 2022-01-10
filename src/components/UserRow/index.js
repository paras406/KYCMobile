import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import DropdownMenu from '../../components/DropdownMenu';
import AddUserModal from '../AddUserModal';
import DeleteModal from '../DeleteModal';

import styles from './index.module.css';

const UserRow = (props) => {

    const {
        user = {},
        containerStyle,
        index,
        onDeleteAction = () => {},
        onEditAction = () => {},
    } = props;

    const defaultCategoryID = user.categories && user.categories.length > 0 ? user.categories[0]?.id : '';
    const defaultSubCategoryID = user.subCategories && user.subCategories.length > 0 ? user.subCategories[0]?.id : '';

    const [dropDownPosition, updateDropDownPosition] = useState(null);
    const [editUserModalVisible, updateEditUserModalVisible] = useState(false);
    const [name, updateName] = useState(user.name);
    const [email, updateEmail] = useState(user.email);
    const [phone, updatePhone] = useState(user.phoneNumber);
    const [desc, updateDesc] = useState(user.desc);
    const [categoryId, updateCategoryId] = useState(defaultCategoryID);
    const [subCategoryId, updateSubCategoryId] = useState(defaultSubCategoryID);
    const [deleteModalVisible, updateDeleteModalVisible] = useState(false);

    const onEditClick = () => {
        updateEditUserModalVisible(true);
        closeDropDownAction();
    }

    const onDeleteClick = () => {
        updateDeleteModalVisible(true);
        closeDropDownAction();
    }

    const onDeleteConfirmAction = () => {
        onDeleteAction(user.id);
        updateDeleteModalVisible(false);
    }

    const closeDropDownAction = () => {
        updateDropDownPosition(null);
    }

    const dropDownAction = (event) => {
        updateDropDownPosition(event.currentTarget);
    }

    const onClose = () => {
        updateEditUserModalVisible(false);
        updateName(user.name);
        updateEmail(user.email);
        updatePhone(user.phoneNumber);
        updateDesc(user.desc);
        updateCategoryId(defaultCategoryID);
        updateSubCategoryId(defaultSubCategoryID);
    }

    const renderData = () => {
        return (
            <div className={styles.container + ' ' + containerStyle} key={index}>
                <div className={styles.name}>
                    <div className={styles.text}>{user.name}</div>
                    <div className={styles.gap} />
                </div>
                <div className={styles.email}>
                    <div className={styles.text}>{user.email}</div>
                    <div className={styles.gap} />
                </div>
                <div className={styles.phone}>
                    <div className={styles.text}>{user.phoneNumber}</div>
                    <div className={styles.gap} />
                </div>
                <div className={styles.category}>
                    <div className={styles.text}>{user.categories && user.categories.length > 0 ? user.categories[0]?.name : ''}</div>
                    <div className={styles.gap} />
                </div>
                <div className={styles.category}>
                    <div className={styles.text}>{user.subCategories && user.subCategories.length > 0 ? user.subCategories[0]?.name : ''}</div>
                    <div className={styles.gap} />
                </div>
                <div className={styles.desc}>
                    <div className={styles.text}>{user.desc}</div>
                    <div className={styles.gap} />
                </div>
                <div className={styles.horizon}>
                    <MoreHorizIcon onClick={dropDownAction} style={{ cursor: 'pointer' }} />
                </div>
                {
                    <DropdownMenu
                        itemList={[
                            {
                                text: 'Edit',
                                action: onEditClick,
                                type: 'secondary',
                            },
                            {
                                text: 'Archive',
                                action: onDeleteClick,
                                type: 'primary',
                            },
                        ]}
                        anchorEl={dropDownPosition}
                        onClose={closeDropDownAction}
                    />
                }
                <AddUserModal
                    visible={editUserModalVisible}
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
                        // onClose();
                        onEditAction({
                            name,
                            email,
                            phoneNumber: phone,
                            countryCode: '+91',
                            role: 'SUPER_USER',
                            categoryId,
                            subCategoryId,
                            id: user.id,
                        });
                    }}
                    headingText="Edit User"
                    buttonText="Edit User"
                />
                <DeleteModal
                    onClose={() => { updateDeleteModalVisible(false) }}
                    onSubmit={onDeleteConfirmAction}
                    visible={deleteModalVisible}
                />
            </div>
        );
    }

    return (
        <div>
            {renderData()}
        </div>
    )
}

export default UserRow;

