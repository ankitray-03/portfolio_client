import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form } from "antd";
import { dispatch } from "react";
import axios from "axios";
import {ShowLoading,HideLoading, ReloadData} from "../../redux/rootSlice";
import {message} from 'antd';


const AdminProjects = () => {
  const dispatch = useDispatch();
  const { portFolioData } = useSelector((state) => state.root);
  const { projects } = portFolioData;

  const [showAddEditModal, setshowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type,setType] = useState("add");

  const onFinish = async(values)=>{
    try{
        const tempTechnologies =  values.technologies?.split(",") || [];
        values.technologies = tempTechnologies;
        dispatch(ShowLoading());
        let response
        if(selectedItemForEdit){
            response = await axios.post("/api/portfolio/update-project",{
                ...values,
                _id:selectedItemForEdit._id
            });
        }else{
            response = await axios.post("/api/portfolio/add-project",values);
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
        const response = await axios.post("/api/portfolio/delete-project",{_id:item._id});

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
          Add Project
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1">
        {projects.map((project) => {
          return (
            <div className="shadow border p-5 border-gray-400 flex flex-col gap-5">
              <h1 className="text-primary text-xl font-bold">
                {project.title}
              </h1>
              <hr></hr>
              <img src={project.image} alt="" className="h-60 w-80"/>
              <h1>Role: {project.title}</h1>
              <br />
              <h1>{project.description}</h1>
              <div className="flex justify-end gap-5 mt-5">
                <button className="bg-red-500 text-white px-5 py-2"
                onClick={()=>{
                    onDelete(project);
                }}>
                  Delete
                </button>
                <button className="bg-primary text-white px-5 py-2"
                    onClick={()=>{
                        setSelectedItemForEdit(project);
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
            initialValues={{
                ...selectedItemForEdit,
                technologies:selectedItemForEdit?.technologies?.join(" , "),
                } || {}}
        >
          <Form.Item name="title" label="Title">
            <input placeholder="Title" />
          </Form.Item>
          <Form.Item name="image" label="ImageUrl">
            <input placeholder="ImageUrl" />
          </Form.Item>
          <Form.Item name="technologies" label="Technologies">
            <input placeholder="Technologies" />
          </Form.Item>
          <Form.Item name="link" label="Link">
            <input placeholder="Link" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <textarea placeholder="Description" />
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
              {selectedItemForEdit? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </Modal>)
      }
    </div>
  );
};

export default AdminProjects;
