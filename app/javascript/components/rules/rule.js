import React, { useState, useEffect } from "react"
import { Input, Divider } from "antd";
import ExpressionComponent from "./expression"
import Action from "./action"

const Rule = (props) => {
    const [name, setName] = useState(props.rule.name);
    const [description, setDescription] = useState(props.rule.description);
    const [expression, setExpression] = useState(props.rule.expression);
    const [action, setAction] = useState(props.rule.rule_action);

    useEffect(() =>
        props.onChange({ name, description, expression, rule_action: action }),
        [name, description, expression, action]
    );

    return <>
               <Input placeholder="Name" defaultValue={name} onChange={(e) => setName(e.target.value)} style={{marginBottom: "0.5em"}} />
               <Input.TextArea placeholder="Description" defaultValue={description} onChange={(e) => setDescription(e.target.value)} style={{marginBottom: "0.5em"}} />
               <ExpressionComponent context={props.context} expression={expression} onChange={setExpression} />
               <Divider />
               <Action context={props.context} action={action} onChange={setAction} />
           </>
}

export default Rule;
