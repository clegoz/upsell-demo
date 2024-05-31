import React from "react"
import PropTypes from "prop-types"
import { Form, Input, InputNumber, Button } from "antd"

const ItemForm = (props) => {
    return <Form labelCol={{ span: 6 }} initialValues={props.item} onFinish={props.onFinish} style={{ background: "#fff", padding: 24, borderRadius: "10px" }}>
               <Form.Item label="Name" name="name">
                   <Input />
               </Form.Item>
               <Form.Item label="Description" name="description">
                   <Input.TextArea />
               </Form.Item>
               <Form.Item label="Price" name="price">
                   <InputNumber style={{width: "100%"}} />
               </Form.Item>
               <Form.Item wrapperCol={{ offset: 6 }}>
                   <Button type="primary" htmlType="submit" loading={props.saving}>Submit</Button>
               </Form.Item>
           </Form>
}

ItemForm.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.string
    })
};

export default ItemForm
