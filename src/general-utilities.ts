/* eslint-disable @typescript-eslint/no-explicit-any */
export const isPlainObject = (value: any) => {
  return (
    !!value &&
    typeof value === 'object' &&
    (value.__proto__ === null || value.__proto__ === Object.prototype)
  );
};
export const isEmpty = (value: any): boolean => {
  if (value === null) {
    return true;
  }
  if (value === undefined) {
    return true;
  }
  if (typeof value === 'string') {
    return value.trim().length < 1;
  }
  if (Array.isArray(value)) {
    return value.length < 1;
  }
  if (
    !!value &&
    typeof value === 'object' &&
    (value.__proto__ === null || value.__proto__ === Object.prototype)
  ) {
    return Object.entries(value).length < 1;
  }
  return !value;
};

export const objectToBlob = (data: unknown, type: string = 'application/json'): Blob => {
  const blob = new Blob([JSON.stringify(data)], { type });
  return blob;
};

export const objectToResponse = (
  data: unknown,
  status: number = 200,
  statusText: string = 'Ok',
  type: string = 'application/json'
): Response => {
  const blob = objectToBlob(data, type);

  const init = { status, statusText };
  const response = new Response(blob, init);
  return response;
};
