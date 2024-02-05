import React from "react";
import { Form } from "antd";
import {useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import {ShowLoading,HideLoading} from "../../redux/rootSlice";
import axios from "axios";
import {message} from 'antd';

function AdminContact() {
  const dispatch = useDispatch();
  const {portFolioData} = useSelector((state)=>state.root);
  const onFinish = async (values) => {
    try{
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-contact",{
        ...values,
        _id:portFolioData.contact._id,
      });
      dispatch(HideLoading());
      if(response.data.success){
        message.success(response.data.message);
      }else{
        message.error(response.data.message);
      }
    }catch(error){
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <Form onFinish={onFinish} layout="vertical" initialValues={portFolioData.contact}>

        <Form.Item name="name" label="Name">
          <input placeholder="Name" />
        </Form.Item>
        <Form.Item name="gender" label="gender">
          <input placeholder="gender" />
        </Form.Item>
        <Form.Item name="age" label="Age">
          <input placeholder="Age" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <input placeholder="Email" />
        </Form.Item>
        <Form.Item name="mobile" label="Mobile">
          <input placeholder="Mobile" />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <input placeholder="Address" />
        </Form.Item>
        <div className="flex justify-end w-full">
          <button className="px-10 py-2 bg-primary text-white" type="submit">Save</button>
        </div>
      </Form>
    </div>
  );
}

export default AdminContact;
