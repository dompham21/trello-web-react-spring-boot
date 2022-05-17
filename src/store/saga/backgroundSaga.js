import { all, put, takeLatest, call } from "redux-saga/effects";
import { getAllBackgroundAPI } from "store/api/backgroundApi";
import { getAllBackgroundDone, getAllBackgrounds, getAllBackgroundsFailure } from "store/reducer/backgroundReducer";


function* getAllBackgroundsSaga(action) {
	try {
		const resp = yield call(getAllBackgroundAPI);
		const { status, data } = resp;
		if( status === 200) {
			yield put(getAllBackgroundDone(data));
		}
		else {
			yield put(getAllBackgroundsFailure());
		}
		
	} catch (error) {
		yield put(getAllBackgroundsFailure());
	}
}


export default function* watchFetchAllBackgrounds() {
	yield takeLatest(getAllBackgrounds, getAllBackgroundsSaga);
}