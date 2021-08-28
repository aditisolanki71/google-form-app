export const initialState = {
   questions:[{questionText: "Question", questionType:"radio", options : [{optionText: "Option 1"}], open: true, required:false}],
   questionType:"radio",
   doc_name:"Untitled form ",
   doc_desc:" add the description "
}

export const actionTypes = {
     SET_QUESTION:"SET_QUESTIONS",
}

const reducer = (state = initialState, action)=>{
   console.log(action);
   switch(action.type){
       case actionTypes.SET_QUESTION : 
           return {
               ...state,
                questions:action.payload.questions,
                // questionType:action.payload.questionType,
                doc_name:action.payload.doc_name,
                doc_desc:action.payload.doc_desc
           };
        default:
           return state;
   }
}

export default reducer;