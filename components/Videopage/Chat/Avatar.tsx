import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
interface Avatarchat {
  url: string | undefined;
  name: string | undefined | null;
}
const Avatarchat = ({ url, name }: Avatarchat) => {
  return (
    <Avatar className="size-6">
      <AvatarImage src={url} alt={name || ""} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
};

export default Avatarchat;
