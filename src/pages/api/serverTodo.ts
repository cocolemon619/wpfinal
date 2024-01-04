// src/pages/api/serverTodo.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const todos = await prisma.todo.findMany();
        res.status(200).json(todos);
    } catch (error) {
        console.error('エラー: TODOの取得に失敗しました', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect(); // Disconnect the Prisma client after the request is processed
    }
};
