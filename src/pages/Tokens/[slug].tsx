import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { contents } from "./content";
import axios from "axios";
export default function tokenName() {
  const router = useRouter();
  const slug = String(router.query.slug).toLowerCase();

  const [volume, setVolume] = useState();

  useEffect(() => {
    if (contents[slug]) {
      console.log("from effect", contents[slug].name);
    }
  }, [slug]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {

  //         const apiUrl = await axios.get(`${contents[slug].apiUrl}`);
  //         const liquidityData = apiUrl.data;
  //         const volume = liquidityData.pairs[0].volume;
  //         setVolume(volume);
  //         const price = liquidityData.pairs[0].priceUsd;
  //         console.log(price);
  //         console.log("useeffect called");

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();

  //   const interval = setInterval(() => {
  //     fetchData();
  //   }, 30000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [ ]);

  return (
    <>
      {contents[slug] && (
        <>
          <div className="text-white">
            <h1>{contents[slug].name}</h1>
            <h1>{contents[slug].category}</h1>
            <p>{volume}</p>
          </div>
        </>
      )}

      {!contents[slug] && <>ERROR 404</>}
    </>
  );
}
