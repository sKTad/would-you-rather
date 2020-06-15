import React from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class DashBoard extends React.Component {
    state = {
        unanswered: true
    }
    setQuestionState = (unanswered) => {
        this.setState(() => ({
            unanswered: unanswered
        }))
    }
    render() {
        const { answered, unanswered } = this.props
        return (
            <div className='dashboard'>
                <div className='questions-type'>
                    <div className={this.state.unanswered === true ? 'question-active' : ''} onClick={() => this.setQuestionState(true)}>
                        Unanwered Questions
                    </div>
                    <div className={this.state.unanswered === true ? '' : 'question-active'} onClick={() => this.setQuestionState(false)}>
                        Answered Questions
                    </div>
                </div>
                {this.state.unanswered === true ?
                    <div>
                        {unanswered.map((id) => (
                            <Question key={id} id={id}></Question>
                        ))}
                    </div>
                    :
                    <div>
                        {answered.map((id) => (
                            <Question key={id} id={id}></Question>
                        ))}
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }) {
    const currentUser = users[authedUser]
    const userQuestionIds = Object.keys(currentUser.answers)
    let answered = []
    let unanswered = []

    const questionIds = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp)

    questionIds.map(id => {
        return userQuestionIds.includes(id) ?
            answered.push(id)
            : unanswered.push(id)
    });

    return {
        answered,
        unanswered
    }
}

export default connect(mapStateToProps)(DashBoard)