import React from 'react'
import { connect } from 'react-redux'
import SignIn from './SignIn'
import {handleAddQuestion} from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends React.Component {
    state = {
        optionOne : '',
        optionTwo : '',
        toHome : false
    }
    setOptionOne = (e) => {
        this.setState({
            optionOne : e.target.value
        })
    }
    
    setOptionTwo = (e) => {
        this.setState({
            optionTwo : e.target.value
        })
    }
    addQuestion = () =>{
        if(this.state.optionOne.trim() === '' || this.state.optionTwo.trim() === ''){
            alert('Enter two options before submitting')
            return
        }
        this.props.dispatch(handleAddQuestion(this.state.optionOne, this.state.optionTwo))
        this.setState({
            toHome : true
        })
    }
    render() {
        const {toHome} = this.state

        if(toHome){
            return <Redirect to='/' />
        }

        return (
            <div>
                {this.props.isNotAuthenticated === true
                    ? <SignIn />
                    : <div>
                        <div className='new-question center'>
                            <h3>Create New Question</h3>
                        </div>
                        <div className='new-question-container'>
                            Complete the question: <br></br>
                            <h4>Would you rather ...</h4>
                            <input type='text' placeholder='Enter Option One Text Here' onChange={this.setOptionOne}></input>
                            <div className='center'>Or</div>
                            <input type='text' placeholder='Enter Option Two Text Here' onChange={this.setOptionTwo}></input><br></br>
                            <div className='center'><button onClick={this.addQuestion}><b>Submit</b></button></div>
                        </div>
                    </div>
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

export default connect(mapStateToProps)(NewQuestion)