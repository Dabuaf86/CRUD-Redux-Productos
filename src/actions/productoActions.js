import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_ERROR,
	AGREGAR_PRODUCTO_EXITO,
	CLEAN_ERROR,
	COMENZAR_DESCARGA_PRODUCTOS,
	DESCARGA_PRODUCTOS_EXITO,
	DESCARGA_PRODUCTOS_ERROR,
	OBTENER_PRODUCTO_ELIMINAR,
	PRODUCTO_ELIMINADO_EXITO,
	PRODUCTO_ELIMINADO_ERROR,
	OBTENER_PRODUCTO_EDITAR,
	INICIAR_EDICION_PRODUCTO,
	PRODUCTO_EDITADO_EXITO,
	PRODUCTO_EDITADO_ERROR,
} from '../types';

// Crear nuevos productos
export const crearNuevoProducto = producto => {
	return async dispatch => {
		dispatch(agregarProducto());

		try {
			// Insertar nuevo producto en la API
			await clienteAxios.post('/productos', producto);

			// Si todo sale bien, actualiza el state de productos
			dispatch(agregarProductoExito(producto));

			// Alerta de éxito
			Swal.fire({
				title: 'Correcto',
				text: 'El producto se agregó correctamente',
				icon: 'success',
				timer: 3000,
			});
		} catch (error) {
			// Si hay un error, actualiza el state de error
			dispatch(agregarProductoError());
			setTimeout(() => {
				dispatch(cleanError());
			}, 2000);

			// Alerta de error
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Ocurrió un error',
				timer: 3000,
			});
		}
	};
};

const agregarProducto = payload => ({
	type: AGREGAR_PRODUCTO,
	payload,
});

// Si el producto se guarda en la db
const agregarProductoExito = payload => ({
	type: AGREGAR_PRODUCTO_EXITO,
	payload,
});

// Si hubo un error al guardar el producto
const agregarProductoError = () => ({
	type: AGREGAR_PRODUCTO_ERROR,
});

// Reinicia el state completo
const cleanError = () => ({
	type: CLEAN_ERROR,
});

// Función para descargar los productos de la db
export const obtenerProductosAction = () => {
	return async dispatch => {
		dispatch(descargarProductos());
		try {
			const respuesta = await clienteAxios.get('/productos');
			dispatch(descargaProductosExitosa(respuesta.data));
		} catch (error) {
			console.log(error);
			dispatch(descargaProductosError());
		}
	};
};

const descargarProductos = () => ({
	type: COMENZAR_DESCARGA_PRODUCTOS,
});

const descargaProductosExitosa = payload => ({
	type: DESCARGA_PRODUCTOS_EXITO,
	payload,
});

const descargaProductosError = () => ({
	type: DESCARGA_PRODUCTOS_ERROR,
});

// Función para eliminar un producto
export const eliminarProductoAction = id => {
	return async dispatch => {
		dispatch(obtenerProductoEliminar(id));

		try {
			await clienteAxios.delete(`/productos/${id}`);
			dispatch(eliminarProductoExito());

			// Si se elimina, mostrar alerta
			Swal.fire({
				title: 'Eliminado',
				text: 'El producto ha sido eliminado',
				icon: 'success',
				timer: 3000,
			});
		} catch (error) {
			dispatch(eliminarProductoError());
		}
	};
};

const obtenerProductoEliminar = id => ({
	type: OBTENER_PRODUCTO_ELIMINAR,
	payload: id,
});

const eliminarProductoExito = () => ({
	type: PRODUCTO_ELIMINADO_EXITO,
});

const eliminarProductoError = () => ({
	type: PRODUCTO_ELIMINADO_ERROR,
});

// Función para editar un producto
export const obtenerProductoEditarAction = producto => {
	return async dispatch => {
		dispatch(obtenerProductoEditar(producto));
	};
};

const obtenerProductoEditar = payload => ({
	type: OBTENER_PRODUCTO_EDITAR,
	payload,
});

// Edita un registro en la API y en el state
export const editarProductoAction = producto => {
	return async dispatch => {
		dispatch(editarProducto());

		try {
			await clienteAxios.put(`/productos/${producto.id}`, producto);
			dispatch(editarProductoExito(producto));
		} catch (error) {
			dispatch(editarProductoError());
		}
	};
};

const editarProducto = () => ({
	type: INICIAR_EDICION_PRODUCTO,
});

const editarProductoExito = payload => ({
	type: PRODUCTO_EDITADO_EXITO,
	payload,
});

const editarProductoError = () => ({
	type: PRODUCTO_EDITADO_ERROR,
});
