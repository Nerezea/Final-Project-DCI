import { useEffect } from "react";

const Landing = () => {
  useEffect(() => {
    const sliderContainer = document.querySelector(".slider-container");
    const slides = document.querySelectorAll(".slide");
    const slidesLength = slides.length;

    let activeSlideIndex = 0;

    const moveToSlide = (swap) => {
      if (sliderContainer.classList.contains("slider-locked")) return;

      activeSlideIndex =
        (activeSlideIndex + swap + slidesLength) % slidesLength;

      sliderContainer.classList.add("slider-locked");

      slides.forEach((slide, index) => {
        slide.classList.toggle("scrolling_active", index === activeSlideIndex);
      });
    };

    const onTransitionEnd = () => {
      sliderContainer.classList.remove("slider-locked");
    };

    const onScroll = (event) => {
      event.preventDefault();
      const swap = Math.sign(event.deltaY);
      moveToSlide(swap);
    };

    document.addEventListener("wheel", onScroll);
    sliderContainer.addEventListener("transitionend", onTransitionEnd);

    return () => {
      document.removeEventListener("wheel", onScroll);
      sliderContainer.removeEventListener("transitionend", onTransitionEnd);
    };
  }, []);

  return (
    <div className="slider-container">
      <div className="slide slide0 scrolling_active">
        <div className="slide-part slide-left-part">
          <div className="slide-skew">
            <div className="slide-content content-left-part">
            </div>
          </div>
        </div>
        <div className="slide-part slide-right-part">
          <div className="slide-skew">
            <div className="slide-content content-right-part">
              <h3 className="slide-title">First slide</h3>
              <p className="slide-subtitle">Just scroll down</p>
            </div>
          </div>
        </div>
      </div>

      <div className="slide slide1">
        <div className="slide-part slide-left-part">
          <div className="slide-skew">
            <div className="slide-content content-left-part">
              <h3 className="slide-title">Second slide</h3>
              <p className="slide-subtitle">Continue scrolling</p>
            </div>
          </div>
        </div>
        <div className="slide-part slide-right-part">
          <div className="slide-skew">
            <div className="slide-content content-right-part"></div>
          </div>
        </div>
      </div>

      <div className="slide slide2">
        <div className="slide-part slide-left-part">
          <div className="slide-skew">
            <div className="slide-content content-left-part"></div>
          </div>
        </div>
        <div className="slide-part slide-right-part">
          <div className="slide-skew">
            <div className="slide-content content-right-part">
              <h3 className="slide-title">Third slide</h3>
              <p className="slide-subtitle">Keep scrolling down</p>
            </div>
          </div>
        </div>
      </div>

      <div className="slide slide3">
        <div className="slide-part slide-left-part">
          <div className="slide-skew">
            <div className="slide-content content-left-part">
              <h3 className="slide-title">Fourth slide</h3>
              <p className="slide-subtitle">Look what beautiful photos</p>
            </div>
          </div>
        </div>
        <div className="slide-part slide-right-part">
          <div className="slide-skew">
            <div className="slide-content content-right-part"></div>
          </div>
        </div>
      </div>

      <div className="slide slide4">
        <div className="slide-part slide-left-part">
          <div className="slide-skew">
            <div className="slide-content content-left-part"></div>
          </div>
        </div>
        <div className="slide-part slide-right-part">
          <div className="slide-skew">
            <div className="slide-content content-right-part">
              <h3 className="slide-title">Fifth slide</h3>
              <p className="slide-subtitle">We are getting close to the end</p>
            </div>
          </div>
        </div>
      </div>

      <div className="slide slide5">
        <div className="slide-part slide-left-part">
          <div className="slide-skew">
            <div className="slide-content content-left-part">
              <h3 className="slide-title">Sixth slide</h3>
              <p className="slide-subtitle">
                Last slide. But if you want, you can keep scrolling
              </p>
            </div>
          </div>
        </div>
        <div className="slide-part slide-right-part">
          <div className="slide-skew">
            <div className="slide-content content-right-part"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
