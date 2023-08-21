const React = require('react');
const client = require('../client');
const { Link, useParams } = require('react-router-dom');

const PageVerDetalleVenta = () => {
	const { id } = useParams();
	const [detalleVenta, setDetalleVenta] = React.useState({});
	const [productoNombre, setProductoNombre] = React.useState("");
	const [ventaTotal, setVentaTotal] = React.useState("");

	React.useEffect(() => {
		client({ method: 'GET', path: `/api/ventadetalles/${id}` }).done(response => {
			setDetalleVenta(response.entity);

			client({ method: 'GET', path: response.entity._links.producto.href }).done(productoResponse => {
				setProductoNombre(productoResponse.entity.nombre);
			});

			client({ method: 'GET', path: response.entity._links.venta.href }).done(ventaResponse => {
				setVentaTotal(ventaResponse.entity.total);
			});
		});
	}, [id]);

	return (
		<>
			<table>
				<h1>VISTA DEL DETALLE DE VENTA:</h1>
				<p>Producto! 👉 {productoNombre}</p>
				<p>Total de Venta! 👉 {ventaTotal}</p>
				<p>Cantidad! 👉 {detalleVenta.cantidad}</p>
				<Link to="/">Volver</Link>
			</table>
			
		</>
	);
};

module.exports = PageVerDetalleVenta;
