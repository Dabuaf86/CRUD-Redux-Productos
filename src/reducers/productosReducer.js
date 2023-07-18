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
	// INICIAR_EDICION_PRODUCTO,
	PRODUCTO_EDITADO_EXITO,
	PRODUCTO_EDITADO_ERROR,
} from '../types';

// Cada reducer tiene su propio state
const initialState = {
	productos: [],
	error: null,
	loading: false,
	productoEliminar: null,
	productoEditar: null,
};

const productosReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case AGREGAR_PRODUCTO:
		case COMENZAR_DESCARGA_PRODUCTOS:
			return {
				...state,
				loading: true,
				error: null,
			};
		case AGREGAR_PRODUCTO_EXITO:
			return {
				...state,
				loading: false,
				productos: [...state.productos, payload],
			};
		case AGREGAR_PRODUCTO_ERROR:
		case DESCARGA_PRODUCTOS_ERROR:
		case PRODUCTO_ELIMINADO_ERROR:
		case PRODUCTO_EDITADO_ERROR:
			return {
				...state,
				loading: false,
				error: true,
			};
		case CLEAN_ERROR:
			return {
				...state,
				loading: false,
				error: null,
			};
		case DESCARGA_PRODUCTOS_EXITO:
			return {
				...state,
				loading: null,
				productos: payload,
				error: null,
			};
		case OBTENER_PRODUCTO_ELIMINAR:
			return {
				...state,
				productoEliminar: payload,
			};
		case PRODUCTO_ELIMINADO_EXITO:
			return {
				...state,
				productos: state.productos.filter(
					producto => producto.id !== state.productoEliminar
				),
				productoEliminar: null,
			};
		case OBTENER_PRODUCTO_EDITAR:
			return {
				...state,
				productoEditar: payload,
			};
		case PRODUCTO_EDITADO_EXITO:
			return {
				...state,
				productoEditar: null,
				productos: state.productos.map(producto =>
					producto.id === payload.id ? (producto = payload) : producto
				),
			};
		default:
			return state;
	}
};

export default productosReducer;
