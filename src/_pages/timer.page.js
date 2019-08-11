import React, { Component } from 'react'
import { Timer, ClockButton } from "../_components";
import { withRouter } from "react-router-dom";

class TimerPage extends Component {

    state = {
        timerStart: 0,
        strat: false,
        timerTime: 0
    }


    goBack = () => {
        this.props.history.push('/');
    }

    // startTimer = () => {
    //     this.setState({ start: true })
    //     this.interval = setInterval(() => {
    //         this.setState({ timerTime: this.state.timerTime - 1 })
    //         if (this.state.timerTime === 0) {
    //             clearInterval(this.interval)
    //         }
    //     }, 1000)
    // }

    // startTimer = () => {
    //     this.setState({
    //         start: true,
    //         timerTime: this.state.timerTime,
    //         timerStart: Date.now() - this.state.timerTime
    //     });
    //     this.timer = setInterval(() => {
    //         this.setState({
    //             timerTime: Date.now() - this.state.timerStart
    //         });
    //     }, 10);
    // };

    startTimer = () => {
        this.setState({
            start: true,
            timerTime: this.state.timerTime,
            timerStart: this.state.timerTime
        });
        this.timer = setInterval(() => {
            const newTime = this.state.timerTime - 10;
            if (newTime >= 0) {
                this.setState({
                    timerTime: newTime
                });
            } else {
                clearInterval(this.timer);
                this.setState({ start: false });
                alert("Countdown ended");
            }
        }, 10);
    };

    pauseTimer = () => {
        this.setState({
            start: false,
        });
        // clearInterval(this.interval);
        clearInterval(this.timer);
    }

    //     clearInterval(this.timer);
    //   this.setState({ start: false });
    // };

    restart = () => {
        this.setState({
            timerStart: 0,
            timerTime: 0
        });
        if (this.state.start === false) {
            this.setState({
                timerTime: this.state.timerStart
            });
        }
    }

    renderBtn = () => {
        if (this.state.start) {
            return <>
                <ClockButton onClick={this.pauseTimer}>Pause</ClockButton>
            </>
        } else {
            return <>
                <ClockButton onClick={this.goBack}>Back</ClockButton>
                {this.state.timerTime ? <ClockButton onClick={this.restart}>Restart</ClockButton> : null}
                <ClockButton onClick={this.startTimer}>Start</ClockButton>
            </>
        }

    }

    adjustTimer = input => {
        const { timerTime, strat } = this.state;
        const max = 216000000;
        if (!strat) {
            if (input === "incHours" && timerTime + 3600000 < max) {
                this.setState({ timerTime: timerTime + 3600000 });
            } else if (input === "decHours" && timerTime - 3600000 >= 0) {
                this.setState({ timerTime: timerTime - 3600000 });
            } else if (input === "incMinutes" && timerTime + 60000 < max) {
                this.setState({ timerTime: timerTime + 60000 });
            } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
                this.setState({ timerTime: timerTime - 60000 });
            } else if (input === "incSeconds" && timerTime + 1000 < max) {
                this.setState({ timerTime: timerTime + 1000 });
            } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
                this.setState({ timerTime: timerTime - 1000 });
            }
        }
    };


    render() {
        // const { timerTime } = this.state;
        const { timerTime, timerStart, start } = this.state;
        let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
        let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

        return <div className=" clock-page">
           
          
            <div className="Countdown-display">
                <div className="timerbtn" >
                    <button onClick={() => this.adjustTimer("incHours")}>&#8679;</button>
                    <button onClick={() => this.adjustTimer("incMinutes")}>&#8679;</button>
                    <button onClick={() => this.adjustTimer("incSeconds")}>&#8679;</button>
                </div>
               
                {/* <div className="Countdown-label">{hours} : {minutes} : {seconds}</div> */}
                <Timer timerTime={timerTime} />
                <div className="timerbtn" >
                    <button onClick={() => this.adjustTimer("decHours")}>&#8681;</button>
                    <button onClick={() => this.adjustTimer("decMinutes")}>&#8681;</button>
                    <button onClick={() => this.adjustTimer("decSeconds")}>&#8681;</button>
                </div>
                
            </div>
            <div style={{ marginTop: 20, width: 350, justifyContent: 'space-around' }}>
                {this.renderBtn()}
            </div>
        </div>
    }
}

withRouter(TimerPage);

export { TimerPage }