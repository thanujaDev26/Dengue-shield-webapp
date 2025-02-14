import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const onChangeLocation = () => {
    navigate('/about');  // Redirect to internal route
  };
  
  return (
    <section className='m-0'>
      {/*top section introduction*/}
      <div className="flex flex-col md:flex-row items-center bg-transparent min-h-1/2 m-0 w-full p-0">
        <div className="md:w-1/2 p-12 text-center md:text-center">
        <h1 className="text-5xl font-bold text-gray-800 leading-tight">Dengue Shield</h1>
        <p className="text-lg text-gray-600 mt-4">
          A sensor-based system detects mosquito breeding conditions and provides real-time alerts to prevent dengue outbreaks.
        </p>
        <button
          onClick={onChangeLocation}
          className="mt-6 px-6 py-3 bg-gray-800 text-white rounded-3xl hover:bg-gray-700"
        >
          Learn More
        </button>
      </div>

        <div className="md:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent md:block hidden"></div>
          <img src="images/home_top.png" alt="Illustration" className="w-full h-auto object-cover"/>
        </div>
      </div>

      {/*second section */}
      <div className='w-full flex justify-center items-center bg-transparent'>
        <div className='md:m-5 m-4 rounded-3xl border-2 border-emerald-500 container md:w-full w-11/12 max-w-7xl'>
          <div className='flex flex-col md:flex-row items-center text-center'>           
            <div className='md:m-5 m-5 text-start'>
              <h1 className='text-3xl antialiased font-bold text-gray-600'>Key Features</h1>
            </div>
          </div>

          <div className='flex flex-col md:flex-row items-center text-center'>           
            <div className='md:m-4 m-4 rounded-3xl border-2 border-emerald-500  bg-emerald-50 md:w-1/3 w-11/12 h-40 shadow-2xl transition duration-700 ease-in-out hover:scale-105'>
              <div className='flex-shrink-0 flex items-center justify-center p-3'>
                <img className="h-12 w-auto" src="/images/home_1.png" alt="Logo"/>          
                <h1 className='p-1 text-xl font-bold text-gray-600'>Real-time Monitoring</h1>       
              </div>            
              <p className='py-1 px-10 text-md font-normal text-gray-600'>
                Uses IoT sensors to detect stagnant water sources and monitor weather patterns.
              </p>
            </div>

            <div className='md:m-4 m-4 rounded-3xl border-2 border-emerald-500  bg-emerald-50 md:w-1/3 w-11/12 h-40 shadow-2xl transition duration-700 ease-in-out hover:scale-105'>
              <div className='flex-shrink-0 flex items-center justify-center p-3'>
                <img className="h-12 w-auto" src="/images/home_2.png" alt="Logo"/>          
                <h1 className='p-1 text-xl font-bold text-gray-600'>Predictive Analytics</h1>       
              </div>
              <p className='py-1 px-10 text-md font-normal text-gray-600'>Analyzes historical and current data to predict potential outbreaks.</p>
            </div>

            <div className='md:m-4 m-4 rounded-3xl border-2 border-emerald-500  bg-emerald-50 md:w-1/3 w-11/12 h-40 shadow-2xl transition duration-700 ease-in-out hover:scale-105'>
              <div className='flex-shrink-0 flex items-center justify-center p-3'>
                <img className="h-12 w-auto" src="/images/home_3.png" alt="Logo"/>          
                <h1 className='p-1 text-xl font-bold text-gray-600'>Mosquito Surveillance</h1>       
              </div>
              <p className='py-1 px-10 text-md font-normal text-gray-600'>Maps areas with high mosquito populations and sends automated alerts.</p>
            </div>
          </div>   

          <div className='flex flex-col md:flex-row items-center text-center'>           
            <div className='md:m-4 m-4 rounded-3xl border-2 border-emerald-500  bg-emerald-50 md:w-1/3 w-11/12 h-40 shadow-2xl transition duration-700 ease-in-out hover:scale-105'>
              <div className='flex-shrink-0 flex items-center justify-center p-3'>
                <img className="h-12 w-auto" src="/images/home_4.png" alt="Logo"/>          
                <h1 className='p-1 text-xl font-bold text-gray-600'>Community Engagement</h1>       
              </div>
              <p className='py-1 px-10 text-md font-normal text-gray-600'>Encourages community involvement through reporting and educational resources.</p>
            </div>

            <div className='md:m-4 m-4 rounded-3xl border-2 border-emerald-500  bg-emerald-50 md:w-1/3 w-11/12 h-40 shadow-2xl transition duration-700 ease-in-out hover:scale-105'>
              <div className='flex-shrink-0 flex items-center justify-center p-3'>
                <img className="h-12 w-auto" src="/images/home_5.png" alt="Logo"/>          
                <h1 className='p-1 text-xl font-bold text-gray-600'>Data-Driven Insights</h1>       
              </div>
              <p className='py-1 px-10 text-md font-normal text-gray-600'>Data is analyzed with machine learning to provide actionable insights for mosquito prevention.</p>
            </div>

            <div className='md:m-4 m-4 rounded-3xl border-2 border-emerald-500   bg-emerald-50 md:w-1/3 w-11/12 h-40 shadow-2xl transition duration-700 ease-in-out hover:scale-105'>
              <div className='flex-shrink-0 flex items-center justify-center p-3'>
                <img className="h-12 w-auto" src="/images/home_6.png" alt="Logo"/>          
                <h1 className='p-1 text-xl font-bold text-gray-600'>Mapping Breeding Sites</h1>       
              </div>
              <p className='py-1 px-10 text-md font-normal text-gray-600'>The system maps high mosquito population areas, focusing on stagnant water sites.</p>
            </div>
          </div>     
        </div>
      </div>

      {/*Third Section*/}
      <div className='w-full flex justify-center items-center bg-transparent'>
        <div className='md:m-5 m-4 rounded-3xl border-0 container md:w-full w-11/12 max-w-7xl'>
          <div className='flex flex-col md:flex-row items-center text-center'>           
            <div className='md:m-5 m-5 text-start'>
              <h1 className='text-3xl antialiased font-bold text-black'>Importance of Our System</h1>
            </div>
          </div>
          <div className='flex justify-center items-center bg-transparent'>
            <img src="/images/Home_importance.png" className='items-center h-auto w-1/3'></img>
          </div>
        </div>
      </div>

      {/*Forth Section - Subscribe*/}
      <div className='w-full flex justify-center items-center bg-gradient-to-r from-teal-100 to-transparent p-5 m-5'>
        <div className='md:m-5 m-4 rounded-3xl border-0 container md:w-full w-11/12 max-w-7xl'>
          <div className='md:m-5 m-5 text-start'>
            <h1 className='text-3xl antialiased font-bold text-black'>Importance of Our System</h1>
          </div>
          <div>
            <div className="flex flex-row">
              <div>
                <label className="block text-sm/6 font-medium text-gray-900 pl-5 m-5">Username</label>
              </div>              
             
                <div className="flex items-center rounded-md bg-white pl-3 m-3 p-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">                  
                  
                  <input type="text" name="username" id="username" className="block min-w-0 grow pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder="Enter Your Email Here"/>                 
                </div>
                <div>
                <button className='border border-gray-700 w-25  rounded-lg m-4 p-2 bg-slate-400'>Subcribe</button>
                </div> 
               
              </div>
            </div>
          </div>
        </div>
      
    </section>
  );
};

export default Home;
