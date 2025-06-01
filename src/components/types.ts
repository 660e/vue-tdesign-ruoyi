import type { LinkProps, PopconfirmProps, PrimaryTableCol, TableRowData, TNode, TreeKeysType, TreeOptionData } from 'tdesign-vue-next';
import type { AppSystemDictItem } from '@/types';

interface QTableToolbarFilterBase {
  implicit?: boolean;
  label?: string | TNode;
}

export interface QTableProps {
  //
  //
  //
  column: PrimaryTableCol<TableRowData> & QTableTopFilter;
  columns: QTableProps['column'][];
  topFilterOptions: QTableTopFilterOptions;
  operations: QTableOperation[];
  pagination: QTablePagination;
}

//

//

//

interface QTableTopFilter {
  topFilter?:
    | ({
        type: 'date-range';
        keys?: { start?: string; end?: string };
      } & QTableToolbarFilterBase)
    | ({
        type: 'input';
      } & QTableToolbarFilterBase)
    | ({
        type: 'select';
        dict: AppSystemDictItem;
      } & QTableToolbarFilterBase)
    | ({
        type: 'tree-select';
        keys?: TreeKeysType;
      } & QTableToolbarFilterBase);
}

interface QTableTopFilterOptions {
  treeSelect?: Record<string, TreeOptionData<string | number>[]>;
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

export type QTableTopFilterQueryCondition = Record<string, unknown>;
