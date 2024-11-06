import {Spinner} from "@nextui-org/spinner";
import {Pagination} from "@nextui-org/pagination";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";

import FormError from "../ui/form-error";

import DoctorCard from "./doctor-card";

import {getAllDoctors} from "@/react-query/queries";

type Props = Readonly<{
  onSelect: (doctorId: number) => void;
  selectedId: number | null;
}>;

function DoctorPaginatedGrid({selectedId, onSelect}: Props) {
  const [page, setPage] = useState(0);
  const availableDoctors = useQuery({...getAllDoctors(page, 8)});

  return (
      <div className="mt-4">
        <h3>Select Doctor For Your Case</h3>
        <p className="text-xs mt-2">You can change them later...</p>

        {availableDoctors.isLoading && <Spinner/>}
        {availableDoctors.isError && (
            <FormError message="Failed to fetch list of doctors"/>
        )}
        {availableDoctors.isSuccess && (
            <div
                className="grid mb-8 grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-1.5 relative pb-12 rounded-md">
              {availableDoctors.data.content.map((doctorProfile) => (
                  <DoctorCard
                      key={doctorProfile.doctor.id}
                      doctorProfile={doctorProfile}
                      isSelected={selectedId === doctorProfile.doctor.id}
                      onSelect={onSelect}
                  />
              ))}

              {availableDoctors.data.totalPages > 0 && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                    <Pagination
                        loop
                        showControls
                        classNames={{base: "text-textPrimary"}}
                        initialPage={page + 1}
                        total={availableDoctors.data.totalPages}
                        onChange={(page) => setPage(page - 1)}
                    />
                  </div>
              )}
            </div>
        )}
      </div>
  );
}

export default DoctorPaginatedGrid;
