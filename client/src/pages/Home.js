import axios from "../axios";
import Categorise from '../categorise'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import {Row, Col} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '../features/productSlice';
import ProductPreview from '../components/ProductPreview';
import './Home.css'

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8)
  useEffect(() => {
    axios.get('/products').then(({data}) => dispatch(updateProducts(data)) )
  }, []);

  return (
    <div>
        <img src=' https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png' className='home-banner'></img>
        <div className='featured-products-container container mt-4'>
            <h2>Last products</h2>
            <div className='d-flex justify-content-center flex-wrap'>
              { lastProducts.map((product) => (
              <ProductPreview {...product} />
            ))}
            </div>
        </div>
        <div>
            <Link 
               to={"/category/all"} 
               style={{textAlign: 'right', display: 'block', textDecoration: 'none'}}>
               see more{">>"}
            </Link>
        </div>
        <div className='sale-banner-container mt-4'>

        <h2>Categorise</h2>
        <Row>
          {Categorise.map((category) => (
            <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
            <Col md={4}>
                <div style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${category.img})`, gap: '10px'}} 
               className='category-title'>
                {category.name}
                </div>
            </Col>
            </LinkContainer>
          ))}
        </Row>
        </div>
    </div>
  )
}
