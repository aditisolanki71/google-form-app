import delay from "redux-saga"
import { takeEvery, put } from "redux-saga/effects"   

//worker saga
function* setQuestionsAsync(data) {
   yield delay(1000);
   //automatic saga pass to reducer
   yield put({type: 'SET_QUESTIONS',value: data});
}

//watcher saga
export function* watchSetQuestions(data) {
   yield takeEvery('SET_QUESTIONS_ASYNC',setQuestionsAsync(data));
}