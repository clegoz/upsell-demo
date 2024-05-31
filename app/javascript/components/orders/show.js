import React from "react"
import PropTypes from "prop-types"
import Big from "big.js";
import { Typography, Space, Row, Col } from "antd";
import Layout from "../Layout";

const Show = (props) => {
  return (
    <Layout userId={props.user_id}>
        <div style={{ background: "#fff", padding: 24, margin: "0 20%", borderRadius: "10px" }}>
            <Typography>
                <Typography.Title level={4}>#{props.order.id}</Typography.Title>
            </Typography>
            {props.order.order_items.map((orderItem, index) => 
                <Row key={orderItem.id}>
                    <Col span={1}><Typography.Text>{index + 1}.</Typography.Text></Col>
                    <Col flex={1}>
                        <p><Typography.Text strong>{orderItem.item.name}</Typography.Text></p>
                        <p><Typography.Text>{orderItem.item.description}</Typography.Text></p>
                    </Col>
                    <Col>${new Big(orderItem.price).toFixed(2)}</Col>
                </Row>
            )}
            <Row>
                <Col flex={1}><Typography.Text strong>Total:</Typography.Text></Col>
                <Col><Typography.Text strong>${props.order.order_items.reduce((acc, orderItem) => new Big(orderItem.price), new Big(0)).toFixed(2)}</Typography.Text></Col>
            </Row>
        </div>
    </Layout>
  )
}

Show.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.number,
        order_items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                item: PropTypes.shape({
                    name: PropTypes.string,
                    description: PropTypes.string,
                    price: PropTypes.string
                })
            })
        )
    }),
    user_id: PropTypes.number
};

export default Show
