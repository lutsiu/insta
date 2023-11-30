import Form from "./Form";

export default function RestorePasswordStep2() {
  return (
    <div className="w-full sm:w-[35rem] sm:border-[.1px] border-white flex flex-col items-center pb-[3.5rem] pt-[2rem] ">
      <div className="w-[70%] text-center">
        <h1 className="font-semibold text-2xl">Create Password</h1>
        <p className="text-lg mt-[1rem]">
          Strength of your password doesn't matter since nobody will use this
          app anyway, and for sure nobody is gonna hack you, so chill. But
          length should be at least 8 characters long.
        </p>
        <div className="mt-[3rem]">
          <Form />
        </div>
      </div>
    </div>
  );
}
