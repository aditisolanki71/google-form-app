import React from "react"
import FormHeader from './form-header/form-header'
import FormTabs from "./form-tab/form-tabs"
import QuestionForm from './questions/question-form';
function GoogleForm() {
   return (
      <div> 
         <FormHeader />
         <FormTabs/>
         <QuestionForm/>
      </div>
   )
}
export default GoogleForm;