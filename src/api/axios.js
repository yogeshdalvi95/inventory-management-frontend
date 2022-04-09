import axios from "axios";

export const serviceProviderForGetRequest = async (
  url,
  payload = {},
  token,
  headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`
  }
) => {
  const URL = url;
  return await axios(URL, {
    method: "GET",
    headers: headers,
    params: payload
  })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};

export const serviceProviderForPostRequest = async (
  url,
  payload = {},
  token,
  params = {},
  headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`
  }
) => {
  const URL = url;
  return await axios(URL, {
    method: "POST",
    headers: headers,
    data: payload,
    params: params
  })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};

export const serviceProviderForPublicPostRequest = async (
  url,
  payload = {},
  params = {},
  headers = {
    "content-type": "application/json"
  }
) => {
  const URL = url;
  return await axios(URL, {
    method: "POST",
    headers: headers,
    data: payload,
    params: params
  })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};

export const serviceProviderForPutRequest = async (
  url,
  id,
  body,
  token,
  params = {},
  headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`
  }
) => {
  const URL = url + "/" + id;
  return await axios(URL, {
    method: "PUT",
    headers: headers,
    data: body,
    params: params
  })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};

export const serviceProviderForDeleteRequest = async (
  url,
  id,
  token,
  params = {},
  headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`
  }
) => {
  const URL = url + "/" + id;
  return await axios(URL, {
    method: "DELETE",
    headers: headers,
    params: params
  })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};

export const serviceProviderForGetRequestDownloadPDFFile = async (
  url,
  payload = {},
  token,
  params = {},
  onDownloadProgress = () => {},
  headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,

    Accept: "application/pdf"
  }
) => {
  const URL = url;
  return await axios(URL, {
    method: "POST",
    responseType: "arraybuffer",
    headers: headers,
    data: payload,
    params: params,
    onDownloadProgress: onDownloadProgress
  })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};

export const serviceProviderForGetRequestDownloadPDFFileWithGraph = async (
  url,
  payload = {},
  token,
  params = {},
  onDownloadProgress = () => {},
  headers = {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token}`,

    Accept: "application/pdf"
  }
) => {
  const URL = url;
  return await axios(URL, {
    method: "POST",
    responseType: "arraybuffer",
    headers: headers,
    data: payload,
    params: params,
    onDownloadProgress: onDownloadProgress
  })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};
