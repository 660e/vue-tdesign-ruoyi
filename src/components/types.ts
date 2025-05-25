import type { LinkProps, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';

interface QTableTopFilterBaseProps {
  title?: string;
}

interface QTableTopFilterProps {
  _topFilter?:
    | ({
        type: 'input';
      } & QTableTopFilterBaseProps)
    | ({
        type: 'select';
        dictType: string;
      } & QTableTopFilterBaseProps);
}

interface QTableHandleProps {
  value: string;
  icon?: string;
  label?: string;
  theme?: LinkProps['theme'];
}

export interface QTableProps {
  columns: (PrimaryTableCol<TableRowData> & QTableTopFilterProps)[];
  handles: QTableHandleProps[];
}
