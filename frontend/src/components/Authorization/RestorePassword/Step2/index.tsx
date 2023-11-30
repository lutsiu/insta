import Form from "./Form";

export default function RestorePasswordStep2() {
  return (
    <div className="w-full sm:w-[35rem] sm:border-[.1px] border-white flex flex-col items-center pb-[2.5rem] pt-[2rem] relative">
      <h1>Create Password</h1>
      <p>
        Strength of your password doesn't matter since nobody will use this app
        anyway, and for sure nobody is gonna hack you, so chill. But length
        should be at least 8 characters long
      </p>
      <Form/>
    </div>
  );
}
