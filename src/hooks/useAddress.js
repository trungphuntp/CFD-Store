import { useState } from "react";
import useQuery from "./useQuery";
import AuthServices from "@/services/AuthServices";

const useAddress = (defaultValue) => {
    const [provinceId, setProvinceId] = useState(defaultValue?.provinceId);
    const [districtId, setDistrictId] = useState(defaultValue?.districtId);
    const [wardId, setWardId] = useState(defaultValue?.wardId);

    const { data: ProvinceList } = useQuery(AuthServices.getProvince);

    const { data: DistrictList } = useQuery(
        () => provinceId && AuthServices.getDistrict(provinceId),
        [provinceId]
    );
    const { data: WardList } = useQuery(
        () => districtId && AuthServices.getWard(districtId),
        [districtId]
    );

    const handleChangeProvince = (changeProvinceId) => {
        setProvinceId(changeProvinceId);
        setDistrictId(undefined);
        setWardId(undefined);
    };
    const handleChangeDistrict = (changeDistrictId) => {
        setDistrictId(changeDistrictId);
        setWardId(undefined);
    };
    const handleChangeWard = (changeWardId) => {
        setWardId(changeWardId);
    };

    return {
        provinceId,
        districtId,
        wardId,
        handleChangeProvince,
        handleChangeDistrict,
        handleChangeWard,
        provinces:
            ProvinceList?.provinces?.map((province) => {
                return {
                    value: province?.id,
                    label: province?.name,
                };
            }) || [],
        districts:
            DistrictList?.districts?.map((district) => {
                return {
                    value: district?.id,
                    label: district?.name,
                };
            }) || [],
        wards:
            WardList?.wards?.map((ward) => {
                return {
                    value: ward?.id,
                    label: ward?.name,
                };
            }) || [],
    };
};
export default useAddress;
