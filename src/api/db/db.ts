import MyJSON from 'my-json-server-lib';

const API_TOKEN = 'THIS_IS_A_CLIENT_TOKEN';
const URL = 'http://localhost:3000';
type GenericType = Record<string, unknown> | Record<string, unknown>[];

export class DB<T> {
  instance: MyJSON | null = null;
  path: string;
  defaultValue: T;
  constructor(path: string, defaultValue: T) {
    this.path = path;
    this.defaultValue = defaultValue;
  }

  the() {
    if (this.instance === null) {
      this.instance = MyJSON.connect(`${URL}/${this.path}`, API_TOKEN);
    }
    return this.instance;
  }

  async read(): Promise<T> {
    try {
      return (await this.the().read()) as T;
    } catch (error) {
      if (error.message === 'Request failed with status 404') {
        await this.write(this.defaultValue);
        return this.read();
      }
      throw Error(error);
    }
  }

  write(data: T) {
    return this.the().write(data as GenericType);
  }
}
