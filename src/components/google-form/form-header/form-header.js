import React from "react"
import {  IconButton } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router";
import image from "../../../../src/google-form-logo.png";
import "../../google-form/google-form.css"

function FormHeader() {
   const history = useHistory();
   let { id } = useParams();

   // Form Submit than navigate to view question page
   const navigates = () => {
      history.push(`/response/${id}`)
  }
   return (
      // Header of Google Form Design
      <div className="form-header-container">
         <div className="form-header-left">
         <img src={image} style={{height:"45px",width:"40px"}}/>
         </div>
         {/* Once Form Design is done User Can view Question List */}
         <div className="form-header-right">
            <IconButton target="blank" onClick={navigates}>
               <VisibilityIcon className="form-header-icon" />
            </IconButton>
         </div>
      </div>
   )
}
export default FormHeader;