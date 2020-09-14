import React, { useEffect, useState } from 'react'
import {  Col, Card, Row } from 'antd';
import FeedList from "./FeedList";
import ImageSlider from './ImageSlider.js';

const { Meta } = Card;
function Feeds() {
    const [Products, setProducts] = useState([])
    useEffect(() => {

        getProducts()

    }, [])
    const getProducts = () => {
      setProducts(FeedList)
    }
    const renderCards = Products.map((product, index) => {
        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.content}
                    description={`${product.content}`}
                />
            </Card>
        </Col>
    })
    
    return (
        <div>
             <Row gutter={[16, 16]}>
                {renderCards}
             </Row>
        </div>
    )
}

export default Feeds
