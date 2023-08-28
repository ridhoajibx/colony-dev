import React, { Fragment, useEffect, useMemo, useState } from "react";
import CurrencyFormat from "react-currency-format";
import {
  Controller,
  EventType,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { MdCheck, MdInfo, MdWarning } from "react-icons/md";
import { ModalFooter } from "../../../../Modal/ModalComponent";
import Button from "../../../../Button/Button";
import DropdownSelect from "../../../../Dropdown/DropdownSelect";
import { useAppDispatch, useAppSelector } from "../../../../../redux/Hook";
import {
  createBillingTax,
  selectBillingTaxManagement,
  updateBillingTax,
} from "../../../../../redux/features/billing/tax/billingTaxReducers";
import { toast } from "react-toastify";
import { FaCircleNotch } from "react-icons/fa";

type Props = {
  token?: any;
  items?: any;
  isOpen?: boolean;
  onClose: () => void;
  getData: () => void;
  isUpdate?: boolean | false;
};

type FormValues = {
  id?: any;
  billingTaxName?: string | any;
  billingTaxId?: string | number | any;
  billingTaxType?: any;
  billingTaxTotal?: number | string | any;
};

type WatchProps = {
  value?: any | null;
};

type WatchChangeProps = {
  name?: any | null;
  type?: EventType | any;
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

const unitOptions = [
  { id: "1", value: "IDR", label: "IDR" },
  { id: "2", value: "Percent", label: "Percent" },
];

const TaxForm = ({
  token,
  items,
  isOpen,
  onClose,
  getData,
  isUpdate,
}: Props) => {
  const { pending } = useAppSelector(selectBillingTaxManagement);
  const dispatch = useAppDispatch();

  const {
    unregister,
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
        id: items?.id,
        billingTaxName: items?.billingTaxName,
        billingTaxId: items?.billingTaxId,
        billingTaxType: items?.billingTaxType,
        billingTaxTotal: items?.billingTaxTotal,
      }),
      [items]
    ),
  });

  useEffect(() => {
    reset({
      id: items?.id,
      billingTaxName: items?.billingTaxName,
      billingTaxId: items?.billingTaxId,
      billingTaxType: items?.billingTaxType,
      billingTaxTotal: items?.billingTaxTotal,
    });
  }, [items]);

  const taxType = useWatch({
    control,
    name: "billingTaxType",
  });

  useEffect(() => {
    if (taxType && taxType?.value) {
      register("billingTaxTotal", {
        required: {
          value: true,
          message: "Total tax is required.",
        },
      });
    } else {
      unregister("billingTaxTotal");
    }
  }, [taxType]);

  const onSubmit: SubmitHandler<FormValues> = async (value) => {
    let newObjt = {
      billingTaxId: value.billingTaxId,
      billingTaxName: value.billingTaxName,
      billingTaxType: value.billingTaxType?.value,
      billingTaxTotal: value.billingTaxTotal
        ? Number(value.billingTaxTotal)
        : 0,
    };
    if (!isUpdate) {
      dispatch(
        createBillingTax({
          token,
          data: newObjt,
          isSuccess: () => {
            toast.dark("Taxes has been created successfully");
            getData();
            onClose();
          },
          isError: () => {
            console.log("error-create-tax");
          },
        })
      );
    } else {
      dispatch(
        updateBillingTax({
          id: value.id,
          token,
          data: newObjt,
          isSuccess: () => {
            toast.dark("Taxes has been updated successfully");
            getData();
            onClose();
          },
          isError: () => {
            console.log("error-update-tax");
          },
        })
      );
    }
    console.log(newObjt, "form-data");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full text-sm">
      <div className="w-full mb-3 px-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Tax Name
          <span>*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Tax Name"
            className="w-full rounded-xl border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            {...register("billingTaxName", {
              required: {
                value: true,
                message: "Tax Name is required.",
              },
            })}
          />
        </div>
        {errors?.billingTaxName && (
          <div className="mt-1 text-xs flex items-center text-red-300">
            <MdWarning className="w-4 h-4 mr-1" />
            <span className="text-red-300">
              {errors?.billingTaxName?.message as any}
            </span>
          </div>
        )}
      </div>

      <div className="w-full grid grid-cols-2 gap-2 mb-3">
        <div className="w-full px-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Tax ID
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Tax ID"
              className="w-full rounded-xl border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              {...register("billingTaxId")}
            />
          </div>
        </div>

        <div className="w-full px-4">
          <label
            htmlFor="billingTaxType"
            className="mb-2.5 block font-medium text-black dark:text-white">
            Type
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
                  instanceId="billingTaxType"
                  isDisabled={false}
                  isMulti={false}
                  placeholder="Unit..."
                  options={unitOptions}
                  icon=""
                  isClearable
                />
              )}
              name={`billingTaxType`}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Type is required.",
                },
              }}
            />
            {errors?.billingTaxType && (
              <div className="mt-1 text-xs flex items-center text-red-300">
                <MdWarning className="w-4 h-4 mr-1" />
                <span className="text-red-300">
                  {errors?.billingTaxType?.message as any}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-4 px-4">
        <label
          htmlFor="billingTaxTotal"
          className="mb-2.5 block font-medium text-black dark:text-white">
          Total Tax
          <span>*</span>
        </label>
        <div className="relative">
          {taxType?.value == "Percent" ? (
            <Controller
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <CurrencyFormat
                  onValueChange={(values) => {
                    const { value } = values;
                    onChange(value);
                  }}
                  id="billingTaxTotal"
                  value={value || ""}
                  thousandSeparator={false}
                  placeholder="Percent"
                  suffix=" %"
                  className="w-full rounded-xl border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              )}
              name="billingTaxTotal"
              control={control}
            />
          ) : (
            <Controller
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <CurrencyFormat
                  onValueChange={(values) => {
                    const { value } = values;
                    onChange(value);
                  }}
                  id="billingTaxTotal"
                  value={value || ""}
                  thousandSeparator={true}
                  placeholder="IDR"
                  prefix="IDR "
                  className="w-full rounded-xl border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              )}
              name="billingTaxTotal"
              control={control}
            />
          )}
          {errors?.billingTaxTotal && (
            <div className="mt-1 text-xs flex items-center text-red-300">
              <MdWarning className="w-4 h-4 mr-1" />
              <span className="text-red-300">
                {errors.billingTaxTotal.message as any}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* footer */}
      <ModalFooter
        className="p-4 border-t-2 border-gray mt-3"
        isClose={false}
        onClick={onClose}>
        <div className="w-full flex items-center gap-2">
          <Button
            type="button"
            className="rounded-lg"
            variant="secondary-outline-none">
            <MdInfo className="w-4 h-4" />
            Help
          </Button>

          <Button
            type="button"
            className="rounded-lg ml-auto"
            variant="secondary-outline"
            onClick={onClose}>
            Discard
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            type="button"
            className="rounded-lg"
            disabled={pending || !isValid}
            variant="primary">
            {!pending ? (
              <Fragment>
                <span>Save</span>
                <MdCheck className="w-4 h-4" />
              </Fragment>
            ) : (
              <Fragment>
                <span>Loading...</span>
                <FaCircleNotch className="w-4 h-4 animate-spin-1.5" />
              </Fragment>
            )}
          </Button>
        </div>
      </ModalFooter>
    </form>
  );
};

export default TaxForm;
