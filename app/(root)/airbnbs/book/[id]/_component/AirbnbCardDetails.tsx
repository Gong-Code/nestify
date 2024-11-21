"use client";

import React from "react";
import { Airbnb } from "@/app/types/airbnb";
import { EmblaOptionsType } from "embla-carousel";
import { Carousel } from "@/app/components/Carousel";
import { Navbar } from "@/app/(root)/_component/Navbar";
import Image from "next/image";
import { UserCircle } from "lucide-react";
import { BookingForm } from "./BookingForm";
import { AccessibilityIcons } from "@/app/components/AccessibilityIcons";

type AirbnbCardDetailsProps = {
  airbnb: Airbnb;
  maxGuests: number;
};

export const AirbnbCardDetails = ({ airbnb }: AirbnbCardDetailsProps) => {
  const imageSlides = airbnb.images.map((image, index) => ({
    src: image,
    alt: `${airbnb.title} - Slide ${index + 1}`,
  }));

  const emblaOptions: EmblaOptionsType = {
    loop: true,
    dragFree: true,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    align: "center",
  };

  return (
    <>
      {/* AirbnbCardDetails Mobile View */}
      <section className="md:hidden block mt-5 mx-auto w-screen max-w-[calc(100vw-50px)]">
        <Carousel slides={imageSlides} options={emblaOptions} />
        <div className="mt-4">
          <p className="title text-2xl font-semibold mb-6">{airbnb.title}</p>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[--color-primary] rounded-full flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-[--color-text-secondary]" />
            </div>
            <p className="text-lg">
              Hosted by <span className="font-bold">Jennie</span>
            </p>
          </div>
          <section className="bg-gray-200 p-4 rounded-lg mb-6 w-full">
            <h2 className="text-xl font-semibold mb-2">
              This accommodation offers:
            </h2>
            <AccessibilityIcons accessibility={airbnb.accessibility} />
          </section>
          <section className="rounded-lg mb-10 w-full">
            <h2 className="text-xl font-semibold mb-1">About this space</h2>
            <p className="mt-4">{airbnb.description}</p>
          </section>
        </div>
        <BookingForm
          airbnbId={airbnb.airbnbId}
          pricePerNight={airbnb.pricePerNight}
        />
      </section>
      <header className="hidden md:block">
        <Navbar />
      </header>

      {/* AirbnbCardDetails Desktop View */}
      <section className="mt-6 hidden md:grid mx-auto md:mb-4 gap-2 md:grid-cols-3 md:w-[56.25rem]">
        <div className="h-[25rem] col-span-2">
          <Image
            src={airbnb.images[0]}
            width={1000}
            height={1000}
            alt={airbnb.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {airbnb.images.slice(1, 5).map((image, index) => (
            <div key={index} className="h-[12rem]">
              <Image
                src={image}
                width={500}
                height={500}
                alt={`${airbnb.title} - Small Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </section>
      <main className="hidden md:flex flex-col gap-4 px-4 md:px-0 py-4 md:mx-auto md:w-[56.25rem]">
        <section className="md:grid md:grid-cols-4 gap-[5rem]">
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <p className="title text-2xl font-semibold mb-6">
                {airbnb.title}
              </p>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[--color-primary] rounded-full flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-[--color-text-secondary]" />
                </div>
                <p className="text-lg">
                  Hosted by <span className="font-bold">Jennie</span>
                </p>
              </div>
              <section className="bg-gray-200 p-6 p rounded-lg mb-20 w-full">
                <h2 className="text-xl font-semibold mb-2">
                  This accommodation offers:
                </h2>
                <AccessibilityIcons accessibility={airbnb.accessibility} />
              </section>
              <section className="bg-gray-100 rounded-lg w-full">
                <h2 className="text-xl font-semibold mb-1">About this space</h2>
                <p className="mt-4">{airbnb.description}</p>
              </section>
            </div>
          </div>
          <div className="hidden md:block w-full md:w-fit">
            <BookingForm
              airbnbId={airbnb.airbnbId}
              pricePerNight={airbnb.pricePerNight}
            />
          </div>
        </section>
      </main>
    </>
  );
};
