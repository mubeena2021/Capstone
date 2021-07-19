import React, { useState }  from 'react';
import Content1 from "./Content1";
import Content2 from "./Content2";
import Content3 from "./Content3";
import Content4 from "./Content4";
import Content5 from "./Content5";


import 'antd/dist/antd.css';
import { DatePicker, Button } from 'antd';
import { Modal, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const { Panel } = Collapse;


function Mynav(){
return(
<>
<div className={' navBox row bg-dark border border-light justify-content-between p-1'}>
            <h1 className={'nav-item col-4 align-self-center '}>MyForum</h1>
            <h4 className={'nav-item col-4 align-self-center text-white '}> Welcome! Login</h4>
</div>
</>
)};



function Categories(){
return(
<>
<div className={'container categoryBox d-flex flex-column bg-dark p-3'}> 
<a href="/Content1" className={'category-box text-decoration-none p-3 m-1 rounded'}> Category 1 </a>
<a href="/Content2" className={' category-box text-decoration-none p-3 m-1 rounded'}> Category 2 </a>
<a href="/Content3" className={' category-box text-decoration-none p-3 m-1 rounded'}> Category 3 </a>
<a href="/Content4" className={'category-box text-decoration-none p-3 m-1 rounded'}> Category 4 </a>
<a href="/Content5"className={' category-box text-decoration-none p-3 m-1 rounded'}> Category 5 </a>
</div>
</>

)};

  


function App() {

  return (
    
    <Router>
    <Mynav/>
    <Switch>
    <div className={' Mainbox d-flex '}>

    <Categories/>
    
    <Route path="/Content1" component={Content1} />
    <Route path="/Content2" component={Content2} />
    <Route path="/Content3" component={Content3} />
    <Route path="/Content4" component={Content4} />
    <Route path="/Content5" component={Content5} />

    </div>
    </Switch>

    </Router>
    
  )};
  


export default App;
