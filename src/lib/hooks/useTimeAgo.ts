import { useEffect, useState } from 'react';

const units: [string, number][] = [
  ['년', 24 * 60 * 60 * 1000 * 365],
  ['달', 24 * 60 * 60 * 1000 * 30],
  ['일', 24 * 60 * 60 * 1000],
  ['시간', 60 * 60 * 1000],
  ['분', 60 * 1000],
  ['초', 1000],
];

function useTimeAgo(date: Date | string) {
  const [timeAgo, setTimeAgo] = useState<string>('');

  useEffect(() => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const diff = Date.now() - dateObj.getTime();
    const unit = units.find(([_unit, value]) => diff > value);

    if (!unit) setTimeAgo('방금 전');
    else {
      const [unitName, unitValue] = unit;
      const elapsed = Math.floor(diff / unitValue);
      setTimeAgo(`${elapsed}${unitName} 전`);
    }
  }, [date]);

  return timeAgo;
}

export default useTimeAgo;
