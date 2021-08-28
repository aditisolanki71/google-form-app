import React from "react"
import Button from '@material-ui/core/Button';
import uuid from "react-uuid"
import { useHistory } from "react-router-dom"
function Header() {
   const history = useHistory()

   const createform = () => {
      const id = uuid()
      history.push("/form/"+id);
   }

   return (
      <div className="header">
         <Button onClick={createform} variant="contained">Add Form</Button>
      </div>
   )
}
export default Header;