// components/Header.tsx
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router';

type HeaderProps = {
    title: string
}

const Header = ({ title }: HeaderProps) => {
    const [userName, setUserName] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Cookie から userName を取得
        const userNameFromCookie = getCookie("userName");
        setUserName(userNameFromCookie);
    }, []);

    // Cookie から指定した名前の値を取得する関数
    const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === name) {
                return cookieValue;
            }
        }
        return null;
    };

    // Cookie を削除する関数
    const deleteCookies = () => {
        document.cookie = 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'userName=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'userMail=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setUserName(null);  // state も更新しておく
        router.reload();
    };

    return (
        <div className="navbar bg-base-100 sticky top-0 z-10">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">{title}</a>
            </div>
            <input type="checkbox" value="night" className="toggle theme-controller" />
            <div className="flex-none">
                <ul className="menu menu-horizontal px-8">
                    <li>
                        <details>
                            <summary>
                                Link
                            </summary>
                            <ul className="p-2 bg-base-100 rounded-t-none">
                                <li><Link href="/">HOME</Link></li>
                                <li><Link href="/login">LOGIN</Link></li>
                                <li><button onClick={deleteCookies}>LOGOUT</button></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header