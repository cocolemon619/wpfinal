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

const LoginForm = () => {
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [result, setResult] = useState<UserData | null>(null);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);

    const handleButtonClick = async () => {
        try {
            const response = await fetch(`/api/user/${inputValue}`);
            const user = await response.json();
            setResult(user);
            
            // 入力されたパスワードがユーザーのパスワードと一致するかどうかを確認
            setIsPasswordMatch(user?.password === inputValue2);

            // パスワードが一致した場合、Cookieにユーザー情報を保存
            if (user?.password === inputValue2) {
                document.cookie = `userId=${user?.id}; path=/`;
                document.cookie = `userName=${user?.name}; path=/`;
            }
        } catch (error) {
            console.error('サーバーからデータの取得エラー:', error);
        }
    };

    return (
        <div>
            {isPasswordMatch && <h1>ようこそ、{result?.name}さん</h1>}
            <input
                type="text"
                placeholder="id"
                className="input input-bordered input-primary w-full max-w-xs m-1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                className="input input-bordered input-primary w-full max-w-xs m-1"
                value={inputValue2}
                onChange={(e) => setInputValue2(e.target.value)}
            />
            <button className="btn btn-primary m-1" onClick={handleButtonClick}>
                送信
            </button>
            {isPasswordMatch && <p>id: {result?.id}</p>}
            {isPasswordMatch && <p>パスワード: {result?.password}</p>}
        </div>
    );
}

export default LoginForm;
