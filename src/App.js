import React, { useState } from "react";

// Page components
import Header from "./components/Header";
import Details from "./components/Details";

function App() {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [type, setType] = useState("city");
    const [login, setLogin] = useState(true);
    const [breweries, setBreweries] = useState([]);
    const [emptyResult, setEmptyResult] = useState(false);

    const getBreweries = () => {
        fetch(`https://api.openbrewerydb.org/breweries?by_${type}=${input}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(Object.keys(data)[0] === 'errors'){
                   alert(data.errors[0]);
                } else {
                    setEmptyResult(false);
                    setLoading(true);
                    setTimeout(function () {
                        console.log(data);
                        if (data.length < 1) {
                            console.log(data);
                            setEmptyResult(true);
                        }
                        setBreweries(data);
                        setLoading(false);
                    }, 500);
                }
                
            })
            .catch((error) => {
                console.error(error.message);
                alert("There was an error fetching the data");
            });
    };

    const handleClearingResults = () => {
        setBreweries([]);
        setEmptyResult(false);
        setInput("");
    };

    const breweriesArr = breweries
        .sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        })
        .map((brewery) => (
            <>
                <p
                    className='list-item'
                    key={brewery.id}
                    data-toggle='modal'
                    data-target={"#detailsModal_" + brewery.id}
                >
                    <div className='list-item-title'>

                        <img src='android-chrome-192x192.png' style={{ Height: '30px', width: '30px' }} alt='' />
                        <h3>{brewery.name}</h3>
                    </div>
                    <div className='list-item-title'>

                        <img src='location.jpg' style={{ Height: '30px', width: '30px' }} alt='' />
                        <p className='lead'>
                            {brewery.street + ", " + brewery.city + ", " + brewery.state + " " + brewery.postal_code}
                        </p>
                    </div>
                </p>
                <Details brewery={brewery} />
            </>
        ));

    return (
        <>
            <Header />
            {!login && (
                <main>
                    <p className='text-center my-0'>
                        Search for breweries based off below keywords.
                    </p>
                    <div className='search-bar-container text-center'>
                        <input type="radio" id="contactChoice1"
                            name="keyword" value="city" onClick={(e) => setType(e.target.value)} checked />
                        <label for="Choice1" style={{ padding: "0 20px" }} onClick={(e) => setType(e.target.value)}>By City</label>
                        <input type="radio" id="contactChoice2"
                            name="keyword" value="name" onClick={(e) => setType(e.target.value)} />
                        <label for="Choice2" style={{ padding: "0 20px" }} onClick={(e) => setType(e.target.value)}>By Name</label>
                        <input type="radio" id="contactChoice3"
                            name="keyword" value="type" onClick={(e) => setType(e.target.value)} />
                        <label for="Choice3" style={{ padding: "0 20px" }} onClick={(e) => setType(e.target.value)}>By Type</label>
                    </div>

                    <div className='search-bar-container'>
                        <div className='input-group mb-0'>
                            <input
                                type='text'
                                value={input}
                                placeholder='Search breweries ...'
                                aria-label='Search'
                                className='form-control'
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button
                                className='btn btn-dark mx-1'
                                type='button'
                                id='button-addon1'
                                onClick={getBreweries}
                            >
                                Search
                            </button>
                            <button
                                className='btn btn-danger'
                                type='button'
                                id='button-addon2'
                                onClick={handleClearingResults}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                    <div className='results-container'>
                        {loading && (
                            <div className='spinner-border' role='status'>
                                <span className='sr-only'>Loading...</span>
                            </div>
                        )}
                        <ul className='list'>{breweries && breweriesArr}</ul>
                        {emptyResult === true && (
                            <p className='lead text-center'>NO RESULTS</p>
                        )}
                    </div>
                </main>)}
            {login && (
                <main>
                    <div className='search-bar-container text-center' style={{ padding: '200px 500px'}}>
                        <div className='text-center input-group mb-0' style={{ padding: '20px 200px' }}>
                            <button
                                className='btn btn-dark mx-1'
                                type='button'
                                id='button-addon1'
                                style={{ width: '290px', height: '80px' }}
                                onClick={(e) => setLogin(false)}
                            >
                                Login
                            </button>
                        </div>
                        <div className='text-center input-group mb-0' style={{ padding: '20px 200px' }}>
                            <button
                                className='btn btn-dark lg-1'
                                type='button'
                                id='button-addon2'
                                style={{ width: '290px', height: '80px' }}
                                onClick={(e) => setLogin(false)}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}

export default App;
