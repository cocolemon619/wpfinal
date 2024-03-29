import React, { useState, useMemo, useEffect } from "react";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TodoItem, { Todo } from "./NewTodoItem"
import TodoForm from "./TodoForm";
import { fromJSON } from "postcss";
const TodoListForm = (): JSX.Element => {
	const [todoItemList, setTodoList] = useState<Todo[]>([
		{
			id: 1,
			title: "タイトル",
			content: "TODO内容はここに記載します。",
			status: "Done",
			assign: "",
		},
		{
			id: 2,
			title: "タイトル2",
			content: "TODO内容の二番目",
			status: "Progress",
			assign: "",
		},
		{
			id: 3,
			title: "タイトル3",
			content: "TODO内容の3番目",
			status: "Incomplete",
			assign: "",
		},
		{
			id: 4,
			title: "4番目",
			content: "差し込みIncomplete",
			status: "Incomplete",
			assign: "",
		},
		{
			id: 5,
			title: "5番目のTODO",
			content: "TODO内容の4番目はDONE",
			status: "Done",
			assign: "",
		},
	]);
	const [statuses, setStatuses] = useState([
		"All",
		"Incomplete",
		"Progress",
		"Done",
	]);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		console.log(over ? `over.id is ${over.id}` : "そこには何もありません");
		console.log("active id is " + active.id);

		if (!over) {
			return;
		}
		if (active.id !== over.id) {
			const oldIndex = todoItemList.findIndex((v) => v.id === active.id);
			const newIndex = todoItemList.findIndex((v) => v.id === over.id);
			setTodoList(arrayMove(todoItemList, oldIndex, newIndex));
		}
	};
	const addTodoOnClick = async (todo: Todo) => {
		try {
			// バックエンドのエンドポイント '/api/todoAdd' にPOSTリクエストを送信
			const response = await fetch('/api/todoAdd', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: todo.title,
					content: todo.content,
					status: todo.status,
					assign: "",
				}),
			});
	
			// レスポンスが正常ならば追加したTodoを取得
			if (response.ok) {
				const addedTodo = await response.json();
	
				// Todoリストを更新
				setTodoList((prevTodoList) => [...prevTodoList, addedTodo]);
			} else {
				// エラーレスポンスの場合、エラーメッセージをコンソールに出力
				console.error('エラー: TODOの追加に失敗しました', response.status, response.statusText);
			}
		} catch (error) {
			console.error('エラー: TODOの追加に失敗しました', error);
		}
	};

	return (
		<>
        			<div className={`grid grid-cols-${statuses.length} grid-cols-4`}>
				{statuses.map((status, i) => {
					const filteredTodoList = todoItemList.filter(
						(item) => status === "All" || item.status === status
					);
					return (
						<div key={i} className="mx-2 px-4 py-2 rounded-lg bg-gray-200">
							<span className="inline-flex items-center py-1.5 px-3 mb-1 rounded-full text-xs font-medium bg-gray-500 text-white">
								{status}
							</span>
                            
							{status !== "All" ? (
								<>
									<DndContext
										sensors={sensors}
										collisionDetection={closestCenter}
										onDragEnd={handleDragEnd}>
										{filteredTodoList.map((todo, j) => (
											<SortableContext
												key={todo.id}
												items={todoItemList}
												strategy={verticalListSortingStrategy}>
												<TodoItem todo={todo} isSortable />
											</SortableContext>
										))}
									</DndContext>
								</>
							) : (
								filteredTodoList.map((todo, j) => (
									<TodoItem key={todo.id} todo={todo} />
								))
							)}
							{status === "All" && <TodoForm addTodoOnclick={addTodoOnClick} />}
						</div>
					);
				})}
			</div>
		</>
	);
};
export default TodoListForm;