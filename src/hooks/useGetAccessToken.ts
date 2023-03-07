export const useGetAccessToken = () => {
  let lbtoken = localStorage.getItem("lbtoken");
  lbtoken = (lbtoken ?? "''").substr(1, lbtoken!.length - 2);

  return { token: lbtoken };
};
