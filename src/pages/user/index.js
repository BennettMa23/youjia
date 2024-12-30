import React,{useEffect,useState } from "react";
import { Button,Form,Input,Popconfirm,Table } from "antd";
import './user.css'
import {getUser} from "../../api";
const User = (type,rowData) => {
    const [listData,setListData] = useState({
        name: '',
    })
    const [tableDate,setTableData] = useState([])
    const handleClick = (type) => { // 点击新增按钮
        
    }
    const handleFinish = (e)=>{ // 提交
        setListData({
            name: e.name
        })
    }
    const handleDelete = (rowData)=>{ // 删除
        console.log(rowData)
    }
    const getTableData = ()=>{
        getUser(listData).then(({data})=>{
            // console.log(res,'res')
            setTableData(data.list)
        })
    }
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '年龄',
            dataIndex: 'age'
        },
        {
            title: '性别',
            dataIndex: 'sex',
            render: (val) => {
                return val === 1 ? '男' : '女'
            }
        },
        {
            title:'出生日期',
            dataIndex: 'birthday'
        },
        {
            title:'地址',
            dataIndex: 'addr'
        },
        {
            title:'操作',
            render: (rowData)=>{
                return (
                    <div className="flex-box">
                        <Button style={{marginRight: '5px'}} onClick={() =>handleClick('edit',rowData)}>编辑</Button>
                        <Popconfirm
                            title="提示"
                            description="您确定要删除吗?"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={() => handleDelete(rowData)}
                        >
                            <Button  type="primary" danger>删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]
    useEffect(()=>{
        //调用后端获取用户列表数据
        getTableData()
    },[])
    return (
        <div className="user">
            <div className="flex-box space-between">
                <Button type="primary" onClick={()=>handleClick('add')}>+ 新增</Button>
                <Form layout="inline" onFinish={handleFinish}>
                    <Form.Item name="keyword">
                        <Input placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">搜索</Button>
                    </Form.Item>
                </Form>
            </div>
            <Table
                columns={columns}
                dataSource={tableDate}
                rowKey={'id'}
            />
        </div>
    )
}

export default User