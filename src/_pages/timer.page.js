import React, { component } from 'react'
import { Timer, ClockButton } from "../_components";
import { withRouter } from "react-router-dom";

class TimerPage extends component {

    state = {
    counter:20,
    strat:false
    }
    goBack = () => {
        this.props.history.push('/');
    }

    startTimer = () => {
        this.setState({ start: true })
        this.interval = setInterval(() => {
            this.setState({ counter: this.state.counter - 1 })
        }, 1000)
    }
    pauseTimer = () => {
        this.setState({
            start: false,
        });
        clearInterval(this.interval);
    }

    restart = () => {
        this.setState({
            counter: 20,        
        })
    }

    renderBtn = () => {
        if (this.state.start) {
            return <>
                <ClockButton onClick={this.pauseTimer}>Pause</ClockButton>
            </>
        } else {
            return <>
                <ClockButton onClick={this.goBack}>Back</ClockButton>
                {this.state.counter ? <ClockButton onClick={this.restart}>Restart</ClockButton> : null}
                <ClockButton onClick={this.startTimer}>Start</ClockButton>
            </>
        }
    }


    render() {
        const { counter } = this.state;
        return <div className="timer-page">
            <Timer counter={counter} />
            
            <div style={{ marginTop: 20, width: 350, justifyContent: 'space-around' }}>
                {this.renderBtn()}
            </div>
        </div>
    }
}

withRouter(TimerPage);

export { TimerPage }