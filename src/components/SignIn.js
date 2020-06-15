import React from 'react'
import { connect } from 'react-redux'
import logo from '../logo192.png'
import { setAuthedUser } from '../actions/authedUser'

class SignIn extends React.Component {
    state = {
        user : ''
      }
    setUser = (e) => {
        const text = e.target.value        
        this.setState(()=> ({
            user : text
        }))        
    }
    handleSignIn = () => {
        if(this.state.user === ''){
            alert('Please select a user before singing in')
            return
        }
        const { dispatch } = this.props
        dispatch(setAuthedUser(this.state.user))
    }
    render() {
        return (
            <div className='center signin-container'>
                <div className='signin-header'>
                    <b>Welcome to the Would You Rather App!</b><br></br>
                Please sign in to continue
                </div>
                <img src={logo} alt='poll-app'></img>
                <h2>Sign In</h2>
                <select onChange={this.setUser}>
                    <option value=''>Select user</option>
                    {
                        Object.entries(this.props.users).map(([key, value]) => {
                            return (<option key={key} value={key}>{value.name}</option>)
                        })}
                </select><br></br>
                <button className='signin-btn' onClick={this.handleSignIn}>Sign In</button>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
        loading: authedUser === null,
        users: users
    }
}

export default connect(mapStateToProps)(SignIn)