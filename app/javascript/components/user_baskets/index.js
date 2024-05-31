import React, { useState } from "react"
import PropTypes from "prop-types"
import Big from "big.js";
import { Row, Col, Typography, Input, Button, Divider, Empty, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Layout from "../Layout";

const addItem = (itemId) => {
    return fetch("/user/basket", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ item_id: itemId })
    });
}

const removeItem = (itemId) => {
    return fetch(`/user/basket/${itemId}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
}

const Index = (props) => {
    const [basket, setBasket] = useState(props.basket);
    const [actions, setActions] = useState(props.actions);
    const [upsellModalVisible, setUpsellModalVisible] = useState(false);


    const remove = async (itemId) => {
        const { ok } = await removeItem(itemId);
        if (ok) {
            const result = await fetchBasket();
            setBasket(result.basket);
            setActions(result.actions);
        }
    };

    const fetchBasket = async () => {
        const response = await fetch(
            "/user/basket",
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        );

        return await response.json();
    }

    const apply = async (action) => {
        const { ok } = await fetch(
            "/user/basket/apply",
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items_to_removed_item_ids: action.items_to_removed_item_ids,
                    item_to_added_id: action.item_to_added_id
                })
            }
        );
        if (ok) {
            const result = await fetchBasket();

            setBasket(result.basket);
            setActions(result.actions);

            setUpsellModalVisible(result.actions.length > 0);
        }
    };

    const checkout = async (e) => {
        if (actions.length > 0) {
            e.preventDefault();
            setUpsellModalVisible(true);
        }
    };

    return <Layout userId={props.user_id}>
               <Modal
                   open={upsellModalVisible}
                   onCancel={() => setUpsellModalVisible(false)}
                   title="Before You Checkout"
                   footer={
                       <Button type="primary" block href="/orders/new">Continue</Button>
                   }>
                   {actions.map(action =>
                       <Row key={action.id} style={{ marginTop: "1em" }}>
                           <Col flex={1}>{action.message}</Col>
                           <Col><Button type="primary" onClick={() => apply(action)}>APPLY</Button></Col>
                       </Row>
                   )}
               </Modal>
               <Row gutter={24}>
                   <Col span={14}>
                       <div style={{ background: "#fff", padding: 24, borderRadius: "10px" }}>
                           {basket.length == 0 && <Empty />}
                           {basket.map((b, index) =>
                               <Row key={b.id}>
                                   <Col span={1}><Typography.Text>{index + 1}.</Typography.Text></Col>
                                   <Col flex={1}>
                                       <p><Typography.Text strong>{b.item.name}</Typography.Text></p>
                                       <p><Typography.Text>{b.item.description}</Typography.Text></p>
                                   </Col>
                                   <Col span={4} style={{alignSelf: "center"}}>
                                       ${new Big(b.item.price).toFixed(2)}
                                   </Col>
                                   <Col style={{alignSelf: "center"}}>
                                       <Button onClick={() => remove(b.item.id)} icon={<DeleteOutlined />} danger></Button>
                                   </Col>
                               </Row>)}

                       </div>
                   </Col>
                   <Col span={10}>
                       <div style={{ background: "#fff", padding: 24, borderRadius: "10px" }}>
                           <Button type="primary" block disabled={basket.length == 0} onClick={checkout} href="/orders/new">Checkout</Button>
                       </div>
                   </Col>
               </Row>
           </Layout>
}


export default Index
