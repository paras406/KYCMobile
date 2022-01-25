import React from 'react';
import { ReactComponent as GrowIcon } from '../../assets/icons/Grow.svg';
import styles from './index.module.css';

const Header = () => {
  
    return (
        <div className={styles.container}>
            <GrowIcon className={styles.growIcon} />
        </div>
    );
};

export default Header;