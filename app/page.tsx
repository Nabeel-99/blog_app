import { signIn } from "@/auth";

export default function Home() {
  return (
    <div className="">
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
      {/* <form
        action={async () => {
          "use server";
          await signIn("facebook");
        }}
      >
        <button type="submit">Signin with Facebook</button>
      </form> */}
      <form
        action={async () => {
          "use server";
          await signIn("twitter");
        }}
      >
        <button type="submit">Signin with Twitter</button>
      </form>
    </div>
  );
}
