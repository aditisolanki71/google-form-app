import React,{useState,useEffect} from 'react'
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
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import ShortTextIcon from '@material-ui/icons/ShortText';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import Switch from '@material-ui/core/Switch';
import {BsTrash} from "react-icons/bs"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
 import './questions-form.css'
function QuestionForm() {
   const [questions,setQuestions] =useState([
      {
         questionName: "what is your name",
         questionType: "radio",
         options: [
               {optionName: "name1"},
               {optionName: "name2"},
               {optionName: "name3"}],
         open:true,
         required:false,
         answer:false,
         answerKey:"",
         point:0
      },
      {
         questionName: "what are you from",
         questionType: "radio",
         options: [
            {optionName: "city1"},
            {optionName: "city2"},
            {optionName: "city3"}],
         open:true,
         required:false
      }]
   ); 

   /*User change question Title  at the time of creation*/
   const handleQuestionValue = (que,i) => {
      setQuestions([...questions],questions[i].questionName = que)

   }

   /*User change question Type at the time of creation*/
   const handleQuestionType = (i,type) => {
      setQuestions([...questions],questions[i].questionType  = type)
   }

    /*User change Option Name at the time of creation*/
   const handleOptionValue = (option,que_index,opt_index) => {
      var optionQuestion = [...questions];
      optionQuestion[que_index].options[opt_index].optionName = option
      setQuestions(optionQuestion);
   }

   function removeOption(que_index, opt_index){
      var optionsOfQuestion = [...questions];
      if(optionsOfQuestion[que_index].options.length > 1)
      {
        optionsOfQuestion[que_index].options.splice(opt_index, 1);
        setQuestions(optionsOfQuestion)
      }   
    }
  
    //max 5 option
   function addOption(que_index){
      var optionsOfQuestion = [...questions];
      if(optionsOfQuestion[que_index].options.length < 5)
      {
        optionsOfQuestion[que_index].options.push({optionName: "Option " + (optionsOfQuestion[que_index].options.length + 1)})
      }
      setQuestions(optionsOfQuestion)
    }

   const copyQuestion = (que_index) => {
      let qs = [...questions]
      var newQuestion = qs[que_index]
      setQuestions([...questions, newQuestion])
   }

   const deleteQuestion = (que_index) => {
      let qs = [...questions]; 
        if(questions.length > 1){
          qs.splice(que_index, 1);
        }
        setQuestions(qs)
   }

   const requiredQuestion = (que_index) => {
      var requiredQuestion = [...questions];
      requiredQuestion[que_index].required =  ! requiredQuestion[que_index].required
      setQuestions(requiredQuestion)
   }

   function addMoreQuestionField(){
      setQuestions(questions => [...questions, {
            questionName: "Question",
            questionType:"radio", 
            options : [{optionName: "Option 1"}], 
            open: true, 
            required:false
         }]);
      }

      // const addAnswer = (i) => {
      //    var answerOfQuestion = [...questions];
      //    answerOfQuestion[i].answer= !answerOfQuestion[i].answer;
      //    setQuestions(answerOfQuestion)
      //  }
  
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
                        <Typography
                         style={{fontSize:"15px",fontWeight:"400",lineHeight:'24px',paddingBottom:"8px"}} 
                         >
                           {i+1}.  {q.questionName}
                         </Typography>
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
                                    <Typography 
                                       style={{
                                       fontFamily:' Roboto,Arial,sans-serif',
                                       // fontSize:' 13px',
                                       // fontWeight: '400',
                                       // letterSpacing: '.2px',
                                       // lineHeight: '20px',
                                       // color: '#202124'
                                       }}>
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
                     <input 
                        type="text"
                        className="question"
                        placeholder="Question"
                        value={q.questionName}
                        onChange={(e)=>{handleQuestionValue(e.target.value, i)}}
                     />
                        <CropOriginalIcon style={{color:'gray'}} />
                        {/* question type dropdown */}
                           <Select className="select" style={{color:"gray",fontSize:"10px"}} >
                              <MenuItem 
                                 id="text" 
                                 value="Text" 
                                 onClick= {()=>{handleQuestionType(i,"text")}}> 
                                    <SubjectIcon className="paragraph-item" />
                                       Text
                              </MenuItem>
                              <MenuItem 
                                 id="checkbox"  
                                 value="Checkbox" 
                                 onClick= {()=>{handleQuestionType(i,"checkbox")}}>
                                    <CheckBoxIcon className="checkbox-item" checked /> 
                                       Checkbox
                              </MenuItem>
                              <MenuItem 
                                 id="radio" 
                                 value="Radio" 
                                 onClick= {()=>{handleQuestionType(i,"radio")}}> 
                                    <Radio style={{marginRight:"8px",color:"#70757a"}}  checked/> 
                                       Radio
                              </MenuItem>
                           </Select>
                  </div>   
                  {q.options.map((op, j)=>(
                     <div className="add-question-body" key={j}>
                     {/* question type */}
                        {(q.questionType!="text") 
                           ? <input
                              type={q.questionType}  
                              // style={{marginRight:"10px"}}
                              className="quesion-body-type"
                              /> 
                           : <ShortTextIcon
                           //  style={{marginRight:"10px"}}
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
                              onChange={(e)=>{handleOptionValue(e.target.value, i, j)}}
                           />
                        </div>
                        {/* <CropOriginalIcon style={{color:"#5f6368"}}/> */}
                           <IconButton aria-label="delete" onClick={()=>{removeOption(i, j)}}>
                              <CloseIcon />
                           </IconButton>
                     </div>
                  ))}

                  {/* you can not add more than 4 option */}
                  {q.options.length < 5 ? (
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
                                 // style={{marginRight:"10px"}} 
                                 className="quesion-body-type"
                              />
                           }
                           label={<div>
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
                           }
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
                     <div className="add-question-bottom">
                        <IconButton aria-label="Copy" onClick={()=>{copyQuestion(i)}}>
                              <FilterNoneIcon/>
                        </IconButton>
                        <IconButton aria-label="delete" onClick={()=>{deleteQuestion(i)}}>
                               <BsTrash />
                        </IconButton>
                        <span 
                           // style={{color:"#5f6368",fontSize:"13px"}}
                           className="required-btn"
                           >
                           Required </span> 
                           <Switch 
                              name="checkedA" 
                              color="primary"
                              checked={q.required}
                              onClick={()=>{requiredQuestion(i)}}
                              />
                           <IconButton>
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
         <div className="question-form-top">
             <input type="text"
               className="question-form-top-name"
               style={{color:"black"}}
               placeholder="Form Name"
               //placeholder={documentName}
               // value={documentName}
               // onChange={(e)=>{setDocName(e.target.value)}}
            />
             <input type="text" 
               className="question-form-top-desc" 
               placeholder="Form Description" 
               //placeholder={documentDescription} 
               // value={documentDescription} 
               // onChange={(e)=>{setDocDesc(e.target.value)}} 
            />
         </div>
      </div>
      {question()}
      </div>
      </div>
      </div>
   )
}
export default QuestionForm;