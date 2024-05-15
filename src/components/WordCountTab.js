"use client"
import { useState } from 'react';

export default function WordCountTab() {
  const [text, setText] = useState('');
  const [words, setWords] = useState({});

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleButtonClick = () => {
    const wordArray = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordCount = wordArray.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
    setWords(wordCount);
  };

  const handleDelete = (wordToDelete) => {
    setText(text.replace(new RegExp(`\\b${wordToDelete}\\b`, 'gi'), ''));
    const newWords = { ...words };
    delete newWords[wordToDelete];
    setWords(newWords);
  };

  const sortedWords = Object.keys(words).sort();

  return (
    <div className="flex">
      <div className="w-1/2 p-2">
        <textarea
          className="w-full h-64 p-2 border"
          value={text}
          onChange={handleTextChange}
        ></textarea>
        <button
          className="mt-2 p-2 bg-blue-800 text-white"
          onClick={handleButtonClick}
        >
          Count Words
        </button>
      </div>
      <div className="w-1/2 p-2">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Kata</th>
              <th className="border p-2">Jumlah Kata</th>
              <th className="border p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {sortedWords.map((word) => (
              <tr key={word}>
                <td className="border p-2">{word}</td>
                <td className="border p-2">{words[word]}</td>
                <td className="border p-2">
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(word)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
