interface Props {
  isUserAccount: boolean;
  img: string;
  userName: string;
  fullNameOrFollowers: string;
}
export default function AccountItem(props: Props) {
  const { userName, img, fullNameOrFollowers, isUserAccount } = props;
  return (
    <div className="flex items-center justify-between cursor-pointer">
      <div className="flex items-center gap-[1rem]">
        <div className="w-[4rem] h-[4rem] overflow-hidden rounded-full">
          <img
            className="w-full h-full object-cover"
            src={img}
            alt="Avatar"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-xl">{userName}</span>
          <span className={`text-gray-300 ${isUserAccount ? 'text-xl' : 'text-lg'} font-light`}>{fullNameOrFollowers}</span>
        </div>
      </div>
      <p className="text-sky-400 font-medium text-lg">{isUserAccount ? "Log Out" : "Follow"}</p>
    </div>
  );
}
