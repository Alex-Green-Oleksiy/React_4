import React, { useState } from "react";

function Player({ number, onGuess, disabled, alreadyGuessed, successDigits }) {
	const [input, setInput] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		const digit = Number(input);
		if (isNaN(digit) || digit < 0 || digit > 9) {
			alert("Потрібно ввести лише цифру від 0 до 9!");
			return;
		}
		if (alreadyGuessed.includes(digit)) {
			alert("Таке число вже вказували!");
			return;
		}

		onGuess(digit);
		setInput("");
	}

	return (
		<div>
			<h2 className="text-xl font-semibold">Гравець {number}</h2>
			<form onSubmit={handleSubmit} className="mt-2">
				<input type="number" value={input} onChange={(e) => setInput(e.target.value)} disabled={disabled} min={0} max={9} className="border w-full p-1 mb-2 disabled:border-gray-600" />
				<button type="submit" disabled={disabled} className="w-full disabled:bg-gray-600 disabled:cursor-default">
					Зробити хід
				</button>
			</form>
			<div className="mt-2 text-sm">Вгадав: {successDigits.join(", ") || "---"}</div>
		</div>
	);
}

export default Player;
