import React, { useState } from "react"
import PropTypes from "prop-types"
import Big from "big.js";
import { Row, Col, Typography, Input, Button, Divider } from "antd";
import Layout from "../Layout";

const Show = (props) => {
    const [ isInBasket, setIsInBasket ] = useState(props.is_in_basket);
    const addToBasket = async () => {
        const response = await fetch("/user/basket", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ item_id: props.item.id })
        });
        setIsInBasket(true);
    };

    const removeFromBasket = async () => {
        const response = await fetch(`/user/basket/${props.item.id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        setIsInBasket(false);
    };

    return <Layout userId={props.user_id}>
               <Row gutter={24}>
                   <Col span={14}>
                       <div style={{ background: "#fff", padding: 24, borderRadius: "10px" }}>
                           <Typography>
                               <Typography.Title level={4}>{props.item.name}</Typography.Title>
                               <Typography.Paragraph>{props.item.description}</Typography.Paragraph>
                           </Typography>
                       </div>
                   </Col>
                   <Col span={10}>
                       <div style={{ background: "#fff", padding: 24, borderRadius: "10px" }}>
                           <Typography.Title level={4} style={{textAlign: "center"}}>${new Big(props.item.price).toFixed(2)}</Typography.Title>
                           {props.user_id && props.item.is_listed &&
                                <>
                                    <div>
                                        {!isInBasket ?
                                        <Button type="primary" block onClick={addToBasket}>Add To Basket</Button> :
                                        <Button block onClick={removeFromBasket}>Remove From Basket</Button>}
                                    </div>
                                    <Divider />
                                </>
                           }
                           <div>
                               <Typography.Title level={4}>{props.item.user.name}</Typography.Title>
                               <Typography.Paragraph>{props.item.user.bio}</Typography.Paragraph>
                           </div>

                       </div>
                   </Col>
               </Row>
           </Layout>
}

Show.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.string
    }),
    user: PropTypes.shape({
        name: PropTypes.string,
        bio: PropTypes.string
    }),
    is_in_basket: PropTypes.bool,
    user_id: PropTypes.number
};

export default Show
