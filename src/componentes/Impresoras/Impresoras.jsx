import React, { useState, useEffect, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Narvbar from '../Narvbar/Narvbar';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Navigate } from 'react-router-dom';
import userContext from '../../auth/hooks/UseContext';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'; 
import imgs from '../../../public/img/clinicauros.jpg' 




export default function Impresoras() {

  const { user } = useContext(userContext)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sedes: '',
    pisos: '',
    ip: '',
    serial: '',
    ubicacion: '',
    mac: '',
    marca: '',
    contador: '',
    fecha: ''
  });
  /* const [formDataEdi, setFormDataEdi] = useState({
     sedes: impresoras.sedes,
     pisos: impresoras.pisos,
     ip: impresoras.ip,
     serial: impresoras.serial,
     ubicacion: impresoras.ubicacion,
     mac: impresoras.mac,
     marca: impresoras.marca,
     contador: impresoras.contador,
     fecha: impresoras.fecha
   });
 */
  const [seleccionaModificacion, setSeleccionModificacion] = useState({})

  const [serial, setSerial] = useState('');
  const [ip, setIp] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,

      [name]: value,
    });
  };

  const [impresoras, setImpresoras] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //boton de buscar por id 
  const [showID, setShowID] = useState(false);

  const handleCloseID = () => setShowID(false);
  const handleShowID = () => setShowID(true);

  //boton de eliminar
  const [showEliminar, setEliminar] = useState(false);
  const handleCerrar = () => setEliminar(false);
  const handleShowEli = () => setEliminar(true);

  const [idEliminar, setIdEliminar] = useState('');

  const handleDeleteImpresora = (id) => {
    setEliminar(true);
    setIdEliminar(id)
  }



  //boton de modificar
  const [showModi, setModi] = useState(false);
  const [idModi, setIdModi] = useState('');


  const handleModificarImpresora = (id) => {
    const seleccionaModificacion = impresoras.find(impresora => impresora._id === id);
    setSeleccionModificacion(seleccionaModificacion);
    setFormData(seleccionaModificacion);
    setModi(true);
    setIdModi(id);
  };



  const handleCloseModi = () => setModi(false);
  const handleShowModi = () => setModi(true);


  //Logica de post de impresoras.

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = e.target.id.value;

    try {

      const response = await fetch('http://localhost:8000/api/inventario/guardarimpresoras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'codificado': ''
        },
        body: JSON.stringify({
          ...formData,
          id,
        }),
      });

      if (response.ok) {
        alert('¡Registro exitoso!');
        Navigate('/impresoras'); // Redirigir a la página de inicio de sesión
      } else {
        console.error('datos incorrectos');
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  //Logica para eliminar por ID Y SERIAL de las impresoras
  const handleEliminarClick = async (id) => {

    const impresora = impresoras.find(impresora => impresora._id === id);
    const numeroSerie = impresora.serial;

    try {

      // Enviar la solicitud DELETE a la API sisa
      const response = await fetch(`http://localhost:8000/api/inventario/eliminarImpresoras/${id}`, {
        method: 'DELETE',
      });

      //espere le muestro por postman


      // Manejar la respuesta
      if (response.status === 200) {
        // Eliminación exitosa
        alert(`Impresora "${numeroSerie}" eliminada con éxito.`);
      } else {
        // Error al eliminar
        const data = await response.json();
        const mensajeError = data.msg || 'Error al eliminar la impresora.';
        alert(mensajeError);
      }
    } catch (error) {
      // Error inesperado
      console.error('Error al eliminar la impresora:', error.message);
      alert('Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.');
    }
  };

  //Logica para modificar impresora
  const handleSubmitModificar = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/inventario/modificarImpresoras/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'codificado': ''
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('¡Modificación exitosa!');
        Navigate('/impresoras'); // Redirigir a la página de impresoras
      } else {
        console.error('Datos incorrectos');
        alert('Error en la modificación');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };


  //Logica para listar impresoras 
  useEffect(() => {
    const fetchImpresoras = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/inventario/listarimpresoras', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        // Ensure data has the expected structure and property
        if (data && data.registrosImpreso) {
          setImpresoras(data.registrosImpreso);
        } else {
          console.error('la api no responde.');
          // Handle the case where the API data is missing or has an unexpected structure
        }
      } catch (error) {
        console.error('Error fetching impresoras:', error);
      }
    };

    fetchImpresoras();
  }, []);

  //api de buscar por id-serial
  const obtenerImpresoras = async (tipoBusqueda, valorBusqueda) => {
    try {
      let url;
  
      // Evaluar el tipo de búsqueda y construir la URL correspondiente
      if (tipoBusqueda === 'serial') {
        url = `http://localhost:8000/api/inventario/listarID/${valorBusqueda}`;
      } else if (tipoBusqueda === 'mac') {
        url = `http://localhost:8000/api/inventario/listarID/${valorBusqueda}`;
      } else if (tipoBusqueda === 'ubicacion') {
        url = `http://localhost:8000/api/inventario/listarID/${valorBusqueda}`;
      } else if (tipoBusqueda === 'ip') {
        url = `http://localhost:8000/api/inventario/listarID/${valorBusqueda}`;
      } else if (tipoBusqueda === 'sedes') {
        url = `http://localhost:8000/api/inventario/listarID/${valorBusqueda}`;
      } else if (tipoBusqueda === 'pisos') {
        url = `http://localhost:8000/api/inventario/listarID/${valorBusqueda}`;
      } else {
        console.error('Tipo de búsqueda inválido:', tipoBusqueda);
        return; // Manejar el tipo de búsqueda inválido
      }
  
      const respuesta = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const datos = await respuesta.json();
  
      if (datos && datos.verificarPro) {
        setImpresoras([datos.verificarPro]); // Suponiendo un único resultado
      } else {
        console.error('API no responde o registro no encontrado.');
        setImpresoras([]); // Limpiar datos si no hay resultados
      }
    } catch (error) {
      console.error('Error al obtener impresoras:', error);
    }
  };


  const inputRefIP = useRef(null);
  const inputRefSerial = useRef(null);

  const handleKeyPressSerial = (event) => {
    if (event.key === 'Enter') {
      obtenerImpresoras('serial', serial);
    }
  };
  const handleKeyPressIP = (event) => {
    if (event.key === 'Enter') {
      obtenerImpresorasIP('ip', ip);
    }
  };
  const enviarMenu = () => {
    navigate('/Home');
  };
  const columns = [
    { field: 'id', headerName: 'id', width: 130 },
    { field: 'sedes', headerName: 'Sedes', width: 130 },
    { field: 'pisos', headerName: 'Pisos', width: 130 },
    { field: 'ip', headerName: 'IP', width: 130 },
    { field: 'serial', headerName: 'Serial', width: 130 },
    { field: 'ubicacion', headerName: 'Ubicacion', width: 130 },
    { field: 'mac', headerName: 'MAC', width: 130 },
    { field: 'marca', headerName: 'Marca', width: 130 },
    { field: 'contador', headerName: 'Contador', width: 130 },
    { field: 'fecha', headerName: 'Fecha', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <>
          <Button variant="danger"  onClick={() => { handleDeleteImpresora(params.row.id) }} >Eliminar</Button>
          <Button variant="info"  onClick={() => handleModificarImpresora(params.row.id)}>Modificar</Button>
        </>
      ),
    },
  ];
    const rows = impresoras.map((impresora) => ({
      id: impresora._id,
      sedes: impresora.sedes,
      pisos: impresora.pisos,
      ip: impresora.ip,
      serial: impresora.serial,
      ubicacion: impresora.ubicacion,
      mac: impresora.mac,
      marca: impresora.marca,
      contador: impresora.contador,
      fecha: impresora.fecha,
    }));

    const generatePDF = () => {

      const doc = new jsPDF()
  
  
  
      /* impresoras.forEach((impresora, index) => {
         y += 10; // Incrementar la posición vertical para cada impresora
         // Agregar los datos de cada impresora al PDF
         doc.text('Tabla de impresoras', 15,5)
         doc.text(`Impresora :`, 10, y);
         doc.text(`Sedes: ${impresora.sedes}`, 10, y + 10);
         doc.text(`Pisos: ${impresora.pisos}`, 10, y + 20);
         doc.text(`IP: ${impresora.ip}`, 10, y + 30);
         doc.text(`Serial: ${impresora.serial}`, 10, y + 40);
         doc.text(`Ubicacion: ${impresora.ubicacion}`, 10, y + 50);
         doc.text(`MAC: ${impresora.mac}`, 10, y + 60);
         doc.text(`Marca: ${impresora.marca}`, 10, y + 70);
         doc.text(`Contador: ${impresora.contador}`, 10, y + 80);
         doc.text(`Fecha: ${impresora.fecha}`, 10, y + 90);
     });*/
      //crear tablas 
  
  
  
      doc.autoTable({
        head: [['Sedes', 'Pisos', 'IP', 'Serial', 'Ubicacion', 'MAC', 'Marca', 'Contador', 'Fecha']],
        body: rows.map(impresora => [impresora.sedes, impresora.pisos, impresora.ip, impresora.serial, impresora.ubicacion, impresora.mac, impresora.marca, impresora.contador, impresora.fecha]),
        styles: {
          tableWidth: 'wrap',
          tableHeight: 'auto'
  
        }
      });
  
      //guardar el pdf un nombre especifico 
      doc.save(`Tabla de impresoras.pdf`)
  
    }

  return (
    <>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Impresoras</title>
        </head>
        <body style={{backgroundImage:`url(${imgs})`, backgroundSize:'cover', margin:'0', padding:'0' }}>
          <Narvbar />
          <Button style={{  marginTop:'10px', marginRight: '20px' }} variant="dark" onClick={enviarMenu}>Menu principal</Button>
          <Button variant="success"  style={{  marginTop:'10px', marginRight: '20px' }} onClick={generatePDF}>Generar PDF </Button>
          <Button style={{ marginTop:'10px', marginRight: '20px' }} variant="success" onClick={handleShowID}>
            Listar por SERIAL
          </Button>

          <Modal show={showID} onHide={handleCloseID}>
            <Modal.Header closeButton>
              <Modal.Title>Buscar por SERIAL</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Ingrese el serial</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="serial"
                    value={serial}
                    onChange={(e) => setSerial(e.target.value)} />
                  <Button variant="success" ref={inputRefSerial} onKeyDown={handleKeyPressSerial} onClick={() => obtenerImpresoras('serial', serial)}>Buscar</Button>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
          <Button style={{ marginTop:'10px'}} variant="primary" onClick={handleShow}>
            Aqui se registra la impresora
          </Button>



          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar impresora</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <br />
              <th>sede</th>
              <Form.Control type="text" placeholder="sede"
                id="sedes"
                name="sedes"
                autoComplete="sedes"
                value={formData.sedes}
                onChange={handleInputChange}
                required />
              <br />
              <th>piso</th>
              <Form.Control type="text" placeholder="Piso"
                id="pisos"
                name="pisos"
                autoComplete="pisos"
                value={formData.pisos}
                onChange={handleInputChange}
                required />
              <br />
              <th>ip</th>
              <Form.Control type="text" placeholder="ip obligatorio"
                id="ip"
                name="ip"
                autoComplete="ip"
                value={formData.ip}
                onChange={handleInputChange}
                required />
              <br />
              <th>serial</th>
              <Form.Control type="text" placeholder="serial"
                id="serial"
                name="serial"
                autoComplete="email"
                value={formData.serial}
                onChange={handleInputChange}
                required />
              <br />
              <th>mac</th>
              <Form.Control type="text" placeholder="Mac"
                id="mac"
                name="mac"
                autoComplete="mac"
                value={formData.mac}
                onChange={handleInputChange}
                required />
              <br />
              <th>ubicacion</th>
              <Form.Control type="text" placeholder="ubicacion"
                id="ubicacion"
                name="ubicacion"
                autoComplete="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                required />
              <br />
              <th>marca</th>
              <Form.Control type="text" placeholder="Marca"
                id="marca"
                name="marca"
                autoComplete="marca"
                value={formData.marca}
                onChange={handleInputChange}
                required />
              <br />
              <th>contador</th>
              <Form.Control type="text" placeholder="Contador"
                id="contador"
                name="contador"
                autoComplete="email"
                value={formData.contador}
                onChange={handleInputChange}
                required />
              <br />
              <th>fecha</th>
              <Form.Control type="text" placeholder="Fecha"
                id="fecha"
                name="fecha"
                autoComplete="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
                required />
              <br />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Guardar
              </Button>
            </Modal.Footer>
          </Modal>

          <Table striped bordered hover>
            <Modal show={showModi} onHide={handleCloseModi}>
              <Modal.Header closeButton>
                <Modal.Title>Quieres modificar?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <br />
                <th>sede</th>
                <Form.Control type="text" placeholder="sede"
                  id="sedes"
                  name="sedes"
                  autoComplete="sedes"
                  value={formData.sedes}
                  onChange={handleInputChange}
                  required />

                <br />
                <th>piso</th>
                <Form.Control type="text" placeholder="Piso"
                  id="pisos"
                  name="pisos"
                  autoComplete="pisos"
                  value={formData.pisos}
                  onChange={handleInputChange}
                  required />
                <br />
                <th>ip</th>
                <Form.Control type="text" placeholder="ip obligatorio"
                  id="ip"
                  name="ip"
                  autoComplete="ip"
                  value={formData.ip}
                  onChange={handleInputChange}
                  required />
                <br />
                <th>serial</th>
                <Form.Control type="text" placeholder="serial"
                  id="serial"
                  name="serial"
                  autoComplete="email"
                  value={formData.serial}
                  onChange={handleInputChange}
                  required />
                <br />
                <th>mac</th>
                <Form.Control type="text" placeholder="Mac"
                  id="mac"
                  name="mac"
                  autoComplete="mac"
                  value={formData.mac}
                  onChange={handleInputChange}
                  required />
                <br />
                <th>ubicacion</th>
                <Form.Control type="text" placeholder="ubicacion"
                  id="ubicacion"
                  name="ubicacion"
                  autoComplete="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleInputChange}
                  required />
                <br />
                <th>marca</th>
                <Form.Control type="text" placeholder="Marca"
                  id="marca"
                  name="marca"
                  autoComplete="marca"
                  value={formData.marca}
                  onChange={handleInputChange}
                  required />
                <br />
                <th>contador</th>
                <Form.Control type="text" placeholder="Contador"
                  id="contador"
                  name="contador"
                  autoComplete="email"
                  value={formData.contador}
                  onChange={handleInputChange}
                  required />
                <br />
                <th>fecha</th>
                <Form.Control type="text" placeholder="Fecha"
                  id="fecha"
                  name="fecha"
                  autoComplete="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  required />
                <br />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModi}>
                  Cerrar
                </Button>
                <Button variant="success" onClick={(e) => handleSubmitModificar(e, idModi)}>
                  Modificado
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal show={showEliminar} onHide={handleCerrar}>
              <Modal.Header>
                <Modal.Title>¿Quiere eliminar impresora?</Modal.Title>
              </Modal.Header>
              <Modal.Body>¿Estas seguro de eliminar?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCerrar}>
                  Close
                </Button>
                <Button variant="danger" onClick={() => {
                  handleEliminarClick(idEliminar)
                }}>
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>

          </Table>
          <div style={{ height: 900 , width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
            checkboxSelection
          />
        </div>
        </body>
      </html>
    </>
  );
}
