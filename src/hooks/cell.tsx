import type { TagProps } from 'tdesign-vue-next';
import { Tag } from 'tdesign-vue-next';
import { useInfoStore } from '@/stores';

export const useTableCell = () => {
  const infoStore = useInfoStore();

  const tagCell = (value: number | string, themes: TagProps['theme'][], key: string) => {
    const dicts = infoStore.dicts?.get(key) || [];
    const dict = dicts?.find((e) => e.dictValue === value);
    const index = dicts?.findIndex((e) => e.dictValue === value);

    return (
      <Tag size="small" theme={themes[index]}>
        {dict?.dictLabel}
      </Tag>
    );
  };

  return { tagCell };
};
