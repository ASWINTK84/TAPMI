"use client"

import { FaEnvelope, FaPhone, FaDownload, FaPlay, FaGithub, FaLinkedin } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiDownload, FiMail, FiPhone } from "react-icons/fi";
import { HiMail } from "react-icons/hi";
import { IoPlayCircle, IoPlayCircleOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";


interface Skill {
  name: string;
  iconUrl: string;
} 
interface VisualResume {
  videoUrl?: string;  
}
interface SocialLinks {
  github?: string | null;
  linkedin?: string | null;
  [key: string]: string | null | undefined; 
}



interface User {
  _id: string;
  name: string;
  gender: string;
  age: number;
  pronouns: string;
  profileImageUrl: string;
  email: string;
  phone: string;
  resumeUrl: string;
   selfIntroduction?: string[];
  skills?: Skill[];
 projects?: { title: string; description: string; imageUrl: string }[];
caseStudies?: { title: string; description: string; imageUrl: string }[];
visualResume?: VisualResume;
socialLinks?: SocialLinks;

}

export default function ProfileHeader() {
const params = useParams();
  const userId = params.id;
  const router = useRouter();
const visualResumeRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("caseStudies"); 
  console.log(userId);
  

 

useEffect(() => {
  const fetchUser = async () => {
    try {
      const { data } = await axios.get<User>(`http://localhost:5000/api/users/${userId}`);
      setUser(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Fetch user failed:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (userId) fetchUser();
}, [userId]);


  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;


  // Project or casestudy
  const dataToShow = selectedCategory === "caseStudies" ? user.caseStudies : user.projects;

console.log(dataToShow);



  const scrollToVisualResume = () => {
    visualResumeRef.current?.scrollIntoView({ behavior: "smooth" });
  };



  return (
    <div className="w-full ">
      <div className="bg-gradient-to-r from-orange-400 to-red-500 h-75 relative">

         {/* backbutton */}
       <div className="mr-auto ml-5 ">
                 <button
                    onClick={() => router.push("/")} 
                    className="bg-orange-300 text-black px-6 py-2 rounded-4xl hover:bg-orange-200 transition mt-6"
                    >
                    ← Back to Home
                    </button>
        </div>
        
        <div className="absolute bottom-4 left-10 flex items-center gap-6 text-white text-sm">
          <div className="flex items-center gap-2 cursor-pointer">
            <FaEnvelope /> {user.email}
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <FaPhone /> {user.phone}
          </div>
        </div>

        <a
          href={user.resumeUrl }
          className="absolute bottom-4 right-10 flex items-center gap-2 px-6 py-2 border border-white rounded-full text-white hover:bg-white hover:text-orange-500 transition"
        >
          <FaDownload /> Download My Resume
        </a>
      </div>

      {/* Profile pic */}
      <div className="flex justify-center -mt-45 relative z-10">
        <div className="rounded-full border-4 border-white overflow-hidden w-90 h-90">
          <img
            src={user.profileImageUrl} 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
         
      </div>

   

      {/* Details */}
      <div className="text-center mt-10">
        
        <h1 className="text-4xl text-black font-bold">{user.name}</h1>
        <p className="text-gray-600 text-xl font-bold">{user.gender} | {user.age} | {user.pronouns}</p>

        {/* Watch visual resume */}
        <button className="mt-8 flex items-center gap-2 mx-auto pe-8   rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
            onClick={scrollToVisualResume}
        >
          <IoPlayCircle size={50} /> Watch my Visual Resume Now
        </button>

      </div>
      <div className="my-9 flex justify-between items-center border border-gray-200 rounded-4xl px-8 py-8 max-w-6xl mx-auto  shadow-sm">
           
            <span className="text-sm font-semibold text-gray-500 cursor-pointer">
                Core Skills & Technical Proficiencies
            </span>
            <span className="text-sm font-semibold text-gray-500 cursor-pointer">
                Professional Journey & Internship Roles
            </span>
            <span className="text-sm font-semibold text-gray-500 cursor-pointer">
                Case Insights & Key Projects
            </span>
            <span className="text-sm font-semibold text-gray-500 cursor-pointer">
                Learning & Academic Milestones
            </span>
            <span className="text-sm font-semibold text-gray-500 cursor-pointer">
                Endorsements from Mentors & Peers
            </span>
        </div>


        <div className="max-w-6xl mx-auto text-xl text-center text-gray-600 space-y-6 leading-relaxed px-4 py-8">
            {
            user.selfIntroduction?.map((intro, i) => (
                 <p key={i}>{intro}</p>
            ))
            }
        </div>


        <div className="flex justify-center items-center gap-12 py-8 bg-white">
            
            {
                user.skills?.map((skill, i)=> (
                    <img key={i} src={skill.iconUrl} alt={skill.name} className="h-30 opacity-25" />
                ))
            }
         </div>


         <div className="max-w-6xl mx-auto py-12 px-4 relative">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 max-w-80">
        Case Insights & Key Projects
      </h2>

      {/* // Project or casestudy */}
      <div className="absolute top-20 right-0 flex space-x-2 border rounded-3xl p-1">
        <button
          className={`px-4 py-2 rounded-3xl font-medium transition ${
            selectedCategory === "caseStudies"
              ? "bg-gray-300 text-white"
              : "bg-transparent text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setSelectedCategory("caseStudies")}
        >
          Case Studies
        </button>
        <button
          className={`px-4 py-2 rounded-3xl font-medium transition ${
            selectedCategory === "projects"
              ? "bg-gray-300 text-white"
              : "bg-transparent text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setSelectedCategory("projects")}
        >
          Projects
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
       
      >
        {dataToShow?.map((item, index) => (
          <SwiperSlide
                key={index}
                className="bg-white border rounded-xl shadow p-6 hover:shadow-lg transition flex flex-col items-center justify-between"
                >
                <div className="w-full h-40 overflow-hidden rounded-md mb-4">
                    <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    />
                </div>

                <h3 className="font-semibold text-sm text-orange-500 mb-2 text-center">{item.title}</h3>
                
                <p className="text-gray-600 text-sm text-center line-clamp-3">
                    {item.description}
                </p>
                </SwiperSlide>

        ))}
      </Swiper>
    </div>
         
         
        <div className=" p-5 rounded-[15px] text-center font-sans"  ref={visualResumeRef}>
        <h2 className="my-5 text-5xl font-bold text-gray-800">Visual Resume</h2>
        <div className="mt-20 relative w-full max-w-5xl mx-auto rounded-[15px] overflow-hidden shadow-md">
            <div className="aspect-video">
            <iframe
                className="w-full h-full"
                src={user.visualResume?.videoUrl}
                title="Visual Resume Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            </div>
            
        </div>
        </div>


            <div className="bg-gray-100 p-10 mt-40 flex flex-col items-center font-sans">
            <div className="mt-10 bg-gradient-to-r from-orange-400 to-red-600 text-white p-18 rounded-3xl text-center mb-8 shadow-lg  w-full">
                <h2 className="text-4xl font-bold mb-5">Connect with {user.name}</h2>

                <a href={user.resumeUrl }  >
                <button className="bg-white text-orange-500 border-none px-8 py-4 rounded-3xl text-lg font-semibold cursor-pointer inline-flex items-center shadow-md hover:bg-gray-100 transition">

                    <FiDownload className="me-3" size={20} color="#f44336" />
                Download My Resume
                </button>
                </a>
            </div>

            <div className="flex justify-between max-w-6xl w-full m-5 flex-wrap">
    {/* Left */}
            <div className="flex gap-10">
                <div className="flex flex-col items-center text-gray-600 text-sm">
                <HiMail size={24} style={{ marginBottom: '5px' }} />
                Email 
                </div>
                <div className="flex flex-col items-center text-gray-600 text-sm">
                <FiPhone size={24} style={{ marginBottom: '5px' }} />
                Phone
                </div>
            </div>

 {/* Right */}
            <div className="flex gap-10">
                <div className="flex items-center gap-3 text-gray-600 border border-gray-300 rounded-full px-4 py-1 text-sm">
                <a href={user.socialLinks?.github ?? "#"}><FaGithub size={20} /></a>
                GitHub
                </div>
                <div className="flex items-center gap-3 text-gray-600 border border-gray-300 rounded-full px-4 py-1 text-sm">
                <a href={user.socialLinks?.linkedin ?? "#"}><FaLinkedin size={20} /></a>
                LinkedIn
                </div>
            </div>
            
            </div>


            <hr className="w-4/5 border-t border-gray-200 my-10" />

  
        </div>




    </div>
  );
}
