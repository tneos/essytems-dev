import {Button} from "./ui/button";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteEmployeeAction} from "@/utils/actions";
import {useToast} from "./ui/use-toast";

function DeleteEmployeeBtn({id}: {id: string}) {
  const {toast} = useToast();
  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation({
    mutationFn: (id: string) => deleteEmployeeAction(id),
    onSuccess: data => {
      if (!data) {
        toast({
          description: "there was an error",
        });
        return;
      }
      queryClient.invalidateQueries({queryKey: ["employees"]});
      queryClient.invalidateQueries({queryKey: ["stats"]});
      queryClient.invalidateQueries({queryKey: ["charts"]});
    },
  });
  return (
    <Button
      size="sm"
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}
    >
      {isPending ? "deleting..." : "delete"}
    </Button>
  );
}
export default DeleteEmployeeBtn;
