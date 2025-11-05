import MyJSON from 'my-json-server-lib';

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
      this.instance = MyJSON.connect(
        `${process.env.MY_JSON_SERVER_URL}/${this.path}`,
        process.env.MY_JSON_SERVER_API || '',
      );
    }
    return this.instance;
  }

  async read(): Promise<T> {
    try {
      return (await this.the().read()) as T;
    } catch (error: any) {
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