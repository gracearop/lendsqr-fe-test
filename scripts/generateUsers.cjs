const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

const generateUsers = (num) => {
  const users = [];
  const statuses = ['Active', 'Inactive', 'Pending', 'Blacklisted'];

  for (let i = 0; i < num; i++) {
    users.push({
      id: faker.string.uuid(),
      organization: faker.company.name(),
      username: faker.internet.username(), // Updated from userName to username
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      dateJoined: faker.date.past().toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      profile: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        avatar: faker.image.avatar(),
        gender: faker.person.sex(),
        bvn: faker.string.numeric(11),
        address: faker.location.streetAddress(),
      },
      education: {
        level: 'B.Sc',
        employmentStatus: 'Employed',
        sector: 'FinTech',
        duration: '2 Years',
        officeEmail: faker.internet.email(),
        monthlyIncome: [200000, 500000],
        loanRepayment: 40000,
      },
      socials: {
        facebook: `@${faker.internet.username()}`,
        instagram: `@${faker.internet.username()}`,
        twitter: `@${faker.internet.username()}`,
      },
      guarantor: {
        fullName: faker.person.fullName(),
        phoneNumber: faker.phone.number(),
        relationship: 'Sibling',
      },
    });
  }
  return users;
};

const data = generateUsers(500);

// Ensure the data directory exists
const dir = path.join(__dirname, '../src/data');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'users.json'), JSON.stringify(data, null, 2));
console.log("✅ Successfully generated 500 users in src/data/users.json");