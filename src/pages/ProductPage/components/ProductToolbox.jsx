import { Input } from "@/components/Input";
import Select from "@/components/Select";
import { SORT_TYPE } from "@/constants/General";
import React from "react";
import "./styles.css";
const ProductToolbox = ({ numbProduct, numbTotal, activeToolbox, onChangeToolbox }) => {
    const onChangeValue = (e) => {
        e?.preventDefault();
        onChangeToolbox?.(e?.target?.value);
    };
    return (
        <div className="toolbox">
            <div className="toolbox-left">
                <div className="toolbox-info">
                    {" "}
                    Showing{" "}
                    <span>
                        {numbProduct || 0} of {numbTotal || 0}
                    </span>{" "}
                    Products{" "}
                </div>
            </div>
            <div className="toolbox-right">
                <div className="toolbox-sort">
                    <label htmlFor="sortby">Sort by:</label>
                    <Input
                        renderInput={(propsInput) => {
                            return (
                                <Select
                                    onChange={onChangeValue}
                                    value={activeToolbox}
                                    {...propsInput}
                                    options={[
                                        SORT_TYPE.popular,
                                        SORT_TYPE.pricetolow,
                                        SORT_TYPE.pricetohight,
                                        SORT_TYPE.newest,
                                        SORT_TYPE.rating,
                                    ]}
                                />
                            );
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductToolbox;
