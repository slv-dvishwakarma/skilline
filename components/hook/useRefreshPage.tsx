import { useRouter } from "next/navigation";

export const useRefreshPage = () => {
  const route = useRouter();
  const refreshPage = () => {
    route.refresh();
  };

  return { refreshPage };
};
