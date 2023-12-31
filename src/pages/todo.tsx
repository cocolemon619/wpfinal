import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import TodoItem from "@/components/Todo/TodoItem";
import Footer from "@/components/Footer";

import TodoForm from "@/components/Todo/TodoForm";
import TodoItemList from "@/components/Todo/TodoItemList";
import { TodoItemProps } from "@/components/Todo/TodoItem";

const todoItemList: TodoItemProps[] = [
	{
		title: "タイトル",
		content: "TODO内容はここに記載します。",
        status:"Done",
	},
	{
		title: "タイトル2",
		content: "TODO内容の二番目",
        status:"Progress",
	},
	{
		title: "タイトル3",
		content: "TODO内容の3番目",
        status:"Incomplete",
	},
];

const todo = () => {
    return (
        <div>
            <Header title="todo" />
            <div className="w-100 flex justify-center">
                <div>                    
                    <TodoItemList data={todoItemList} />
                    <TodoForm />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default todo;