// src/pages/api/todoAdd.tsx

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const { id, title, content, status, assign } = req.body;

        try {
            const todo = await prisma.todo.create({
                data: {
                    title,
                    content,
                    status,
                    assign,
                },
            });

            // res.status(201).json({ success: true, user });
            res.json(todo);
            console.log("hello!!!!")
            console.log(todo);
        } catch (error) {
            console.error('ログインエラー:', error);
            res.status(500).json({ success: false, error: 'ログインに失敗しました' });
        }
    } else {
        res.status(405).json({ success: false, error: 'メソッドが許可されていません' });
    }
};
