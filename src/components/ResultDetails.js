import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

class ResultDetails extends React.Component {    
    render() {
        const { authedUserVoted, optionText, optionVotes, totalVotes } = this.props
        const now = ((optionVotes/totalVotes) * 100 ).toFixed(2)
        return (
            <div className={`result-details ${authedUserVoted ? 'result-vote' : ''}`}>
                <div className='result-details-content'>
                    Would you rather {optionText}?
                    <div className='results-bar'>
                        <ProgressBar now={now} label={`${now}%`}/>
                    </div>
                    {optionVotes} out of {totalVotes} votes
                </div>
                {authedUserVoted &&
                    <div className='user-voted'>
                        Your Vote
                    </div>
                }
            </div>
        )
    }
}

export default ResultDetails