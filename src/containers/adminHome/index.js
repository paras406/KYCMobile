import React, { useState } from "react";
import {
    Switch,
    Route,
    useRouteMatch,
    useHistory,
    Redirect,
} from "react-router-dom";
import { Menu } from "antd";
import CategoryIcon from "@material-ui/icons/Category";
import User from '../user/index.js';
import Kyc from '../kyc';

import AdminNavigationBar from "../../components/AdminNavigationBar";
import AdminSideMenu from '../../components/AdminSideMenu';
import "../../assets/fonts/fonts.css";
import styles from "./index.module.css";

const { SubMenu } = Menu;

const AdminHome = () => {
    const { path, url } = useRouteMatch();
    const history = useHistory();
    const [isActiveNode, updateActiveNode] = useState(null);

    const menuItemObject = {};
    menuItemObject[`${path}/user`] = {
        key: 0,
        Icon: () => {
            return <CategoryIcon />;
        },
        title: "User",
        onClick: () => {
            history.push(`${url}/user`);
        },
    };
    menuItemObject[`${path}/kyc`] = {
        key: 0,
        Icon: () => {
            return <CategoryIcon />;
        },
        title: "KYC",
        onClick: () => {
            history.push(`${url}/kyc`);
        },
    };

    const menuItems = Object.values(menuItemObject);

    const renderData = () => {
        return (
            <Switch>
                <Route exact path={path}>
                    <Redirect to={`${path}/user`} />
                </Route>
                <Route path={`${path}/user`}>
                    {() => {
                        updateActiveNode(0);
                        return <User />;
                    }}
                </Route>
                <Route path={`${path}/kyc`}>
                    {() => {
                        updateActiveNode(1);
                        return <Kyc />;
                    }}
                </Route>
            </Switch>
        );
    };

    return (
        <div className={styles.Home}>
            <AdminNavigationBar />
            <div className={styles.bodyWrapper}>
                <div className={styles.body}>
                    <div className={styles.sideMenu}>
                        <AdminSideMenu menuItems={menuItems} activeIndex={isActiveNode} />
                    </div>
                    <div className={styles.content}>{renderData()}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
