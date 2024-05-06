"use client"
import Image from 'next/image';
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface TrustedProps {
  image: string[];
  label: string;
}

export const Trusted: React.FC<TrustedProps> = ({ image, label }) => {

  var settings = {
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true
        }
      }
    ]
  };

  return (
    <div className='py-[80px]'>
    <h2 className='text-[25px] text-center text-paragraph'>{label}</h2>
    <Slider className="custom-slick-slider" {...settings}>
      {image.map((logo, index) => (
        <div key={index} className="h-[130px] p-5">
          <div key={index} className='rounded-xl'>
            <Image
              className='m-auto h-[130px] object-contain object-center p-5'
              src={logo}
              alt={`Client ${index + 1}`}
              width={150 * 2}
              height={154 * 2}
            />
          </div>
        </div>
      ))}
    </Slider>
    </div>
  )
}
