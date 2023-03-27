import React, { useEffect, useState } from 'react';
import { Footer } from '../../components/footer/Footer';
import { Navbar } from '../../components/navbar/Navbar';
import { PizzaList } from '../../components/pizzaList/PizzaList';
import { Slider } from '../../components/slider/Slider';
import axios from "axios";
import { axiosInstance } from '../../config';


export const Home = () => {

  const [pizzaList, setPizzaList] = useState([]);

  useEffect(() => {
      const getProducts = async () => {
        try {
          const res = await axiosInstance.get("/products")
          setPizzaList(res.data)
        } catch(err) {
          throw err
        }
      };
      getProducts();
  }, [])


  return (
    <div>
        <Navbar />
        <Slider />
        <PizzaList pizzaList={pizzaList}/>
        <Footer />
    </div>
  )
}
