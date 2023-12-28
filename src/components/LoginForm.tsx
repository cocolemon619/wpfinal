import React, { useState } from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UserData {
    id: number;
    name: string;
    mail: string;
    password: string;
}

const LoginForm = () => {
    return(
        <div>

        </div>
    )
}

export default LoginForm;
