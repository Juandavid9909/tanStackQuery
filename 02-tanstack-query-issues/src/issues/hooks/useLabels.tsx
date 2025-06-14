import { useQuery } from "@tanstack/react-query";

import { getLabels } from "../actions";
import { GithubLabel } from "../interfaces";

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60,
    // placeholderData: [
    //   {
    //     id: 69105383,
    //     node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
    //     url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
    //     name: "Browser: IE",
    //     color: "c7def8",
    //     default: false,
    //   } satisfies GithubLabel,
    //   {
    //     id: 139653724,
    //     node_id: "MDU6TGFiZWwxMzk2NTM3MjQ=",
    //     url: "https://api.github.com/repos/facebook/react/labels/Component:%20Core%20Utilities",
    //     name: "Component: Core Utilities",
    //     color: "c5def5",
    //     default: false,
    //   },
    // ],
    // initialData: [
    //     {
    //         id: 69105383,
    //         node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
    //         url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
    //         name: "Browser: IE",
    //         color: "c7def8",
    //         default: false,
    //     } satisfies GithubLabel,
    //     {
    //     id: 139653724,
    //     node_id: "MDU6TGFiZWwxMzk2NTM3MjQ=",
    //     url: "https://api.github.com/repos/facebook/react/labels/Component:%20Core%20Utilities",
    //     name: "Component: Core Utilities",
    //     color: "c5def5",
    //     default: false,
    //     },
    // ],
  });

  return {
    labelsQuery,
  };
};
