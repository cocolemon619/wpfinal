// pages/api/user/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;
    try {
        const user = await prisma.user.findUnique({
            where: { id: +id },
        });
        res.json(user);
    } catch (error) {
        console.error('ユーザーの取得エラー:', error);
        res.status(500).json({ error: '内部サーバーエラー' });
    }
}
