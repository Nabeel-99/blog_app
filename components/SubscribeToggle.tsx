"use client";

import React, { useState, useTransition } from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

import axios from "axios";
import { toast } from "sonner";

type Props = {
  isSubscribed?: boolean;
};
const SubscribeToggle = ({ isSubscribed }: Props) => {
  const [subscribed, setSubscribed] = useState(isSubscribed || false);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    setSubscribed(!subscribed);
    startTransition(async () => {
      try {
        await axios.put("/api/subscribe", { hasSubscribed: !subscribed });
        toast.success(
          !subscribed ? "Subscribed successfully" : "Unsubscribed successfully"
        );
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        setSubscribed(subscribed);
      }
    });
  };
  return (
    <div className="flex items-center gap-2">
      <Switch
        id="subscribe"
        checked={subscribed}
        onCheckedChange={handleToggle}
        disabled={isPending}
      />
      <Label htmlFor="subscribe" className="">
        Subscribe
      </Label>
    </div>
  );
};

export default SubscribeToggle;
