import React, { useState } from "react";

import TodoItem, { TodoItemProps } from "@/components/Todo/TodoItem";
import TodoForm from "@/components/Todo/TodoForm";

const TodoListForm = (): JSX.Element => {
	const [todoItemList, setTodoList] = useState<TodoItemProps[]>([
		// {
		// 	title: "タイトル",
		// 	content: "TODO内容はここに記載します。",
		// 	status: "Done",
		// },
		// {
		// 	title: "タイトル2",
		// 	content: "TODO内容の二番目",
		// 	status: "Progress",
		// },
		// {
		// 	title: "タイトル3",
		// 	content: "TODO内容の3番目",
		// 	status: "Incomplete",
		// },
	]);

	// Status型に含まれませんが"All"という全ての状態のTodoを表示するカラムも作る事にします
	const [statuses, setStatuses] = useState([
		"All",
		"Incomplete",
		"Progress",
		"Done",
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
			{/* colsはstatusesに設定した状態の数に合わせる */}
			<div className={`flex`}>
				{statuses.map((status, i) => {
					// filterを使用してTodoListの状態に応じてフィルタリングする
					const filteredTodoList = todoItemList.filter(
						// statusが"All"の場合はフィルタリングしない
						(item) => status === "All" || item.status === status
					);

					return (
						<div key={i} className={`flex-1 mx-1 px-4 py-2 rounded-lg bg-gray-200 w-64`}>
							{/* statusに対応したタグを設置 */}
							<span
								className="inline-flex items-center py-1.5 px-3 mb-1 rounded-full text-xs font-medium bg-gray-500 text-white">
								{status}
							</span>
							{/* filterしたTodoListをmapで回してTodoを描画*/}
							{filteredTodoList.map((todo, j) => (
								<div key={j}>
									<TodoItem {...todo} />
								</div>
							))}
							{/* statusがAllの時だけtTodoFormを設置 */}
							{status === "All" && <TodoForm addTodoOnclick={addTodoOnClick} />}
						</div>
					);
				})}
			</div>
		</>
	)

};

export default TodoListForm;

