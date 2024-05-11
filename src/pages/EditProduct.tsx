import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import EcommerceApi from '../api/Api';
import { toast } from 'react-toastify';

interface Product {
  Id?: string;
  Name: string;
  Description: string;
  Price: number;
  Count: number;
  Image: string | null;
}

interface Props {
  product?: Product | null;
  show: boolean;
  onHide: () => void;
  onProductUpdated: () => void;
}

const EditProductModal: React.FC<Props> = ({
  product,
  show,
  onHide,
  onProductUpdated,
}) => {
  const [formData, setFormData] = useState<Product>({
    Name: '',
    Description: '',
    Price: 0,
    Count: 0,
    Image: null,
  });

  // Actualiza formData cuando el producto cambia
  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        Name: '',
        Description: '',
        Price: 0,
        Count: 0,
        Image: null,
      });
    }
  }, [product, show]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const apiMethod = product?.Id ? 'put' : 'post';
      const apiPath = product?.Id ? `/product/${product.Id}` : '/product';
      const response = await EcommerceApi[apiMethod](apiPath, formData);

      if (response.status === 200 || response.status === 201) {
        toast.success(
          `Producto ${product ? 'actualizado' : 'creado'} con éxito`
        );
        onHide();
        onProductUpdated();
      } else {
        toast.error(`Error al ${product ? 'actualizar' : 'crear'} el producto`);
      }
    } catch (error) {
      toast.error(`Error al ${product ? 'actualizar' : 'crear'} el producto`);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {product ? 'Editar Producto' : 'Crear Producto'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='text'
              name='Name'
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type='text'
              name='Description'
              value={formData.Description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type='number'
              name='Price'
              value={formData.Price.toString()}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type='number'
              name='Count'
              value={formData.Count.toString()}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type='text'
              name='Image'
              value={formData.Image || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div style={{ textAlign: 'center' }}>
            <Button variant='primary' type='submit'>
              {product ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
