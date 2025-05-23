import type { PrimaryTableCol, TableRowData, TagProps } from 'tdesign-vue-next';
import { Tag } from 'tdesign-vue-next';
import { useInfoStore } from '@/stores';

export const useTableCell = () => {
  const infoStore = useInfoStore();

  const tagCell = (key: string, themes: TagProps['theme'][]): PrimaryTableCol<TableRowData>['cell'] => {
    return (_, { col, row }) => {
      const dicts = infoStore.dicts?.get(key) || [];
      const dict = dicts?.find((e) => e.dictValue === row[col.colKey!]);
      const index = dicts?.findIndex((e) => e.dictValue === row[col.colKey!]);

      return (
        <Tag size="small" theme={themes[index]}>
          {dict?.dictLabel}
        </Tag>
      );
    };
  };

  return { tagCell };
};
