import { basename } from "config";
import { fetchUtils } from "react-admin";
import loopbackDataProvider from "react-admin-loopback";

const fetchJson = (url: string, options: any | undefined) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  const token = JSON.parse(localStorage.getItem("lbtoken") ?? "") ?? "";

  if (url.indexOf("?") === -1) {
    url += `?access_token=${token}`;
  } else {
    url += `&access_token=${token}`;
  }

  options.headers.set("platform-identifier", "console");

  return fetchUtils.fetchJson(url, options);
};

export default loopbackDataProvider(
  `${basename}/api`,
  fetchJson
);
