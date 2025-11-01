import {Skeleton} from "@/components/ui/skeleton";

function loading() {
  return (
    <div className="p-8 grid md:grid-cols-3 sm:grid-cols-2 gap-4 rounded-lg">
      <Skeleton className="h-10 border" />
      <Skeleton className="h-10 border" />
      <Skeleton className="h-10 border" />
    </div>
  );
}
export default loading;
