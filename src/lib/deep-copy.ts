export default function getItemCopy(item: any): any {
  let copy = item;

  if (Array.isArray(item)) {
    copy = copyArrayItems(item);
  }

  if (isObject(item)) {
    copy = copyObjectEntries(item);
  }

  return copy;
}

export function copyObjectEntries(fromObject: any): any {
  const copiedObject: any = {};

  for (const key in fromObject) {
    copiedObject[key] = getItemCopy(fromObject[key]);
  }

  return copiedObject;
}

export function copyArrayItems(fromArray: any[]): any[] {
  const copiedArray = fromArray.map((item: any) => {
    return getItemCopy(item);
  });

  return copiedArray;
}

export function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}