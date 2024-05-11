import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f8f9fa;
  text-align: center;
  padding: 20px;
`;

const ErrorMessage = styled.h1`
  font-size: 2rem;
  color: #dc3545;
  margin-bottom: 20px;
`;

const ErrorDescription = styled.p`
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 30px;
`;

const GoHomeButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <ErrorMessage>¡Ups! Algo salió mal.</ErrorMessage>
      <ErrorDescription>
        No pudimos encontrar la página que estabas buscando. Esto puede ser debido a un error en la URL ingresada o la página pudo haber sido movida o eliminada.
      </ErrorDescription>
      <GoHomeButton onClick={() => window.location.href = '/'}>Volver al inicio</GoHomeButton>
    </ErrorContainer>
  );
};

export default ErrorPage;