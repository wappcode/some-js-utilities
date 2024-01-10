const jsonParse = (value: unknown) => {
  let result;
  try {
    if (typeof value == 'string') {
      result = JSON.parse(value);
    } else {
      result = value;
    }
  } catch (ex) {
    result = value;
  }
  return result;
};
export const getLocalStorageItem = <T>(key: string): T => {
  const value = localStorage.getItem(key);
  return jsonParse(value);
};
export const getSessionStorageItem = <T>(key: string): T => {
  const value = sessionStorage.getItem(key);
  return jsonParse(value);
};
export const setLocalStorageItem = <T>(key: string, value: T) => {
  const stringVal = JSON.stringify(value);
  localStorage.setItem(key, stringVal);
};
export const setSessionStorageItem = <T>(key: string, value: T) => {
  const stringVal = JSON.stringify(value);
  sessionStorage.setItem(key, stringVal);
};
