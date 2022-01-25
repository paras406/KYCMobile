import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

import styles from './index.module.css';

const InputHeadingComponent = (props) => {

    const {
      text,
    } = props;

    
    return (
        <div className={styles.container}>
            <div className={styles.heading}>{text}</div>
            <div className={styles.inputContainer}>
               <TextField 
                InputProps={{
                    disableUnderline: true,
                    classes: {
                        input: styles.input,
                    },
                }}
                classes={{
                    root: styles.textField,
                }}
               />
            </div>
        </div>
    )
}

export default InputHeadingComponent;

