const commonUrl = "http://localhost:8099/ecm";

const getUrl = (url) => {
  return commonUrl + url;
};

const asyncHttpPost = (url, param, succ, errFunc, contentType) => {
  if (!contentType) contentType = "application/json";

  const headers = {};
  headers["content-type"] = contentType;
  headers["charset"] = "UTF-8";

  const params = {
    method: "post",
    headers,
    body: param,
  };

  fetch(getUrl(url), params)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => succ(response))
    .catch((error) => {
      console.error("Error:", error);
      errFunc();
    });
};

const asyncHttpGet = (url, succ, err, contentType) => {
  if (!contentType) contentType = "application/x-www-form-urlencoded";

  const params = {
    method: "get",
    headers: {
      "content-type": contentType,
      charset: "UTF-8",
    },
  };

  fetch(getUrl(url), params)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => succ(response))
    .catch((error) => {
      console.error("Error:", error);
      err();
    });
};

export { getUrl, asyncHttpGet, asyncHttpPost };
