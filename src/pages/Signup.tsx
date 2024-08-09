import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { join } from "path";
import LoginHero from "../../public/loginhero.png";
import LoginHero2 from "../../public/loginhero2.png";
import Search from "../../public/search.png";
import EnvelopeSimple from "../../public/EnvelopeSimple.png";
import Password from "../../public/Password.png";
import Break from "../../public/break.png";
import Google2 from "../../public/google2.png";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSignup = async () => {
    const requestBody = {
      email: email,
      password: pwd,
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.status === 400) {
        throw new Error((await response.json()).message);
      }

      toast.success("Account created Successfully");
      // router.push("/Signin");
    } catch (error: any) {
      toast.error(error.message);
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="text-white w-full h-screen flex justify-center items-center">
      <div className="lg:w-7/12 lg:bg-gradient-to-b from-[#0e1734] to-black h-screen hidden lg:flex lg:flex-col items-center justify-center">
        <div className=" w-full text-left pl-10">
          <Link href="/">
            <span className=" text-xl">&#8249;</span>Back
          </Link>
        </div>
        <Image src={LoginHero} alt="" height={80} width={200} />
        <div className="border border-white rounded-full p-2 text-xs mb-3">
          Analyse
        </div>
        <div className="text-4xl font-bold">Join The Best</div>
        <div className="text-4xl font-bold">Platform in Market</div>
        <div className="text-xs text-gray-700 w-[60%] text-center p-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ullamcorper velit sed purus sagittis, at semper dolor hendrerit.
          Vivamus pulvinar aliquet est ut consequa
        </div>
        <Image src={LoginHero2} alt="" height={600} width={700} />
      </div>
      <div className="lg:w-5/12 bg-black h-screen flex items-center justify-center flex-col">
        <div className="bg-[#0e1734] rounded-md p-8 flex flex-col items-center justify-center gap-2">
          <Image src={Search} alt="" height={30} width={30} />
          <div className="text-2xl font-bold">Create Account</div>
          <div className="text-md text-gray-600">
            Already have an account?{" "}
            <span className="text-white">
              <Link href="/Signin">Sign In</Link>
            </span>
          </div>
          <div className="w-full bg-black rounded border border-gray-800 p-2 flex gap-3">
            <Image src={EnvelopeSimple} alt="" height={20} width={20} />
            <input
              className="w-full bg-black text-gray-600 focus:outline-none"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </div>
          <div className="w-full bg-black rounded border border-gray-800 p-2 flex gap-3">
            <Image src={Password} alt="" height={20} width={20} />
            <input
              className="w-full bg-black text-gray-600 focus:outline-none"
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="password"
            />
          </div>
          <div
            className="bg-white rounded-md text-center m-3 p-2 text-black w-full font-bold cursor-pointer"
            onClick={handleSignup}
          >
            Sign Up
          </div>
          <Image src={Break} alt="" height={10} width={300} />
          <div className="bg-white rounded-md text-center m-3 p-2 text-black w-full flex items-center gap-2 justify-center cursor-pointer">
            <Image src={Google2} alt="" height={20} width={20} />
            <div className="font-bold">Sign Up with Google</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
