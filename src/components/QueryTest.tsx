import React from 'react';
import { PrismaClient } from '@prisma/client';
import styles from '../styles/QueryTest.module.css';

const prisma = new PrismaClient();



const Users = ({ users }) => {
    return (
        <div>
            <h1>ユーザーリスト</h1>
            {users.map((user) => (
                <ul key={user.id} className='menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box w-64 m-1 shadow'>
                    <li>
                        <p>ID: {user.id}</p>
                        <p>ユーザー名: {user.name}</p>
                        <p>メールアドレス: {user.mail}</p>
                    </li>
                </ul>
            ))}
        </div>
    );
};

export default Users;