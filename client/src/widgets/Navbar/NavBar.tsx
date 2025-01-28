import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import { Link } from 'react-router-dom';
import { useUser } from '../../entities/user/hooks/userHook';
import { useAppSelector } from '../../shared/hooks';
import type { RootState } from '../../app/store/store';
import { Button, NavLink } from 'react-bootstrap';

export function NavBar(): React.JSX.Element {
  const { logoutHandler } = useUser();
  const data = useAppSelector((state: RootState) => state.user.data);
  const onSubmit = async (): Promise<void> => {
    await logoutHandler();
  };

  return (
    <div style={{display: 'flex', justifyContent: 'space-beetwen', gap: '50px'}}>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav>
            
            {data && (
              <>
        <Navbar.Brand href="#home">{data?.name}</Navbar.Brand>

                <NavLink as={Link} to="/main">
                  Главная
                </NavLink>
                <NavLink as={Link} to="/addNotebook">
                  Создать новый блокнот
                </NavLink>
                <NavDropdown title="Бургер" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Вах</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Какой</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Бургер</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Отдельная менюшка</NavDropdown.Item>
                </NavDropdown>
                <NavLink as={Button} onClick={onSubmit}>
                  Выход
                </NavLink>
              </>
            )}

            {!data && (
              <>
                <NavLink as={Link} to="/login">
                  Войти
                </NavLink>
                <NavLink as={Link} to="/register">
                  Регистрация
                </NavLink>
              </>
            )}
          </Nav>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}
