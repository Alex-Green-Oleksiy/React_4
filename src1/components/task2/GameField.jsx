import { useState } from "react";
import Player from "./Player";

function generateRandomNumber() {
	const num = Math.floor(Math.random() * 900) + 100;
	return String(num).split("").map(Number);
}

function GameField() {
	const [targetNumber, setTargetNumber] = useState(generateRandomNumber);
	const [guessedDigits, setGuessedDigits] = useState([]);
	const [revealedDigits, setRevealedDigits] = useState([null, null, null]);
	const [playerTurn, setPlayerTurn] = useState(1);
	const [playerGuesses, setPlayerGuesses] = useState({ 1: [], 2: [] });

	function handleGuess(digit) {
		if (guessedDigits.includes(digit)) return;

		setGuessedDigits((prev) => [...prev, digit]);

		const newRevealed = [...revealedDigits];
		let matched = false;

		targetNumber.forEach((e, i) => {
			if (e === digit) {
				newRevealed[i] = digit;
				matched = true;
			}
		});

		if (matched) {
			setRevealedDigits(newRevealed);
			setPlayerGuesses((prev) => ({
				...prev,
				[playerTurn]: [...prev[playerTurn], digit],
			}));
		}

		if (newRevealed.every((val) => val !== null)) {
			alert(`Гравець ${playerTurn} програв (відгадав останню цифру)`);
			return;
		}

		setPlayerTurn((prev) => (prev === 1 ? 2 : 1));
	}

	return (
		<div className="max-w-xl mx-auto p-4 border">
			<div className="flex gap-2 justify-center mb-6">
				{revealedDigits.map((digit, i) => (
					<div key={i} className="flex justify-center items-center w-12 h-12 border text-3xl text-center">
						{digit !== null ? digit : ""}
					</div>
				))}
			</div>

			<div className="flex justify-center gap-4">
				<Player number={1} onGuess={handleGuess} disabled={playerTurn !== 1} alreadyGuessed={guessedDigits} successDigits={playerGuesses[1]} />
				<Player number={2} onGuess={handleGuess} disabled={playerTurn !== 2} alreadyGuessed={guessedDigits} successDigits={playerGuesses[2]} />
			</div>
		</div>
	);
}

export default GameField;
