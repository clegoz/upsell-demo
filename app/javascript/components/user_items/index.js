import React, { useState } from "react"
import PropTypes from "prop-types"
import { Flex, Card, Button, Empty } from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Layout from '../Layout'

const Index = (props) => {
    const [ items, setItems ] = useState(props.items);

    const setUnlisted = async (item) => {
        const response = await fetch(`/user/items/${item.id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        item.is_listed = false;
        setItems([...items]);
    }

    return <Layout userId={props.user_id}>
               <div style={{display: "flex", justifyContent: "center", marginBottom: "1em"}}>
                   <div style={{width: "948px", textAlign: "right"}}>
                       <Button href="/user/items/new" icon={<PlusOutlined />}>New</Button>
                   </div>
               </div>
               {items.length == 0 ?
                    <div style={{ background: "#fff", padding: 24, margin: "0 20%", borderRadius: "10px" }}><Empty /></div>
                    :
                    <Flex wrap gap="large" justify="center">
                        {items.map(item =>
                            <Card key={item.id}
                                title={
                                    <a href={`/items/${item.id}`}>{item.name}</a>
                                }
                                extra={
                                    item.is_listed &&
                                        <Flex gap={10}>
                                            <Button href={`/user/items/${item.id}/edit`} icon={<EditOutlined />}></Button>
                                            <Button onClick={() => setUnlisted(item)} icon={<DeleteOutlined />} danger></Button>
                                        </Flex>
                                }
                                size={16}
                                style={{ width: 300 }}
                            >
                                {item.description}
                            </Card>
                        )}
                    </Flex>
               }
           </Layout>
}

Index.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            description: PropTypes.string,
            is_listed: PropTypes.bool
        })
    ),
    user_id: PropTypes.number
};

export default Index
