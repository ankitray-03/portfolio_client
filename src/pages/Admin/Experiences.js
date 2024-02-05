import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form } from "antd";
import { dispatch } from "react";
import axios from "axios";
import {ShowLoading,HideLoading, ReloadData} from "../../redux/rootSlice";
import {message} from 'antd';


const Experiences = () => {
  const dispatch = useDispatch();
  const { portFolioData } = useSelector((state) => state.root);
  const { experiences } = portFolioData;

  const [showAddEditModal, setshowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type,setType] = useState("add");

  const onFinish = async(values)=>{
    try{
        dispatch(ShowLoading());
        let response
        if(selectedItemForEdit){
            response = await axios.post(`${process.env.REACT_APP_URL}/api/portfolio/update-experience`,{
                ...values,
                _id:selectedItemForEdit._id
            });
        }else{
            response = await axios.post(`${process.env.REACT_APP_URL}/api/portfolio/add-experience`,values);
        }

        
        dispatch(HideLoading());
        if(response.data.success){
          message.success(response.data.message);
          setshowAddEditModal(false);
          selectedItemForEdit(null);
          dispatch(HideLoading());
          dispatch(ReloadData(true));
        }else{
          message.error(response.data.message);
          
        }
      }catch(error){
        dispatch(HideLoading());
        message.error(error.message);
      }
  }

  const onDelete = async (item)=>{
    try{
        dispatch(ShowLoading());
        const response = await axios.post(`${process.env.REACT_APP_URL}/api/portfolio/delete-experience`,{_id:item._id});

        dispatch(HideLoading());
        if(response.data.success){
            message.success(response.data.message);
            dispatch(HideLoading());
            dispatch(ReloadData(true));
        }else{
            message.error(response.data.message);
        }
    }catch(error){
        dispatch(HideLoading());
        message.error(error.message);
    }
  }

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white"
          onClick={() => {
            setSelectedItemForEdit(null);
            setshowAddEditModal(true);
          }}
        >
          Add Experience
        </button>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {experiences.map((experience) => {
          return (
            <div className="shadow border p-5 border-gray-400 flex flex-col">
              <h1 className="text-primary text-xl font-bold">
                {experience.period}
              </h1>
              <hr></hr>
              <h1>Company: {experience.company}</h1>
              <h1>Role: {experience.title}</h1>
              <br />
              <h1>{experience.description}</h1>
              <div className="flex justify-end gap-5 mt-5">
                <button className="bg-red-500 text-white px-5 py-2"
                onClick={()=>{
                    onDelete(experience);
                }}>
                  Delete
                </button>
                <button className="bg-primary text-white px-5 py-2"
                    onClick={()=>{
                        setSelectedItemForEdit(experience);
                        setshowAddEditModal(true);
                        setType("edit");
                    }}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {
        (type === "add" || selectedItemForEdit) && (<Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
        footer={null}
        onCancel={()=>{
            setshowAddEditModal(false);
            setSelectedItemForEdit(null);
            }}
      >
        <Form layout="vertical" onFinish={onFinish}
            initialValues={selectedItemForEdit}
        >
          <Form.Item name="period" label="Period">
            <input placeholder="Period" />
          </Form.Item>
          <Form.Item name="company" label="Company">
            <input placeholder="Company" />
          </Form.Item>
          <Form.Item name="title" label="Role">
            <input placeholder="Role" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <input placeholder="Description" />
          </Form.Item>

          <div className="flex justify-end">
            <button
              className="border-primary text-primary px-5 py-2"
              onClick={() => {
                setshowAddEditModal(false);
                setSelectedItemForEdit(null);
              }}
            >
              Cancel
            </button>
            <button className="bg-primary text-white px-5 py-2">
              {selectedItemForEdit ? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </Modal>)
      }
    </div>
  );
};

export default Experiences;
