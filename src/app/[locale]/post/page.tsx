"use client";

import { useState } from "react";
import TextEditor from "@/app/[locale]/post/TextEditor";

export default function CreatePage() {
  return (
    <div className="h-full flex flex-col mx-auto">
      <TextEditor />
    </div>
  );
}
