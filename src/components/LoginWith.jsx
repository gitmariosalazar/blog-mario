import google from "../images/google.png";
import github from "../images/github.png";
import microsoft from "../images/microsoft.png";

export function LoginWith() {
  return (
    <>
      <p className="flex justify-center items-center text-slate-400 p-1 mt-2">
        Continue with
      </p>
      <div className="mt-1 flex justify-center items-center">
        <div className="flex justify-center items-center w-full">
          <div className="w-full flex justify-center">
            <a href="#">
              <img
                src={google}
                alt="Google"
                className="h-7 w-7"
                title="Google"
              />
            </a>
          </div>
          <div className="w-full flex justify-center">
            <a href="#">
              <img
                src={microsoft}
                alt="Microsoft"
                className="h-7 w-7"
                title="Microsoft"
              />
            </a>
          </div>
          <div className="w-full flex justify-center">
            <a href="#">
              <img
                src={github}
                alt="Git Hub"
                className="h-11 w-11 rounded-s-full rounded-e-full"
                title="Git Hub"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
