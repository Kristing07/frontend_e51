import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroClientes = ({
  mostrarModal,
  setMostrarModal,    
  nuevoCliente,
  manejarCambioInput,
  agregarCliente, 
}) => {
  return (
    <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>    
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
      </Modal.Header> 
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nombreCliente"> 
            <Form.Label>Nombre del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="nombre_cliente"
              value={nuevoCliente.nombre_cliente}
              onChange={manejarCambioInput} 
              placeholder="Ej: Juan Pérez"
              maxLength={50}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="emailCliente">  
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"  
              name="email_cliente"
              value={nuevoCliente.email_cliente}
              onChange={manejarCambioInput} 
              placeholder="Ej:   Herramientas"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="telefonoCliente">  
            <Form.Label>Teléfono</Form.Label>
            <Form.Control 
              type="text"  
              name="telefono_cliente"
              value={nuevoCliente.telefono_cliente} 
              onChange={manejarCambioInput} 
              placeholder="Ej: +54 9 11 1234 5678"
              maxLength={15}  
              required
            />
          </Form.Group> 
        </Form>
      </Modal.Body>
      <Modal.Footer>  
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button> 
        <Button
          variant="primary"
          onClick={agregarCliente}  
          disabled={!nuevoCliente.nombre_cliente.trim() || !nuevoCliente.email_cliente.trim() || !nuevoCliente.telefono_cliente.trim()}
        >
          Guardar Cliente 
        </Button>
      </Modal.Footer>
    </Modal>
  );
}