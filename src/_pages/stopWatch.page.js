import React,{Component} from 'react';
import { StopWatch,ClockButton } from "../_components";
import { withRouter } from "react-router-dom";
class StopWatchPage extends Component {

    state = {
        counter: 0,
        start: false
    }

    goBack = () => {
        this.props.history.push('/');
    }

    startStopWatch = () =>{
        this.setState({start: true})
        this.interval = setInterval(()=>{
            this.setState({counter: this.state.counter + 1})
        },1000)
    }

    addLap = () =>{

    }

    pauseStopWatch = () =>{
        this.setState({
            start: false,
        });
        clearInterval(this.interval);
    }

    restart = () =>{
        this.setState({
            counter: 0
        })
    }

    renderBtn = () =>{
        if (this.state.start) {
            return <>
                <ClockButton onClick = {this.addLap}>Lap</ClockButton>
                <ClockButton onClick={this.pauseStopWatch}>Pause</ClockButton>
            </>
        } else {
            return <>
                <ClockButton onClick = {this.goBack}>Back</ClockButton>
                {this.state.counter ? <ClockButton onClick = {this.restart}>Restart</ClockButton> : null}
                <ClockButton onClick={this.startStopWatch}>Start</ClockButton>
            </>
        }
    }

    render () {
        const {counter} = this.state;
        return <div className="clock-page">
            <StopWatch counter = {counter}/>
            <div style={{marginTop: 20,width: 350,justifyContent: 'space-around'}}>
                {this.renderBtn()}
            </div>
        </div>
    }
}

withRouter(StopWatchPage);

export {StopWatchPage}