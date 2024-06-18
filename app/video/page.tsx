"use client";
import Videourlinput from "@/components/Inputfields/Videoinputfield";
import { useGetBasicInfo } from "@/hooks/useGetBasicInfo";
import { useEffect, useState } from "react";

export default function Video() {
  const { loading, apiResponse } = useGetBasicInfo();
  return (
    <main className="container">
      <span className="flex justify-center">
        <Videourlinput buttonText="Go" />
      </span>
    </main>
  );
}
