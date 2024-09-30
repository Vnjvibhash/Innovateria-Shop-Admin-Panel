import React, { useEffect, useState } from 'react';
import {
  BsFillArchiveFill,
  BsPeopleFill,
  BsFillBellFill,
  BsFillTagFill,
} from 'react-icons/bs';
import { FaClipboardCheck, FaBuilding, FaImage } from 'react-icons/fa';
import { RiPriceTag2Fill } from 'react-icons/ri';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { AiFillAppstore, AiOutlineAppstore } from 'react-icons/ai';

import {
  getUsers,
  getBrands,
  getCategories,
  getSubcategories,
  getCoupons,
  getPosters,
  getProducts,
  getVariantTypes,
  getVariants,
} from '../../apis/index.api';

function AdminHome() {
  const data = [
    {
      name: 'Page A',
      uv: 7000,
      pv: 2400,
      amt: 2000,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 5000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 3500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 6100,
    },
  ];

  const [state, setState] = useState({
    userSize: 0,
    categorySize: 0,
    subCategorySize: 0,
    variantSize: 0,
    variantTypeSize: 0,
    brandSize: 0,
    posterSize: 0,
    couponSize: 0,
    productSize: 0,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const categoryResponse = await getCategories();
      const userResponse = await getUsers();
      const subCategoryResponse = await getSubcategories();
      const variantResponse = await getVariants();
      const variantTypeResponse = await getVariantTypes();
      const brandResponse = await getBrands();
      const posterResponse = await getPosters();
      const couponResponse = await getCoupons();
      const productResponse = await getProducts();
      setState({
        userSize: userResponse.data.length,
        categorySize: categoryResponse.data.length,
        subCategorySize: subCategoryResponse.data.length,
        variantSize: variantResponse.data.length,
        variantTypeSize: variantTypeResponse.data.length,
        brandSize: brandResponse.data.length,
        posterSize: posterResponse.data.length,
        couponSize: couponResponse.data.length,
        productSize: productResponse.data.length,
      });
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card" style={{ backgroundColor: '#FF6F61' }}>
          <div className="card-inner">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>365</h1>
        </div>
        <div className="card" style={{ backgroundColor: '#8884D8' }}>
          <div className="card-inner">
            <h3>CATEGORIES</h3>
            <AiFillAppstore className="card_icon" />
          </div>
          <h1>{state.categorySize}</h1>
        </div>
        <div className="card" style={{ backgroundColor: '#88B04B' }}>
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{state.userSize}</h1>
        </div>
        <div className="card" style={{ backgroundColor: '#E76F51' }}>
          <div className="card-inner">
            <h3>NOTIFICATIONS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>22</h1>
        </div>
        <div className="card" style={{ backgroundColor: '#FFB74D' }}>
          <div className="card-inner">
            <h3>SUB CATEGORIES</h3>
            <AiOutlineAppstore className="card_icon" />
          </div>
          <h1>{state.subCategorySize}</h1>
        </div>
        <div className="card" style={{ backgroundColor: '#F4A261' }}>
          <div className="card-inner">
            <h3>VARIANTS</h3>
            <FaClipboardCheck className="card_icon" />
          </div>
          <h1>{state.variantSize}</h1>
        </div>
        <div className="card" style={{ backgroundColor: '#82CA9D' }}>
          <div className="card-inner">
            <h3>VARIANTS-TYPE</h3>
            <RiPriceTag2Fill className="card_icon" />
          </div>
          <h1>{state.variantTypeSize}</h1>
        </div>
        <div className="card" style={{ backgroundColor: '#FFEB3B' }}>
          <div className="card-inner">
            <h3>COUPONS</h3>
            <BsFillTagFill className="card_icon" />
          </div>
          <h1>{state.couponSize}</h1>
        </div>
        <div className="card" style={{ backgroundColor: '#92A8D1' }}>
          <div className="card-inner">
            <h3>BRAND</h3>
            <FaBuilding className="card_icon" />
          </div>
          <h1>{state.brandSize}</h1>
        </div>
        <div className="card" style={{ backgroundColor: '#F7CAC9' }}>
          <div className="card-inner">
            <h3>POSTER</h3>
            <FaImage className="card_icon" />
          </div>
          <h1>{state.posterSize}</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amt" fill="#ff7300" />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amt" stroke="#ff7300" yAxisId={0} />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default AdminHome;
