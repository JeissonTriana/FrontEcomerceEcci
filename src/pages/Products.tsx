import { useEffect, useState } from 'react';
import EcommerceApi from '../api/Api';
import Header from './Header';
import { toast } from 'react-toastify';
import EditProductModal from './EditProduct';
import { Button } from 'react-bootstrap'; // Asegúrate de importar Button si vas a usar react-bootstrap
import { formattedPrice } from '../utilities/Utilities';
import { useNavigate } from 'react-router-dom';

export interface Product {
  Id: string;
  Name: string;
  Description: string;
  Price: number;
  Count: number;
  Image: string | null;
}

function ProductListAdmin() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    function checkAuthentication() {
      const sessionData = JSON.parse(
        localStorage.getItem('userSession') || '{}'
      );
      if (!sessionData.Id) {
        navigate('/');
      }
    }

    // Evento para escuchar cambios en el localStorage
    window.addEventListener('storage', () => {
      checkAuthentication();
    });

    checkAuthentication();
    return () => {
      window.removeEventListener('storage', checkAuthentication);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onGetProducts();
  }, []);

  const onGetProducts = async () => {
    const response = await EcommerceApi.get<Product[]>('/product');
    if (response.status === 200) {
      setProducts(response.data);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      const response = await EcommerceApi.delete(`/product/${productId}`);
      if (response.status === 200 || response.status === 204) {
        onGetProducts();
        toast.success('Producto eliminado con éxito');
      } else {
        toast.error('Error al eliminar el producto');
      }
    } catch (error) {
      toast.error('Error al eliminar el producto');
    }
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleCreateNew = () => {
    setSelectedProduct(null);
    setShowEditModal(true);
  };

  return (
    <>
      <Header></Header>
      <EditProductModal
        product={selectedProduct}
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onProductUpdated={onGetProducts}
      />
      <div className='container mt-4'>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <h1>Administración de Productos</h1>
          <Button variant='primary' onClick={handleCreateNew}>
            Crear Nuevo Producto
          </Button>
        </div>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.Id}>
                <td style={{ textAlign: 'center' }}>
                  <img
                    src={product.Image || 'https://via.placeholder.com/150'}
                    alt={product.Name}
                    style={{
                      width: 'auto',
                      height: '200px',
                      objectFit: 'cover',
                    }}
                  />
                </td>
                <td>{product.Name}</td>
                <td>{product.Description}</td>
                <td>{product.Count}</td>
                <td>{formattedPrice(product.Price)}</td>
                <td>
                  <button
                    className='btn btn-info'
                    onClick={() => handleEdit(product)}
                  >
                    Editar
                  </button>{' '}
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDelete(product.Id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductListAdmin;
