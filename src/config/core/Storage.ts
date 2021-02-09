/**
 * @class ContactsAPI
 */
class ContactsAPI {
  /**
   * @constructor
   */
  storage: Storage;

  constructor() {
    this.storage = this.checkStorageType();
    this.setItem = this.setItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.getItem = this.getItem.bind(this);
  }

  /**
   * @method checkStorageType
   * @memberOf ContactsAPI
   * @return {Storage} LocalStorage | SessionStorage
   * @description Method used to decide which browser API to used, LocalStorage or SessionStorage.
   * In this case our main API is LocalStorage and SessionStorage is the fallback.
   */
  checkStorageType(): Storage {
    try {
      localStorage.setItem("test", "test");
      localStorage.removeItem("test");
      return localStorage;
    } catch (e) {
      return sessionStorage;
    }
  }

  /**
   * @method setItem
   * @memberOf ContactsAPI
   * @param key {String} Key to set in Storage
   * @param data {String} Stringified information.
   * @description Method used to save the contacts in the Storage.
   */
  setItem(key: string, data: string): void {
    this.storage.setItem(key, data);
  }

  /**
   * @method getItem
   * @memberOf ContactsAPI
   * @param key {String} Key to get from Storage
   * @return {string} Stringified value of the key if exists
   */
  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  /**
   * @method removeItem
   * @memberOf ContactsAPI
   * @param key {String} Key to get from Storage
   * @return undefiend
   */
  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }
}

let C = new ContactsAPI();

export default C;
