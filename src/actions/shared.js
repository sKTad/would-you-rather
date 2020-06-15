import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { showLoading, hideLoading } from 'react-redux-loading'
import { setAuthedUser } from './authedUser'
import { receiveQuestions } from './questions'

const AUTHED_ID = null

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({users, questions}) => {
        dispatch(hideLoading())
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
      })
  }
}