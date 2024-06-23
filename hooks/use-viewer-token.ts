import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViwerToken } from "@/actions/token";

export const useViwerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViwerToken(hostIdentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode<JwtPayload & { name?: string }>(
          viewerToken
        );

        const name = decodedToken?.name;
        if (name) {
          setName(name);
        }

        // identity will be set as subject of the token
        // see: https://github.com/livekit/node-sdks/blob/livekit-server-sdk%402.4.0/packages/livekit-server-sdk/src/AccessToken.ts#L124
        const identity = decodedToken?.sub;
        if (identity) {
          setIdentity(identity);
        }
      } catch {
        toast.error("Something went wrong");
      }
    };

    createToken();
  }, [hostIdentity]);

  return {
    token,
    name,
    identity,
  };
};
