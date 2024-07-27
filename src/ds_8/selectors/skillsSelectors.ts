import { RootState } from "../store/store";

export const skillsFrameworkSelector = ((state: RootState) => state.skills.frameworkData)
export const skillsDevEnvSelector = ((state: RootState) => state.skills.devEnvData)
export const skillsToolsSelector = ((state: RootState) => state.skills.toolsData)

