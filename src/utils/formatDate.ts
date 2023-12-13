import { format, parseISO } from 'date-fns';

export const formatDate = (date: string) => {
    const parseDate = parseISO(date);

    return format(parseDate, 'MM/dd/yyyy');
};
