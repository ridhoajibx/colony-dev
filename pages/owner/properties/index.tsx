import React, { SetStateAction, useEffect, useMemo, useState } from 'react'
import DomainLayouts from '../../../components/Layouts/DomainLayouts'
import { MdAdd, MdEdit, MdMapsHomeWork, MdMuseum, MdPlace } from 'react-icons/md';
import Button from '../../../components/Button/Button';
import Cards from '../../../components/Cards/Cards';
import Barcharts from '../../../components/Chart/Barcharts';
import Doughnutcharts from '../../../components/Chart/Doughnutcharts';
import { getCookies } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { useAppDispatch, useAppSelector } from '../../../redux/Hook';
import { getAuthMe, selectAuth } from '../../../redux/features/auth/authReducers';
import { useRouter } from 'next/router';
import SidebarBody from '../../../components/Layouts/Sidebar/SidebarBody';
import DomainSidebar from '../../../components/Layouts/Sidebar/Domain';
import { SearchInput } from '../../../components/Forms/SearchInput';
import DropdownSelect from '../../../components/Dropdown/DropdownSelect';
import CardTables from '../../../components/tables/layouts/CardTables';
import { DivisionProps, createDivisionArr } from '../../../components/tables/components/taskData';
import { ColumnDef } from '@tanstack/react-table';
import Teams from '../../../components/Task/Teams';
import { getDomainProperty, selectDomainProperty } from '../../../redux/features/domain/domainProperty';
import { RequestQueryBuilder } from '@nestjsx/crud-request';

type Props = {
  pageProps: any
};

type PropertyData = {
  id?: number | string,
  createdAt?: Date | string,
  updatedAt?: Date | string,
  propertyName?: string,
  propertyDescription?: string,
  propertyLogo?: string,
  totalAdmin?: number,
  totalUnit?: number,
  totalUnitTenant?: number,
  totalOngoingComplaint?: number,
  website?: string,
  email?: string,
  phoneNumber?: number | string,
  street?: string,
  aditionalInfo?: string,
  postCode?: string,
  city?: string,
  province?: string,
  country?: string,
  gpsLocation?: string,
  legalEntityName?: string,
  legalEntityDescription?: string,
  legalEntityLogo?: string | any,
  status?: string,
  legalEntity?: PropertyData
}

type Options = {
  value: any,
  label: any
}

const sortOpt: Options[] = [
  { value: "ASC", label: "A-Z" },
  { value: "DESC", label: "Z-A" },
];

const stylesSelectSort = {
  indicatorsContainer: (provided: any) => ({
    ...provided,
    flexDirection: "row-reverse"
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: 'none'
  }),
  dropdownIndicator: (provided: any) => {
    return ({
      ...provided,
      color: '#7B8C9E',
    })
  },
  clearIndicator: (provided: any) => {
    return ({
      ...provided,
      color: '#7B8C9E',
    })
  },
  singleValue: (provided: any) => {
    return ({
      ...provided,
      color: '#5F59F7',
    })
  },
  control: (provided: any, state: any) => {
    return ({
      ...provided,
      background: "",
      padding: '.6rem',
      borderRadius: ".75rem",
      borderColor: state.isFocused ? "#5F59F7" : "#E2E8F0",
      color: "#5F59F7",
      "&:hover": {
        color: state.isFocused ? "#E2E8F0" : "#5F59F7",
        borderColor: state.isFocused ? "#E2E8F0" : "#5F59F7"
      },
      minHeight: 40,
      flexDirection: "row-reverse"
    })
  },
  menuList: (provided: any) => (provided)
};

const stylesSelect = {
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: 'none'
  }),
  dropdownIndicator: (provided: any) => {
    return ({
      ...provided,
      color: '#7B8C9E',
    })
  },
  clearIndicator: (provided: any) => {
    return ({
      ...provided,
      color: '#7B8C9E',
    })
  },
  singleValue: (provided: any) => {
    return ({
      ...provided,
      color: '#5F59F7',
    })
  },
  control: (provided: any, state: any) => {
    // console.log(provided, "control")
    return ({
      ...provided,
      background: "",
      padding: '.6rem',
      borderRadius: ".75rem",
      borderColor: state.isFocused ? "#5F59F7" : "#E2E8F0",
      color: "#5F59F7",
      "&:hover": {
        color: state.isFocused ? "#E2E8F0" : "#5F59F7",
        borderColor: state.isFocused ? "#E2E8F0" : "#5F59F7"
      },
      minHeight: 40,
      // flexDirection: "row-reverse"
    })
  },
  menuList: (provided: any) => (provided)
};

const DomainProperty = ({ pageProps }: Props) => {
  const router = useRouter();
  const { pathname, query } = router;
  const { token, access, firebaseToken } = pageProps;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // state
  const [search, setSearch] = useState<string | any>('');
  const [sort, setSort] = useState<Options>();
  // table
  const [dataTable, setDataTable] = useState<PropertyData[]>([]);
  const [isSelectedRow, setIsSelectedRow] = useState({});
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  // redux
  const dispatch = useAppDispatch();
  const { properties, pending, error } = useAppSelector(selectDomainProperty);

  const columns = useMemo<ColumnDef<PropertyData, any>[]>(() => [
    {
      accessorKey: 'id',
      header: (info) => (
        <div className='uppercase'>Title</div>
      ),
      cell: ({ getValue, row }) => {
        let property = row?.original?.propertyName;
        let address = row?.original?.gpsLocation;
        let status = row?.original?.status;
        console.log(row.original, 'rows')
        return (
          <div className='w-full flex flex-col lg:flex-row gap-4 cursor-pointer p-4 tracking-wider'>
            <div className='w-full lg:w-1/5 text-lg font-semibold'>
              <img src="../image/logo/logo-icon.svg" alt="" className='w-full object-cover object-center' />
            </div>
            <div className='w-full lg:w-4/5 flex flex-col gap-2 justify-around text-lg font-semibold '>
              <div className='w-full flex flex-col gap-2'>
                <div className='w-full flex items-center gap-2 justify-between'>
                  <div>{property || "-"}</div>
                  <div className={!status ? "hidden" : "p-1.5 bg-boxdark text-white text-sm rounded-lg"}>{status}</div>
                </div>
                <div className='w-full flex gap-2 text-sm font-normal'>
                  <div className='w-auto'>
                    <MdPlace className='w-5 h-5' />
                  </div>
                  <p className='w-4/5'>{address || "-"}</p>
                </div>
              </div>

              <div className='border-b-2 border-gray w-full'></div>

              <div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quis!</p>
              </div>
            </div>
          </div>
        )
      },
      footer: props => props.column.id,
      enableColumnFilter: false,
    }
  ], []);

  useEffect(() => {
    if (token) {
      dispatch(getAuthMe({ token, callback: () => router.push("/authentication?page=sign-in") }))
    }
  }, [token]);

  console.log({query, search, sort}, "sort")

  useEffect(() => {
    if (query?.page) setPages(Number(query?.page) || 1)
    if (query?.limit) setLimit(Number(query?.limit) || 10)
    if (query?.search) setSearch(query?.search)
    if (query?.sort) setSort({ value: query?.sort, label: query?.sort == "ASC" ? "A-Z" : "Z-A" })
  }, [])

  useEffect(() => {
    let qr : any = {
      page: pages,
      limit: limit
    };
    if (search) qr = { ...qr, search: search }
    if (sort?.value) qr = { ...qr, sort: sort?.value }

    router.replace({ pathname, query: qr })
  }, [search, sort])


  const filters = useMemo(() => {
    const qb = RequestQueryBuilder.create();
    const search = {
      $and: [
        {
          $or: [
            { "propertyName": { $contL: query?.search } },
            { "propertyDescription": { $contL: query?.search } }
          ],
        },
      ],
    };
    // query?.status && search["$and"].push({ status: query?.status });

    qb.search(search);

    if (query?.page) qb.setPage(Number(query?.page) || 1);
    if (query?.limit) qb.setLimit(Number(query?.limit) || 10);

    if (query?.status) qb.sortBy({ field: "propertyName" || "propertyDescription", order: !query?.status ? "ASC" : "DESC" })
    qb.query();
    return qb;
  }, [query])

  useEffect(() => {
    if (token) dispatch(getDomainProperty({ params: filters.queryObject, token }))
  }, [token, filters]);

  useEffect(() => {
    let arr: PropertyData[] = [];
    const { data, pageCount, total } = properties;
    if (data || data?.length > 0) {
      data?.map((item: PropertyData) => {
        arr.push(item)
      })
      setDataTable(data)
      setPageCount(pageCount)
      setTotal(total)
    } else {
      setDataTable([])
      setPageCount(1)
      setTotal(0)
    }
  }, [properties.data])

  return (
    <DomainLayouts
      title="Colony"
      header="Owner"
      head="Properties"
      logo="../image/logo/logo-icon.svg"
      description=""
      images="../image/logo/building-logo.svg"
      userDefault="../image/user/user-01.png"
      token={token}
      icons={{
        icon: MdMuseum,
        className: "w-8 h-8 text-meta-5"
      }}
    >
      <div className='w-full absolute inset-0 z-99 bg-boxdark flex text-white'>
        <div className="relative w-full bg-gray overflow-y-auto">
          <div className="w-full h-full flex">
            <DomainSidebar
              setSidebar={setSidebarOpen}
              sidebar={sidebarOpen}
              token={token}
            >
              <div className='py-8'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quo voluptatem, qui at atque quaerat! Laudantium quae earum, aut et tempore ratione deleniti quos iusto amet dolores, veritatis velit nulla?
              </div>
            </DomainSidebar>

            <div className='w-full relative tracking-wide text-left text-boxdark-2 2xl:px-10 mt-20 overflow-hidden'>
              <div className="w-full h-full flex flex-1 flex-col overflow-auto gap-2.5 lg:gap-6 overflow-y-auto">
                {/* filters */}
                <div className='sticky z-40 top-0 w-full grid grid-cols-1 lg:grid-cols-5 gap-2.5 py-6 px-8 bg-gray'>
                  <div className='w-full lg:col-span-3'>
                    <SearchInput
                      className='w-full text-sm rounded-xl'
                      classNamePrefix=''
                      filter={search}
                      setFilter={setSearch}
                      placeholder='Search...'
                    />
                  </div>
                  <div className='w-full flex flex-col lg:flex-row items-center gap-2'>
                    <DropdownSelect
                      customStyles={stylesSelectSort}
                      value={sort}
                      onChange={setSort}
                      error=""
                      className='text-sm font-normal text-gray-5 w-full lg:w-2/10'
                      classNamePrefix=""
                      formatOptionLabel=""
                      instanceId='1'
                      isDisabled={false}
                      isMulti={false}
                      placeholder='Sorts...'
                      options={sortOpt}
                      icon='MdSort'
                    />
                  </div>
                  <Button
                    type="button"
                    variant="primary"
                    className="rounded-lg"
                    onClick={() => console.log("new property")}
                  >
                    New Property
                    <MdAdd className='w-5 h-5' />
                  </Button>
                </div>
                <div className="w-full grid col-span-1 gap-4 tracking-wider mb-5">
                  <div className='px-8'>
                    <h3 className='text-lg lg:text-title-lg font-semibold'>Property List</h3>
                  </div>
                  <CardTables
                    loading={loading}
                    setLoading={setLoading}
                    pages={pages}
                    setPages={setPages}
                    limit={limit}
                    setLimit={setLimit}
                    pageCount={pageCount}
                    columns={columns}
                    dataTable={dataTable}
                    total={total}
                    setIsSelected={setIsSelectedRow}
                    // isInfiniteScroll
                    classTable="px-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DomainLayouts>
  )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Parse cookies from the request headers
  const cookies = getCookies(context)

  // Access cookies using the cookie name
  const token = cookies['accessToken'] || null;
  const access = cookies['access'] || null;
  const firebaseToken = cookies['firebaseToken'] || null;

  if (!token || access !== "owner") {
    return {
      redirect: {
        destination: "/authentication?page=sign-in", // Redirect to the home page
        permanent: false
      },
    };
  }

  return {
    props: { token, access, firebaseToken },
  };
};

export default DomainProperty;