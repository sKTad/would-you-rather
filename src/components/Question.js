import React from 'react'
import {connect} from 'react-redux' 
import { Link, withRouter } from 'react-router-dom'

class Question extends React.Component {
    render() {
        const {userName, optionOne, avatarURL, id} = this.props
        return (
            <div className='poll-question'>
                <div className='poll-user'>
                    {userName} asks:
                </div>
                <div className='poll-content'>
                    <img src={avatarURL} alt={userName}></img>
                    <span className='line'>
                    </span>
                    <div className='width-max'>
                        <span><b>Would you rather</b></span><br></br><br></br>
                        <span>{optionOne}...<br></br></span>
                        <Link to={`/questions/${id}`}>
                            <button>View Poll</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({users, questions}, {id}){
   const currentQuestion = questions[id]
   const user = users[currentQuestion.author]
    return{
        optionOne : currentQuestion.optionOne.text,
        userName : user.name,
        avatarURL : user.avatarURL,
        id
    }
}

export default withRouter(connect(mapStateToProps)(Question))