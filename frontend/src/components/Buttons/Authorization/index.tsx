
interface Props {
  content: string,
  initialDisability: boolean,
  buttonIsDisabled: boolean
}
export default function AuthorizationButton(props: Props) {

  const {content,initialDisability, buttonIsDisabled} = props;
  return (
    <button
        type="submit"
        className="disabled:bg-purple-400 bg-purple-500 rounded-md py-[.5rem] text-xl"
        disabled={initialDisability || buttonIsDisabled}
      >
        {content}
      </button>
  )
}