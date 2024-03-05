import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link, useNavigate} from 'react-router-dom'
import './Login.css'; // Importa tu archivo CSS personalizado}
import { io } from 'socket.io-client';
//import { useContext } from '../hooks/useContext';


const socket = io('http://localhost:8000');

socket.on('connect', () =>{
  console.log('conectado')

})


export default function Login() {
   
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        correo: '',
        password: '',
    });
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      //osea que estos datos van para el hook
      try {
      
          const response = await fetch('http://localhost:8000/api/inventario/login/tecnico', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'metasploit': ''
              },
              body: JSON.stringify(formData),
          });
          if (response.ok) {
            
            const data = await response.json();
            const nickname = data.verificar.nickname
            const id = data.verificar.iud
            const rol = data.verificar.rol
            const token = data.token; // Suponiendo que el token está en la respuesta JSON
            console.log('Token recibido:', token);
            console.log('Usuario:', nickname); 
            console.log('Rol:', rol); 
            console.log('ID reciibido:', id);  // Imprimir el token en la consola
            localStorage.setItem('token', token); 
            localStorage.setItem('nickname', nickname);  
            localStorage.setItem('id', id); 
            localStorage.setItem('rol', rol);     
              alert('¡Inicio de sesion exitoso');
              navigate('/Home'); // Redirigir a la página de inicio de sesión
          } else {
              console.error('datos incorrectos');
              alert('Error en el registro');
          }
      } catch (error) {
          console.error('Error en la solicitud:', error);
      }
  };


  return (
    <>
    <Container className="d-flex justify-content-center align-items-center h-100"> {/* Utiliza clases de Bootstrap para centrar vertical y horizontalmente */}
      <Row>
        <Col>
          <Form className="login-form"> {/* Agrega una clase para aplicar estilos personalizados */}
          <Form.Text className="text">Ingrese su credenciales</Form.Text>
          <Form.Group className="mb-3" >
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="email"
                id="correo"
                name="correo"
                autoComplete="email"
                value={formData.correo}
                onChange={handleInputChange}
                required
                placeholder="Correo electrónico"
              />
            </Form.Group>

            
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Contraseña"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Recordar" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Link to="/Registro" variant="info">Registrarse</Link>{' '}
            </Form.Group>
            
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Ingresar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
}

