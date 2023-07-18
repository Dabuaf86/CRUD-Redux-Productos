import { useDispatch, useSelector } from 'react-redux';
import { crearNuevoProducto } from '../actions/productoActions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	mostrarAlertaAction,
	ocultarAlertaAction,
} from '../actions/alertaActions';

const NuevoProducto = () => {
	const navigate = useNavigate();

	// State del componente
	const [nombre, setNombre] = useState('');
	const [precio, setPrecio] = useState(0);

	// utilizar useDispatch y te crea una función
	const dispatch = useDispatch();

	// Acceder al state del store
	const cargando = useSelector(state => state.productos.loading);
	// const error = useSelector(state => state.productos.error);
	const alerta = useSelector(state => state.alerta.alerta);

	// mandar a llamar al action de productoAction
	const agregarProducto = producto => dispatch(crearNuevoProducto(producto));

	const submitNuevoProducto = e => {
		e.preventDefault();

		// validar formulario
		if (nombre.trim() === '' || precio <= 0) {
			const alerta = {
				message: 'Ambos campos son obligatorios',
				classes: 'alert alert-danger text-center text-uppercase p3',
			};
			dispatch(mostrarAlertaAction(alerta));
			return;
		}

		// si no hay errores
		dispatch(ocultarAlertaAction());

		// crear el nuevo producto
		agregarProducto({ nombre, precio });

		navigate('/');
	};

	const guardarNombre = value => {
		setNombre(value);
	};
	const guardarPrecio = value => {
		setPrecio(value);
	};

	return (
		<div className='row justify-content-center'>
			<div className='col-md-8'>
				<div className='card'>
					<div className='card-body'>
						<h2 className='text-center mb-4 font-weight-bold'>
							Agregar Nuevo Producto
						</h2>
						{alerta ? <p className={alerta.classes}>{alerta.message}</p> : null}
						<form onSubmit={submitNuevoProducto}>
							<div className='form-group'>
								<label>Nombre Producto</label>
								<input
									type='text'
									className='form-control'
									placeholder='Nombre del Producto'
									name='nombre'
									value={nombre}
									onChange={e => guardarNombre(e.target.value)}
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
									onChange={e => guardarPrecio(e.target.value)}
								/>
							</div>
							<button
								type='submit'
								className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
							>
								Agregar
							</button>
						</form>
						{cargando && <p>Cargando...</p>}
						{/* {error && (
							<p className='alert alert-danger p2 mt-4 text-center'>
								Ocurrió un error
							</p>
						)} */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NuevoProducto;
