import { useAuth } from "@/contexts/AuthContext";
import { useListGroupDetailsQuery } from "@/hooks/api/archive/group";
import GroupCard from "../common/GroupCard";

export default function GroupList() {
  const { isAuthenticated } = useAuth();
  const page = 0;
  const { isLoading, data } = useListGroupDetailsQuery(
    { page },
    {
      enabled: isAuthenticated,
      staleTime: 0,
    }
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 h-full w-full gap-4 justify-items-center">
      {data?.content.map((group) => {
        return (
          <GroupCard
            key={group.id}
            thumbnails={group.thumbnails}
            name={group.name}
            totalElements={group.totalElements}
          />
        );
      })}
    </div>
  );
}
