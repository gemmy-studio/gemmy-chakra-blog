import axios from 'axios';

interface BlogDetail {
  blogList?: any; // 더 구체적인 타입으로 교체 가능
  error?: string;
}

function createConfig(status?: string, limit?: number, page?: number) {
  const config: { STATUS?: string; LIMIT?: number; PAGE?: number } = {};

  if (status !== undefined) {
    config.STATUS = status;
  }
  if (limit !== undefined) {
    config.LIMIT = limit;
  }
  if (page !== undefined) {
    config.PAGE = page;
  }

  return config;
}

export async function getBlogList(
  status?: string,
  limit?: number,
  page?: number,
): Promise<BlogDetail> {
  const mergedPath = `${process.env.REACT_APP_PROXY_HOST}${process.env.NEXT_PUBLIC_ROOT_ROUTE}/${process.env.NEXT_PUBLIC_CONTROLLER_ROLE}`;
  const requestConfig = createConfig(status, limit, page);

  try {
    const blogResponse = await axios.get(
      `${mergedPath}/blog/find_all`,
      Object.assign(
        { params: { FIND_OPTION_KEY_LIST: requestConfig } },
        { withCredentials: true, headers: {} },
      ),
    );

    return {
      blogList: blogResponse.data.result,
    };
  } catch (error) {
    return {
      error: 'Failed to fetch data',
    };
  }
}
