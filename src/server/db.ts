import MyJSON from 'my-json-server-lib';

type GenericType = Record<string, unknown> | Record<string, unknown>[];

export class DB<T> {
  instance: MyJSON | null = null;
  path: string;
  defaultValue: T;
  constructor(path: string, defaultValue: T) {
    this.path = path;
    this.defaultValue = defaultValue;
    console.log(`DB: Created instance for path ${path}`);
  }

  the() {
    if (this.instance === null) {
      const url = `${process.env.MY_JSON_SERVER_URL}/${this.path}`;
      console.log(`DB: Connecting to ${url}`);
      this.instance = MyJSON.connect(
        url,
        process.env.MY_JSON_SERVER_API || '',
      );
    }
    return this.instance;
  }

  async read(): Promise<T> {
    try {
      const data = await this.the().read() as T;
      console.log(`DB: Successfully read from ${this.path}`);
      return data;
    } catch (error: any) {
      console.error(`DB: Error reading from ${this.path}:`, error.message);
      if (error.message === 'Request failed with status 404') {
        console.log(`DB: Path ${this.path} not found, writing default value`);
        await this.write(this.defaultValue);
        return this.read();
      }
      throw Error(error);
    }
  }

  write(data: T) {
    console.log(`DB: Writing to ${this.path}`);
    return this.the().write(data as GenericType);
  }
}
