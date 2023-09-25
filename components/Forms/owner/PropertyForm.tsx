import React, { Fragment, useEffect, useMemo, useState } from "react";
import {
  Controller,
  EventType,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { MdWarning } from "react-icons/md";
import { ModalFooter } from "../../Modal/ModalComponent";
import Button from "../../Button/Button";
import DropdownSelect from "../../Dropdown/DropdownSelect";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import { useAppDispatch, useAppSelector } from "../../../redux/Hook";
import {
  getPropertyType,
  selectPropertyType,
} from "../../../redux/features/property-type/propertyType";
import {
  createDomainProperty,
  getDomainProperty,
  selectDomainProperty,
} from "../../../redux/features/domain/domainProperty";
import { toast } from "react-toastify";
import { FaCircleNotch } from "react-icons/fa";

type Props = {
  items?: any;
  isOpen?: boolean;
  onClose: () => void;
  token?: any;
  filters?: any;
};

type FormValues = {
  id?: any;
  propertyName?: string | any;
  propertyType?: any;
  propertyDescription?: any | string;
};

type WatchProps = {
  value?: any | null;
};

type WatchChangeProps = {
  name?: any | null;
  type?: EventType | any;
};

type Options = {
  value?: any;
  label?: any;
};

const stylesSelect = {
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
  dropdownIndicator: (provided: any) => {
    return {
      ...provided,
      color: "#7B8C9E",
    };
  },
  clearIndicator: (provided: any) => {
    return {
      ...provided,
      color: "#7B8C9E",
    };
  },
  singleValue: (provided: any) => {
    return {
      ...provided,
      color: "#5F59F7",
    };
  },
  control: (provided: any, state: any) => {
    // console.log(provided, "control")
    return {
      ...provided,
      background: "",
      padding: "0",
      paddingTop: ".335rem",
      paddingBottom: ".335rem",
      borderRadius: ".5rem",
      borderColor: state.isFocused ? "#5F59F7" : "#E2E8F0",
      color: "#5F59F7",
      "&:hover": {
        color: state.isFocused ? "#E2E8F0" : "#5F59F7",
        borderColor: state.isFocused ? "#E2E8F0" : "#5F59F7",
      },
      minHeight: 38,
      // flexDirection: "row-reverse"
    };
  },
  menuList: (provided: any) => provided,
};

const PropertyForm = ({ items, isOpen, onClose, token, filters }: Props) => {
  const [watchValue, setWatchValue] = useState<FormValues>();
  const [watchChangeValue, setWatchChangeValue] = useState<WatchChangeProps>();
  const [propertyTypeOption, setPropertyTypeOption] = useState<Options[]>([]);

  // redux
  const dispatch = useAppDispatch();
  const { propertyTypes } = useAppSelector(selectPropertyType);
  const { properties, pending, error, message } =
    useAppSelector(selectDomainProperty);

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors, isValid },
    control,
  } = useForm({
    mode: "all",
    defaultValues: useMemo<FormValues>(
      () => ({
        id: null,
        propertyName: null,
        propertyType: null,
        propertyDescription: null,
      }),
      []
    ),
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (value) {
        setWatchValue(value);
        setWatchChangeValue({ name, type });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<FormValues> = (value) => {
    console.log(value, "event form");
    let formData = {
      propertyName: value.propertyName,
      propertyDescription: value.propertyDescription,
      propertyType: value.propertyType?.id,
    };
    dispatch(
      createDomainProperty({
        token,
        data: formData,
        isSuccess: () => {
          toast.dark(`Property ${value.propertyName} has been created!`);
          dispatch(getDomainProperty({ token, params: filters }));
          onClose();
        },
        isError: () => {
          console.log(message);
        },
      })
    );
  };

  const descriptionValue = useWatch({
    name: "propertyDescription",
    control,
  });

  const filterPropType = useMemo(() => {
    const qb = RequestQueryBuilder.create();
    const search: any = {
      $and: [],
    };
    // query?.annual && search["$and"].push({ "annual": query?.annual });

    qb.search(search);
    qb.sortBy({ field: "propertyTypeName", order: "ASC" });
    qb.query();
    return qb;
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getPropertyType({ token, params: filterPropType.queryObject }));
    }
  }, [filterPropType, token]);

  useEffect(() => {
    let arr: Options[] = [];
    const { data } = propertyTypes;
    if (!data || data?.length == 0) {
      setPropertyTypeOption(arr);
    } else {
      data?.map((item: any) => {
        arr.push({
          ...item,
          value: item.id,
          label: item.propertyTypeName,
        });
      });
      setPropertyTypeOption(arr);
    }
  }, [propertyTypes.data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full mb-3 px-4 mt-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          House Name
          <span>*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="House Name"
            className="w-full rounded-xl border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            {...register("propertyName", {
              required: {
                value: true,
                message: "Property Name is required.",
              },
            })}
          />
        </div>
        {errors?.propertyName && (
          <div className="mt-1 text-xs flex items-center text-red-300">
            <MdWarning className="w-4 h-4 mr-1" />
            <span className="text-red-300">
              {errors?.propertyName?.message as any}
            </span>
          </div>
        )}
      </div>

      <div className="w-full mb-3 px-4">
        <label
          htmlFor="propertyType"
          className="mb-2.5 block font-medium text-black dark:text-white">
          House Type
        </label>
        <div className="relative">
          <Controller
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <DropdownSelect
                customStyles={stylesSelect}
                value={value}
                onChange={onChange}
                error=""
                className="text-sm font-normal text-gray-5 w-full lg:w-2/10"
                classNamePrefix=""
                formatOptionLabel=""
                instanceId="propertyType"
                isDisabled={false}
                isMulti={false}
                placeholder="Type..."
                options={propertyTypeOption}
                icon=""
              />
            )}
            name={`propertyType`}
            control={control}
            rules={{
              required: {
                value: true,
                message: "Type is required.",
              },
            }}
          />
          {errors?.propertyType && (
            <div className="mt-1 text-xs flex items-center text-red-300">
              <MdWarning className="w-4 h-4 mr-1" />
              <span className="text-red-300">
                {errors?.propertyType?.message as any}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full mb-3 px-4">
        <label
          htmlFor=""
          className="mb-2.5 block font-medium text-black dark:text-white">
          Description
        </label>
        <div className="relative">
          <textarea
            cols={0.5}
            rows={5}
            maxLength={400}
            autoFocus
            placeholder="Descriptions"
            className="w-full rounded-lg border border-stroke bg-white py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            {...register("propertyDescription")}
          />
          <div className="mt-1 text-xs flex items-center">
            <span className="text-graydark">
              {descriptionValue?.length || 0} / 400 characters.
            </span>
          </div>
        </div>
      </div>

      <ModalFooter
        className="w-full flex border-t-2 border-gray py-2 px-4"
        isClose
        onClick={onClose}>
        <Button
          type="button"
          variant="primary"
          className="rounded-lg text-sm"
          onClick={handleSubmit(onSubmit)}
          disabled={pending}>
          {pending ? (
            <div className="flex items-center gap-2">
              <span>Loading...</span>
              <FaCircleNotch className="w-4 h-4 animate-spin-1.5" />
            </div>
          ) : (
            "Save"
          )}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default PropertyForm;
