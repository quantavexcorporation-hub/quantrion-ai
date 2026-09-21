import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type AuthFormFieldProps = {
  id: string
  label: string
  error?: string
  type?: string
  autoComplete?: string
  registration?: object
  labelExtra?: React.ReactNode
}

export function AuthFormField({
  id,
  label,
  error,
  type = "text",
  autoComplete,
  registration,
  labelExtra,
}: AuthFormFieldProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {labelExtra}
      </div>
      <Input id={id} type={type} autoComplete={autoComplete} {...(registration as object)} />
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  )
}
