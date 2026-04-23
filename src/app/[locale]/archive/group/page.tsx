"use client";

import GroupCard from "@/components/archive/GroupCard";
import InfiniteScroll from "@/components/common/InfiniteScroll";
import { useAuth } from "@/contexts/AuthContext";
import { ListGroupDetails, useListGroupDetailsQuery } from "@/hooks/api/archive/group";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useRef } from "react";

export default function GroupPage() {
  useRequireAuth();
  const { isAuthenticated } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const result = useListGroupDetailsQuery({ url: ListGroupDetails.url(), key: ListGroupDetails.key(), options: { enabled: isAuthenticated, staleTime: 0 } });

  return (
    <div ref={scrollRef} className="h-full w-full p-5 md:p-8 overflow-y-auto">
      <div className="flex flex-col gap-6 max-w-5xl">
        <h1 className="text-xl font-semibold text-foreground">Group</h1>
        <InfiniteScroll result={result} root={scrollRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(g) => <GroupCard key={g.id} id={g.id} thumbnails={g.thumbnails} name={g.name} totalElements={g.totalElements} />}
        </InfiniteScroll>
      </div>
    </div>
  );
}
