import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import './randomQuote.css';

const RandomQuote = () => {
    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState({
        text: "Difficulties increase the nearer we get to the goal.",
        author: "- Johann Wolfgang von Goethe",
    });

    useEffect(() => {
        async function loadQuotes() {
            try {
                const response = await fetch('https://type.fit/api/quotes');
                const data = await response.json();
                setQuotes(data);
            } catch (error) {
                console.error('Error fetching quotes:', error);
            }
        }

        loadQuotes();
    }, []);

    const random = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const selectedQuote = quotes[randomIndex];
        setQuote(selectedQuote);
    };

    const twitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author.split(',')[0]}`);
    }

    return (
        <div className='container'>
            <div className='quote'>{quote.text}</div>
            <div>
                <div className='line'></div>
                <div className='bottom'>
                    <div className='author'>{quote.author.split(',')[0]}</div>
                    <div className='icons'>
                        <FontAwesomeIcon icon={faRotateRight} onClick={random} className='img' color='#FFFFFF' />
                        <FontAwesomeIcon icon={faXTwitter} onClick={twitter} className='img' color='#FFFFFF' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RandomQuote;