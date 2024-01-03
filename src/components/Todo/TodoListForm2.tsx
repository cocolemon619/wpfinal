import React, { useState } from "react";

import TodoItem, { TodoItemProps } from "@/components/Todo/TodoItem";
import TodoForm from "@/components/Todo/TodoForm";

const TodoListForm = (): JSX.Element => {
	const [todoItemList, setTodoList] = useState<TodoItemProps[]>([
		{
			title: "タイトル",
			content: "TODO内容はここに記載します。",
			status: "Done",
		},
		{
			title: "タイトル2",
			content: "TODO内容の二番目",
			status: "Progress",
		},
		{
			title: "タイトル3",
			content: "TODO内容の3番目",
			status: "Incomplete",
		},
	]);
	const addTodoOnClick = (todo: TodoItemProps) => {
		// const newTodoList = todoItemList.slice();
		const newTodoList = [...todoItemList];

		newTodoList.push(todo);
		setTodoList(newTodoList);
		console.log("追加");
	};

	return (
		<>
			{todoItemList.map((todo, i) => {
				return <TodoItem key={i} {...todo} />;
			})}
			<TodoForm addTodoOnclick={addTodoOnClick} />
		</>
	);
};

export default TodoListForm;

