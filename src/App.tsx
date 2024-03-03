import WordGrid from "./components/WordGrid";
import "./App.css";
import send from "./assets/send.png";
import erase from "./assets/erase.png";
import { useState } from "react";

import word from "./assets/words_alpha_0.json";

function getRandomInt(max: number) {
	return Math.floor(Math.random() * max);
}

const App = () => {
	let b = [];
	for (let i = 0; i < 96; i++) {
		b.push(String.fromCharCode(65 + getRandomInt(26)));
	}
	const letterScores = {
		aeioulnstr: 2,
		dg: 3,
		bcmp: 4,
		fhvwy: 5,
		k: 8,
		jx: 10,
		qz: 15,
	};

	const [board, setBoard] = useState(b);
	const [text, setText] = useState("");
	const [pos, setPos] = useState<number[]>([]);

	const [score, setScore] = useState(0);

	const handleGridClick = (index: number) => {
		if (board[index] === "") return;

		setPos([...pos, index]);

		setBoard(board.map((item, i) => (i === index ? "" : item)));
		setText(text + board[index]);
	};

	const handleEraseClick = () => {
		if (text === "") return;

		const index = pos[pos.length - 1];
		setPos(pos.filter((item) => item != index));

		setBoard(
			board.map((item, i) => (i === index ? text[text.length - 1] : item))
		);
		setText(text.slice(0, -1));
	};

	const handleSubmitClick = () => {
		if (text.toLowerCase() in words) {
			setText("");

			let wordScore = 1;
			for (let i = 0; i < text.length; i++) {
				for (let key in letterScores) {
					if (key.includes(text[i].toLowerCase())) {
						wordScore *=
							letterScores[key as keyof typeof letterScores];
					}
				}
			}
			setScore(score + wordScore);
		}
	};

	return (
		<div className="App">
			<h1>Word Amogus</h1>
			<WordGrid
				board={board}
				handleGridClick={handleGridClick}
			></WordGrid>

			<div className="Info">Score: {score}</div>

			<div className="InputBox">
				<button
					className="btn btn-primary"
					style={{
						width: "8vh",
						height: "6vh",
						backgroundImage: `url(${send})`,
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
						backgroundSize: "35%",
					}}
					onClick={handleSubmitClick}
				></button>
				<input
					style={{ width: "33.5vh", height: "6vh" }}
					type="text"
					value={text}
					disabled
				></input>
				<button
					className="btn btn-primary"
					style={{
						width: "8vh",
						height: "6vh",
						backgroundImage: `url(${erase})`,
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
						backgroundSize: "40%",
					}}
					onClick={handleEraseClick}
				></button>
			</div>
		</div>
	);
};

export default App;
