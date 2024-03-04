'use client';

import { TimeZoneName } from '@vvo/tzdb';
import { DateTime } from 'luxon';

export function DateTimeDisplay({
  currentTime = DateTime.now(),
  timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone,
}: {
  currentTime?: DateTime;
  timezoneName?: TimeZoneName;
} = {}) {
  if (!currentTime) {
    return null;
  }

  return (
    <time dateTime={currentTime.toString()} suppressHydrationWarning>
      {currentTime.setZone(timezoneName).toFormat('M/dd HH:mm')}
    </time>
  );
}
