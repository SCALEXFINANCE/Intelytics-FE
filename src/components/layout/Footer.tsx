import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { Chrome, File, TwitchIcon, Twitter, XIcon } from "lucide-react";
const div = () => {
  return (

    <div className="bg-darkblue text-whitetext-start lg:p-4 p-2">
      
      <div className="flex">
        
        <div className="flex flex-col gap-4 w-full">
          
          <div className="text-lg font-bold">🌐Intelytics</div>
          {/* <div>
            
            <p className="text-sm"> GET STARTED TO GROW & TRADE IN THE </p>
            <p className="text-sm"> BEST MARKETPLACE ON INJECTIVE. </p>
          </div> */}
        
        </div>
        <div className="flex justify-end items-center w-full">
        <div className="flex space-x-2">
            
            <Chrome /> <Twitter /> <File />
          </div>
          {/* <Button className="border border-bordercolor shadow-sm shadow-white">
            Connect Wallet
          </Button> */}
        </div>
      </div>
      <div className="mt-6 border-t border-white/20 pt-4">
        
        <div className="flex justify-end gap-6 mt-2">
          
          <div>
            
            <p className="text-xs">© 2024 INTELYTICS INC.</p>
          </div>
          <a href="/terms-of-service" className="text-xs hover:underline">
            
            TERMS OF SERVICE
          </a>
          <a href="/privacy-policy" className="text-xs hover:underline">
            
            PRIVACY POLICY
          </a>
          <a href="/cookies" className="text-xs hover:underline">
            
            COOKIES
          </a>
        </div>
      </div>
    </div>
  );
};
export default div;
