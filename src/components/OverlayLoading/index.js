import React from 'react';
import { CircularProgress } from '@material-ui/core';

import Overlay from '../Overlay';
import styles from './index.module.css';

const OverlayLoading = () => {
    return  (
        <Overlay innerStyle={styles.container}>
            <CircularProgress />
        </Overlay>
    )
}

export default OverlayLoading;