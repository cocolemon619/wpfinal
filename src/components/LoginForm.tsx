import React, { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';
import { error } from 'console';
import Link from 'next/link';

const prisma = new PrismaClient();

interface UserData {
    id: number;
    name: string;
    mail: string;
    password: string;
    error: null;

}

// ... (既存のコード)

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState<UserData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/server`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const user = await response.json();
            setResult(user);
            if (user.id) {
                // ユーザー情報をcookieに保存
                document.cookie = `userId=${user.id};`;
                document.cookie = `userName=${user.name};`;
                document.cookie = `userMail=${user.mail};`;

                // ログイン後のページに遷移
                window.location.replace("home");
            }
            console.log("GoodNight!!!")
            console.log(user);
            console.log(user.id);
            console.log(result);
        } catch (error) {
            console.log("New Year!!!")
            setError('サーバーからデータの取得エラー: ' + error);
            console.error('サーバーからデータの取得エラー:', error);
            console.log(error)
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            {/* ... (既存のコード) */}
            {result && result.error && <p className="text-red-500">{result.error}</p>}
            {result && <p className="text-green-500">pass:{result.id}</p>}
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body">
                    {/* ... (既存のコード) */}
                    {error && <p className="text-red-500">メールアドレス・パスワードが間違っています</p>} {/* エラーがあれば表示 */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">メール</span>
                        </label>
                        <input
                            type="mail"
                            placeholder="email"
                            className="input input-bordered"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">パスワード</span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            className="input input-bordered"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary" onClick={handleButtonClick}>
                            Log In
                        </button>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 text-center">
                        <Link href="/signup" className="text-gray-600 hover:underline leading-10">新規登録はお済みですか？</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;

