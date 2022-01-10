import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';

import styles from './index.module.css';
import '../../assets/fonts/fonts.css'

const { TextArea } = Input;

const TextAreaHeadingComponent = (props) => {
    const { 
        text,
        style,
        inputStyle,
        rows=4,
        fieldVerification = () => { return true },
        onChange = () => {},
        ...rest
    } = props;

    const [redBoundary, updateRedBoundary] = useState(false);

    const onchange = (event) => {
        const value = event.target.value;
        updateRedBoundary(!fieldVerification(value));
        onChange(event);
    }

    const onBlur = (event) => {
        updateRedBoundary(!fieldVerification(event.target.value));
    }
    
    return (
        <div className={styles.Container + ' ' + style}>
            <div className={styles.Heading}>
                {text}
            </div>
            <TextArea 
              placeholder="Enter"
              rows={rows} 
              className={redBoundary ? styles.redBoundary  + ' ' + styles.Input + ' ' + inputStyle : styles.Input + ' ' + inputStyle}
              onChange={onchange} 
              onBlur={onBlur} 
              {...rest}
            />
        </div>
    );
}

export default TextAreaHeadingComponent;

