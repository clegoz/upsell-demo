import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Form, Button, Divider, Row, Col, Select, Input } from "antd";
import Layout from "../Layout";
import { createExpressionComponent, NodeType, LogicalOperators } from "./rule"

const methods = [{
    value: "upsell_confirmation",
    label: "Upsell"
}]

const Action = (props) => {
    const [method, setMethod] = useState(props.action?.method);
    const [message, setMessage] = useState(props.action?.message);
    const [itemsToRemoved, setItemsToRemoved] = useState(props.action?.items_to_removed_item_ids);
    const [itemToAdded, setItemToAdded] = useState(props.action?.item_to_added_id);

    useEffect(() => {
        props.onChange({
            method,
            message,
            items_to_removed_item_ids: itemsToRemoved,
            item_to_added_id: itemToAdded
        });
    }, [method, message, itemsToRemoved, itemToAdded])

    return <>
               <div style={{marginBottom: "0.5em"}}>
                   <Select options={methods}
                           defaultValue={method}
                           onChange={setMethod}
                           placeholder="Action"
                           style={{width: "100%"}}/>
               </div>
               {method == "upsell_confirmation" &&
                <>
                    <Input.TextArea placeholder="Confirmation Message"
                                    defaultValue={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    style={{marginBottom: "0.5em"}} />
                    <Row gutter={8}>
                        <Col flex={1}>
                            <div>
                                Items to removed from basket:
                            </div>
                            <Select
                                mode="multiple"
                                allowClear
                                options={props.context.items}
                                fieldNames={{value: "id", label: "name"}}
                                defaultValue={itemsToRemoved}
                                onChange={setItemsToRemoved}
                                style={{ width: "100%" }} />
                        </Col>
                        <Col flex={1}>
                            <p>Items to added to basket:</p>
                            <Select
                                allowClear
                                options={props.context.items}
                                fieldNames={{value: "id", label: "name"}}
                                defaultValue={itemToAdded}
                                onChange={setItemToAdded}
                                style={{ width: "100%" }}
                            />
                        </Col>
                    </Row>
                </>
               }
           </>
}

Action.propTypes = {
    action: PropTypes.shape({
        method: PropTypes.string,
        message: PropTypes.string,
        items_to_removed_item_ids: PropTypes.arrayOf(PropTypes.number),
        item_to_added_id: PropTypes.number
    }),
    context: PropTypes.shape({
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string
            })
        )
    }),
    onChange: PropTypes.func
}

export default Action;
