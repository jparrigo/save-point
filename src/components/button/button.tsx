
interface ButtonProps {
  text: string
  onPress?: () => void
  variant: "default" | "black" | "stroke" | "google"
}


export function Button(props: ButtonProps) {
  if (props.variant == "google") {
    return (
      <div
        onClick={props.onPress}
        className="hover:text-white hover:drop-shadow-md hover:drop-shadow-[#141414] flex items-center justify-center px-4 py-1 bg-[#141414] rounded-lg font-light text-sm text-center text-[#D9D9D9] cursor-pointer shadow-[var(--shadow-button)]"
      >
        <img src="./google-logo.png" alt="Google Logo"/>
        {props.text}
      </div>
    )
  }

  return (
    <div
      onClick={props.onPress}
      className="hover:text-white hover:drop-shadow-md hover:drop-shadow-[#3B2545] px-4 py-3 bg-[#3B2545] rounded-lg font-light text-sm text-center text-[#D9D9D9] cursor-pointer shadow-[var(--shadow-button)]"
    >
      {props.text}
    </div>
  )
}