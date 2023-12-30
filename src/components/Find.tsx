import React, { useState } from 'react';
import styles from '../styles/LoginForm.module.css';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UserData {
    id: number;
    name: string;
    mail: string;
    password: string;
}

//名前LoginFormだけど、やってることFindなんだよなぁ。。。

const Find = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState<UserData | null>(null);

    const handleButtonClick = async () => {
        try {
            const response = await fetch(`/api/user/${inputValue}`);
            const user = await response.json();
            setResult(user);
        } catch (error) {
            console.error('サーバーからデータの取得エラー:', error);
        }
    };

    return (
        <div>
            {result && <h1>Welcome to Mr.{result.name}</h1>}
            <input
                type="text"
                placeholder="ここに入力してください"
                className="input input-bordered input-primary w-full max-w-xs m-1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="btn btn-primary m-1" onClick={handleButtonClick}>
                Send
            </button>
            {/* {result && <p>id: {result.id}</p>} */}
            {result && <p>pass: {result.password}</p>}
        </div>
    );
}

export default Find;