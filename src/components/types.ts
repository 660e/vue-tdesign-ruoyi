import type { LinkProps, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';

interface QTableTopFilterBase {
  label?: string;
}

interface QTableTopFilter {
  _topFilter?:
    | ({
        type: 'input';
      } & QTableTopFilterBase)
    | ({
        type: 'select';
        dictType: string;
      } & QTableTopFilterBase);
}

interface QTableHandle {
  value: string;
  icon?: string;
  label?: string;
  theme?: LinkProps['theme'];
}

interface QTablePagination {
  pageNum: number;
  pageSize: number;
  total: number;
}

export interface QTableProps {
  column: PrimaryTableCol<TableRowData> & QTableTopFilter;
  columns: QTableProps['column'][];
  handles: QTableHandle[];
  pagination: QTablePagination;
}
