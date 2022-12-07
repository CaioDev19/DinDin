import ReactLoading from "react-loading"
import * as Sc from "./style"

export function Loading({
  type,
  color,
  size,
  spacer,
  width
}) {
  return (
    <Sc.Container
      spacer={spacer}
      width={width}
    >
      <ReactLoading
        type={type}
        color={color}
        width={size}
      />
    </Sc.Container>
  )
}