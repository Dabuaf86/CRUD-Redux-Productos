import { useDispatch, useSelector } from 'react-redux';
import { editarProductoAction } from '../actions/productoActions';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditarProducto = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Nuevo state de producto
	const [producto, setProducto] = useState({
		nombre: '',
		precio: '',
	});

	// Producto a editar
	const productoEditar = useSelector(state => state.productos.productoEditar);

	// Llenar el state automáticamente
	useEffect(() => {
		setProducto(productoEditar);
	}, [productoEditar]);

	// Leer datos del formulario
	const handleChangeForm = e => {
		setProducto({
			...producto,
			[e.target.name]: e.target.value,
		});
	};

	const { nombre, precio } = producto;

	const submitEditarProducto = e => {
		e.preventDefault();

		dispatch(editarProductoAction(producto));
		navigate('/');
	};

	return (
		<div className='row justify-content-center'>
			<div className='col-md-8'>
				<div className='card'>
					<div className='card-body'>
						<h2 className='text-center mb-4 font-weight-bold'>
							Editar Producto
						</h2>
						<form onSubmit={submitEditarProducto}>
							<div className='form-group'>
								<label>Nombre Producto</label>
								<input
									type='text'
									className='form-control'
									placeholder='Nombre del Producto'
									name='nombre'
									value={nombre}
									onChange={handleChangeForm}
								/>
							</div>
							<div className='form-group'>
								<label>Precio Producto</label>
								<input
									type='number'
									className='form-control'
									placeholder='Precio del Producto'
									name='precio'
									value={precio}
									onChange={handleChangeForm}
								/>
							</div>
							<button
								type='submit'
								className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
							>
								Guardar
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditarProducto;
