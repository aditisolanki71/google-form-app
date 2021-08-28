import React,{useState} from "react"
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function FormTabs() {
   const [value, setValue] = React.useState(0);
   const handleChange = (event, newValue) => {
      setValue(newValue);
    };
      return (
         <div>
            <Paper square>
               <Tabs
               centered
               value={value}
               indicatorColor="primary"
               textColor="primary"
               onChange={handleChange}
               aria-label="disabled tabs example"
               >
                  <Tab label="Create your own Form" />
                  {/* <Tab label="Responses" disabled /> */}
               </Tabs>
            </Paper>
         </div>
      )
}
export default FormTabs;