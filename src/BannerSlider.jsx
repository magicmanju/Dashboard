import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerSlider = ({ banners }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Slider {...settings}>
            {banners.map((banner) => (
                <div key={banner.id} className="banner-slide">
                    <center><h2 className='my-5'>{banner.text}</h2></center>
                    {banner.button && (
                        <button className='banner-button1'>
                            <a href={banner.link} className="banner-button">
                                {banner.btn_name}
                            </a>
                        </button>
                    )}
                </div>
            ))}
        </Slider>
    );
};

export default BannerSlider;
