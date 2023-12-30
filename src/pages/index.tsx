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
      <Header title="Let's begin!!" />
      <button className="btn">
        <Link href="./login">Button</Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      </button>
      <div className="w-100 flex h-96 flex justify-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
      <Footer />
    </div>
  )
}

export default Start