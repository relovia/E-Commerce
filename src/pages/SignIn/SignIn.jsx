//Firebase
import {
  signInWithGoogle,
  createUserDocumentFromAuth,
  signInWithGithub,
} from "../../utils/firebase/firebase.utils";
//Components
import SignIn from "../../components/signIn/SignIn";
// Svg
import Google from "../../assets/google.svg";
import Github from "../../assets/github.svg";
//Redux
import { setCurrentUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

const Authentication = () => {
  const dispatch = useDispatch();

  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGoogle();
      if (user) {
        dispatch(setCurrentUser(user.uid));
        await createUserDocumentFromAuth(user);
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const logGithubUser = async () => {
    try {
      const { user } = await signInWithGithub();
      if (user) {
        dispatch(setCurrentUser(user.uid));
        await createUserDocumentFromAuth(user);
      }
    } catch (error) {
      console.error("Github login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <SignIn />
      <div className="Providers">
        <button
          className="my-4 px-4 py-2 flex gap-2 border border-slate-700 rounded-full hover:text-slate-900 hover:shadow transition duration-150"
          onClick={logGoogleUser}
        >
          <img className="w-6 h-6" src={Google} alt="Google logo"></img>
          <span>Login with Google</span>
        </button>

        <button
          className="my-4 px-4 py-2 flex gap-2 border border-slate-700 rounded-full hover:text-slate-900 hover:shadow transition duration-150"
          onClick={logGithubUser}
        >
          <img className="w-6 h-6" src={Github} alt="Github logo"></img>
          <span>Login with Github</span>
        </button>
      </div>
    </div>
  );
};

export default Authentication;
