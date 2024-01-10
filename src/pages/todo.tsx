import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import TodoListForm from "@/components/Todo/TodoListForm";

import Link from "next/link";

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
            <Header title="ToDo" />

            <div className="">
                <div className="my-3">
                    <TodoListForm />
                </div>
                <div className="card bg-primary h-10 w-40 text-white flex items-center justify-center mx-auto mb-3">
                    <button className=""><Link href="./todoEdit">タスクの編集</Link></button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default todo;
