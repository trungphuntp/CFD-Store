import Button from "@/components/Button";
import ComponentLoading from "@/components/ComponentLoading";
import { Input } from "@/components/Input";
import { MESSAGE, REGEX } from "@/constants/Validate";
import useDebounce from "@/hooks/useDebounce";
import { handleLogin } from "@/store/reducers/authReducer";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const AuthLogin = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const _onSubmitForm = (data) => {
        // success validate

        if (data) {
            dispatch(handleLogin(data));
        }
    };
    const loadingPage = useDebounce(loading.login, 300);

    return (
        <>
            {loadingPage && <ComponentLoading />}
            <form onSubmit={handleSubmit(_onSubmitForm)}>
                <Input
                    label={"Username or email address"}
                    isRequired
                    {...register("email", {
                        required: MESSAGE.required,

                        pattern: {
                            value: REGEX.email,
                            message: MESSAGE.email,
                        },
                    })}
                    error={errors?.email?.message}
                />
                <Input
                    label={"Password"}
                    type="password"
                    {...register("password", {
                        required: MESSAGE.required,
                    })}
                    isRequired
                    error={errors?.password?.message}
                />

                {/* End .form-group */}
                <div className="form-footer">
                    <Button type="submit" variant="outline">
                        <span>LOG IN</span>
                        <i className="icon-long-arrow-right" />
                    </Button>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="signin-remember"
                        />
                        <label className="custom-control-label" htmlFor="signin-remember">
                            Remember Me
                        </label>
                    </div>
                    {/* End .custom-checkbox */}
                    <a href="#" className="forgot-link">
                        Forgot Your Password?
                    </a>
                </div>
                {/* End .form-footer */}
            </form>
            <div className="form-choice">
                <p className="text-center">or sign in with</p>
                <div className="row">
                    <div className="col-sm-6">
                        <a href="#" className="btn btn-login btn-g">
                            <i className="icon-google" />
                            Login With Google
                        </a>
                    </div>
                    {/* End .col-6 */}
                    <div className="col-sm-6">
                        <a href="#" className="btn btn-login btn-f">
                            <i className="icon-facebook-f" />
                            Login With Facebook
                        </a>
                    </div>
                    {/* End .col-6 */}
                </div>
                {/* End .row */}
            </div>
        </>
    );
};

export default AuthLogin;
