import type { QTableProps } from '@/components/types';
import { is } from './index';

function flattenObjectTree<T>(data: T, childrenKey: keyof T) {
  const source = [data];
  const result: T[] = [];

  while (source.length) {
    const node = source.shift()!;
    const children = node[childrenKey] || [];
    delete node[childrenKey];
    source.unshift(...(children as T[]));
    result.push(node);
  }

  return result;
}

function flattenArrayTree<T>(data: T[], childrenKey: keyof T) {
  return data.flatMap((node) => flattenObjectTree(node, childrenKey));
}

export function flattenTree<T>(data: T | T[], options: { childrenKey?: keyof T } = {}) {
  const { childrenKey = 'children' as keyof T } = options;

  if (is.array(data)) {
    return flattenArrayTree(data, childrenKey);
  }

  return flattenObjectTree(data, childrenKey);
}

export function buildTree<T>(data: T[], options: { childrenKey?: string; idKey?: keyof T; parentIdKey?: keyof T } = {}) {
  const { childrenKey = 'children', idKey = 'id' as keyof T, parentIdKey = 'parentId' as keyof T } = options;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const map: any = {};
  const result: T[] = [];

  data.forEach((item) => {
    map[item[idKey]] = { ...item, [childrenKey]: [] };
  });

  data.forEach((item) => {
    const node = map[item[idKey]];
    if (item[parentIdKey]) {
      const parent = map[item[parentIdKey]];
      if (parent) {
        parent[childrenKey].push(node);
      }
    } else {
      result.push(node);
    }
  });

  return result;
}

export function getHandleColWidth(handles: QTableProps['handles']) {
  const iw = handles.filter((e) => e.icon).length * 16;
  const lw = handles.filter((e) => e.label).reduce((a, c) => a + c.label!.length * 14, 0);
  const tg = handles.filter((e) => e.icon && e.label).length * (4 * 0.5);
  const hg = (handles.length - 1) * (4 * 2);
  const tp = 16 * 2;

  return iw + lw + tg + hg + tp;
}
