import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { FORMAT_DATE } from "@/constants/Format";
import { MESSAGE, REGEX } from "@/constants/Validate";
import useAddress from "@/hooks/useAddress";
import AuthServices from "@/services/AuthServices";
import { formatDate } from "@/utils/format";
import RemoveAccent from "@/utils/removeAccent";
import { message, Select } from "antd";
import classNames from "classnames";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const MyAccount = () => {
    const { profile } = useSelector((state) => state.auth);

    const { firstName, email, phone, province, district, ward, street, birthday } = profile || [];

    // use form
    const {
        register,
        handleSubmit,
        control,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: firstName,
            email,
            phone,
            street,
            ward,
            district,
            province,
            date: formatDate(birthday, FORMAT_DATE.THIRD),
        },
    });
    // when profile update auto fill infor !IMPORTANT
    useEffect(() => {
        reset({
            name: firstName,
            email,
            phone,
            street,
            ward,
            district,
            province,
            date: formatDate(birthday, FORMAT_DATE.THIRD),
        });
        handleChangeProvince?.(province);
        handleChangeDistrict?.(district);
        handleChangeWard?.(ward);
    }, [profile]);

    // use address
    const {
        provinceId,
        districtId,
        wardId,
        handleChangeProvince,
        handleChangeDistrict,
        handleChangeWard,
        provinces,
        districts,
        wards,
    } = useAddress();

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

    // handle submit
    const _onSubmit = async (dataForm) => {
        if (dataForm) {
            const { date, street, province, phone, name, email, district, ward } = dataForm || [];
            const payload = {
                firstName: name,
                lastName: " ",
                email,
                phone,
                street,
                province,
                district,
                ward,
                birthday: date,
            };

            try {
                const res = await AuthServices.updateProfiles(payload);
                if (res?.data?.data) {
                    message.success("Update profile successfully!");
                } else {
                    message.success("Update profile failed!");
                }
            } catch (error) {
                message.success("Update profile failed!");
            }
        }
    };

    return (
        <div
            className={({ isActive }) => classNames("tab-pane fade", { "active show": isActive })}
            id="tab-account"
        >
            <form onSubmit={handleSubmit(_onSubmit)} className="account-form">
                <div className="row">
                    <div className="col-sm-6">
                        <Input
                            label={"Full Name"}
                            {...register("name", {
                                required: MESSAGE.required,
                            })}
                            isRequired
                            error={errors?.name?.message}
                        />
                    </div>
                    <div className="col-sm-6">
                        <Input
                            disabled
                            label={"Email address"}
                            {...register("email")}
                            error={errors?.email?.message}
                            isRequired
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <Input
                            label={"Phone number"}
                            {...register("phone", {
                                required: MESSAGE.required,
                                pattern: {
                                    value: REGEX.phone,
                                    message: MESSAGE.phone,
                                },
                            })}
                            error={errors?.phone?.message}
                            isRequired
                        />
                    </div>
                    <div className="col-sm-6">
                        <Input
                            label={"Ngày sinh"}
                            isRequired
                            type="date"
                            {...register("date", { required: MESSAGE.required })}
                            error={errors?.date?.message}
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
                    {...register("street", {
                        required: MESSAGE.required,
                    })}
                    error={errors?.street?.message}
                    isRequired
                />
                {/* Để mò */}
                {/* <Input
                    label={"Current password (leave blank to leave unchanged)"}
                    {...register("password")}
                />
                <Input
                    label={"New password (leave blank to leave unchanged)"}
                    {...register("newPassword")}
                />
                <Input label={"Confirm new password"} {...register("confirmPassword")} /> */}
                <Button type="submit" variant="outline">
                    <span>SAVE CHANGES</span>
                    <i className="icon-long-arrow-right" />
                </Button>
            </form>
        </div>
    );
};

export default MyAccount;
