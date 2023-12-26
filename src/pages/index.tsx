//import Reactは全てのページで必須です
import React, { useEffect, useState } from "react";
//import Headet ~ Footer はコンポーネントを読み込んでいます
import Header from '../components/Header';
import FV from '../components/FV'
import Footer from '../components/Footer';
import QueryTest from "@/components/QueryTest";
//import Linkはページ遷移に必要です
import Link from "next/link";
//import prismaClientは表示にDBからデータを読み込むのに必要です
import { PrismaClient } from '@prisma/client';
//const prismaもDBからデータを読み込むのに必要です
const prisma = new PrismaClient();


const Home = ({ users }) => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Cookie から userName を取得
    const userNameFromCookie = getCookie("userName");
    setUserName(userNameFromCookie);
  }, []);

  // Cookie から指定した名前の値を取得する関数
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        return cookieValue;
      }
    }
    return null;
  };
  return (
    <div>
      <Header title="HomePage" />
      {userName && <p>Welcome to {userName}</p>}
      <QueryTest users={users} />
      {/* <FV imageUrl="img/kurage.jpg" altText="プログラミング画像" catchphrase="最高のプログラミング教材を提供します！" buttonText="今すぐ始める" /> */}
      <Footer />
    </div>
  )
}

// getStaticPropsの結果をHomeコンポーネントに渡す
export async function getStaticProps() {
  // データベースからデータを取得
  const users = await prisma.user.findMany();
  return {
    props: {
      users,
    },
  };
}

export default Home;