import APIClient from "./api.service";
import { ProfileData } from "@/types/profile";

const profileClient = new APIClient<ProfileData>("/api/profiles");

export default profileClient;
