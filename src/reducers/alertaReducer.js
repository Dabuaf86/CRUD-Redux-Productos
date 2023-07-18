import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../types';

const initialState = {
	alerta: null,
};

const alertaReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case MOSTRAR_ALERTA:
			return {
				...state,
				alerta: payload,
			};
		case OCULTAR_ALERTA:
			return {
				...state,
				alerta: null,
			};
		default:
			return state;
	}
};

export default alertaReducer;
