import React from 'react'
import { Carousel } from 'antd';

function ImageSlider(props) {
    // console.log(props.images[0].n);
    //const imageList=props.images;
    console.log(props.images);
    const list=props.images;
    const imglist =list.map(image=>{
        return(
            <Carousel autoplay>
             {props.images.map((image,idx) => (
                    <div key={idx}>
                        <img style={{ width: '100%', maxHeight: '150px' }}
                            src={image.name} alt="productImage" />
                    </div>
                ))}
            </Carousel>
        )
    })
    return (
        <div>
            {imglist}
        </div>
    )
}

export default ImageSlider