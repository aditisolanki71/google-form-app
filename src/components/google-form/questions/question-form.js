import React,{useState, useEffect} from 'react'
import { Accordion } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import SubjectIcon from '@material-ui/icons/Subject';
import ShortTextIcon from '@material-ui/icons/ShortText';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FormControl from '@material-ui/core/FormControl';
import Modal from '@material-ui/core/Modal';
import { useDispatch} from "react-redux"
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';
import {BsTrash} from "react-icons/bs"
import uuid from "react-uuid"
import './questions-form.css'

function QuestionForm() {

   var history = useHistory()
   const dispatch = useDispatch()

   // Take questions ,Document Name and Document Description in state
   const [questions,setQuestions] =useState([]); 
   const [documentName,setDocName] =useState("Add Document Name"); 
   const [documentDescription,setDocDesc] =useState("Add Description"); 
   const [open,setOpen] = useState(false)

   let { id } = useParams();
   
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
         setQuestions(getFormData.questions)
         setDocName(getFormData.form_name)
         setDocDesc(getFormData.form_description)
      }
   },[])
   /*User change question Title  at the time of creation*/
   const handleQuestionValue = (que,i) => {
      setQuestions([...questions],questions[i].questionName = que)
   }

   /*User change question Type at the time of creation*/
   const handleQuestionType = (i,type) => {
      setQuestions([...questions],questions[i].questionType  = type)
      if(type === 'text') {
         var que = [...questions];
         que[i].options.length = 1; 
         setQuestions(que);
      }
   }

    /*User change Option Name at the time of creation*/
   const handleOptionValue = (option,que_index,opt_index,que_type) => {
      var optionQuestion = [...questions];
      if(que_type == 'text') {
         optionQuestion[que_index].options[0].optionName = option
      } else {
         optionQuestion[que_index].options[opt_index].optionName = option
      }
      setQuestions(optionQuestion);
   }

   // User can remove Option when click on cross icon
   const removeOption = (que_index, opt_index) => {
      var optionsOfQuestion = [...questions];
      if(optionsOfQuestion[que_index].options.length > 1) {
        optionsOfQuestion[que_index].options.splice(opt_index, 1);
        setQuestions(optionsOfQuestion)
      }   
    }
  
    //User can add till max 5 option
   const addOption = (que_index) => {
      var optionsOfQuestion = [...questions];
      if(optionsOfQuestion[que_index].options.length < 5) {
        optionsOfQuestion[que_index].options.push({optionName: "Option " + (optionsOfQuestion[que_index].options.length + 1)})
      }
      setQuestions(optionsOfQuestion)
    }

   // User Can create copy of question 
   const copyQuestion = (que_index) => {
      let qs = [...questions]
      var newQuestion = qs[que_index]
      setQuestions([...questions, newQuestion])
   }

   // User can delete whole question box
   const deleteQuestion = (que_index) => {
      let qs = [...questions]; 
        if(questions.length > 1){
          qs.splice(que_index, 1);
        }
        setQuestions(qs)
   }

   // User can add whole question box and here set default value
   const addMoreQuestionField = () => {
      setQuestions(questions => [...questions, {
            questionName: "Add Question",
            questionType: "radio", 
            options : [{optionName: "Enter Option"}], 
            open: true, 
            required:false
         }]);
      }

      // const addAnswer = (i) => {
      //    var answerOfQuestion = [...questions];
      //    answerOfQuestion[i].answer= !answerOfQuestion[i].answer;
      //    setQuestions(answerOfQuestion)
      //  }
  
      // When user click on save ,dispatch SET_QUESTIONS_ASYNC
      const handleSave = () => {
          dispatch({
           type: 'SET_QUESTIONS_ASYNC',
            payload : {
               questions:questions,
               doc_name:documentName,
               doc_desc:documentDescription
            }
          })

          // Store FormName ,Description and uuid in localstorage that is used in home page for list
          let getData = localStorage.getItem('form_data')
          try {
            if(getData.length > 0) {
               getData = JSON.parse(getData);
            }
         } catch(e) {
            console.log('err',e)
         }
         if(!getData) {
            getData = [];
         }
   
          localStorage.setItem('form_data',JSON.stringify([...getData,{uuid:uuid(),
                                                            form_name:documentName,
                                                            form_description:documentDescription,
                                                            questions:questions
                                                         }]))
         setOpen(true);
         alert(`Your Form has been designed Copy this link to view form :- http://localhost:3000/form/${id}`)

         //After Designed Form redirect ro response page so that user get main question form
         history.push(`/response/${id}`)
      }

      //On click of Cancel user redirect to home page
      const handleCancel = () => {
         history.push("/")
      }

      // Question Box
      const question = () => {
         return questions && questions.map((q,i) => (
            <Accordion 
               expanded={q.open}
               className={q.open ? 'add border' : ''}
            >
            {/* question view part */}
             <AccordionSummary
                  aria-controls="panel1a-content"
                    id="panel1a-header"
                    elevation={1} 
                    style={{width:'100%'}}
                  >
                    {questions && !questions[i].open ? (
                        <div className="saved-questions">
                        {/* Question Name */}
                        <Typography
                         style={{fontSize:"15px",fontWeight:"400",lineHeight:'24px',paddingBottom:"8px"}} 
                         >
                           {i+1}.  {q.questionName}
                         </Typography>
                         {/* Question Option */}
                           {q.options.map((op,j) => (
                              <div key={j}>
                               <div style={{display: 'flex',}}>
                                 <FormControlLabel 
                                    style={{marginLeft:"5px",marginBottom:"5px"}}
                                    disabled 
                                    control={
                                       <input 
                                          type={q.questionType} 
                                          color="primary"
                                          style={{marginRight: '3px', }} 
                                          required={q.type}
                                          />}
                                    label={
                                    <Typography>
                                       {q.options[j].optionName}
                                    </Typography>
                                    } 
                                 />
                              </div>
                              </div>
                           ))}
                        </div>
                  ): ""}
            </AccordionSummary>
            {/* question create part */}
            <div className="question-boxes"> 
               <AccordionDetails className="add-question">
                  <div className="add-question-top">
                     {/* Question Name */}
                     <input 
                        type="text"
                        className="question"
                        placeholder="Question"
                        value={q.questionName}
                        onChange={(e)=>{handleQuestionValue(e.target.value, i)}}
                     />
                        {/* question type dropdown */}
                        <FormControl>
                           <Select
                             value={q.questionType} 
                              className="select"
                              style={{color:"gray",fontSize:"20px"}} 
                           >
                              <MenuItem 
                                 id="text" 
                                 value="text" 
                                 onClick= {()=>{handleQuestionType(i,"text")}}> 
                                    <SubjectIcon className="paragraph-item" />
                                       Text
                              </MenuItem>
                              <MenuItem 
                                 id="checkbox"  
                                 value="checkbox" 
                                 onClick= {()=>{handleQuestionType(i,"checkbox")}}>
                                    <CheckBoxIcon className="checkbox-item" checked /> 
                                       Checkbox
                              </MenuItem>
                              <MenuItem 
                                 id="radio" 
                                 value="radio" 
                                 onClick= {()=>{handleQuestionType(i,"radio")}}> 
                                    <Radio style={{marginRight:"8px",color:"#70757a"}}  checked/> 
                                       Radio
                              </MenuItem>
                           </Select>
                     </FormControl>
                  </div>   
                  {/* Options of Questions */}
                  {q.options.map((op, j)=>(
                     <div className="add-question-body" key={j}>
                     {/* question type */}
                        {(q.questionType!="text") 
                           ? <input
                              type={q.questionType}  
                              className="quesion-body-type"
                              /> 
                           : <ShortTextIcon
                            className="quesion-body-type"
                            />
                        }
                        {/* question option */}
                        <div>
                           <input 
                              type="text"
                              className="text-input"
                              placeholder="option"
                              value={q.options[j].optionName}
                              onChange={(e)=>{handleOptionValue(e.target.value, i, j,q.questionType)}}
                           />
                        </div>
                        {/* Delete Option icon */}
                           <IconButton aria-label="delete" onClick={()=>{removeOption(i, j)}}>
                              <CloseIcon />
                           </IconButton>
                     </div>
                  ))}

                  {/* you can not add more than 4 option */}
                  {q.options.length < 5 && q.questionType != "text" ? (
                     <div className="add-question-body">
                        <FormControlLabel 
                           disabled 
                           control={(q.questionType!="text")
                           ? <input 
                                    type={q.questionType} 
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    style={{marginLeft:"10px",marginRight:"10px"}}
                                    disabled
                              /> 
                           : <ShortTextIcon 
                                 className="quesion-body-type"
                              />
                           }
                           label={(<div>
                                 <input 
                                    type="text" 
                                    className="text-input" 
                                     style={{fontSize:"13px",width:"60px"}}
                                    //className="add-option-input" 
                                    placeholder="Add other"
                                 />
                                 <Button
                                    size="small" 
                                    onClick={()=>{addOption(i)}} 
                                     style={{textTransform: 'none',color:"blue",fontSize:"14px",fontWeight:"600"}}
                                    //  className="add-option-btn"
                                    >
                                       Add Option
                                 </Button>
                              </div>
                        )}
                        /> 
                     </div>)
                     : ""}

                  {/* question footer */}
                  <div className="add-footer">
                     {/* <div className="add-question-bottom-left">
                        <Button 
                           size="small"  
                           onClick={()=>{addAnswer(i)}} 
                           style={{textTransform: 'none',color:"#4285f4",fontSize:"13px",fontWeight:"600"}}>
                              <FcRightUp style={{border:"2px solid #4285f4", padding:"2px",marginRight:"8px"}} />
                                 Answer key
                        </Button>
                     </div> */}

                     {/* Copy and Delete Question Option */}
                     <div className="add-question-bottom">
                        <IconButton aria-label="Copy" onClick={()=>{copyQuestion(i)}}>
                              <FilterNoneIcon/>
                        </IconButton>
                        <IconButton aria-label="delete" onClick={()=>{deleteQuestion(i)}}>
                               <BsTrash />
                        </IconButton>
                     </div>
                  </div>

               </AccordionDetails> 
                  {/* Add question Box*/}
                  <div className="question-edit">
                     <AddCircleOutlineIcon onClick={addMoreQuestionField} className="edit"/>
                  </div>
            </div>
         </Accordion>
      ))
   }
   return (
      <div class="question-form-container">
      <div className="question-form">
      <br></br>
      <div className="section">
      <div className="question-title-section">

      {/* Document Name and Document Description Form Input */}
         <div className="question-form-top">
             <input type="text"
               className="question-form-top-name"
               style={{color:"black"}}
               placeholder="Form Name"
               placeholder={documentName}
               value={documentName}
               onChange={(e)=>{setDocName(e.target.value)}}
            />
             <input type="text" 
               className="question-form-top-desc" 
               placeholder="Form Description" 
               placeholder={documentDescription} 
               value={documentDescription} 
               onChange={(e)=>{setDocDesc(e.target.value)}} 
            />
         </div>
      </div>

      {/* Default Add question Box icon */}
      <div className="question-edit">
         {questions && questions.length < 1 ? (
            <div class="default-add-question" onClick={addMoreQuestionField}>
               <AddCircleOutlineIcon className="edit" />
               <span className="text">Add</span>
            </div>)
            : ''}
      </div>
      {/* Questions Box */}
      {question()}

      {/* Form Action */}
      <div className="save-form">
            <Button 
               variant="contained" 
               color="primary" 
               onClick={handleSave} 
               style={{fontSize:"14px"}}
               disabled={questions && questions.length < 1}
            >
            Save
            </Button>
            <Button 
               variant="contained" 
               color="gray" 
               onClick={handleCancel} 
               style={{fontSize:"14px", marginLeft: "10px"}}
            >
            back
            </Button>
      </div>
      </div>
      </div>
      </div>
   )
}
export default QuestionForm;