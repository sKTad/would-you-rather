import React from 'react'
import { connect } from 'react-redux'
import { handleSaveAnswer } from '../actions/questions'
import ResultDetails from './ResultDetails'
import SignIn from './SignIn'
import Error from './Error'

class QuestionResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            answer: 'optionOne'
        }
    }
    setAnswer = (e) => {
        this.setState({
            answer: e.target.value
        })
    }
    submitAnswer = () => {
        this.props.dispatch(handleSaveAnswer(this.props.authedUser, this.props.id, this.state.answer))
    }
    render() {
        const { authedUser, userName, avatarURL, optionOne, optionTwo, optionOneVotes, optionTwoVotes,
            totalVotes, authedUseroptionOneVoted, answered, notFound } = this.props

        return (
            <div>
                {authedUser === null ?
                    <SignIn />
                    :
                    notFound ?
                        <Error />
                        :
                        <div>
                            {answered ?
                                <div className='question-answered'>
                                    <div className='question-user'>
                                        Asked by {userName}
                                    </div>
                                    <div className='answered-content'>
                                        <img src={avatarURL} alt={userName}></img>
                                        <span className='answered-line'>
                                        </span>
                                        <div className='answered-results'>
                                            <div><b>Results:</b></div>
                                            <ResultDetails authedUserVoted={authedUseroptionOneVoted} optionText={optionOne} optionVotes={optionOneVotes}
                                                totalVotes={totalVotes} />

                                            <ResultDetails authedUserVoted={!authedUseroptionOneVoted} optionText={optionTwo} optionVotes={optionTwoVotes}
                                                totalVotes={totalVotes} />
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className='question-unanswered'>
                                    <div className='question-user'>
                                        {userName} asks:
                                </div>
                                    <div className='unanswered-content'>
                                        <img src={avatarURL} alt={userName}></img>
                                        <span className='line'>
                                        </span>
                                        <div>
                                            <span><b>Would You Rather ...</b></span><br></br>
                                            <input type="radio" value='optionOne' name="option" onChange={this.setAnswer} checked /> {optionOne}<br></br>
                                            <input type="radio" value='optionTwo' name="option" onChange={this.setAnswer} /> {optionTwo}<br></br>
                                            <button onClick={this.submitAnswer}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                }
            
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, props) {
    if (authedUser === null) {
        return {
            authedUser
        }
    }

    const { id } = props.match.params
    
    if (!questions.hasOwnProperty(id)) {
        return {
            notFound: true
        }
    }

    const currentQuestion = questions[id]
    const currentUser = users[currentQuestion.author]
    let answered = false
    let optionOneVotes = ''
    let optionTwoVotes = ''
    let totalVotes = ''
    let authedUseroptionOneVoted

    if (currentQuestion.optionOne.votes.includes(authedUser)) {
        answered = true
        authedUseroptionOneVoted = true
    }

    if (currentQuestion.optionTwo.votes.includes(authedUser)) {
        answered = true
        authedUseroptionOneVoted = false
    }

    if (answered) {
        optionOneVotes = currentQuestion.optionOne.votes.length
        optionTwoVotes = currentQuestion.optionTwo.votes.length
        totalVotes = optionOneVotes + optionTwoVotes
    }

    return {
        userName: currentUser.name,
        avatarURL: currentUser.avatarURL,
        optionOne: currentQuestion.optionOne.text,
        optionTwo: currentQuestion.optionTwo.text,
        answered,
        optionOneVotes,
        optionTwoVotes,
        totalVotes,
        id,
        authedUser,
        authedUseroptionOneVoted
    }
}

export default connect(mapStateToProps)(QuestionResult)