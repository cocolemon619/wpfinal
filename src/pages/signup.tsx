import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SignUp = () => {
    const [name, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        // e.preventDefault();

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
        <div>
            <Header title="SignUp" />
            <div className="flex items-center justify-center min-h-screen bg-base-200">
                <div className="card w-96 shadow-xl">
                    <div className="card-body items-center text-center bg-base-100 card">
                        <div className="max-w-md w-full p-6">
                            <form action="#" method="POST" className="space-y-4" onSubmit={handleSignup}>
                                <div>
                                    <input type="text" required id="name" placeholder="name" className="input input-bordered w-full max-w-xs" value={name} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div>
                                    <input type="text" required id="mail" placeholder="email" className="input input-bordered w-full max-w-xs" value={mail} onChange={(e) => setMail(e.target.value)} />
                                </div>
                                <div>
                                    <input type="password" required id="password" placeholder="password" className="input input-bordered w-full max-w-xs" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div>
                                    <button type="submit" className="w-full btn btn-primary">Sign Up</button>
                                </div>
                            </form>
                            <div className="mt-4 text-sm text-gray-600 text-center">
                                <Link href="/login" className="text-gray-600 hover:underline leading-10">アカウントをお持ちですか？</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default SignUp;