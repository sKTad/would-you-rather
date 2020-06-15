import React from 'react'
import { connect } from 'react-redux'
import SignIn from './SignIn'
import LeaderBoardItem from './LeaderBoardItem'

class LeaderBoard extends React.Component {
    render() {
        const { isNotAuthenticated, users, userIds } = this.props
        return (
            <div>
                {isNotAuthenticated === true
                    ? <SignIn />
                    : <div>
                        {userIds.map(id => <LeaderBoardItem key={id} user={users[id]} />)}
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
   const userIds = Object.keys(users).sort((a, b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length))
 
    return {
        isNotAuthenticated: authedUser === null,
        users,
        userIds
    }
}

export default connect(mapStateToProps)(LeaderBoard)