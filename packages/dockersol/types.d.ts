export interface DBInfo {
  name: string;
  dockerImage: string;
  tags: string[];
  ENV: string[];
  PORT: number;
}

export interface EnvVariable {
  name: string;
  value: string;
}
export interface cDB {
  name: string;
  type: string;
  tag: string;
  env: EnvVariable[];
  PORT: number;
}
