import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'
import { connect } from 'react-redux'
import '../index.css'
import {handleInitialData} from '../actions/shared'
import Nav from './Nav'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import QuestionResult from './QuestionResult'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  } 
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>
            <Nav/>
            <div>
              {this.props.loading === true
                ? null
                : <div className='container'>
                    <Route path='/' exact component={Home} />   
                    <Route path='/questions/:id' component={QuestionResult} />
                    <Route path='/add' exact component={NewQuestion} />  
                    <Route path='/leaderboard' exact component={LeaderBoard} />                                    
                </div>
              }
            </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    loading: Object.keys(users).length === 0
  }
}

export default connect(mapStateToProps)(App)