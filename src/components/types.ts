import type { TableProps } from 'tdesign-vue-next';

interface QTableFilterProps {
  _filter?: boolean;
}

export interface QTableProps {
  columns: TableProps['columns'] & QTableFilterProps[];
}
