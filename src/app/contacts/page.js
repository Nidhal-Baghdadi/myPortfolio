
"use client"
import Globe from "@/components/models/Globe"
import Avatar from "@/components/models/Avatar"
import ContactsMenu from "@/components/models/ContactsMenu"
import Banner from "@/components/models/Banner"
import Experience from "@/components/models/Experience"
import Projects from "@/components/models/Projects"
import EduCertif from "@/components/models/EduCertif"
import { useScene } from "@/context/sceneContext";

import { useState, useRef } from "react"

import dynamic from "next/dynamic";
import font from "@public/fonts/gt.json";


const RenderModel = dynamic(() => import("@/components/RenderModel"), { ssr: false })


export default function Home() {

  const message = "Home page"
  const caracter = "Astronaut_BarbaraTheBee"
  const [globeClicked, setGlobeClicked] = useState(false);
  const { scene, setScene } = useScene();



  const handleOnClick = (data) => {
    setGlobeClicked(data);

  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between relative bg-gradient-to-tl from-[#0a010f] to-[#213d5f]">
      <div className="w-full h-screen">
        {scene == 0 ? (
          <>
            <RenderModel>
              <ContactsMenu globeClicked={globeClicked} />
              <Banner
                text={"Click objects..."}
                color={"white"}
                position={[0, 0.5, 0]}
                font={font}
                scale={0.09} />
              <Globe onData={handleOnClick} />
              <Avatar message={message} caracter={caracter} />

            </RenderModel>
          </>


        ) : (scene == 1 ? <Experience /> : (scene == 2 ? <EduCertif /> : <Projects />))}

      </div>

    </main>
  );
}
