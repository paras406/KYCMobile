import React, { useState } from 'react';
import 'antd/dist/antd.css';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';

import styles from './index.module.css';
import '../../assets/fonts/fonts.css';
import { Menu, Dropdown } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';

import {
    UserOutlined
  } from '@ant-design/icons';

const AdminNavigationBar = (props) => {

    const history = useHistory();

    const renderLeftPart = () => {
        return(
            <div className={styles.left}>
                <MenuIcon className={styles.menuIcon}/>
                <span className={styles.growText}>GROW</span>
            </div>
        );
    }

    const logout = () => {
        console.log("clicked", history)
        localStorage.clear()
        history.push("/login")
    }

    const userMenu = (
        <Menu onClick={logout}>
            <Menu.Item key="1">Logout</Menu.Item>
        </Menu>
    );

    const renderRightPart = () => {
        return(
            <div className={styles.right}>
                <Dropdown.Button
                    style={{ float: 'right', marginRight: "30px", backgroundColor: '#21262b' }}
                    // className={styles.profileIcon}
                    overlay={userMenu}
                    icon={
                        <UserOutlined
                          style={{
                            fontSize: '28px',
                            backgroundColor: '#21262b',
                            borderRadius: '50%',
                            color: "#fff"
                          }}
                        />
                    }
                ></Dropdown.Button>
                {/* <Dropdown.Button
                    className="dropdown-btn"
                    overlay={userMenu}
                    icon={
                      <UserOutlined
                        style={{
                          fontSize: '28px',
                          backgroundColor: '#f0f0f0',
                          borderRadius: '50%',
                        }}
                      />
                >
                // <UserOutlined className={styles.profileIcon}/>
                </Dropdown.Button> */}
            </div>
        );
    }
  
    return (
        <div className={styles.container}>
           {renderLeftPart()}
           {renderRightPart()}
        </div>
    );
}

export default AdminNavigationBar;

