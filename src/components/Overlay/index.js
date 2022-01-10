import React from 'react';
import styles from './index.module.css';

const Overlay = (props) => {

    const { children, style, innerStyle } = props;

    return  (
        <div className={styles.popup + ' ' + style}>
            <div className={styles.popup_inner + ' ' + innerStyle}>
                {children}
            </div>
        </div>
    )
}

export default Overlay;