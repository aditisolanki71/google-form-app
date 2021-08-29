import delay from "redux-saga"
import { takeLatest, put } from "redux-saga/effects"   

//worker saga
function* setQuestionsAsync(data) {
   yield delay(1000);
   //automatic saga pass to reducer
   yield put({type: 'SET_QUESTIONS',value: data});
}

//watcher saga
export function* watchSetQuestions(data) {
   yield takeLatest('SET_QUESTIONS_ASYNC',setQuestionsAsync(data));
}