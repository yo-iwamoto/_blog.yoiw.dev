import { InferGetStaticPropsType } from 'next';

export type EmptyPageParams = { [x: string]: never };

export type InferDynamicGetStaticProps<T> = EmptyPageParams | InferGetStaticPropsType<T>;
