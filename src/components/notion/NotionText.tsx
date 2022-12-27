import { random } from '@/lib/random';
import type { TRichTextSchema } from '@/lib/schema';

type Props = {
  text: TRichTextSchema[];
};

export const NotionText = ({ text }: Props) => {
  return (
    <>
      {text.map(({ plain_text, text, annotations }) => {
        if (text.link !== null) {
          return (
            <a
              className='text-blue-600 underline hover:text-blue-500'
              key={random()}
              href='#'
              target='_blank'
              rel='noreferrer'
            >
              {plain_text}
            </a>
          );
        }
        if (annotations.code) {
          return (
            <span key={random()} className='rounded-md bg-gray-200 p-0.5 font-mono text-xs text-red-500'>
              {plain_text}
            </span>
          );
        }

        return plain_text;
      })}
    </>
  );
};
