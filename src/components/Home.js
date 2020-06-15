import React from 'react'
import { connect } from 'react-redux'
import SignIn from './SignIn'
import Dashboard from './DashBoard'

class Home extends React.Component {
  render() {
    return (
      <div>
        {this.props.isNotAuthenticated === true
          ? <SignIn />
          : <Dashboard />
        }
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    isNotAuthenticated: authedUser === null
  }
}

export default connect(mapStateToProps)(Home)