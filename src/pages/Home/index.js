import React from 'react';
import Header from '../../components/Header';
import Intro from './Intro';
import About from './About';
import Experiences from './Experiences';
import Projects from './Projects';
import Contact from './Contact';
import Footer from "./footer";
import LeftSider from './LeftSider';
import { useSelector } from 'react-redux';


const Home = () => {
  const {portFolioData} = useSelector((state)=>state.root);
  return (
    <div >
        <Header/>
        {portFolioData && (<div className='bg-primary px-40 sm:px-5'>
        <Intro/>
        <About/>
        {/* <Experiences/> */}
        <Projects/>
        <Contact/>
        <Footer/>
        <LeftSider/>
        </div>)}
        
    </div>
  )
}

export default Home;
