import { Subject } from "@prisma/client";
import APIClient from "./api.service";

const subjectClient = new APIClient<Subject>("/api/subjects");

export default subjectClient;
