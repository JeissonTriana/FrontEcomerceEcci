import React, { useEffect, useState } from 'react';
import EcommerceApi from '../api/Api';
import { formattedPrice } from '../utilities/Utilities';
import { toast } from 'react-toastify';

interface Product {
  Id: string;
  Name: string;
  Description: string;
  Price: number;
  Count: number;
  Image: string | null;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    onGetProducts();
  }, []);

  const onGetProducts = async () => {
    const response = await EcommerceApi.get<Product[]>('/product');
    if (response.status === 200) {
      setProducts(response.data);
    }
  };

  const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };

  const addToCart = (product: Product) => {
    const cart = getCart();
    const productExists = cart.find((item: Product) => item.Id === product.Id);
    if (productExists) {
      productExists.Count += 1;
    } else {
      cart.push({ ...product, Count: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Producto añadido al carrito'); // Puedes cambiar esto por un toast para mejor UX
  };

  return (
    <div className='container mt-4'>
      <div className='row'>
        {products.map((product) => (
          <div key={product.Id} className='col-sm-12 col-md-6 col-lg-4 mb-4'>
            <div className='card h-100'>
              <img
                src={product.Image || 'https://via.placeholder.com/150'}
                className='card-img-top'
                alt={product.Name}
                style={{ height: 400, objectFit: 'cover' }}
              />
              <div className='card-body'>
                <h5 className='card-title'>{product.Name}</h5>
                <p className='card-text'>{product.Description}</p>
                <p className='card-text'>
                  <strong>Precio:</strong> {formattedPrice(product.Price)}
                </p>
                <button
                  className='btn btn-primary'
                  onClick={() => addToCart(product)}
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
