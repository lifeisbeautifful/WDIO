import { faker } from '@faker-js/faker';

export function generatePassword() {
  return faker.internet.password({ length: 20 });
}

export function generateRandomString() {
  return faker.string.alphanumeric({ length: 20 });
}

export function generateRandomFirstName() {
  return faker.person.firstName();
}

export function generateRandomLastName() {
  return faker.person.lastName();
}

export function generateRandomPostalCode() {
  return faker.location.zipCode();
}

export const fakeCheckoutData = {
  firstName: generateRandomFirstName(),
  lastName: generateRandomLastName(),
  zipCode: generateRandomPostalCode()
}