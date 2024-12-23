import Button from "@/components/Button";
import ComponentLoading from "@/components/ComponentLoading";
import { Input } from "@/components/Input";
import { PATH } from "@/constants/Pathjs";
import { MESSAGE, REGEX } from "@/constants/Validate";
import useDebounce from "@/hooks/useDebounce";
import { handleRegister } from "@/store/reducers/authReducer";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuthRegister = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const _onSubmitForm = async (data) => {
        // success validate
        dispatch(handleRegister(data));
    };

    const loadingPage = useDebounce(loading.register, 3000);

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
                    type={"password"}
                    {...register("password", {
                        required: MESSAGE.required,
                        minLength: {
                            value: 6,
                            message: MESSAGE.minPassword,
                        },
                    })}
                    isRequired
                    error={errors?.password?.message}
                />

                {/* End .form-group */}
                <div className="form-footer">
                    <Button type="submit" variant="outline">
                        <span>SIGN UP</span>
                        <i className="icon-long-arrow-right" />
                    </Button>
                    <div
                        className="custom-control custom-checkbox"
                        style={{ position: "relative" }}
                    >
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="register-policy"
                            {...register("isAgree", {
                                required: MESSAGE.policy,
                            })}
                        />
                        {!!errors?.isAgree?.message && (
                            <p class="form-error" style={{ position: "absolute", bottom: "-20px" }}>
                                Please enter your information
                            </p>
                        )}
                        <label className="custom-control-label" htmlFor="register-policy">
                            I agree to the
                            <Link to={PATH.PRIVACY}> privacy policy</Link>*
                        </label>
                    </div>
                    {/* End .custom-checkbox */}
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

export default AuthRegister;
