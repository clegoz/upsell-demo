import React, { useState } from "react"
import { Row, Col, Select, Button, Flex, Divider } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const NodeType = {
    Noop: 0,
    Logical: 1,
    Comparison: 2
}

const LogicalOperators = {
    And: 1,
    Or: 2
}

const ComparisonOperators = {
    Equals: 1,
    Contains: 2
}

const Parameters = [ 
    { value: "event", label: "Event" },
    { value: "basket", label: "Basket" }
]

const getAllowedOps = (parameterName) => {
    switch (parameterName) {
    case "event":
        return [{ value: ComparisonOperators.Equals, label: "equals" }];
    case "basket":
        return [{ value: ComparisonOperators.Contains, label: "contains" }];
    }
}

const ComparisonRightHandSide = (props) => {
    switch (props.expression.left_parameter) {
    case "event":
        return <Select key="event"
                       options={[ { value: "on_checkout", label: "On Checkout" } ]}
                       defaultValue={props.expression.right_event_name}
                       onChange={value => props.onChange({ right_event_name: value })}
                       style={{ width: "100%" }} />
    case "basket":
        return <Select key="basket"
                       options={props.context.items.map(i => ({ label: i.name, value: i.id }))}
                       defaultValue={props.expression.right_item_id}
                       onChange={value => props.onChange({ right_item_id: value })}
                       style={{ width: "100%" }} />
    }
}

const emptyExpression = () => ({ node_type: NodeType.Noop });

const ComparisonExpression = (props) => {
    const { expression } = props;

    const leftChange = (value) => props.onChange({ node_type: expression.node_type, left_parameter: value });
    const opChange = (value) => props.onChange({ left_parameter: expression.left_parameter, node_type: expression.node_type, op: value });
    const rightChange = (value) => props.onChange({ ...expression, ...value });
    const remove = () => props.onChange(emptyExpression());

    return <Row wrap={false} gutter={8}>
               <Col span={8}>
                   <Select options={Parameters}
                           defaultValue={expression.left_parameter}
                           onChange={leftChange}
                           style={{ width: "100%" }}/>
               </Col>
               <Col flex={1}>
                   <Select options={getAllowedOps(expression.left_parameter)}
                           value={expression.op}
                           onChange={opChange}
                           style={{ width: "100%" }} />
               </Col>
               <Col span={8}>
                   <ComparisonRightHandSide context={props.context} expression={expression} onChange={rightChange} />
               </Col>
               <Col>
                   <Button onClick={remove} icon={<DeleteOutlined />} style={{ height: "100%" }}></Button>
               </Col>
           </Row>
};

const LogicalExpression = (props) => {
    let { expression } = props;

    const onLeftChange = (leftExpression) => props.onChange({ ...expression, left_expression: leftExpression });
    const onOpChange = (op) => props.onChange({ ...expression, op: op });
    const onRightChange = (rightExpression) => props.onChange({ ...expression, right_expression: rightExpression });
    const remove = () => props.onChange(emptyExpression());

    return <Row wrap={false}>
               <Col>
                   <Select options={[
                               { value: LogicalOperators.And, label: "And" },
                               { value: LogicalOperators.Or, label: "Or" }
                           ]}
                           defaultValue={expression.op}
                           onChange={onOpChange}
                   />
               </Col>
               <Col>
                   <Divider type="vertical" style={{ height: "100%" }} />
               </Col>
               <Col flex={1}>
                   <Flex vertical gap="middle">
                       <ExpressionComponent context={props.context} expression={expression.left_expression} onChange={onLeftChange} />
                       <ExpressionComponent context={props.context} expression={expression.right_expression} onChange={onRightChange} />
                   </Flex>
               </Col>
               <Col>
                   <Divider type="vertical" style={{ height: "100%" }} />
               </Col>
               <Col>
                   <Button onClick={remove} icon={<DeleteOutlined />} style={{ height: "100%" }}></Button>
               </Col>
            </Row>
};

const EmptyExpression = (props) => {
    const addLogical = () => {
        props.onChange({
            node_type: NodeType.Logical,
            op: LogicalOperators.And,
            left_expression: { node_type: NodeType.Noop },
            right_expression: { node_type: NodeType.Noop }
        });
    };
    const addComparison = () => {
        props.onChange({ node_type: NodeType.Comparison });
    };
    return <Flex gap="small" justify="center">
               <Button onClick={addLogical} icon={<PlusOutlined />}>Logical</Button>
               <Button onClick={addComparison} icon={<PlusOutlined />}>Comparison</Button>
           </Flex>
};

const ExpressionComponent = (props) => {
    switch (props.expression.node_type) {
    case NodeType.Noop:
        return <EmptyExpression {...props} />
    case NodeType.Logical:
        return <LogicalExpression {...props} />
    case NodeType.Comparison:
        return <ComparisonExpression {...props} />
    }
}

export { NodeType, LogicalOperators };

export default ExpressionComponent;
