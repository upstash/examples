"use client";

import { Switch } from "@/components/ui/switch";
import { useContext } from "react";
import UserStateContext from "./context/UserStateContext";

const EmailSwitch = () => {
  const { recieveEmails, setRecieveEmails } = useContext(UserStateContext);

  return (
    <>
      <div className="grid grid-flow-col auto-cols-min items-center justify-items-center  mr-6 gap-1">
        <label htmlFor="recieve-emails" className="text-sm text-center">
          Recieve Emails
        </label>
        <Switch
          id="recieve-emails"
          checked={recieveEmails}
          onCheckedChange={(checked: boolean) => {
            setRecieveEmails(checked);
          }}
        />
      </div>
    </>
  );
};

export default EmailSwitch;
