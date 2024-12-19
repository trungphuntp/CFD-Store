import Button from "@/components/Button";
import { MESSAGE } from "@/constants/Validate";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const WrapperForm = styled.div`
    display: flex;
    gap: 20px;

    @media (max-width: 576px) {
        flex-direction: column;
    }
`;

const CheckoutDiscount = ({ Voucher, handleAddDiscount, handleRemoveDiscount }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            discountCode: Voucher,
        },
    });

    useEffect(() => {
        reset({
            discountCode: Voucher,
        });
    }, [Voucher]);

    useEffect(() => {
        // Checkout discount input - toggle label if input is empty etc...
        $("#checkout-discount-input")
            .on("focus", function () {
                // Hide label on focus
                $(this).parent("form").find("label").css("opacity", 0);
            })
            .on("blur", function () {
                // Check if input is empty / toggle label
                var $this = $(this);

                if ($this.val().length !== 0) {
                    $this.parent("form").find("label").css("opacity", 0);
                } else {
                    $this.parent("form").find("label").css("opacity", 1);
                }
            });
    }, []);

    const onSubmitDiscount = (dataDiscount) => {
        if (dataDiscount?.discountCode) {
            handleAddDiscount?.(dataDiscount.discountCode);
        }
    };

    return (
        <WrapperForm>
            <div style={{ width: "100%", maxWidth: "340px" }}>
                <div className="checkout-discount">
                    <form action="#">
                        <input
                            type="text"
                            className="form-control"
                            required
                            id="checkout-discount-input"
                            {...register("discountCode", {
                                required: MESSAGE.required,
                            })}
                        />
                        <label
                            htmlFor="checkout-discount-input"
                            className="text-truncate"
                            style={{ opacity: Voucher ? 0 : 1 }}
                        >
                            Have a coupon? <span>Click here to enter your code</span>
                        </label>
                    </form>
                </div>
                {!!errors && <p className="form-error">{errors?.discountCode?.message}</p>}
            </div>
            {!Voucher ? (
                <Button style={{ height: 40 }} onClick={handleSubmit(onSubmitDiscount)}>
                    Add
                </Button>
            ) : (
                <Button
                    style={{ height: 40 }}
                    onClick={(e) => {
                        handleRemoveDiscount?.();
                    }}
                >
                    Remove
                </Button>
            )}
        </WrapperForm>
    );
};

export default CheckoutDiscount;
