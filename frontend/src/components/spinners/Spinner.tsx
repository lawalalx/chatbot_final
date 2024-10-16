import { Circles } from 'react-loader-spinner'

interface SpinnerProps {
  loading: boolean
}

const Spinner = ( {loading}: SpinnerProps ) => {
  return (
    <>
      <Circles
        height="20"
        width="20"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={loading}
        />
    </>
  )
}

export default Spinner