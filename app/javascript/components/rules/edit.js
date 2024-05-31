import React, { useState } from "react"
import PropTypes from "prop-types"
import { Form, Button, Divider, message } from "antd";
import Layout from "../Layout";
import Rule from "./rule"
import { NodeType, LogicalOperators } from "./expression"

const Edit = (props) => {
    const context = { items: props.items };
    const [saving, setSaving] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    let { rule } = props;
    let id = rule.id;

    const onChange = (value) => {
        rule = value;
    }

    const save = async () => {
        setSaving(true);

        const response = await fetch(`/rules/${id}`, {
            method: "PUT",
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
                   <Button type="primary" onClick={save} block>Save</Button>
               </div>
           </Layout>
}

Edit.propTypes = {
    rule: PropTypes.shape({ id: PropTypes.number }),
    items: PropTypes.array,
    user_id: PropTypes.number
};

export default Edit
