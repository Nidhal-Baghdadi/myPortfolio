import RenderModel from "@/components/RenderModel"

import ContactsMenu from "@/components/models/ContactsMenu"

export default async function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-gradient-to-b from-[#0a010f] to-[#213d5f]">
      <div className="w-full h-screen">
        <RenderModel >

          <ContactsMenu />
        </RenderModel>
      </div>
    </main>
  );
}
