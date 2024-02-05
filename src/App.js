import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import { useState} from 'react';
import axios from "axios";
import Loader from './components/Loader';
import { useEffect } from 'react';

import {useDispatch, useSelector} from "react-redux";
import { HideLoading, SetPortFolioData, ShowLoading,ReloadData } from './redux/rootSlice';
import Admin from './pages/Admin';
import Login from './pages/Admin/Login';

function App() {
  const {loading,portFolioData,reloadData} = useSelector((state)=>state.root);
  const dispatch = useDispatch();

  const getPortFolioData = async()=>{
    try{
        dispatch(ShowLoading());
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/portfolio/get-portfolio-data`);
        dispatch(SetPortFolioData(response.data));
        dispatch(ReloadData(false));
        dispatch(HideLoading());
    }catch(error){
      dispatch(HideLoading());
    }
  }

  useEffect(() => {
    if(!portFolioData){
      getPortFolioData();
    } 
  },[portFolioData]);

  useEffect(()=>{
    if(reloadData){
      getPortFolioData();
    }
  },[reloadData])


  return (
    <BrowserRouter>
    {loading? <Loader/> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
