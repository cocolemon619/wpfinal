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
            <Footer />
        </div>
    )
}

export default todoEdit;
