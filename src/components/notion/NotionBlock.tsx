import { NotionText } from './NotionText';
import { cn } from '@/lib/classNames';
import { FaGlobeAfrica } from 'react-icons/fa';
import Image from 'next/image';
import type { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints';

type Props = GetBlockResponse;

export const NotionBlock = (block: Props) => {
  if (!('type' in block)) {
    return null;
  }

  const { type } = block;
  switch (type) {
    case 'paragraph':
      return (
        <p className='py-2'>
          <NotionText key={block.id} rich_text={block.paragraph.rich_text} />
        </p>
      );
    case 'image':
      return (
        <div className='relative h-72 w-full'>
          <Image
            decoding='async'
            layout='fill'
            objectFit='contain'
            src={block.image.type === 'file' ? block.image.file.url : block.image.external.url}
            alt={block.image.caption[0]?.plain_text ?? ''}
          />
        </div>
      );
    case 'heading_1':
      return (
        <>
          <h1 className='pt-8 pb-1 text-2xl font-bold'>
            <NotionText key={block.id} rich_text={block.heading_1.rich_text} />
          </h1>
          <hr className='pb-2' />
        </>
      );
    case 'heading_2':
      return (
        <h2 className='pt-4 pb-1 text-xl font-bold'>
          <NotionText key={block.id} rich_text={block.heading_2.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3 className='py-1 text-lg font-bold'>
          <NotionText key={block.id} rich_text={block.heading_3.rich_text} />
        </h3>
      );
    case 'bookmark':
      return (
        <div className='py-2'>
          <a className='w-full' href={block.bookmark.url} target='_blank' rel='noreferrer'>
            <span
              className='flex w-full items-center gap-3
            rounded-md border border-gray-200 p-4 transition-colors hover:bg-gray-100'
            >
              <FaGlobeAfrica className='h-3 w-3 text-gray-600' />
              <span className='text-sm text-gray-800'>{block.bookmark.url}</span>
            </span>
          </a>
        </div>
      );
    case 'callout':
      return <div>{block.callout.rich_text.map((t) => t.plain_text).join()}</div>;
    case 'bulleted_list_item':
      return (
        <li className='list-disc py-1 pl-3'>
          <NotionText key={block.id} rich_text={block.bulleted_list_item.rich_text} />
        </li>
      );
    case 'numbered_list_item':
      // un-implemented
      // same display with bulleted_list_item
      return (
        <li className='list-disc py-1 pl-3'>
          <NotionText key={block.id} rich_text={block.numbered_list_item.rich_text} />
        </li>
      );
    case 'divider':
      return <hr className='border-gray-200' />;
    case 'code':
      return (
        <pre>
          <div className='relative my-2 rounded-md pt-3 shadow-md'>
            <div className='absolute top-2 left-0 rounded-r-lg bg-gray-50 pl-1 pr-2'>
              <p className='text-xs'>{block.code.language}</p>
            </div>
            <code
              className={cn('code rounded-md', {
                'language-js': block.code.language === 'javascript',
                'language-ts': block.code.language === 'typescript',
                'language-plaintext': block.code.language === 'shell',
              })}
            >
              {block.code.rich_text.map((t) => t.plain_text).join('\n')}
            </code>
          </div>
        </pre>
      );

    // other un-implemented block types
    default:
      return null;
  }
};
