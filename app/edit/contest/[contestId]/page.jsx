"use client";

import { use } from "react";
import ContestEditComponent from "@/components/ContestEditComponent/ContestEditComponent";

function EditContest({ params }) {
  const { contestId } = use(params);

  return (
    <div>
      <ContestEditComponent contestId={contestId} />
    </div>
  );
}

export default EditContest;
