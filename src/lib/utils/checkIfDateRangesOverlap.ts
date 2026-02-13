import type { ObjWithNonNullableValues } from '../types';

/**
 * Returns the array of indexes of intervals that have overlapping date ranges.
 * Each index is from the original intervals (typically, e.g., `previousAddresses`).
 *
 * @param intervals Array of objects (with .from, .to (Date or null), .index (number))
 * @returns Array of unique indexes for intervals that are involved in at least one overlap.
 */
export const checkIfDateRangesOverlap = <TInterval extends { from: string | Date | null; to: string | Date | null; index: number }>(intervals: TInterval[]) => {
    const overlappingIndexes = new Set<number>();

    const valid = intervals.filter((range) => {
        return !!range.from && !!range.to;
    }) as ObjWithNonNullableValues<TInterval>[];

    const sorted = [...valid].sort((a, b) => {
        return new Date(a.from).getTime() - new Date(b.from).getTime();
    });

    for (let i = 0; i < sorted.length; i++) {
        const curr = sorted[i];

        for (let j = i + 1; j < sorted.length; j++) {
            const next = sorted[j];

            const nextFrom = new Date(next.from);
            const currTo = new Date(curr.to);

            if (nextFrom.getTime() > currTo.getTime()) {
                break;
            }

            const nextTo = new Date(next.to);
            const currFrom = new Date(curr.from);

            const isOverlap = nextFrom.getTime() <= currTo.getTime() && nextTo.getTime() >= currFrom.getTime();

            if (isOverlap) {
                if (curr.index !== -1) {
                    overlappingIndexes.add(curr.index);
                }

                if (next.index !== -1) {
                    overlappingIndexes.add(next.index);
                }
            }
        }
    }

    return Array.from(overlappingIndexes);
};
