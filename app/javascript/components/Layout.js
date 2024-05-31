import React, { Children } from "react"
import { ConfigProvider, Layout as AntdLayout, Menu, Badge } from "antd"
import { ShoppingCartOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header, Content } = AntdLayout;

const Layout = (props) => {
    let menuItems = [
        { key: "discover", label: <a href="/">Discover</a> }
    ];

    if (props.userId) {
        menuItems = [
            ...menuItems,
            { key: "orders", label: <a href="/orders">Orders</a> },
            { key: "my_products", label: <a href={'/user/items'}>My Products</a> },
            { key: "my_rules", label: <a href="/rules">Rules</a> },
            { key: "user_basket", label: <a href="/user/basket"><ShoppingCartOutlined style={{ fontSize: "1.5em" }} /></a>, style: { marginLeft: "auto" } },
            { key: "logout", label: <a href="/logout"><LogoutOutlined style={{ fontSize: "1.5em" }} /></a> }
        ];
    } else {
        menuItems = [
            ...menuItems,
            { key: "login", label: <a href="/login">Login</a>, style: { marginLeft: "auto" } },
            { key: "register", label: <a href="/register">Register</a> }
        ];
    }

    return <ConfigProvider theme={{ hashed: false}}>
               <AntdLayout style={{ height: "100%" }}>
                   <Header style={{ display: "flex", padding: 0 }}>
                       <Menu
                           mode="horizontal"
                           items={menuItems}
                           style={{ flex: 1 }}>
                       </Menu>
                   </Header>
                   <Content style={{ padding: '20px 10% 0 10%' }}>
                       {Children.map(props.children, child => <div>{child}</div>)}
                   </Content>
               </AntdLayout>
           </ConfigProvider>
}

export default Layout;
