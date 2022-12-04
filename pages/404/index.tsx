import { useRouter } from 'next/router'
import { MdArrowBack } from 'react-icons/md'

type Props = {}

function Custom404({ }: Props) {
  const router = useRouter();
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div className='mb-3 font-semibold uppercase text-green-400'>404 - Page Not Found</div>
      <p className='mb-3 text-2xl'>The page you're looking for isn't available.</p>
      <button
        type="button"
        className="flex justify-center items-center"
        onClick={e => router.back()}
      >
        <MdArrowBack className='w-5 h-5 mr-1' />
        <span>Back</span>
      </button>
    </div>
  )
}

export default Custom404