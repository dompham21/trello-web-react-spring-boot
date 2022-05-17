import { all, put, takeLatest, call } from 'redux-saga/effects';
import { getAllColumnApi, postNewColumnApi } from 'store/api/columnApi';
import {  getAllColumn, getAllColumnDone, getAllColumnFailure, postNewColumn, postNewColumnDone, postNewColumnFailure } from 'store/reducer/columnReducer';


function* postNewColumnSaga(action) {
    const dataToSubmit = action.payload
	try {
		const resp = yield call(postNewColumnApi, dataToSubmit);
		const { status, data } = resp;
		if( status === 201 ) {
			yield put(postNewColumnDone(data));
		}
		else {
			yield put(postNewColumnFailure());
		}
		
	} catch (error) {
		yield put(postNewColumnFailure());
	}
}

function* getAllColumnSaga(action) {
	let id = action.payload;
    try {
		const resp = yield call(getAllColumnApi, id);
		const { status, data } = resp;
		if( status === 200) {
			yield put(getAllColumnDone(data));
		}
		else {
			yield put(getAllColumnFailure());
		}
		
	} catch (error) {
		yield put(getAllColumnFailure());
	}
}


function* watchPostNewColumn() {
	yield takeLatest(postNewColumn, postNewColumnSaga);
}

function* watchGetAllColumn() {
	yield takeLatest(getAllColumn, getAllColumnSaga);
}


export default function* rootSaga() { 
    yield all([
		watchPostNewColumn(),
		watchGetAllColumn()
	]);
}

