"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { CopyButton } from "./copy-button";

interface KeyCardProps {
  value: string | null;
}

export const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);
  const ShowHideIcon = show ? <EyeOff /> : <Eye />;

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex flex-col gap-y-3 lg:flex-row lg:items-center lg:gap-x-10">
        <p className="font-semibold shrink-0">Server Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              type={show ? "text" : "password"}
              disabled
              placeholder="Server Key"
            />
            <CopyButton value={value || ""} />
            <Button onClick={() => setShow(!show)} size="sm" variant="link">
              {ShowHideIcon}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
