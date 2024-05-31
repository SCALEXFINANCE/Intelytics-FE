import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const User = () => {
  return (
    <>
    <div className=" w-full text-left pl-10">
          <Link href="/">
            <span className=" text-xl">&#8249;</span>Back
          </Link>
        </div>
    <div className="max-w-sm mx-auto bg-[#000722] shadow-sky-800 shadow-md rounded-2xl overflow-hidden   mt-10">
      <div className="flex justify-center mt-6">
        <Image src={"/user3.png"} alt="Profile Image" width={100} height={120} className="rounded-full border-2 border-gray-700 shadow-sky-800 shadow-sm" />
      </div>
      <div className="p-6 text-center">
        <h2 className="text-xl  text-white font-bold">Hello, User!</h2>
        
        {/* <p className=" text-white mt-4">Email:  </p> */}
        <p className=" text-white mt-5">Status: LoggedIn </p>
      </div>
    </div>
    </>
  )
}

export default User