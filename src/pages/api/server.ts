import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        console.log('リクエストボディ:', req.body);

        try {
            const user = await prisma.user.findUnique({
                where: {
                    mail:email,
                    password,
                },
            });

            // res.status(201).json({ success: true, user });
            res.json(user);
            console.log(user);
        } catch (error) {
            console.error('ログインエラー:', error);
            res.status(500).json({ success: false, error: 'ログインに失敗しました' });
        }
    } else {
        res.status(405).json({ success: false, error: 'メソッドが許可されていません' });
    }
}
