import { ResolveStatus } from '../interfaces/resolve-status';

export const RESOLVE_STATUS: ResolveStatus = {
  100: 'Continue',
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  304: 'Not Modified',
  307: 'Temporary Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  408: 'Request Timeout',
  410: 'Gone',
  415: 'Unsupported Media Type',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
};
