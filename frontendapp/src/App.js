import React, { useState, useEffect }  from 'react';
import 'antd/dist/antd.css';
//import { DatePicker, Button } from 'antd';
import { Modal, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';



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

  const [categories, setCategories] = useState('');
  const [questions, setQuestions] = useState();
  const [selectedCategory, setSelectedCategory] = useState('');

  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [txt, setQuestionTxt] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);


  const fetchCategories = async () => {
    let res = await fetch('http://localhost:3001/api/categories');
    let data = await res.json()
    setCategories(data);
    console.log(data)
};

useEffect(() => {
  console.log('runs only once when app is started ')
  fetchCategories()
}, [])



const fetchQuestions = async (category) => {
 // console.log(category)
  // write code here to make a fetch call to get ALL the questions where cateogry id = category.id
  // once fetched, write code to display it on the UI
  let res = await fetch(`http://localhost:3001/api/categories/${category.id}/questions`)
  let data = await res.json()
  console.log(data)
  setQuestions(data)
};
const switchCategory = async (category) => {
  console.log('selected category is', category)
  setSelectedCategory(category)
  // write code here to fetch the questions for the selected category
  fetchQuestions(category)
};

const createQuestion = async () => {
 console.log('questionTxt', txt)
  console.log('selectedCategory', selectedCategory)
  let res = await fetch(`http://localhost:3001/api/categories/${selectedCategory.id}/questions`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({questionTxt: txt})
  })
  let data = await res.json()
  fetchQuestions(selectedCategory)
  setQuestionTxt('')
  setShowQuestionForm(false)
};
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    createQuestion();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



return(

<>

<div className={'container categoryBox d-flex flex-column bg-dark p-2 '}> 

{categories && categories.map((data, key) => {  
  return <section className={(selectedCategory && (selectedCategory.id == data.id)) ? ' text-warning p-3 m-1 rounded': 'category-box p-3 m-1 rounded'} key={key.id}  onClick={() => switchCategory(data)}> 
          {data.name}
         </section>
         }       
     )}
</div>



<div className={ ' container d-flex flex-column justify-content-start w-50 bg-secondary p-1 '}> 

<button className={" align-self-center btn btn-info w-50 rounded"}type="primary" onClick={showModal} > 
New Question 
</button>


<Modal className={'p-2 bg-secondary'} 
title="Question" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} > 
<textarea 
      value={txt}
      onChange={(ev) => setQuestionTxt(ev.currentTarget.value)}
      type="text"
      rows={5}
      className={' p-2 border border-dark bg-dark text-white w-100 '}
       placeholder={'Enter question here...'}/>

</Modal>


{selectedCategory ? <h5 className={'text-center '}>
  Questions</h5> : <h5 className={'text-center  text-dark'}>Select a Category to continue</h5>}
 
  <p>{JSON.stringify(selectedQuestion)}</p>

<Collapse
      bordered={true}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      className=" m-3 site-collapse-custom-collapse"
    >
      <Panel header="This is panel header 1" key="1" className="site-collapse-custom-panel border border-dark">
        <p className={''}>answer </p>
      </Panel>
      <Panel header="This is panel header 2" key="2" className="site-collapse-custom-panel">
        <p></p>
      </Panel>
      <Panel header="This is panel header 3" key="3" className="site-collapse-custom-panel">
        <p></p>
      </Panel>
  </Collapse>




  </div>

</>
)};

  



  






 







function App() {

  return (
    
   <>
    <Mynav/>

    <div className={' Mainbox d-flex '}>

    <Categories/>
   
   
    </div>
   </>
  )};
  


export default App;
