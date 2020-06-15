import React from 'react'

class LeaderBoardItem extends React.Component {
    render() {
        const { user } = this.props
        console.log(user)
        const answered = Object.keys(user.answers).length
        const questions = user.questions.length
        const score = answered + questions
        return (
            <div className='leaderboard-container'>
                <img src={user.avatarURL} alt={user.name}></img>
                <div className='leaderboard-item'>
                    <div>
                        <div><b>{user.name}</b></div>
                        <div className='leaderboard-questions'>
                            <div>
                                <div>
                                    Answered questions
                                </div>
                                <div>
                                    Created questions
                                </div>
                            </div>
                            <div className='pad-left-30'>
                                <div>
                                    {answered}
                                </div>
                                <div>
                                    {questions}
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
                <div className='score'>
                        Score<br></br><br></br>
                        {score}
                    </div>
            </div>
        )
    }
}

export default LeaderBoardItem