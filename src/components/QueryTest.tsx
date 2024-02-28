import React from 'react';
import { PrismaClient } from '@prisma/client';
import styles from '../styles/QueryTest.module.css';

const prisma = new PrismaClient();



const Users = ({ users }) => {
    return (
        <div>
            <h1>ユーザーリスト</h1>
            {/* <ul className='menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box'>
                {users.map((user) => (
                    <li key={user.id}>
                        <p>ID: {user.id}</p>
                        <p>ユーザー名: {user.name}</p>
                        <p>メールアドレス {user.mail}</p>
                        <p>パスワード: {user.password}</p>
                    </li>
                ))}
            </ul> */}
            {users.map((user) => (
                <ul className='menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box w-64 m-1 shadow'>
                    <li key={user.id}>
                        <p>ID: {user.id}</p>
                        <p>ユーザー名: {user.name}</p>
                        <p>メールアドレス: {user.mail}</p>
                        {/* <p>パスワード: {user.password}</p> */}
                    </li>
                </ul>
            ))}
        </div>
    );
};

export default Users;