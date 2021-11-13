import React from "react";
import { useState, useEffect } from "react";
import "../../styles/index.scss";

export const Home = () => {
	const [todo, setTodo] = useState([
		{ label: "Study Boostrap and CSS" },
		{ label: "learn JavaScript" }
	]);
	const myUrl = "https://assets.breatheco.de/apis/fake/todos/user/gabytodos";

	const todoListNow = e => {
		let input = document.querySelector("input").value;
		console.log(input);
		if (e.key === "Enter" && input != "") {
			let currentTodos = [...todo, { label: input, done: false }];
			setTodo(currentTodos);
			document.querySelector("input").value = "";
			console.log(todo);
			fetch(myUrl, {
				method: "PUT",
				body: JSON.stringify(currentTodos),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					return resp.json();
				})
				.then(data => {
					console.log(data);
				})
				.catch(error => {
					console.log(error);
				});

			console.log(todo);
		}
	};
	const getTodoList = () => {
		fetch(myUrl, {
			method: "GET"
		})
			.then(response => response.json())
			.then(json => {
				// setTodo(json);
				console.log(json);
			});
	};

	const deleteNow = (index, event) => {
		let newTodo = [...todo];
		newTodo.splice(index, 1);
		setTodo(newTodo);
		fetch(myUrl, {
			method: "PUT",
			body: JSON.stringify(newTodo),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => data.json())
			.catch(err => err());
	};

	useEffect(() => {
		getTodoList();
	}, []);

	return (
		<div className="todoList">
			<nav className="navbar navbar-light bg-light">
				<a className="navbar-brand" href="#">
					TODOLIST GABY
				</a>
			</nav>
			<div className="container">
				<h1 className="text-center">ToDo List!</h1>
				<form className="Formulario">
					<input
						type="text"
						placeholder="What needs to be done?"
						onKeyPress={e => {
							todoListNow(e);
						}}
					/>
				</form>
			</div>
			<div className="container">
				<div className="listElements">
					<div className=" d-flex align-items-center">
						<ul className="col">
							{todo.map((todoElement, key) => (
								<li className="list-group-item" key={key}>
									{todoElement.label}
									<button
										className="button"
										onClick={event =>
											deleteNow(key, event)
										}>
										<i className="fas fa-trash-alt" />
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
