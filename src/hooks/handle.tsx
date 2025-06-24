import type { AppResponseData, AppUnknownRecord } from '@/types';
import { Tag } from 'tdesign-vue-next';
import { useLoadingStore } from '@/stores';
import { is } from '@/utils';

export async function useHandleDelete(api: () => Promise<AppResponseData<AppUnknownRecord>>, value: number | string | undefined): Promise<string> {
  const loadingStore = useLoadingStore();

  return new Promise((resolve) => {
    const DialogInstance = DialogPlugin.confirm({
      header: `${is.number(value) ? '批量' : ''}删除`,
      body: () => {
        return (
          <div class="flex items-center gap-2">
            <span>确定删除{is.number(value) ? '选中的' : ''}</span>
            <Tag size="small" theme="danger" variant="light-outline">
              {value}
            </Tag>
            <span>{is.number(value) ? '条数据' : ''}吗？</span>
          </div>
        );
      },
      confirmBtn: { content: '删除', theme: 'danger' },
      onConfirm: async () => {
        loadingStore.show();
        const { msg } = await api();
        DialogInstance.hide();
        resolve(msg);
      },
      onClosed: () => DialogInstance.destroy(),
    });
  });
}
