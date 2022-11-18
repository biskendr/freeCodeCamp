const { useState, useEffect } = React

const API = "https://api.quotable.io/random";

const Quote = () => {
    const [text, setText] = useState(["Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad, fugiat."]);
    const [author, setAuthor] = useState(["Lorem, ipsum."]);

    const getQuote = () => {
        const fetchData = async () => {
            await fetch(API)
                .then((data) => data.json())
                .then((item) => {
                    setText(item.content)
                    setAuthor(item.author);
                })
        }
        fetchData();
    }
    useEffect(() => {
        getQuote();
    }, []);

    return (
        <div id="quote-box">
            <p id="text">{text}</p>
            <p id="author">{author}</p>
            <a href="https://twitter.com/intent/tweet" id="tweet-quote"><i class="fa-brands fa-twitter"></i></a>
            <button type="button" id="new-quote" onClick={() => getQuote()}>New Quote</button>
        </div>
    )
}

const App = () => {
    return (
        <div id="wrapper">
            <Quote />
        </div>);
}

ReactDOM.render(<App />, document.getElementById("app"));

