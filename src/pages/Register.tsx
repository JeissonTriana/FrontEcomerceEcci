import React, { useState } from 'react';
import EcommerceApi from '../api/Api'; // Asegúrate de que esta importación es correcta
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface RegisterData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const RegisterContainer = styled.div`
  height: 100vh;
  background-image: url('https://via.placeholder.com/1920x1080');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterForm = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.375rem 0.75rem;
  margin-bottom: 1rem;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;

const StyledButton = styled.button`
  width: 100%;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

const Register = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const response = await EcommerceApi.post('/session/register', {
        ...registerData,
        type: 0,
      });
      if (response.status === 200 || response.status === 201) {
        toast.success('¡Registro exitoso!');
        navigate('/Login');
        // Aquí podrías redireccionar al usuario o limpiar el formulario
      } else {
        setError('Failed to register');
      }
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.mensaje);
      } else {
        setError('Ocurrió un error en el servidor');
      }
    }
  };

  return (
    <RegisterContainer>
      <RegisterForm>
        <StyledForm onSubmit={handleSubmit}>
          <h3 className='text-center mb-4'>Registro</h3>
          <StyledInput
            type='text'
            id='name'
            name='name'
            value={registerData.name}
            onChange={handleChange}
            required
            placeholder='Nombre'
          />
          <StyledInput
            type='text'
            id='lastName'
            name='lastName'
            value={registerData.lastName}
            onChange={handleChange}
            required
            placeholder='Apellido'
          />
          <StyledInput
            type='email'
            id='email'
            name='email'
            value={registerData.email}
            onChange={handleChange}
            required
            placeholder='Correo Electrónico'
          />
          <StyledInput
            type='password'
            id='password'
            name='password'
            value={registerData.password}
            onChange={handleChange}
            required
            placeholder='Contraseña'
          />

          {error && <div className='alert alert-danger'>{error}</div>}
          <StyledButton type='submit'>Registrarse</StyledButton>
          <br></br><br></br><br></br><br></br>
          <StyledButton type='button' onClick={() => navigate(-1)} style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}>Volver</StyledButton>
        </StyledForm>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;
