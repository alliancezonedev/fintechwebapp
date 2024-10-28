export class ApiResponse<T> {
  constructor(
    public statusCode: number,
    public message: string,
    public result: T,
  ) {}
}

export enum Sex {
  MALE = 1,
  FEMALE = 2,
}

export enum Education {
  GRADUATE = 1,
  UNIVERSITY = 2,
  HIGH_SCHOOL = 3,
  OTHERS = 4,
}

export enum MaritalStatus {
  MARRIED = 1,
  SINGLE = 2,
  OTHERS = 3,
}

export enum PaymentDefault {
  YES = 1,
  NO = 0,
}

// Create type-safe reverse mapping functions
function createEnumReverseMap<T extends { [key: string]: string | number }>(
  enumObj: T,
): (value: number) => string {
  const reverseMap = new Map<number, string>();

  Object.keys(enumObj).forEach((key) => {
    const value = enumObj[key];
    if (typeof value === "number") {
      reverseMap.set(value, key);
    }
  });

  return (value: number) => reverseMap.get(value) || "";
}

// Create reverse mapping functions for each enum
export const getSexString = createEnumReverseMap(Sex);
export const getEducationString = createEnumReverseMap(Education);
export const getMaritalStatusString = createEnumReverseMap(MaritalStatus);
export const getPaymentDefaultString = createEnumReverseMap(PaymentDefault);
