import { useState, useEffect, useRef } from "react";

function Task1() {
	const [messagesList, setMessageList] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [isNewMessage, setIsNewMessage] = useState(false);

	const messagesEndRef = useRef(null);

	useEffect(() => {
		if (isNewMessage) {
			messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
			setIsNewMessage(false);
		}
	}, [messagesList, isNewMessage]);

	function addNewMessage(e) {
		e.preventDefault();
		if (inputValue.trim() === "") return;

		setMessageList((prev) => [
			...prev,
			{
				text: inputValue,
				likes: 0,
				dislikes: 0,
			},
		]);
		setInputValue("");
		setIsNewMessage(true);
	}

	function addLike(index) {
		setMessageList((prev) => {
			const updatedList = [...prev];
			updatedList[index].likes += 1;
			return updatedList;
		});
	}

	function addDislike(index) {
		setMessageList((prev) => {
			const updatedList = [...prev];
			updatedList[index].dislikes += 1;
			return updatedList;
		});
	}

	return (
		<div className="">
			<div className="">
				<h1 className="my-5 text-3xl font-bold">Задача 1. Імітатор мессенджера</h1>
				<p>
					<b>Завдання</b>: Є можлиість додавати/відображати повідомлення і ставити лайки (додайте стилі на свій розсуд).
				</p>
			</div>
			<div className="flex justify-center mt-5 p-5 rounded-lg bg-[var(--bg-dark)]">
				<form onSubmit={addNewMessage} className="flex-grow-1 relative max-w-lg h-96 p-4 pb-16 border border-solid border-gray-200">
					<ul className="flex flex-col gap-3 h-full overflow-y-auto">
						{messagesList.map((msg, i) => (
							<li key={i} className="flex justify-between p-2 rounded bg-[var(--bg-color)]  items-center">
								<span>{msg.text}</span>
								<div className="flex-shrink-0 flex gap-2">
									<button type="button" className="text-sm focus:outline-none" onClick={() => addLike(i)}>
										👍 {msg.likes}
									</button>
									<button type="button" className="text-sm focus:outline-none" onClick={() => addDislike(i)}>
										👎 {msg.dislikes}
									</button>
								</div>
							</li>
						))}
						<div ref={messagesEndRef} />
					</ul>
					<div className="absolute bottom-4 left-4 right-4 flex gap-2">
						<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Повідомлення" name="message" className="flex-grow-1 border-b border-solid border-gray-400 focus:outline-none focus:border-[var(--accent)]" />
						<button type="submit" className="focus:outline-none focus:ring-0">
							Надіслати
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Task1;
