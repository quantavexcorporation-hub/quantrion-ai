import { redirect } from "next/navigation"

/** Legacy Settings path — LectureCognis is its own sidebar section. */
export default function LegacySettingsLectureCognisRedirect() {
  redirect("/lecture-cognis")
}
