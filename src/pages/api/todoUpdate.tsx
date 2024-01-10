// src/pages/api/todoUpdate.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { id, title, content, status } = req.body;

    try {
        const updatedTodo = await prisma.todo.update({
            where: { id: parseInt(id) },
            data: {
                title,
                content,
                status,
            },
        });

        res.status(200).json(updatedTodo);
    } catch (error) {
        console.error('データの更新エラー:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
};
