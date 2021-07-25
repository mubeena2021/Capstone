import React, { useState, useEffect }  from 'react';
import 'antd/dist/antd.css';
//import { DatePicker, Button } from 'antd';
import { Modal, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';



const { Panel } = Collapse;

  
function Mynav(){
 const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  


return(
<>
<div className={' navBox row bg-dark border border-light justify-content-between p-1'}>
            <h1 className={'nav-item col-4 align-self-center  '}>MyForum</h1>
            <h5 className={'nav-item col-4 align-self-center '}> Welcome! <span onClick={showModal}className={'text-white'}>Login</span></h5>

        <Modal title="LOGIN"  visible={isModalVisible} closable={false} footer={null}>

          <label>Username:</label>
          <input type="text"  className={' form-control p-2 m-2 rounded'} placeholder={'Enter UserName'}></input>
          <label>Password:</label>
          <input  type="text"  className={' form-control p-2 m-2 rounded '} placeholder={'Enter Password'}></input>
          <button className={'Q-btn p-2  m-2 w-100 text-light rounded'}> Register </button>
      
       <div className={'d-flex justify-content-end'}>
       <button className={'Q-btn  align-self-center bg-secondary mx-3 my-2 rounded'} onClick={() =>setIsModalVisible(false)} >Cancel</button>
       <button className={'Q-btn  align-self-center  rounded my-2'} onClick={() =>setIsModalVisible(false)} >Submit</button>
           
           
       </div>
      </Modal>
     
</div>




</>
)};





function Categories(){

  const [categories, setCategories] = useState('');
  const [questions, setQuestions] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [answers, setAnswers] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [txt, setQuestionTxt] = useState('');
  const [txtAnswer, setAnswerText] = useState();


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
  let res = await fetch(`http://localhost:3001/api/categories/${category.id}/questions`)
  let data = await res.json()
  console.log(data)
  setQuestions(data)
};

const switchCategory = async (category) => {
  console.log('selected category is', category)
  setSelectedCategory(category)
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
  let data = await res.json();
  
  fetchQuestions(selectedCategory)
  setQuestionTxt('')
  setShowQuestionForm(false)
};

const createAnswer = async () => {
 console.log('questionTxt', txtAnswer)
 console.log('question id is', selectedQuestion.id)
 console.log(selectedQuestion.id) ;

let res = await fetch(`http://localhost:3001/api//questions/${selectedQuestion.id}/answers`, {
    method: 'POST',
     headers: {
       'Content-Type': 'application/json'
    },
     body: JSON.stringify({answerTxt: txtAnswer})
  })
 let data = await res.json();
  
  setAnswerText('')
  setShowAnswerForm(false) 
  fetchAnswersForQuestion(selectedQuestion)
 };



const fetchAnswersForQuestion = async (question) => {
 console.log('fetch the answers for the question ', question)
 console.log(`http://localhost:3001/api/questions/${question.id}/answers`)
 let res = await fetch(`http://localhost:3001/api/questions/${question.id}/answers`)
  let data = await res.json()
  console.log(data)
  setAnswers({...answers, [question.id]: data})
};


const onPanelChange = async (questionId) => {
  console.log(questionId)
let q ;
 questions.map((question) => { 
     if(question.id == questionId){
      q = question;
   }   
 })
 setSelectedQuestion(q)
 fetchAnswersForQuestion(q)
 console.log('clicked panel')
};
  


return(
<>
<div className={'container categoryBox d-flex flex-column border border-light bg-dark p-3'}> 
{categories && categories.map((data, key) => {  
  return <section className={(selectedCategory && (selectedCategory.id == data.id)) ? 'text-warning p-3 m-1 rounded':'category-box p-3 m-1 rounded'} key={key.id} onClick={() => switchCategory(data)}> 
          {data.name}
         </section>
         }       
     )}
</div>

<div className={'container d-flex flex-column justify-content-start border border-light bg-secondary p-4'}> 

{selectedCategory && <button className={"Q-btn align-self-center w-50 rounded"} onClick={() => setShowQuestionForm(true)}> New Question </button>
}

<Modal 
title="Question" visible={showQuestionForm} closable={false} footer={null}> 
<textarea 
      value={txt}
      onChange={(ev) => setQuestionTxt(ev.currentTarget.value)}
      type="text"
      rows={5}
      className={' p-2 border border-dark bg-dark text-white w-100 '}
       placeholder={'Enter question here...'}/>
       <div className={'d-flex justify-content-end'}>
       <button className={'Q-btn bg-secondary mx-3 my-2 rounded'} onClick={() => setShowQuestionForm(false)}>Cancel</button>
       <button className={'Q-btn rounded my-2'} onClick={createQuestion}>Submit Question</button>

       </div>
</Modal>

{selectedCategory ? <h5 className={'text-center p-2 '}>
  Questions</h5> : <h5 className={'text-center p-2 text-dark'}>Select a Category to continue</h5>}


  {selectedCategory && questions && questions.length>0 && <div className={'w-100 border border-dark'}>
    <Collapse 
     accordion
     expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
     className="p-1 m-1" onChange={onPanelChange}>
      {questions && questions.map((question) => {
    return <Panel  header={question.questionTxt} key={question.id}> 
    
          <ol> {answers && answers[question.id] && answers[question.id].map((answer) => {
                      return  <li className={'answerBox p-2 m-1'} key={answer.id}>{answer.answerTxt}</li>
                                    })} 
                                     </ol>                                 
      {selectedQuestion && <button className={'Q-btn justify-content-end rounded'} onClick={() => setShowAnswerForm(true)}>New Answer</button>
         }
 
  <Modal 
    title="Answer" visible={showAnswerForm} closable={false} footer={null}> 
    <textarea 
      value={txtAnswer}
      onChange={(ev) => setAnswerText(ev.currentTarget.value)}
      type="text"
      rows={5}
      className={' p-2 border border-dark bg-dark text-white w-100 '}
      placeholder={'Write answer here...'}/>
      <div className={'d-flex justify-content-end'}>
      <button className={'Q-btn bg-secondary mx-3 my-2 rounded'} onClick={() => setShowAnswerForm(false)}>Cancel</button>
      <button className={'Q-btn rounded my-2'} onClick={createAnswer}>Submit Answer</button>
       </div>
   </Modal>          

   </Panel> 
       })}
    </Collapse>
</div>}

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
