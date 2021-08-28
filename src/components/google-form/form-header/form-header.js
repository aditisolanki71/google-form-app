import React from "react"
import {  IconButton } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import image from "../../../../src/google-form-logo.png";
import "../../google-form/google-form.css"

function FormHeader() {
   return (
      <div className="form-header-container">
         <div className="form-header-left">
         <img src={image} style={{height:"45px",width:"40px"}}/>
         </div>
         <div className="form-header-right">
            <IconButton target="blank">
               <VisibilityIcon className="form-header-icon" />
            </IconButton>
         </div>
      </div>
   )
}
export default FormHeader;