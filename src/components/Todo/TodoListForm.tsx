import React, { useState, useEffect } from "react";

import TodoItem, { TodoItemProps } from "@/components/Todo/TodoItem";
import TodoForm from "@/components/Todo/TodoForm";

// ここから機能拡張部分のimport文
import { DndContext, KeyboardSensor, useSensor, useSensors, DragEndEvent, PointerSensor, closestCenter } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const TodoListForm = (): JSX.Element => {
	const [todoItemList, setTodoList] = useState<TodoItemProps[]>([]);
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

	const addTodoOnClick = async (todo: TodoItemProps) => {
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
					assign: userName,
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

	const [userName, setUserName] = useState<string | null>(null);


	useEffect(() => {
		// Cookie から userName を取得
		const userNameFromCookie = getCookie("userName");
		setUserName(userNameFromCookie);
	}, []);

	// Cookie から指定した名前の値を取得する関数
	const getCookie = (name) => {
		const cookies = document.cookie.split(';');
		for (let cookie of cookies) {
			const [cookieName, cookieValue] = cookie.split('=');
			if (cookieName.trim() === name) {
				return cookieValue;
			}
		}
		return null;
	};

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);
	type UniqueIdentifier = string | number;
	const handleDragEnd = (event: DragEndEvent) => {

		const { active, over } = event;

		if (!over) {
			return;
		}

		// 別のTodo上にドロップした場合(over.idとactive.idが異なる)
		if (active.id !== over.id) {
			const oldIndex = todoItemList.findIndex((v) => v.id === active.id);
			const newIndex = todoItemList.findIndex((v) => v.id === over.id);
			// arrayMoveを使用して配列内の順番を入れ替える
			setTodoList(arrayMove(todoItemList, oldIndex, newIndex));
		}
	};

	return (
        <>
            {/* colsはstatusesに設定した状態の数に合わせる */}
            <div className={`flex`}>
                {statuses.map((status, i) => {
                    const filteredTodoList = todoItemList.filter(
                        // statusが"All"の場合はフィルタリングしない
                        (item) => status === "All" || item.status === status
                    );
                    return (
                        <div key={i}>
                            <div className="flex-1 mx-1 px-4 py-2 rounded-lg bg-gray-200 w-64">
                                <span className="inline-flex items-center py-1.5 px-3 mb-1 rounded-full text-xs font-medium bg-gray-500 text-white todo-item">
                                    {status}
                                </span>

                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}>
                                    <SortableContext
                                        items={todoItemList}
                                        strategy={verticalListSortingStrategy}>
                                        {filteredTodoList.map((todo, j) => (
                                            <div key={j}>
                                                <TodoItem key={todo.id} {...todo} />
                                            </div>
                                        ))}
                                    </SortableContext>
                                </DndContext>
                                {status === "All" && <TodoForm addTodoOnclick={addTodoOnClick} />}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default TodoListForm;
