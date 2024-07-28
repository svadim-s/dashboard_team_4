import { RootState } from "../store/store";

export const firstUserSkillsSelector = ((state: RootState) => state.userSkills.firstUserSkills)
export const secondUserSkillsSelector = ((state: RootState) => state.userSkills.secondUserSkills)
