export interface PostgresConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl?: boolean; // Optional, depending on your setup
}
