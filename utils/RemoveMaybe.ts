import { Maybe } from 'graphql/jsutils/Maybe';

export const RemoveMaybeAsList = <T>(items: Maybe<T>[]): T[] => items.filter((x) => !!x) as T[];
