// Reference to vite/client removed to avoid type definition error
// Define global process to support process.env.API_KEY usage per guidelines
declare var process: {
  env: {
    API_KEY: string;
    [key: string]: string | undefined;
  }
}
