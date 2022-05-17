import { all, put, takeLatest, call } from 'redux-saga/effects';
import { getAllCardApi, postNewCardApi, updateCardColumnIdApi, updateCardCoverApi, updateCardDescriptionApi, updateCardDueDateApi, updateCardTitleApi } from 'store/api/cardApi';
import { postNewTaskApi, updateTaskNameApi, updateTaskStateApi } from 'store/api/taskApi';
import { postNewTaskListApi } from 'store/api/taskListApi';
import { getAllCard, getAllCardDone, getAllCardFailure, postNewCard, postNewCardDone, postNewCardFailure, postNewTask, postNewTaskDone, postNewTaskFailure, postNewTasklist, postNewTasklistDone, postNewTasklistFailure, updateCardColumnId, updateCardColumnIdDone, updateCardColumnIdFailure, updateCardCover, updateCardCoverDone, updateCardCoverFailure, updateCardDescription, updateCardDescriptionDone, updateCardDescriptionFailure, updateCardDueDate, updateCardDueDateDone, updateCardDueDateFailure, updateCardTitle, updateCardTitleDone, updateCardTitleFailure, updateTaskName, updateTaskNameDone, updateTaskNameFailure, updateTaskState, updateTaskStateDone, updateTaskStateFailure } from 'store/reducer/cardReducer';


function* postNewCardSaga(action) {
    const dataToSubmit = action.payload
	try {
		const resp = yield call(postNewCardApi, dataToSubmit);
		const { status, data } = resp;
		if( status === 201 ) {
			yield put(postNewCardDone(data));
		}
		else {
			yield put(postNewCardFailure());
		}
		
	} catch (error) {
		yield put(postNewCardFailure());
	}
}

function* getAllCardSaga(action) {
	let id = action.payload;
    try {
		const resp = yield call(getAllCardApi, id);
		const { status, data } = resp;
		if( status === 200) {
			yield put(getAllCardDone(data));
		}
		else {
			yield put(getAllCardFailure());
		}
		
	} catch (error) {
		yield put(getAllCardFailure());
	}
}

function* updateCardTitleSaga(action) {
	let dataToSubmit = action.payload

	try {
		const resp = yield call(updateCardTitleApi, dataToSubmit);
		const { status, data } = resp;
		if( status === 200) {
			yield put(updateCardTitleDone(data));
		}
		else {
			yield put(updateCardTitleFailure());
		}
		
	} catch (error) {
		yield put(updateCardTitleFailure());
	}
}


function* updateCardDescriptionSaga(action) {
	let dataToSubmit = action.payload

	try {
		const resp = yield call(updateCardDescriptionApi, dataToSubmit);
		const { status, data } = resp;
		if( status === 200) {
			yield put(updateCardDescriptionDone(data));
		}
		else {
			yield put(updateCardDescriptionFailure());
		}
		
	} catch (error) {
		yield put(updateCardDescriptionFailure());
	}
}


function* updateCardCoverSaga(action) {
	let dataToSubmit = action.payload

	try {
		const resp = yield call(updateCardCoverApi, dataToSubmit);
		const { status, data } = resp;
		if( status === 200) {
			yield put(updateCardCoverDone(data));
		}
		else {
			yield put(updateCardCoverFailure());
		}
		
	} catch (error) {
		yield put(updateCardCoverFailure());
	}
}


function* updateCardDueDateSaga(action) {
	let dataToSubmit = action.payload

	try {
		const resp = yield call(updateCardDueDateApi, dataToSubmit);
		const { status, data } = resp;
		if( status === 200) {
			yield put(updateCardDueDateDone(data));
		}
		else {
			yield put(updateCardDueDateFailure());
		}
		
	} catch (error) {
		yield put(updateCardDueDateFailure());
	}
}



function* updateCardColumnIdSaga(action) {
	let dataToSubmit = action.payload

	try {
		const resp = yield call(updateCardColumnIdApi, dataToSubmit);
		const { status, data } = resp;
		if( status === 200) {
			yield put(updateCardColumnIdDone(data));
		}
		else {
			yield put(updateCardColumnIdFailure());
		}
		
	} catch (error) {
		yield put(updateCardColumnIdFailure());
	}
}

function* postNewTasklistSaga(action) {
    const dataToSubmit = action.payload
	try {
		const resp = yield call(postNewTaskListApi, dataToSubmit);
		const { status, data } = resp;
		if( status === 201 ) {
			yield put(postNewTasklistDone(data));
		}
		else {
			yield put(postNewTasklistFailure());
		}
		
	} catch (error) {
		yield put(postNewTasklistFailure());
	}
}

function* postNewTaskSaga(action) {
    const dataToSubmit = action.payload
	try {
		const resp = yield call(postNewTaskApi, dataToSubmit);
		const { status, data } = resp;
		if( status === 201 ) {
			yield put(postNewTaskDone(data));
		}
		else {
			yield put(postNewTaskFailure());
		}
		
	} catch (error) {
		yield put(postNewTaskFailure());
	}
}


function* updateTaskNameSaga(action) {
	let dataToSubmit = action.payload

	try {
		const resp = yield call(updateTaskNameApi, dataToSubmit);
		const { status, data } = resp;
		if( status === 200) {
			yield put(updateTaskNameDone(data));
		}
		else {
			yield put(updateTaskNameFailure());
		}
		
	} catch (error) {
		yield put(updateTaskNameFailure());
	}
}



function* updateTaskStateSaga(action) {
	let dataToSubmit = action.payload

	try {
		const resp = yield call(updateTaskStateApi, dataToSubmit);
		const { status, data } = resp;
		if( status === 200) {
			yield put(updateTaskStateDone(data));
		}
		else {
			yield put(updateTaskStateFailure());
		}
		
	} catch (error) {
		yield put(updateTaskStateFailure());
	}
}

function* watchPostNewCard() {
	yield takeLatest(postNewCard, postNewCardSaga);
}


function* watchGetAllCard() {
	yield takeLatest(getAllCard, getAllCardSaga);
}

function* watchUpdateCardTitle() {
	yield takeLatest(updateCardTitle, updateCardTitleSaga)
}
function* watchUpdateCardDescription() {
	yield takeLatest(updateCardDescription, updateCardDescriptionSaga)
}
function* watchUpdateCardCover() {
	yield takeLatest(updateCardCover, updateCardCoverSaga)
}
function* watchUpdateCardDueDate() {
	yield takeLatest(updateCardDueDate, updateCardDueDateSaga)
}
function* watchUpdateCardColumnId() {
	yield takeLatest(updateCardColumnId, updateCardColumnIdSaga)
}

function* watchPostNewTasklist() {
	yield takeLatest(postNewTasklist, postNewTasklistSaga);
}

function* watchPostNewTask() {
	yield takeLatest(postNewTask, postNewTaskSaga);
}

function* watchUpdateTaskName() {
	yield takeLatest(updateTaskName, updateTaskNameSaga);
}

function* watchUpdateTaskState() {
	yield takeLatest(updateTaskState, updateTaskStateSaga);
}
export default function* rootSaga() { 
    yield all([
		watchPostNewCard(),
		watchGetAllCard(),
		watchUpdateCardTitle(),
		watchUpdateCardDescription(),
		watchUpdateCardCover(),
		watchUpdateCardDueDate(),
		watchUpdateCardColumnId(),
		watchPostNewTasklist(),
		watchPostNewTask(),
		watchUpdateTaskName(),
		watchUpdateTaskState()
	]);
}

