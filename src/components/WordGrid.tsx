interface Props {
	board: string[];
	handleGridClick: (index: number) => void;
}
// test
const WordGrid = ({ board, handleGridClick }: Props) => {
	return (
		<div className="board">
			{board.map((item, index) => (
				<div
					key={index}
					className="square disable-text-selection"
					onClick={() => handleGridClick(index)}
				>
					{item}
				</div>
			))}
		</div>
	);
};

export default WordGrid;
