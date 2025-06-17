import GameField from "./GameField";

function Task2() {
	return (
		<div className="">
			<div className="">
				<h1 className="my-5 text-3xl font-bold">Задача 2. Гра “Вгадай число”</h1>
				<p>
					<b>Завдання</b>: Правила гри:
				</p>
				<ol className="pl-8 list-decimal">
					<li>комп'ютер генерує трицифрове число;</li>
					<li>кожен гравець по черзі задає цифру, якої ще не було (відсліковуємо, щоб цифри не повторювалися гравцями — не дозволяємо повторно ввести (блокуємо кнопку “Зробити хід”));</li>
					<li>якщо цифру вгадано, вона відображаться у полі гри “Число”;</li>
					<li>програє той, хто вгадав останню цифру.</li>
				</ol>
			</div>
			<div className="flex justify-center mt-5 p-5 rounded-lg bg-[var(--bg-dark)]">
				<GameField />
			</div>
		</div>
	);
}

export default Task2;
