import * as Sc from "./style"
import * as Typography from "../../global/styles/Typography"
import userImage from "../../assets/images/userImage.svg"
import logOutImage from "../../assets/images/logOutImage.svg"
import { useState } from "react"
import { ProfileModal } from "../Modals/Profile"
import { AnimatePresence } from "framer-motion"

export function Header({ userName, handleSignOut }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Sc.Banner>
        <Sc.WrapperUserInfo>
          <Sc.UserImage
            src={userImage}
            onClick={() => setIsOpen(true)}
          />
          <Typography.Text
            as="span"
            size="small"
            color="white"
          >
            {userName}
          </Typography.Text>
          <Sc.LogOutImage
            src={logOutImage}
            onClick={handleSignOut}
          />
        </Sc.WrapperUserInfo>
      </Sc.Banner>
      <AnimatePresence>
        {isOpen &&
          <ProfileModal
            closeModal={() => setIsOpen(false)}
          />
        }
      </AnimatePresence>
    </>
  )
}