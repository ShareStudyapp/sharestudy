import React, { useEffect, useState ,useCallback} from 'react'
import FeedList from "./FeedList";
import { Form, Input, Button,Card } from 'antd';
import { LOAD_POSTS_REQUEST,LOAD_GALLARY_REQUEST } from '../../reducers/post';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from './PostCard';
import PostForm from './PostForm';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Gallery from "react-photo-gallery";
import { photos } from "./photos";
import Carousel, { Modal, ModalGateway } from "react-images";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const { Meta } = Card;
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


function Feeds() {
    const dispatch = useDispatch();
    const [Products, setProducts] = useState([])
    const classes = useStyles();

    
    const [value, setValue] = React.useState(0);
  
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
  
    const openLightbox = useCallback((event, { photo, index }) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    }, []);
  
    const closeLightbox = () => {
      setCurrentImage(0);
      setViewerIsOpen(false);
    };
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
    useEffect(() => {
      dispatch({
        type: LOAD_POSTS_REQUEST
      });
      dispatch({
        type: LOAD_GALLARY_REQUEST
      });
      
    }, []);
    const { mainPosts,gallary, hasMorePost, loadPostsLoading } = useSelector((state) => state.postReducer);

    return (
      <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="FeelList" {...a11yProps(0)} />
            <Tab label="Gallary" {...a11yProps(1)} />
            
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {mainPosts.map((c) => (
            <PostCard key={c.id} post={c} />
          ))}
          
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>
          <Gallery photos={photos} onClick={openLightbox} />
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                    currentIndex={currentImage}
                    views={photos.map(x => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: x.title
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </div>
        </TabPanel>
      </div>
    </div>
    )    
} 

export default Feeds