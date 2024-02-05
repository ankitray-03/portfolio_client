import React from "react";
import { Form } from "antd";
import {useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import {ShowLoading,HideLoading} from "../../redux/rootSlice";
import axios from "axios";
import {message} from 'antd';

function AdminAbout() {
  const dispatch = useDispatch();
  const {portFolioData} = useSelector((state)=>state.root);
  const onFinish = async (values) => {
    try{
      const tempSkills = values.skills.split(",");
      values.skills = tempSkills;
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-about",{
        ...values,
        _id:portFolioData.about._id,
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
      <Form onFinish={onFinish} layout="vertical" initialValues={{
        ...portFolioData.about,
        skills: portFolioData.about.skills.join(" , "),
        }}>
        <Form.Item name="lottieUrl" label="lottieUrl">
          <input placeholder="lottieUrl" />
        </Form.Item>
        <Form.Item name="skills" label="skills">
          <input placeholder="skills" />
        </Form.Item>
        <Form.Item name="description1" label="Description1">
          <textarea placeholder="Description1" />
        </Form.Item>
        <Form.Item name="description2" label="Description2">
          <textarea placeholder="description2" />
        </Form.Item>
        <div className="flex justify-end w-full">
          <button className="px-10 py-2 bg-primary text-white" type="submit">Save</button>
        </div>
      </Form>
    </div>
  );
}

export default AdminAbout;
