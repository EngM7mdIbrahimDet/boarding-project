import randNum from "./random-number";

export default function randAvat(){
    return `/avatar-${randNum(1, 6)}.png`
}