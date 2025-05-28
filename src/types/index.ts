import { DICTS } from '@/constants';

export type TDictsMap = Map<(typeof DICTS)[number], { label: string; type: string; value: string }[]>;
