import type { QTableProps } from '@/types';
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

export function getOperationColumnWidth(operations: QTableProps['operations']) {
  const iw = operations.filter((e) => e.icon).length * 16;
  const lw = operations.filter((e) => e.label).reduce((a, c) => a + c.label!.length * 14, 0);
  const tg = operations.filter((e) => e.icon && e.label).length * (4 * 0.5);
  const hg = (operations.length - 1) * (4 * 2);
  const tp = 16 * 2;

  return iw + lw + tg + hg + tp;
}

export function generatePassword(length = 16) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
  const charsetLength = charset.length;
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  return Array.from(array, (byte) => charset[byte % charsetLength]).join('');
}

export function fd(data: Record<string, string | number | File>) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (!is.undefined(value) && !is.null(value)) {
      formData.append(key, is.file(value) ? value : String(value));
    }
  });
  return formData;
}

export function iconConverter(icon: string) {
  const map = new Map([
    ['system', 'system-setting'],
    ['monitor', 'chart-line'],
    ['tool', 'tools'],
    ['guide', 'send'],
    ['user', 'user-1'],
    ['peoples', 'user-business'],
    ['tree-table', 'menu'],
    ['tree', 'tree-square-dot'],
    ['post', 'user-list'],
    ['dict', 'list'],
    ['edit', 'edit-2'],
    ['message', 'notification'],
    ['log', 'system-log'],
    ['online', 'sensors'],
    ['job', 'task-checked'],
    ['druid', 'data'],
    ['server', 'server'],
    ['redis', 'data-base'],
    ['redis-list', 'system-storage'],
    ['build', 'form'],
    ['code', 'code'],
    ['swagger', 'api'],
    ['form', 'cooperate'],
    ['logininfor', 'login'],
  ]);
  return map.get(icon) || 'menu-application';
}
