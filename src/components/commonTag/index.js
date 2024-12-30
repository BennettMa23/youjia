import React from 'react';
import { Tag, Space } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { useLocation,useNavigate } from 'react-router-dom';
import { closeTab,setCurrentMenu } from '../../store/reducers/tab';

import './index.css'

const CommonTag = () => {
    const tabsList = useSelector(state => state.tab.tabList)
    const currentMenu = useSelector(state => state.tab.currentMenu)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    // console.log(tabsList , "tabsList");
    const handleClose = (tag,index) => {
        // console.log(tabsList , "tabList");
        let length = tabsList.length - 1
        dispatch(closeTab(tag))
        //关闭不是当前tag
        if (tag.path !== location.pathname){
            return
        }
        if (index === length){
            //设置当前数据
            const curData = tabsList[index - 1]
            dispatch(setCurrentMenu(curData))
            navigate(curData.path)
        } else {
            //tag至少一个，则选后一个
            if(tabsList.length > 1){
                //下一个tag
                const nextData = tabsList[index + 1]
                dispatch(setCurrentMenu(nextData))
                navigate(nextData.path)
            }
        }
    }
    //点击tag
    const handleChange = (tag) => {
        dispatch(setCurrentMenu(tag))
        navigate(tag.path)
    }
    //tag显示
    const setTag = (flag,item,index) => {
        return (
            flag ?
            <Tag color='#55acee' closeIcon key={item.name} onClose={()=>handleClose(item,index)}>{item.label}</Tag> 
            :
            <Tag onClick={()=>handleChange(item)} key={item.name}>{item.label}</Tag>
        )
    }
    return (
        <Space className='common-tag' size={[0,8]} wrap>
            {
                currentMenu.name && tabsList.map((item,index) => (setTag(item.path === currentMenu.path,item,index)))
            }
        </Space>
    );
}

export default CommonTag;