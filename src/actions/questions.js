import { saveQuestion, saveAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { updateUserQuestion, updateUserAnswer } from './users'

export const ADD_QUESTION = 'ADD_QUESTION'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const UPDATE_VOTE = 'UPDATE_VOTE'

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function updateVote(authedUser, qid, answer){
  return{
    type : UPDATE_VOTE,
    authedUser,
    qid,
    answer
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      author: authedUser,
      optionTwoText
    })
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(updateUserQuestion(question))
      })
      .then(() => dispatch(hideLoading()))
  }
}

export function handleSaveAnswer(authedUser, qid, answer){
   return (dispatch, getState) => {
   dispatch(showLoading())
   
    return saveAnswer({
      authedUser,
      qid,
      answer
    })
    .then(() => { 
      dispatch(updateUserAnswer({authedUser, qid, answer}))
      dispatch(updateVote(authedUser, qid, answer))
    })
    .then(() => dispatch(hideLoading()))
  }
}