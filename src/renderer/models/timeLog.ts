import { projectCodes } from "@/config/constants";
import { Resource } from "@/models/app";

export interface TimeLog {
  projectCode: typeof projectCodes
  logType: "start" | "end",
  timestamp: number
}

export type TimeLogState = Resource<TimeLog>

export const defaultTimeLogState: Resource<TimeLog> = {
  isLoading: false,
  keys: [],
  data: {}
}