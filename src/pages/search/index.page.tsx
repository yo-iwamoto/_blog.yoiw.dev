import { useHooks } from './index.hook';
import { FaInfoCircle } from 'react-icons/fa';

export type Query = {
  q: string;
};

export default function Page() {
  const { query } = useHooks();

  return (
    <>
      <h1 className='mb-8'>「{query}」を含むエントリ</h1>
      <p className='flex items-center gap-2 rounded-lg bg-green-50 p-4 shadow-lg'>
        <FaInfoCircle className='text-2xl text-green-400' />
        <span>検索機能は未実装です</span>
      </p>
    </>
  );
}
