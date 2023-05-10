import { AppleLogo, X } from "@phosphor-icons/react";
import { useState } from "react";

export default function Banner() {
  const [showBanner, setShowBanner] = useState<boolean>(true);
  if (!showBanner) return null;
  return (
    <div className="fixed hidden bottom-0 left-0 w-full h-32 lg:h-20 bg-[url('/init-modal-bg.png')] z-40 bg-cover md:flex justify-between items-center">
      <div className="w-full h-full bg-dark-400/50 absolute" />
      <div className="flex justify-evenly items-center flex-[2] flex-col lg:flex-row gap-2">
        <p className="z-50 text-light-500 text-center lg:text-left">
          Be sure to download the official Gymlink app to experience the full
          features and find nearby gym goers!
        </p>
        <a
          href="https://testflight.apple.com/join/NTM6DRrW"
          className="bg-light-500 text-dark-500 rounded-lg px-4 py-2 flex items-center z-50"
        >
          <AppleLogo color="#000" size={16} weight="fill" />
          <span className="ml-2 font-medium">Download</span>
        </a>
      </div>
      <button
        className="flex-[0.25] flex justify-end z-50 px-12"
        onClick={() => setShowBanner(false)}
      >
        <X className="text-light-500" size={20} />
      </button>
    </div>
  );
}
