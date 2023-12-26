// import React from "react";
import React, { useState } from 'react';

import Header from '../components/Header';
import FV from '../components/FV';
import Find from "../components/Find";
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';
import Link from "next/link";

//Prismaのimport文に関しては、一応書いてあるだけ。使ってないから消しても可。
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Login = () => {
    return (
        <div>
          <Header title="LogInPage" />
          {/* <Find /> */}
          <LoginForm />
          <Footer />
        </div>
    );
  }

export default Login;