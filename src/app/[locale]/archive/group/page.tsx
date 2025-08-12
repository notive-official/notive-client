"use client";

import GroupList from "@/components/archive/GroupList";

export default function GroupPage() {
  return (
    <div className="relative h-full w-full flex flex-row justify-start mx-auto overflow-y-auto p-8">
      <section className="flex flex-row justify-between items-start h-full w-full max-w-7xl">
        <div className="flex flex-col py-8 gap-20 w-full pb-32">
          <GroupList />
        </div>
      </section>
      <section className="flex flex-col gap-4"></section>
    </div>
  );
}
