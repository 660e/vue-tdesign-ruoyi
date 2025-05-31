import type { LinkProps, PopconfirmProps, PrimaryTableCol, TableRowData, TNode, TreeKeysType, TreeOptionData } from 'tdesign-vue-next';
import type { TDicts } from '@/types';

interface QTableTopFilterBase {
  implicit?: boolean;
  label?: string | TNode;
}

interface QTableTopFilter {
  topFilter?:
    | ({
        type: 'input';
      } & QTableTopFilterBase)
    | ({
        type: 'select';
        dict: TDicts;
      } & QTableTopFilterBase)
    | ({
        type: 'tree-select';
        data?: TreeOptionData<string | number>[];
        keys?: TreeKeysType;
      } & QTableTopFilterBase);
}

interface QTablePagination {
  pageNum: number;
  pageSize: number;
  total: number;
}

export interface QTableOperation {
  value: string;
  icon?: string;
  label?: string;
  popconfirm?: {
    content: string;
    theme?: PopconfirmProps['theme'];
  };
  theme?: LinkProps['theme'];
}

export interface QTableProps {
  column: PrimaryTableCol<TableRowData> & QTableTopFilter;
  columns: QTableProps['column'][];
  operations: QTableOperation[];
  pagination: QTablePagination;
}

export type QTableTopFilterQueryCondition = Record<string, string>;
