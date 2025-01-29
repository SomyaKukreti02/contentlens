import { useState } from "react";
import { signInWithOAuth } from "@/supabase/services/auth.service";
import PropTypes from "prop-types";
const GoogleLoginButton = ({
  variant = "tiny",
  color = "",
  tooltip = "left",
}) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithOAuth("google", window.location.href);
    } catch (error) {
      console.error("Error during google login:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={variant === "tiny" ? `tooltip tooltip-left` : ""}
      data-tip={variant === "tiny" ? "Login with Google" : ""}
    >
      <button
        className={`btn ${variant === "tiny" ? " btn-circle " : " "} ${
          "btn-" + color
        } `}
        disabled={loading}
        onClick={() => handleLogin()}
      >
        {loading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          <>
            <i className="bx bxl-google text-3xl" />
            {variant === "full" ? "Login with Google" : ""}
          </>
        )}
      </button>
    </div>
  );
};
GoogleLoginButton.propTypes = {
  variant: PropTypes.oneOf(["tiny", "full"]),
  color: PropTypes.string,
  tooltip: PropTypes.oneOf(["left", "right", "top", "bottom"]),
};

export default GoogleLoginButton;
