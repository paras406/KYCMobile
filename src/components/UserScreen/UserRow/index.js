import React, { useState, useEffect } from 'react';

import styles from './index.module.css';

const UserRow = (props) => {

    const {
        user = {},
    } = props;

    const renderData = () => {
        return (
            <div className={styles.container}>
                <div className={styles.name}>{user.name}</div>
                <div className={styles.mobile}>{user.phoneNumber}</div>
                <div className={styles.category}>{user.categories && user.categories.length > 0 ? user.categories[0]?.name : ''}</div>
                <div className={styles.subCategory}>{user.subCategories && user.subCategories.length > 0 ? user.subCategories[0]?.name : ''}</div>
            </div>
        )
    }

    return (
        <div style={{ display: 'flex' }}>
            {renderData()}
        </div>
    )
}

export default UserRow;

