import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import "./Swiper.css"
import {Link} from "react-router"
import {useState} from "react"

export default function Prompt() {
  const [isEmpty,changeEmpty]=useState()
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6" >
      <div className="w-full max-w-6xl py-4">
        <h1 className="text-2xl font-bold">Website Name</h1>
      </div>
      <div id='prompt'>
      <h2 className="text-3xl font-semibold text-center mt-10">
        What do you want to build?
      </h2>
      <p className="text-gray-400 text-center mt-2">
        Prompt, run, edit, and deploy full-stack web and mobile apps.
      </p>

      <div className="w-full max-w-lg mt-6 flex gap-3">
        <input
          type="text"
          placeholder="How can we help you today?"
          className="w-full p-3 text-lg bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e)=>{
            if ((e.target.value).length!=0){
              changeEmpty(true)
            }
            else{
              changeEmpty(false)
            }
          }}
        />
        {isEmpty&&<Link to='/geeks' className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
          Enter
        </Link>}
        </div>
      </div>

      <div className="w-full max-w-4xl mt-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          loop={true}
          autoplay={{ delay: 2000 }}
          pagination={{ clickable: true }}
          id='swiper'
        >
          <SwiperSlide>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                 alt="React" className="w-full h-40 object-contain" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg"
                 alt="Angular" className="w-full h-40 object-contain" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
                 alt="Vue.js" className="w-full h-40 object-contain" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg"
                 alt="Svelte" className="w-full h-40 object-contain" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                 alt="Next.js" className="w-full h-40 bg-white p-2 rounded-lg object-contain" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                 alt="Node.js" className="w-full h-40 object-contain" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
