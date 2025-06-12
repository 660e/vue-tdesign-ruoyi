import type { AppResponseData, AppUnknownRecord } from '@/types';
import { useLoading } from '@/stores';
import { is } from '@/utils';

export async function useHandleDelete(api: () => Promise<AppResponseData<AppUnknownRecord>>, value: number | string | undefined) {
  return new Promise((resolve) => {
    const DialogInstance = DialogPlugin.confirm({
      header: `${is.number(value) ? '批量' : ''}删除`,
      body: () => {
        return '';
      },
      confirmBtn: { content: '删除', theme: 'danger' },
      onConfirm: async () => {
        useLoading().show();
        try {
          const { msg } = await api();
          MessagePlugin.success(msg);
          DialogInstance.hide();
          resolve(true);
        } catch {
          resolve(false);
        } finally {
          useLoading().hide();
        }
      },
      onClosed: () => DialogInstance.destroy(),
    });
  });
}
