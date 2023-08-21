const React = require('react');
const client = require('../client');
const { Link } = require('react-router-dom');

class PageHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ventas: [], productos: [], ventadetalles: [] };
	}
	componentDidMount() {
		client({ method: 'GET', path: '/api/ventas' }).done(response => {
			this.setState({ ventas: response.entity._embedded.ventas });
		});
		client({ method: 'GET', path: '/api/productos' }).done(response => {
			this.setState({ productos: response.entity._embedded.productos });
		});
		client({ method: 'GET', path: '/api/ventadetalles' }).done(response => {
			this.setState({ ventadetalles: response.entity._embedded.ventadetalles });
		});

	}
	render() {
		return (
			<>
				<h1>EC4 WEB SERVICES - LUIGGI CHACÓN</h1>
				<div style={{"width": "100%", "display": "flex"}}>
					<div style={{"width": "calc(100% / 3)"}}>
						<Titulo entidad="ventas" emoji="👾" />
						<VentasList ventas={this.state.ventas} />
						<Link to="/nueva-venta">
							<button>Nueva ventas</button>
						</Link>
						</div>
					<div style={{"width": "calc(100% / 3)"}}>
						<Titulo entidad="productos" emoji="👾" />
						<ProductosList productos={this.state.productos} />
						<Link to="/nuevo-producto"><button>Nuevo Producto</button></Link>
					</div>
					<div style={{"width": "calc(100% / 3)"}}>
						<Titulo entidad="ventadetalles" emoji="👾" />
						<VentaDetalleList ventadetalles={this.state.ventadetalles} />
						<Link to="/nuevo-detalleventa"><button>Nuevo Detalle</button></Link>
					</div>
				</div>




			</>
		)
	}
}

const Titulo = (props) => {
	return (
		<>
			<hr />
			<h2>{props.emoji} - {props.entidad}</h2>
			<span>Listado completo de {props.entidad.toLowerCase()}:</span>
			<hr />
		</>
	);
}


class VentasList extends React.Component {
	render() {
		const ventas = this.props.ventas.map(venta =>
			<Venta key={venta._links.self.href} venta={venta} />
		);
		return (
			<table border="1">
				<tbody>
					<tr>
						<th>total</th>
						
					</tr>
					{ventas}
				</tbody>
			</table>
		)
	}
}
class ProductosList extends React.Component {
	render() {
		const productos = this.props.productos.map(producto =>
			<Producto key={producto._links.self.href} producto={producto} />
		);
		return (
			<table border="1">
				<tbody>
					<tr>
						<th>Nombre</th>
						<th>precio</th>
					</tr>
					{productos}
				</tbody>
			</table>
		)
	}
}
class VentaDetalleList extends React.Component {
	render() {
		const ventadetalles = this.props.ventadetalles.map(ventadetalles =>
			<Ventadetalles key={ventadetalles._links.self.href} ventadetalles={ventadetalles} />
		);
		return (
			<table border="1">
				<tbody>
					<tr>
						<th>venta</th>
						<th>producto</th>
						<th>cantidad</th>
					</tr>
					{ventadetalles}
				</tbody>
			</table>
		)
	}
}

class Venta extends React.Component {
	render() {
		const id = this.props.venta._links.self.href.split("/").slice(-1);
		return (
			<tr>
				<td>{this.props.venta.total}</td>
				<td>
					<Link to={`/ver-venta/${id}`}>Ver</Link> | 
					<Link to={`/editar-venta/${id}`}>Editar</Link>
				</td>
			</tr>
		)
	}
}

class Producto extends React.Component {
	render() {
		const id = this.props.producto._links.self.href.split("/").slice(-1);
		return (
			<tr>
				<td>{this.props.producto.nombre}</td>
				<td>{this.props.producto.precio}</td>
				<td>
					<Link to={`/ver-producto/${id}`}>VER</Link>|
					
					<Link to={`/editar-producto/${id}`}>Editar</Link>
				</td>
			</tr>
		)
	}
}

class Ventadetalles extends React.Component {
	render() {
		const id = this.props.ventadetalles._links.self.href.split("/").slice(-1);
		const ventaId = this.props.ventadetalles.ventas ? this.props.ventadetalles.ventas._links.self.href.split("/").slice(-1) : "";
		const productoId = this.props.ventadetalles.productos ? this.props.ventadetalles.productos._links.self.href.split("/").slice(-1) : "";

		const ventaTotal = this.props.ventadetalles.ventas ? this.props.ventadetalles.ventas.total : "";
		const productoNombre = this.props.ventadetalles.productos ? this.props.ventadetalles.productos.nombre : "";
		const cantidad = this.props.ventadetalles.cantidad || "";

		return (
			<tr>
				<td>{ventaTotal}</td>
				<td>{productoNombre}</td>
				<td>{cantidad}</td>
				<td>
					<Link to={`/ver-detalleventa/${id}`}>Ver Detalle venta</Link>|
					<Link to={`/editar-detalleventa/${id}`}>editar Detalle venta </Link>
				</td>
			</tr>
		)
	}
}





module.exports = PageHome;
