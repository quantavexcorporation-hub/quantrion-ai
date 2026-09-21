import { redirect } from "next/navigation"

/** Legacy Settings path → LectureCognis */
export default function LegacyLectureForgeSettingsRedirect() {
  redirect("/lecture-cognis")
}
