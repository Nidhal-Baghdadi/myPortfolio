
"use client"
import Globe from "@/components/models/Globe"
import Avatar from "@/components/models/Avatar"
import NavigationMenu from "@/components/models/NavigationMenu"
import Banner from "@/components/models/Banner"
import Experience from "@/components/models/Experience"
import Projects from "@/components/models/Projects"
import EduCertif from "@/components/models/EduCertif"
import IntroBanner from "@/components/models/IntroBanner"
import { useScene } from "@/context/sceneContext";

import { useState, useRef } from "react"

import dynamic from "next/dynamic";
import font from "@public/fonts/gt.json";


const RenderModel = dynamic(() => import("@/components/RenderModel"), { ssr: false })


export default function Home() {

  const message = "Contacts"
  const caracter = "Astronaut_RaeTheRedPanda"
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
            <RenderModel   >
              <NavigationMenu globeClicked={globeClicked} />
              <Banner
                text={"Click me..."}
                color={"white"}
                position={[0, 0.5, 0]}
                font={font}
                scale={0.09} />
              <Globe onData={handleOnClick} />
              <Avatar message={message} caracter={caracter} />

            </RenderModel>
            <div className="absolute h-2/6 w-2/6 bottom-20 left-0 p-0 m-0" >
              <IntroBanner />

            </div>
          </>


        ) : (scene == 1 ? <Experience /> : (scene == 2 ? <EduCertif /> : <Projects />))}

      </div>

    </main>
  );
}
