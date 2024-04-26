import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";

const Social = () => {
  return (
    <div className="flex items-center justify-between w-full gap-4">
      <Button variant="outline" className="w-full" onClick={() => {}}>
        <FcGoogle className="mr-2 h-5 w-5" />
        Google
      </Button>
      <Button variant="outline" className="w-full" onClick={() => {}}>
        <RxGithubLogo className="mr-2 h-5 w-5" />
        Github
      </Button>
    </div>
  );
};

export default Social;
