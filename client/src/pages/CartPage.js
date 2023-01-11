import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import React from 'react'
import { Alert, Col, Container, Row, Table } from 'react-bootstrap';
import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation} from "../services/appApi"
import { useSelector } from 'react-redux'
import './CartPage.css'
import CheckoutForm from "../components/CheckoutForm";
// import ModalPopup from '../components/ModalPopup';


const stripePromise = loadStripe("pk_test_51MBeakLDONp8RIDUGsioHw78SvrI4fMtZKVzdAis3ftDQwNSLKcS9UlnLvszjqiFK7HjN7dc4Yvz2G1btiDD8x0i00SRWOpSlm")


function CartPage() {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;
    let cart = products.filter((product) => userCartObj[product._id] != null);
    const [increaseCart] = useIncreaseCartProductMutation();
    const [decreaseCart] = useDecreaseCartProductMutation();
    const [removeFromCart, {isLoading}] = useRemoveFromCartMutation();

    function handleDecrease(product) {
      const {productId} = product;
      const quantity = user.cart[productId];
      if (quantity <= 0) return alert("can't proceed");
      decreaseCart(product)
    }

  return (
    <Container style={{minHeight: " 95vh"}} className="cart-container" >
      {/* <ModalPopup /> */}
        <Row>
          <Col>
            <h1 className="pt-2 h3">Shopping cart</h1>
            {cart.length == 0 ? (
              <Alert variant='info'>Shopping cart is empty. Add products to your cart</Alert>
            ) : ( 
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </Col>
        {cart.length > 0 && (
          <Col md={5}>
              <>
              <Table responsive="sm" className="cart-table" >
                <thead className='tr-titele'>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <thead>
                  {cart.map((item) => (
                    <tr>
                      <td>&nbsp;</td>
                      <td>
                        { !isLoading && <i className="fa fa-times" style={{ marginRight: 10, cursor: "pointer" }} onClick={() => removeFromCart({productId: item._id, price: item.price, userId: user._id})}></i>}
                        <img src={item.pictures[0].url} style={{ width: 100, height: 100, objectFit: "cover" }} />
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <span className="quantity-indicator">
                          <i className="fa fa-minus-circle" onClick={() => handleDecrease({productId: item._id, price: item.price, userId: user._id})} ></i>
                          <span>{user.cart[item._id]}</span>
                          <i className="fa fa-plus-circle" onClick={() => increaseCart({productId: item._id, price: item.price, userId: user._id})}></i>
                        </span>
                      </td>
                      <td>${item.price * user.cart[item._id]} </td>
                    </tr>
                  ))}
                </thead>
              </Table>
              <div>
                <h3 className='h4 pt-4'>Total: ${user.cart.total}</h3>
              </div>
              </>
          </Col>
          )}
        </Row>
    </Container>
  )
}

export default CartPage