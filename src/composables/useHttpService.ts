import type { Payload } from '@/models';

interface ServiceResponse<T> {
  data: T;
  error: any;
}

export const useHttpService = () => {
  const apiPath = import.meta.env.VITE_API_PATH;
  const authToken = import.meta.env.VITE_AUTH_TOKEN;
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  });

  const get = async <T>(url: string, payload: Payload = {}): Promise<ServiceResponse<T | null>> => {
    const u = new URLSearchParams();

    for (const k of Object.keys(payload)) {
      const v = payload[k];
      if (v) {
        u.append(k, v.toString());
      }
    }

    try {
      const fetchUrl = `${apiPath}${url}${Object.keys(payload).length > 0 ? `?${u.toString()}` : ''}`;
      const response = await fetch(fetchUrl, { headers });
      const data = await response.json();

      if (response && response.ok) {
        return { data, error: null };
      } else {
        throw {
          data: null,
          error: { ok: response.ok, status: response.status, statusText: response.statusText, errorCode: data.errorCode, errorMessage: data.errorMessage },
        };
      }
    } catch (error) {
      return { data: null, error };
    }
  };

  const post = async <T>(url: string, payload: Payload = {}): Promise<ServiceResponse<T | null>> => {
    try {
      const response = await fetch(`${apiPath}${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response && response.ok) {
        return { data, error: null };
      } else {
        throw {
          data: null,
          error: { ok: response.ok, status: response.status, statusText: response.statusText, errorCode: data.errorCode, errorMessage: data.errorMessage },
        };
      }
    } catch (error) {
      return { data: null, error };
    }
  };

  const put = async <T>(url: string, payload: Payload = {}): Promise<ServiceResponse<T | null>> => {
    try {
      const response = await fetch(`${apiPath}${url}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response && response.ok) {
        return { data, error: null };
      } else {
        throw {
          data: null,
          error: { ok: response.ok, status: response.status, statusText: response.statusText, errorCode: data.errorCode, errorMessage: data.errorMessage },
        };
      }
    } catch (error) {
      return { data: null, error };
    }
  };

  const del = async <T>(url: string): Promise<ServiceResponse<T | null>> => {
    try {
      const response = await fetch(`${apiPath}${url}`, {
        method: 'DELETE',
        headers,
      });
      const data = await response.json();

      if (response && response.ok) {
        return { data, error: null };
      } else {
        throw {
          data: null,
          error: { ok: response.ok, status: response.status, statusText: response.statusText, errorCode: data.errorCode, errorMessage: data.errorMessage },
        };
      }
    } catch (error) {
      return { data: null, error };
    }
  };

  return {
    get,
    post,
    put,
    del,
  };
};
