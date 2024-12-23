import { Input } from "@/components/Input";
import { MESSAGE, REGEX } from "@/constants/Validate";
import RemoveAccent from "@/utils/removeAccent";
import { Select } from "antd";
import { Controller } from "react-hook-form";

const CheckoutForm = ({
    reset,
    register,
    getValues,
    provinceId,
    districtId,
    wardId,
    handleChangeProvince,
    handleChangeDistrict,
    handleChangeWard,
    provinces,
    districts,
    wards,
    control,
    errors,
}) => {
    const onChangeProvince = (changeValue) => {
        handleChangeProvince?.(changeValue);
        reset({
            ...getValues(),
            province: changeValue,
            district: undefined,
            ward: undefined,
        });
    };
    const onChangeDistrict = (changeValue) => {
        handleChangeDistrict?.(changeValue);
        reset({
            ...getValues(),
            district: changeValue,
            ward: undefined,
        });
    };
    const onChangeWard = (changeValue) => {
        handleChangeWard?.(changeValue);
        reset({
            ...getValues(),
            ward: changeValue,
        });
    };

    return (
        <div className="col-lg-9">
            <h2 className="checkout-title">Billing Details</h2>
            <div className="row">
                <div className="col-sm-4">
                    <Input
                        label={"Full Name"}
                        isRequired
                        {...register("name", {
                            required: MESSAGE.required,
                        })}
                        error={errors?.name?.message}
                    />
                </div>
                <div className="col-sm-4">
                    <Input
                        label={"Phone number"}
                        isRequired
                        {...register("phone", {
                            required: MESSAGE.required,
                            pattern: {
                                value: REGEX.phone,
                                message: MESSAGE.phone,
                            },
                        })}
                        error={errors?.phone?.message}
                    />
                </div>
                <div className="col-sm-4">
                    <Input
                        label={"Email address"}
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
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <label>Province/City *</label>
                    <Controller
                        name="province"
                        control={control}
                        render={({ formState: { errors } }) => {
                            return (
                                <Select
                                    style={{ width: "100%", height: 40 }}
                                    suffixIcon={<></>}
                                    onChange={onChangeProvince}
                                    options={provinces}
                                    value={provinceId}
                                    placeholder="Please select Province"
                                    showSearch
                                    optionFilterProp="label"
                                    filterOption={(input, option) => {
                                        return RemoveAccent(option?.label || "")
                                            .toLowerCase()
                                            .includes(RemoveAccent(input.toLowerCase()));
                                    }}
                                />
                            );
                        }}
                    />
                    {/* <div className="select-custom">
                        <select
                            className="form-control form-select"
                            id="city"
                            aria-label="Default select example"
                        >
                            <option selected />
                        </select>
                    </div> */}
                </div>
                <div className="col-sm-4">
                    <label>District/Town *</label>
                    <Controller
                        name="district"
                        control={control}
                        render={({ formState: { errors } }) => {
                            return (
                                <Select
                                    placeholder="Please select District"
                                    style={{ width: "100%", height: 40 }}
                                    suffixIcon={<></>}
                                    showSearch
                                    optionFilterProp="label"
                                    options={districts}
                                    value={districtId}
                                    onChange={onChangeDistrict}
                                    filterOption={(input, option) => {
                                        return RemoveAccent(option?.label || "")
                                            .toLowerCase()
                                            .includes(RemoveAccent(input.toLowerCase()));
                                    }}
                                />
                            );
                        }}
                    />
                </div>
                <div className="col-sm-4">
                    <label>Ward *</label>
                    <Controller
                        name="ward"
                        control={control}
                        render={({ formState: { errors } }) => {
                            return (
                                <Select
                                    style={{ width: "100%", height: 40 }}
                                    suffixIcon={<></>}
                                    showSearch
                                    placeholder="Please select Ward"
                                    optionFilterProp="label"
                                    options={wards}
                                    value={wardId}
                                    onChange={onChangeWard}
                                    filterOption={(input, option) => {
                                        return RemoveAccent(option?.label || "")
                                            .toLowerCase()
                                            .includes(RemoveAccent(input.toLowerCase()));
                                    }}
                                />
                            );
                        }}
                    />
                </div>
            </div>
            <Input
                label={"Street address"}
                isRequired
                placeholder={"House number and Street name"}
                {...register("street", {
                    required: MESSAGE.required,
                })}
                error={errors?.street?.message}
            />
            <Input
                label={"Order notes (optional)"}
                placeholder="Notes about your order, e.g. special notes for delivery"
                renderInput={(renderProps) => {
                    return (
                        <textarea
                            {...renderProps}
                            className="form-control"
                            cols={30}
                            rows={4}
                            placeholder="Notes about your order, e.g. special notes for delivery"
                            defaultValue={""}
                            {...register("note")}
                        />
                    );
                }}
            />

            {/* <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="checkout-create-acc" />
                <label className="custom-control-label" htmlFor="checkout-create-acc">
                    Create an account?
                </label>
            </div> */}
        </div>
    );
};

export default CheckoutForm;
