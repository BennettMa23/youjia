import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  InputNumber,
  Select,
  DatePicker,
} from "antd";
import "./user.css";
import { getUser, addUser, editUser,delUser } from "../../api";
import dayjs from "dayjs";
const User = (type, rowData) => {
  const [listData, setListData] = useState({
    name: "",
  });
  const [tableDate, setTableData] = useState([]);
  const [modelType, setModelType] = useState(0); // 0新增 1编辑
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [form] = Form.useForm(); //创建form实例
  // 新增 / 编辑
  const handleClick = (type, rowData) => {
    setIsModelOpen(!isModelOpen);
    if (type == "add") {
      setModelType(0);
    } else {
      setModelType(1);
      // console.log(rowData);
      const cloneData = JSON.parse(JSON.stringify(rowData)); //数据深拷贝
      cloneData.birth = dayjs(cloneData.birth);
      console.log(cloneData);
      form.setFieldsValue(cloneData); //表单数据回填
    }
  };
  const handleFinish = (e) => {
    // 提交
    setListData({
      name: e.keyword,
    });
  };
  useEffect(()=>{
    getTableData();
  },[listData])
  const handleDelete = ({id}) => {
    // 删除
    // console.log(rowData);
    delUser({id}).then((res) => {
      getTableData();
    });
  };
  const getTableData = () => {
    getUser(listData).then(({ data }) => {
      // console.log(res,'res')
      setTableData(data.list);
    });
  };
  //弹窗确定
  const handleOk = () => {
    //表单校验
    form.validateFields().then((val) => {
      //日期参数
      val.birth = dayjs(val.birth).format("YYYY-MM-DD");
      // console.log(val,'val');
      // 调接口 
      //编辑
      if (modelType) {
        editUser(val).then((res) => {
          handleCancel();
          getTableData();
        });
      } else {
        addUser(val).then((res) => {
          handleCancel();
          getTableData();
        });
      }
    }).catch((err) => {
      console.log(err);
    })
  };
  // 弹窗取消
  const handleCancel = () => {
    setIsModelOpen(false);
    form.resetFields();
  };
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
    },
    {
      title: "性别",
      dataIndex: "sex",
      render: (val) => {
        return val === 1 ? "男" : "女";
      },
    },
    {
      title: "出生日期",
      dataIndex: "birth",
    },
    {
      title: "地址",
      dataIndex: "addr",
    },
    {
      title: "操作",
      render: (rowData) => {
        return (
          <div className="flex-box">
            <Button
              style={{ marginRight: "5px" }}
              onClick={() => handleClick("edit", rowData)}
            >
              编辑
            </Button>
            <Popconfirm
              title="提示"
              description="您确定要删除吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={() => handleDelete(rowData)}
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    //调用后端获取用户列表数据
    getTableData();
  }, [getTableData]);
  return (
    <div className="user">
      <div className="flex-box space-between">
        <Button type="primary" onClick={() => handleClick("add")}>
          + 新增
        </Button>
        <Form layout="inline" onFinish={handleFinish}>
          <Form.Item name="keyword">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table  columns={columns} dataSource={tableDate} rowKey={"id"} />

      <Modal
        open={isModelOpen}
        title={modelType ? "新增用户" : "编辑用户"}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
        >
          {modelType == 1 && (
            <Form.Item name="id" hidden>
              <Input></Input>
            </Form.Item>
          )}
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="年龄"
            name="age"
            rules={[
              { required: true, message: "请输入年龄" },
              { type: "number", message: "年龄必须为数字" },
            ]}
          >
            <InputNumber placeholder="请输入年龄" />
          </Form.Item>
          <Form.Item
            label="性别"
            name="sex"
            rules={[{ required: true, message: "性别必选" }]}
          >
            <Select
              placeholder="请选择性别"
              options={[
                { value: 0, label: "男" },
                { value: 1, label: "女" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="出生日期"
            name="birth"
            rules={[{ required: true, message: "请选择出生日期" }]}
          >
            <DatePicker
              placeholder="请选择出生日期"
              format="YYYY/MM/DD"
            ></DatePicker>
          </Form.Item>
          <Form.Item
            label="地址"
            name="addr"
            rules={[{ required: true, message: "请填写地址" }]}
          >
            <Input placeholder="请填写地址" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
