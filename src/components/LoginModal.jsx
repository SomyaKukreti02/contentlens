import GoogleLoginButton from "@/components/GoogleLoginButton";

const LoginModal = () => {
  return (
    <dialog id="login_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hi, there 👋</h3>
        <div className="modal-body">
          <p className="my-2 py-2">
            You need to login to access this page. Click the button below to
            login with Google.
          </p>
          <GoogleLoginButton variant="full" color="primary" />
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">
              <kbd className="kbd">esc</kbd>
              Go Back
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default LoginModal;
