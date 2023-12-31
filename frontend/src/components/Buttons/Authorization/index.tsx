
interface Props {
  content: string,
  initialDisability: boolean,
  buttonIsDisabled: boolean
  type: "button" | "submit";
  onClick?: () => void;
}
export default function AuthorizationButton(props: Props) {

  const {content,initialDisability, buttonIsDisabled, type, onClick} = props;
  return (
    <button
        type={type}
        className="disabled:bg-purple-400 bg-purple-500 rounded-lg py-[.5rem] text-xl w-full"
        disabled={initialDisability || buttonIsDisabled}
        onClick={() => onClick ? onClick() :""}
      >
        {content}
      </button>
  )
}