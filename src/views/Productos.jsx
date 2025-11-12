import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaProductos from "../components/productos/TablaProductos";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [productosFiltrados, setproductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/API/productos");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los productos");
      }
      const datos = await respuesta.json();
      setProductos(datos);
      setproductosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.long(error.message);
      setCargando(false);
    }
  }


  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = productos.filter(
      (producto) =>
        producto.nombre_producto.toLowerCase().includes(texto) ||
        producto.descripcion_producto.toLowerCase().includes(texto) ||
        producto.id_categoria == texto ||
        producto.stock == texto ||
        producto.precio_nitario == texto
    );
    setproductosFiltrados(filtrados);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const generarPDFProductos = () => {
const doc = new jsPDF();

doc.setFillColor(28, 41, 51);
doc.rect(0, 0, 220, 30, 'F');
doc.setTextColor(255, 255, 255); // Color del título
doc.setFontSize(28);
doc.text("Lista de Productos", doc.internal.pageSize.getWidth() / 2, 18, { align: "center" });

const columnas = ["ID", "Nombre", "Descripción", "Categoría", "Precio", "Stock"];
const filas = productosFiltrados.map((producto) => [
  producto.id_producto,
  producto.nombre_producto,
  producto.descripcion_producto,
  producto.id_categoria,
  `C$ ${producto.precio_unitario}`,
  producto.stock,
  1
]);

// Marcador para mostrar el total de páginas
const totalPaginas = "{total_pages_count_string}";
//Configuración de la tabla
autoTable(doc, {
  head: [columnas],
  body: filas,
  starty: 40,
  theme: "grid",
  styles: {
    fontSize: 10,
    cellPadding: 2
  },
  margin: {
    top: 20,
    left: 14,
    right: 14
  },
  tableWidth: "auto", // Ajuste de ancho automatico
  columnStyles: {
    '@': { cellWidth: 'auto' }, // Ajuste de ancho automatico
    1: { cellWidth: 'auto' },
    2: { cellWidth: 'auto' }
  },
  pageBreak: "auto",
  rowPageBreak: "auto",
  
  // Hook que se ejecuta al dibujar cada página
  didDrawPage: function (data) {
    // Altura y ancho de la pagina actual
    const alturaPagina = doc.internal.pageSize.getHeight();
    const anchoPagina = doc.internal.pageSize.getWidth();

    // Número de página actual
    const numeroPagina = doc.internal.getNumberOfPages();

    // Definir texto de número de página en el centro del documento
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const piePagina = 'Pagina ${numeroPagina} de ${totalPaginas}';
    doc.text(piePagina, anchoPagina / 2 + 15, alturaPagina - 10, { align: "center" });
  }
});

// Guardar el PDF con un nombre basado en la fecha actual
const fecha = new Date();
const dia = String(fecha.getDate()).padStart(2, '0');
const mes = String(fecha.getMonth() + 1).padStart(2, '0');
const anio = fecha.getFullYear();
const nombreArchivo = `productos_${dia}${mes}${anio}.pdf`;

doc.save(nombreArchivo);

}

  return (
    <>
    <Container className="mt-4">
        <h4>Productos</h4>

        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>

        <TablaProductos 
        productos={productosFiltrados} 
        cargando={cargando}
        />
    </Container>
    </>
  );
}
export default Productos;