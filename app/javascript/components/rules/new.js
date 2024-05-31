import React, { useState } from "react"
import PropTypes from "prop-types"
import { Form, Button, Divider, Row, Col, Select, Input, message } from "antd";
import Layout from "../Layout";
import Rule from "./rule"
import { NodeType, LogicalOperators } from "./expression"

let rule = {
    expression: {
        node_type: NodeType.Logical,
        op: LogicalOperators.And,
        left_expression: { node_type: NodeType.Comparison },
        right_expression: { node_type: NodeType.Noop }
    },
    rule_action: {}
};

const New = (props) => {
    const context = { items: props.items };
    const [saving, setSaving] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const onChange = (value) => {
        rule = value;
    }

    const save = async () => {
        setSaving(true);

        const response = await fetch("/rules", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(rule)
        });

        const result = await response.json();
        if (response.ok) {
            window.location = result.location;
        } else {
            setSaving(false);
            messageApi.error({
                key: "error",
                content: result.errors
            });
        }
    };

    return <Layout userId={props.user_id}>
               {contextHolder}
               <div style={{ background: "#fff", padding: 24, borderRadius: "10px" }}>
                   <Rule context={context} rule={rule} onChange={onChange} />
                   <Divider />
                   <Button type="primary" onClick={save} block loading={saving}>Save</Button>
               </div>
           </Layout>
}

New.propTypes = {
    items: PropTypes.array,
    user_id: PropTypes.number
};

export default New
