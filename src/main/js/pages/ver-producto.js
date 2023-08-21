const React = require('react');
const client = require('../client');
const { Link, useParams} = require('react-router-dom');
const {useState, useEffect} = require('react');

const PageVerProducto = (props) => {

    // const id = props.match.params.id;
    let { id } = useParams();
    const [producto, setProducto] = useState({});

    useEffect(() => {
        client({
            method: 'GET',
            path: '/api/productos/' + id
        }).done(response => {
            setProducto(response.entity);
        });
    }, []);


    return (
        <>
            <h1>VISTA DEL PRODUCTO:</h1>
            <table>
                <tr>
                    <th>Nombre! 👉</th>
                    <td>{producto.nombre}</td>
                </tr>

                <tr>
                    <th>Precio! 👉</th>
                    <td>{producto.precio}</td>
                </tr>
                <Link to="/">Volver</Link>
            </table>

            
        </>
    )
}

module.exports = PageVerProducto;