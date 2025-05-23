import type { LinkProps, TableProps } from 'tdesign-vue-next';

interface QTableFilterProps {
  _filter?: boolean | { type?: 'input' | 'select' };
}

interface QTableHandleProps {
  label: string;
  value: string;
  theme?: LinkProps['theme'];
}

export interface QTableProps {
  columns: TableProps['columns'] & QTableFilterProps[];
  handles: QTableHandleProps[];
}
