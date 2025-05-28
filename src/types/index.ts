import { DICTS } from '@/constants';

export type TDicts = (typeof DICTS)[number];
export type TDictsMap = Map<TDicts, { label: string; type: string; value: string }[]>;
