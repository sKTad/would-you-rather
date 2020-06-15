import { RECEIVE_USERS, UPDATE_USERQUESTION, UPDATE_USERANSWER } from '../actions/users'

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case UPDATE_USERQUESTION:
      const author = action.question.author
      const questionid = action.question.id
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([questionid])
        }
      }
    case UPDATE_USERANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      }
    default:
      return state
  }
}