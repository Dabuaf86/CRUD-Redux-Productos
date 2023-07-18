import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosAction } from '../actions/productoActions';
import Producto from './Producto';

const Productos = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		// Consultar la API
		const cargarProductos = () => dispatch(obtenerProductosAction());
		cargarProductos();
		// eslint-disable-next-line
	}, []);

	// Obtener el state
	const productos = useSelector(state => state.productos.productos);
	const error = useSelector(state => state.productos.error);
	const cargando = useSelector(state => state.productos.cargando);

	return (
		<Fragment>
			<h2 className='text-center my-5'>Listado de Productos</h2>
			{error && (
				<p className='font-weight-bold alert alert-danger text-center mt-4'>
					Ocurrió un error
				</p>
			)}
			{cargando && <p className='text-center'>Cargando...</p>}
			<table className='table table-striped'>
				<thead className='bg-primary table-dark'>
					<tr>
						<th scope='col'>Nombre</th>
						<th scope='col'>Precio</th>
						<th scope='col'>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{productos.length === 0 ? (
						<tr>
							<td>Aún no hay productos</td>
						</tr>
					) : (
						productos.map(producto => (
							<Producto producto={producto} key={producto.id} />
						))
					)}
				</tbody>
			</table>
		</Fragment>
	);
};

export default Productos;
