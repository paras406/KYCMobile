import React from "react";
import "antd/dist/antd.css";

import styles from "./index.module.css";
import "../../assets/fonts/fonts.css";

const AdminSideMenu = (props) => {
  const { menuItems = [], activeIndex } = props;

  const onMenuItemClicked = (index) => {
    menuItems[index].onClick();
  };

  return (
    <div className={styles.container}>
      {menuItems.map((MenuItem, index) => {
        const { Icon, title, key, renderChildren } = MenuItem;

        if (index === activeIndex) {
          return (
            <div
              className={styles.MenuItemSelected}
              key={key}
              onClick={() => {
                onMenuItemClicked(index);
              }}
            >
              <span className={styles.iconSelected}>
                <Icon />
              </span>
              <span className={styles.titleSelected}>{title}</span>
            </div>
          );
        }
        return (
          <div
            className={styles.MenuItem}
            key={key}
            onClick={() => {
              onMenuItemClicked(index);
            }}
          >
            <span className={styles.icon}>
              <Icon />
            </span>
            <span className={styles.title}>{title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AdminSideMenu;
