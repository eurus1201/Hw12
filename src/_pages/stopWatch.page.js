import React, { Component } from 'react';
import { StopWatch, ClockButton } from "../_components";
import { withRouter } from "react-router-dom";
class StopWatchPage extends Component {

    state = {
        counter: 0,
        start: false,
        laps: []
    }

    goBack = () => {
        this.props.history.push('/');
    }

    startStopWatch = () => {
        this.setState({ start: true })
        this.interval = setInterval(() => {
            this.setState({ counter: this.state.counter + 1 })
        }, 1000)
    }

    addLap = () => {
        this.setState({ laps: this.state.laps.concat([this.state.counter])})
    }

    formattedSeconds=(lap)=>{
        let Sec1 = lap % 60;
        let min1 = Math.floor((lap / 60) % 60);
        let hour = Math.floor((lap - (min1 * 60) - Sec1) / 3600);
        return (hour.toLocaleString("en", { minimumIntegerDigits: 2 }) + ':' +
            min1.toLocaleString("en", { minimumIntegerDigits: 2 }) + ':' +
            Sec1.toLocaleString("en", { minimumIntegerDigits: 2 }));}

    pauseStopWatch = () => {
        this.setState({
            start: false,
        });
        clearInterval(this.interval);
    }

    restart = () => {
        this.setState({
            counter: 0,
            laps:[]
        })
    }

    renderBtn = () => {
        if (this.state.start) {
            return <>
                <ClockButton onClick={this.addLap}>Lap</ClockButton>
                <ClockButton onClick={this.pauseStopWatch}>Pause</ClockButton>
            </>
        } else {
            return <>
                <ClockButton onClick={this.goBack}>Back</ClockButton>
                {this.state.counter ? <ClockButton onClick={this.restart}>Restart</ClockButton> : null}
                <ClockButton onClick={this.startStopWatch}>Start</ClockButton>
            </>
        }
    }

    render() {
        const { counter } = this.state;
        return <div className="clock-page">

            <div className="laps">
                <ul >
                    {this.state.laps.map((lap, i) =>
                        <li>
                            <strong>{i + 1}</strong> /{this.formattedSeconds(lap)}
                        </li>
                    )}
                </ul>
            </div>
              
            <StopWatch counter={counter} />
          
            <div style={{ marginTop: 20, width: 350, justifyContent: 'space-around' }}>
                {this.renderBtn()}
            </div>
        </div>
    }
}

withRouter(StopWatchPage);

export { StopWatchPage }