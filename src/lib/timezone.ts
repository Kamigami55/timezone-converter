import { TimeZone } from '@vvo/tzdb';

import { pad } from '@/lib/string';

export function utcOffsetToDisplay(utcOffset: number) {
  const hours = Math.floor(Math.abs(utcOffset) / 60);
  const minutes = Math.abs(utcOffset) % 60;

  const sign = utcOffset < 0 ? '-' : '+';

  return `${sign}${hours}${minutes > 0 ? ':' + pad(minutes) : ''}`;
}

export type TimeZoneWithId = TimeZone & { id: number };
