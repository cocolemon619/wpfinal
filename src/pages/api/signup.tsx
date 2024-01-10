import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, mail, password } = req.body;

        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    mail,
                    password,
                },
            });

            res.status(201).json({ success: true, user });
        } catch (error) {
            res.status(500).json({ success: false, error: 'ユーザーの作成に失敗しました' });
        }
    } else {
        res.status(405).json({ success: false, error: 'メソッドが許可されていません' });
    }
}
