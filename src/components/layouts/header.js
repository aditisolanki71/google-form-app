import React from "react"
import Button from '@material-ui/core/Button';
import uuid from "react-uuid"
import { useHistory } from "react-router-dom"
function Header() {
   const history = useHistory()
   let total_response = localStorage.getItem('response_array')
   try {
      if(total_response.length > 0)
      {
         total_response = JSON.parse(total_response);
      }
   } catch(e) {
      console.log('err',e)
   }
   if(!total_response) {
      total_response = [];
   }
   
   let formData = localStorage.getItem('form_data')
   const createform = () => {
      const id = uuid()
      history.push("/form/"+id);
   }

   return (
      <div className="header">
         <Button onClick={createform} variant="contained">Add Form</Button>
         <span>total response is {total_response?.length}</span>
      </div>
   )
}
export default Header;