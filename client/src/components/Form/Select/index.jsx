import { Controller } from "react-hook-form"
import * as Sc from "./style"
import { motion } from "framer-motion"

export function Select({
  control,
  options,
  name
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({
        field: { onChange, ref, name, value }
      }) => {
        return (
          <Sc.Select
            as={motion.select}
            layout
            onChange={onChange}
            value={value}
            ref={ref}
            name={name}
          >
            <option value="" disabled >Escolha uma categoria</option>
            {
              options.map((option) => {
                return (
                  <option
                    key={option.id}
                    value={option.descricao}
                  >
                    {option.descricao}
                  </option>
                )
              })
            }
          </Sc.Select>
        )
      }}
    />
  )
}