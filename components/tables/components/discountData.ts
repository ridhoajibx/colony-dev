import { faker } from "@faker-js/faker";

export type DiscountProps = {
  id?: number | string;
  discountID?: any | string;
  discountCode?: string | number;
  discountName?: string | number;
  description?: string;
  amount?: string | number;
  type?: string | number;
  createdAt: Date | string | any;
  updatedAt: Date | string | any;
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export const newDiscount = (): DiscountProps => {
  return {
    id: faker.datatype.uuid(),
    discountCode: faker.datatype.number(10000),
    discountName: faker.lorem.words(),
    createdAt: faker.date.recent().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  };
};

export function createDiscountArr(...lens: number[]) {
  const makeTaskLevel = (depth = 0): DiscountProps[] => {
    const len = lens[depth]!;
    return range(len).map((d): DiscountProps => {
      return {
        ...newDiscount(),
      };
    });
  };

  return makeTaskLevel();
}
