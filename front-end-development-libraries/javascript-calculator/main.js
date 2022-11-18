const { useState } = React

const DIGITS = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine"
}

const OPERATIONS = {
    "+": "add",
    "-": "subtract",
    "X": "multiply",
    "/": "divide"
}

const Cell = ({ content, id, onClick }) => {
    return (
        <div className="cell" id={id} onClick={onClick}>
            <p>{content}</p>
        </div>
    )
}

const Result = ({ content }) => {
    const stringContent = content.join('')
    return (
        <div id="display" className="display">
            <p>{stringContent}</p>
        </div>
    )
}

const Calculator = () => {
    const [input, setInput] = useState(["0"]);

    const calculate = (newInput) => {
        const newDigit = newInput.target.innerText;

        const numbers = input.join('').split(' ').filter(Number);

        if (input[0] === '0') {
            if (newDigit === '.') {
                setInput(['0.'])
            } else if (newDigit === '0') {
                setInput(['0'])
            } else {
                setInput([newDigit])
            }
        } else if (numbers[numbers.length - 1].includes('.') && newDigit === '.') {
            setInput(input)
        } else if (newDigit.match(/^(\-)$/)) {
            setInput(prevInput => [...prevInput, ` ${newDigit} `])
        } else if (newDigit.match(/^(\+|\X|\/)$/)) {
            if ([' + ', ' X ', ' / '].includes(input[input.length - 1])) {
                setInput(prevInput => [...prevInput.slice(0, -1), ` ${newDigit} `])
            } else if (input[input.length - 1] === ' - '
                && [' + ', ' X ', ' / '].includes(input[input.length - 2])) {
                setInput(prevInput => [...prevInput.slice(0, -2), ` ${newDigit} `])
            } else {
                setInput(prevInput => [...prevInput, ` ${newDigit} `])
            }
        } else if (newDigit === '=') {
            const result = math.evaluate(input.join('').replace('X', '*'))
            const formattedResult = math.format(result, { precision: 7 })
            setInput([formattedResult])
        } else {
            setInput(prevInput => [...prevInput, newDigit])
        }
    }

    const clear = () => {
        setInput(["0"]);
    }

    return (
        <div className="container">
            <Result content={input} />
            <div className='digits'>
                {Object.keys(DIGITS).map((digit, ix) => (
                    <Cell
                        content={digit}
                        id={DIGITS[digit]}
                        key={ix}
                        onClick={calculate}
                    />
                ))}</div>
            <Cell content="=" id="equals" onClick={calculate} />
            <div className='operations'>
                {Object.keys(OPERATIONS).map((operation, ix) => (
                    <Cell
                        content={operation}
                        key={ix}
                        id={OPERATIONS[operation]}
                        onClick={calculate}
                    />
                ))}</div>
            <Cell content="0" id="zero" onClick={calculate} />
            <Cell content="." id="decimal" onClick={calculate} />
            <Cell content="AC" id="clear" onClick={clear} />
        </div>
    )
}



ReactDOM.render(<Calculator />, document.getElementById('app'))