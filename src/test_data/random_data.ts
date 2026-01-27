import { faker } from "@faker-js/faker";

export function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.person.jobArea(),
    city: faker.location.city(),
    state: faker.location.country(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
    ssn: faker.location.countryCode(),
    userName: faker.person.fullName(),
    password: faker.string.alphanumeric(),
  };
}

// export const users = faker.helpers.multiple(createRandomUser, {
//   count: 5,
// });
