import { atom } from "recoil";

export default atom<number | null>({
    key: "editMode",
    default: null
})

