const { useState, useRef } = React

const accurateInterval = (fn, time) => {
    let cancel, nextAt, timeout, wrapper, timeoutID;
    nextAt = new Date().getTime() + time;
    timeout = null;
    wrapper = function () {
        nextAt += time;
        timeout = setTimeout(wrapper, nextAt - new Date().getTime());
        return fn();
    };
    cancel = function () {
        return clearTimeout(timeout);
    };
    timeoutID = function () {
        return timeout;
    };
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return {
        cancel: cancel,
        timeoutID: timeout
    };
};

const PomodoroControl = ({ type, length, changeTime }) => {
    return (
        <div id="session">
            <div id={`${type}-label`}>{type} length</div>
            <div className={`${type}-control`}>
                <button id={`${type}-decrement`} className="btn-level" onClick={() => changeTime(-60, type)}><i className="fa fa-arrow-down fa-2x"></i></button>
                <div id={`${type}-length`} className="time">{length}</div>
                <button id={`${type}-increment`} className="btn-level" onClick={() => changeTime(60, type)}><i className="fa fa-arrow-up fa-2x"></i></button>
            </div>
        </div>
    )

}


const App = () => {
    const [displayTime, setDisplayTime] = useState(60 * 25);
    const [breakTime, setBreakTime] = useState(60 * 5);
    const [sessionTime, setSessionTime] = useState(60 * 25);
    const [timerOn, setTimerOn] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    const myAudio = useRef();
    const displayTimerRef = useRef();
    const timeoutRef = useRef();
    const onBreakRef = useRef(null);
    const displayVisualTimerRef = useRef();

    const timerControl = () => {
        if (!timerOn) {
            setTimerOn(true);
            beginCountDown();
        } else if (timeoutRef.current.timeoutID) {
            timeoutRef.current.cancel();
            setTimerOn(false);
        }
    }


    const beginCountDown = () => {
        let timeOutInfo = accurateInterval(() => {
            phaseControl()
        }, 1000)
        timeoutRef.current = timeOutInfo
    }

    const displayElapsedPercentage = (isBreak, currentTick) => {
        let percentage = "0%"
        if (isBreak) {
            percentage = Math.abs(((currentTick - breakTime) / breakTime) * 100) + '%'
        } else {
            percentage = Math.abs(((currentTick - sessionTime) / sessionTime) * 100) + '%'
        }
        displayVisualTimerRef.current = percentage;
    }


    const phaseControl = () => {
        let time;

        setDisplayTime((prev) => {
            displayTimerRef.current = prev
            return prev - 1
        });

        time = displayTimerRef.current;
        if (time <= 0) {
            setOnBreak((prev) => {
                let previousState = prev
                onBreakRef.current = !previousState
                return !prev
            })
            if (timeoutRef.current) {
                timeoutRef.current.cancel()
                if (onBreakRef.current === false) {
                    displayTimerRef.current = sessionTime;
                    playBuzzer()
                } else if (onBreakRef.current === true) {
                    displayTimerRef.current = breakTime;
                    playBuzzer()
                }
                setDisplayTime(displayTimerRef.current)
                beginCountDown()
            }
        }

        displayElapsedPercentage(onBreakRef.current, time)
    }

    const resetPomodoro = () => {
        setDisplayTime(60 * 25);
        setBreakTime(60 * 5);
        setSessionTime(60 * 25);
        setOnBreak(false);
        setTimerOn(false);
        if (timeoutRef.current) {
            timeoutRef.current.cancel();
        }
        myAudio.current.pause();
        myAudio.current.currentTime = 0;
        displayVisualTimerRef.current = "0%"
    }

    const changeTime = (timeAmmount, type) => {
        if (type === "break") {
            if ((breakTime >= 60 * 60 && timeAmmount > 0) || (breakTime <= 60 && timeAmmount < 0)) {
                return;
            }
            setBreakTime((prev) => prev + timeAmmount)
        } else if (type === "session") {
            if ((sessionTime >= 60 * 60 && timeAmmount > 0) || (sessionTime <= 60 && timeAmmount < 0)) {
                return;
            }
            setSessionTime((prev) => prev + timeAmmount);
            if (!timerOn) {
                setDisplayTime(sessionTime + timeAmmount);
            }
        }
    }

    const formatTime = (time, type = "display") => {

        if (type === "display") {
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;
            return (
                (minutes < 10 ? "0" + minutes : minutes)
                +
                ":"
                +
                (seconds < 10 ? "0" + seconds : seconds)
            )
        } else if (type === "control") {
            let minutes = Math.ceil(time / 60);
            return minutes
        }
    }

    const playBuzzer = () => {
        myAudio.current.currentTime = 0
        myAudio.current.play()
    }


    return (
        <div className="container">
            <h1>25 + 5 Clock</h1>
            <div className="session-wrap">
                <PomodoroControl
                    type="break"
                    length={formatTime(breakTime, "control")}
                    changeTime={changeTime}
                />
                <PomodoroControl
                    type="session"
                    length={formatTime(sessionTime, "control")}
                    changeTime={changeTime}
                />
            </div>
            <section id="timer">
                <div className="timer">
                    <p id="timer-label" className="title">{onBreak ? "Break" : "Session"}</p>
                    <p id="time-left" ref={displayTimerRef}>{formatTime(displayTime)}</p>
                    <span className="fill" style={{ height: displayVisualTimerRef.current }}></span>
                </div>
            </section>
            <div className="timer_controls">
                <button id="start_stop" onClick={() => timerControl()}>{!timerOn ? <i className="fa fa-play fa-2x"></i> : <i className="fa fa-pause fa-2x"></i>}</button>
                <button id="reset" onClick={() => resetPomodoro()}><i className="fa fa-refresh fa-2x"></i></button>
            </div>
            <audio
                id="beep"
                preload="auto"
                ref={myAudio}
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));