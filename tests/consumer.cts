import { toOrdinalDate, fromOrdinalDate } from '@lp-labs/ordinal-date-codec';
if (toOrdinalDate(fromOrdinalDate('2024-060')) !== '2024-060') throw new Error('Ordinal');
// @ts-expect-error invalid argument must be rejected by declarations
fromOrdinalDate(2024060);
