import { Button, Typography } from '@material-ui/core'
import React ,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector} from "react-redux"
import { useParams } from "react-router";
import "./user-form.css"

const UserForm = () => {
   var quest = [];
   var history = useHistory()

   let { id } = useParams();
   // Store answer in state
   var [answer,setAnswer] = useState([])

   //Fetch Questions ,DocName and DocDescription from Redux
   var questions = useSelector((state) => state.questions)
   var doc_name = useSelector((state) => state.doc_name)
   var doc_desc = useSelector((state) => state.doc_desc)

   useEffect(() => {
      let googleFormData = localStorage.getItem('form_data');
      try {
         if(googleFormData.length > 0) {
            googleFormData = JSON.parse(googleFormData);
         }
      } catch(e) {
         console.log('err',e)
      }
      if(!googleFormData) {
         googleFormData = [];
      }
      const getFormData = googleFormData ? googleFormData.find((g) => g.uuid === id) : ''
      if(getFormData) {
         questions = getFormData.questions;
         doc_name = getFormData.form_name;
         doc_desc =getFormData.form_description;
      }
      questions.map((q)=>{
         answer.push({
            "question": q.questionName,
            "answer" : " "
         })   
      })
      questions.map((q,qindex)=>{
         quest.push({"header": q.questionName, "key": q.questionName })
      })
   },[])

   // handle event for radio type
   const select = (que,option) => {
      var k =answer.findIndex((ele)=>(ele.question == que))
      answer[k].answer=option
      setAnswer(answer)
   }

   // handle event for text type
   const selectinput = (que,option) => {
      var k =answer.findIndex((ele)=>(ele.question == que))
      answer[k].answer=option
      setAnswer(answer)
   }

   // handle event for checkbox type
   const selectcheck = (e,que,option) => {
      var d =[]
      var k =answer.findIndex((ele)=>(ele.question == que))
      if(answer[k].answer) {
         d=answer[k].answer.split(",")
      } if(e == true) {
         d.push(option)
      } else {
         var n=d.findIndex((el)=>(el.option == option))
         d.splice(n,1)
      }
      answer[k].answer=d.join(",")
      setAnswer(answer)
   }

      //submit event
      const submit = () => { 
         //set Answer Data in localstorage
         localStorage.setItem('response_array',JSON.stringify(answer))
         let total_response = localStorage.getItem('response_array')
         try {
            if(total_response.length > 0) {
               total_response = JSON.parse(total_response);
            }
         } catch(e) {
            console.log('err',e)
         }
         if(!total_response) {
            total_response = [];
         }

      //set Response Array data in localstorage
      localStorage.setItem('response_array',JSON.stringify([...total_response,{answer:answer,docname: doc_name,docdesc:doc_desc}]))
      
      //set Response Count NUmber in localstorage
      var response_count = localStorage.getItem('submitted_respose_count')
       if(!response_count) {
         response_count = 0
         localStorage.setItem('submitted_respose_count',parseInt(response_count)+1)
      }
      else {
         localStorage.setItem('submitted_respose_count',parseInt(response_count)+1)
      }
      alert("Your Response has been submitted successfully")

      //After form submit redirect to home page
      history.push(`/`)
   }

   //Cancel click redirect to home page
   const handleCancel = () => {
      history.push("/")
   }
    return (  
      <div className="submit">
        <div className="user-form">
            <div className="user-form-section">
               {/* document name and description */}
                <div className="user-title-section">
                    <Typography style={{fontSize:"26px"}} >{doc_name}</Typography>
                    <Typography style={{fontSize:"15px"}} >{doc_desc}</Typography>
                </div>
                {/* question and option */}
                {
                  questions.map((question,qindex)=>(
                     <div className="user-form-questions">
                        <Typography 
                        style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px",fontSize:"14px"}} >
                           {qindex+1}.  {question.questionName}
                        </Typography>
                        {
                            question.options.map((ques,index)=>(
                              <div key={index} style={{marginBottom:"5px"}}>
                                  <div style={{display: 'flex'}}>
                                    <div className="form-check">
                                       {
                                          question.questionType != "radio" 
                                          ? (question.questionType != 'text' 
                                             ? (<label>
                                                 <input 
                                                   type={question.questionType}
                                                   name={qindex}
                                                   value= {ques.optionName}
                                                   className="form-check-input"
                                                   required={question.required}
                                                   style={{margnLeft:"5px",marginRight:"5px"}}
                                                   onChange={(e)=>{selectcheck(e.target.checked,question.questionName,ques.optionName)}}
                                                />
                                                   {ques.optionName}
                                                </label>)
                                             : (<label>
                                                   <input
                                                      type={question.questionType}
                                                      name={qindex}
                                                      value= {ques.optionName}
                                                      className="form-check-input"
                                                      required={question.required}
                                                      style={{margnLeft:"5px",marginRight:"5px"}}
                                                      onChange={(e)=>{selectinput(question.questionName,e.target.value)}}
                                                   />
                                                      {ques.optionName}
                                                </label>))
                                          :(<label>
                                             <input
                                                type={question.questionType}
                                                name={qindex}
                                                value= {ques.optionName}
                                                className="form-check-input"
                                                required={question.required}
                                                style={{margnLeft:"5px",marginRight:"5px"}}
                                                onChange={(e)=>{select(question.questionName,e.target.value)}}
                                             />
                                                {ques.optionName}
                                          </label>)
                                    }
                              </div>
                           </div>
                        </div>
                     ))
                    }
                  </div>
                ))
         }

            {/* Form Action */}
            <div className="user-form-submit">  
               <Button
                  variant="contained"
                  color="primary"
                  onClick={submit}
                  style={{fontSize:"14px"}}
               >Submit</Button>
               <Button 
                  variant="contained" 
                  color="gray" 
                  onClick={handleCancel} 
                  style={{fontSize:"14px", marginLeft: "10px"}}
               >Cancel</Button>
            </div>  
         </div>
        </div>
      </div>
    )
}

export default UserForm

