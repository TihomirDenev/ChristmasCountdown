import { CountdownTime } from '@libs/models/countdown-time.model';

const DAYS_IN_WEEK = 7;

export const pluralize = (count: number, singular: string, plural: string): string =>
  count === 1 ? singular : plural;

export const buildCountdownSummary = (countdown: CountdownTime): string => {
  const extraDays = countdown.days % DAYS_IN_WEEK;
  const weeksText = `${countdown.weeks} ${pluralize(countdown.weeks, 'week', 'weeks')}`;
  const daysText = `${extraDays} ${pluralize(extraDays, 'day', 'days')}`;

  if (countdown.days === 0) {
    return 'Only a few hours of waiting left!';
  }

  if (countdown.weeks === 0) {
    return `Just ${daysText} of magic left`;
  }

  if (extraDays === 0) {
    return `Exactly ${weeksText} of magic left`;
  }

  return `${weeksText} and ${daysText} of magic left`;
};
