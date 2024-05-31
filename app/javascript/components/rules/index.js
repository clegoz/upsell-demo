import React, { useState } from "react"
import PropTypes from "prop-types"
import { Row, Col, Button, Empty, Typography } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Layout from "../Layout";

const Index = (props) => {
    const [rules, setRules] = useState(props.rules);

    const deleteRule = async (rule) => {
        const { ok } = await fetch(`/rules/${rule.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });
        if (ok) {
            const response = await fetch("/rules", {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            const result = await response.json();
            setRules(result.rules);
        }
    }

    return <Layout userId={props.user_id}>
               <div style={{display: "flex", justifyContent: "right", marginBottom: "1em"}}>
                   <Button href="/rules/new" icon={<PlusOutlined />}>New</Button>
               </div>
               <div style={{ background: "#fff", padding: 24, borderRadius: "10px" }}>
                   {rules.length == 0 && <Empty />}
                   {rules.map(rule =>
                       <Row key={rule.id} gutter={8}>
                           <Col flex={1}>
                               <p><Typography.Text strong>{rule.name}</Typography.Text></p>
                               <p><Typography.Text>{rule.description}</Typography.Text></p>
                           </Col>
                           <Col>
                               <Button href={`/rules/${rule.id}/edit`} icon={<EditOutlined />} />
                           </Col>
                           <Col>
                               <Button onClick={() => deleteRule(rule)} icon={<DeleteOutlined />} danger />
                           </Col>
                       </Row>
                   )}
               </div>
           </Layout>
}

export default Index;
