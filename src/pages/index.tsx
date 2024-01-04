//import Reactは全てのページで必須です
import React from "react";
//import Headet ~ Footer はコンポーネントを読み込んでいます
import Header from '../components/Header';
import Footer from '../components/Footer';
//import Linkはページ遷移に必要です
import Link from "next/link";

const Start = () => {
  return (
    <div>
      <Header title="TOP" />
      <div>
        <div className="mx-10 h-40 mt-4 px-10 pt-5 bg-cyan-300 card">
          <h1 className="text-3xl font-bold">Let's make issue management easier!</h1>
          <h2 className="text-2xl font-mono mt-3">課題管理を楽にしよう！</h2>
        </div>
        <div className="w-100 h-80 justify-center flex">
          <button className="btn m-auto w-36 h-16 bg-cyan-100">
            <Link href="/login"><div className="text-lg font-bold">JOIN US!!</div></Link>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Start