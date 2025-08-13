"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";

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
  
}

export default function Home() {
     const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        const data: User[] = await res.json(); 
        setUsers(data); 
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);
  

  if (loading) return <p>Loading...</p>;



  return (
    <div className="min-h-screen bg-white ">

      <main className="p-8 sm:p-10 grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
        {users.map((profile) => (
          
            <div
            key={profile._id}  className="bg-gray-50 rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition transform hover:scale-[1.03] w-[330px] pb-6"
            >
              <Link href={`/profile/${profile._id}`}>
              <div className="bg-orange-400 flex justify-center items-center h-36 relative">
                <img
                  src={profile.profileImageUrl}
                  alt={profile.name}
                  className="w-38 h-38 rounded-full object-cover absolute -bottom-16 left-1/2 transform -translate-x-1/2 "
                />
              </div>
              <div className="pt-20 text-center px-8">
                <h2 className="text-gray-900 text-lg font-semibold mb-1 ">{profile.name}</h2>
                <p className="text-gray-500 text-sm mb-4">
                  {profile.gender} | {profile.age} | {profile.pronouns}
                </p>
              
              </div>
              </Link>

              <div className="flex justify-center">
                  <a
                    href={profile.resumeUrl}
                    className="flex items-center gap-2 px-6 py-3 w-[250px] rounded-full border border-white bg-gray-50 hover:bg-gray-100 transition shadow-sm"
                  >
                    
                    <FiDownload className="w-5 h-5 text-gray-700" />
                    <span className="text-gray-400 font-medium">Download My Resume</span>
                  </a>
                </div>
            </div>
          
        ))}
      </main>
</div>

  );
}
