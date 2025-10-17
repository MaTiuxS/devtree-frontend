import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidURL } from "../utils";
import { toast } from "sonner";
import { updateProfile } from "../api/DevTreeAPI";
import type { SocialNetwork, TUser } from "../types";

const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryclient = useQueryClient();
  const user: TUser = queryclient.getQueryData(["user"])!;

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Actualizado correctamente");
    },
  });

  useEffect(() => {
    const updatedData = devTreeLinks.map((item) => {
      const userLink = JSON.parse(user.links).find(
        (link: SocialNetwork) => link.name === item.name
      );
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });

    setDevTreeLinks(updatedData);
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );

    setDevTreeLinks(updatedLinks);
  };

  const links: SocialNetwork[] = JSON.parse(user.links);

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidURL(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("URL no válida");
        }
      }
      return link;
    });

    setDevTreeLinks(updatedLinks);

    let updatedItems: SocialNetwork[] = [];

    const selectSocialNetwork = updatedLinks.find(
      (link) => link.name === socialNetwork
    );

    if (selectSocialNetwork?.enabled) {
      const id = links.filter((link) => link.id).length + 1;
      if (links.some((link) => link.name === socialNetwork)) {
        updatedItems = links.map((link) => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id,
            };
          } else {
            return link;
          }
        });
      } else {
        const newItem = {
          ...selectSocialNetwork,
          id,
        };
        updatedItems = [...links, newItem];
      }
    } else {
      const indexToUpdated = links.findIndex(
        (link) => link.name === socialNetwork
      );
      updatedItems = links.map((link) => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled: false,
          };
        } else if (
          link.id > indexToUpdated &&
          indexToUpdated !== 0 &&
          link.id === 1
        ) {
          return {
            ...link,
            id: link.id - 1,
          };
        } else {
          return link;
        }
      });
    }

    // Store in the database
    queryclient.setQueryData(["user"], (prevData: TUser) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems),
      };
    });
  };
  return (
    <>
      <div className="space-y-5">
        {devTreeLinks.map((item) => (
          <DevTreeInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnableLink={handleEnableLink}
          />
        ))}
        <button
          className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold cursor-pointer hover:text-slate-700"
          onClick={() => mutate(queryclient.getQueryData(["user"])!)}
        >
          Guardar Cambios
        </button>
      </div>
    </>
  );
};

export default LinkTreeView;
