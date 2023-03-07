import {
  FetchAttachmentsAction,
  FetchAttachmentsSuccessAction,
  PostAttachmentsAction,
  PostAttachmentsSuccessAction,
  RemoveProductAttachmentAction,
  RemoveProductAttachmentSuccessAction,
  UploadAttachmentsAction,
  UploadAttachmentsSuccessAction,
} from "../interfaces";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { fetchEnd, fetchStart, showNotification } from "react-admin";
import { getNewAttachments, getProductAttachments } from "../selectors";

import { actions } from "redux-store";
import { basename } from "config";

export const FetchAttachmentsSaga = function* () {
  yield takeEvery(actions.fetchAttachments.type, function* (action) {
    const castedAction = action as unknown as FetchAttachmentsAction;

    const id = castedAction.payload.productId;
    const token = castedAction.payload.token;

    yield fetchAttachments(id, token);
  });
};

function* fetchAttachments(id: number, token: string) {
  yield put(fetchStart());

  const { response } = yield call(async () => {
    const url = `${basename}/api/Products/${id}/attachments?access_token=${token}`;

    const response = await fetch(url);

    return { response };
  });

  if (response.status === 200) {
    const responseBody: FetchAttachmentsSuccessAction = yield call(async () => {
      const body: FetchAttachmentsSuccessAction = await response.json();

      return { payload: body };
    });
    yield put(actions.fetchAttachmentsSuccess(responseBody.payload));
  } else {
    switch (response.status) {
      case 400:
        yield put(
          showNotification(
            "Si è verificato un errore durante la richiesta",
            "error"
          )
        );
        break;
      case 401:
        yield put(
          showNotification(
            "Il tuo account non è autorizzato ad accedere",
            "error"
          )
        );
        break;
      case 404:
        yield put(showNotification("Risorsa non trovata", "error"));
        break;
      case 500:
        yield put(showNotification("Il server non risponde", "error"));
        break;
    }
  }

  yield put(fetchEnd());
}

export const UploadAttachments = function* () {
  yield takeEvery(actions.uploadAttachments.type, function* (action) {
    const castedAction = action as unknown as UploadAttachmentsAction;

    const token = castedAction.payload.token;
    const attachment_ID = castedAction.payload.attachment_ID;

    const productAttachments: any[] = yield select(getProductAttachments);

    yield uploadImagesAttachments(token, productAttachments);

    yield uploadFilesAttachments(token, productAttachments);

    yield PostAttachments(attachment_ID, token);
  });
};

function* uploadImagesAttachments(token: string, productAttachments: File[]) {
  yield put(fetchStart());
  const { response } = yield call(async () => {
    const url = `${basename}/api/storages/revee-storage-images/upload?access_token=${token}`;
    const data = new FormData();

    for (var i = 0; i < productAttachments.length; i++) {
      if (productAttachments[i].type.includes("image"))
        data.append("key" + i, productAttachments[i]);
    }

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.append("platform-identifier", "console");

    const response = await fetch(url, {
      method: "POST",
      headers: requestHeaders,
      body: data,
    });

    return { response };
  });

  if (response.status === 200) {
    const responseBody: UploadAttachmentsSuccessAction = yield call(
      async () => {
        const body: FetchAttachmentsSuccessAction = await response.json();

        return { payload: body };
      }
    );
    yield put(actions.uploadAttachmentsSuccess(responseBody.payload));
  } else {
    switch (response.status) {
      case 400:
        yield put(
          showNotification(
            "Si è verificato un errore durante la richiesta",
            "error"
          )
        );
        break;
      case 401:
        yield put(
          showNotification(
            "Il tuo account non è autorizzato ad accedere",
            "error"
          )
        );
        break;
      case 404:
        yield put(showNotification("Risorsa non trovata", "error"));
        break;
      case 500:
        yield put(showNotification("Il server non risponde", "error"));
        break;
    }
  }

  yield put(fetchEnd());
}

function* uploadFilesAttachments(token: string, productAttachments: File[]) {
  yield put(fetchStart());
  const { response } = yield call(async () => {
    const url = `${basename}/api/storages/revee-storage-pdfs/upload?access_token=${token}`;
    const data = new FormData();

    for (var i = 0; i < productAttachments.length; i++) {
      if (productAttachments[i].type.includes("application"))
        data.append("key" + i, productAttachments[i]);
    }

    const requestHeaders: HeadersInit = new Headers();

    requestHeaders.append("platform-identifier", "console");

    const response = await fetch(url, {
      method: "POST",
      headers: requestHeaders,
      body: data,
    });

    return { response };
  });

  if (response.status === 200) {
    const responseBody: UploadAttachmentsSuccessAction = yield call(
      async () => {
        const body: FetchAttachmentsSuccessAction = await response.json();

        return { payload: body };
      }
    );
    yield put(actions.uploadAttachmentsSuccess(responseBody.payload));
  } else {
    switch (response.status) {
      case 400:
        yield put(
          showNotification(
            "Si è verificato un errore durante la richiesta",
            "error"
          )
        );
        break;
      case 401:
        yield put(
          showNotification(
            "Il tuo account non è autorizzato ad accedere",
            "error"
          )
        );
        break;
      case 404:
        yield put(showNotification("Risorsa non trovata", "error"));
        break;
      case 500:
        yield put(showNotification("Il server non risponde", "error"));
        break;
    }
  }

  yield put(fetchEnd());
}
export const UploadAttachmentsSuccessSaga = function* () {
  yield takeEvery(actions.uploadAttachmentsSuccess.type, function* (action) {
    yield put(showNotification("Allegati salvati", "success"));
  });
};

export const PostAttachmentsSaga = function* () {
  yield takeEvery(actions.postAttachments.type, function* (action) {
    const castedAction = action as unknown as PostAttachmentsAction;

    const attachment_ID = castedAction.payload.attachment_ID;
    const token = castedAction.payload.token;

    yield PostAttachments(attachment_ID, token);
  });
};

function* PostAttachments(id: number, token: string) {
  yield put(fetchStart());
  const attachments: any[] = yield select(getNewAttachments);
  const attachmentsRightFormat = attachments.map((att) => {
    return { ...att, attachment_ID: id };
  });
  const { response } = yield call(async () => {
    const url = `${basename}/api/Attachments?access_token=${token}`;

    const body = JSON.stringify(attachmentsRightFormat);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "platform-identifier": "console",
      },
      body: body,
    });

    return { response };
  });

  if (response.status === 200) {
    const responseBody: PostAttachmentsSuccessAction = yield call(async () => {
      const body: PostAttachmentsSuccessAction = await response.json();

      return { payload: body };
    });
    yield put(actions.postAttachmentsSuccess(responseBody.payload));
  } else {
    switch (response.status) {
      case 400:
        yield put(
          showNotification(
            "Si è verificato un errore durante la richiesta",
            "error"
          )
        );
        break;
      case 401:
        yield put(
          showNotification(
            "Il tuo account non è autorizzato ad accedere",
            "error"
          )
        );
        break;
      case 404:
        yield put(showNotification("Risorsa non trovata", "error"));
        break;
      case 500:
        yield put(showNotification("Il server non risponde", "error"));
        break;
    }
  }

  yield put(fetchEnd());
}

export const PostAttachmentsSuccessSaga = function* () {
  yield takeEvery(actions.postAttachmentsSuccess.type, function* (action) {
    const castedAction = action as unknown as PostAttachmentsSuccessAction;

    const success = castedAction.payload.success;
    if (success) {
      yield put(showNotification("Allegati aggiunti con successo", "success"));
    }
  });
};

export const RemoveProductAttachmentSaga = function* () {
  yield takeEvery(actions.removeProductAttachment.type, function* (action) {
    const castedAction = action as unknown as RemoveProductAttachmentAction;

    const productId = castedAction.payload.productId;
    const attachmentId = castedAction.payload.attachmentId;
    const token = castedAction.payload.token;
    yield removeProductAttachment(productId, attachmentId, token);
  });
};

function* removeProductAttachment(
  productId: number,
  attachmentId: number,
  token: string
) {
  yield put(fetchStart());

  const { response } = yield call(async () => {
    const url = `${basename}/api/Attachments/${attachmentId}?access_token=${token}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "platform-identifier": "console",
      },
    });

    return { response };
  });

  if (response.status === 200) {
    const responseBody: RemoveProductAttachmentSuccessAction = yield call(
      async () => {
        const body: RemoveProductAttachmentAction = await response.json();

        return { payload: body };
      }
    );
    yield put(actions.removeProductAttachmentSuccess(responseBody.payload));
  } else {
    switch (response.status) {
      case 400:
        yield put(showNotification("Double click", "success"));
        break;
      case 401:
        yield put(
          showNotification(
            "Il tuo account non è autorizzato ad accedere",
            "error"
          )
        );
        break;
      case 404:
        yield put(showNotification("Risorsa non trovata", "error"));
        break;
      case 500:
        yield put(showNotification("Il server non risponde", "error"));
        break;
    }
  }

  yield put(fetchEnd());
}
