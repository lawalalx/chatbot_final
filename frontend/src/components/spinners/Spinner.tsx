import { Circles } from 'react-loader-spinner'

interface SpinnerProps {
  loading: boolean
  width: number
  height: number
}

const Spinner = ( {loading, width, height}: SpinnerProps ) => {
  return (
    <>
      <Circles
        width={width}
        height={height}
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