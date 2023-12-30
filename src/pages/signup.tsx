import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const SignUp = () => {
    const [name, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, mail, password }),
            });

            if (response.ok) {
                console.log('ユーザーが登録されました');
                window.location.replace("home")
            } else {
                console.error('ユーザーの登録に失敗しました');
            }
        } catch (error) {
            console.error('エラーが発生しました:', error);
        }
    };


    return (
        <div className="bg-[url('/img/kv_3.jpg')] flex items-center justify-center min-h-screen relative z-10 bg-center bg-cover">
            <div className="card w-96 bg-[#ffffff]/60 shadow-xl">
                <div className="card-body items-center text-center">
                    <div className="max-w-md w-full p-6">
                        <h1 className="text-3xl font-semibold mb-6 text-black text-center">新規登録</h1>
                        <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Welcome to KIT Message Borad</h1>
                        <form action="#" method="POST" className="space-y-4" onSubmit={handleSignup}>
                            <div>
                                <input type="text" required id="name" placeholder="ユーザーネーム" className="input input-bordered w-full max-w-xs" value={name} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div>
                                <input type="text" required id="mail" placeholder="メールアドレス" className="input input-bordered w-full max-w-xs" value={mail} onChange={(e) => setMail(e.target.value)} />
                            </div>
                            <div>
                                <input type="password" required id="password" placeholder="パスワード" className="input input-bordered w-full max-w-xs" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <button type="submit" className="w-full btn btn-neutral">Sign Up</button>
                            </div>
                        </form>
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            <p>アカウントをお持ちですか？ <Link href="/login" className="text-blue-600 hover:underline leading-10">ログイン</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SignUp;