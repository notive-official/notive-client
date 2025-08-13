"use client";

import GroupCard from "@/components/archive/GroupCard";
import InfiniteScroll from "@/components/common/InfiniteScroll";
import { useAuth } from "@/contexts/AuthContext";
import { useListGroupDetailsQuery } from "@/hooks/api/archive/group";
import { useRef } from "react";

export default function GroupPage() {
  const { isAuthenticated } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const result = useListGroupDetailsQuery(
    {},
    {
      enabled: isAuthenticated,
      staleTime: 0,
    }
  );
  return (
    <div
      ref={scrollRef}
      className="relative h-full w-full flex flex-row justify-start mx-auto overflow-y-auto p-8"
    >
      <section className="flex flex-row justify-between items-start h-full w-full max-w-7xl">
        <div className="flex flex-col py-8 gap-20 w-full">
          <InfiniteScroll
            result={result}
            root={scrollRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 h-full w-full gap-4 justify-items-center"
          >
            {(group) => (
              <div className="flex justify-center w-full" key={group.id}>
                <GroupCard
                  key={group.id}
                  thumbnails={group.thumbnails}
                  name={group.name}
                  totalElements={group.totalElements}
                />
              </div>
            )}
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
}
