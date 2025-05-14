"use client";
import { DataTable } from "@/components/CommonTable";
import { RentalsDataCol } from "./rentals.constant";
import { useRouter } from "next/navigation";
import { createRentalData, fetchRentalData } from "./rentals.api";
import { useAxios } from "@/services/axios/axios.hook";
import { useState } from "react";
import { CreateRentalForm } from "./partials/create-rental";
import { CreateRentalDto } from "./rentals.schema";
import { toast } from "react-toastify";

export default function Rentals() {
  const router = useRouter();
  const { axios } = useAxios();
  const [createRentalDialogOPen, setCreateRentalDialogOPen] = useState(false);

  function CreateRentalComponent({
    refetch: refectRentalData,
  }: {
    refetch: any;
  }) {
    async function createRental(data: CreateRentalDto) {
      try {
        const res = await createRentalData(axios, data);
        if (res) toast.success("Rental created Successfully");
      } catch (error: any) {
        toast.error("something went wrong" + error.message);
      } finally {
        setCreateRentalDialogOPen(false);
        refectRentalData();
      }
    }
    return (
      <CreateRentalForm
        title="Create Rental"
        submitLabel="Create"
        onSubmit={createRental}
      />
    );
  }
  return (
    <DataTable
      title="Rentals"
      fetcher={async (page: number, pageSize: number, searchQuery: string) => {
        return await fetchRentalData(axios, page, pageSize, searchQuery);
      }}
      queryKey={["Rentals"]}
      getColumns={RentalsDataCol}
      CreateEntryComponent={CreateRentalComponent}
      createEntryDialogOpen={createRentalDialogOPen}
      setCreateEntryDialogOpen={setCreateRentalDialogOPen}
    />
  );
}
