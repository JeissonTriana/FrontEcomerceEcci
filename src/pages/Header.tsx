import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ Name: '', Type: 0 });
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function checkAuthentication() {
      const sessionData = JSON.parse(
        localStorage.getItem('userSession') || '{}'
      );
      setIsAuthenticated(!!sessionData.Id); // Simplifica la verificación a booleano
      setUserData({
        Name: sessionData.Name || '',
        Type: sessionData.Type || 0,
      });
    }

    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((acc: any, cur: any) => acc + cur.Count, 0);
      setCartCount(count);
    }

    // Evento para escuchar cambios en el localStorage
    window.addEventListener('storage', () => {
      checkAuthentication();
      updateCartCount();
    });

    // Verificar la autenticación al montar el componente
    checkAuthentication();
    updateCartCount();

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener('storage', checkAuthentication);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  return (
    <>
      <header>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='container-fluid'>
            <Link className='navbar-brand' to='/'>
              Ecommerce
            </Link>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarNav'
              aria-controls='navbarNav'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
              <ul className='navbar-nav ms-auto'>
                <li className='nav-item'>
                  <Link className='nav-link' to='/cart'>
                    <FontAwesomeIcon icon={faShoppingCart} /> {cartCount}
                  </Link>
                </li>
                {isAuthenticated ? (
                  <>
                    <li
                      className='nav-item'
                      style={{ marginTop: 8, marginRight: 10, color: 'white' }}
                    >
                      <span className='navbar-text'>Hola, {userData.Name}</span>
                    </li>
                    {userData.Type === 1 && (
                      <li className='nav-item'>
                        <Link className='nav-link' to='/admin'>
                          Administración
                        </Link>
                      </li>
                    )}
                    <li className='nav-item'>
                      <Link
                        className='nav-link'
                        to='/'
                        onClick={() => {
                          localStorage.removeItem('userSession');
                          setIsAuthenticated(false);
                          setUserData({ Name: '', Type: 0 });
                        }}
                      >
                        Cerrar Sesión
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className='nav-item'>
                      <Link className='nav-link' to='/register'>
                        Registrarse
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link className='nav-link' to='/login'>
                        Iniciar Sesión
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
