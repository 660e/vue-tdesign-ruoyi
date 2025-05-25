import type { LinkProps, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';

interface QTableFilterProps {
  _topFilter?: { type: 'input' | 'select' };
}

interface QTableHandleProps {
  value: string;
  icon?: string;
  label?: string;
  theme?: LinkProps['theme'];
}

export interface QTableProps {
  columns: (PrimaryTableCol<TableRowData> & QTableFilterProps)[];
  handles: QTableHandleProps[];
}
