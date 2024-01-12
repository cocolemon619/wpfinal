import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import TodoEditForm from "@/components/Todo/TodoEditForm";

import Link from "next/link";

const todoEdit = () => {
    return (
        <div>
            <Header title="ToDoEdit" />
            <div className="">
                <div className="my-5">
                    <TodoEditForm />
                </div>
            </div>
            <div className="card bg-primary h-10 w-40 text-white flex items-center justify-center mx-auto mb-3 shadow-md font-semibold hover:bg-indigo-700">
                <button className=""><Link href="./todo">追加画面</Link></button>
            </div>
            <Footer />
        </div>
    )
}

export default todoEdit;
