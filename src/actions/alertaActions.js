import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../types';

// Muestra un alerta
export const mostrarAlertaAction = alerta => {
	return dispatch => {
		dispatch(mostrarAlerta(alerta));
	};
};

const mostrarAlerta = payload => ({
	type: MOSTRAR_ALERTA,
	payload,
});

// Ocultar alerta
export const ocultarAlertaAction = () => {
	return dispatch => {
		dispatch(ocultarAlerta());
	};
};

const ocultarAlerta = () => ({
	type: OCULTAR_ALERTA,
});
