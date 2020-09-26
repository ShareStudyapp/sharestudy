import React, { useEffect, useState ,useCallback} from 'react'
import FeedList from "./FeedList";
import { Form, Input, Button,Card } from 'antd';
import { LOAD_POSTS_REQUEST,LOAD_GALLARY_REQUEST } from '../../reducers/post';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from './PostCard';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Gallery from "react-photo-gallery";
import { photos } from "./photos";

import GallaryList from './GallaryList';

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
    const classes = useStyles();

    const [value, setValue] = React.useState(0);
  
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
        <AppBar position="static" style={{backgroundColor:"#26ff14"}}>
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
          {/* <Gallery photos={gallary.filepath} onClick={openLightbox} /> */}
          <GallaryList gallary={gallary} />
          
          </div>
        </TabPanel>
      </div>
    </div>
    )    
} 

export default Feeds