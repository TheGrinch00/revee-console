import {
  DeleteProductsAction,
  FetchMemberAgentsAction,
  FetchMemberAgentsSuccessAction,
  FetchPositionsAction,
  FetchPositionsSuccessAction,
  FetchProductsAction,
  FetchVisitProductsAction,
  FetchVisitSamplesAction,
  PatchProductsAction,
  PostProductsAction,
  PostSamplesAction,
} from "../interfaces";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { fetchEnd, fetchStart } from "react-admin";
import {
  getUpdatedProducts,
  getVisitProducts,
  getVisitSamples,
} from "../selectors";

import { Product } from "models/Product";
import { ProductVisit } from "models/ProductVisit";
import { VisitSample } from "models/VisitSample";
import { actions } from "redux-store";
import { basename } from "config";
import { showNotification } from "ra-core";

export const FetchPositionSaga = function* () {
  yield takeEvery(actions.fetchPositions.type, function* (action) {
    const castedAction = action as unknown as FetchPositionsAction;

    const id = castedAction.payload.positionId;
    const token = castedAction.payload.token;

    yield fetchPositions(id, token);
  });
};

function* fetchPositions(id: number, token: string) {
  yield put(fetchStart());

  const { response } = yield call(async () => {
    const url = `${basename}/api/Employees/${id}/Positions?access_token=${token}&filter[include]=ward&filter[include]=facility`;
    const response = await fetch(url);
    return { response };
  });

  if (response.status === 200) {
    const responseBody: FetchPositionsSuccessAction = yield call(async () => {
      const body: FetchPositionsSuccessAction = await response.json();

      return { payload: body };
    });
    yield put(
      actions.fetchPositionsSuccess(
        responseBody.payload.map((elem: any) => {
          return {
            id: elem.id,
            ward: elem.ward.Ward,
            facility: elem.facility.FacilityName,
            shortname: "(" + elem.facility.Division.shortName + ")",
            disabled: elem.Disabled,
          };
        })
      )
    );
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
export const FetchProductsSaga = function* () {
  yield takeEvery(actions.fetchProducts.type, function* (action) {
    const castedAction = action as unknown as FetchProductsAction;

    const token = castedAction.payload.token;

    yield fetchProducts(token);
  });
};

function* fetchProducts(token: string) {
  yield put(fetchStart());

  const { response } = yield call(async () => {
    const url = `${basename}/api/Products?filter[include][0]=productCategory&filter[include][1]=attachments&access_token=${token}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "platform-identifier": "console",
      },
    });

    return { response };
  });

  if (response.status === 200) {
    const fetchedProducts: Product[] = yield call(async () => {
      const body = await response.json();

      return body;
    });
    const prodPerCat = fetchedProducts.reduce((acc, curr) => {
      const categoryName = curr.productCategory?.name ?? "Senza categoria";

      const categoryIndex = acc.findIndex((cat) => cat.name === categoryName);
      if (categoryIndex === -1) {
        acc.push({
          name: categoryName,
          products: [curr],
        });
      } else {
        acc[categoryIndex].products.push(curr);
      }

      return acc;
    }, [] as { name: string; products: Product[] }[]);

    yield put(
      actions.fetchProductsSuccess({
        products: fetchedProducts,
        productsPerCategory: prodPerCat,
      })
    );
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

export const PostProductsSaga = function* () {
  yield takeEvery(actions.postProducts.type, function* (action) {
    const castedAction = action as unknown as PostProductsAction;

    const visitId = castedAction.payload.visitId;
    const token = castedAction.payload.token;

    yield PostProducts(visitId, token);
  });
};

function* PostProducts(id: number, token: string) {
  yield put(fetchStart());
  const productIds: number[] = yield select(getVisitProducts);
  const productsRightFormat = productIds.map((pid) =>
    JSON.stringify({ productId: pid, visitId: id })
  );

  const { statusCode }: { statusCode: number } = yield call(async () => {
    const url = `${basename}/api/ProductVisits?access_token=${token}`;

    for (const payload of productsRightFormat) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "platform-identifier": "console",
        },
        body: payload,
      });

      if (response.status !== 200) return { statusCode: response.status };
    }

    return { statusCode: 200 };
  });

  if (statusCode === 200) {
    yield put(actions.postProductsSuccess());
  } else {
    switch (statusCode) {
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

export const PostProductsSuccessSaga = function* () {
  yield takeEvery(actions.postProductsSuccess.type, function* (action) {
    yield put(showNotification("Visita aggiunta con successo", "success"));
  });
};

export const PostSamplesSaga = function* () {
  yield takeEvery(actions.postSamples.type, function* (action) {
    const castedAction = action as unknown as PostSamplesAction;

    const visitId = castedAction.payload.visitId;
    const token = castedAction.payload.token;

    yield PostSamples(visitId, token);
  });
};

function* PostSamples(visitId: number, token: string) {
  yield put(fetchStart());
  const chosenSamples: {
    sampleId: number;
    quantity: number;
    id?: number;
  }[] = yield select(getVisitSamples);
  const newSamples: any[] = [];
  const updateSamples: any[] = [];
  chosenSamples.forEach((sample) => {
    if (sample.hasOwnProperty("id")) {
      updateSamples.push(
        JSON.stringify({
          sampleId: sample.sampleId,
          visitId,
          id: sample.id,
          quantity: sample.quantity,
        })
      );
    } else {
      newSamples.push(
        JSON.stringify({
          sampleId: sample.sampleId,
          visitId,
          quantity: sample.quantity,
        })
      );
    }
  });

  const { statusCode }: { statusCode: number } = yield call(async () => {
    const url = `${basename}/api/VisitSamples?access_token=${token}`;

    for (const payload of newSamples) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "platform-identifier": "console",
        },
        body: payload!,
      });

      if (response.status !== 200) return { statusCode: response.status };
    }
    for (const payload of updateSamples) {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "platform-identifier": "console",
        },
        body: payload!,
      });

      if (response.status !== 200) return { statusCode: response.status };
    }

    return { statusCode: 200 };
  });

  if (statusCode === 200) {
    yield put(actions.postSamplesSuccess());
  } else {
    switch (statusCode) {
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
        yield put(showNotification("Risorsa  non trovata", "error"));
        break;
      case 500:
        yield put(showNotification("Il server non risponde", "error"));
        break;
    }
  }

  yield put(fetchEnd());
}

export const PatchProductsSaga = function* () {
  yield takeEvery(actions.patchProducts.type, function* (action) {
    const castedAction = action as unknown as PatchProductsAction;

    const visitId = castedAction.payload.visitId;
    const token = castedAction.payload.token;

    yield PatchProducts(visitId, token);
  });
};

function* PatchProducts(visitId: number, token: string) {
  yield put(fetchStart());

  let updatedProducts: number[] = yield select(getUpdatedProducts);

  let visitProductsIds: number[] = yield select(getVisitProducts);

  let newProducts = updatedProducts.filter(
    (prod) => !visitProductsIds.includes(prod)
  );

  const newProductsRightFormat = newProducts.map((pid) =>
    JSON.stringify({ productId: pid, visitId: visitId })
  );

  const { statusCode }: { statusCode: number } = yield call(async () => {
    const url = `${basename}/api/ProductVisits?access_token=${token}`;

    for (const payload of newProductsRightFormat) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "platform-identifier": "console",
        },
        body: payload!,
      });

      if (response.status !== 200) return { statusCode: response.status };
    }

    return { statusCode: 200 };
  });

  if (statusCode === 200) {
    yield put(actions.patchProductsSuccess());
  } else {
    switch (statusCode) {
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
        yield put(showNotification("Risorsa  non trovata", "error"));
        break;
      case 500:
        yield put(showNotification("Il server non risponde", "error"));
        break;
    }
  }

  yield put(fetchEnd());
}

export const DeleteProductsSaga = function* () {
  yield takeEvery(actions.deleteProducts.type, function* (action) {
    const castedAction = action as unknown as DeleteProductsAction;

    const visitId = castedAction.payload.visitId;
    const token = castedAction.payload.token;

    yield DeleteProducts(visitId, token);
  });
};

function* DeleteProducts(visitId: number, token: string) {
  yield put(fetchStart());

  let updatedProducts: number[] = yield select(getUpdatedProducts);

  let visitProductsIds: number[] = yield select(getVisitProducts);

  let toDeleteProducts = visitProductsIds.filter(
    (prod) => !updatedProducts.includes(prod)
  );

  const { statusCode }: { statusCode: number } = yield call(async () => {
    for (const prod of toDeleteProducts) {
      let url = `${basename}/api/ProductVisits?filter[where][visitId]=${visitId}&filter[where][productId]=${prod}&access_token=${token}`;

      const product = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "platform-identifier": "console",
        },
      });
      let body: ProductVisit[] = await product.json();
      let id = body[0]!.id;
      let deleteUrl = `${basename}/api/ProductVisits/${id}?access_token=${token}`;

      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "platform-identifier": "console",
        },
      });

      if (response.status !== 200) return { statusCode: response.status };
    }

    return { statusCode: 200 };
  });

  if (statusCode === 200) {
    yield put(actions.deleteProductsSuccess());
  } else {
    switch (statusCode) {
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
        yield put(showNotification("Risorsa  non trovata", "error"));
        break;
      case 500:
        yield put(showNotification("Il server non risponde", "error"));
        break;
    }
  }

  yield put(fetchEnd());
}

export const FetchVisitSamplesSaga = function* () {
  yield takeEvery(actions.fetchVisitSamples.type, function* (action) {
    const castedAction = action as unknown as FetchVisitSamplesAction;

    const visitId = castedAction.payload.visitId;
    const token = castedAction.payload.token;

    yield FetchVisitSamples(token, visitId);
  });
};
function* FetchVisitSamples(token: string, visitId: number) {
  const { response } = yield call(async () => {
    const url = `${basename}/api/VisitSamples?filter[where][visitId]=${visitId}&access_token=${token}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "platform-identifier": "console",
      },
    });

    return { response };
  });

  if (response.status === 200) {
    const fetchedVisitSamples: VisitSample[] = yield call(async () => {
      const body = await response.json();

      return body;
    });

    yield put(
      actions.fetchVisitSamplesSuccess({
        visitSamples: fetchedVisitSamples,
      })
    );
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

export const FetchVisitProductsSaga = function* () {
  yield takeEvery(actions.fetchVisitProducts.type, function* (action) {
    const castedAction = action as unknown as FetchVisitProductsAction;

    const visitId = castedAction.payload.visitId;
    const token = castedAction.payload.token;

    yield FetchVisitProducts(token, visitId);
  });
};
function* FetchVisitProducts(token: string, visitId: number) {
  const { response } = yield call(async () => {
    const url = `${basename}/api/Visits/${visitId}/products?access_token=${token}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "platform-identifier": "console",
      },
    });

    return { response };
  });

  if (response.status === 200) {
    const fetchedVisitProducts: Product[] = yield call(async () => {
      const body = await response.json();

      return body;
    });

    yield put(
      actions.fetchVisitProductsSuccess({
        visitProducts: fetchedVisitProducts,
      })
    );
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

export const fetchMemberAgentsSaga = function* () {
  yield takeEvery(actions.fetchMemberAgents.type, function* (action) {
    const castedAction = action as unknown as FetchMemberAgentsAction;

    const token = castedAction.payload.token;
    yield fetchMemberAgentsProducts(token);
  });
};

function* fetchMemberAgentsProducts(token: string) {
  yield put(fetchStart());

  const { response } = yield call(async () => {
    const url = `${basename}/api/Members/me?filter[include]=agents&access_token=${token}`;

    const response = await fetch(url);

    return { response };
  });

  if (response.status === 200) {
    const responseBody: FetchMemberAgentsSuccessAction = yield call(
      async () => {
        const body: FetchMemberAgentsSuccessAction = await response.json();

        return { payload: body };
      }
    );

    yield put(actions.fetchMemberAgentsSuccess([responseBody.payload]));
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
