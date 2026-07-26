import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight } from "react-icons/fa";
import styles from "../styles/TrainCarousel.module.css";

// Dummy data for the carousel
const recentSearchData = [
{
    from:  {code: "NDLS", name: "New Delhi"},
    to: {code: "LKO", name: "Lucknow"},
    date: "Sat 27 Jun 2026",
    classType: "All Classes",
},
{
    from:  {code: "NDLS", name: "New Delhi"},
    to: {code: "LKO", name: "Lucknow"},
    date: "Sat 28 Jun 2026",
    classType: "All Classes",
},
{
    from:  {code: "NDLS", name: "New Delhi"},
    to: {code: "LKO", name: "Lucknow"},
    date: "Sat 29 Jun 2026",
    classType: "Sleeper",
}];


const TrainCarousel = () => {
  // check if on mobile or desktop
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Settings for the slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: true,
    centerPadding: '10px',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '30px',
        }
      }
    ]
  };

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.heading}>Recent Searches</h2>
      <Slider {...settings} className={styles.carousel}>
        {recentSearchData.map((search, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.trainRoute}>
              <span className={styles.stationCode}>{search.from.code}</span>
              <span className={styles.arrow}><FaArrowRight /></span>
              <span className={styles.stationCode}>{search.to.code}</span>
            </div>
            <div className={styles.stationNames}>
              <span>{search.from.name}</span>
              <span>{search.to.name}</span>
            </div>
            <div className={styles.tripDetails}>
              <span className={styles.date}>{search.date}</span>
              <span className={styles.classType}>{search.classType}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrainCarousel;