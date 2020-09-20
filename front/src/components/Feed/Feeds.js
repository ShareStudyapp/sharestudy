import React, { useEffect, useState ,useRef,useCallback} from 'react'
import FeedList from "./FeedList";
import { Form, Input, Button,Card } from 'antd';

const { Meta } = Card;
function Feeds() {
    const [Products, setProducts] = useState([])
    const [text, setText] = useState('');
    const imageInput = useRef();
    const onChangeText = useCallback((e) => {
        setText(e.target.value);
      }, []);
    return (
        <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" >
          <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
          <div>
            <input type="file" multiple hidden ref={imageInput} />
            <Button>이미지 업로드</Button>
            <Button type="primary" style={{ float: 'right' }} htmlType="submit">짹짹</Button>
          </div>
          <div>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
          <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          </div>
    </Form>
    )
}

export default Feeds
