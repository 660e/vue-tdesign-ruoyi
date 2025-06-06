import type { LinkProps, PopconfirmProps, PrimaryTableCol, TableRowData, TNode, TreeKeysType, TreeOptionData } from 'tdesign-vue-next';
import type { AppResponseData, AppSystemDictKey, AppUnknownRecord } from '@/types';

type QTableColumn = PrimaryTableCol<TableRowData> & QTableColumnExtra;
type QTableToolbarFilter = QTableToolbarDateRangeFilter | QTableToolbarInputFilter | QTableToolbarSelectFilter | QTableToolbarTreeSelectFilter;
export type QTableToolbarFilterParams = AppUnknownRecord;

interface QTableSelectedSet {
  show: boolean;
  dict?: AppSystemDictKey;
}

interface QTableToolbarFilterBase {
  implicit?: boolean;
  label?: string | TNode;
  type: 'date-range' | 'input' | 'select' | 'tree-select';
}

interface QTableToolbarDateRangeFilter extends QTableToolbarFilterBase {
  type: 'date-range';
  keys?: { start?: string; end?: string };
}

interface QTableToolbarInputFilter extends QTableToolbarFilterBase {
  type: 'input';
}

interface QTableToolbarSelectFilter extends QTableToolbarFilterBase {
  type: 'select';
  dict: AppSystemDictKey;
}

interface QTableToolbarTreeSelectFilter extends QTableToolbarFilterBase {
  type: 'tree-select';
  keys?: TreeKeysType;
}

interface QTableColumnExtra {
  selectedSet?: QTableSelectedSet;
  toolbarFilter?: QTableToolbarFilter;
}

interface QTableToolbarFilterOptions {
  treeSelect?: Record<string, TreeOptionData<string | number>[] | undefined>;
}

interface QTableFileExportProps {
  api: () => Promise<AppResponseData<Blob>>;
  fileName?: string;
  fileType?: 'csv' | 'xlsx';
}

interface QTableFileImportProps {
  api: (file: File, replace: boolean) => Promise<AppResponseData<AppUnknownRecord>>;
  template?: () => Promise<AppResponseData<Blob>>;
  templateName?: string;
  templateType?: 'csv' | 'xlsx';
  replaceable?: boolean;
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
  fileExport: QTableFileExportProps;
  fileImport: QTableFileImportProps;
  operations: QTableOperation[];
  toolbarFilterOptions: QTableToolbarFilterOptions;
  pagination: QTablePagination;
}
