import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import '../Reportestecnicos/listar.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


export default function listarReportes() {

    const [formData, setFormData] = useState({
        fecha: '',
        numero_caso: '',
        nombre_usuario: '',
        cedula_usuario: '',
        correo_electronico_usuario: '',
        area: '',
        nombre_ingeniero: '',
        correo_ing: '',
        extension_ing: '',
        celular_ing: '',
        marca_dispositivos: '',
        serial_dispositivo: '',
        mac_dispositivos: '',
        tipo_equipo: '',
        serial_equipo_baja: '',
        marca_instalado: '',
        modelo_instalacion: '',
        serial_parte: '',
        fecha_instalacion: '',
        equipo_garantia: '',
        reporte_garantia: '',
        serial_garantia: '',
        diagnostico: '',
        activos_fijos: '',
        coordinador_area: '',
        img: ''
    });

    useEffect(() => {
        const fetchReportes = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/inventario/reportes/listar', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                // Ensure data has the expected structure and property
                if (data && data.mostrarReportes) {
                    setImpresorass(data.mostrarReportes);
                } else {
                    console.error('la api no responde.');
                    // Handle the case where the API data is missing or has an unexpected structure
                }
            } catch (error) {
                console.error('Error fetching impresoras:', error);
            }
        };

        fetchReportes();
    }, [])
    return (
        <>

            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Listar </title>
                </head>
                <body>
                    <Container className="d-flex justify-content-center align-items-center" style={{ justifyContent: 'center' }}>
                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                            <Form style={{ marginTop: '50px' }} className="reporte-formu" >
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label><th>Fecha</th></Form.Label>
                                        <Form.Select aria-label="reporte_garantia" name="reporte_garantia" value={formData.reporte_garantia}
                                        >
                                            <option value="" >Seleccione fecha</option>



                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Label><th>Numero caso</th></Form.Label>
                                        <Form.Select aria-label="reporte_garantia" name="reporte_garantia" value={formData.reporte_garantia}
                                        >
                                            <option value="" >Seleccione numero caso</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <th className="mb-3">Datos del usuario</th>
                                    <Form.Group className="mb-3" as={Col}>
                                        <Form.Label><th>Nombre Completo</th></Form.Label>
                                        <Form.Control type="email" placeholder="Correo electronico"

                                            required />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Label><th>Cedula</th></Form.Label>
                                        <Form.Control type="email" placeholder="Correo electronico"

                                            required />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Form.Label><th>Correo electronico</th></Form.Label>
                                        <Form.Control type="email" placeholder="Correo electronico"
                                            id="correo_electronico_usuario"
                                            name="correo_electronico_usuario"
                                            autoComplete="correo_electronico_usuario"
                                            value={formData.correo_electronico_usuario}

                                            required />
                                    </Form.Group>
                                    <Form.Group className="mb-3" as={Col}>
                                        <Form.Label><th>Area</th></Form.Label>
                                        <Form.Control type="email" placeholder="Correo electronico"
    
                                            required />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label><th>Extension</th></Form.Label>
                                        <Form.Control type="text" placeholder="extension"

                                            required />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <th className="mb-3">Datos del equipo</th>

                                    <Form.Group className="mb-3" as={Col}>
                                        <Form.Label><th>Tipo de equipo</th></Form.Label>
                                        <Form.Control type="email" placeholder="Correo electronico"
 
                                            required />
                                    </Form.Group>
                                    <Form.Group className="mb-3" as={Col}>
                                        <Form.Label><th>Marca</th></Form.Label>
                                        <Form.Control type="email" placeholder="Correo electronico"

                                            required />
                                    </Form.Group>

                                    <Form.Group className="mb-3" as={Col}>
                                        <Form.Label><th>Serial</th></Form.Label>

                                        <Form.Control type="email" placeholder="Correo electronico"

                                            required />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label><th>Mac</th></Form.Label>
                                        <Form.Control type="email" placeholder="Correo electronico"
                                            required />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Label><th>Equipo de garantia</th></Form.Label>
                                        <Form.Select aria-label="equipo_garantia" name="equipo_garantia" value={formData.equipo_garantia} >
                                            <option>Seleccione el area</option>
                                            <option value="SI">SI</option>
                                            <option value="NO">N/A</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <th className="mb-3" >Datos del ingeniero</th>
                                    <Form.Group className="mb-3" as={Col}>
                                        <Form.Label><th>Nombre Completo</th></Form.Label>
                                        <Form.Select aria-label="nombre_ingeniero" name="nombre_ingeniero" value={formData.nombre_ingeniero}
                                        >
                                            <option >Selecciona un usuario</option>


                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Form.Label><th>Correo Electronico</th></Form.Label>
                                        <Form.Select aria-label="correo_ing" name="correo_ing" value={formData.correo_ing} o>

                                            <option value="">Seleccione correo</option>



                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Label><th>Extension</th></Form.Label>
                                        <Form.Control type="text" placeholder="Extension"
                                            id="extension_ing"
                                            name="extension_ing"
                                            autoComplete="extension_ing"
                                            value={formData.extension_ing}

                                            required />
                                    </Form.Group>
                                    <Form.Group className="mb-3" as={Col}>
                                        <Form.Label><th>Celular</th></Form.Label>
                                        <Form.Select aria-label="celular_ing" name="celular_ing" value={formData.celular_ing}
                                        >

                                            <option >Seleccione telefono</option>



                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <th className="mb-3">Datos de la partes instaladas</th>
                                    <Form.Group as={Col} >
                                        <Form.Label><th>Marca</th></Form.Label>
                                        <Form.Control type="text" placeholder="Marca" id="marca_instalado"
                                            name="marca_instalado"
                                            autoComplete="marca_instalado"
                                            value={formData.marca_instalado}

                                            required />
                                    </Form.Group>


                                    <Form.Group as={Col} >
                                        <Form.Label><th>Modelo</th></Form.Label>
                                        <Form.Control type="text" placeholder="Modelo" id="modelo_instalacion"
                                            name="modelo_instalacion"
                                            autoComplete="modelo_instalacion"
                                            value={formData.modelo_instalacion}

                                            required />
                                    </Form.Group>



                                    <Form.Group as={Col} >
                                        <Form.Label><th>Serial de la parte</th></Form.Label>
                                        <Form.Control type="text" placeholder="Serial de la parte"
                                            id="serial_parte"
                                            name="serial_parte"
                                            autoComplete="serial_parte"
                                            value={formData.serial_parte}

                                            required />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Label><th>Fecha de instalacion</th></Form.Label>
                                        <Form.Control type="text" placeholder="Fecha de instalacion"
                                            id="fecha_instalacion"
                                            name="fecha_instalacion"
                                            autoComplete="fecha_instalacion"
                                            value={formData.fecha_instalacion}

                                            required />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <th className="mb-3">Datos de la parte defectuosa</th>
                                    <Form.Group as={Col} >
                                        <Form.Label><th>Tipo de parte</th></Form.Label>
                                        <Form.Select aria-label="reporte_garantia" name="reporte_garantia" value={formData.reporte_garantia}
                                        >
                                            <option value="" >Seleccione memoria ram</option>



                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Label><th>Serial defectuoso</th></Form.Label>
                                        <Form.Select aria-label="serial_garantia" name="serial_garantia" value={formData.serial_garantia}
                                        >
                                            <option value="" >Seleccione disco duro</option>


                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <th className="mb-3">Se seguiere dar baja</th>

                                    <Form.Group as={Col} >
                                        <Form.Label><th>Tipo de parte</th></Form.Label>
                                        <Form.Select aria-label="tipo_parte">
                                            <option value="" >Seleccione disco duro</option>



                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Label><th>Serial de parte</th></Form.Label>
                                        <Form.Select aria-label="serial_equipo_baja" name="serial_equipo_baja" value={formData.serial_equipo_baja}
                                        >
                                            <option>Seleccione serial</option>



                                        </Form.Select>
                                    </Form.Group>

                                </Row>
                                <Row className="mb-3">
                                    <Form.Group className="mb-3" >
                                        <Form.Label><th>Diagnostico de elemento</th></Form.Label>
                                        <Form.Control type="text" placeholder="Escriba su diagnostico"
                                            id="diagnostico"
                                            name="diagnostico"
                                            autoComplete="diagnostico"
                                            value={formData.diagnostico}

                                            required />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">

                                    <Form.Group as={Col} >
                                        <Form.Label><th></th></Form.Label>
                                        <Form.Control type="text" placeholder="Activos fijos"
                                            id="activos_fijos"
                                            name="activos_fijos"
                                            autoComplete="activos_fijos"
                                            value={formData.activos_fijos}

                                            required />
                                        <th>Activos Fijos</th>
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Label></Form.Label>
                                        <Form.Control type="text" placeholder="Coordinador"
                                            id="coordinador_area"
                                            name="coordinador_area"
                                            autoComplete="coordinador_area"
                                            value={formData.coordinador_area}

                                            required />
                                        <th>Coordinador de soporte</th>
                                    </Form.Group>
                                </Row>

                                <Button variant="primary" type="submit">
                                    Enviar
                                </Button>
                            </Form>
                        </Row>
                    </Container>

                </body>
            </html>
        </>
    )
}
