import React from 'react';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import cssStyles from './index.module.css';
import '../../assets/fonts/fonts.css'

const LoadingIndicator = (props) => {
    const { size = 24, classes } = props;
    const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />;
    
    return (
        <div className={cssStyles.container}>
            {/* <Spin indicator={antIcon} spinning /> */}
            <LinearProgress  classes={{
                colorPrimary: classes.colorPrimary,
                barColorPrimary: classes.barColorPrimary,
            }} color="primary"/>
        </div>
    );
}

const styles = props => ({
    colorPrimary: {
      backgroundColor: '#87CEEB',
    },
    barColorPrimary: {
      backgroundColor: 'blue',
    }
});
  
export default  withStyles(styles)(LoadingIndicator);