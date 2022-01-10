import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';

import styles from './index.module.css';


const DropdownMenu = (props) => {

    const { itemList = [], anchorEl, onClose  } = props;

    return(
        <Menu
            id="dropdown-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={onClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            getContentAnchorEl={null}
            className={styles.menuItemContainer}
        >
            <div>
            {
                itemList.map((item, index) => {
                    const { text, action, type } = item;
                    let className = styles.secondaryButton;
                    if(type === 'primary'){
                        className = styles.primaryButton;
                    }
                    return(
                        <MenuItem onClick={action} className={className} key={index}>
                            {text}
                        </MenuItem>
                    )
                })
            }
            </div>
        </Menu>
    );
} 

export default DropdownMenu;