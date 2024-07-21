export default class UserFactory {
    static createUser(name, phone, email, dateOfBirth) {
      return {
        name,
        phone,
        email,
        dateOfBirth
      };
    }
  }
  