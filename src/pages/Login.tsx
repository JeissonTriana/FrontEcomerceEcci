import React, { useState } from 'react';
import EcommerceApi from '../api/Api';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface LoginData {
  email: string;
  password: string;
}

const LoginContainer = styled.div`
  height: 100vh;
  background-image: url('https://via.placeholder.com/1920x1080');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.div`
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

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await EcommerceApi.post('/session/login', loginData);
      if (response.status === 200) {
        navigate('/');
        localStorage.setItem('userSession', JSON.stringify(response.data));
      } else {
        setError('El usuario o la contraseña es incorreecta');
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
    <LoginContainer>
      <LoginForm>
        <StyledForm onSubmit={handleSubmit}>
          <h3 className='text-center mb-4'>Iniciar Sesión</h3>
          <StyledInput
            type='email'
            id='email'
            name='email'
            value={loginData.email}
            onChange={handleChange}
            required
            placeholder='Email'
          />
          <StyledInput
            type='password'
            id='password'
            name='password'
            value={loginData.password}
            onChange={handleChange}
            required
            placeholder='Contraseña'
          />
          {error && <div className='alert alert-danger'>{error}</div>}
          <StyledButton type='submit'>Entrar</StyledButton>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <StyledButton
            type='button'
            onClick={() => navigate(-1)}
            style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}
          >
            Volver
          </StyledButton>
        </StyledForm>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
