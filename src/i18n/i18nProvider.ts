import lodashGet from "lodash/get";

const englishMessages = {
  ra: {
    notification: {
      http_error: "Network error. Please retry",
    },
    action: {
      save: "Save",
      delete: "Delete",
    },
  },
};

const italianMessages = {
  ra: {
    notification: {
      http_error: "Errore di rete, riprova",
    },
    action: {
      save: "Salva",
      delete: "Elimina",
    },
  },
};
let messages = italianMessages;

let locale = "it";

export const i18nProvider = {
  translate: (key: string) => lodashGet(messages, key),
  changeLocale: (newLocale: string) => {
    messages = newLocale === "it" ? italianMessages : englishMessages;
    locale = newLocale;
    return Promise.resolve();
  },
  getLocale: () => locale,
};
