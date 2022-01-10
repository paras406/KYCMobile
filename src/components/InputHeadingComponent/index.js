import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';

import styles from './index.module.css';
import '../../assets/fonts/fonts.css'

const InputHeadingComponent = (props) => {
    const {
        text = '',
        isTextSuffix = false,
        TextSuffix = () => { },
        fieldVerification = () => { return true },
        style = '',
        inputStyle = '',
        isPrefix,
        Prefix = () => { },
        onChange = () => { },
        type = '',
        disabled,
        ...rest
    } = props;
    const [redBoundary, updateRedBoundary] = useState(false);

    const regexString = /^[0-9]{1}$/;

    const onchange = (event) => {
        const value = event.target.value;
        if (type === "number" && value.length > 0) {
            if (!regexString.test(value[value.length - 1])) {
                return;
            }
        }
        updateRedBoundary(!fieldVerification(value));
        onChange(event);
    }

    const onBlur = (event) => {
        updateRedBoundary(!fieldVerification(event.target.value));
    }

    return (
        <div className={styles.Container + ' ' + style}>
            <div className={styles.Heading}>
                <div>{text}</div>
                {
                    isTextSuffix && (
                        <TextSuffix />
                    )
                }
            </div>
            <div className={styles.inputContainer}>
                {isPrefix && <Prefix />}
                <Input
                    placeholder="Enter"
                    className={redBoundary ? styles.redBoundary + ' ' + inputStyle : styles.Input + ' ' + inputStyle}
                    onBlur={onBlur}
                    onChange={onchange} type={type} {...rest}
                    disabled={disabled}
                />
            </div>
        </div>
    );
}

export default InputHeadingComponent;

