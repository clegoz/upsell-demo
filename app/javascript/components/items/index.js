import React from "react"
import PropTypes from "prop-types"
import { Flex, Card } from "antd"
import Layout from '../Layout'

const Index = (props) => {
    return <Layout userId={props.user_id}>
               <Flex wrap gap="large" justify="center">
                   {props.items.map(item =>
                       <a key={item.id} href={`/items/${item.id}`}>
                           <Card title={item.name} size={16} style={{ width: 300 }} hoverable>
                               {item.description}
                           </Card>
                       </a>
                   )}
               </Flex>
           </Layout>
}

Index.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            description: PropTypes.string
        })
    ),
    user_id: PropTypes.number
};

export default Index
