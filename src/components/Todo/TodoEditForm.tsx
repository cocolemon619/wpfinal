import React, { useState, useEffect } from "react";

import TodoItem, { TodoItemProps } from "@/components/Todo/TodoItem";
import TodoForm from "@/components/Todo/TodoForm";
import EditForm from "./EditForm";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const TodoEditForm = (): JSX.Element => {
	const [todoItemList, setTodoList] = useState<TodoItemProps[]>([]);
	// const [todoData, setTodoData] = useState<TodoItemProps[]>([]);
	
	// TodoListForm.tsx などで使用する場所に Status 型を手動で定義
	type Status = "All" | "Done" | "Progress" | "Incomplete" | "";

	// Status型に含まれませんが"All"という全ての状態のTodoを表示するカラムも作る事にします
	const [statuses, setStatuses] = useState<Status[]>([
		"All",
		"Incomplete",
		"Progress",
		"Done",
	]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/serverTodo'); // バックエンドのエンドポイントにリクエスト
				const todos = await response.json();
				setTodoList(todos);
			} catch (error) {
				console.error('エラー: TODOの取得に失敗しました', error);
			}
		};

		fetchData();
	}, []);

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
							{status === "All" && <EditForm addTodoOnclick={addTodoOnClick} />}
						</div>
					);
				})}
			</div>
		</>
	)

};

export default TodoEditForm;
