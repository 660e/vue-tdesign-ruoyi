import type { LinkProps, PopconfirmProps, PrimaryTableCol, TableRowData, TNode, TreeKeysType, TreeOptionData } from 'tdesign-vue-next';
import type { AppSystemDictItem } from '@/types';

type QTableColumn = PrimaryTableCol<TableRowData> & QTableToolbarFilter;
type QTableToolbarFilterItem = QTableDateRangeFilter | QTableInputFilter | QTableSelectFilter | QTableTreeSelectFilter;

interface QTableToolbarFilterBase {
  implicit?: boolean;
  label?: string | TNode;
  type: 'date-range' | 'input' | 'select' | 'tree-select';
}

interface QTableDateRangeFilter extends QTableToolbarFilterBase {
  type: 'date-range';
  keys?: { start?: string; end?: string };
}

interface QTableInputFilter extends QTableToolbarFilterBase {
  type: 'input';
}

interface QTableSelectFilter extends QTableToolbarFilterBase {
  type: 'select';
  dict: AppSystemDictItem;
}

interface QTableTreeSelectFilter extends QTableToolbarFilterBase {
  type: 'tree-select';
  keys?: TreeKeysType;
}

interface QTableToolbarFilter {
  toolbarFilter?: QTableToolbarFilterItem;
}

interface QTableToolbarFilterOptions {
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

export interface QTableProps {
  column: QTableColumn;
  columns: QTableColumn[];
  operations: QTableOperation[];
  toolbarFilterOptions: QTableToolbarFilterOptions;
  pagination: QTablePagination;
}

//

//

//

export type QTableTopFilterQueryCondition = Record<string, unknown>;
