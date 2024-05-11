import React, { useEffect, useState } from 'react';
import Header from './Header';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { formattedPrice } from '../utilities/Utilities';
import { Product } from './Products';

export interface CartProduct extends Product {
  Count: number;
}

function Cart() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartProducts(cart);
  };

  const handleRemoveFromCart = (productId: string) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter((item: CartProduct) => item.Id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    toast.info('Producto eliminado del carrito');
  };


  return (
    <>
      <Header />
      <div className='container mt-4'>
        <h1>Carrito de Compras</h1>
        {cartProducts.length > 0 ? (
          <table className='table'>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((product) => (
                <tr key={product.Id}>
                  <td>{product.Name}</td>
                  <td>{formattedPrice(product.Price)}</td>
                  <td>
                    <label>{product.Count}</label>
                  </td>
                  <td>{formattedPrice(product.Price * product.Count)}</td>
                  <td>
                    <Button
                      variant='danger'
                      onClick={() => handleRemoveFromCart(product.Id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Tu carrito está vacío.</p>
        )}
      </div>
    </>
  );
}

export default Cart;
