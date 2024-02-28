'use client';

import { DateTime } from 'luxon';
import * as React from 'react';

export function DateTimeDisplay({
  tzCode = Intl.DateTimeFormat().resolvedOptions().timeZone,
}: { tzCode?: string } = {}) {
  // Display current time in the user's timezone going forward, update each second
  const [time, setTime] = React.useState(DateTime.now().setZone(tzCode));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(DateTime.now().setZone(tzCode));
    }, 1000);

    return () => clearInterval(interval);
  }, [tzCode]);

  return (
    <time dateTime={time.toString()} suppressHydrationWarning>
      {time.toFormat('MM/dd HH:mm:ss')}
    </time>
  );
}
