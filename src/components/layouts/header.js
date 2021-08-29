import React from "react"
import Button from '@material-ui/core/Button';
import uuid from "react-uuid"
import { useHistory } from "react-router-dom"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import {  IconButton } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import "./header.css"
const StyledTableCell = withStyles((theme) => ({
   head: {
     backgroundColor: theme.palette.common.black,
     color: theme.palette.common.white,
   },
   body: {
     fontSize: 14,
   },
 }))(TableCell);
 
 const StyledTableRow = withStyles((theme) => ({
   root: {
     '&:nth-of-type(odd)': {
       backgroundColor: theme.palette.action.hover,
     },
   },
 }))(TableRow);

const useStyles = makeStyles({
   table: {
     minWidth: 650,
   },
 });
 
const Header = () =>  {
   const classes = useStyles();
   const history = useHistory()
   
   // Get Data from localstorage instead
   let formData = localStorage.getItem('form_data')
   try {
      if(formData.length > 0) {
         formData = JSON.parse(formData);
      }
   } catch(e) {
      console.log('err',e)
   }
   if(!formData) {
      formData = [];
   }

   const handleView = (data) => {
      history.push(`/form/${data.uuid}`)
   }
   // Get Submitted Response Count from localstorage
   let submiitedResponseCount = localStorage.getItem('submitted_respose_count')
   const createform = () => {
      const id = uuid()
      history.push("/form/"+id);
   }
   
   return (
      <div>
         <div className="header">
            <Button variant="contained" style={{marginRight: '10px'}}>Total Submitted Response is : {submiitedResponseCount || 0 }</Button>
            <Button variant="contained" style={{marginRight: '10px'}}>Total Response is : {formData && formData.length}</Button>
            <Button onClick={createform} variant="contained" color="primary">Add Form</Button>
         </div>
         {/* Display Table of User Form*/}
         <div className="table-container">
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
            <TableHead>
               <TableRow>
                  <StyledTableCell>UUID</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell> 
               </TableRow>
            </TableHead>
            <TableBody>
               {formData.map((row) => (
                  <StyledTableRow key={row.uuid}>
                  <StyledTableCell component="th" scope="row">
                     {row.uuid}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                     {row.form_name}
                  </StyledTableCell>
                  <StyledTableCell>{row.form_description}</StyledTableCell>
                  <StyledTableCell>
                     <IconButton target="blank" onClick={() => handleView(row)}>
                        <VisibilityIcon className="form-header-icon" />
                     </IconButton>
                     </StyledTableCell>
                  </StyledTableRow>
               ))}
            </TableBody>
            </Table>
         </TableContainer>
         </div>
      </div>
   )
}
export default Header;