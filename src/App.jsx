import { useState, useRef, useEffect } from 'react';
import './App.scss';
import Player from './components/Player/Player';
import SecretNumber from './components/SecretNumber/SecretNumber';
import GameOver from './components/GameOver/GameOver';
import Messenger from './components/Messenger/Messenger';

function App() {
    // тут зберігається секретне число
    const secretNumbers = useRef([]);
    // хто зараз ходить
    const [currentPlayer, setCurrentPlayer] = useState(1);
    // числа, які вводив перший гравець
    const [player1Numbers, setPlayer1Numbers] = useState([]);
    // числа, які вводив другий гравець
    const [player2Numbers, setPlayer2Numbers] = useState([]);
    // що зараз в інпуті у першого
    const [input1, setInput1] = useState('');
    // що зараз в інпуті у другого
    const [input2, setInput2] = useState('');
    // тут зберігаються вгадані числа (або _ якщо ще не вгадали)
    const [guessedNumbers, setGuessedNumbers] = useState(['_', '_', '_']);
    // чи закінчилась гра
    const [gameOver, setGameOver] = useState(false);
    // хто виграв
    const [winner, setWinner] = useState(null);

    // коли сторінка завантажилась, генеруємо секретне число
    useEffect(() => {
        generateSecretNumbers();
    }, []);

    // робимо три різні випадкові числа
    const generateSecretNumbers = () => {
        const numbers = [];
        while (numbers.length < 3) {
            const num = Math.floor(Math.random() * 10);
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        secretNumbers.current = numbers;
        setGuessedNumbers(['_', '_', '_']);
        setPlayer1Numbers([]);
        setPlayer2Numbers([]);
        setInput1('');
        setInput2('');
        setCurrentPlayer(1);
        setGameOver(false);
        setWinner(null);
    };

    // перевіряємо, чи вже вводили це число
    const isNumberUsed = (number) => {
        return player1Numbers.includes(number) || player2Numbers.includes(number);
    };

    // якщо є помилка, повертаємо текст помилки
    const getError = (value) => {
        if (!value) return '';
        const number = parseInt(value);
        if (isNaN(number)) return 'Введіть цифру';
        if (isNumberUsed(number)) return 'Це число вже було введене!';
        return '';
    };

    // коли натискаємо "зробити хід"
    const handleMove = (player) => {
        const value = player === 1 ? input1 : input2;
        const number = parseInt(value);
        if (isNaN(number) || isNumberUsed(number)) return;
        const index = secretNumbers.current.indexOf(number);
        if (index !== -1) {
            // якщо вгадали, показуємо це число
            const newGuessedNumbers = [...guessedNumbers];
            newGuessedNumbers[index] = number;
            setGuessedNumbers(newGuessedNumbers);
            // якщо всі вгадані, гра закінчилась
            if (!newGuessedNumbers.includes('_')) {
                setGameOver(true);
                setWinner(currentPlayer === 1 ? 2 : 1);
            }
        }
        if (player === 1) {
            setPlayer1Numbers([...player1Numbers, number]);
            setInput1('');
            setCurrentPlayer(2);
        } else {
            setPlayer2Numbers([...player2Numbers, number]);
            setInput2('');
            setCurrentPlayer(1);
        }
    };

    return (
        <div className="app">
            <h1>Гра "Вгадай число"</h1>

            <div className="gameContainer">
                <SecretNumber guessedNumbers={guessedNumbers} />

                <div className="players">
                    <Player
                        playerNumber={1}
                        value={input1}
                        onChange={(e) => setInput1(e.target.value.replace(/\D/g, '').slice(0, 1))}
                        onMove={() => handleMove(1)}
                        disabled={!!getError(input1) || gameOver}
                        numbers={player1Numbers}
                        isActive={currentPlayer === 1 && !gameOver}
                        error={getError(input1)}
                    />
                    <Player
                        playerNumber={2}
                        value={input2}
                        onChange={(e) => setInput2(e.target.value.replace(/\D/g, '').slice(0, 1))}
                        onMove={() => handleMove(2)}
                        disabled={!!getError(input2) || gameOver}
                        numbers={player2Numbers}
                        isActive={currentPlayer === 2 && !gameOver}
                        error={getError(input2)}
                    />
                </div>

                {gameOver && <GameOver winner={winner} onRestart={generateSecretNumbers} />}
            </div>

            {/* Месенджер під грою */}
            <Messenger />
        </div>
    );
}

export default App;
