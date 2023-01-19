interface IClientResponse {
  message: string;
  data: unknown;
  error: unknown;
  success: boolean;
}

export default IClientResponse;
