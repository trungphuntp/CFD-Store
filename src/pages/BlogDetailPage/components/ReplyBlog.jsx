import Button from "@/components/Button";
import { Input } from "@/components/Input";
import Textarea from "@/components/Textarea";
import { MESSAGE, REGEX } from "@/constants/Validate";
import { message } from "antd";
import React from "react";
import { useForm } from "react-hook-form";

const ReplyBlog = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const _onSubmitForm = (data) => {
        message.success("sent successfully!");
    };

    return (
        <div className="reply">
            <div className="heading">
                <h3 className="title">Leave A Reply</h3>
                <p className="title-desc">
                    Your email address will not be published. Required fields are marked *
                </p>
            </div>
            <form
                onSubmit={handleSubmit(_onSubmitForm)}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
                <Input
                    isRequired
                    placeholder="Message"
                    renderInput={(propsInput) => {
                        return (
                            <Textarea
                                {...propsInput}
                                {...register("message", {
                                    required: MESSAGE.required,
                                })}
                            />
                        );
                    }}
                    error={errors?.message?.message}
                />
                {/* <label htmlFor="reply-message" className="sr-only">
                    Comment
                </label>
                <textarea
                    name="reply-message"
                    id="reply-message"
                    cols={30}
                    rows={4}
                    className="form-control"
                    required
                    placeholder="Comment *"
                    defaultValue={""}
                /> */}
                <div className="row">
                    <div className="col-md-6">
                        {/* <label htmlFor="reply-name" className="sr-only">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="reply-name"
                            name="reply-name"
                            required
                            placeholder="Name *"
                        /> */}
                        <Input
                            isRequired
                            {...register("name", {
                                required: MESSAGE.required,
                            })}
                            error={errors?.name?.message}
                            placeholder="Name"
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            isRequired
                            {...register("email", {
                                required: MESSAGE.required,
                                pattern: {
                                    value: REGEX.email,
                                    message: MESSAGE.email,
                                },
                            })}
                            error={errors?.email?.message}
                            placeholder="Email"
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    className=" btn-outline-primary-2"
                    style={{ alignSelf: "flex-start" }}
                >
                    <span>POST COMMENT</span>
                    <i className="icon-long-arrow-right" />
                </Button>
            </form>
        </div>
    );
};

export default ReplyBlog;
