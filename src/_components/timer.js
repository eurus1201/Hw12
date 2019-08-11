import React from "react";

function Timer({ timerTime }) {
    // const sec = counter % 60;
    // const min = ((counter - sec) / 60) % 60;
    // const hour = (counter - min * 60 - sec) / 3600;

    // const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let sec = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let min = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hour = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    return <div style={style}>
        <span>{hour.toLocaleString('en', { minimumIntegerDigits: 2 })}</span>
        :
    <span>{min.toLocaleString('en', { minimumIntegerDigits: 2 })}</span>
        :
    <span>{sec.toLocaleString('en', { minimumIntegerDigits: 2 })}</span>
        :
    <span>{centiseconds.toLocaleString('en', { minimumIntegerDigits: 2 })}</span>
    </div>;
}

const style = {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold'
};

export { Timer }