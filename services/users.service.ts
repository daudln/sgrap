import { UserData } from "@/types/user";
import APIClient from "./api.service";

const userClient = new APIClient<UserData>("/api/users");

export default userClient;
