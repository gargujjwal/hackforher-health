import { Pagination } from "@heroui/pagination";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import ShowDoctorCard from "../card/doctor-show-card";

import { MedicalCaseResponseDto } from "@/types/backend-stubs";

type Props = {
  doctorAssignments: MedicalCaseResponseDto["doctorAssignments"];
};

function DoctorAssignmentCarousel({ doctorAssignments }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  function updateCurrentSlide(idx: number) {
    if (currentSlide !== idx) {
      setCurrentSlide(idx);
    }
  }

  return (
    <div className="max-w-[29rem] space-y-1">
      <Carousel
        autoPlay
        emulateTouch
        infiniteLoop
        swipeable
        selectedItem={currentSlide}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        onChange={updateCurrentSlide}
      >
        {doctorAssignments.map(da => (
          <ShowDoctorCard key={da.id} doctorAssignment={da} />
        ))}
      </Carousel>
      <Pagination
        showControls
        className="flex justify-center text-textPrimary"
        color="primary"
        page={currentSlide + 1}
        total={doctorAssignments.length}
        onChange={slide => updateCurrentSlide(slide - 1)}
      />
    </div>
  );
}

export default DoctorAssignmentCarousel;
