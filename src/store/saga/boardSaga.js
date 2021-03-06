import { push } from 'connected-react-router';
import { all, put, takeLatest, call } from 'redux-saga/effects';
import { getAllBoardApi, getBoardByIdApi, postNewBoardApi, updateOrderNumColumnApi } from 'store/api/boardApi';
import { getAllBoard, getAllBoardDone, getAllBoardFailure, getBoardById, getBoardByIdDone, getBoardByIdFailure, postNewBoard, postNewBoardDone, postNewBoardFailure, updateOrderNumColumn, updateOrderNumColumnDone, updateOrderNumColumnFailure } from 'store/reducer/boardReducer';


function* postNewBoardSaga(action) {
    const dataToSubmit = action.payload
	try {
		const resp = yield call(postNewBoardApi, dataToSubmit);
		const { status, data } = resp;
		if( status === 201 ) {

			yield put(postNewBoardDone(data));
			yield put(push("/board/" + data));
		}
		else {
			yield put(postNewBoardFailure());
		}
		
	} catch (error) {
		yield put(postNewBoardFailure());
	}
}

function* getAllBoardSaga(action) {
    try {
		const resp = yield call(getAllBoardApi);
		const { status, data } = resp;
		if( status === 200) {
			yield put(getAllBoardDone(data));
		}
		else {
			yield put(getAllBoardFailure());
		}
		
	} catch (error) {
		yield put(getAllBoardFailure());
	}
}

function* getBoardByIdSaga(action) {
	const id = action.payload

	try {
		const resp = yield call(getBoardByIdApi, id);
		const { status, data } = resp;
		if( status === 200) {
			yield put(getBoardByIdDone(data));
		}
		else {
			yield put(getBoardByIdFailure());
		}
		
	} catch (error) {
		yield put(getBoardByIdFailure());
	}
}

function* updateOrderNumColumnSaga(action) {
	const dataToSubmit = action.payload

	try {
		const resp = yield call(updateOrderNumColumnApi, dataToSubmit);
		const { status, data } = resp;
		if( status === 200) {
			yield put(updateOrderNumColumnDone(data));
		}
		else {
			yield put(updateOrderNumColumnFailure());
		}
		
	} catch (error) {
		yield put(updateOrderNumColumnFailure());
	}
}

function* watchPostNewBoard() {
	yield takeLatest(postNewBoard, postNewBoardSaga);
}

function* watchGetAllBoard() {
	yield takeLatest(getAllBoard, getAllBoardSaga);
}

function* watchGetBoardById() {
	yield takeLatest(getBoardById, getBoardByIdSaga);
}

function* watchUpdateOrderNumColumn() {
	yield takeLatest(updateOrderNumColumn, updateOrderNumColumnSaga);
}

export default function* rootSaga() { 
    yield all([
		watchPostNewBoard(),
		watchGetAllBoard(),
		watchGetBoardById(),
		watchUpdateOrderNumColumn()
	]);
}

