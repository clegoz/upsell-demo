import React from "react"
import PropTypes from "prop-types"
import Big from "big.js";
import { Row, Col, Typography, Input, Button, Divider, Empty } from "antd";
import Layout from "../Layout";

const order = async () => {
    const response = await fetch("/orders", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    if (response.ok) {
        const result = await response.json();
        window.location = result.location;
    }
}

const New = (props) => {
    return (
        <Layout userId={props.user_id}>
            <div style={{ background: "#fff", padding: 24, margin: "0 20%", borderRadius: "10px" }}>
                {props.items.map((item, index) =>
                    <Row key={item.id}>
                        <Col span={1}><Typography.Text>{index + 1}.</Typography.Text></Col>
                        <Col flex={1}>
                            <p><Typography.Text strong>{item.name}</Typography.Text></p>
                            <p><Typography.Text>{item.description}</Typography.Text></p>
                        </Col>
                        <Col span={2}>${new Big(item.price).toFixed(2)}</Col>
                    </Row>)}
                <Row>
                    <Col flex={1} style={{textAlign: "right"}}>Total:</Col>
                    <Col span={2}>${props.items.reduce((acc, item) => acc.plus(new Big(item.price)), new Big(0)).toFixed(2)}</Col>
                </Row>
                <Divider />
                <Typography.Title level={4}>Payment</Typography.Title>
                <Row style={{marginBottom: "0.5em"}}>
                    <Col span={24}><Input placeholder="Card Number" disabled /></Col>
                </Row>
                <Row gutter={8} align="middle">
                    <Col flex={"1 1 0"}><Input placeholder="MM" disabled /></Col>
                    <Col>/</Col>
                    <Col flex={"1 1 0"}><Input placeholder="YYYY" disabled /></Col>
                    <Col span={12}><Input placeholder="CVV" disabled /></Col>
                </Row>
                <Divider />
                <Button type="primary" block onClick={order}>Complete</Button>
            </div>
        </Layout>
    )
}

New.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            description: PropTypes.string,
            price: PropTypes.string
        })
    ),
    user_id: PropTypes.number
};

export default New
