export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USERQUESTION = 'UPDATE_USERQUESTION'
export const UPDATE_USERANSWER = 'UPDATE_USERANSWER'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function updateUserQuestion(question) {
  return {
    type: UPDATE_USERQUESTION,
    question
  }
}

export function updateUserAnswer({ authedUser, qid, answer}){
  return{
    type: UPDATE_USERANSWER,
    authedUser,
    qid,
    answer
  }
}

