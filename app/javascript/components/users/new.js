import React, { useState } from "react"
import PropTypes from "prop-types"
import { Form, Input, Button, message, List } from "antd";
import Layout from "../Layout";

const New = (props) => {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const register = async (values) => {
        setLoading(true);

        const response = await fetch("/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
        if (response.ok) {
            window.location = "/";
        } else {
            setLoading(false);

            const result = await response.json();
            messageApi.error({
                key: "error",
                content: (
                    <List dataSource={result.errors}
                          renderItem={item => <List.Item>{item}</List.Item>}></List>
                )
            });
        }
    };

    return <Layout>
               {contextHolder}
               <Form labelCol={{ span: 6 }} style={{ background: "#fff", padding: 24, margin: "0 20%", borderRadius: "10px" }} onFinish={register}>
                   <Form.Item name="username" label="Username">
                       <Input />
                   </Form.Item>
                   <Form.Item name="password" label="Password">
                       <Input.Password />
                   </Form.Item>
                   <Form.Item name="name" label="Name">
                       <Input />
                   </Form.Item>
                   <Form.Item name="bio" label="Bio">
                       <Input.TextArea />
                   </Form.Item>
                   <Form.Item>
                       <Button type="primary" htmlType="submit" block loading={loading}>Register</Button>
                   </Form.Item>
               </Form>
           </Layout>
}


export default New
