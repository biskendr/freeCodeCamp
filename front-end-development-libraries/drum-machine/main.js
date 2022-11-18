const { useState, useEffect } = React

const drums = [
    { id: "1", name: 'heater-1', letter: 'Q', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
    { id: "2", name: 'heater-2', letter: 'W', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
    { id: "3", name: 'heater-3', letter: 'E', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
    { id: "4", name: 'heater-4', letter: 'A', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
    { id: "5", name: 'clap', letter: 'S', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
    { id: "6", name: 'open-hh', letter: 'D', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
    { id: "7", name: "kick-n'-hat", letter: 'Z', src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
    { id: "8", name: 'kick', letter: 'X', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
    { id: "9", name: 'closed-hh', letter: 'C', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
]

const DrumPad = ({ ...drums }) => {

    const handleKeydown = (e) => {
        if (e.key.toUpperCase() === drums.letter) {
            const sound = document.getElementById(drums.letter);
            sound.play();
            sound.currentTime = 0
            drums.handleClick(drums.name)
        }
    };

    const handleDisplay = () => {
        drums.audio.play()
        drums.audio.currentTime = 0
        drums.handleClick(drums.name)
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [handleKeydown]);

    return (
        <div
            className='drum-pad'
            id={drums.id}
            onClick={(e) => handleDisplay(e)}
        >
            <h1>{drums.letter}</h1>
            <audio id={drums.letter}
                className='clip'
                src={drums.src}
                ref={ref => drums.audio = ref}
            ></audio>
        </div>
    )
}

const App = () => {
    const [display, setDisplay] = useState("Drum Machine")

    const handleDisplay = (display) => {
        setDisplay(display);
    }

    return (
        <div id='drum-machine'>
            <div id='drum-pads'>
                {drums.map(item => (
                    <DrumPad
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        letter={item.letter}
                        src={item.src}
                        handleClick={handleDisplay}
                    />
                ))}</div>
            <div id='display'>{display}</div>
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById("app"));