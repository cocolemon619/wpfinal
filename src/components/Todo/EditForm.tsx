import React, {useEffect, useState } from "react";
import { TodoItemProps } from "@/components/Todo/TodoItem";

type TodoFormProps = {
    addTodoOnclick: (todo: TodoItemProps) => void;
};

const EditForm = (props: TodoFormProps) => {
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
    
    const [formTodo, setFormTodo] = useState<TodoItemProps>({
        id: 1,
        title: "Hello",
        content: "World",
        status: "Incomplete",
        assign:String(userName),
    });

    const handleButtonClick = async () => {
        try {
            const response = await fetch('/api/todoUpdate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: formTodo.id,
                    title: formTodo.title,
                    content: formTodo.content,
                    status: formTodo.status,
                    assign:formTodo.assign,
                }),
            });

            if (response.ok) {
                const updatedTodo = await response.json();
                props.addTodoOnclick(updatedTodo);
                window.location.replace("todo");
            } else {
                console.error('サーバーからデータの取得エラー:', response.status);
            }
        } catch (error) {
            console.error('サーバーからデータの取得エラー:', error);
        }
    };

    const handlerTodoIdFormOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newTodo = { ...formTodo };
        newTodo.id = event.target.value;
        setFormTodo(newTodo);
    };

    const handlerTodoTitleFormOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newTodo = { ...formTodo };
        newTodo.title = event.target.value;
        setFormTodo(newTodo);
    };

    const handlerTodoContentFormOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newTodo = { ...formTodo };
        newTodo.content = event.target.value;
        setFormTodo(newTodo);
    };

    const handlerTodoStatusFormOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newTodo = { ...formTodo };
        newTodo.status = event.target.value;
        setFormTodo(newTodo);
    };

    const handlerTodoAssignFormOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newTodo = { ...formTodo };
        newTodo.assign = event.target.value;
        setFormTodo(newTodo);
    };

    return (
        <div className="w-100 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            {/* <p>{formTodo.title}</p> */}{/* formTodoのtitleとcontentをデバッグする用 */}
            {/* <p>{formTodo.content}</p> */}
            <form onSubmit={(e) => e.preventDefault()} >
                <div className="m-2">
                    <label className="text-gray-400">id</label>
                    <input
                        type="text"
                        value={undefined}
                        onChange={handlerTodoIdFormOnChange}
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="m-2">
                    <label className="text-gray-400">タイトル</label>
                    <input
                        type="text"
                        value={formTodo.title}
                        onChange={handlerTodoTitleFormOnChange}
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="m-2">
                    <label className="text-gray-400">内容</label>
                    <input
                        type="text"
                        value={formTodo.content}
                        onChange={handlerTodoContentFormOnChange}
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="m-2">
                    <label className="text-gray-400">進捗</label>
                    <input
                        type="text"
                        value={formTodo.status}
                        onChange={handlerTodoStatusFormOnChange}
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="m-2">
                    <label className="text-gray-400">担当</label>
                    <input
                        type="text"
                        value={formTodo.assign}
                        onChange={handlerTodoAssignFormOnChange}
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="m-2">
                    <button
                        onClick={handleButtonClick}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        TODO編集
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditForm;