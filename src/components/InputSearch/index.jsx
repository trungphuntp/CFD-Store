import { MESSAGE, REGEX } from "@/constants/Validate";
import SubscribeServices from "@/services/SubscribeServices";
import { message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";

const InputSearch = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const _onSubmitForm = async (data) => {
        // success validate
        setLoading(true);
        try {
            const { email } = data;
            const payload = {
                email,
            };
            const res = await SubscribeServices.deal(payload);
            console.log(res?.data);

            if (res?.data) {
                reset();
                message.success("Sent successfully!");
            }
        } catch (error) {
            message.success("Sent failed!");
        }
    };

    const resetInput = () => {};

    return (
        <>
            <form onSubmit={handleSubmit(_onSubmitForm)}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your Email Address"
                        {...register("email", {
                            required: MESSAGE.required,
                            pattern: {
                                value: REGEX.email,
                                message: MESSAGE.email,
                            },
                        })}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary btn-rounded" type="submit">
                            <i className="icon-long-arrow-right" />
                        </button>
                    </div>
                </div>
            </form>
            <p className="form-error text-left">{errors?.email?.message}</p>
        </>
    );
};

export default InputSearch;
