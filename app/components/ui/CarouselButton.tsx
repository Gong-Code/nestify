import React from "react";

type CarouselButtonProps = {
  nextBtn: () => void;
  prevBtn: () => void;
  nextBtnDisabled: boolean;
  prevBtnDisabled: boolean;
};

export const CarouselButton = ({
  nextBtn,
  prevBtn,
  nextBtnDisabled,
  prevBtnDisabled,
}: CarouselButtonProps) => {
  return (
    <div className="carousel-buttons">
      <button
        onClick={prevBtn}
        disabled={prevBtnDisabled}
        className="carousel-button prev-button"
      >
        Prev
      </button>
      <button
        onClick={nextBtn}
        disabled={nextBtnDisabled}
        className="carousel-button next-button"
      >
        Next
      </button>
    </div>
  );
};
