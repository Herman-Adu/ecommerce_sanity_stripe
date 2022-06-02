import React from "react";

import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
};

// gets all the products
export const getServerSideProps = async () => {
  // query products
  const query = '*[_type == "product"]';

  // fetch products
  const products = await client.fetch(query);

  // query banner data
  const bannerQuery = '*[_type == "banner"]';

  // fetch banner data
  const bannerData = await client.fetch(bannerQuery);

  // return props and banner so they can be used as props in the Home function
  return {
    props: { products, bannerData },
  };
};

export default Home;
