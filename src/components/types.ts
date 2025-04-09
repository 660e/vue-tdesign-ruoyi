import type { TableProps } from 'tdesign-vue-next';

interface QTableFilterProps {
  _filter?:
    | boolean
    | {
        type?: 'input' | 'select';
      };
}

export interface QTableProps {
  columns: TableProps['columns'] & QTableFilterProps[];
}
