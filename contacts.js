const fsPromises = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function readContacts() {
  const data = await fsPromises.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}
async function changeContacts(valu) {
  return await fsPromises.writeFile(
    contactsPath,
    JSON.stringify(valu),
    "utf-8"
  );
}

async function listContacts() {
  try {
    const data = await readContacts();
    console.table(data);
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await readContacts();
    const idEl = data.filter((contact) => contact.id === contactId.toString());
    console.table(idEl);
  } catch {
    console.log(err.message);
  }
}
// getContactById(3);

async function removeContact(contactId) {
  try {
    let data = await readContacts();
    const newData = data.filter(
      (contact) => contact.id !== contactId.toString()
    );
    await changeContacts(newData);
    data = await readContacts();
    console.table(data);
  } catch (err) {
    console.log(err.message);
  }
}
// removeContact(101);

async function addContact(name, email, phone) {
  try {
    let data = await readContacts();
    const id = (Number(data[data.length - 1].id) + 1).toString();
    console.log(id);
    const newContact = { id, name, email, phone };
    await changeContacts([...data, newContact]);
    data = await readContacts();
    console.table(data);
  } catch (err) {
    console.log(err.message);
  }
}
// addContact("rase", "test@test.gimail", "322-22-22");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
