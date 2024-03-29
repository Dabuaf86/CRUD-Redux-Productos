import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { eliminarProductoAction, obtenerProductoEditarAction } from '../actions/productoActions';
import Swal from 'sweetalert2';

const Producto = ({ producto }) => {
	const { id, nombre, precio } = producto;

	const dispatch = useDispatch();
	const navigate = useNavigate();
	// Confirmar si desea eliminar el producto
	const confirmarEliminarProducto = id => {
		// Preguntar al usuario
		Swal.fire({
			title: '¿Estás seguro?',
			text: 'Esta acción no puede deshacerse',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, eliminar',
			cancelButtonText: 'Cancelar',
		}).then(result => {
			if (result.value) {
				// Pasarlo al action
				dispatch(eliminarProductoAction(id));
			}
		});
	};

	// Función que redirige de forma programada al producto seleccionado
	const redireccionarEdicion = producto => {
		dispatch(obtenerProductoEditarAction(producto));
		navigate(`/productos/editar/${producto.id}`);
	};

	return (
		<tr>
			<td>{nombre}</td>
			<td>
				<span className='font-weight-bold'>$ {precio}</span>
			</td>
			<td className='acciones'>
				<button
					type='button'
					className='btn btn-primary mr-2'
					onClick={() => redireccionarEdicion(producto)}
				>
					Editar
				</button>
				<button
					type='button'
					className='btn btn-danger'
					onClick={() => confirmarEliminarProducto(id)}
				>
					Eliminar
				</button>
			</td>
		</tr>
	);
};

export default Producto;
