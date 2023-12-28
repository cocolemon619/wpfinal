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
      {/* <Header title="Let's begin!!" /> */}
      <div className="w-100 flex h-96 flex justify-center">
        <span className="loading loading-infinity loading-lg"></span>
        {/* <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span> */}
      </div>
      <Footer />
    </div>
  )
}

export default Start