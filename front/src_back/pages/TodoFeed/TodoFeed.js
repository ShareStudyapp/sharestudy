import React,{useEffect} from 'react'

import MainLogo from '../../components/Common/MainLogo';
import MainNav from '../../components/Common/MainNav';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_TODOFEED_REQUEST } from '../../reducers/todolist';
function TodoFeed() {
    const dispatch = useDispatch();
    const { feedTodolist} = useSelector((state) => state.todolistReducer);
    useEffect(() => {
        dispatch({
          type: LOAD_TODOFEED_REQUEST
        });
        
    }, []);
    //console.log(feedTodolist[0])
    
    //  feedTodolist.map((item)=>{
    //      console.log(item)
    //  })
    const result = feedTodolist.slice(0).reverse().map((item)=>
        Object.keys(item).map(el => {
            // item[el].map(sub_el => console.log(sub_el));
            // item[el].map((todo)=>{})
            return item[el];
      })
    )
    const renderDate = result.map((item)=>{
        return item;
    })
    const a = renderDate.map((test)=>{
        test.map((ta)=>{
            console.log(ta)
        })
    })
    
     return (
        <div>
            <MainLogo />
            <ul>
                {a}
            {/* {a.map((item,idx)=>(
                <li>{item}</li>
            ))} */}
            </ul>
            <MainNav />
        </div>
    )
}

export default TodoFeed
    