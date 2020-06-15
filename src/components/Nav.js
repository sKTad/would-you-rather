import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Nav extends React.Component {
    render() {
        const { user } = this.props
        return (
            <div className='nav'>
                <nav className='nav-section'>
                    <ul>
                        <li>
                            <NavLink to='/' exact activeClassName='active'>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/add' activeClassName='active'>
                                New Question
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/leaderboard' activeClassName='active'>
                                Leader Board
                            </NavLink>
                        </li>
                        {user != null &&
                            <li>
                                <span>
                                    <span className='align-top'>Hello, {user.name}</span>
                                    <img src={user.avatarURL} alt={user.name} className='avatar margin-left-20'></img>
                                    <span className='align-top'>
                                    <a href='/' className='pad-left-30'>
                                            Log out
                                        </a>
                                    </span>
                                </span>
                            </li>}
                    </ul>
                </nav>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
        user: authedUser === null ? null : users[authedUser]
    }
}

export default connect(mapStateToProps)(Nav)