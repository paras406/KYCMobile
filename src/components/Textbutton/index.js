import React from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';

import styles from './index.module.css';
import '../../assets/fonts/fonts.css'

const TextButton = (props) => {
    const { text, containerStyle = '', action, textStyle = '' } = props
    
    return (
        <Button type="link" className={styles.Button + ' ' + containerStyle} onClick={action}>
            <span className={styles.TextStyle + ' ' + textStyle}>
                {text}
            </span>
        </Button>
    );
}

export default TextButton;

