import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useMint from "@/hooks/useMint";

function Mint() {
  const [value, setValue] = React.useState("");

  const { mint } = useMint();

  return (
    <>
      <div className="flex w-full max-w-lg flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Mint Token</CardTitle>
            <CardDescription className="text-md text-center font-bold">
              Mint some token for testing purpose
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-name" className="text-md font-bold">
                Amount of token to mint
              </Label>
              <Input
                id="tabs-demo-name"
                placeholder="Enter token amount"
                className="h-10 py-6"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button
              onClick={() => {
                mint(value);
                setValue("");
              }}
              className="w-full h-12 bg-purple-600 text-white text-lg font-bold hover:bg-purple-700"
            >
              Mint Token
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default Mint;
