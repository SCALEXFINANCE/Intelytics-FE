import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

 
const Signin = () => {
    const [email,setEmail] = useState()
    const [pwd , setPwd] = useState()
  return (
  

      <div className=" text-white w-full h-screen flex   justify-center items-center">
        <div className=" lg:w-7/12 bg-gradient-to-b from-[#0e1734] to-black h-screen  flex flex-col items-center justify-center">
            <Image src="/loginhero.png" alt="" height={80} width={200}/>
            <div className=" border border-white rounded-full p-2 text-xs mb-3">Analyse</div>
            <div className=" text-4xl font-bold">Trade With The Best</div>
            <div className=" text-4xl font-bold">Platform in Market</div>
            <div className=" text-xs text-gray-700 w-[60%] text-center p-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper velit sed purus sagittis, at semper dolor hendrerit. Vivamus pulvinar aliquet est ut consequa</div>
            <Image src="/loginhero2.png" alt="" height={600} width={700}/>
        </div>
        <div className=" lg:w-5/12 bg-black   h-screen  flex items-center justify-center flex-col">
            <div className=" bg-[#0e1734]  rounded-md p-8 flex flex-col items-center justify-center gap-2">
            <Image src="/search.png" alt="" height={30} width={30} />
            <div className=" text-2xl font-bold">Welcome Back</div>
            <div className=" text-md text-gray-600">Don't have an account yet? <span className=" text-white"><Link href="/Signup">Sign Up</Link></span></div>
            <div className=" w-full bg-black rounded border border-gray-800 p-2 flex gap-3">
            <Image src="/EnvelopeSimple.png" alt="" height={20} width={20} />
            <input
          className=" w-full bg-black text-gray-600 focus:outline-none "
          type="text"
          value={email}
          placeholder="email"
        />
            </div>
            <div className=" w-full bg-black rounded border border-gray-800 p-2 flex gap-3">
            <Image src="/Password.png" alt="" height={20} width={20} />
            <input
          className=" w-full bg-black text-gray-600 focus:outline-none "
          type="text"
          value={pwd}
          placeholder="password"
        />
            </div>
            <div className="bg-white rounded-md text-center m-3 p-2 text-black w-full font-bold">
                Login
            </div>
            <Image src="/break.png" alt="" height={10} width={300}/>
            <div className="bg-white rounded-md text-center m-3 p-2 text-black w-full flex items-center  gap-2 justify-center">
            <Image src="/google2.png" alt="" height={20} width={20}/>
                <div className="font-bold">Login with Google</div>
            </div>
            
             

            </div>

        </div>

      </div>
    
  );
};

export default Signin;
