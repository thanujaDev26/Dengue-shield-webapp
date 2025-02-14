export default function Databoard() {
  return (
      <div className='w-full flex justify-center items-center bg-transparent'>
        <div className='md:m-5 m-4 rounded-3xl border-emerald-500 container md:w-full w-11/12 max-w-7xl'>
          <div className='flex flex-col md:flex-row items-center text-center'>
            <div className='md:m-5 m-5 text-end'>
              <h1 className='text-3xl antialiased font-bold text-gray-600'>Real-time Sensor Data</h1>
            </div>
          </div>

          <div className='flex flex-col md:flex-row items-center text-center'>
            <div className='md:m-4 m-4 rounded-3xl border-2 border-emerald-500 md:w-1/3 w-11/12 h-40 shadow-2xl transition duration-700 ease-in-out hover:scale-105'>
              <div className='flex-shrink-0 flex items-center justify-center p-3'>
                <img className="h-12 w-auto" src="/images/Dashboard_1.svg" alt="Humidity"/>
                <h1 className='p-1 text-xl font-bold text-gray-600'>Humidity</h1>
              </div>
              <p className='py-1 px-10 text-md font-normal text-gray-600'>Monitors real-time humidity levels.</p>
            </div>

            <div className='md:m-4 m-4 rounded-3xl border-2 border-emerald-500 md:w-1/3 w-11/12 h-40 shadow-2xl transition duration-700 ease-in-out hover:scale-105'>
              <div className='flex-shrink-0 flex items-center justify-center p-3'>
                <img className="h-12 w-auto" src="/images/Dashboard_2.svg" alt="Water Level"/>
                <h1 className='p-1 text-xl font-bold text-gray-600'>Water Level</h1>
              </div>
              <p className='py-1 px-10 text-md font-normal text-gray-600'>Tracks water levels in containers.</p>
            </div>

            <div className='md:m-4 m-4 rounded-3xl border-2 border-emerald-500 md:w-1/3 w-11/12 h-40 shadow-2xl transition duration-700 ease-in-out hover:scale-105'>
              <div className='flex-shrink-0 flex items-center justify-center p-3'>
                <img className="h-12 w-auto" src="/images/Dashboard_3.svg" alt="Water Flow"/>
                <h1 className='p-1 text-xl font-bold text-gray-600'>Water Flow Speed</h1>
              </div>
              <p className='py-1 px-10 text-md font-normal text-gray-600'>Monitors water flow speed in real time.</p>
            </div>
          </div>

          <div className='flex flex-col md:flex-row items-center text-center'>
            <div className='md:m-4 m-4 rounded-3xl border-2 border-emerald-500 md:w-1/3 w-11/12 h-40 shadow-2xl transition duration-700 ease-in-out hover:scale-105'>
              <div className='flex-shrink-0 flex items-center justify-center p-3'>
                <img className="h-12 w-auto" src="/images/Dashboard_4.svg" alt="Temperature"/>
                <h1 className='p-1 text-xl font-bold text-gray-600'>Temperature</h1>
              </div>
              <p className='py-1 px-10 text-md font-normal text-gray-600'>Real-time temperature monitoring.</p>
            </div>

            <div className='md:m-4 m-4 rounded-3xl border-2 border-emerald-500 md:w-1/3 w-11/12 h-40 shadow-2xl transition duration-700 ease-in-out hover:scale-105'>
              <div className='flex-shrink-0 flex items-center justify-center p-3'>
                <img className="h-12 w-auto" src="/images/Dashboard_5.svg" alt="Water Quality"/>
                <h1 className='p-1 text-xl font-bold text-gray-600'>Water Quality</h1>
              </div>
              <p className='py-1 px-10 text-md font-normal text-gray-600'>Analyzes water quality in real time.</p>
            </div>

            <div className='md:m-4 m-4 rounded-3xl border-2 border-emerald-500 md:w-1/3 w-11/12 h-40 shadow-2xl transition duration-700 ease-in-out hover:scale-105'>
              <div className='flex-shrink-0 flex items-center justify-center p-3'>
                <img className="h-12 w-auto" src="/images/home_6.png" alt="Location"/>
                <h1 className='p-1 text-xl font-bold text-gray-600'>Sensor Location</h1>
              </div>
              <p className='py-1 px-10 text-md font-normal text-gray-600'>Displays sensor-detected locations.</p>
            </div>
          </div>
        </div>
      </div>
  );
}

//