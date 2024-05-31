import React, { useState } from "react"
import PropTypes from "prop-types"
import { Row, Col, message, List } from "antd"
import Layout from '../Layout'
import ItemForm from './form'

const Edit = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [saving, setSaving] = useState(false);

    const update = async (values) => {
        setSaving(true);

        const response = await fetch(`/user/items/${props.item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(values)
        });
        const result = await response.json();
        if (response.ok) {
            window.location = result.location;
        } else {
            setSaving(false);

            messageApi.error({
                key: "error",
                content: (
                    <List dataSource={result.errors}
                          renderItem={item => <List.Item>{item}</List.Item>}></List>
                )
            });
        }
    }

    return (
        <Layout userId={props.user_id}>
            {contextHolder}
            <Row justify="center">
                <Col span={12}>
                    <ItemForm item={props.item} saving={saving} onFinish={update} />
                </Col>
            </Row>
        </Layout>
    )
}

Edit.propTypes = {
    item: PropTypes.shape({ id: PropTypes.number }),
    user_id: PropTypes.number
};

export default Edit
