import * as Sc from "./style"
import { useState } from "react"
import { Controller } from "react-hook-form"
import { Label } from "../../../global/styles/Label"
import eyeClosed from "../../../assets/images/eye-password-hide-svgrepo-com.svg"
import eyeOpened from "../../../assets/images/eye-view-interface-symbol-svgrepo-com.svg"

export function Input({
  label,
  labelSize,
  labelColor,
  labelWeight,
  name,
  placeholder,
  control,
  type,
  className,
}) {
  const [isEyeOpened, setIsEyeOpened] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value, ref, name } }) => {
        return (
          <Label
            labelColor={labelColor}
            labelSize={labelSize}
            labelWeight={labelWeight}
          >
            {label}
            <Sc.StyledInput
              type={
                type === "password" ? (isEyeOpened ? "text" : "password") : type
              }
              className={className}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              ref={ref}
              name={name}
            />
            {type === "password" && (
              <Sc.EyeIcon
                onClick={() => setIsEyeOpened((prev) => !prev)}
                src={isEyeOpened ? eyeOpened : eyeClosed}
                alt={isEyeOpened ? "Olho aberto" : "Olho fechado"}
              />
            )}
          </Label>
        )
      }}
    />
  )
}
