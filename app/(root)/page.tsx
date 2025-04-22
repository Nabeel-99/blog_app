import { Button } from "@/components/ui/button";
import React from "react";

const Page = () => {
  return (
    <>
      {/* featured post section */}
      <section>
        <div className="lg:px-20 bg-btn p-4 lg:p-26 overflow-hidden relative border text-white flex flex-col lg:flex-row gap-10 lg:justify-between">
          <div className="absolute max-sm:hidden -top-24 left-0">
            <img
              src={"/mark.svg"}
              alt="Spirals"
              className="w-full -z-10 opacity-5 "
            />
          </div>
          <div className="absolute max-sm:hidden -bottom-20 -z-0 -right-20">
            <img
              src={"/mark.svg"}
              alt="Spirals"
              className="w-full -z-10 opacity-5 "
            />
          </div>
          <div className="flex flex-col lg:w-1/2 xl:w-xl  gap-10">
            <h1 className="text-xl mt-10 ">Featured Post</h1>
            <p className="text-3xl lg:text-5xl lg:leading-14 lg:mt-10 font-bold">
              How AI Will <br /> Change the Future
            </p>
            <p className="text-lg">
              The future of AI will see home robots having enhanced
              intelligence, increased capabilities, and becoming more personal
              and possibly cute. For example, home robots will overcome
              navigation, direction
            </p>
            <Button className="bg-white py-6 w-32 text-black">Read More</Button>
          </div>
          <div className=" max-sm:h-[350px] max-sm:max-h-[400px] lg:my-auto xl:h-[576px] z-10 xl:w-[608px] rounded-2xl overflow-hidden">
            <img
              src={
                "https://www.consultantsreview.com/newstransfer/upload/289jpXiaomi-VR.jpg"
              }
              alt=""
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </section>
      {/* random post section */}
      <section>
        <div className="lg:px-20  pt-30 ">
          <div className="relative">
            <img
              src={
                "https://www.consultantsreview.com/newstransfer/upload/289jpXiaomi-VR.jpg"
              }
              alt="vr"
              className="w-full h-[600px] object-cover rounded-2xl"
            />
            <div className="absolute -bottom-32 right-0">
              <div className="border border-[#dadada] shadow-sm bg-white max-w-4xl rounded-xl p-6 flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <p className="uppercase font-bold">Development</p>
                  <span>16 March 2023</span>
                </div>
                <p className="text-3xl font-bold">
                  How to make a Game look more attractive with New VR & AI
                  Technology
                </p>
                <p className="text-lg">
                  Google has been investing in AI for many years and bringing
                  its benefits to individuals, businesses and communities.
                  Whether it’s publishing state-of-the-art research, building
                  helpful products or developing tools and resources that enable
                  others, we’re committed to making AI accessible to everyone.
                </p>
                <Button className="bg-btn mt-10 py-6 w-32 text-white">
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Recent Posts */}
      <section>
        <div className="lg:px-20 mt-50">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">Our Recent Post</p>
            <Button className="bg-btn py-6 w-32 text-white">View All</Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
