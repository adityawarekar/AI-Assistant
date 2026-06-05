import React from 'react';
import { useState } from 'react';

const Flashcard = ({ question, answer }) => {
    const [flipped, setFlipped] = useState(false);
    return (
        <div onClick={() => setFlipped(!flipped)}
            className='bg-slate-800 hover:bg-slate-700 transition duration-300 p-6 rounded-xl cursor-pointer min-h-[200px] flex items-center justify-center text-center shadow-lg hover:scale-105'
        >
            <h2 className='text-lg font-semibold'>
                {flipped ? answer : question}
            </h2>



        </div>
    );
};

export default Flashcard;
