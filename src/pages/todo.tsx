import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import TodoListForm from "@/components/Todo/TodoListForm";
import { TodoItemProps } from "@/components/Todo/TodoItem";

//使ってないから下のconst todoItemListはコメントアウトします
// const todoItemList: TodoItemProps[] = [
// 	{
// 		title: "タイトル",
// 		content: "TODO内容はここに記載します。",
//         status:"Done",
// 	},
// 	{
// 		title: "タイトル2",
// 		content: "TODO内容の二番目",
//         status:"Progress",
// 	},
// 	{
// 		title: "タイトル3",
// 		content: "TODO内容の3番目",
//         status:"Incomplete",
// 	},
// ];

const todo = () => {
    return (
        <div>
            <Header title="todo" />
            <div className="">
                <div className="my-5">                    
                    <TodoListForm />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default todo;