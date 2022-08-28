import React from "react";
import BackgroundPng from "../../assets/background.png"
import Header from "../molecules/header"
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function Home() {
  const navigate = useNavigate()

  const { data: products } = useQuery('productsCache', async () => {
    const res = await API.get('/products')
    return res.data.data
  })

  const toDetail = (id) =>{
    navigate("/detail-product/" + id)
  }
  return (
    <>
    <Header />
    <main className="after-nav pb5">
      <section className="pt2 mx10">
        <div className="heading flex jc-between ai-center">
          <article className="py3 px3 txt-white">
            <h1 className="bold fs3-25 bold">WAYSBUCKS</h1>
            <h4 className="mt1 fw300" style={{fontSize: "1.5em"}}>Things are changing, but we're still here for you</h4>
            <p className="mt1-5 fw300">We have temporarily closed our in-store cafes, but select
              <br />grocery and drive-thru locations remaining open.
              <br /><strong className="bold">Waysbucks</strong> Drivers is also available</p>
            <p className="mt2 fw300">Let's Order...</p>
          </article>
          <img src={BackgroundPng} alt="heading" />
        </div>
      </section>

      <section className="mx10">
        <h2 className="mt2 mb2-25 txt-red bold">Let's Order</h2>
        <ul className="drink-list">
            { products?.map((data, index) => (
            <li key={index} className="bg-pink br10">
                <img className="br10" src={data?.image} alt="drink" onClick={()=> toDetail(data?.id)}/>
                <div className="mt0-75 px1 pb1">
                    <h6 className="line-clamp1 txt-red bold">{data?.title}</h6>
                    <p>Rp. {data?.price}</p>
                </div>
            </li>
            ))}
        </ul>
      </section>
    </main>
    </>
  )
}
